import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import User from "@/lib/db/models/User";
import Appointment from "@/lib/db/models/Appointment";

export async function GET() {
  try {
    console.log("=== API /api/admin/customers called ===");
    
    const session = await getServerSession(authOptions);
    console.log("Session:", session?.user?.email, "Role:", session?.user?.role);
    
    if (!session) {
      console.log("No session found");
      return NextResponse.json({ error: "Unauthorized - No session" }, { status: 401 });
    }
    
    if (session.user.role !== 'admin') {
      console.log("Not admin, role is:", session.user.role);
      return NextResponse.json({ error: "Unauthorized - Not admin" }, { status: 401 });
    }

    console.log("Connecting to database...");
    await connectDB();
    console.log("Database connected");

    const customers = await User.find({ role: 'customer' })
      .sort({ createdAt: -1 })
      .lean();
    
    console.log(`Found ${customers.length} customers`);

    const activeAppointments = await Appointment.find({
      status: { $in: ['waiting', 'calling', 'serving'] }
    }).lean();
    
    console.log(`Found ${activeAppointments.length} active appointments`);

    const customersWithStatus = customers.map((customer: any) => {
      const activeAppointment = activeAppointments.find(
        (app: any) => app.customer?.toString() === customer._id.toString()
      );

      return {
        id: customer._id.toString(),
        name: customer.name,
        email: customer.email,
        phone: customer.phone || '',
        avatar: customer.image || '',
        tier: customer.tier || 'bronze',
        status: customer.status || 'active',
        totalVisits: customer.totalVisits || 0,
        totalSpent: customer.totalSpent || 0,
        lastVisit: customer.lastVisit ? new Date(customer.lastVisit).toLocaleDateString() : '-',
        joinDate: customer.createdAt,
        preferredService: customer.preferredService || 'Not specified',
        satisfaction: customer.satisfaction || 0,
        location: customer.location || 'Not specified',
        occupation: customer.occupation || 'Not specified',
        birthday: customer.birthday || 'Not specified',
        notifications: customer.notifications || { sms: true, email: true, whatsapp: false },
        notes: customer.notes || '',
        currentQueueStatus: activeAppointment ? {
          hasActiveTicket: true,
          ticketNumber: activeAppointment.ticketNumber,
          service: activeAppointment.serviceName,
          queuePosition: activeAppointment.queuePosition,
          estimatedWait: activeAppointment.estimatedWaitTime,
          status: activeAppointment.status,
          assignedStaff: activeAppointment.servedBy?.toString() || '',
          updatedAt: activeAppointment.updatedAt
        } : {
          hasActiveTicket: false
        }
      };
    });

    const waitingNow = customersWithStatus.filter((c: any) => 
      c.currentQueueStatus?.status === "waiting"
    ).length;
    
    const beingServed = customersWithStatus.filter((c: any) => 
      c.currentQueueStatus?.status === "calling" || c.currentQueueStatus?.status === "serving"
    ).length;

    const stats = {
      total: customers.length,
      active: customers.filter((c: any) => c.status === "active" || !c.status).length,
      inactive: customers.filter((c: any) => c.status === "inactive").length,
      blocked: customers.filter((c: any) => c.status === "blocked").length,
      platinum: customers.filter((c: any) => c.tier === "platinum").length,
      gold: customers.filter((c: any) => c.tier === "gold").length,
      silver: customers.filter((c: any) => c.tier === "silver").length,
      bronze: customers.filter((c: any) => c.tier === "bronze" || !c.tier).length,
      waitingNow: waitingNow,
      beingServed: beingServed,
      totalVisits: customers.reduce((sum: number, c: any) => sum + (c.totalVisits || 0), 0),
      totalRevenue: customers.reduce((sum: number, c: any) => sum + (c.totalSpent || 0), 0),
      avgSatisfaction: 0,
      newThisMonth: customers.filter((c: any) => {
        const joinDate = new Date(c.createdAt);
        const now = new Date();
        return joinDate.getMonth() === now.getMonth() && 
               joinDate.getFullYear() === now.getFullYear();
      }).length
    };

    console.log("Returning response with", customersWithStatus.length, "customers");
    return NextResponse.json({ 
      customers: customersWithStatus, 
      stats 
    });

  } catch (error) {
    console.error("Error fetching customers:", error);
    return NextResponse.json({ 
      error: "Failed to fetch customers",
      details: error instanceof Error ? error.message : String(error)
    }, { status: 500 });
  }
}