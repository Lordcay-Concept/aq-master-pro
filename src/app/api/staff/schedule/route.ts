import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Schedule from "@/lib/db/models/Schedule"; 

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const week = searchParams.get('week');

    await connectDB();
    
    const schedules = await Schedule.find({ 
      staffId: session.user.id,
      ...(week ? { weekStart: new Date(week) } : {})
    }).sort({ date: 1 });

    return NextResponse.json(schedules);
    
  } catch (error) {
    console.error("Error fetching schedule:", error);
    return NextResponse.json([]);
  }
}