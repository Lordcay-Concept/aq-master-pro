import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";
import User from "@/lib/db/models/User";
import Transaction from "@/lib/db/models/Transaction";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const totalCustomers = await User.countDocuments({ role: 'customer' });
    const activeQueues = await Appointment.countDocuments({ status: { $in: ['waiting', 'calling', 'serving'] } });
    
    const appointments = await Appointment.find({});
    const avgWaitTime = appointments.length > 0 
      ? Math.round(appointments.reduce((sum, a) => sum + (a.estimatedWaitTime || 0), 0) / appointments.length)
      : 0;
    
    const staffOnline = await User.countDocuments({ role: 'staff', isApproved: true });
    const todayAppointments = await Appointment.countDocuments({
      createdAt: { $gte: new Date().setHours(0,0,0,0) }
    });
    const completedToday = await Appointment.countDocuments({
      status: 'completed',
      createdAt: { $gte: new Date().setHours(0,0,0,0) }
    });
    
    const transactions = await Transaction.find({ status: 'success' });
    const revenue = transactions.reduce((sum, t) => sum + (t.amount / 100), 0);

    const recentActivities = [
      { id: "1", type: "staff_approved", description: "New staff member was approved", time: "5 min ago", status: "approved" },
      { id: "2", type: "queue_alert", description: "Queue length exceeded 15 customers", time: "15 min ago", status: "warning" },
      { id: "3", type: "appointment", description: "Appointment was completed", time: "32 min ago", status: "completed" },
    ];

    const queueStatus = [
      { counter: 1, currentTicket: "A-042", waitingCount: 3, status: "active", efficiency: 92 },
      { counter: 2, currentTicket: "B-015", waitingCount: 5, status: "busy", efficiency: 78 },
      { counter: 3, currentTicket: "-", waitingCount: 0, status: "idle", efficiency: 95 },
    ];

    const pendingApprovals = await User.find({ role: 'staff', isApproved: false })
      .limit(3)
      .lean();

    const staffPerformance = await User.find({ role: 'staff', isApproved: true })
      .limit(5)
      .lean();

    return NextResponse.json({
      stats: {
        totalCustomers,
        customerGrowth: 12,
        activeQueues,
        queueChange: 5,
        avgWaitTime,
        waitTimeChange: -2,
        staffOnline,
        staffChange: 3,
        todayAppointments,
        appointmentChange: 8,
        completedToday,
        completedChange: 10,
        revenue,
        revenueGrowth: 15,
        satisfaction: 85,
        satisfactionChange: 3
      },
      recentActivities,
      queueStatus,
      pendingApprovals: pendingApprovals.map(p => ({
        id: p._id,
        name: p.name,
        email: p.email,
        role: p.role,
        appliedAt: new Date(p.createdAt).toLocaleDateString()
      })),
      staffPerformance: staffPerformance.map(s => ({
        id: s._id,
        name: s.name,
        initials: s.name.split(' ').map(n => n[0]).join(''),
        counter: 1,
        customersServed: s.customersServed || 0,
        avgTime: s.avgTime || "4.2"
      }))
    });

  } catch (error) {
    console.error("Error fetching dashboard data:", error);
    return NextResponse.json({ error: "Failed to fetch dashboard data" }, { status: 500 });
  }
}