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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const appointments = await Appointment.find({
      createdAt: { $gte: today, $lt: tomorrow },
      status: { $in: ['waiting', 'calling', 'serving'] }
    })
      .populate('customer', 'name email phone')
      .populate('service', 'name duration price')
      .sort({ queuePosition: 1 })
      .lean();

    const queue = appointments.map((app: any) => ({
      id: app._id.toString(),
      number: app.ticketNumber,
      customer: {
        id: app.customer?._id?.toString() || '',
        name: app.customer?.name || 'Unknown',
        phone: app.customer?.phone || app.notificationPhone || '',
        email: app.customer?.email || ''
      },
      service: {
        id: app.service?._id?.toString() || '',
        name: app.serviceName,
        duration: app.estimatedWaitTime || 15
      },
      priority: app.priority || 'normal',
      createdAt: app.createdAt,
      estimatedWait: app.estimatedWaitTime || 0,
      status: app.status,
      counter: app.counter || null,
      notes: app.serviceNote || '',
      queuePosition: app.queuePosition
    }));

    return NextResponse.json(queue);

  } catch (error) {
    console.error("Error fetching queue:", error);
    return NextResponse.json({ error: "Failed to fetch queue" }, { status: 500 });
  }
}