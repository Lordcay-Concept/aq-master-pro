import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Transaction from "@/lib/db/models/Transaction";
import Appointment from "@/lib/db/models/Appointment";
import { paystack } from "@/lib/services/paystack";
import { emailService } from "@/lib/services/email";
import { smsService } from "@/lib/services/sms";
import crypto from 'crypto';

export async function POST(req: Request) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get('x-paystack-signature');

    if (!signature || !paystack.verifyWebhookSignature(signature, rawBody)) {
      console.error('Invalid webhook signature');
      return new NextResponse('Invalid signature', { status: 401 });
    }

    const payload = JSON.parse(rawBody);
    
    console.log(`Webhook received: ${payload.event} for ${payload.data?.reference}`);

    if (payload.event !== 'charge.success') {
      return new NextResponse('Event ignored', { status: 200 });
    }

    const { data } = payload;
    const reference = data.reference;

    await connectDB();

    const transaction = await Transaction.findOne({ reference });
    
    if (!transaction) {
      console.error(`Transaction not found for reference: ${reference}`);
      return new NextResponse('Transaction not found', { status: 404 });
    }

    if (transaction.status === 'success') {
      console.log(`Transaction ${reference} already processed`);
      return new NextResponse('Already processed', { status: 200 });
    }

    transaction.status = 'success';
    transaction.paidAt = new Date(data.paid_at);
    transaction.webhookPayload = data;
    transaction.webhookReceivedAt = new Date();
    await transaction.save();

    const ticketNumber = `TK-${Math.floor(1000 + Math.random() * 9000)}`;

    const appointment = await Appointment.create({
      customer: transaction.userId,
      serviceName: transaction.metadata.serviceName,
      problemDescription: transaction.metadata.problemDescription || '',
      notificationPhone: transaction.metadata.customerPhone,
      startTime: new Date(),
      endTime: new Date(Date.now() + 30 * 60000),
      ticketNumber,
      status: 'waiting',
      paymentStatus: 'paid',
      paymentReference: transaction.reference,
      amountPaid: paystack.fromKobo(transaction.amount),
      paidAt: transaction.paidAt,
      notificationSent: false,
      metadata: {
        transactionId: transaction._id.toString(),
      },
    });

    transaction.appointmentId = appointment._id;
    transaction.completedAt = new Date();
    await transaction.save();

    const emailSent = await emailService.sendPaymentConfirmation({
      to: transaction.metadata.customerEmail,
      name: transaction.metadata.customerName,
      amount: paystack.fromKobo(transaction.amount),
      reference: transaction.reference,
      serviceName: transaction.metadata.serviceName,
      ticketNumber: appointment.ticketNumber,
      date: new Date(),
    });

    const smsSent = await smsService.sendPaymentConfirmation({
      to: transaction.metadata.customerPhone,
      name: transaction.metadata.customerName,
      amount: paystack.fromKobo(transaction.amount),
      reference: transaction.reference,
      serviceName: transaction.metadata.serviceName,
      ticketNumber: appointment.ticketNumber,
    });

    transaction.emailSent = emailSent;
    transaction.smsSent = smsSent;
    transaction.notifiedAt = new Date();
    await transaction.save();

    console.log(`Payment processed successfully for ${reference}. Ticket: ${appointment.ticketNumber}`);

    return new NextResponse('Webhook processed successfully', { status: 200 });

  } catch (error) {
    console.error('Webhook error:', error);
    return new NextResponse('Webhook received', { status: 200 });
  }
}