import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const activeStaff = await User.find({ 
      role: "staff", 
      isApproved: true 
    }).select("-password");

    return NextResponse.json(activeStaff);
    
  } catch (error) {
    console.error("Error fetching active staff:", error);
    return NextResponse.json(
      { error: "Failed to fetch active staff" },
      { status: 500 }
    );
  }
}