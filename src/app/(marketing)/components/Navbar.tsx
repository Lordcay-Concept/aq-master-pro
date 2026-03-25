"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Menu, X, ChevronDown, Calendar, Users, BarChart3, 
  CreditCard, Building2, Store, Hospital, GraduationCap, 
  Hotel, BookOpen, HelpCircle, ChevronRight, Sparkles,
  Settings, BellRing, Download, Shield, Clock, Smartphone,
  Landmark, Video, TrendingUp, Activity, Film
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

const solutions = [
  { 
    name: "Queue Management", 
    href: "/solutions/queue-management", 
    icon: Users, 
    description: "Real-time queue tracking & digital signage",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    name: "Appointment Booking", 
    href: "/solutions/appointment-booking", 
    icon: Calendar, 
    description: "24/7 online scheduling",
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    name: "Payment Processing", 
    href: "/solutions/payments", 
    icon: CreditCard, 
    description: "Secure payment integration",
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    name: "Analytics & Reports", 
    href: "/solutions/analytics", 
    icon: BarChart3, 
    description: "Data-driven insights",
    gradient: "from-orange-500 to-red-500"
  },
  { 
    name: "Staff Management", 
    href: "/solutions/staff-management", 
    icon: Users, 
    description: "Performance tracking",
    gradient: "from-indigo-500 to-blue-500"
  },
  { 
    name: "Digital Signage", 
    href: "/solutions/digital-signage", 
    icon: Smartphone, 
    description: "Display queue status",
    gradient: "from-pink-500 to-rose-500"
  },
  { 
    name: "SMS/Email Notifications", 
    href: "/solutions/notifications", 
    icon: BellRing, 
    description: "Automated alerts",
    gradient: "from-yellow-500 to-amber-500"
  },
  { 
    name: "API Integration", 
    href: "/solutions/api", 
    icon: Download, 
    description: "Connect with your systems",
    gradient: "from-teal-500 to-cyan-500"
  },
];

const industries = [
  { 
    name: "Healthcare", 
    href: "/industries/healthcare", 
    icon: Hospital, 
    description: "Hospitals, clinics & medical centers",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    name: "Banking & Finance", 
    href: "/industries/banking", 
    icon: Landmark, 
    description: "Banks & financial services",
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    name: "Retail", 
    href: "/industries/retail", 
    icon: Store, 
    description: "Stores, supermarkets & malls",
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    name: "Education", 
    href: "/industries/education", 
    icon: GraduationCap, 
    description: "Schools & universities",
    gradient: "from-orange-500 to-red-500"
  },
  { 
    name: "Hospitality", 
    href: "/industries/hospitality", 
    icon: Hotel, 
    description: "Hotels & restaurants",
    gradient: "from-pink-500 to-rose-500"
  },
  { 
    name: "Government", 
    href: "/industries/government", 
    icon: Shield, 
    description: "Public services & agencies",
    gradient: "from-indigo-500 to-blue-500"
  },
];

const resources = [
  { 
    name: "Blog", 
    href: "/blog", 
    icon: BookOpen, 
    description: "Latest updates & insights",
    gradient: "from-blue-500 to-cyan-500"
  },
  { 
    name: "Documentation", 
    href: "/docs", 
    icon: Settings, 
    description: "Guides & API reference",
    gradient: "from-purple-500 to-pink-500"
  },
  { 
    name: "Case Studies", 
    href: "/case-studies", 
    icon: TrendingUp, 
    description: "Success stories",
    gradient: "from-green-500 to-emerald-500"
  },
  { 
    name: "Help Center", 
    href: "/help", 
    icon: HelpCircle, 
    description: "FAQs & support",
    gradient: "from-orange-500 to-red-500"
  },
  { 
    name: "Webinars", 
    href: "/webinars", 
    icon: Video, 
    description: "Live demos & training",
    gradient: "from-pink-500 to-rose-500"
  },
];

