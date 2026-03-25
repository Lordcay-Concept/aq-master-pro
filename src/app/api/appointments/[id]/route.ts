import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const { id } = await params;
    
    console.log("Fetching appointment with ID:", id);
    
    const appointment = await Appointment.findById(id)
      .populate('service', 'name duration price');
    
    if (!appointment) {
      return NextResponse.json(
        { error: "Ticket not found" },
        { status: 404 }
      );
    }
    
    
    return NextResponse.json({
      _id: appointment._id,
      ticketNumber: appointment.ticketNumber,
      serviceName: appointment.serviceName,
      service: appointment.service,
      status: appointment.status,
      queuePosition: appointment.queuePosition,
      estimatedWaitTime: appointment.estimatedWaitTime,
      notificationPhone: appointment.notificationPhone,
      paymentReference: appointment.paymentReference,
      amountPaid: appointment.amountPaid,
      createdAt: appointment.createdAt,
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      qrCode: appointment.qrCode || null
    });
    
  } catch (error) {
    console.error("Error fetching appointment:", error);
    return NextResponse.json(
      { error: "Failed to fetch ticket" },
      { status: 500 }
    );
  }
}