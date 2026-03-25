import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> } 
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const { id } = await params;
    
    const user = await User.findByIdAndUpdate(
      id, 
      { 
        isApproved: true,
        role: "staff" 
      },
      { new: true }
    ).select("-password");

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({ 
      success: true, 
      message: "Staff approved successfully",
      user 
    });
    
  } catch (error) {
    console.error("Error approving staff:", error);
    return NextResponse.json(
      { error: "Failed to approve staff" },
      { status: 500 }
    );
  }
}