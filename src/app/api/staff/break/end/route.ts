import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function POST() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    await User.findByIdAndUpdate(session.user.id, {
      onBreak: false,
      breakEnd: new Date()
    });

    return NextResponse.json({ 
      success: true,
      message: "Break ended"
    });
    
  } catch (error) {
    console.error("Error ending break:", error);
    return NextResponse.json(
      { success: false, error: "Failed to end break" },
      { status: 500 }
    );
  }
}