"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentStatus } from "@/components/PaymentStatus";

function PaymentSuccessContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const appointmentId = searchParams.get('appointmentId');

  return (
    <PaymentStatus 
      type="success" 
      reference={reference || undefined} 
      appointmentId={appointmentId || undefined}
    />
  );
}

export default function PaymentSuccessPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-blue-50 flex items-center justify-center p-4">
      <Suspense fallback={<PaymentStatus type="processing" />}>
        <PaymentSuccessContent />
      </Suspense>
    </div>
  );
}