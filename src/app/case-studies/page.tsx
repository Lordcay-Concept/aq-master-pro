"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  TrendingUp, Users, Clock, Award, ArrowRight,
  Building2, Landmark, Store, GraduationCap, Hotel,
  Scale, CheckCircle, Download, Share2, Star
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CaseStudiesPage() {
  const caseStudies = [
    {
      industry: "Banking",
      icon: Landmark,
      company: "GTBank PLC",
      title: "How GTBank Reduced Branch Wait Times by 70%",
      challenge: "Long queues during peak hours were causing customer dissatisfaction and lost business.",
      solution: "Implemented A&Q Master Pro across 50 branches with priority queuing for VIP customers.",
      results: [
        "70% reduction in average wait time",
        "45% increase in customer satisfaction",
        "30% more customers served daily",
        "₦50M+ annual savings in operational costs"
      ],
      metrics: [
        { label: "Wait Time Reduction", value: "70%" },
        { label: "Customer Satisfaction", value: "+45%" },
        { label: "Daily Capacity", value: "+30%" }
      ],
      image: "🏦",
      gradient: "from-green-600 to-emerald-600"
    },
    {
      industry: "Healthcare",
      icon: Building2,
      company: "Lagos University Teaching Hospital",
      title: "Transforming Patient Experience at LUTH",
      challenge: "Emergency department overcrowding and long wait times affecting patient care.",
      solution: "Deployed priority-based queuing system with real-time bed management.",
      results: [
        "65% reduction in ER wait times",
        "50% improvement in patient flow",
        "Real-time bed availability tracking",
        "Zero patient complaints about waiting"
      ],
      metrics: [
        { label: "ER Wait Time", value: "-65%" },
        { label: "Patient Flow", value: "+50%" },
        { label: "Satisfaction", value: "95%" }
      ],
      image: "🏥",
      gradient: "from-red-600 to-pink-600"
    },
    {
      industry: "Retail",
      icon: Store,
      company: "Shoprite Nigeria",
      title: "Shoprite's Checkout Revolution",
      challenge: "Peak hour congestion leading to abandoned carts and lost sales.",
      solution: "Multi-checkpoint queue system with mobile queue joining and alerts.",
      results: [
        "60% faster checkout process",
        "25% increase in sales conversion",
        "80% reduction in cart abandonment",
        "Enhanced customer experience ratings"
      ],
      metrics: [
        { label: "Checkout Speed", value: "+60%" },
        { label: "Sales Lift", value: "+25%" },
        { label: "Cart Abandonment", value: "-80%" }
      ],
      image: "🛒",
      gradient: "from-purple-600 to-pink-600"
    },
    {
      industry: "Education",
      icon: GraduationCap,
      company: "University of Lagos",
      title: "Streamlining Student Registration at UNILAG",
      challenge: "40,000+ students needing registration within 2 weeks causing chaos.",
      solution: "Department-wise queue management with online appointment scheduling.",
      results: [
        "15,000 students processed daily",
        "90% reduction in registration time",
        "Zero physical queues on campus",
        "Integration with existing student portal"
      ],
      metrics: [
        { label: "Daily Capacity", value: "15,000" },
        { label: "Time Saved", value: "90%" },
        { label: "Student Satisfaction", value: "94%" }
      ],
      image: "📚",
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      industry: "Government",
      icon: Landmark,
      company: "Nigeria Immigration Service",
      title: "Modernizing Passport Application Processing",
      challenge: "6-month backlog of passport applications and complaints about queue jumping.",
      solution: "End-to-end queue management with biometric verification and SMS notifications.",
      results: [
        "Cleared 6-month backlog in 6 weeks",
        "80% reduction in application time",
        "Zero queue jumping incidents",
        "Transparent processing visible to applicants"
      ],
      metrics: [
        { label: "Backlog Cleared", value: "6 weeks" },
        { label: "Processing Time", value: "-80%" },
        { label: "Transparency", value: "100%" }
      ],
      image: "🛂",
      gradient: "from-slate-600 to-gray-600"
    },
    {
      industry: "Hospitality",
      icon: Hotel,
      company: "Eko Hotels & Suites",
      title: "Elevating Guest Experience at Eko Hotels",
      challenge: "Check-in delays during conferences and restaurant wait times affecting guest satisfaction.",
      solution: "Unified queue system for check-in, restaurants, and spa services.",
      results: [
        "85% faster check-in process",
        "40% increase in restaurant table turnover",
        "Guest satisfaction score improved to 4.9/5",
        "VIP recognition and priority service"
      ],
      metrics: [
        { label: "Check-in Speed", value: "+85%" },
        { label: "Table Turnover", value: "+40%" },
        { label: "Satisfaction", value: "4.9/5" }
      ],
      image: "🏨",
      gradient: "from-amber-600 to-orange-600"
    }
  ];

  const stats = [
    { value: "500+", label: "Businesses Transformed" },
    { value: "2M+", label: "Happy Customers" },
    { value: "60%", label: "Avg. Wait Reduction" },
    { value: "45%", label: "Efficiency Gain" }
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
                Case Studies
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              See how leading organizations across Africa are transforming their customer experience with A&Q Master Pro.
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
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

      {/* Featured Case Study */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-hero-pattern opacity-30" />
            
            <div className="relative p-12 text-white">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6">
                🏆 Featured Case Study
              </span>
              
              <h2 className="text-4xl font-bold mb-4">GTBank's Digital Transformation</h2>
              <p className="text-xl text-blue-100 mb-8 max-w-3xl">
                How Nigeria's leading bank revolutionized branch operations and set new standards for customer service.
              </p>

              <div className="grid md:grid-cols-3 gap-8 mb-8">
                <div>
                  <div className="text-3xl font-bold">70%</div>
                  <div className="text-blue-200">Wait Time Reduction</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">45%</div>
                  <div className="text-blue-200">Satisfaction Increase</div>
                </div>
                <div>
                  <div className="text-3xl font-bold">50+</div>
                  <div className="text-blue-200">Branches Transformed</div>
                </div>
              </div>

              <Link href="/case-studies/gtbank">
                <Button variant="secondary" size="lg" className="bg-white text-blue-600 hover:bg-blue-50">
                  Read Full Story
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Case Studies Grid */}
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
              Success Stories by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Industry
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              See how businesses like yours are achieving remarkable results
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {caseStudies.map((study, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className={`bg-gradient-to-r ${study.gradient} p-6 text-white`}>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{study.image}</span>
                    <span className="px-3 py-1 bg-white/20 backdrop-blur-md rounded-full text-xs font-semibold">
                      {study.industry}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">{study.company}</h3>
                </div>

                <div className="p-6">
                  <h4 className="text-lg font-semibold text-gray-900 mb-3">{study.title}</h4>
                  
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 mb-2">
                      <span className="font-semibold">Challenge:</span> {study.challenge}
                    </p>
                    <p className="text-sm text-gray-600">
                      <span className="font-semibold">Solution:</span> {study.solution}
                    </p>
                  </div>

                  <div className="space-y-2 mb-4">
                    {study.results.slice(0, 3).map((result, idx) => (
                      <div key={idx} className="flex items-start">
                        <CheckCircle className="h-4 w-4 text-green-500 mr-2 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-gray-700">{result}</span>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-2 mb-4">
                    {study.metrics.map((metric, idx) => (
                      <div key={idx} className="text-center">
                        <div className="text-sm font-bold text-gray-900">{metric.value}</div>
                        <div className="text-xs text-gray-500">{metric.label}</div>
                      </div>
                    ))}
                  </div>

                  <Link
                    href={`/case-studies/${study.company.toLowerCase().replace(/\s+/g, '-')}`}
                    className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Read Case Study
                    <ArrowRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </motion.div>
            ))}
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
              Ready to Write Your Success Story?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 500+ businesses already transforming their customer experience
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Talk to Sales
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}