import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const staff = await User.find({ role: 'staff' })
      .sort({ createdAt: -1 })
      .lean();

    const transformedStaff = staff.map((s: any) => ({
      _id: s._id.toString(),
      id: s._id.toString(),
      name: s.name,
      email: s.email,
      phone: s.phone || '',
      role: s.role,
      department: s.department || 'Not Assigned',
      status: s.status || (s.isApproved ? 'active' : 'pending'),
      joinDate: s.joinDate || s.createdAt,
      createdAt: s.createdAt,
      appliedDate: s.createdAt,
      performance: s.performance || 0,
      customersServed: s.customersServed || 0,
      avgTime: s.avgTime || '0 min',
      satisfaction: s.satisfaction || 0,
      experience: s.experience || '',
      qualifications: s.qualifications || []
    }));

    return NextResponse.json(transformedStaff);

  } catch (error) {
    console.error("Error fetching staff:", error);
    return NextResponse.json({ error: "Failed to fetch staff" }, { status: 500 });
  }
}