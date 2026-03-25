"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, Users, Bell, CreditCard, 
  Globe, Smartphone, Mail, CheckCircle, ArrowRight,
  CalendarCheck, CalendarDays, CalendarClock, CalendarX
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AppointmentBookingPage() {
  const features = [
    {
      icon: CalendarCheck,
      title: "24/7 Online Booking",
      description: "Allow customers to book appointments anytime, anywhere through web or mobile app.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: CalendarDays,
      title: "Calendar Integration",
      description: "Sync with Google Calendar, Outlook, and iCal to manage schedules seamlessly.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Bell,
      title: "Automated Reminders",
      description: "Send SMS, Email, and WhatsApp reminders to reduce no-shows by up to 80%.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Real-time Availability",
      description: "Display live availability and prevent double-booking with instant updates.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Staff Scheduling",
      description: "Assign appointments to specific staff members based on expertise and availability.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: CalendarClock,
      title: "Recurring Appointments",
      description: "Support for weekly, monthly, and custom recurring appointment patterns.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: CreditCard,
      title: "Payment Integration",
      description: "Accept deposits and full payments at the time of booking with Paystack.",
      color: "from-yellow-500 to-amber-500"
    },
    {
      icon: Globe,
      title: "Multi-location Support",
      description: "Manage appointments across multiple branches or locations from one dashboard.",
      color: "from-teal-500 to-cyan-500"
    }
  ];

  const benefits = [
    "Reduce no-shows by up to 80% with automated reminders",
    "Increase bookings by 45% with 24/7 availability",
    "Save 15 hours per week on manual scheduling",
    "Improve staff utilization by 35%",
    "Collect payments at time of booking",
    "Sync with existing calendars automatically"
  ];

  const stats = [
    { value: "80%", label: "Fewer No-Shows" },
    { value: "45%", label: "More Bookings" },
    { value: "15hrs", label: "Weekly Saved" },
    { value: "35%", label: "Better Utilization" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-orange-600/5" />
        <div className="absolute inset-0 bg-purple-pattern opacity-30" />
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
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Appointment Booking
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Revolutionize how customers book with you. Offer 24/7 online scheduling, 
              automated reminders, and seamless calendar integration.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
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

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Intelligent{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Booking Features
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to streamline your appointment scheduling process
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5, scale: 1.02 }}
                className="group bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-2xl transition-all duration-300"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${feature.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-7 w-7 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600 mb-3">{feature.description}</p>
                <Link 
                  href={`/solutions/appointment-booking/${feature.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-purple-600 hover:text-pink-600 font-medium text-sm group"
                >
                  Learn more
                  <ArrowRight className="ml-1 h-3 w-3 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gradient-to-br from-purple-50 to-pink-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              How It{" "}
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Works
              </span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Customer Books", desc: "24/7 online booking", icon: Calendar },
              { step: 2, title: "System Confirms", desc: "Instant confirmation", icon: CheckCircle },
              { step: 3, title: "Reminders Sent", desc: "Automated notifications", icon: Bell },
              { step: 4, title: "Appointment Kept", desc: "Reduced no-shows", icon: CalendarCheck }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-full h-0.5 bg-gradient-to-r from-purple-300 to-pink-300" />
                )}
                <div className="w-24 h-24 bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-xl">
                  <item.icon className="h-10 w-10 text-white" />
                </div>
                <div className="text-2xl font-bold text-purple-600 mb-2">{item.step}</div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{item.title}</h3>
                <p className="text-sm text-gray-500">{item.desc}</p>
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
                Why Businesses Love{" "}
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                  Our Booking System
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

              <div className="bg-gradient-to-r from-purple-100 to-pink-100 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-700 mb-2">
                  "Since implementing this system, our no-show rate dropped from 30% to just 5%. Absolutely transformative!"
                </p>
                <p className="font-semibold text-purple-600">— Dr. Sarah Johnson, Medical Director</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-purple-600 to-pink-600 p-8 rounded-3xl text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Integration Partners</h3>
              <div className="grid grid-cols-2 gap-4">
                {["Google Calendar", "Outlook", "Apple iCal", "Zoom", "Paystack", "Flutterwave"].map((partner, i) => (
                  <div key={i} className="bg-white/20 backdrop-blur-md p-4 rounded-xl text-center">
                    <div className="font-semibold">{partner}</div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Streamline Your Bookings?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of businesses using our appointment system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
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