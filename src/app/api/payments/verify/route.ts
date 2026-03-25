import { NextResponse } from "next/server";
import connectDB from "@/lib/db/mongodb";
import Transaction from "@/lib/db/models/Transaction";
import Appointment from "@/lib/db/models/Appointment";
import Service from "@/lib/db/models/Service";
import { paystack } from "@/lib/services/paystack";
import { generateTicketQRCode } from "@/lib/utils/qrcode";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const reference = searchParams.get("reference");

  console.log("🔍 Verifying payment with reference:", reference);

  if (!reference) {
    return NextResponse.redirect(new URL("/kiosk?payment=failed", req.url));
  }

  try {
    await connectDB();
    
    const transaction = await Transaction.findOne({ reference });
    
    if (!transaction) {
      console.error("❌ Transaction not found:", reference);
      return NextResponse.redirect(new URL("/kiosk?payment=failed", req.url));
    }

    const verification = await paystack.verifyPayment(reference);
    
    console.log("✅ Paystack verification:", verification.data.status);

    if (verification.data.status === "success") {
      await Transaction.findOneAndUpdate(
        { reference },
        { 
          status: "success",
          verifiedAt: new Date(),
          paymentDetails: verification.data
        }
      );

      const serviceId = transaction.metadata?.serviceId;
      const customerPhone = transaction.metadata?.customerPhone;
      const userId = transaction.userId || transaction.metadata?.userId;
      const problemDescription = transaction.metadata?.problemDescription || "";
      
      const service = await Service.findById(serviceId);
      
      if (!service) {
        console.error("❌ Service not found:", serviceId);
        return NextResponse.redirect(new URL("/kiosk?payment=failed", req.url));
      }

      const today = new Date();
      const dateStr = today.toISOString().slice(0, 10).replace(/-/g, "");
      const startOfDay = new Date(today.setHours(0, 0, 0, 0));
      const endOfDay = new Date(today.setHours(23, 59, 59, 999));
      
      const count = await Appointment.countDocuments({
        createdAt: { $gte: startOfDay, $lte: endOfDay }
      });
      const ticketNumber = `${dateStr}-${(count + 1).toString().padStart(3, "0")}`;
      
      const now = new Date();
      const endTime = new Date(now.getTime() + (service.duration || 30) * 60000);
      
      const queueCount = await Appointment.countDocuments({
        createdAt: { $gte: startOfDay }
      });
      const queuePosition = queueCount + 1;
      const appointment = await Appointment.create({
        customer: userId,
        service: service._id,
        serviceName: service.name,
        ticketNumber: ticketNumber,
        problemDescription: problemDescription,
        notificationPhone: customerPhone,
        startTime: now,
        endTime: endTime,
        status: "waiting",
        priority: "normal",
        queuePosition: queuePosition,
        estimatedWaitTime: service.duration,
        paymentStatus: "paid",
        paymentMethod: "card",
        paymentReference: reference,
        amountPaid: transaction.amount / 100,
        paidAt: new Date(),
        notificationSent: false
      });

      

      await new Promise(resolve => setTimeout(resolve, 500));

      try {
        const qrCodeDataURL = await generateTicketQRCode(ticketNumber, appointment._id.toString());
        
        await Appointment.findByIdAndUpdate(appointment._id, {
          qrCode: qrCodeDataURL,
          qrCodeGeneratedAt: new Date()
        });
        
      } catch (qrError) {
        console.error("❌ Error generating QR code:", qrError);
      }

      const verifyAppointment = await Appointment.findById(appointment._id);
      if (!verifyAppointment) {
        console.error("❌ Appointment not found after creation!");
        return NextResponse.redirect(new URL("/kiosk?payment=failed", req.url));
      }

      const baseUrl = process.env.NEXTAUTH_URL || "http://localhost:3000";
      console.log(`Redirecting to: ${baseUrl}/kiosk/ticket/${appointment._id}`);
      
      return NextResponse.redirect(
        new URL(`/kiosk/ticket/${appointment._id}`, baseUrl)
      );
      
    } else {
      await Transaction.findOneAndUpdate(
        { reference },
        { status: "failed" }
      );
      
      return NextResponse.redirect(new URL("/kiosk?payment=failed", req.url));
    }
    
  } catch (error) {
    console.error("❌ Payment verification error:", error);
    return NextResponse.redirect(new URL("/kiosk?payment=failed", req.url));
  }
}