import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const nextTicket = await Appointment.findOneAndUpdate(
      { status: "waiting" },
      { 
        status: "calling",
        servedBy: session.user.id,
        startedAt: new Date()
      },
      { sort: { createdAt: 1 }, new: true }
    );

    if (!nextTicket) {
      return NextResponse.json({ 
        success: false, 
        error: "No tickets in queue" 
      }, { status: 404 });
    }

    const ticket = {
      id: nextTicket._id.toString(),
      number: nextTicket.ticketNumber,
      customer: {
        id: nextTicket.customer?.toString() || "unknown",
        name: nextTicket.customerName || "Customer",
        phone: nextTicket.notificationPhone || "N/A"
      },
      service: nextTicket.serviceName,
      serviceId: nextTicket.service?.toString() || "",
      priority: nextTicket.priority || "normal",
      waitTime: nextTicket.estimatedWaitTime || 0,
      estimatedStart: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    return NextResponse.json({ 
      success: true, 
      ticket 
    });
    
  } catch (error) {
    console.error("Error calling next:", error);
    return NextResponse.json(
      { success: false, error: "Failed to call next" },
      { status: 500 }
    );
  }
}