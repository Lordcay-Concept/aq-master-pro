"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

interface PaymentStatusProps {
  type: 'success' | 'failed' | 'processing';
  reference?: string;
  appointmentId?: string;
}

export function PaymentStatus({ type, reference, appointmentId }: PaymentStatusProps) {
  const router = useRouter();
  const [countdown, setCountdown] = useState(10);

  useEffect(() => {
    if (type === 'success' && appointmentId) {
      const timer = setInterval(() => {
        setCountdown((prev) => {
          if (prev <= 1) {
            clearInterval(timer);
            router.push(`/ticket/${appointmentId}`);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [type, appointmentId, router]);

  if (type === 'processing') {
    return (
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="flex justify-center mb-4"
          >
            <Loader2 className="h-16 w-16 text-blue-600" />
          </motion.div>
          <CardTitle className="text-2xl">Verifying Payment</CardTitle>
          <CardDescription>
            Please wait while we confirm your payment...
          </CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (type === 'success') {
    return (
      <Card className="w-full max-w-md text-center">
        <CardHeader>
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", damping: 10 }}
            className="flex justify-center mb-4"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-10 w-10 text-green-600" />
            </div>
          </motion.div>
          <CardTitle className="text-2xl text-green-600">Payment Successful!</CardTitle>
          <CardDescription>
            Your payment has been confirmed. Your ticket is being prepared.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-gray-500 mb-2">Reference: {reference}</p>
          <p className="text-sm text-gray-600">
            Redirecting to your ticket in {countdown} seconds...
          </p>
          <div className="w-full bg-gray-200 h-2 rounded-full mt-4 overflow-hidden">
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 10, ease: "linear" }}
              className="h-full bg-green-500"
            />
          </div>
        </CardContent>
        <CardFooter className="flex justify-center space-x-3">
          <Button
            variant="outline"
            onClick={() => router.push(`/ticket/${appointmentId}`)}
          >
            View Ticket Now
          </Button>
          <Button
            className="bg-gradient-to-r from-blue-600 to-purple-600 text-white"
            onClick={() => router.push("/customer/dashboard")}
          >
            Go to Dashboard
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-md text-center">
      <CardHeader>
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex justify-center mb-4"
        >
          <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center">
            <XCircle className="h-10 w-10 text-red-600" />
          </div>
        </motion.div>
        <CardTitle className="text-2xl text-red-600">Payment Failed</CardTitle>
        <CardDescription>
          We couldn't process your payment. Please try again.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4">Reference: {reference}</p>
        <div className="bg-red-50 p-4 rounded-lg">
          <p className="text-sm text-red-700">
            Common reasons: insufficient funds, incorrect card details, or network issues.
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex justify-center space-x-3">
        <Button
          variant="outline"
          onClick={() => router.push("/kiosk")}
        >
          Try Again
        </Button>
        <Button
          variant="ghost"
          onClick={() => router.push("/customer/dashboard")}
        >
          Go to Dashboard
        </Button>
      </CardFooter>
    </Card>
  );
}