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
    const user = await User.findById(session.user.id).lean();

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    return NextResponse.json({
      name: (user as any).name || session.user.name || "",
      email: (user as any).email || session.user.email || "",
      phone: (user as any).phone || "",
      tier: (user as any).tier || "Bronze",
      points: (user as any).points || 0,
      totalVisits: (user as any).totalVisits || 0,
      nextTier: (user as any).nextTier || "Silver",
      pointsToNext: (user as any).pointsToNext || 500,
      createdAt: (user as any).createdAt || new Date()
    });

  } catch (error) {
    console.error("Error fetching profile:", error);
    return NextResponse.json({ error: "Failed to fetch profile" }, { status: 500 });
  }
}