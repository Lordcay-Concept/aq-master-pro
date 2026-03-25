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

    const appointments = await Appointment.find({})
      .populate('customer', 'name email phone')
      .sort({ createdAt: -1 })
      .lean();

    console.log(`Found ${appointments.length} appointments`); 

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    const todayAppointments = appointments.filter(app => {
      const appDate = new Date(app.createdAt);
      return appDate >= today && appDate < tomorrow;
    });

    const stats = {
      total: appointments.length,
      today: todayAppointments.length,
      confirmed: appointments.filter(a => a.status === 'confirmed' || a.status === 'waiting').length,
      waiting: appointments.filter(a => a.status === 'waiting').length,
      completed: appointments.filter(a => a.status === 'completed').length,
      cancelled: appointments.filter(a => a.status === 'cancelled').length,
      revenue: appointments.reduce((sum, a) => sum + (a.amountPaid || 0), 0),
      noShow: appointments.filter(a => a.status === 'no-show').length,
      satisfaction: appointments.filter(a => a.satisfaction).length > 0 
        ? Math.round(appointments.filter(a => a.satisfaction).reduce((sum, a) => sum + (a.satisfaction || 0), 0) / 
          appointments.filter(a => a.satisfaction).length * 20)
        : 85
    };

    const transformedAppointments = appointments.map((app: any) => {
      let date = '';
      let time = '';
      let duration = app.estimatedWaitTime || 15;
      
      if (app.startTime) {
        const startDate = new Date(app.startTime);
        date = startDate.toISOString().split('T')[0];
        time = startDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      } else {
        const createdDate = new Date(app.createdAt);
        date = createdDate.toISOString().split('T')[0];
        time = createdDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      }

      let paymentStatus: "paid" | "pending" | "unpaid" | "refunded" | "free" = "free";
      if (app.amountPaid > 0) {
        paymentStatus = "paid";
      } else if (app.paymentStatus === 'pending') {
        paymentStatus = "pending";
      } else if (app.paymentStatus === 'failed') {
        paymentStatus = "unpaid";
      }

      let appointmentStatus: "confirmed" | "waiting" | "completed" | "cancelled" | "pending" = "waiting";
      if (app.status === 'waiting') appointmentStatus = "waiting";
      else if (app.status === 'calling') appointmentStatus = "confirmed";
      else if (app.status === 'serving') appointmentStatus = "confirmed";
      else if (app.status === 'completed') appointmentStatus = "completed";
      else if (app.status === 'cancelled') appointmentStatus = "cancelled";
      else if (app.status === 'no-show') appointmentStatus = "cancelled";

      return {
        id: app._id.toString(),
        ticketNumber: app.ticketNumber || `TKT-${app._id.toString().slice(-6)}`,
        customer: {
          id: app.customer?._id?.toString() || '',
          name: app.customer?.name || app.customerName || 'Customer',
          email: app.customer?.email || '',
          phone: app.customer?.phone || app.notificationPhone || ''
        },
        service: {
          id: app.service?.toString() || '',
          name: app.serviceName || 'Service',
          type: 'General'
        },
        date: date,
        time: time,
        duration: duration,
        status: appointmentStatus,
        payment: paymentStatus,
        amount: app.amountPaid || 0,
        notes: app.problemDescription || '',
        createdAt: app.createdAt,
        notifications: {
          sms: true,
          email: true,
          whatsapp: false
        }
      };
    });

    console.log(`Transformed ${transformedAppointments.length} appointments for frontend`);

    return NextResponse.json({ appointments: transformedAppointments, stats });

  } catch (error) {
    console.error("Error fetching appointments:", error);
    return NextResponse.json({ 
      appointments: [], 
      stats: {
        total: 0,
        today: 0,
        confirmed: 0,
        waiting: 0,
        completed: 0,
        cancelled: 0,
        revenue: 0,
        noShow: 0,
        satisfaction: 85
      }
    }, { status: 200 });
  }
}