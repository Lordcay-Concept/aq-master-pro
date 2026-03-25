"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Bell, MessageSquare, Mail, Smartphone, Globe, 
  Clock, Users, Settings, Zap, Shield, BarChart3,
  CheckCircle, ArrowRight, Send, MessageCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotificationsPage() {
  const features = [
    {
      icon: MessageSquare,
      title: "SMS Notifications",
      description: "Send instant text alerts for queue updates, appointment reminders, and service notifications.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Mail,
      title: "Email Campaigns",
      description: "Professional email templates for confirmations, reminders, and marketing communications.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: MessageCircle,
      title: "WhatsApp Integration",
      description: "Connect with customers on their preferred messaging platform with rich media support.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Smart Scheduling",
      description: "Schedule notifications based on optimal delivery times and customer preferences.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Segmented Campaigns",
      description: "Target specific customer groups based on behavior, preferences, and service history.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: BarChart3,
      title: "Delivery Analytics",
      description: "Track open rates, click-through rates, and engagement metrics in real-time.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Zap,
      title: "Automated Triggers",
      description: "Set up automated notifications based on queue position, appointment times, or service completion.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: Shield,
      title: "Compliance Ready",
      description: "GDPR and DPA compliant with opt-in/out management and consent tracking.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const templates = [
    { type: "Queue Update", content: "You're next in line! Please proceed to Counter 3" },
    { type: "Appointment Reminder", content: "Your appointment is tomorrow at 2:00 PM" },
    { type: "Service Complete", content: "Your service is complete. Thank you for waiting!" },
    { type: "Feedback Request", content: "How was your experience? Rate us 1-5" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-cyan-600/5 to-teal-600/5" />
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
              <span className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 bg-clip-text text-transparent">
                SMS & Email Notifications
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Keep customers informed and engaged with automated multi-channel notifications. 
              Reduce no-shows, improve satisfaction, and streamline communication.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Watch Demo
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Template Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-2 gap-8"
          >
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Ready-to-Use Templates</h3>
              {templates.map((template, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-gray-50 p-4 rounded-xl border border-gray-200 hover:border-blue-300 transition-colors"
                >
                  <div className="text-sm font-semibold text-blue-600 mb-1">{template.type}</div>
                  <div className="text-gray-800">"{template.content}"</div>
                </motion.div>
              ))}
            </div>
            
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-cyan-600 p-8 rounded-3xl text-white"
            >
              <h4 className="text-xl font-bold mb-4">Multi-Channel Delivery</h4>
              <div className="space-y-4">
                {[
                  { icon: MessageSquare, channel: "SMS", rate: "98% open rate" },
                  { icon: Mail, channel: "Email", rate: "45% open rate" },
                  { icon: MessageCircle, channel: "WhatsApp", rate: "90% read rate" }
                ].map((item, i) => (
                  <div key={i} className="flex items-center justify-between border-b border-white/20 pb-2">
                    <div className="flex items-center">
                      <item.icon className="h-5 w-5 mr-3" />
                      <span>{item.channel}</span>
                    </div>
                    <span className="text-sm opacity-80">{item.rate}</span>
                  </div>
                ))}
              </div>
            </motion.div>
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
              Powerful{" "}
              <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                Notification Features
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

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Engaging Your Customers
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 500+ businesses using our notification platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Start Free Trial
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Contact Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}