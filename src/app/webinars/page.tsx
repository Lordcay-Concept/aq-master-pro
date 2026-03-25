"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calendar, Clock, Users, Play, Download,
  ArrowRight, Video, Mic, Monitor, BookOpen,
  CheckCircle, Bell, Share2, Star, Filter
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function WebinarsPage() {
  const upcomingWebinars = [
    {
      title: "Mastering Queue Management: Best Practices for 2026",
      description: "Learn advanced strategies for optimizing customer flow and reducing wait times in any business environment.",
      date: "March 25, 2026",
      time: "3:00 PM WAT",
      duration: "60 mins",
      speaker: "Dr. Michael Adebayo",
      role: "CTO, A&Q Master Pro",
      attendees: 234,
      image: "🎯",
      tags: ["Queue Management", "Best Practices"],
      featured: true
    },
    {
      title: "Digital Transformation in Banking: A Case Study",
      description: "How GTBank revolutionized branch operations with smart queue management.",
      date: "March 28, 2026",
      time: "2:00 PM WAT",
      duration: "45 mins",
      speaker: "Oluwaseun Ogunleye",
      role: "Banking Solutions Lead",
      attendees: 156,
      image: "🏦",
      tags: ["Banking", "Case Study"]
    },
    {
      title: "Healthcare Queue Management: Improving Patient Experience",
      description: "Specialized strategies for hospitals and clinics to enhance patient flow.",
      date: "April 2, 2026",
      time: "4:00 PM WAT",
      duration: "50 mins",
      speaker: "Dr. Sarah Johnson",
      role: "Healthcare Specialist",
      attendees: 189,
      image: "🏥",
      tags: ["Healthcare", "Patient Experience"]
    }
  ];

  const recordedWebinars = [
    {
      title: "Introduction to A&Q Master Pro",
      description: "A comprehensive walkthrough of our platform's core features.",
      date: "Feb 15, 2026",
      duration: "30 mins",
      views: 1245,
      image: "🚀",
      tags: ["Getting Started"]
    },
    {
      title: "Integrating Payment Gateways",
      description: "Step-by-step guide to setting up Paystack and Flutterwave.",
      date: "Feb 10, 2026",
      duration: "45 mins",
      views: 892,
      image: "💰",
      tags: ["Payments"]
    },
    {
      title: "Analytics Deep Dive",
      description: "Understanding queue metrics and optimizing performance.",
      date: "Feb 5, 2026",
      duration: "55 mins",
      views: 756,
      image: "📊",
      tags: ["Analytics"]
    },
    {
      title: "Multi-location Queue Management",
      description: "Managing queues across multiple branches from one dashboard.",
      date: "Jan 28, 2026",
      duration: "40 mins",
      views: 623,
      image: "🌍",
      tags: ["Enterprise"]
    },
    {
      title: "API Integration Workshop",
      description: "Technical deep dive into our API capabilities.",
      date: "Jan 20, 2026",
      duration: "90 mins",
      views: 512,
      image: "🔌",
      tags: ["Developers"]
    },
    {
      title: "Customer Success Stories",
      description: "How businesses are achieving remarkable results.",
      date: "Jan 15, 2026",
      duration: "60 mins",
      views: 1089,
      image: "🏆",
      tags: ["Case Studies"]
    }
  ];

  const categories = [
    "All Webinars",
    "Getting Started",
    "Advanced Techniques",
    "Industry Specific",
    "Product Updates",
    "Developer Workshops",
    "Customer Stories"
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
                Webinars & Events
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Join industry experts for live sessions, workshops, and deep dives into queue management best practices.
            </motion.p>

            {/* Newsletter Signup */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-md mx-auto"
            >
              <div className="flex gap-2">
                <Input
                  type="email"
                  placeholder="Get notified about new webinars"
                  className="flex-1 rounded-full border-2 border-gray-200 focus:border-purple-500"
                />
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full px-6">
                  Subscribe
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Webinar */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl overflow-hidden"
          >
            <div className="absolute inset-0 bg-hero-pattern opacity-30" />
            
            <div className="relative p-12 text-white">
              <span className="inline-block px-4 py-2 bg-white/20 backdrop-blur-md rounded-full text-sm font-semibold mb-6">
                🔴 Live in 3 Days
              </span>
              
              <h2 className="text-4xl font-bold mb-4">Mastering Queue Management: Best Practices for 2026</h2>
              <p className="text-xl text-purple-100 mb-8 max-w-2xl">
                Join Dr. Michael Adebayo for an exclusive deep dive into advanced queue management strategies.
              </p>

              <div className="grid md:grid-cols-4 gap-6 mb-8">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2 text-purple-200" />
                  <span>March 25, 2026</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2 text-purple-200" />
                  <span>3:00 PM WAT</span>
                </div>
                <div className="flex items-center">
                  <Users className="h-5 w-5 mr-2 text-purple-200" />
                  <span>234 registered</span>
                </div>
                <div className="flex items-center">
                  <Monitor className="h-5 w-5 mr-2 text-purple-200" />
                  <span>60 mins</span>
                </div>
              </div>

              <Link href="/webinars/register">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-purple-50">
                  Register Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Upcoming Webinars */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Upcoming <span className="text-purple-600">Webinars</span>
            </h2>
            <Link href="/webinars/all" className="text-purple-600 hover:text-purple-700 font-medium flex items-center">
              View All
              <ArrowRight className="h-4 w-4 ml-1" />
            </Link>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            {upcomingWebinars.map((webinar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-all"
              >
                <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-4 text-white">
                  <div className="flex items-center justify-between">
                    <span className="text-4xl">{webinar.image}</span>
                    {webinar.featured && (
                      <span className="px-2 py-1 bg-yellow-400 text-yellow-900 rounded text-xs font-bold">
                        FEATURED
                      </span>
                    )}
                  </div>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-2">{webinar.title}</h3>
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{webinar.description}</p>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                      <Calendar className="h-4 w-4 mr-2" />
                      {webinar.date} at {webinar.time}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Clock className="h-4 w-4 mr-2" />
                      {webinar.duration}
                    </div>
                    <div className="flex items-center text-sm text-gray-500">
                      <Users className="h-4 w-4 mr-2" />
                      {webinar.attendees} registered
                    </div>
                  </div>

                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{webinar.speaker}</p>
                      <p className="text-xs text-gray-500">{webinar.role}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 mb-4">
                    {webinar.tags.map((tag, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-100 text-purple-700 rounded text-xs">
                        {tag}
                      </span>
                    ))}
                  </div>

                  <Link href={`/webinars/${webinar.title.toLowerCase().replace(/\s+/g, '-')}`}>
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 text-white hover:from-purple-700 hover:to-pink-700">
                      Register Now
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Recorded Webinars */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Watch <span className="text-purple-600">On-Demand</span>
            </h2>
            <p className="text-lg text-gray-600">
              Browse our library of recorded webinars and learn at your own pace
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recordedWebinars.map((webinar, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl hover:shadow-md transition-all"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className="text-3xl">{webinar.image}</span>
                  <Play className="h-8 w-8 text-purple-600" />
                </div>
                
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{webinar.title}</h3>
                <p className="text-sm text-gray-600 mb-3 line-clamp-2">{webinar.description}</p>

                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{webinar.date}</span>
                  <span>{webinar.duration}</span>
                  <span>{webinar.views} views</span>
                </div>

                <div className="flex flex-wrap gap-2 mb-3">
                  {webinar.tags.map((tag, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-200 text-gray-700 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <Link
                  href={`/webinars/recorded/${webinar.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-purple-600 hover:text-purple-700 font-medium text-sm"
                >
                  Watch Now
                  <Play className="h-3 w-3 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/webinars/library">
              <Button variant="outline" size="lg" className="border-2 border-purple-600 text-purple-600 hover:bg-purple-50">
                Browse Full Library
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
              Want to Speak at Our Webinars?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Share your expertise with thousands of industry professionals
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/speaker-application">
                <Button size="lg" variant="secondary" className="bg-white text-purple-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Apply as Speaker
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Suggest a Topic
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}