// Company links - Only Pricing, How It Works, Demo
const companyLinks = [
  { name: "Pricing", href: "/pricing", icon: CreditCard },
  { name: "How It Works", href: "/how-it-works", icon: Activity },
  { name: "Demo", href: "/demo", icon: Film },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { data: session, status } = useSession();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (activeDropdown) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [activeDropdown]);

  const toggleDropdown = (e: React.MouseEvent, name: string) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveDropdown(activeDropdown === name ? null : name);
  };

  const closeMobileMenu = () => {
    setIsOpen(false);
    setActiveDropdown(null);
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-500 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl shadow-2xl py-2 border-b border-gray-200/50"
          : "bg-gradient-to-r from-blue-600/90 to-purple-600/90 backdrop-blur-md py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center">
          {/* Logo with Animation */}
          <Link href="/" className="flex items-center space-x-2 group" onClick={closeMobileMenu}>
            <motion.div
              whileHover={{ scale: 1.1, rotate: 360 }}
              transition={{ duration: 0.5 }}
              className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                scrolled 
                  ? "bg-gradient-to-r from-blue-600 to-purple-600" 
                  : "bg-white/20 backdrop-blur-md"
              }`}
            >
              <Sparkles className={`h-6 w-6 ${scrolled ? "text-white" : "text-white"}`} />
            </motion.div>
            <span className={`text-xl font-bold ${scrolled ? "text-gray-900" : "text-white"}`}>
              A&Q Master Pro
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            <Link 
              href="/" 
              className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                scrolled 
                  ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" 
                  : "text-white hover:bg-white/20"
              }`}
            >
              Home
            </Link>

            {/* Solutions Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown(e, 'solutions')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center group ${
                  scrolled 
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                Solutions
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === 'solutions' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'solutions' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-[700px] bg-white rounded-2xl shadow-2xl border border-gray-100 p-6"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {solutions.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-start p-4 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                          onClick={closeMobileMenu}
                        >
                          <div className={`w-12 h-12 bg-gradient-to-r ${item.gradient} rounded-xl flex items-center justify-center mr-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <div>
                            <div className="font-semibold text-gray-900 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600">
                              {item.name}
                            </div>
                            <div className="text-sm text-gray-500">{item.description}</div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Industries Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown(e, 'industries')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center ${
                  scrolled 
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                Industries
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === 'industries' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'industries' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-96 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {industries.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                          onClick={closeMobileMenu}
                        >
                          <div className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center mr-3 shadow-md`}>
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Resources Dropdown */}
            <div className="relative">
              <button
                onClick={(e) => toggleDropdown(e, 'resources')}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium flex items-center ${
                  scrolled 
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                Resources
                <ChevronDown className={`ml-1 h-4 w-4 transition-transform duration-300 ${
                  activeDropdown === 'resources' ? 'rotate-180' : ''
                }`} />
              </button>
              
              <AnimatePresence>
                {activeDropdown === 'resources' && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.2 }}
                    className="absolute top-full left-0 mt-2 w-80 bg-white rounded-2xl shadow-2xl border border-gray-100 p-4"
                    onClick={(e) => e.stopPropagation()}
                  >
                    <div className="grid grid-cols-1 gap-2">
                      {resources.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="flex items-center p-3 rounded-xl hover:bg-gradient-to-r hover:from-gray-50 hover:to-gray-100 transition-all duration-300 group"
                          onClick={closeMobileMenu}
                        >
                          <div className={`w-10 h-10 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center mr-3 shadow-md`}>
                            <item.icon className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="font-medium text-gray-900">{item.name}</div>
                            <div className="text-xs text-gray-500">{item.description}</div>
                          </div>
                          <ChevronRight className="h-4 w-4 text-gray-400 group-hover:text-blue-600" />
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Company Links */}
            {companyLinks.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`px-4 py-2 rounded-lg transition-all duration-300 font-medium ${
                  scrolled 
                    ? "text-gray-700 hover:text-blue-600 hover:bg-blue-50" 
                    : "text-white hover:bg-white/20"
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Auth Login button  */}
            {status === "authenticated" ? (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300/30">
                
                <Button 
                  variant="ghost" 
                  className={scrolled ? "text-gray-700" : "text-white hover:bg-white/20"}
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 ml-4 pl-4 border-l border-gray-300/30">
                <Link href="/login">
                  <Button 
                    variant="ghost" 
                    className={scrolled ? "text-gray-700" : "text-white hover:bg-white/20"}
                  >
                    Login
                  </Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`lg:hidden p-2 rounded-lg transition-colors ${
              scrolled ? "hover:bg-gray-100" : "hover:bg-white/20"
            }`}
          >
            {isOpen ? (
              <X className={scrolled ? "text-gray-900" : "text-white"} size={24} />
            ) : (
              <Menu className={scrolled ? "text-gray-900" : "text-white"} size={24} />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden absolute top-full left-0 right-0 bg-white shadow-2xl rounded-b-2xl mt-2 mx-4 border max-h-[80vh] overflow-y-auto"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="p-4">
                {/* Home Link */}
                <Link
                  href="/"
                  className="block py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg font-medium"
                  onClick={closeMobileMenu}
                >
                  Home
                </Link>

                {/* Solutions Section */}
                <div className="mt-2">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Solutions
                  </div>
                  {solutions.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={closeMobileMenu}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center mr-3`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Industries Section */}
                <div className="mt-4">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Industries
                  </div>
                  {industries.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={closeMobileMenu}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center mr-3`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Resources Section */}
                <div className="mt-4">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Resources
                  </div>
                  {resources.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={closeMobileMenu}
                    >
                      <div className={`w-8 h-8 bg-gradient-to-r ${item.gradient} rounded-lg flex items-center justify-center mr-3`}>
                        <item.icon className="h-4 w-4 text-white" />
                      </div>
                      <div>
                        <div className="font-medium">{item.name}</div>
                        <div className="text-xs text-gray-500">{item.description}</div>
                      </div>
                    </Link>
                  ))}
                </div>

                {/* Company Links */}
                <div className="mt-4">
                  <div className="px-4 py-2 text-sm font-semibold text-gray-400 uppercase tracking-wider">
                    Company
                  </div>
                  {companyLinks.map((item) => (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center py-3 px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg"
                      onClick={closeMobileMenu}
                    >
                      <item.icon className="h-4 w-4 mr-3 text-gray-500" />
                      <span>{item.name}</span>
                    </Link>
                  ))}
                </div>

                {/* Mobile Auth Buttons - ONLY Login */}
                <div className="mt-6 pt-4 border-t border-gray-200">
                  {status === "authenticated" ? (
                    <div className="space-y-2">
                      
                      <Button 
                        variant="outline" 
                        className="w-full"
                        onClick={() => {
                          signOut({ callbackUrl: "/" });
                          closeMobileMenu();
                        }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Link href="/login" onClick={closeMobileMenu}>
                        <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                          Login
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  );
}