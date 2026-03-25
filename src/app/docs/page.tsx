"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  BookOpen, Code, Terminal, Cpu, Globe,
  Shield, Zap, Settings, ArrowRight, Search,
  ChevronRight, CheckCircle, Copy, Download
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function DocumentationPage() {
  const sections = [
    {
      title: "Getting Started",
      icon: BookOpen,
      description: "Learn the basics of A&Q Master Pro",
      color: "from-blue-500 to-cyan-500",
      links: [
        "Quick Start Guide",
        "Installation",
        "System Requirements",
        "Account Setup",
        "First Time Configuration"
      ]
    },
    {
      title: "API Reference",
      icon: Code,
      description: "Complete API documentation",
      color: "from-purple-500 to-pink-500",
      links: [
        "Authentication",
        "Endpoints Reference",
        "Rate Limits",
        "Webhooks",
        "Error Handling"
      ]
    },
    {
      title: "Integration Guides",
      icon: Cpu,
      description: "Connect with your existing systems",
      color: "from-green-500 to-emerald-500",
      links: [
        "CRM Integration",
        "Payment Gateway Setup",
        "Calendar Sync",
        "SMS/Email Setup",
        "Database Migration"
      ]
    },
    {
      title: "SDKs & Libraries",
      icon: Terminal,
      description: "Official SDKs for popular languages",
      color: "from-orange-500 to-red-500",
      links: [
        "JavaScript/Node.js",
        "Python SDK",
        "PHP Library",
        "Java Client",
        "React Native"
      ]
    },
    {
      title: "Security & Compliance",
      icon: Shield,
      description: "Security best practices",
      color: "from-indigo-500 to-blue-500",
      links: [
        "Data Encryption",
        "Authentication",
        "GDPR Compliance",
        "Audit Logs",
        "Security Checklist"
      ]
    },
    {
      title: "Tutorials",
      icon: Globe,
      description: "Step-by-step guides",
      color: "from-pink-500 to-rose-500",
      links: [
        "Building a Queue System",
        "Customizing Notifications",
        "Analytics Dashboard",
        "Multi-location Setup",
        "White-label Solution"
      ]
    }
  ];

  const quickLinks = [
    { name: "Authentication", href: "#", icon: Shield },
    { name: "Queue Management API", href: "#", icon: Zap },
    { name: "Webhook Events", href: "#", icon: Globe },
    { name: "Error Codes", href: "#", icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-gray-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-600/5 via-slate-600/5 to-zinc-600/5" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <span className="inline-block px-4 py-2 bg-gray-100 text-gray-700 rounded-full text-sm font-semibold mb-6">
                📚 Resource #2
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-black bg-clip-text text-transparent">
                Documentation
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Everything you need to integrate and build with A&Q Master Pro
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
                placeholder="Search documentation..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-gray-600"
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
              {quickLinks.map((link, index) => (
                <Link
                  key={index}
                  href={link.href}
                  className="flex items-center px-4 py-2 bg-white rounded-full shadow-md hover:shadow-lg transition-shadow"
                >
                  <link.icon className="h-4 w-4 text-gray-600 mr-2" />
                  <span className="text-sm font-medium text-gray-700">{link.name}</span>
                </Link>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Documentation Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {sections.map((section, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl border border-gray-200 hover:border-gray-300 hover:shadow-xl transition-all"
              >
                <div className={`w-14 h-14 bg-gradient-to-r ${section.color} rounded-xl flex items-center justify-center mb-6`}>
                  <section.icon className="h-7 w-7 text-white" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">{section.title}</h3>
                <p className="text-gray-600 mb-4">{section.description}</p>

                <ul className="space-y-2 mb-6">
                  {section.links.map((link, idx) => (
                    <li key={idx}>
                      <Link
                        href={`/docs/${link.toLowerCase().replace(/\s+/g, '-')}`}
                        className="flex items-center text-gray-600 hover:text-gray-900 group"
                      >
                        <ChevronRight className="h-4 w-4 mr-2 text-gray-400 group-hover:text-gray-600" />
                        <span className="text-sm">{link}</span>
                      </Link>
                    </li>
                  ))}
                </ul>

                <Link
                  href={`/docs/${section.title.toLowerCase().replace(/\s+/g, '-')}`}
                  className="inline-flex items-center text-gray-700 font-medium hover:text-gray-900"
                >
                  View all
                  <ArrowRight className="h-4 w-4 ml-1 group-hover:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Code Sample Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="bg-gray-800 rounded-2xl overflow-hidden shadow-2xl">
              <div className="flex items-center justify-between px-6 py-4 bg-gray-700">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-red-500 rounded-full" />
                  <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                  <div className="w-3 h-3 bg-green-500 rounded-full" />
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-300">Quick Start Example</span>
                  <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
                    <Copy className="h-4 w-4 mr-2" />
                    Copy
                  </Button>
                </div>
              </div>
              <div className="p-6 font-mono text-sm text-gray-300 overflow-x-auto">
                <pre>{`// Initialize the A&Q Master Pro client
const aqClient = new AQMasterPro({
  apiKey: 'your_api_key_here',
  environment: 'production' // or 'sandbox'
});

// Create a new queue
const queue = await aqClient.queues.create({
  name: 'Customer Service',
  servicePoints: 3,
  notificationTypes: ['sms', 'email']
});

// Generate a ticket
const ticket = await queue.generateTicket({
  customer: {
    name: 'John Doe',
    phone: '+234123456789',
    email: 'john@example.com'
  },
  serviceType: 'general'
});

console.log('Ticket created:', ticket.number);
// Output: Ticket created: GS-042`}</pre>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Start Building?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Get your API keys and start integrating today
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get API Access
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Contact Support
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}