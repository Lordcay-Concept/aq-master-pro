"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  Clock, Smartphone, ArrowRight, CheckCircle, AlertCircle,
  Sparkles, Shield, ChevronRight, Home, RefreshCw
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card, CardContent, CardDescription, CardHeader, CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface Service {
  _id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
  available: boolean;
  icon: string;
  color: string;
}

interface NotificationState {
  show: boolean;
  message: string;
  type: "success" | "error" | "info";
}

export default function KioskPage() {
  const router = useRouter();
  const [step, setStep] = useState<number>(1);
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [phone, setPhone] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [paymentLoading, setPaymentLoading] = useState<boolean>(false);
  const [notification, setNotification] = useState<NotificationState>({ 
    show: false, 
    message: "", 
    type: "success" 
  });
  const [services, setServices] = useState<Service[]>([]);
  const [fetchingServices, setFetchingServices] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const serviceIcons = ["👥", "💰", "🔧", "📋", "📄"];
  const serviceColors = [
    "from-blue-500 to-cyan-500",
    "from-green-500 to-emerald-500",
    "from-purple-500 to-pink-500",
    "from-orange-500 to-red-500",
    "from-indigo-500 to-blue-500"
  ];

  useEffect(() => {
    fetchServices();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentStatus = params.get("payment");

    if (paymentStatus === "failed") {
      showNotification("Payment failed. Please try again.", "error");
      window.history.replaceState({}, "", "/kiosk");
    }
  }, []);

  const fetchServices = async (): Promise<void> => {
    setFetchingServices(true);
    setError(null);
    
    try {
      const response = await fetch("/api/services");
      const data = await response.json();
      
      if (response.ok && Array.isArray(data) && data.length > 0) {
        const servicesWithUI: Service[] = data.map((service: any, index: number) => ({
          _id: service._id.toString(),
          name: service.name,
          description: service.description,
          duration: service.duration,
          price: service.price,
          available: service.isActive,
          icon: serviceIcons[index % serviceIcons.length],
          color: serviceColors[index % serviceColors.length]
        }));
        
        setServices(servicesWithUI);
      } else {
        setError("No services found. Please contact support.");
      }
    } catch (error) {
      console.error("Error fetching services:", error);
      setError("Failed to load services. Please check your connection.");
    } finally {
      setFetchingServices(false);
    }
  };

  const showNotification = (message: string, type: "success" | "error" | "info"): void => {
    setNotification({ show: true, message, type });
    setTimeout(() => setNotification({ show: false, message: "", type: "success" }), 5000);
  };

  const handleServiceSelect = (service: Service): void => {
    if (!service.available) {
      showNotification("This service is temporarily unavailable", "error");
      return;
    }
    setSelectedService(service);
    setStep(2);
  };

  const handlePayment = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    if (!selectedService) return;
    
    setPaymentLoading(true);
    
    try {
      if (!phone || phone.trim() === "") {
        throw new Error("Phone number is required");
      }

      const requestBody = {
        serviceId: selectedService._id,
        phone: phone.trim(),
        description: description.trim() || undefined,
      };

      const response = await fetch("/api/payments/initialize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment initialization failed");
      }

      window.location.href = data.authorization_url;

    } catch (error) {
      console.error("Payment error:", error);
      showNotification(error instanceof Error ? error.message : "Payment failed", "error");
      setPaymentLoading(false);
    }
  };

  const handleNewTicket = (): void => {
    setStep(1);
    setSelectedService(null);
    setPhone("");
    setDescription("");
  };

  if (fetchingServices) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-indigo-200 border-t-indigo-600 rounded-full"
        />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-50">
        <AlertCircle className="h-12 w-12 text-red-500 mb-4" />
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Services</h2>
        <p className="text-gray-600 mb-4">{error}</p>
        <Button onClick={() => fetchServices()} className="bg-blue-600 text-white">
          <RefreshCw className="h-4 w-4 mr-2" />
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-blob animation-delay-2000" />
      </div>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification.show && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="fixed top-4 right-4 z-50"
          >
            <Alert className={`${
              notification.type === 'success' ? 'bg-green-50 border-green-200' :
              notification.type === 'error' ? 'bg-red-50 border-red-200' :
              'bg-blue-50 border-blue-200'
            } shadow-lg min-w-[300px]`}>
              <AlertDescription className={`flex items-center ${
                notification.type === 'success' ? 'text-green-700' :
                notification.type === 'error' ? 'text-red-700' :
                'text-blue-700'
              }`}>
                {notification.type === 'success' && <CheckCircle className="h-4 w-4 mr-2" />}
                {notification.type === 'error' && <AlertCircle className="h-4 w-4 mr-2" />}
                {notification.message}
              </AlertDescription>
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="container mx-auto max-w-4xl px-4 py-12 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-8"
        >
          <motion.div
            animate={{ scale: [1, 1.1, 1], rotate: [0, 5, -5, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="inline-block mb-4"
          >
            <div className="w-20 h-20 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-2xl">
              <Sparkles className="h-10 w-10 text-white" />
            </div>
          </motion.div>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent">
              Self-Service Kiosk
            </span>
          </h1>
          <p className="text-xl text-gray-600">Select a service to get your queue ticket</p>
        </motion.div>

        {/* Progress Steps */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex justify-center mb-12"
        >
          <div className="flex items-center space-x-4 bg-white/50 backdrop-blur-sm px-8 py-4 rounded-full shadow-lg">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg ${
                  step >= i ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg' : 'bg-gray-200 text-gray-500'
                }`}>
                  {step > i ? <CheckCircle className="h-5 w-5" /> : i}
                </div>
                {i < 3 && (
                  <div className={`w-20 h-1 mx-2 rounded-full ${
                    step > i ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Step 1: Select Service */}
        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm">
                <CardHeader className="text-center border-b border-gray-100">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Select a Service
                  </CardTitle>
                  <CardDescription className="text-lg">
                    Choose the service you need
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {services.map((service, index) => (
                      <motion.div
                        key={service._id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Card 
                          className="cursor-pointer hover:border-blue-500 transition-all duration-300 overflow-hidden"
                          onClick={() => handleServiceSelect(service)}
                        >
                          <div className={`h-2 bg-gradient-to-r ${service.color}`} />
                          <CardContent className="p-6">
                            <div className="flex items-start justify-between mb-4">
                              <div className={`w-12 h-12 bg-gradient-to-r ${service.color} rounded-xl flex items-center justify-center text-2xl shadow-lg`}>
                                {service.icon}
                              </div>
                              {service.price > 0 ? (
                                <Badge className="bg-green-100 text-green-700 border-green-200 px-3 py-1">
                                  ₦{service.price.toLocaleString()}
                                </Badge>
                              ) : (
                                <Badge className="bg-blue-100 text-blue-700 border-blue-200 px-3 py-1">
                                  Free
                                </Badge>
                              )}
                            </div>
                            <h3 className="font-bold text-xl mb-2">{service.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">{service.description}</p>
                            <div className="flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <Clock className="h-4 w-4 text-gray-400" />
                                <span className="text-sm font-medium">{service.duration} min</span>
                              </div>
                              <ChevronRight className="h-5 w-5 text-blue-600" />
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>

                  <div className="flex justify-center">
                    <Button
                      variant="outline"
                      size="lg"
                      onClick={() => router.push("/customer/dashboard")}
                      className="px-8 py-6 text-lg border-2"
                    >
                      <Home className="h-5 w-5 mr-2" />
                      Back to Dashboard
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}

          {/* Step 2: Enter Details */}
          {step === 2 && selectedService && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
            >
              <Card className="border-0 shadow-2xl bg-white/90 backdrop-blur-sm overflow-hidden">
                <div className={`h-2 bg-gradient-to-r ${selectedService.color}`} />
                <CardHeader className="border-b border-gray-100">
                  <CardTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Your Details
                  </CardTitle>
                  <CardDescription className="text-lg">
                    <span className="font-semibold">{selectedService.name}</span> • {selectedService.duration} min
                    {selectedService.price > 0 && ` • ₦${selectedService.price.toLocaleString()}`}
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-8">
                  <form onSubmit={handlePayment} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-lg">Phone Number</Label>
                      <div className="relative">
                        <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="+234 801 234 5678"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                          className="pl-12 py-6 text-lg border-2"
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="description" className="text-lg">Description (Optional)</Label>
                      <Textarea
                        id="description"
                        placeholder="Briefly describe your request..."
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={4}
                        className="border-2"
                      />
                    </div>

                    {selectedService.price > 0 && (
                      <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-xl border-2 border-blue-100">
                        <div className="flex items-center justify-between mb-3">
                          <span className="font-semibold text-lg">Amount to pay:</span>
                          <span className="text-3xl font-bold text-blue-600">
                            ₦{selectedService.price.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Shield className="h-4 w-4 mr-2 text-green-600" />
                          Secured by Paystack
                        </p>
                      </div>
                    )}

                    <div className="flex space-x-4 pt-4">
                      <Button
                        type="button"
                        variant="outline"
                        size="lg"
                        onClick={() => setStep(1)}
                        className="flex-1 py-6 text-lg border-2"
                      >
                        Back
                      </Button>
                      <Button
                        type="submit"
                        size="lg"
                        className={`flex-1 py-6 text-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white hover:shadow-xl ${
                          paymentLoading ? 'opacity-75 cursor-not-allowed' : ''
                        }`}
                        disabled={paymentLoading}
                      >
                        {paymentLoading ? (
                          <RefreshCw className="h-5 w-5 animate-spin" />
                        ) : (
                          <>
                            Pay Now
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </>
                        )}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>
    </div>
  );
}