"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion } from "framer-motion";
import {
  Printer, Download, Mail, Home, CheckCircle, AlertCircle, RefreshCw,
  QrCode, Share2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";

interface Appointment {
  _id: string;
  ticketNumber: string;
  serviceName: string;
  service: {
    _id: string;
    name: string;
    duration: number;
    price: number;
  };
  status: string;
  queuePosition: number;
  estimatedWaitTime: number;
  notificationPhone: string;
  paymentReference: string;
  amountPaid: number;
  createdAt: string;
  startTime: string;
  endTime: string;
  qrCode?: string;
}

export default function TicketPage() {
  const router = useRouter();
  const params = useParams();
  const ticketId = params.id as string;
  
  const [appointment, setAppointment] = useState<Appointment | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [retryCount, setRetryCount] = useState(0);
  const [notification, setNotification] = useState<{ show: boolean; message: string; type: string }>({
    show: false,
    message: "",
    type: "success"
  });
  const [showFeedback, setShowFeedback] = useState(false);
  const [rating, setRating] = useState(0);
  const [feedbackComment, setFeedbackComment] = useState("");
  const [submittingFeedback, setSubmittingFeedback] = useState(false);

  useEffect(() => {
    if (ticketId) {
      fetchAppointment();
    }
  }, [ticketId, retryCount]);

  const fetchAppointment = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(`/api/appointments/${ticketId}`);
      console.log("Response status:", response.status);
      
      const data = await response.json();
      console.log("Response data:", data);
      
      if (response.ok) {
        setAppointment(data);
      } else if (response.status === 404) {
        if (retryCount < 5) {
          console.log(`Ticket not found, retrying... (${retryCount + 1}/5)`);
          setTimeout(() => {
            setRetryCount(prev => prev + 1);
          }, 2000);
        } else {
          setError("Ticket not found. Please check your ticket number or contact support.");
        }
      } else {
        setError(data.error || "Failed to load ticket");
      }
    } catch (error) {
      console.error("Error fetching ticket:", error);
      setError("Failed to connect to server. Please refresh the page.");
    } finally {
      setLoading(false);
    }
  };

  const showNotification = (message: string, type: string) => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 3000);
  };

  const handlePrint = () => {
    window.print();
    showNotification("Sending to printer...", "info");
  };

  const handleDownload = () => {
    if (appointment?.qrCode) {
      const link = document.createElement('a');
      link.download = `ticket-${appointment.ticketNumber}.png`;
      link.href = appointment.qrCode;
      link.click();
      showNotification("Ticket downloaded successfully!", "success");
    } else {
      showNotification("QR code not available", "error");
    }
  };

  const handleShare = () => {
    navigator.clipboard.writeText(`${window.location.origin}/kiosk/ticket/${ticketId}`);
    showNotification("Ticket link copied to clipboard!", "success");
  };

  const handleRetry = () => {
    setRetryCount(0);
    fetchAppointment();
  };

  const handleSubmitFeedback = async () => {
    if (rating === 0) {
      showNotification("Please select a rating", "error");
      return;
    }

    setSubmittingFeedback(true);
    try {
      const response = await fetch("/api/customer/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          appointmentId: ticketId,
          rating,
          comment: feedbackComment,
          channel: "qr"
        })
      });

      if (response.ok) {
        showNotification("Thank you for your feedback!", "success");
        setShowFeedback(false);
        setRating(0);
        setFeedbackComment("");
      } else {
        showNotification("Failed to submit feedback", "error");
      }
    } catch (error) {
      showNotification("Failed to submit feedback", "error");
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity }}
          className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full mb-4"
        />
        <p className="text-gray-600">Loading your ticket...</p>
        {retryCount > 0 && (
          <p className="text-sm text-gray-500 mt-2">Attempt {retryCount}/5</p>
        )}
      </div>
    );
  }

  if (error || !appointment) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <AlertCircle className="h-16 w-16 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Ticket Not Found</h2>
        <p className="text-gray-600 mb-2">{error || "The ticket you're looking for doesn't exist."}</p>
        <p className="text-sm text-gray-500 mb-6">Ticket ID: {ticketId}</p>
        <div className="flex gap-4 flex-wrap justify-center">
          <Button onClick={handleRetry} className="bg-blue-600 text-white">
            <RefreshCw className="h-4 w-4 mr-2" />
            Retry
          </Button>
          <Button onClick={() => router.push("/kiosk")} className="bg-blue-600 text-white">
            Get New Ticket
          </Button>
          <Button variant="outline" onClick={() => router.push("/customer/dashboard")}>
            Go to Dashboard
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 py-12 px-4">
      {/* Notification Toast */}
      {notification.show && (
        <div className="fixed top-4 right-4 z-50 animate-in fade-in slide-in-from-top-2">
          <Alert className={`${
            notification.type === 'success' ? 'bg-green-50 border-green-200' :
            notification.type === 'error' ? 'bg-red-50 border-red-200' :
            'bg-blue-50 border-blue-200'
          } shadow-lg`}>
            <AlertDescription className={`flex items-center ${
              notification.type === 'success' ? 'text-green-700' :
              notification.type === 'error' ? 'text-red-700' :
              'text-blue-700'
            }`}>
              {notification.type === 'success' && <CheckCircle className="h-4 w-4 mr-2" />}
              {notification.message}
            </AlertDescription>
          </Alert>
        </div>
      )}

      <div className="container mx-auto max-w-3xl">
        {/* Success Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <div className="flex justify-center mb-4">
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="h-12 w-12 text-green-600" />
            </div>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
            Ticket Generated!
          </h1>
          <p className="text-lg text-gray-600 mt-2">
            Your ticket has been created successfully
          </p>
        </motion.div>

        {/* Ticket Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="border-0 shadow-2xl overflow-hidden">
            <div className="h-2 bg-gradient-to-r from-green-500 to-blue-500" />
            <CardHeader className="text-center border-b">
              <CardTitle className="text-2xl font-bold">Queue Ticket</CardTitle>
              <CardDescription>Please keep this ticket for reference</CardDescription>
            </CardHeader>
            <CardContent className="p-8">
              {/* Main Ticket Display with QR Code */}
              <div className="relative mb-8">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl blur-xl opacity-50" />
                <div className="relative bg-gradient-to-r from-blue-600 to-purple-600 p-8 rounded-2xl text-white">
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <p className="text-sm opacity-80">Ticket Number</p>
                      <p className="text-5xl font-bold tracking-wider">{appointment.ticketNumber}</p>
                    </div>
                    {/* QR Code Section */}
                    <div className="bg-white p-2 rounded-lg shadow-lg">
                      {appointment.qrCode ? (
                        <img 
                          src={appointment.qrCode} 
                          alt={`QR Code for ticket ${appointment.ticketNumber}`}
                          className="w-24 h-24 rounded"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-100 rounded flex items-center justify-center">
                          <QrCode className="h-12 w-12 text-gray-400" />
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-left">
                    <div>
                      <p className="text-sm opacity-80">Service</p>
                      <p className="font-semibold text-xl">{appointment.serviceName}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Estimated Wait</p>
                      <p className="font-semibold text-xl">{appointment.estimatedWaitTime} minutes</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Queue Position</p>
                      <p className="font-semibold text-xl">#{appointment.queuePosition}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Status</p>
                      <Badge className="bg-green-500 text-white px-3 py-1">Waiting</Badge>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Date</p>
                      <p className="font-semibold">{new Date(appointment.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div>
                      <p className="text-sm opacity-80">Time</p>
                      <p className="font-semibold">{new Date(appointment.startTime).toLocaleTimeString()}</p>
                    </div>
                  </div>
                  {appointment.amountPaid > 0 && (
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <p className="text-sm opacity-80">Amount Paid</p>
                      <p className="font-semibold text-xl">₦{appointment.amountPaid.toLocaleString()}</p>
                    </div>
                  )}
                  {appointment.paymentReference && (
                    <div className="mt-2">
                      <p className="text-xs opacity-60">Payment Reference: {appointment.paymentReference}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Notification Info */}
              <div className="bg-blue-50 p-4 rounded-lg border-2 border-blue-100 mb-6">
                <p className="text-blue-700 text-center">
                  You'll receive an SMS notification at <strong>{appointment.notificationPhone}</strong> when it's your turn
                </p>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-3 gap-3 mb-6">
                <Button variant="outline" onClick={handlePrint} className="py-6">
                  <Printer className="h-5 w-5 mr-2" /> Print
                </Button>
                <Button variant="outline" onClick={handleDownload} className="py-6">
                  <Download className="h-5 w-5 mr-2" /> Save
                </Button>
                <Button variant="outline" onClick={handleShare} className="py-6">
                  <Share2 className="h-5 w-5 mr-2" /> Share
                </Button>
              </div>

              {/* Feedback Section */}
              {!showFeedback ? (
                <Button 
                  variant="outline" 
                  className="w-full mb-6 border-green-200 text-green-600 hover:bg-green-50"
                  onClick={() => setShowFeedback(true)}
                >
                  Rate Your Experience
                </Button>
              ) : (
                <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200 mb-6">
                  <h4 className="font-semibold mb-3 text-center">How was your experience?</h4>
                  <div className="flex justify-center gap-2 mb-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <svg
                          className={`h-8 w-8 ${rating >= star ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      </button>
                    ))}
                  </div>
                  <textarea
                    placeholder="Tell us about your experience (optional)"
                    value={feedbackComment}
                    onChange={(e) => setFeedbackComment(e.target.value)}
                    rows={3}
                    className="w-full p-2 border rounded-lg mb-3"
                  />
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => setShowFeedback(false)} className="flex-1">
                      Cancel
                    </Button>
                    <Button onClick={handleSubmitFeedback} disabled={submittingFeedback} className="flex-1 bg-green-600">
                      {submittingFeedback ? "Submitting..." : "Submit Feedback"}
                    </Button>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant="outline"
                  className="py-6 text-lg"
                  onClick={() => router.push("/customer/dashboard")}
                >
                  <Home className="h-5 w-5 mr-2" /> Dashboard
                </Button>
                <Button
                  className="py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl"
                  onClick={() => router.push("/kiosk")}
                >
                  New Ticket
                </Button>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}