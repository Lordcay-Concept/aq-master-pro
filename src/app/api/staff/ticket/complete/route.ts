import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { ticketId, satisfaction, notes } = await req.json();

    await connectDB();
    
    const appointment = await Appointment.findByIdAndUpdate(
      ticketId,
      {
        status: "completed",
        completedAt: new Date(),
        satisfaction,
        serviceNote: notes
      },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json(
        { success: false, error: "Ticket not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ 
      success: true,
      message: "Ticket completed successfully"
    });
    
  } catch (error) {
    console.error("Error completing ticket:", error);
    return NextResponse.json(
      { success: false, error: "Failed to complete ticket" },
      { status: 500 }
    );
  }
}