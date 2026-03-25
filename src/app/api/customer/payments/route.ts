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
      customer: session.user.id,
      paymentStatus: { $in: ['paid', 'pending', 'failed', 'refunded'] }
    })
    .sort({ createdAt: -1 })
    .limit(50);

    const methodMap = {
      'card': 'Card' as const,
      'bank_transfer': 'Bank Transfer' as const,
      'cash': 'Cash' as const,
      'mobile_money': 'Mobile Money' as const
    };

    const payments = appointments.map((app: any) => ({
      id: app._id.toString(),
      date: app.startTime ? new Date(app.startTime).toISOString().split('T')[0] : '',
      time: app.startTime ? new Date(app.startTime).toLocaleTimeString([], { 
        hour: '2-digit', 
        minute: '2-digit' 
      }) : '',
      service: app.serviceName,
      ticketNumber: app.ticketNumber,
      amount: app.amountPaid || 0,
      method: app.paymentMethod ? methodMap[app.paymentMethod as keyof typeof methodMap] : 'Card',
      status: app.paymentStatus,
      reference: app.paymentReference || `PAY-${Math.random().toString(36).substring(2, 10).toUpperCase()}`
    }));

    return NextResponse.json({ 
      payments,
      success: true 
    });
    
  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json(
      { error: "Failed to fetch payments" },
      { status: 500 }
    );
  }
}