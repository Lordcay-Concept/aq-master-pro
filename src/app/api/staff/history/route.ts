import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const appointments = await Appointment.find({ 
      servedBy: session.user.id,
      status: { $in: ["completed", "cancelled", "no-show"] }
    })
    .sort({ completedAt: -1, updatedAt: -1 })
    .limit(100);

    const history = appointments.map((app: any) => ({
      id: app._id.toString(),
      number: app.ticketNumber,
      customer: {
        name: app.customerName || "Customer",
        phone: app.notificationPhone || "N/A"
      },
      service: app.serviceName,
      date: app.completedAt ? new Date(app.completedAt).toISOString().split('T')[0] : 
             app.updatedAt ? new Date(app.updatedAt).toISOString().split('T')[0] : 
             new Date().toISOString().split('T')[0],
      time: app.completedAt ? new Date(app.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
            app.updatedAt ? new Date(app.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 
            new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      duration: app.duration || 0,
      status: app.status,
      satisfaction: app.satisfaction,
      notes: app.serviceNote,
      servedBy: session.user.name || "Staff"
    }));

    return NextResponse.json(history);
    
  } catch (error) {
    console.error("Error fetching staff history:", error);
    return NextResponse.json([]);
  }
}