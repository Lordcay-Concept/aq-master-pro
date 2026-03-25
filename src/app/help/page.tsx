"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  HelpCircle, Search, MessageCircle, FileText,
  Video, BookOpen, Mail, Phone, ArrowRight,
  Users, Settings, CreditCard, Shield, Clock,
  Globe, Download, CheckCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function HelpCenterPage() {
  const categories = [
    {
      title: "Getting Started",
      icon: BookOpen,
      description: "New to A&Q Master Pro? Start here",
      color: "from-blue-500 to-cyan-500",
      articles: 24,
      popular: [
        "How to create your account",
        "Setting up your first queue",
        "Adding staff members",
        "Customizing notifications"
      ]
    },
    {
      title: "Account & Billing",
      icon: Settings,
      description: "Manage your account and subscription",
      color: "from-purple-500 to-pink-500",
      articles: 18,
      popular: [
        "Upgrading your plan",
        "Payment methods",
        "Cancelling subscription",
        "Invoice history"
      ]
    },
    {
      title: "Queue Management",
      icon: Users,
      description: "Learn how to manage queues effectively",
      color: "from-green-500 to-emerald-500",
      articles: 32,
      popular: [
        "Creating service points",
        "Managing multiple queues",
        "Priority queuing setup",
        "Real-time monitoring"
      ]
    },
    {
      title: "Appointments",
      icon: Clock,
      description: "Schedule and manage appointments",
      color: "from-orange-500 to-red-500",
      articles: 21,
      popular: [
        "Setting up online booking",
        "Calendar integration",
        "Automated reminders",
        "Handling no-shows"
      ]
    },
    {
      title: "Payments",
      icon: CreditCard,
      description: "Configure payment processing",
      color: "from-indigo-500 to-blue-500",
      articles: 16,
      popular: [
        "Payment gateway setup",
        "Transaction fees",
        "Refund processing",
        "Payment reports"
      ]
    },
    {
      title: "Integrations",
      icon: Globe,
      description: "Connect with other tools",
      color: "from-pink-500 to-rose-500",
      articles: 27,
      popular: [
        "CRM integration",
        "API documentation",
        "Webhook setup",
        "Third-party apps"
      ]
    }
  ];

  const faqs = [
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page and follow the instructions sent to your email."
    },
    {
      question: "Can I add multiple staff members?",
      answer: "Yes, you can add unlimited staff members depending on your plan. Navigate to Staff Management in your dashboard."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, Paystack, Flutterwave, and bank transfers for annual plans."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, we offer a 14-day free trial on all plans. No credit card required."
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
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Help Center
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Find answers, get support, and learn how to make the most of A&Q Master Pro
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="max-w-2xl mx-auto relative"
            >
              <Input
                type="text"
                placeholder="Search for help articles..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </motion.div>

            {/* Quick Links */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap justify-center gap-4 mt-8"
            >
              {["FAQs", "Guides", "Videos", "API Docs", "Community"].map((item, index) => (
                <Link
                  key={index}
                  href={`/help/${item.toLowerCase()}`}
                  className="px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow text-gray-700 font-medium"
                >
                  {item}
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
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
              Browse by{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Category
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Find the help you need, organized by topic
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white p-6 rounded-2xl border border-gray-200 hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${category.color} rounded-xl flex items-center justify-center mb-4`}>
                  <category.icon className="h-7 w-7 text-white" />
                </div>

                <h3 className="text-xl font-bold text-gray-900 mb-2">{category.title}</h3>
                <p className="text-gray-600 mb-2">{category.description}</p>
                <p className="text-sm text-blue-600 mb-4">{category.articles} articles</p>

                <div className="space-y-2 mb-4">
                  {category.popular.map((article, idx) => (
                    <Link
                      key={idx}
                      href={`/help/${article.toLowerCase().replace(/\s+/g, '-')}`}
                      className="flex items-center text-sm text-gray-600 hover:text-blue-600 group"
                    >
                      <FileText className="h-4 w-4 mr-2 text-gray-400 group-hover:text-blue-500" />
                      {article}
                    </Link>
                  ))}
                </div>

                <Link
                  href={`/help/${category.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  View all articles
                  <ArrowRight className="h-4 w-4 ml-1" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Frequently Asked{" "}
              <span className="text-blue-600">Questions</span>
            </h2>
          </motion.div>

          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md mb-4"
              >
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}

            <div className="text-center mt-8">
              <Link href="/help/faqs">
                <Button variant="outline">
                  View All FAQs
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Support */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl font-bold mb-6">Still Need Help?</h2>
            <p className="text-xl text-blue-100 mb-8">
              Our support team is available 24/7 to assist you
            </p>
            
            <div className="grid md:grid-cols-3 gap-6 max-w-2xl mx-auto mb-8">
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                <MessageCircle className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Live Chat</h3>
                <p className="text-sm text-blue-200">Instant response</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                <Mail className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-sm text-blue-200">24hr response</p>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-4 rounded-xl">
                <Phone className="h-8 w-8 mx-auto mb-2" />
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-sm text-blue-200">+234 123 456 7890</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Contact Support
                </Button>
              </Link>
              <Link href="/help/tickets">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Submit a Ticket
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}