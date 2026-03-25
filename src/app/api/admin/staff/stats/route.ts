import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Appointment from "@/lib/db/models/Appointment";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== "admin") {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const totalStaff = await User.countDocuments({ role: "staff" });
    const activeStaff = await User.countDocuments({ role: "staff", isApproved: true });
    const pendingApprovals = await User.countDocuments({ role: "staff", isApproved: false });
    
    const staffMembers = await User.find({ role: "staff", isApproved: true });
    
    let totalPerformance = 0;
    let totalCustomersServed = 0;
    
    for (const staff of staffMembers) {
      const servedCount = await Appointment.countDocuments({ servedBy: staff._id });
      totalCustomersServed += servedCount;
      totalPerformance += 90; 
    }

    const stats = {
      totalStaff,
      activeStaff,
      pendingApprovals,
      onLeave: 0, 
      averagePerformance: staffMembers.length > 0 ? totalPerformance / staffMembers.length : 0,
      totalCustomersServed
    };

    return NextResponse.json(stats);
    
  } catch (error) {
    console.error("Error fetching staff stats:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff stats" },
      { status: 500 }
    );
  }
}