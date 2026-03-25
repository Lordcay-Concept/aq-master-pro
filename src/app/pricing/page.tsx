"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  CheckCircle, XCircle, Star, Users, Building2,
  CreditCard, Shield, Zap, Globe, Clock,
  ArrowRight, HelpCircle, Download, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function PricingPage() {
  const plans = [
    {
      name: "Starter",
      description: "Perfect for small businesses just getting started",
      price: "$29",
      period: "/month",
      icon: Star,
      features: [
        { name: "Up to 3 service counters", included: true },
        { name: "500 customers/month", included: true },
        { name: "Basic queue management", included: true },
        { name: "Email notifications", included: true },
        { name: "SMS notifications", included: false },
        { name: "WhatsApp integration", included: false },
        { name: "Advanced analytics", included: false },
        { name: "API access", included: false },
        { name: "Priority support", included: false },
        { name: "Custom branding", included: false }
      ],
      cta: "Start Free Trial",
      popular: false,
      gradient: "from-gray-600 to-gray-700"
    },
    {
      name: "Professional",
      description: "Ideal for growing businesses with multiple locations",
      price: "$79",
      period: "/month",
      icon: Building2,
      features: [
        { name: "Up to 10 service counters", included: true },
        { name: "2,000 customers/month", included: true },
        { name: "Advanced queue management", included: true },
        { name: "Email notifications", included: true },
        { name: "SMS notifications", included: true },
        { name: "WhatsApp integration", included: true },
        { name: "Advanced analytics", included: true },
        { name: "API access", included: true },
        { name: "Priority support", included: false },
        { name: "Custom branding", included: false }
      ],
      cta: "Start Free Trial",
      popular: true,
      gradient: "from-blue-600 to-indigo-600"
    },
    {
      name: "Enterprise",
      description: "For large organizations with complex needs",
      price: "Custom",
      period: "",
      icon: Building2,
      features: [
        { name: "Unlimited service counters", included: true },
        { name: "Unlimited customers", included: true },
        { name: "Custom queue rules", included: true },
        { name: "All notification channels", included: true },
        { name: "Real-time analytics", included: true },
        { name: "Full API access", included: true },
        { name: "24/7 priority support", included: true },
        { name: "Custom branding", included: true },
        { name: "SLA guarantee", included: true },
        { name: "Dedicated account manager", included: true }
      ],
      cta: "Contact Sales",
      popular: false,
      gradient: "from-purple-600 to-pink-600"
    }
  ];

  const addons = [
    { name: "Additional Service Counter", price: "$10", unit: "/counter/month" },
    { name: "SMS Credits", price: "$0.05", unit: "/message" },
    { name: "WhatsApp Integration", price: "$29", unit: "/month" },
    { name: "Advanced Analytics", price: "$49", unit: "/month" },
    { name: "API Access", price: "$99", unit: "/month" },
    { name: "Custom Reports", price: "$199", unit: "/month" }
  ];

  const faqs = [
    {
      question: "Can I change plans later?",
      answer: "Yes, you can upgrade or downgrade your plan at any time. Changes will be reflected in your next billing cycle."
    },
    {
      question: "Is there a setup fee?",
      answer: "No, there are no setup fees for any of our plans. You only pay the monthly subscription."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, Paystack, Flutterwave, and bank transfers for annual plans."
    },
    {
      question: "Do you offer discounts for annual billing?",
      answer: "Yes, save 20% when you choose annual billing on any plan."
    },
    {
      question: "Can I cancel anytime?",
      answer: "Yes, you can cancel your subscription at any time. No long-term contracts required."
    },
    {
      question: "Is there a free trial?",
      answer: "Yes, all plans come with a 14-day free trial. No credit card required."
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
              Simple,{" "}
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Transparent Pricing
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Choose the perfect plan for your business. All plans include a 14-day free trial.
            </motion.p>

            {/* Billing Toggle */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex items-center justify-center space-x-4 mb-8"
            >
              <span className="text-gray-700 font-medium">Monthly</span>
              <div className="w-16 h-8 bg-blue-600 rounded-full p-1 cursor-pointer">
                <div className="w-6 h-6 bg-white rounded-full ml-auto" />
              </div>
              <span className="text-gray-700 font-medium">Annual <span className="text-green-600 text-sm">(Save 20%)</span></span>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`relative bg-white rounded-3xl shadow-xl overflow-hidden ${
                  plan.popular ? 'lg:scale-105 border-2 border-blue-500' : 'border border-gray-200'
                }`}
              >
                {plan.popular && (
                  <div className="absolute top-0 right-0 bg-blue-500 text-white px-4 py-1 text-sm font-medium rounded-bl-lg z-10">
                    MOST POPULAR
                  </div>
                )}

                <div className={`bg-gradient-to-r ${plan.gradient} p-6 text-white`}>
                  <plan.icon className="h-10 w-10 mb-4" />
                  <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                  <p className="text-white/90 text-sm mb-4">{plan.description}</p>
                  <div className="flex items-end">
                    <span className="text-4xl font-bold">{plan.price}</span>
                    <span className="text-white/80 ml-2">{plan.period}</span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4 mb-6">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start">
                        {feature.included ? (
                          <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        ) : (
                          <XCircle className="h-5 w-5 text-red-400 mr-3 flex-shrink-0" />
                        )}
                        <span className={feature.included ? "text-gray-700" : "text-gray-400"}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link href={plan.name === "Enterprise" ? "/contact" : "/register"}>
                    <Button 
                      className={`w-full ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700' 
                          : 'bg-gray-900 text-white hover:bg-gray-800'
                      }`}
                      size="lg"
                    >
                      {plan.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Money-back Guarantee */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center mt-12 p-6 bg-gray-50 rounded-2xl max-w-3xl mx-auto"
          >
            <Shield className="h-12 w-12 text-green-500 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">30-Day Money-Back Guarantee</h3>
            <p className="text-gray-600">
              Not satisfied with our service? Contact us within 30 days for a full refund. No questions asked.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Optional <span className="text-blue-600">Add-ons</span>
            </h2>
            <p className="text-lg text-gray-600">
              Customize your plan with additional features
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {addons.map((addon, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{addon.name}</h3>
                <div className="flex items-end mb-4">
                  <span className="text-2xl font-bold text-blue-600">{addon.price}</span>
                  <span className="text-gray-500 text-sm ml-1">{addon.unit}</span>
                </div>
                <Button variant="outline" size="sm" className="w-full">
                  Add to Plan
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
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
              Frequently Asked{" "}
              <span className="text-blue-600">Questions</span>
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-50 p-6 rounded-xl"
              >
                <h3 className="font-semibold text-gray-900 mb-2">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link href="/help/faqs">
              <Button variant="outline" className="border-2 border-blue-600 text-blue-600 hover:bg-blue-50">
                View All FAQs
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
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
              Start Your 14-Day Free Trial Today
            </h2>
            <p className="text-xl text-white/90 mb-8">
              No credit card required. Cancel anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/register">
                <Button size="lg" variant="secondary" className="bg-white text-blue-600 hover:bg-gray-100 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
                  Get Started Free
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-2 border-white text-purple-800 hover:bg-white/20 hover:scale-105 transition-all duration-300 px-8 py-6 text-lg">
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