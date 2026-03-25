import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";
import { Types } from "mongoose";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const appointments = await Appointment.find({ 
      customer: new Types.ObjectId(session.user.id) 
    })
    .sort({ createdAt: -1 })
    .limit(50);

    const transformedAppointments = appointments.map((app: any) => ({
      id: app._id.toString(),
      ticketNumber: app.ticketNumber,
      service: app.serviceName,
      date: app.startTime ? new Date(app.startTime).toISOString().split('T')[0] : '',
      time: app.startTime ? new Date(app.startTime).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }) : '',
      status: app.status,
      amount: app.amountPaid || 0,
      rating: null,
      feedback: app.serviceNote || app.problemDescription || undefined
    }));

    return NextResponse.json({ 
      appointments: transformedAppointments,
      success: true 
    });
    
  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json(
      { error: "Failed to fetch appointments" },
      { status: 500 }
    );
  }
}