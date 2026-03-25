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

    const body = await req.json();
    const { satisfaction, notes } = body;
    const { id } = await params;

    await connectDB();

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { 
        status: "completed",
        completedAt: new Date(),
        satisfaction: satisfaction || null,
        serviceNote: notes || null
      },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error completing ticket:", error);
    return NextResponse.json({ error: "Failed to complete ticket" }, { status: 500 });
  }
}