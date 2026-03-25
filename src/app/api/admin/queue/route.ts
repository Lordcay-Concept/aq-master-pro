import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";
import User from "@/lib/db/models/User";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const waitingAppointments = await Appointment.find({ 
      status: { $in: ['waiting', 'calling', 'serving'] }
    }).populate('customer', 'name');

    const totalWaiting = waitingAppointments.filter(a => a.status === 'waiting').length;
    const totalServing = waitingAppointments.filter(a => a.status === 'serving').length;
    const avgWaitTime = waitingAppointments.length > 0 
      ? Math.round(waitingAppointments.reduce((sum, a) => sum + (a.estimatedWaitTime || 0), 0) / waitingAppointments.length)
      : 0;
    const longestWait = Math.max(...waitingAppointments.map(a => a.estimatedWaitTime || 0), 0);
    const completedToday = await Appointment.countDocuments({ 
      status: 'completed',
      createdAt: { $gte: new Date().setHours(0,0,0,0) }
    });

    const counters = [
      { id: 1, name: "Counter 1", status: "active", currentTicket: "A-042", waitingCount: 3, staff: "John", efficiency: 92, avatar: "JD" },
      { id: 2, name: "Counter 2", status: "busy", currentTicket: "B-015", waitingCount: 5, staff: "Sarah", efficiency: 78, avatar: "SK" },
      { id: 3, name: "Counter 3", status: "idle", currentTicket: "-", waitingCount: 0, staff: "Mike", efficiency: 95, avatar: "MJ" },
      { id: 4, name: "Counter 4", status: "break", currentTicket: "-", waitingCount: 2, staff: "Lisa", efficiency: 85, avatar: "LW" },
    ];

    const waitingQueue = waitingAppointments.map(app => ({
      id: app._id,
      ticket: app.ticketNumber,
      customer: app.customer?.name || "Customer",
      service: app.serviceName,
      waitTime: app.estimatedWaitTime || 0,
      priority: app.priority || "normal",
      counter: app.counter || null
    }));

    const serviceStats = await Appointment.aggregate([
      { $group: { _id: "$serviceName", count: { $sum: 1 }, avgTime: { $avg: "$estimatedWaitTime" } } }
    ]);

    return NextResponse.json({
      stats: { totalWaiting, totalServing, avgWaitTime, longestWait, completedToday, satisfaction: 85 },
      counters,
      waitingQueue,
      serviceStats: serviceStats.map(s => ({ service: s._id, count: s.count, avgTime: Math.round(s.avgTime), satisfaction: 85 }))
    });

  } catch (error) {
    console.error("Error fetching queue data:", error);
    return NextResponse.json({ error: "Failed to fetch queue data" }, { status: 500 });
  }
}