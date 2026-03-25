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
    
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const appointments = await Appointment.find({ 
      status: "completed",
      completedAt: { $gte: today }
    })
    .sort({ completedAt: -1 })
    .limit(20);

    const completed = appointments.map((app: any) => ({
      id: app._id.toString(),
      ticket: app.ticketNumber,
      customer: app.customerName || "Customer",
      service: app.serviceName,
      time: app.completedAt ? new Date(app.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "",
      duration: app.duration || 0,
      satisfaction: app.satisfaction
    }));

    return NextResponse.json(completed);
    
  } catch (error) {
    console.error("Error fetching completed:", error);
    return NextResponse.json([]);
  }
}