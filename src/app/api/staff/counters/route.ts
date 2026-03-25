import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";
import User from "@/lib/db/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const staff = await User.find({ role: "staff", isApproved: true }).limit(10);
    
    const servingTickets = await Appointment.find({ 
      status: { $in: ["serving", "calling"] }
    });

    const counters = staff.map((s, index) => {
      const serving = servingTickets.find(t => t.servedBy?.toString() === s._id.toString());
      return {
        id: index + 1,
        name: `Counter ${index + 1}`,
        status: serving ? "active" : (s.onBreak ? "break" : "idle"),
        currentTicket: serving?.ticketNumber,
        staff: s.name
      };
    });

    return NextResponse.json(counters);
    
  } catch (error) {
    console.error("Error fetching counters:", error);
    return NextResponse.json([]);
  }
}