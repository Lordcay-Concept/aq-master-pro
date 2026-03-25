import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Transaction from "@/lib/db/models/Transaction";
import Appointment from "@/lib/db/models/Appointment";
import { emailService } from "@/lib/services/email";
import { smsService } from "@/lib/services/sms";

export async function POST(req: Request) {
  try {
    const { transactionId, appointmentId } = await req.json();

    if (!transactionId || !appointmentId) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectDB();

    const transaction = await Transaction.findById(transactionId);
    const appointment = await Appointment.findById(appointmentId);

    if (!transaction || !appointment) {
      return NextResponse.json(
        { error: "Transaction or appointment not found" },
        { status: 404 }
      );
    }

    if (transaction.emailSent && transaction.smsSent) {
      return NextResponse.json({
        success: true,
        message: "Already notified",
      });
    }

    const results = {
      email: false,
      sms: false,
    };

    if (!transaction.emailSent) {
      results.email = await emailService.sendPaymentConfirmation({
        to: transaction.metadata.customerEmail,
        name: transaction.metadata.customerName,
        amount: transaction.amount / 100,
        reference: transaction.reference,
        serviceName: transaction.metadata.serviceName,
        ticketNumber: appointment.ticketNumber,
        date: new Date(),
      });
    }

    if (!transaction.smsSent) {
      results.sms = await smsService.sendPaymentConfirmation({
        to: transaction.metadata.customerPhone,
        name: transaction.metadata.customerName,
        amount: transaction.amount / 100,
        reference: transaction.reference,
        serviceName: transaction.metadata.serviceName,
        ticketNumber: appointment.ticketNumber,
      });
    }

    if (results.email || results.sms) {
      transaction.emailSent = transaction.emailSent || results.email;
      transaction.smsSent = transaction.smsSent || results.sms;
      transaction.notifiedAt = new Date();
      await transaction.save();
    }

    return NextResponse.json({
      success: true,
      notifications: results,
    });

  } catch (error) {
    console.error("Notification error:", error);
    return NextResponse.json(
      { error: "Failed to send notifications" },
      { status: 500 }
    );
  }
}