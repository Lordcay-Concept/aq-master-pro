"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BarChart3, TrendingUp, PieChart, LineChart,
  Download, Eye, Clock, Users, Target,
  Brain, FileText, Share2, ArrowRight, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AnalyticsPage() {
  const features = [
    {
      icon: BarChart3,
      title: "Real-time Dashboard",
      description: "Live metrics on queue length, wait times, service efficiency, and customer flow.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: TrendingUp,
      title: "Performance Trends",
      description: "Track KPIs over time with interactive charts and predictive analytics.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: PieChart,
      title: "Service Distribution",
      description: "Understand which services are most in demand and optimize resource allocation.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Clock,
      title: "Peak Hours Analysis",
      description: "Identify busy periods to optimize staff scheduling and reduce wait times.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Users,
      title: "Customer Insights",
      description: "Demographics, visit patterns, and satisfaction metrics for better service.",
      color: "from-cyan-500 to-teal-500"
    },
    {
      icon: Target,
      title: "Staff Performance",
      description: "Individual and team metrics on service speed, customer ratings, and efficiency.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Brain,
      title: "AI Predictions",
      description: "Machine learning forecasts for wait times and customer arrival patterns.",
      color: "from-violet-500 to-purple-500"
    },
    {
      icon: Share2,
      title: "Automated Reports",
      description: "Scheduled PDF/Excel reports delivered to your email daily or weekly.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const metrics = [
    { label: "Average Wait Time", value: "12 min", trend: "-35%" },
    { label: "Customers Served", value: "1,284", trend: "+22%" },
    { label: "Service Efficiency", value: "94%", trend: "+8%" },
    { label: "Peak Hour Capacity", value: "156/hr", trend: "+45%" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-violet-600/5" />
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
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 bg-clip-text text-transparent">
                Analytics & Reports
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Turn your queue data into actionable insights. Make data-driven decisions 
              that improve efficiency and customer satisfaction.
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

            {/* Live Preview Metrics */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-4"
            >
              {metrics.map((metric, index) => (
                <div key={index} className="bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-lg">
                  <div className="text-sm text-gray-500 mb-1">{metric.label}</div>
                  <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                  <div className={`text-sm ${metric.trend.startsWith('+') ? 'text-green-600' : 'text-blue-600'}`}>
                    {metric.trend} vs last week
                  </div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl blur-2xl opacity-20" />
            <div className="relative bg-white p-8 rounded-3xl shadow-2xl border border-gray-100">
              <div className="flex items-center justify-between mb-8">
                <h3 className="text-2xl font-bold text-gray-900">Live Dashboard Preview</h3>
                <div className="flex space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
              </div>
              <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                  <div className="h-64 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-xl mb-4 flex items-center justify-center">
                    <LineChart className="h-32 w-32 text-blue-600 opacity-50" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="h-32 bg-purple-100 rounded-xl flex items-center justify-center">
                      <PieChart className="h-12 w-12 text-purple-600 opacity-50" />
                    </div>
                    <div className="h-32 bg-green-100 rounded-xl flex items-center justify-center">
                      <BarChart3 className="h-12 w-12 text-green-600 opacity-50" />
                    </div>
                  </div>
                </div>
                <div className="space-y-4">
                  {[1, 2, 3, 4].map((i) => (
                    <div key={i} className="h-16 bg-gray-100 rounded-xl animate-pulse" />
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
              Powerful{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Analytics Features
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
      <section className="py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Start Making Data-Driven Decisions
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 500+ businesses already using our analytics platform
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