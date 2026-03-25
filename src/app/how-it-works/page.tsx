"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  UserPlus, CreditCard, Clock, CheckCircle,
  Smartphone, Bell, Monitor, Settings,
  ArrowRight, Users, BarChart3, Calendar,
  MessageCircle, Shield, Zap, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function HowItWorksPage() {
  const steps = [
    {
      icon: UserPlus,
      title: "Create Your Account",
      description: "Sign up for a free trial in under 2 minutes. No credit card required.",
      details: [
        "Choose your business type",
        "Add your team members",
        "Set up your service points"
      ],
      color: "from-blue-500 to-cyan-500",
      image: "📝"
    },
    {
      icon: Settings,
      title: "Configure Your Queue",
      description: "Customize queue settings to match your business workflow.",
      details: [
        "Set up service categories",
        "Configure notification preferences",
        "Design your queue display"
      ],
      color: "from-purple-500 to-pink-500",
      image: "⚙️"
    },
    {
      icon: Users,
      title: "Add Your Staff",
      description: "Invite team members and assign them to service points.",
      details: [
        "Add staff accounts",
        "Set permissions and roles",
        "Train your team"
      ],
      color: "from-green-500 to-emerald-500",
      image: "👥"
    },
    {
      icon: Calendar,
      title: "Start Taking Appointments",
      description: "Enable online booking and start accepting appointments.",
      details: [
        "Publish booking page",
        "Set availability",
        "Accept bookings 24/7"
      ],
      color: "from-orange-500 to-red-500",
      image: "📅"
    },
    {
      icon: Monitor,
      title: "Go Live with Queue Management",
      description: "Launch your queue system and start serving customers.",
      details: [
        "Display queue on screens",
        "Start issuing tickets",
        "Monitor in real-time"
      ],
      color: "from-indigo-500 to-blue-500",
      image: "🚀"
    },
    {
      icon: BarChart3,
      title: "Analyze & Optimize",
      description: "Use analytics to improve efficiency and customer experience.",
      details: [
        "Track performance metrics",
        "Identify bottlenecks",
        "Optimize staffing"
      ],
      color: "from-pink-500 to-rose-500",
      image: "📊"
    }
  ];

  const features = [
    {
      icon: Smartphone,
      title: "Mobile-Friendly",
      description: "Customers can join queues and book appointments from any device"
    },
    {
      icon: Bell,
      title: "Instant Notifications",
      description: "SMS, Email, and WhatsApp alerts for queue updates"
    },
    {
      icon: Shield,
      title: "Secure & Reliable",
      description: "Enterprise-grade security with 99.9% uptime"
    },
    {
      icon: Zap,
      title: "Lightning Fast",
      description: "Process customers in seconds, not minutes"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5" />
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
              Get Started in{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Minutes
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Simple, intuitive steps to transform your customer experience with A&Q Master Pro.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
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

      {/* Steps Timeline */}
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
              Simple{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                6-Step Process
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              From signup to serving customers in record time
            </p>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className={`flex flex-col md:flex-row gap-8 items-center mb-12 ${
                  index % 2 === 1 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="flex-1">
                  <div className={`bg-gradient-to-r ${step.color} p-8 rounded-3xl text-white`}>
                    <div className="flex items-center mb-4">
                      <span className="text-4xl mr-4">{step.image}</span>
                      <step.icon className="h-8 w-8" />
                    </div>
                    <div className="flex items-center mb-4">
                      <span className="text-5xl font-bold mr-4">{index + 1}</span>
                      <h3 className="text-2xl font-bold">{step.title}</h3>
                    </div>
                    <p className="text-white/90 mb-4">{step.description}</p>
                    <ul className="space-y-2">
                      {step.details.map((detail, idx) => (
                        <li key={idx} className="flex items-center text-white/80">
                          <CheckCircle className="h-4 w-4 mr-2" />
                          {detail}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="flex-1 text-center">
                  {index < steps.length - 1 && (
                    <div className="hidden md:block">
                      <ArrowRight className={`h-8 w-8 text-gray-400 mx-auto ${
                        index % 2 === 0 ? 'rotate-0' : 'rotate-180'
                      }`} />
                    </div>
                  )}
                </div>
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
            className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md text-center"
              >
                <feature.icon className="h-8 w-8 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Transform Your Queue?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 500+ businesses already using A&Q Master Pro
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