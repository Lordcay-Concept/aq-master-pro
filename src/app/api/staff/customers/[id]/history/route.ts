import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;
    await connectDB();
    
    const appointments = await Appointment.find({ 
      customer: id
    })
    .sort({ createdAt: -1 })
    .limit(20);

    const history = appointments.map((app: any) => ({
      id: app._id.toString(),
      date: app.createdAt.toISOString().split('T')[0],
      service: app.serviceName,
      ticket: app.ticketNumber,
      status: app.status
    }));

    return NextResponse.json(history);
    
  } catch (error) {
    console.error("Error fetching customer history:", error);
    return NextResponse.json([]);
  }
}