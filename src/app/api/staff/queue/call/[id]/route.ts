import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    const { id } = await params;

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { 
        status: "calling",
        servedBy: session.user.id,
        startedAt: new Date()
      },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      ticket: {
        id: appointment._id.toString(),
        number: appointment.ticketNumber,
        customer: {
          name: appointment.customerName || "Customer",
          phone: appointment.notificationPhone || "N/A"
        },
        service: appointment.serviceName
      }
    });

  } catch (error) {
    console.error("Error calling ticket:", error);
    return NextResponse.json({ error: "Failed to call ticket" }, { status: 500 });
  }
}