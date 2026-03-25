"use client";

import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar, Clock, Users, Ticket, History,
  Bell, Settings, LogOut, CreditCard, QrCode,
  ChevronRight, Clock3, CheckCircle, XCircle,
  AlertCircle, Download, Printer, Star,
  Menu, X, Home, Sparkles, Activity,
  ArrowRight, Gift, Award, Zap, Moon,
  Sun, User, Mail, Phone, Gem,
  Crown, Rocket, Heart, Coffee
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

// Types
interface CustomerData {
  _id?: string;
  name: string;
  email: string;
  tier: string;
  points: number;
  visits: number;
  nextTier: string;
  pointsToNext: number;
  memberSince: string;
  phone: string;
}

interface ActiveTicket {
  _id?: string;
  number: string;
  service: string;
  queuePosition: number;
  estimatedWait: number;
  status: string;
  counter: number | null;
  ticketNumber?: string;
}

interface Appointment {
  _id: string;
  id: string;
  date: string;
  time?: string;
  service: string;
  status: "completed" | "cancelled" | "pending" | "waiting";
  rating: number | null;
  amount?: number;
  ticketNumber?: string;
}

interface Notification {
  _id: string;
  id: string;
  message: string;
  time: string;
  read: boolean;
  createdAt?: string;
}

interface HistoryItemProps {
  appointment: Appointment;
  index: number;
}

function Switch({ defaultChecked }: { defaultChecked?: boolean }) {
  const [checked, setChecked] = useState(defaultChecked || false);
  
  return (
    <button
      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-all duration-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white ${
        checked ? 'bg-gradient-to-r from-violet-500 to-fuchsia-500' : 'bg-gray-200'
      }`}
      onClick={() => setChecked(!checked)}
      role="switch"
      aria-checked={checked}
    >
      <motion.span
        layout
        transition={{ type: "spring", stiffness: 500, damping: 30 }}
        className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-lg ${
          checked ? 'translate-x-6' : 'translate-x-1'
        }`}
      />
    </button>
  );
}

function FloatingParticles() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full mix-blend-multiply filter blur-xl"
          style={{
            background: `radial-gradient(circle, ${
              i % 3 === 0 ? 'rgba(168, 85, 247, 0.2)' : 
              i % 3 === 1 ? 'rgba(236, 72, 153, 0.2)' : 
              'rgba(59, 130, 246, 0.2)'
            } 0%, transparent 70%)`,
            width: Math.random() * 300 + 100 + 'px',
            height: Math.random() * 300 + 100 + 'px',
            left: Math.random() * 100 + '%',
            top: Math.random() * 100 + '%',
          }}
          animate={{
            x: [0, Math.random() * 100 - 50, 0],
            y: [0, Math.random() * 100 - 50, 0],
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: Math.random() * 10 + 10,
            repeat: Infinity,
            ease: "linear"
          }}
        />
      ))}
    </div>
  );
}

function GlowingText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.span
      className={`relative ${className}`}
      animate={{
        textShadow: [
          "0 0 20px rgba(168, 85, 247, 0)",
          "0 0 30px rgba(168, 85, 247, 0.5)",
          "0 0 20px rgba(168, 85, 247, 0)",
        ],
      }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    >
      {children}
    </motion.span>
  );
}

function GradientBorderCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <motion.div
      className={`relative rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 p-[2px] ${className}`}
      animate={{
        backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
      }}
      transition={{
        duration: 5,
        repeat: Infinity,
        ease: "linear",
      }}
      style={{
        backgroundSize: "200% 200%",
      }}
    >
      <div className="bg-white rounded-2xl h-full w-full">
        {children}
      </div>
    </motion.div>
  );
}

