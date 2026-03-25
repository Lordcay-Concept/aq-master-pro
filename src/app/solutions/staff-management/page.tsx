"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Users, Clock, Calendar, Award, TrendingUp, 
  UserCheck, UserMinus, UserPlus, Shield, 
  BarChart3, MessageSquare, Bell, ArrowRight, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function StaffManagementPage() {
  const features = [
    {
      icon: Users,
      title: "Staff Scheduling",
      description: "Create and manage staff shifts, breaks, and rotations with drag-and-drop interface.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Clock,
      title: "Performance Tracking",
      description: "Monitor individual staff metrics: service time, customers served, and efficiency scores.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Award,
      title: "Skills Management",
      description: "Track staff certifications, specializations, and match them to appropriate services.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: TrendingUp,
      title: "Productivity Analytics",
      description: "Compare staff performance against team averages and industry benchmarks.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: UserCheck,
      title: "Attendance Tracking",
      description: "Clock in/out system with mobile support, leave management, and absence alerts.",
      color: "from-cyan-500 to-teal-500"
    },
    {
      icon: MessageSquare,
      title: "Team Communication",
      description: "Internal messaging, announcements, and shift handover notes in one place.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Shield,
      title: "Role-Based Access",
      description: "Define permissions for managers, supervisors, and regular staff members.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: BarChart3,
      title: "Training Progress",
      description: "Track staff training completion and identify skill gaps for development.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const benefits = [
    "Reduce staff scheduling time by 80%",
    "Improve staff productivity by 35%",
    "Decrease absenteeism by 50%",
    "Optimize staff allocation based on demand",
    "Track real-time staff performance",
    "Automate payroll calculations"
  ];

  const stats = [
    { value: "35%", label: "Productivity Boost" },
    { value: "80%", label: "Less Scheduling Time" },
    { value: "50%", label: "Lower Absenteeism" },
    { value: "100%", label: "Performance Visibility" }
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
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Staff Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Empower your team with intelligent scheduling, performance tracking, 
              and seamless communication tools designed for modern service businesses.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
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

      {/* Schedule Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 text-white"
          >
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold mb-4">Smart Staff Scheduling</h3>
                <p className="text-blue-100 mb-6">
                  Drag-and-drop interface makes scheduling intuitive. Auto-suggest optimal shifts based on demand patterns and staff preferences.
                </p>
                <div className="flex space-x-4">
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <div className="text-sm opacity-80">Mon</div>
                    <div className="font-bold">8 staff</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <div className="text-sm opacity-80">Tue</div>
                    <div className="font-bold">7 staff</div>
                  </div>
                  <div className="bg-white/20 rounded-lg px-4 py-2">
                    <div className="text-sm opacity-80">Wed</div>
                    <div className="font-bold">9 staff</div>
                  </div>
                </div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-6 rounded-2xl">
                <div className="grid grid-cols-7 gap-2 text-center text-xs mb-4">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => (
                    <div key={i} className="font-bold">{d}</div>
                  ))}
                </div>
                <div className="space-y-2">
                  {[1,2,3].map((i) => (
                    <div key={i} className="grid grid-cols-7 gap-2">
                      {[1,2,3,4,5,6,7].map((j) => (
                        <div key={j} className={`h-8 rounded ${Math.random() > 0.5 ? 'bg-green-400' : 'bg-blue-400'} opacity-60`} />
                      ))}
                    </div>
                  ))}
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
              Complete{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Staff Management
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
                Transform Your{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Workforce Management
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

              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-700 mb-2">
                  "Our staff scheduling time dropped from 4 hours to just 30 minutes per week. The performance insights are invaluable."
                </p>
                <p className="font-semibold text-blue-600">— Michael O., Operations Manager</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-4"
            >
              {[1,2,3].map((i) => (
                <div key={i} className="bg-gray-50 p-4 rounded-xl flex items-center justify-between">
                  <div className="flex items-center">
                    <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full mr-3" />
                    <div>
                      <div className="font-semibold">Staff Member {i}</div>
                      <div className="text-sm text-gray-500">Efficiency: 95%</div>
                    </div>
                  </div>
                  <div className="text-green-600 font-semibold">+{8 + i}%</div>
                </div>
              ))}
            </motion.div>
          </div>
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
              Ready to Empower Your Team?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 500+ businesses already using our staff management system
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