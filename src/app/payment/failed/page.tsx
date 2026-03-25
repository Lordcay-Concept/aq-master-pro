"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PaymentStatus } from "@/components/PaymentStatus";

function PaymentFailedContent() {
  const searchParams = useSearchParams();
  const reference = searchParams.get('reference');
  const error = searchParams.get('error');

  return (
    <PaymentStatus 
      type="failed" 
      reference={reference || undefined} 
    />
  );
}

export default function PaymentFailedPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-orange-50 flex items-center justify-center p-4">
      <Suspense fallback={<PaymentStatus type="processing" />}>
        <PaymentFailedContent />
      </Suspense>
    </div>
  );
}