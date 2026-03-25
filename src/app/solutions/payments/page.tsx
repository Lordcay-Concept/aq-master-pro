"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CreditCard, Shield, Zap, Globe, Lock, Smartphone,
  RefreshCw, FileText, CheckCircle, ArrowRight, 
  DollarSign, Receipt, Wallet, Banknote
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PaymentProcessingPage() {
  const features = [
    {
      icon: Shield,
      title: "Secure Transactions",
      description: "PCI-DSS compliant payment processing with end-to-end encryption for maximum security.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Zap,
      title: "Instant Processing",
      description: "Real-time payment verification and confirmation for seamless customer experience.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: Globe,
      title: "Multiple Gateways",
      description: "Support for Paystack, Flutterwave, Stripe, and other popular payment providers.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Payments",
      description: "Accept payments via USSD, mobile money, and QR codes for African markets.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: RefreshCw,
      title: "Automated Refunds",
      description: "Process refunds and chargebacks with automated workflows and approval chains.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: FileText,
      title: "Invoice Generation",
      description: "Auto-generate professional invoices and receipts for every transaction.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Receipt,
      title: "Subscription Billing",
      description: "Manage recurring payments and subscription plans with automated billing.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: DollarSign,
      title: "Multi-currency Support",
      description: "Accept payments in NGN, USD, EUR, GBP and 50+ other currencies.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const benefits = [
    "0% fraud rate with advanced security measures",
    "Process payments in under 2 seconds",
    "Support for 50+ currencies and 10+ payment methods",
    "Automatic reconciliation with your accounting software",
    "Detailed transaction reporting and analytics",
    "99.99% uptime guarantee"
  ];

  const stats = [
    { value: "$2B+", label: "Processed" },
    { value: "99.99%", label: "Uptime" },
    { value: "50+", label: "Currencies" },
    { value: "0%", label: "Fraud Rate" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-green-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/5 via-emerald-600/5 to-teal-600/5" />
            <div className="absolute inset-0 bg-green-pattern opacity-30" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 bg-clip-text text-transparent">
                Payment Processing
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Secure, fast, and reliable payment processing tailored for African businesses. 
              Accept payments from anywhere in the world with our comprehensive solution.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Start Processing
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Watch Demo
                </Button>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                  <div className="text-sm text-gray-500">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Payment Methods */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Accept Payments From
            </h2>
          </motion.div>

          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
            {[
              { name: "Visa", icon: CreditCard },
              { name: "Mastercard", icon: CreditCard },
              { name: "Verve", icon: CreditCard },
              { name: "Paystack", icon: Wallet },
              { name: "Flutterwave", icon: Globe },
              { name: "Bank Transfer", icon: Banknote },
              { name: "USSD", icon: Smartphone },
              { name: "Mobile Money", icon: Smartphone }
            ].map((method, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-4 rounded-xl text-center hover:shadow-md transition-shadow"
              >
                <method.icon className="h-8 w-8 text-green-600 mx-auto mb-2" />
                <span className="text-xs font-medium text-gray-700">{method.name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Enterprise-Grade{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Security & Features
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Businesses Trust{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                  Our Payment Platform
                </span>
              </h2>

              <div className="space-y-4 mb-8">
                {benefits.map((benefit, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="flex items-center"
                  >
                    <CheckCircle className="h-6 w-6 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </motion.div>
                ))}
              </div>

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-700 mb-2">
                  "Processing over ₦50 million monthly with zero issues. The security and reliability are unmatched."
                </p>
                <p className="font-semibold text-green-600">— Adebayo O., CFO at Retail Giant</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-600 to-emerald-600 p-8 rounded-3xl text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Pricing That Scales With You</h3>
              <div className="space-y-4">
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span>Transaction Fee</span>
                  <span className="font-bold">1.5%</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span>Setup Fee</span>
                  <span className="font-bold">Free</span>
                </div>
                <div className="flex justify-between items-center border-b border-white/20 pb-2">
                  <span>Monthly Fee</span>
                  <span className="font-bold">₦0</span>
                </div>
                <div className="flex justify-between items-center">
                  <span>Settlement Time</span>
                  <span className="font-bold">24hrs</span>
                </div>
              </div>
              <Link href="/pricing">
                <Button className="w-full mt-6 bg-white text-green-600 hover:bg-gray-100">
                  View Full Pricing
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 via-emerald-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Accepting Payments Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 10,000+ businesses already processing payments with us
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Create Account
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}