import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const user = await User.findById(session.user.id).select("-password");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    const staffInfo = {
      id: user._id,
      name: user.name,
      email: user.email,
      counter: user.counter || 1,
      department: user.department || "Customer Service",
      online: true,
      todayStats: {
        served: user.todayServed || 0,
        avgTime: user.avgTime || 0,
        satisfaction: user.satisfaction || 0,
        breaks: user.breaksTaken || 0
      },
      weeklyStats: {
        served: user.weeklyServed || 0,
        avgTime: user.weeklyAvgTime || 0,
        satisfaction: user.weeklySatisfaction || 0
      }
    };

    return NextResponse.json(staffInfo);
    
  } catch (error) {
    console.error("Error fetching staff info:", error);
    return NextResponse.json(
      { error: "Failed to fetch staff info" },
      { status: 500 }
    );
  }
}