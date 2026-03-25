"use client";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Calendar, User, Clock, ArrowRight, Search,
  Tag, Share2, BookOpen, TrendingUp, Users,
  MessageCircle, Heart, Eye, ChevronRight
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function BlogPage() {
  const featuredPosts = [
    {
      title: "The Future of Queue Management: AI-Powered Wait Time Prediction",
      excerpt: "Discover how artificial intelligence is revolutionizing queue management and reducing customer wait times by up to 60%.",
      author: "Dr. Michael Adebayo",
      role: "CTO, A&Q Master Pro",
      date: "Mar 15, 2026",
      readTime: "8 min read",
      category: "Technology",
      image: "🤖",
      comments: 24,
      likes: 156,
      featured: true
    },
    {
      title: "How to Reduce No-Shows by 80% with Automated Reminders",
      excerpt: "Learn the psychology behind appointment no-shows and how smart notification systems can dramatically improve attendance.",
      author: "Sarah Johnson",
      role: "Customer Experience Lead",
      date: "Mar 12, 2026",
      readTime: "6 min read",
      category: "Best Practices",
      image: "📱",
      comments: 18,
      likes: 92
    },
    {
      title: "Case Study: How GTBank Reduced Wait Times by 70%",
      excerpt: "An in-depth look at how one of Nigeria's largest banks transformed their branch operations with smart queue management.",
      author: "Oluwaseun Ogunleye",
      role: "Banking Solutions Lead",
      date: "Mar 10, 2026",
      readTime: "10 min read",
      category: "Case Study",
      image: "🏦",
      comments: 42,
      likes: 203
    }
  ];

  const posts = [
    {
      title: "5 Signs Your Business Needs a Queue Management System",
      excerpt: "Is long wait times hurting your business? Here are the telltale signs it's time to upgrade.",
      date: "Mar 8, 2026",
      category: "Business Tips",
      image: "💡"
    },
    {
      title: "The Psychology of Waiting: Why Queue Management Matters",
      excerpt: "Understanding how customers perceive wait times can help you design better service experiences.",
      date: "Mar 5, 2026",
      category: "Customer Experience",
      image: "🧠"
    },
    {
      title: "Top 10 Features to Look for in Queue Management Software",
      excerpt: "A comprehensive guide to choosing the right queue management system for your business.",
      date: "Mar 2, 2026",
      category: "Buyer's Guide",
      image: "🔍"
    },
    {
      title: "Integrating Queue Management with Your Existing Systems",
      excerpt: "How to seamlessly connect queue management with your CRM, ERP, and other business tools.",
      date: "Feb 28, 2026",
      category: "Integration",
      image: "🔌"
    },
    {
      title: "Queue Management for Healthcare: Improving Patient Experience",
      excerpt: "Special considerations for hospitals and clinics implementing queue systems.",
      date: "Feb 25, 2026",
      category: "Healthcare",
      image: "🏥"
    },
    {
      title: "The ROI of Queue Management: Calculating Your Returns",
      excerpt: "A framework for measuring the financial impact of implementing queue management.",
      date: "Feb 22, 2026",
      category: "Business",
      image: "📊"
    }
  ];

  const categories = [
    { name: "All", count: 45 },
    { name: "Technology", count: 12 },
    { name: "Case Studies", count: 8 },
    { name: "Best Practices", count: 10 },
    { name: "Healthcare", count: 5 },
    { name: "Banking", count: 6 },
    { name: "Retail", count: 4 }
  ];

  const popularTags = [
    "Queue Management", "Customer Experience", "Wait Times", 
    "Digital Transformation", "Healthcare", "Banking", 
    "Appointment Scheduling", "ROI", "Integration"
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
                A&Q Master Pro Blog
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto"
            >
              Insights, best practices, and success stories from the forefront of queue management technology.
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
                placeholder="Search articles..."
                className="pl-12 pr-4 py-6 text-lg rounded-full border-2 border-gray-200 focus:border-blue-500"
              />
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Posts */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex items-center justify-between mb-12"
          >
            <h2 className="text-3xl font-bold text-gray-900">
              Featured <span className="text-blue-600">Articles</span>
            </h2>
            <Link href="/blog/all" className="text-blue-600 hover:text-blue-700 font-medium flex items-center">
              View All
              <ChevronRight className="h-4 w-4 ml-1" />
            </Link>
          </motion.div>

          <div className="grid lg:grid-cols-3 gap-8">
            {featuredPosts.map((post, index) => (
              <motion.article
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                whileHover={{ y: -5 }}
                className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 ${
                  post.featured ? 'lg:col-span-1 ring-2 ring-blue-500 ring-offset-2' : ''
                }`}
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-4xl">{post.image}</span>
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                      {post.category}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-gray-900 mb-3 line-clamp-2">
                    {post.title}
                  </h3>
                  
                  <p className="text-gray-600 mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center mb-4">
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{post.author}</p>
                      <p className="text-sm text-gray-500">{post.role}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <Calendar className="h-4 w-4 mr-1" />
                      {post.date}
                    </div>
                    <div className="flex items-center">
                      <Clock className="h-4 w-4 mr-1" />
                      {post.readTime}
                    </div>
                  </div>

                  <div className="flex items-center justify-between border-t pt-4">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-500">
                        <MessageCircle className="h-4 w-4 mr-1" />
                        {post.comments}
                      </div>
                      <div className="flex items-center text-gray-500">
                        <Heart className="h-4 w-4 mr-1" />
                        {post.likes}
                      </div>
                    </div>
                    <Link 
                      href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                      className="text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      Read More
                      <ArrowRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Posts Grid */}
            <div className="lg:col-span-3">
              <div className="grid md:grid-cols-2 gap-6">
                {posts.map((post, index) => (
                  <motion.article
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <span className="text-3xl">{post.image}</span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-medium">
                        {post.category}
                      </span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
                      {post.title}
                    </h3>
                    
                    <p className="text-gray-600 mb-4 text-sm line-clamp-2">
                      {post.excerpt}
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-500">{post.date}</span>
                      <Link 
                        href={`/blog/${post.title.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-blue-600 hover:text-blue-700 font-medium text-sm flex items-center"
                      >
                        Read More
                        <ArrowRight className="h-3 w-3 ml-1" />
                      </Link>
                    </div>
                  </motion.article>
                ))}
              </div>

              {/* Pagination */}
              <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="flex justify-center mt-12"
              >
                <div className="flex space-x-2">
                  {[1, 2, 3, 4, 5].map((page) => (
                    <Button
                      key={page}
                      variant={page === 1 ? "default" : "outline"}
                      className="w-10 h-10"
                    >
                      {page}
                    </Button>
                  ))}
                </div>
              </motion.div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Categories */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md mb-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Categories</h3>
                <div className="space-y-2">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/blog/category/${category.name.toLowerCase()}`}
                      className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg transition-colors"
                    >
                      <span className="text-gray-700">{category.name}</span>
                      <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-xs">
                        {category.count}
                      </span>
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Popular Tags */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                viewport={{ once: true }}
                className="bg-white p-6 rounded-xl shadow-md mb-6"
              >
                <h3 className="text-lg font-bold text-gray-900 mb-4">Popular Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {popularTags.map((tag, index) => (
                    <Link
                      key={index}
                      href={`/blog/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
                      className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm hover:bg-blue-100 hover:text-blue-700 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </motion.div>

              {/* Newsletter */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                viewport={{ once: true }}
                className="bg-gradient-to-br from-blue-600 to-indigo-600 p-6 rounded-xl shadow-md text-white"
              >
                <h3 className="text-lg font-bold mb-2">Subscribe</h3>
                <p className="text-sm text-blue-100 mb-4">
                  Get the latest articles and insights delivered to your inbox.
                </p>
                <Input
                  type="email"
                  placeholder="Your email"
                  className="mb-3 bg-white/20 border-white/30 text-white placeholder:text-blue-200"
                />
                <Button className="w-full bg-white text-blue-600 hover:bg-gray-100">
                  Subscribe
                </Button>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}