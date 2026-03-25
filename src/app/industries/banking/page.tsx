"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Landmark, Shield, Users, Clock, CreditCard,
  TrendingUp, BarChart3, Lock, ArrowRight, CheckCircle,
  Building2, Wallet, Smartphone, PieChart, Award
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function BankingPage() {
  const features = [
    {
      icon: Users,
      title: "Customer Flow Management",
      description: "Optimize teller queues, reduce wait times, and improve branch efficiency with smart routing.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Shield,
      title: "Priority Banking",
      description: "Dedicated queues for premium, corporate, and VIP customers with instant recognition.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: Clock,
      title: "Appointment Scheduling",
      description: "Allow customers to book appointments for complex transactions and consultations.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: CreditCard,
      title: "Multi-Service Support",
      description: "Handle withdrawals, deposits, loans, account opening, and inquiries efficiently.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Lock,
      title: "Security Compliance",
      description: "Bank-grade security with audit trails, encryption, and regulatory compliance (CBN).",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: TrendingUp,
      title: "Performance Analytics",
      description: "Track teller productivity, service speed, and customer satisfaction metrics.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: BarChart3,
      title: "Branch Intelligence",
      description: "Real-time dashboards showing queue status, wait times, and staff performance.",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: Wallet,
      title: "Digital Banking Integration",
      description: "Seamless integration with mobile apps and USSD for remote queue management.",
      color: "from-cyan-500 to-teal-500"
    }
  ];

  const benefits = [
    "Reduce customer wait times by up to 70%",
    "Increase teller productivity by 40%",
    "Improve customer satisfaction scores by 50%",
    "Handle peak hour traffic with 3x efficiency",
    "Track and optimize branch performance",
    "Reduce staffing costs by 25% through optimization"
  ];

  const stats = [
    { value: "70%", label: "Less Wait Time" },
    { value: "40%", label: "More Productivity" },
    { value: "50%", label: "Higher Satisfaction" },
    { value: "3x", label: "Peak Efficiency" }
  ];

  const caseStudies = [
    {
      bank: "GTBank PLC",
      location: "Victoria Island, Lagos",
      impact: "Reduced wait times from 45min to 12min",
      image: "🏦"
    },
    {
      bank: "Access Bank",
      location: "Ikeja, Lagos",
      impact: "Increased teller productivity by 52%",
      image: "🏛️"
    },
    {
      bank: "First Bank",
      location: "Marina, Lagos",
      impact: "Handled 3,000+ customers daily with ease",
      image: "🏢"
    }
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
                Banking & Finance
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Transform your branch operations with intelligent queue management designed for banks, 
              microfinance institutions, and financial services. Deliver premium customer experiences.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-green-600 text-green-600 hover:bg-green-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
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

      {/* Trusted Banks */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center text-gray-500 mb-8"
          >
            Trusted by leading financial institutions across Africa
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center justify-items-center"
          >
            {["GTBank", "Access Bank", "UBA", "First Bank", "Zenith Bank", "Fidelity Bank", "Stanbic IBTC", "Union Bank"].map((bank, i) => (
              <div key={i} className="text-gray-400 font-semibold text-lg">{bank}</div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Success Stories from{" "}
            <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
              Nigerian Banks
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white p-6 rounded-xl shadow-lg"
              >
                <div className="text-4xl mb-4">{study.image}</div>
                <h3 className="text-xl font-semibold mb-1">{study.bank}</h3>
                <p className="text-sm text-gray-500 mb-3">{study.location}</p>
                <p className="text-green-600 font-semibold">{study.impact}</p>
              </motion.div>
            ))}
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
              Banking-Specific{" "}
              <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to run an efficient, customer-friendly branch
            </p>
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
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-all border border-gray-100"
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Why Financial Institutions{" "}
                <span className="bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
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

              <div className="bg-gradient-to-r from-green-100 to-emerald-100 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-700 mb-2">
                  "This system has revolutionized how we serve customers. Wait times are down 70% and our VIP customers love the priority treatment."
                </p>
                <p className="font-semibold text-green-600">— Adekunle O., Branch Manager, GTBank</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-green-600 to-emerald-600 p-8 rounded-3xl text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Integration Partners</h3>
              <div className="space-y-4">
                {[
                  "Core Banking Systems",
                  "Mobile Banking Apps",
                  "USSD Platforms",
                  "ATM Networks",
                  "CRM Systems"
                ].map((item, i) => (
                  <div key={i} className="flex items-center border-b border-white/20 pb-2">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <Award className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">CBN Compliant</div>
                </div>
                <div className="text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">ISO 27001</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ROI Calculator Teaser */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center bg-gradient-to-r from-green-600 to-emerald-600 rounded-3xl p-12 text-white"
          >
            <h3 className="text-3xl font-bold mb-4">Calculate Your Branch ROI</h3>
            <p className="text-xl mb-8 opacity-90">
              See how much you can save by optimizing your branch operations
            </p>
            <Link href="/roi-calculator">
              <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100">
                Try ROI Calculator
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </motion.div>
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
              Ready to Transform Your Branch?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 50+ financial institutions already using our system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-green-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Contact Banking Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}