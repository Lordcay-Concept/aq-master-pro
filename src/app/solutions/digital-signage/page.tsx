"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Monitor, Tv, Smartphone, Layout, Image, Video,
  Bell, Clock, Users, Settings, Cloud, ArrowRight,
  CheckCircle, Wifi, Share2, Palette
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function DigitalSignagePage() {
  const features = [
    {
      icon: Tv,
      title: "Multi-Screen Support",
      description: "Connect to any display - TVs, monitors, tablets, or projection screens.",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: Layout,
      title: "Customizable Templates",
      description: "Choose from 50+ professionally designed templates or create your own.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Video,
      title: "Rich Media Support",
      description: "Display videos, images, animations, and live data feeds seamlessly.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Queue Display",
      description: "Show real-time queue numbers, waiting times, and counter assignments.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Bell,
      title: "Emergency Alerts",
      description: "Broadcast urgent messages and alerts across all screens instantly.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Users,
      title: "Audience Analytics",
      description: "Track viewer engagement and optimize content based on audience response.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Cloud,
      title: "Cloud Management",
      description: "Manage all screens from anywhere with our cloud-based dashboard.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: Share2,
      title: "Social Media Integration",
      description: "Display live social media feeds, reviews, and customer testimonials.",
      color: "from-violet-500 to-purple-500"
    }
  ];

  const benefits = [
    "Reduce perceived wait time by 40%",
    "Increase brand awareness with custom content",
    "Update content across all screens instantly",
    "Schedule content based on time of day",
    "Integrate with queue system automatically",
    "Zero hardware costs - use existing displays"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/5 via-pink-600/5 to-indigo-600/5" />
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
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 bg-clip-text text-transparent">
                Digital Signage
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Transform any screen into a powerful communication tool. Display queue status, 
              promotions, announcements, and engaging content with our easy-to-use digital signage platform.
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
          </div>
        </div>
      </section>

      {/* Screen Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative mx-auto max-w-4xl"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border-8 border-gray-800">
              <div className="bg-gradient-to-r from-purple-600 to-pink-600 h-2" />
              <div className="p-8">
                <div className="flex justify-between items-center mb-8">
                  <div className="text-4xl font-bold text-white">Now Serving</div>
                  <div className="text-6xl font-bold text-purple-400">A042</div>
                </div>
                <div className="grid grid-cols-3 gap-4 mb-8">
                  {[1,2,3].map((i) => (
                    <div key={i} className="bg-white/10 p-4 rounded-xl">
                      <div className="text-sm text-gray-400">Counter {i}</div>
                      <div className="text-2xl font-bold text-white">B0{12 + i}</div>
                    </div>
                  ))}
                </div>
                <div className="text-center text-gray-400 text-sm">
                  Estimated wait time: 5-10 minutes
                </div>
              </div>
            </div>
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
              <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                Display Features
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
      <section className="py-20 bg-gradient-to-r from-purple-600 via-pink-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Transform Your Customer Experience
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 500+ businesses using our digital signage platform
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