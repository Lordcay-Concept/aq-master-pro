"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Building2, Shield, Users, Clock, FileText,
  Scale, ArrowRight, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GovernmentPage() {
  const features = [
    {
      icon: Building2,
      title: "Citizen Service Centers",
      description: "Manage queues for passport applications, permits, and government services.",
      color: "from-slate-600 to-gray-600"
    },
    {
      icon: FileText,
      title: "Document Processing",
      description: "Streamline applications for IDs, certificates, and official documents.",
      color: "from-blue-600 to-indigo-600"
    },
    {
      icon: Shield,
      title: "Secure Authentication",
      description: "Biometric verification and secure identity management for government services.",
      color: "from-green-600 to-emerald-600"
    },
    {
      icon: Clock,
      title: "Appointment System",
      description: "Reduce wait times with scheduled appointments for government offices.",
      color: "from-orange-600 to-red-600"
    },
    {
      icon: Users,
      title: "Multi-Department Flow",
      description: "Coordinate services across different government departments.",
      color: "from-purple-600 to-pink-600"
    },
    {
      icon: Scale,
      title: "Fair Access",
      description: "Ensure equitable service delivery with transparent queue management.",
      color: "from-cyan-600 to-teal-600"
    }
  ];

  const benefits = [
    "Reduce citizen wait times by 65%",
    "Handle 10,000+ daily visitors efficiently",
    "Improve service delivery transparency",
    "Eliminate queue jumping and corruption",
    "Track service delivery metrics",
    "Enhance citizen satisfaction"
  ];

  const stats = [
    { value: "65%", label: "Less Wait Time" },
    { value: "10,000+", label: "Daily Capacity" },
    { value: "100%", label: "Transparent" },
    { value: "24/7", label: "Online Booking" }
  ];

  const agencies = [
    {
      name: "Nigeria Immigration Service",
      location: "Passport Offices Nationwide",
      type: "Passport Processing",
      image: "🛂"
    },
    {
      name: "Lagos State Government",
      location: "Alausa Secretariat", 
      type: "Citizen Services",
      image: "🏢"
    },
    {
      name: "FRSC",
      location: "Driver's License Centers",
      type: "License Processing",
      image: "🚗"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-600/5 via-gray-600/5 to-zinc-600/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-slate-100 text-slate-700 rounded-full text-sm font-semibold mb-6">
                🏛️ Industry #6
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 bg-clip-text text-transparent">
                Government Queue Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Transform citizen services with transparent, efficient queue management for government offices, 
              ministries, and public service centers.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-slate-600 to-gray-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-slate-600 text-slate-600 hover:bg-slate-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
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

      {/* Government Agencies */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid md:grid-cols-3 gap-6"
          >
            {agencies.map((agency, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-slate-50 to-gray-50 p-6 rounded-2xl border border-slate-100 shadow-sm"
              >
                <div className="text-4xl mb-4">{agency.image}</div>
                <h3 className="text-xl font-semibold mb-1">{agency.name}</h3>
                <p className="text-gray-600 mb-1">{agency.location}</p>
                <p className="text-sm text-slate-600 font-semibold">{agency.type}</p>
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
              Government-Specific{" "}
              <span className="bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
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
                Why Government Agencies{" "}
                <span className="bg-gradient-to-r from-slate-600 to-gray-600 bg-clip-text text-transparent">
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

              <div className="bg-gradient-to-r from-slate-100 to-gray-100 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-700 mb-2">
                  "This system has eliminated queue jumping and reduced processing times by 70%. Citizens are finally satisfied with our service."
                </p>
                <p className="font-semibold text-slate-600">— Permanent Secretary, Lagos State</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-slate-600 to-gray-600 p-8 rounded-3xl text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Security & Compliance</h3>
              <div className="space-y-4">
                {[
                  "Biometric Integration",
                  "Audit Trail Logging",
                  "Data Encryption",
                  "FOI Compliance",
                  "Service Level Agreements"
                ].map((item, i) => (
                  <div key={i} className="flex items-center border-b border-white/20 pb-2">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-slate-600 via-gray-600 to-zinc-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Citizen Services?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 30+ government agencies already using our system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-slate-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Contact Government Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}