export default function CustomerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [loading, setLoading] = useState(true);

  const [customer, setCustomer] = useState<CustomerData>({
    name: "",
    email: "",
    tier: "",
    points: 0,
    visits: 0,
    nextTier: "",
    pointsToNext: 0,
    memberSince: "",
    phone: ""
  });

  const [activeTicket, setActiveTicket] = useState<ActiveTicket | null>(null);
  const [recentAppointments, setRecentAppointments] = useState<Appointment[]>([]);
  const [notifications, setNotifications] = useState<Notification[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20,
      });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good Morning");
    else if (hour < 18) setGreeting("Good Afternoon");
    else setGreeting("Good Evening");
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
    
    if (status === "authenticated") {
      fetchAllData();
    }
  }, [status, router]);

  const fetchAllData = async () => {
    setLoading(true);
    try {
      await Promise.all([
        fetchCustomerData(),
        fetchActiveTicket(),
        fetchAppointments(),
        fetchNotifications()
      ]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast.error('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchCustomerData = async () => {
    try {
      const response = await fetch('/api/customer/profile');
      if (response.ok) {
        const data = await response.json();
        setCustomer({
          name: data.name || session?.user?.name || "",
          email: data.email || session?.user?.email || "",
          tier: data.tier || "Bronze",
          points: data.points || 0,
          visits: data.totalVisits || 0,
          nextTier: data.nextTier || "Silver",
          pointsToNext: data.pointsToNext || 500,
          memberSince: data.createdAt ? new Date(data.createdAt).toLocaleDateString('en-US', { month: 'short', year: 'numeric' }) : "Jan 2024",
          phone: data.phone || ""
        });
      } else {
        setCustomer({
          name: session?.user?.name || "",
          email: session?.user?.email || "",
          tier: "Bronze",
          points: 0,
          visits: 0,
          nextTier: "Silver",
          pointsToNext: 500,
          memberSince: new Date().toLocaleDateString('en-US', { month: 'short', year: 'numeric' }),
          phone: ""
        });
      }
    } catch (error) {
      console.error('Error fetching customer data:', error);
    }
  };

  const fetchActiveTicket = async () => {
    try {
      const response = await fetch('/api/customer/active-ticket');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setActiveTicket({
            number: data.ticketNumber || data.number,
            service: data.serviceName || data.service,
            queuePosition: data.queuePosition || 0,
            estimatedWait: data.estimatedWaitTime || data.estimatedWait || 0,
            status: data.status || "waiting",
            counter: data.counter || null,
            ticketNumber: data.ticketNumber
          });
        } else {
          setActiveTicket(null);
        }
      } else {
        setActiveTicket(null);
      }
    } catch (error) {
      console.error('Error fetching active ticket:', error);
      setActiveTicket(null);
    }
  };

  const fetchAppointments = async () => {
    try {
      const response = await fetch('/api/customer/appointments');
      if (response.ok) {
        const data = await response.json();
        const appointments = data.appointments || [];
        const transformedAppointments: Appointment[] = appointments.map((apt: any) => ({
          _id: apt._id,
          id: apt.id || apt._id,
          date: apt.date,
          time: apt.time,
          service: apt.serviceName || apt.service,
          status: apt.status === "completed" ? "completed" : 
                  apt.status === "cancelled" ? "cancelled" : 
                  apt.status === "waiting" ? "pending" : "pending",
          rating: apt.satisfaction || null,
          amount: apt.amountPaid || 0,
          ticketNumber: apt.ticketNumber
        }));
        setRecentAppointments(transformedAppointments.slice(0, 10));
      } else {
        setRecentAppointments([]);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
      setRecentAppointments([]);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/customer/notifications');
      if (response.ok) {
        const data = await response.json();
        const notifications = data.notifications || [];
        const transformedNotifications: Notification[] = notifications.map((notif: any) => ({
          _id: notif._id,
          id: notif.id || notif._id,
          message: notif.message,
          time: notif.createdAt ? new Date(notif.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : "Just now",
          read: notif.read || false,
          createdAt: notif.createdAt
        }));
        setNotifications(transformedNotifications.slice(0, 5));
      } else {
        setNotifications([]);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
      setNotifications([]);
    }
  };

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  const handleMarkNotificationRead = async (notificationId: string) => {
    try {
      await fetch(`/api/customer/notifications/${notificationId}/read`, { method: 'PUT' });
      setNotifications(notifications.map(n => 
        n.id === notificationId ? { ...n, read: true } : n
      ));
    } catch (error) {
      console.error('Error marking notification read:', error);
    }
  };

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50">
        <motion.div
          animate={{ 
            rotate: 360,
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="relative"
        >
          <div className="w-16 h-16 border-4 border-violet-200 border-t-violet-600 rounded-full" />
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 blur-xl"
            animate={{
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          />
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 relative overflow-hidden">
      <FloatingParticles />
      
      <div className="fixed inset-0 pointer-events-none">
        <svg className="absolute inset-0 w-full h-full">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(168, 85, 247, 0.05)" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>

      {/* Header  */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white/70 backdrop-blur-xl border-b border-white/20 sticky top-0 z-50 shadow-lg shadow-violet-500/5"
      >
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              {/* Mobile Menu Button */}
              <motion.button
                whileHover={{ scale: 1.1, rotate: 90 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-lg hover:shadow-xl transition-shadow"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>

              <Link href="/" className="flex items-center space-x-2 group">
                <motion.div
                  whileHover={{ rotate: 360, scale: 1.1 }}
                  transition={{ duration: 0.5 }}
                  className="w-10 h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all"
                >
                  <span className="text-white font-bold text-lg">AQ</span>
                </motion.div>
                <motion.span 
                  className="font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent hidden sm:block tracking-tight"
                  animate={{
                    backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                  }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  style={{
                    backgroundSize: '200% 200%',
                  }}
                >
                  A&Q Master Pro
                </motion.span>
              </Link>
            </div>

            <div className="flex items-center space-x-3">
              {/* Theme Toggle */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={() => setIsDarkMode(!isDarkMode)}
                  className="relative hover:bg-violet-100 rounded-full w-10 h-10 p-0"
                >
                  <motion.div
                    animate={{ rotate: isDarkMode ? 180 : 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    {isDarkMode ? (
                      <Moon className="h-5 w-5 text-violet-600" />
                    ) : (
                      <Sun className="h-5 w-5 text-amber-500" />
                    )}
                  </motion.div>
                </Button>
              </motion.div>

              {/* Notifications */}
              <motion.div
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <Button variant="ghost" size="sm" className="relative hover:bg-violet-100 rounded-full w-10 h-10 p-0">
                  <Bell className="h-5 w-5 text-violet-600" />
                  <AnimatePresence>
                    {notifications.filter(n => !n.read).length > 0 && (
                      <motion.span
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        className="absolute top-1 right-1 w-2.5 h-2.5 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full ring-2 ring-white"
                      />
                    )}
                  </AnimatePresence>
                </Button>
              </motion.div>

              {/* User Menu with Logout */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-300 group"
                  >
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-75 group-hover:opacity-100 blur-sm transition-opacity" />
                    <Avatar className="relative h-10 w-10 border-2 border-white shadow-xl">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white">
                        {customer.name ? customer.name.split(' ').map(n => n[0]).join('') : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </motion.button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2 border-violet-100" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-gray-900">{customer.name || "Customer"}</p>
                      <p className="text-xs text-violet-600">{customer.email || session?.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/customer/profile" className="cursor-pointer text-gray-700 hover:text-violet-600 hover:bg-violet-50">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/customer/settings" className="cursor-pointer text-gray-700 hover:text-violet-600 hover:bg-violet-50">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="cursor-pointer text-rose-600 hover:text-rose-700 hover:bg-rose-50"
                    onClick={handleLogout}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          {/* Mobile Menu */}
          <AnimatePresence>
            {mobileMenuOpen && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden mt-4 pt-4 border-t border-violet-100"
              >
                <div className="flex flex-col space-y-2">
                  <MobileNavLink href="/" icon={Home} label="Home" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/kiosk" icon={Ticket} label="Get Ticket" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/customer/history" icon={History} label="History" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/customer/payments" icon={CreditCard} label="Payments" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/customer/settings" icon={Settings} label="Settings" onClick={() => setMobileMenuOpen(false)} />
                  <motion.button
                    whileHover={{ x: 10 }}
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="font-medium">Logout</span>
                  </motion.button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-8 max-w-6xl relative">
        {/* Welcome Banner  */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            transform: `translateX(${mousePosition.x}px) translateY(${mousePosition.y}px)`,
          }}
          className="mb-8"
        >
          <GradientBorderCard>
            <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-8">
              <div className="flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center space-x-4">
                  <motion.div
                    animate={{ 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, -10, 0],
                    }}
                    transition={{ duration: 4, repeat: Infinity }}
                    className="w-16 h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-xl"
                  >
                    <Sparkles className="h-8 w-8 text-white" />
                  </motion.div>
                  <div>
                    <GlowingText>
                      <h1 className="text-3xl font-light text-gray-800 mb-1">
                        {greeting}, <span className="font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                          {customer.name ? customer.name.split(' ')[0] : "Guest"}
                        </span>
                      </h1>
                    </GlowingText>
                    <p className="text-gray-600">Ready for your next appointment?</p>
                  </div>
                </div>
                <Link href="/kiosk" className="mt-4 md:mt-0">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700 px-8 py-6 rounded-xl shadow-lg hover:shadow-xl transition-all">
                      <Ticket className="h-5 w-5 mr-2" />
                      Get New Ticket
                      <motion.div
                        animate={{ x: [0, 5, 0] }}
                        transition={{ duration: 1, repeat: Infinity }}
                      >
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </motion.div>
                    </Button>
                  </motion.div>
                </Link>
              </div>
            </div>
          </GradientBorderCard>
        </motion.div>

        {/* Active Ticket Section */}
        <AnimatePresence>
          {activeTicket && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="mb-8"
            >
              <Card className="border-0 shadow-xl bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900 text-white overflow-hidden relative">
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-violet-600/20 to-fuchsia-600/20"
                  animate={{
                    x: ['-100%', '100%'],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
                <CardHeader>
                  <CardTitle className="flex items-center text-white/90">
                    <motion.div
                      animate={{ rotate: [0, 360] }}
                      transition={{ duration: 2, repeat: Infinity }}
                    >
                      <Activity className="h-5 w-5 mr-2" />
                    </motion.div>
                    Your Active Ticket
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col md:flex-row items-center justify-between relative z-10">
                    <div className="flex items-center space-x-8">
                      <div className="text-center">
                        <p className="text-sm text-white/60 mb-1">Ticket Number</p>
                        <motion.p 
                          animate={{ 
                            scale: [1, 1.1, 1],
                            textShadow: [
                              "0 0 20px rgba(255,255,255,0)",
                              "0 0 40px rgba(255,255,255,0.5)",
                              "0 0 20px rgba(255,255,255,0)",
                            ]
                          }}
                          transition={{ duration: 2, repeat: Infinity }}
                          className="text-5xl font-light tracking-wider"
                        >
                          {activeTicket.number || activeTicket.ticketNumber}
                        </motion.p>
                      </div>
                      <div className="h-12 w-px bg-white/20 hidden md:block" />
                      <div>
                        <p className="text-sm text-white/60 mb-1">Service</p>
                        <p className="text-xl font-medium">{activeTicket.service}</p>
                        <Badge className="mt-2 bg-white/20 text-white border-0 backdrop-blur-sm">
                          <motion.span
                            animate={{ opacity: [1, 0.5, 1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                          >
                            {activeTicket.status === "waiting" ? "Waiting" : 
                             activeTicket.status === "calling" ? "Calling" : 
                             activeTicket.status === "serving" ? "Being Served" : activeTicket.status}
                          </motion.span>
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-6 mt-6 md:mt-0">
                      <div className="text-center">
                        <p className="text-sm text-white/60">Position</p>
                        <p className="text-3xl font-light text-white">{activeTicket.queuePosition}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-sm text-white/60">Est. Wait</p>
                        <p className="text-3xl font-light text-white">{activeTicket.estimatedWait} min</p>
                      </div>
                      <motion.div
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.5 }}
                      >
                        <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 backdrop-blur-sm">
                          <QrCode className="h-4 w-4 mr-2" />
                          Show QR
                        </Button>
                      </motion.div>
                    </div>
                  </div>
                  <motion.div 
                    className="mt-6 p-4 bg-white/10 backdrop-blur-sm rounded-xl"
                    animate={{
                      backgroundColor: ["rgba(255,255,255,0.1)", "rgba(255,255,255,0.15)", "rgba(255,255,255,0.1)"],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                    }}
                  >
                    <p className="text-sm text-white/90 flex items-center">
                      <motion.div
                        animate={{ rotate: [0, 360] }}
                        transition={{ duration: 3, repeat: Infinity }}
                      >
                        <Clock3 className="h-4 w-4 mr-2" />
                      </motion.div>
                      You'll be notified when it's your turn
                    </p>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-md mx-auto mb-8 bg-white/50 backdrop-blur-sm p-1 rounded-2xl border border-violet-100">
            <TabsTrigger 
              value="overview" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white transition-all duration-300"
            >
              Overview
            </TabsTrigger>
            <TabsTrigger 
              value="history" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white transition-all duration-300"
            >
              History
            </TabsTrigger>
            <TabsTrigger 
              value="profile" 
              className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white transition-all duration-300"
            >
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Stats Cards */}
              <StatCard
                label="Total Visits"
                value={customer.visits}
                sublabel="Lifetime visits"
                icon={Calendar}
                delay={0.1}
                color="from-violet-500 to-violet-600"
              />

              <StatCard
                label="Loyalty Points"
                value={customer.points}
                sublabel={customer.nextTier ? `${customer.pointsToNext} points to ${customer.nextTier}` : "No tier yet"}
                icon={Award}
                delay={0.2}
                progress={customer.points && customer.pointsToNext ? (customer.points / (customer.points + customer.pointsToNext)) * 100 : 0}
                color="from-fuchsia-500 to-fuchsia-600"
              />

              <StatCard
                label="Member Since"
                value={customer.memberSince || "—"}
                sublabel={customer.tier ? `${customer.tier} member` : "Member"}
                icon={Crown}
                delay={0.3}
                color="from-pink-500 to-pink-600"
              />

              {/* Quick Actions */}
              <Card className="md:col-span-3 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <QuickActionButton
                      href="/kiosk"
                      icon={Calendar}
                      label="Book Appointment"
                      color="from-violet-500 to-fuchsia-500"
                    />
                    <QuickActionButton
                      href="/customer/history"
                      icon={History}
                      label="View History"
                      color="from-fuchsia-500 to-pink-500"
                    />
                    <QuickActionButton
                      href="/customer/payments"
                      icon={CreditCard}
                      label="Payments"
                      color="from-pink-500 to-rose-500"
                    />
                    <QuickActionButton
                      href="/customer/settings"
                      icon={Settings}
                      label="Settings"
                      color="from-rose-500 to-orange-500"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-0 shadow-xl bg-white/80 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-lg font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Recent Appointments
                </CardTitle>
                <CardDescription>Your appointment history and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {recentAppointments.length > 0 ? (
                    recentAppointments.map((apt, index) => (
                      <HistoryItem key={apt.id} appointment={apt} index={index} />
                    ))
                  ) : (
                    <EmptyState icon={History} message="No appointments yet" />
                  )}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="md:col-span-1 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <ProfileInfoRow icon={User} label="Full Name" value={customer.name} />
                  <ProfileInfoRow icon={Mail} label="Email" value={customer.email} />
                  <ProfileInfoRow icon={Phone} label="Phone" value={customer.phone} />
                  {customer.tier && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 }}
                    >
                      <p className="text-xs text-gray-500 mb-1">Member Tier</p>
                      <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-0 shadow-lg">
                        <Crown className="h-3 w-3 mr-1" />
                        {customer.tier}
                      </Badge>
                    </motion.div>
                  )}
                  <div className="pt-4">
                    <motion.div
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Button 
                        variant="outline" 
                        className="w-full text-rose-600 border-rose-200 hover:bg-rose-50 hover:border-rose-300 transition-all"
                        onClick={handleLogout}
                      >
                        <LogOut className="h-4 w-4 mr-2" />
                        Sign Out
                      </Button>
                    </motion.div>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <PreferenceRow
                    label="SMS Notifications"
                    description="Receive queue updates via SMS"
                    defaultChecked={false}
                  />
                  <PreferenceRow
                    label="Email Notifications"
                    description="Receive appointment reminders"
                    defaultChecked={false}
                  />
                  <PreferenceRow
                    label="WhatsApp Updates"
                    description="Get ticket notifications on WhatsApp"
                    defaultChecked={false}
                  />
                  <PreferenceRow
                    label="Marketing Emails"
                    description="Receive offers and promotions"
                    defaultChecked={false}
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper Components (same as before, but ensure they use real data)
function MobileNavLink({ href, icon: Icon, label, onClick }: any) {
  return (
    <Link href={href} onClick={onClick}>
      <motion.div
        whileHover={{ x: 10 }}
        className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 rounded-xl transition-all"
      >
        <Icon className="h-5 w-5 mr-3 text-violet-600" />
        <span className="font-medium">{label}</span>
      </motion.div>
    </Link>
  );
}

function StatCard({ label, value, sublabel, icon: Icon, delay, progress, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -5 }}
    >
      <Card className="border-0 shadow-xl hover:shadow-2xl transition-all bg-white/80 backdrop-blur-sm overflow-hidden relative">
        <motion.div
          className={`absolute inset-0 bg-gradient-to-r ${color} opacity-0 hover:opacity-5 transition-opacity`}
          animate={{
            scale: [1, 1.02, 1],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
          }}
        />
        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-3">
            <div>
              <p className="text-sm text-gray-500 mb-1">{label}</p>
              <p className="text-3xl font-light text-gray-900">{value.toLocaleString()}</p>
            </div>
            <motion.div 
              className={`w-10 h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-lg`}
              animate={{
                rotate: [0, 10, -10, 0],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
              }}
            >
              <Icon className="h-5 w-5 text-white" />
            </motion.div>
          </div>
          {progress !== undefined && progress > 0 && (
            <div className="mt-3">
              <Progress value={progress} className="h-1.5 bg-gray-100" />
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">{sublabel}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuickActionButton({ href, icon: Icon, label, color }: any) {
  return (
    <Link href={href}>
      <motion.div
        whileHover={{ scale: 1.05, y: -5 }}
        whileTap={{ scale: 0.95 }}
      >
        <Button 
          variant="outline" 
          className="w-full h-auto py-6 flex flex-col items-center border-gray-200 hover:border-transparent bg-white/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 transition-all group"
        >
          <motion.div
            animate={{
              y: [0, -3, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
            }}
          >
            <Icon className={`h-6 w-6 mb-2 text-gray-700 group-hover:text-violet-600 transition-colors`} />
          </motion.div>
          <span className="text-sm font-medium text-gray-700 group-hover:text-violet-600 transition-colors">{label}</span>
        </Button>
      </motion.div>
    </Link>
  );
}

function HistoryItem({ appointment, index }: HistoryItemProps) {
  const statusColors: Record<Appointment['status'], string> = {
    completed: "from-green-500 to-emerald-500",
    cancelled: "from-rose-500 to-pink-500",
    pending: "from-amber-500 to-orange-500",
    waiting: "from-blue-500 to-cyan-500" 
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: i * 0.1 }}
          >
            <Star
              className={`h-4 w-4 ${
                i < rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
              }`}
            />
          </motion.div>
        ))}
      </div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.05 }}
      whileHover={{ scale: 1.02, x: 10 }}
      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-violet-50/30 rounded-xl hover:from-violet-50 hover:to-fuchsia-50 transition-all cursor-pointer border border-transparent hover:border-violet-200"
    >
      <div>
        <p className="font-medium text-gray-900">{appointment.service}</p>
        <p className="text-sm text-gray-500">{appointment.date}</p>
      </div>
      <div className="flex items-center space-x-4">
        <Badge className={`bg-gradient-to-r ${statusColors[appointment.status]} text-white border-0 shadow-md`}>
          {appointment.status}
        </Badge>
        
        {typeof appointment.rating === 'number' && renderStars(appointment.rating)}
        
        <motion.div
          animate={{ x: [0, 5, 0] }}
          transition={{ duration: 1, repeat: Infinity }}
        >
          <ChevronRight className="h-4 w-4 text-violet-400" />
        </motion.div>
      </div>
    </motion.div>
  );
}

function ProfileInfoRow({ icon: Icon, label, value }: any) {
  return (
    <motion.div
      whileHover={{ x: 5 }}
    >
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-center p-2 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-lg">
        <Icon className="h-4 w-4 text-violet-600 mr-2" />
        <p className="text-sm font-medium text-gray-900">{value || "—"}</p>
      </div>
    </motion.div>
  );
}

function PreferenceRow({ label, description, defaultChecked }: any) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, x: 5 }}
      className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-violet-50/30 rounded-xl hover:from-violet-50 hover:to-fuchsia-50 transition-all border border-transparent hover:border-violet-200"
    >
      <div>
        <p className="font-medium text-gray-900">{label}</p>
        <p className="text-sm text-gray-500">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </motion.div>
  );
}

function EmptyState({ icon: Icon, message }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
        }}
      >
        <Icon className="h-12 w-12 text-violet-300 mx-auto mb-3" />
      </motion.div>
      <p className="text-gray-500">{message}</p>
    </motion.div>
  );
}