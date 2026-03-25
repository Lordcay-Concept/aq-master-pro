"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Store, ShoppingBag, Users, Clock, CreditCard,
  TrendingUp, BarChart3, Gift, ArrowRight, CheckCircle,
  Tag, Smartphone, Package, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function RetailPage() {
  const features = [
    {
      icon: Users,
      title: "Customer Flow Management",
      description: "Manage store traffic, reduce checkout lines, and improve shopping experience.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Peak Hour Management",
      description: "Handle rush hours, sales events, and seasonal peaks with ease.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: CreditCard,
      title: "Multi-Checkout Support",
      description: "Manage regular, express, and self-checkout queues efficiently.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Gift,
      title: "VIP & Loyalty Treatment",
      description: "Priority queuing for loyalty program members and VIP customers.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: BarChart3,
      title: "Sales Analytics",
      description: "Track conversion rates and optimize staffing based on traffic patterns.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Queueing",
      description: "Customers can join queues remotely via mobile app or QR codes.",
      color: "from-pink-500 to-rose-500"
    }
  ];

  const benefits = [
    "Reduce checkout wait times by 65%",
    "Increase sales conversion by 25%",
    "Improve customer satisfaction scores",
    "Handle Black Friday traffic with ease",
    "Optimize staff scheduling",
    "Track store performance metrics"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-rose-600/5" />
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
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Retail Queue Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Transform the shopping experience with intelligent queue management for retail stores, supermarkets, and shopping malls.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Schedule Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Retail Partners */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
          >
            {["Shoprite", "Game", "SPAR", "Woolworths", "Mr Price", "Pick n Pay", "Checkers", "Walmart"].map((store, i) => (
              <div key={i} className="text-gray-400 font-semibold text-lg">{store}</div>
            ))}
          </motion.div>
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
              Retail-Specific{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Store?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 200+ retail stores already using our system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Contact Retail Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}