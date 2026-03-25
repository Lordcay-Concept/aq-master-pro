"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  GraduationCap, BookOpen, Users, Clock, Calendar,
  Award, PenTool, Globe, ArrowRight, CheckCircle,
  Library, Laptop, School, Bus
} from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EducationPage() {
  const features = [
    {
      icon: Users,
      title: "Student Registration",
      description: "Streamline admissions, course registration, and document processing queues.",
      color: "from-blue-500 to-indigo-500"
    },
    {
      icon: BookOpen,
      title: "Library Management",
      description: "Manage book checkouts, returns, and study room reservations efficiently.",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: Calendar,
      title: "Academic Advising",
      description: "Schedule and manage student-advisor appointments with ease.",
      color: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Exam Hall Management",
      description: "Organize student entry, seating, and exam materials distribution.",
      color: "from-orange-500 to-red-500"
    },
    {
      icon: Award,
      title: "Graduation Ceremonies",
      description: "Coordinate graduate processions, robe collection, and stage presentations.",
      color: "from-indigo-500 to-blue-500"
    },
    {
      icon: Globe,
      title: "International Student Services",
      description: "Dedicated queues for visa processing, orientation, and housing assistance.",
      color: "from-pink-500 to-rose-500"
    },
    {
      icon: School,
      title: "Campus Tours",
      description: "Manage prospective student tours and open day events.",
      color: "from-cyan-500 to-teal-500"
    },
    {
      icon: Laptop,
      title: "IT Support",
      description: "Queue system for student tech support and computer lab access.",
      color: "from-amber-500 to-orange-500"
    }
  ];

  const benefits = [
    "Reduce registration wait times by 70%",
    "Handle 5,000+ students during peak periods",
    "Improve student satisfaction scores by 55%",
    "Optimize staff allocation across departments",
    "Track service delivery metrics",
    "Reduce no-shows for advising appointments"
  ];

  const stats = [
    { value: "70%", label: "Less Wait Time" },
    { value: "5,000+", label: "Peak Capacity" },
    { value: "55%", label: "Higher Satisfaction" },
    { value: "24/7", label: "Online Booking" }
  ];

  const institutions = [
    {
      name: "University of Lagos",
      location: "Akoka, Lagos",
      students: "45,000+",
      image: "🎓"
    },
    {
      name: "Yaba College of Tech",
      location: "Yaba, Lagos",
      students: "15,000+",
      image: "🏛️"
    },
    {
      name: "Pan-Atlantic University",
      location: "Ibeju-Lekki, Lagos",
      students: "3,500+",
      image: "📚"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-indigo-600/5 to-purple-600/5" />
        <div className="absolute inset-0 bg-blue-pattern opacity-30" />
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
                Education Queue Management
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Streamline student services, from registration to graduation. Perfect for universities, 
              colleges, and educational institutions of all sizes.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link href="/register">
                <Button size="lg" className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:shadow-xl hover:scale-105 transition-all duration-300 px-8 py-6 text-lg group">
                  Get Started
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
              <Link href="/demo">
                <Button size="lg" variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
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

      {/* Featured Institutions */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-3xl font-bold text-center mb-12"
          >
            Trusted by Leading{" "}
            <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              Nigerian Institutions
            </span>
          </motion.h2>

          <div className="grid md:grid-cols-3 gap-6">
            {institutions.map((inst, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 p-6 rounded-2xl"
              >
                <div className="text-4xl mb-4">{inst.image}</div>
                <h3 className="text-xl font-semibold mb-1">{inst.name}</h3>
                <p className="text-gray-600 mb-2">{inst.location}</p>
                <p className="text-sm text-blue-600 font-semibold">{inst.students} students</p>
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
            className="text-center max-w-3xl mx-auto mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Education-Specific{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Features
              </span>
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to manage student services efficiently
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
                Why Educational Institutions{" "}
                <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
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

              <div className="bg-gradient-to-r from-blue-100 to-indigo-100 p-6 rounded-2xl">
                <p className="text-lg italic text-gray-700 mb-2">
                  "Registration week used to be chaotic. Now students are in and out in 15 minutes. It's transformed our student services."
                </p>
                <p className="font-semibold text-blue-600">— Prof. Adebayo O., Registrar, UNILAG</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-blue-600 to-indigo-600 p-8 rounded-3xl text-white"
            >
              <h3 className="text-2xl font-bold mb-6">Integration Capabilities</h3>
              <div className="space-y-4">
                {[
                  "Student Information Systems",
                  "Learning Management Systems",
                  "Library Management Software",
                  "Payment Gateways",
                  "ID Card Systems"
                ].map((item, i) => (
                  <div key={i} className="flex items-center border-b border-white/20 pb-2">
                    <CheckCircle className="h-5 w-5 mr-3 flex-shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center">
                  <GraduationCap className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">Student Portal</div>
                </div>
                <div className="text-center">
                  <Globe className="h-8 w-8 mx-auto mb-2" />
                  <div className="text-sm">Mobile App</div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Registration Season Promo */}
      <section className="py-16 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center text-white"
          >
            <h3 className="text-3xl font-bold mb-4">Prepare for Registration Season</h3>
            <p className="text-xl mb-8 opacity-90">
              Handle 5,000+ students per day without breaking a sweat
            </p>
            <Link href="/registration-solution">
              <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100">
                Learn More
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
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
              Ready to Transform Student Services?
            </h2>
            <p className="text-xl text-white/90 mb-8">
              Join 50+ educational institutions already using our system
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get Started
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-white hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Contact Education Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}