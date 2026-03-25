"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Heart, Activity, Clock, Users, Calendar, 
  Syringe, Stethoscope, Ambulance, Pill,
  CheckCircle, ArrowRight, Shield, Smartphone
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HealthcarePage() {
  const features = [
    {
      icon: Heart,
      title: "Patient Flow Management",
      description: "Optimize patient movement from registration to consultation, reducing wait times by 60%.",
      color: "from-red-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Appointment Scheduling",
      description: "24/7 online booking with specialty-based doctor assignment and automated reminders.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Users,
      title: "Multi-Department Support",
      description: "Manage queues across reception, pharmacy, lab, and multiple consultation rooms.",
      color: "from-purple-500 to-indigo-500"
    },
    {
      icon: Clock,
      title: "Emergency Triage",
      description: "Priority queuing for emergency cases with color-coded urgency levels.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "HIPAA Compliant",
      description: "Enterprise-grade security ensuring patient data privacy and regulatory compliance.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Smartphone,
      title: "Mobile Check-in",
      description: "Patients can check-in remotely and receive real-time queue updates on their phones.",
      color: "from-indigo-500 to-blue-500"
    }
  ];

  const benefits = [
    "Reduce patient wait times by up to 60%",
    "Increase patient satisfaction scores by 45%",
    "Optimize staff utilization across departments",
    "Reduce no-shows with automated reminders",
    "Real-time visibility into patient flow",
    "Integration with existing hospital systems"
  ];

  const stats = [
    { value: "60%", label: "Less Wait Time" },
    { value: "45%", label: "Higher Satisfaction" },
    { value: "30%", label: "More Patients" },
    { value: "99.9%", label: "Data Security" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-red-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/5 via-pink-600/5 to-rose-600/5" />
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
              <span className="bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 bg-clip-text text-transparent">
                Healthcare Queue Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Transform patient experience with intelligent queue management designed specifically for hospitals, clinics, and healthcare facilities.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-red-600 to-pink-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-red-600 text-red-600 hover:bg-red-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Schedule Demo
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

      {/* Use Case Showcase */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {[
              {
                title: "General Hospital",
                description: "University Teaching Hospital, Lagos",
                image: "🏥",
                stats: "2,500+ patients daily"
              },
              {
                title: "Specialist Clinic",
                description: "Cardiology Center, Abuja",
                image: "🏨",
                stats: "85% satisfaction rate"
              },
              {
                title: "Pharmacy Chain",
                description: "MedPlus Pharmacy",
                image: "💊",
                stats: "3min average wait"
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-red-50 to-pink-50 p-6 rounded-2xl"
              >
                <div className="text-4xl mb-4">{item.image}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-600 mb-2">{item.description}</p>
                <p className="text-sm text-red-600 font-semibold">{item.stats}</p>
              </motion.div>
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
              Healthcare-Specific{" "}
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
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
                Why Healthcare Providers{" "}
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Choose Us
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

              <div className="bg-gradient-to-r from-red-100 to-pink-100 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-700 mb-2">
                  "Since implementing this system, our patient wait times have dropped by 65% and satisfaction scores are at an all-time high."
                </p>
                <p className="font-semibold text-red-600">— Dr. Sarah Johnson, Medical Director</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-red-600 to-pink-600 p-8 rounded-3xl text-white"
            >
              <h3 className="text-2xl font-bold mb-4">Integration Ready</h3>
              <div className="space-y-4">
                {["EMR/EHR Systems", "Hospital Management", "Pharmacy Systems", "Laboratory Systems", "Billing Platforms"].map((item, i) => (
                  <div key={i} className="flex items-center border-b border-white/20 pb-2">
                    <CheckCircle className="h-5 w-5 mr-3" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-red-600 via-pink-600 to-rose-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Patient Experience?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 200+ healthcare facilities already using our system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-red-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Contact Healthcare Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}