"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Code, GitBranch, Cpu, Cloud, Lock, Zap,
  Globe, Database, Terminal, BookOpen, Users,
  ArrowRight, CheckCircle, Settings, Layers
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function APIPage() {
  const features = [
    {
      icon: Code,
      title: "RESTful API",
      description: "Fully documented REST API with comprehensive endpoints for all system features.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: GitBranch,
      title: "Webhook Support",
      description: "Real-time event notifications via webhooks for instant system integration.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Cpu,
      title: "SDKs Available",
      description: "Ready-to-use SDKs for JavaScript, Python, PHP, Java, and more.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Cloud,
      title: "Cloud Integration",
      description: "Seamless integration with AWS, Google Cloud, and Azure services.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Lock,
      title: "OAuth 2.0 Auth",
      description: "Secure authentication with OAuth 2.0 and API key management.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Database,
      title: "Data Sync",
      description: "Bi-directional data synchronization with your existing systems.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: Terminal,
      title: "CLI Tools",
      description: "Command-line interface for testing and automation.",
      color: "from-teal-500 to-cyan-500"
    },
    {
      icon: BookOpen,
      title: "Live Documentation",
      description: "Interactive API documentation with try-it-yourself endpoints.",
      color: "from-yellow-500 to-amber-500"
    }
  ];

  const endpoints = [
    { method: "GET", path: "/api/v1/appointments", description: "List appointments" },
    { method: "POST", path: "/api/v1/appointments", description: "Create appointment" },
    { method: "GET", path: "/api/v1/queue/:id", description: "Get queue status" },
    { method: "PUT", path: "/api/v1/appointments/:id", description: "Update appointment" },
    { method: "DELETE", path: "/api/v1/appointments/:id", description: "Cancel appointment" },
    { method: "GET", path: "/api/v1/analytics", description: "Get queue analytics" }
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
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 mb-6"
            >
              <span className="bg-gradient-to-r from-gray-700 via-gray-800 to-black bg-clip-text text-transparent">
                API Integration
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Connect our queue management system with your existing software. 
              Build custom solutions with our powerful, well-documented APIs.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-gray-700 to-gray-900 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Get API Access
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="border-2 border-gray-700 text-gray-700 hover:bg-gray-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Read Docs
                </Button>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>

      {/* API Explorer */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="bg-gray-900 rounded-3xl p-8 text-white"
          >
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                <div className="w-3 h-3 bg-green-500 rounded-full" />
              </div>
              <div className="text-sm text-gray-400">API Explorer</div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-lg font-semibold mb-4">Sample Endpoints</h4>
                <div className="space-y-3">
                  {endpoints.map((ep, index) => (
                    <div key={index} className="flex items-center text-sm">
                      <span className={`px-2 py-1 rounded ${
                        ep.method === 'GET' ? 'bg-green-600' :
                        ep.method === 'POST' ? 'bg-blue-600' :
                        ep.method === 'PUT' ? 'bg-yellow-600' : 'bg-red-600'
                      } text-xs font-bold mr-3`}>
                        {ep.method}
                      </span>
                      <span className="text-gray-300 font-mono">{ep.path}</span>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="bg-gray-800 p-4 rounded-xl font-mono text-sm">
                <div className="text-green-400">$ curl -X GET https://api.aqmaster.com/v1/queue/123</div>
                <div className="text-gray-400 mt-2">{'{'}</div>
                <div className="text-gray-400 ml-4">"status": "waiting",</div>
                <div className="text-gray-400 ml-4">"position": 3,</div>
                <div className="text-gray-400 ml-4">"waitTime": "5 mins"</div>
                <div className="text-gray-400">{'}'}</div>
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
              Developer-Friendly{" "}
              <span className="bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                API Features
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
              Start Building Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 500+ developers already using our API
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get API Key
                </Button>
              </Link>
              <Link href="/docs">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Read Documentation
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}