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

function DecorativeBlobs() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
    </div>
  );
}

function GlowingText({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`relative ${className}`}>
      {children}
    </span>
  );
}

function GradientBorderCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`relative rounded-2xl bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500 p-[2px] ${className}`}
    >
      <div className="bg-white rounded-2xl h-full w-full">
        {children}
      </div>
    </div>
  );
}

export default function CustomerDashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [activeTab, setActiveTab] = useState("overview");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [greeting, setGreeting] = useState("");
  const [isDarkMode, setIsDarkMode] = useState(false);
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

  if (status === "loading" || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-12 h-12 border-4 border-violet-200 border-t-violet-600 rounded-full"
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-fuchsia-50 to-pink-50 relative">
      <DecorativeBlobs />

      <div className="fixed inset-0 pointer-events-none opacity-[0.02]">
        <div className="h-full w-full bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
      </div>

      {/* Header */}
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", damping: 20 }}
        className="bg-white/80 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 shadow-sm"
      >
        <div className="container mx-auto px-4 py-3 sm:py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-gradient-to-r from-violet-500 to-fuchsia-500 text-white shadow-md"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </motion.button>

              <Link href="/" className="flex items-center space-x-2 group">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-md">
                  <span className="text-white font-bold text-sm sm:text-lg">AQ</span>
                </div>
                <span className="font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent hidden sm:block text-sm sm:text-base">
                  A&Q Master Pro
                </span>
              </Link>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              {/* Theme Toggle */}
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 hover:bg-violet-100"
              >
                {isDarkMode ? (
                  <Moon className="h-4 w-4 sm:h-5 sm:w-5 text-violet-600" />
                ) : (
                  <Sun className="h-4 w-4 sm:h-5 sm:w-5 text-amber-500" />
                )}
              </Button>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative rounded-full w-8 h-8 sm:w-10 sm:h-10 p-0 hover:bg-violet-100">
                <Bell className="h-4 w-4 sm:h-5 sm:w-5 text-violet-600" />
                {notifications.filter(n => !n.read).length > 0 && (
                  <span className="absolute top-1 right-1 w-2 h-2 bg-gradient-to-r from-fuchsia-500 to-pink-500 rounded-full ring-2 ring-white" />
                )}
              </Button>

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button className="relative h-8 w-8 sm:h-10 sm:w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-violet-300">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-600 opacity-75 blur-[2px]" />
                    <Avatar className="relative h-8 w-8 sm:h-10 sm:w-10 border-2 border-white shadow-md">
                      <AvatarFallback className="bg-gradient-to-br from-violet-500 to-fuchsia-500 text-white text-xs sm:text-sm">
                        {customer.name ? customer.name.split(' ').map(n => n[0]).join('') : "U"}
                      </AvatarFallback>
                    </Avatar>
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2" align="end">
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-gray-900">{customer.name || "Customer"}</p>
                      <p className="text-xs text-violet-600">{customer.email || session?.user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link href="/customer/profile">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link href="/customer/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={handleLogout} className="text-rose-600 focus:text-rose-600 focus:bg-rose-50">
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
                className="lg:hidden mt-3 pt-3 border-t border-gray-100"
              >
                <div className="flex flex-col space-y-1">
                  <MobileNavLink href="/" icon={Home} label="Home" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/kiosk" icon={Ticket} label="Get Ticket" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/customer/history" icon={History} label="History" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/customer/payments" icon={CreditCard} label="Payments" onClick={() => setMobileMenuOpen(false)} />
                  <MobileNavLink href="/customer/settings" icon={Settings} label="Settings" onClick={() => setMobileMenuOpen(false)} />
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="flex items-center px-4 py-3 text-rose-600 hover:bg-rose-50 rounded-xl transition-colors"
                  >
                    <LogOut className="h-5 w-5 mr-3" />
                    <span className="font-medium">Logout</span>
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.header>

      <div className="container mx-auto px-4 py-6 sm:py-8 max-w-6xl">
        {/* Welcome Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 sm:mb-8"
        >
          <GradientBorderCard>
            <div className="bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-2xl p-5 sm:p-8">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex items-center space-x-3 sm:space-x-4">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br from-violet-500 to-fuchsia-500 rounded-2xl flex items-center justify-center shadow-lg">
                    <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl sm:text-3xl font-light text-gray-800 mb-0.5">
                      {greeting}, <span className="font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                        {customer.name ? customer.name.split(' ')[0] : "Guest"}
                      </span>
                    </h1>
                    <p className="text-sm sm:text-base text-gray-600">Ready for your next appointment?</p>
                  </div>
                </div>
                <Link href="/kiosk">
                  <Button className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:from-violet-700 hover:to-fuchsia-700 px-5 sm:px-8 py-4 sm:py-6 rounded-xl shadow-md whitespace-nowrap text-sm sm:text-base">
                    <Ticket className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Get New Ticket
                    <ArrowRight className="h-3 w-3 sm:h-4 sm:w-4 ml-2" />
                  </Button>
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
              className="mb-6 sm:mb-8"
            >
              <Card className="border-0 shadow-lg bg-gradient-to-br from-violet-900 via-fuchsia-900 to-pink-900 text-white overflow-hidden">
                <CardHeader className="pb-2 sm:pb-4">
                  <CardTitle className="flex items-center text-base sm:text-lg text-white/90">
                    <Activity className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                    Your Active Ticket
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                    <div className="flex items-center space-x-4 sm:space-x-8">
                      <div className="text-center">
                        <p className="text-xs text-white/60 mb-1">Ticket Number</p>
                        <p className="text-3xl sm:text-5xl font-light tracking-wider">
                          {activeTicket.number || activeTicket.ticketNumber}
                        </p>
                      </div>
                      <div className="h-8 w-px bg-white/20 hidden sm:block" />
                      <div>
                        <p className="text-xs text-white/60 mb-1">Service</p>
                        <p className="text-base sm:text-xl font-medium">{activeTicket.service}</p>
                        <Badge className="mt-1 sm:mt-2 bg-white/20 text-white border-0 text-xs">
                          {activeTicket.status === "waiting" ? "Waiting" : 
                           activeTicket.status === "calling" ? "Calling" : 
                           activeTicket.status === "serving" ? "Being Served" : activeTicket.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4 sm:space-x-6">
                      <div className="text-center">
                        <p className="text-xs text-white/60">Position</p>
                        <p className="text-2xl sm:text-3xl font-light">{activeTicket.queuePosition}</p>
                      </div>
                      <div className="text-center">
                        <p className="text-xs text-white/60">Est. Wait</p>
                        <p className="text-2xl sm:text-3xl font-light">{activeTicket.estimatedWait} min</p>
                      </div>
                      <Button variant="outline" size="sm" className="border-white/30 text-white hover:bg-white/10 text-xs sm:text-sm">
                        <QrCode className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
                        Show QR
                      </Button>
                    </div>
                  </div>
                  <div className="mt-4 sm:mt-6 p-3 bg-white/10 rounded-lg">
                    <p className="text-xs sm:text-sm text-white/90 flex items-center">
                      <Clock3 className="h-3 w-3 sm:h-4 sm:w-4 mr-2" />
                      You'll be notified when it's your turn
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Main Content Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-3 w-full max-w-xs mx-auto mb-6 bg-white/50 backdrop-blur-sm p-1 rounded-2xl">
            <TabsTrigger value="overview" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white text-sm">
              Overview
            </TabsTrigger>
            <TabsTrigger value="history" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white text-sm">
              History
            </TabsTrigger>
            <TabsTrigger value="profile" className="rounded-xl data-[state=active]:bg-gradient-to-r data-[state=active]:from-violet-600 data-[state=active]:to-fuchsia-600 data-[state=active]:text-white text-sm">
              Profile
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
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

              <Card className="md:col-span-3 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Quick Actions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
                    <QuickActionButton href="/kiosk" icon={Calendar} label="Book Appointment" />
                    <QuickActionButton href="/customer/history" icon={History} label="View History" />
                    <QuickActionButton href="/customer/payments" icon={CreditCard} label="Payments" />
                    <QuickActionButton href="/customer/settings" icon={Settings} label="Settings" />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="history">
            <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-base sm:text-lg font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                  Recent Appointments
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">Your appointment history and feedback</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 sm:space-y-3">
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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6">
              <Card className="md:col-span-1 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Profile Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <ProfileInfoRow icon={User} label="Full Name" value={customer.name} />
                  <ProfileInfoRow icon={Mail} label="Email" value={customer.email} />
                  <ProfileInfoRow icon={Phone} label="Phone" value={customer.phone} />
                  {customer.tier && (
                    <div>
                      <p className="text-xs text-gray-500 mb-1">Member Tier</p>
                      <Badge className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white border-0 shadow-md">
                        <Crown className="h-3 w-3 mr-1" />
                        {customer.tier}
                      </Badge>
                    </div>
                  )}
                  <div className="pt-2 sm:pt-4">
                    <Button 
                      variant="outline" 
                      className="w-full text-rose-600 border-rose-200 hover:bg-rose-50"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Sign Out
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Card className="md:col-span-2 border-0 shadow-lg bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-2">
                  <CardTitle className="text-base sm:text-lg font-medium bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 sm:space-y-4">
                  <PreferenceRow label="SMS Notifications" description="Receive queue updates via SMS" defaultChecked={false} />
                  <PreferenceRow label="Email Notifications" description="Receive appointment reminders" defaultChecked={false} />
                  <PreferenceRow label="WhatsApp Updates" description="Get ticket notifications on WhatsApp" defaultChecked={false} />
                  <PreferenceRow label="Marketing Emails" description="Receive offers and promotions" defaultChecked={false} />
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

// Helper Components 
function MobileNavLink({ href, icon: Icon, label, onClick }: any) {
  return (
    <Link href={href} onClick={onClick}>
      <div className="flex items-center px-4 py-3 text-gray-700 hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 rounded-xl transition-all">
        <Icon className="h-5 w-5 mr-3 text-violet-600" />
        <span className="font-medium">{label}</span>
      </div>
    </Link>
  );
}

function StatCard({ label, value, sublabel, icon: Icon, delay, progress, color }: any) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay }}
      whileHover={{ y: -2 }}
    >
      <Card className="border-0 shadow-lg hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm overflow-hidden">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start justify-between mb-2 sm:mb-3">
            <div>
              <p className="text-xs sm:text-sm text-gray-500 mb-1">{label}</p>
              <p className="text-2xl sm:text-3xl font-light text-gray-900">{value.toLocaleString()}</p>
            </div>
            <div className={`w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-r ${color} rounded-xl flex items-center justify-center shadow-md`}>
              <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white" />
            </div>
          </div>
          {progress !== undefined && progress > 0 && (
            <div className="mt-2 sm:mt-3">
              <Progress value={progress} className="h-1 bg-gray-100" />
            </div>
          )}
          <p className="text-xs text-gray-500 mt-2">{sublabel}</p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

function QuickActionButton({ href, icon: Icon, label }: any) {
  return (
    <Link href={href}>
      <Button 
        variant="outline" 
        className="w-full h-auto py-3 sm:py-6 flex flex-col items-center border-gray-200 hover:border-transparent bg-white/50 backdrop-blur-sm hover:bg-gradient-to-r hover:from-violet-50 hover:to-fuchsia-50 transition-all group"
      >
        <Icon className="h-5 w-5 sm:h-6 sm:w-6 mb-1 sm:mb-2 text-gray-700 group-hover:text-violet-600 transition-colors" />
        <span className="text-xs sm:text-sm font-medium text-gray-700 group-hover:text-violet-600 transition-colors">{label}</span>
      </Button>
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
          <Star key={i} className={`h-3 w-3 sm:h-4 sm:w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
        ))}
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-violet-50/30 rounded-xl hover:from-violet-50 hover:to-fuchsia-50 transition-all cursor-pointer border border-transparent hover:border-violet-200">
      <div>
        <p className="font-medium text-gray-900 text-sm sm:text-base">{appointment.service}</p>
        <p className="text-xs text-gray-500">{appointment.date}</p>
      </div>
      <div className="flex items-center space-x-2 sm:space-x-4">
        <Badge className={`bg-gradient-to-r ${statusColors[appointment.status]} text-white border-0 shadow-md text-xs`}>
          {appointment.status}
        </Badge>
        {typeof appointment.rating === 'number' && renderStars(appointment.rating)}
        <ChevronRight className="h-3 w-3 sm:h-4 sm:w-4 text-violet-400" />
      </div>
    </div>
  );
}

function ProfileInfoRow({ icon: Icon, label, value }: any) {
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <div className="flex items-center p-2 bg-gradient-to-r from-violet-50 to-fuchsia-50 rounded-lg">
        <Icon className="h-3 w-3 sm:h-4 sm:w-4 text-violet-600 mr-2" />
        <p className="text-sm font-medium text-gray-900">{value || "—"}</p>
      </div>
    </div>
  );
}

function PreferenceRow({ label, description, defaultChecked }: any) {
  return (
    <div className="flex items-center justify-between p-3 sm:p-4 bg-gradient-to-r from-gray-50 to-violet-50/30 rounded-xl hover:from-violet-50 hover:to-fuchsia-50 transition-all border border-transparent hover:border-violet-200">
      <div>
        <p className="font-medium text-gray-900 text-sm sm:text-base">{label}</p>
        <p className="text-xs text-gray-500">{description}</p>
      </div>
      <Switch defaultChecked={defaultChecked} />
    </div>
  );
}

function EmptyState({ icon: Icon, message }: any) {
  return (
    <div className="text-center py-8 sm:py-12">
      <Icon className="h-10 w-10 sm:h-12 sm:w-12 text-violet-300 mx-auto mb-3" />
      <p className="text-gray-500 text-sm sm:text-base">{message}</p>
    </div>
  );
}