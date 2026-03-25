import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Appointment from "@/lib/db/models/Appointment";

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

    const totalServed = await Appointment.countDocuments({ 
      servedBy: session.user.id,
      status: "completed" 
    });

    const avgTime = await Appointment.aggregate([
      { $match: { servedBy: session.user.id, status: "completed", duration: { $exists: true } } },
      { $group: { _id: null, avg: { $avg: "$duration" } } }
    ]);

    const satisfaction = await Appointment.aggregate([
      { $match: { servedBy: session.user.id, satisfaction: { $exists: true } } },
      { $group: { _id: null, avg: { $avg: "$satisfaction" } } }
    ]);

    const daysWorked = 0; 

    const profile = {
      id: user._id.toString(),
      name: user.name,
      email: user.email,
      phone: user.phone || "",
      department: user.department || "Customer Service",
      counter: user.counter || 1,
      joinDate: user.createdAt.toISOString().split('T')[0],
      avatar: user.image,
      stats: {
        totalServed,
        avgTime: avgTime[0]?.avg ? Math.round(avgTime[0].avg) : 0,
        satisfaction: satisfaction[0]?.avg ? Math.round(satisfaction[0].avg * 20) : 0,
        daysWorked
      },
      notifications: user.notifications || {
        email: false,
        sms: false,
        app: false
      }
    };

    return NextResponse.json(profile);
    
  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json(
      { error: "Failed to fetch profile" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const updates = await req.json();
    await connectDB();
    
    const user = await User.findByIdAndUpdate(
      session.user.id,
      {
        name: updates.name,
        email: updates.email,
        phone: updates.phone,
        department: updates.department,
        counter: updates.counter,
        notifications: updates.notifications
      },
      { new: true }
    ).select("-password");

    return NextResponse.json({ 
      success: true, 
      message: "Profile updated successfully",
      user 
    });
    
  } catch (error) {
    console.error("Error updating profile:", error);
    return NextResponse.json(
      { error: "Failed to update profile" },
      { status: 500 }
    );
  }
}