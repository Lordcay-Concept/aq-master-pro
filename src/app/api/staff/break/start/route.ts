import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { duration, reason } = await req.json();

    await connectDB();
    
    await User.findByIdAndUpdate(session.user.id, {
      onBreak: true,
      breakStart: new Date(),
      breakDuration: duration,
      breakReason: reason
    });

    return NextResponse.json({ 
      success: true,
      message: "Break started"
    });
    
  } catch (error) {
    console.error("Error starting break:", error);
    return NextResponse.json(
      { success: false, error: "Failed to start break" },
      { status: 500 }
    );
  }
}