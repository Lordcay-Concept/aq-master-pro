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
    const { reason } = body;
    const { id } = await params;

    await connectDB();

    const appointment = await Appointment.findByIdAndUpdate(
      id,
      { 
        status: "no-show",
        completedAt: new Date(),
        serviceNote: reason || "Customer did not show up"
      },
      { new: true }
    );

    if (!appointment) {
      return NextResponse.json({ error: "Appointment not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true });

  } catch (error) {
    console.error("Error marking no-show:", error);
    return NextResponse.json({ error: "Failed to mark no-show" }, { status: 500 });
  }
}