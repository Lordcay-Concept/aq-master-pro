import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Appointment from "@/lib/db/models/Appointment";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const customers = await User.find({ role: "customer" })
      .select("-password")
      .limit(100);

    const customersWithStats = await Promise.all(
      customers.map(async (customer) => {
        const appointments = await Appointment.find({ 
          customer: customer._id,
          status: "completed"
        });
        
        const totalVisits = appointments.length;
        const totalSpent = appointments.reduce((sum, app) => sum + (app.amountPaid || 0), 0);
        const lastVisit = appointments.length > 0 ? 
          appointments.sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())[0].createdAt : 
          null;
        
        const ratedAppointments = appointments.filter(a => a.satisfaction);
        const avgSatisfaction = ratedAppointments.length > 0 ?
          Math.round(ratedAppointments.reduce((sum, a) => sum + (a.satisfaction || 0), 0) / ratedAppointments.length) :
          0;

        return {
          id: customer._id.toString(),
          name: customer.name,
          email: customer.email,
          phone: customer.phone || "",
          totalVisits,
          totalSpent,
          lastVisit: lastVisit ? lastVisit.toISOString().split('T')[0] : "Never",
          preferredService: "Various", 
          satisfaction: avgSatisfaction,
          notes: customer.notes
        };
      })
    );

    return NextResponse.json(customersWithStats);
    
  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json([]);
  }
}