import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || (session.user.role !== 'staff' && session.user.role !== 'admin')) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const waitingTickets = await Appointment.find({
      status: "waiting",
      $or: [
        { servedBy: { $exists: false } },
        { servedBy: null }
      ]
    })
      .sort({ priority: -1, queuePosition: 1 })
      .limit(20);

    const queue = waitingTickets.map(ticket => ({
      id: ticket._id.toString(),
      number: ticket.ticketNumber,
      customer: {
        name: ticket.customerName || "Customer",
        phone: ticket.notificationPhone || "N/A",
        email: ticket.customerEmail || ""
      },
      service: ticket.serviceName,
      priority: ticket.priority || "normal",
      waitTime: ticket.estimatedWaitTime || 0,
      estimatedStart: new Date(ticket.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      notes: ticket.problemDescription || ""
    }));

    const activeTicket = await Appointment.findOne({
      servedBy: session.user.id,
      status: { $in: ["calling", "serving"] }
    });

    let activeTicketData = null;
    if (activeTicket) {
      activeTicketData = {
        id: activeTicket._id.toString(),
        number: activeTicket.ticketNumber,
        customer: {
          name: activeTicket.customerName || "Customer",
          phone: activeTicket.notificationPhone || "N/A",
          email: activeTicket.customerEmail || ""
        },
        service: activeTicket.serviceName,
        priority: activeTicket.priority || "normal",
        waitTime: activeTicket.estimatedWaitTime || 0,
        estimatedStart: new Date(activeTicket.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        notes: activeTicket.problemDescription || ""
      };
    }

    return NextResponse.json({
      activeTicket: activeTicketData,
      queue: queue
    });

  } catch (error) {
    console.error("Error fetching queue:", error);
    return NextResponse.json({ activeTicket: null, queue: [] });
  }
}