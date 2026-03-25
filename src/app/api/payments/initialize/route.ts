import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/auth";
import connectDB from "@/lib/db/mongodb";
import Transaction from "@/lib/db/models/Transaction";
import Service from "@/lib/db/models/Service";
import { paystack } from "@/lib/services/paystack";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    if (!session) {
      return NextResponse.json(
        { error: "Unauthorized" },
        { status: 401 }
      );
    }

    const { serviceId, phone, description } = await req.json();

    if (!serviceId || !phone) {
      return NextResponse.json(
        { error: "Service ID and phone are required" },
        { status: 400 }
      );
    }

    await connectDB();

    const service = await Service.findById(serviceId);
        if (!service) {
          return NextResponse.json(
            { error: "Service not found" },
            { status: 404 }
          );
        }

    const reference = paystack.generateReference();
    const idempotencyKey = `${session.user.id}-${serviceId}-${Date.now()}`;

    const existingTransaction = await Transaction.findOne({ idempotencyKey });
    if (existingTransaction) {
      return NextResponse.json({
        authorization_url: existingTransaction.authorizationUrl,
        reference: existingTransaction.reference,
        transactionId: existingTransaction._id,
      });
    }

  const amountInKobo = paystack.toKobo(service.price);
    
    const transaction = await Transaction.create({
      userId: session.user.id,
      amount: amountInKobo,
      currency: 'NGN',
      reference,
      status: 'pending',
      initiatedAt: new Date(),
      retryCount: 0,
      idempotencyKey,
      metadata: {
        serviceId: service._id.toString(),
        serviceName: service.name,
        customerName: session.user.name || 'Customer',
        customerEmail: session.user.email!,
        customerPhone: phone,
        problemDescription: description || '',
      },
    });

    const callbackUrl = `${process.env.NEXTAUTH_URL}/api/payments/verify?reference=${reference}`;
    
    const paystackResponse = await paystack.initializePayment({
      email: session.user.email!,
      amount: amountInKobo,
      reference,
      callbackUrl,
      metadata: {
        userId: session.user.id,
        transactionId: transaction._id.toString(),
        serviceId: service._id.toString(),
        serviceName: service.name,
        customerPhone: phone,
      },
    });

    transaction.accessCode = paystackResponse.data.access_code;
    transaction.authorizationUrl = paystackResponse.data.authorization_url;
    await transaction.save();

    return NextResponse.json({
      success: true,
      authorization_url: paystackResponse.data.authorization_url,
      reference: paystackResponse.data.reference,
      transactionId: transaction._id,
    });

  } catch (error) {
    console.error("Payment initialization error:", error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : "Failed to initialize payment" },
      { status: 500 }
    );
  }
}