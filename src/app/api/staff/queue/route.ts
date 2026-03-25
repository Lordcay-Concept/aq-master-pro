import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();
    
    const appointments = await Appointment.find({ 
      status: "waiting"
    })
    .sort({ createdAt: 1 })
    .limit(20);

    
const queue = appointments.map((app: any) => ({
  id: app._id.toString(),
  number: app.ticketNumber,
  customer: {
    id: app.customer?._id?.toString() || '',
    name: app.customer?.name || app.customerName || 'Customer',
    phone: app.customer?.phone || app.notificationPhone || 'N/A',
    email: app.customer?.email || ''
  },
  service: {
    id: app.service?._id?.toString() || '',
    name: app.serviceName,
    duration: app.service?.duration || app.estimatedWaitTime || 15
  },
  priority: app.priority || 'normal', 
  createdAt: app.createdAt,
  estimatedWait: app.estimatedWaitTime || 0,
  status: app.status || 'waiting',
  counter: app.counter || null,
  notes: app.serviceNote || '',
  queuePosition: app.queuePosition || 0
}));

    return NextResponse.json(queue);
    
  } catch (error) {
    console.error("Error fetching queue:", error);
    return NextResponse.json([]);
  }
}