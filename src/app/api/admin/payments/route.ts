import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Transaction from "@/lib/db/models/Transaction";
import Appointment from "@/lib/db/models/Appointment";

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session || session.user.role !== 'admin') {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    await connectDB();

    const transactions = await Transaction.find({})
      .populate('userId', 'name email')
      .sort({ createdAt: -1 })
      .lean();

    const completedTransactions = transactions.filter(t => t.status === 'success');
    const totalRevenue = completedTransactions.reduce((sum, t) => sum + (t.amount / 100), 0);
    const pendingTransactions = transactions.filter(t => t.status === 'pending');
    const failedTransactions = transactions.filter(t => t.status === 'failed');

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const todayTransactions = transactions.filter(t => new Date(t.createdAt) >= today);

    const stats = {
      totalRevenue: totalRevenue,
      revenueGrowth: 12.5,
      transactions: transactions.length,
      transactionGrowth: 8.3,
      averageValue: transactions.length > 0 ? totalRevenue / transactions.length : 0,
      avgGrowth: 5.2,
      pendingPayments: pendingTransactions.length,
      pendingGrowth: -2.1,
      successfulRate: transactions.length > 0 ? (completedTransactions.length / transactions.length) * 100 : 0,
      refundRate: 0.5
    };

    const paymentMethods = [
      { method: "Card", count: completedTransactions.length, amount: totalRevenue, percentage: 100 }
    ];

    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      date.setHours(0, 0, 0, 0);
      const nextDay = new Date(date);
      nextDay.setDate(nextDay.getDate() + 1);
      
      const dayTransactions = transactions.filter(t => {
        const txDate = new Date(t.createdAt);
        return txDate >= date && txDate < nextDay && t.status === 'success';
      });
      
      const dayAmount = dayTransactions.reduce((sum, t) => sum + (t.amount / 100), 0);
      
      last7Days.push({
        day: date.toLocaleDateString('en-US', { weekday: 'short' }),
        amount: dayAmount
      });
    }

    const transformedTransactions = transactions.map((tx: any) => ({
      id: tx._id.toString(),
      ticket: tx.metadata?.ticketNumber || tx.reference?.slice(-8) || 'N/A',
      customer: tx.metadata?.customerName || tx.userId?.name || 'Customer',
      amount: tx.amount / 100,
      method: "Card",
      status: tx.status === 'success' ? 'completed' : tx.status,
      date: new Date(tx.createdAt).toLocaleDateString(),
      time: new Date(tx.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }));

    return NextResponse.json({
      stats,
      transactions: transformedTransactions,
      paymentMethods,
      dailyRevenue: last7Days
    });

  } catch (error) {
    console.error("Error fetching payments:", error);
    return NextResponse.json({ error: "Failed to fetch payments" }, { status: 500 });
  }
}