import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Appointment from "@/lib/db/models/Appointment";
import User from "@/lib/db/models/User";

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
      servedBy: session.user.id,
      createdAt: { $gte: today, $lt: tomorrow }
    });

    const waiting = appointments.filter(a => a.status === "waiting").length;
    const calling = appointments.filter(a => a.status === "calling").length;
    const serving = appointments.filter(a => a.status === "serving").length;
    const completed = appointments.filter(a => a.status === "completed").length;
    const cancelled = appointments.filter(a => a.status === "cancelled").length;
    const noShow = appointments.filter(a => a.status === "no-show").length;

    const completedApps = appointments.filter(a => a.status === "completed" && a.startTime && a.completedAt);
    let avgTime = 0;
    if (completedApps.length > 0) {
      const totalTime = completedApps.reduce((sum, app) => {
        const duration = (new Date(app.completedAt).getTime() - new Date(app.startTime).getTime()) / 60000;
        return sum + duration;
      }, 0);
      avgTime = Math.round(totalTime / completedApps.length);
    }

    const ratedApps = appointments.filter(a => a.satisfaction !== null && a.satisfaction !== undefined);
    let satisfaction = 0;
    if (ratedApps.length > 0) {
      const totalRating = ratedApps.reduce((sum, app) => sum + (app.satisfaction || 0), 0);
      satisfaction = Math.round((totalRating / ratedApps.length) * 20); // Convert to percentage
    }

    const staff = await User.findById(session.user.id);

    const allStaff = await User.find({ role: 'staff', isActive: true });
    const allStaffStats = await Promise.all(allStaff.map(async (staffMember) => {
      const staffAppointments = await Appointment.find({
        servedBy: staffMember._id,
        createdAt: { $gte: today, $lt: tomorrow },
        status: "completed"
      });
      return {
        staffId: staffMember._id,
        count: staffAppointments.length
      };
    }));
    
    const sortedStats = allStaffStats.sort((a, b) => b.count - a.count);
    const rank = sortedStats.findIndex(s => s.staffId.toString() === session.user.id) + 1;

    let speed = 0;
    if (completed > 0) {
      speed = Math.min(100, Math.round((completed / (completed + waiting + calling + serving)) * 100));
    }

    return NextResponse.json({
      staffInfo: {
        id: staff?._id,
        name: staff?.name || session.user.name,
        counter: staff?.counter || 1,
        department: staff?.department || "General",
        online: staff?.online !== false,
        todayStats: {
          served: completed,
          avgTime: avgTime,
          satisfaction: satisfaction,
          breaks: staff?.breaksTaken || 0
        }
      },
      metrics: {
        dailyGoal: 50,
        speed: speed,
        rank: rank,
        totalStaff: allStaff.length
      },
      queue: [], 
      completedToday: completedApps.map(app => ({
        id: app._id.toString(),
        ticket: app.ticketNumber,
        customer: app.customerName || "Customer",
        time: new Date(app.completedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        duration: Math.round((new Date(app.completedAt).getTime() - new Date(app.startTime).getTime()) / 60000),
        satisfaction: app.satisfaction
      }))
    });

  } catch (error) {
    console.error("Error fetching staff dashboard stats:", error);
    return NextResponse.json({ error: "Failed to fetch stats" }, { status: 500 });
  }
}