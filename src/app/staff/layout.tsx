"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  LayoutDashboard, Users, Calendar, Clock, 
  LogOut, Menu, X, Home, History, UserCog, 
  Ticket, Settings, ChevronLeft, ChevronRight,
  Bell, BadgeCheck, ChevronDown
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { signOut } from "next-auth/react";

export default function StaffLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "staff") {
      router.push("/unauthorized");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-600 border-t-transparent" />
      </div>
    );
  }

  const navigation = [
    { name: "Dashboard", href: "/staff/dashboard", icon: LayoutDashboard, color: "from-blue-500 to-blue-600" },
    { name: "Queue", href: "/staff/queue", icon: Ticket, color: "from-orange-500 to-red-500" },
    { name: "History", href: "/staff/history", icon: History, color: "from-purple-500 to-pink-500" },
    { name: "Customers", href: "/staff/customers", icon: Users, color: "from-green-500 to-emerald-500" },
    { name: "Schedule", href: "/staff/schedule", icon: Calendar, color: "from-indigo-500 to-blue-500" },
    { name: "Profile", href: "/staff/profile", icon: UserCog, color: "from-teal-500 to-cyan-500" },
  ];

  const handleLogout = async () => {
    await signOut({ callbackUrl: "/" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="bg-white/80 backdrop-blur-md border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              {/* Hamburger Menu Button  */}
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 mr-4 transition-colors hidden lg:block"
                aria-label="Toggle sidebar"
              >
                {sidebarOpen ? <ChevronLeft className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </button>

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 mr-4"
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              
              <Link href="/" className="flex items-center space-x-2">
                <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-white font-bold text-lg">AQ</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-bold text-gray-900 leading-tight">Staff Portal</span>
                  <span className="text-xs text-gray-500">Counter {session?.user?.counter || 1}</span>
                </div>
              </Link>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="icon" className="relative hover:bg-gray-100 rounded-full">
                <Bell className="h-5 w-5 text-gray-600" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
              </Button>

              {/* User Profile */}
              <div className="flex items-center space-x-3 px-3 py-1.5 rounded-full bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-100">
                <Avatar className="h-8 w-8 ring-2 ring-white">
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-sm">
                    {session?.user?.name?.split(' ').map(n => n[0]).join('') || "ST"}
                  </AvatarFallback>
                </Avatar>
                <div className="hidden md:block">
                  <p className="text-sm font-semibold text-gray-900">{session?.user?.name}</p>
                  <p className="text-xs text-blue-600 font-medium">Staff • Online</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <AnimatePresence>
          {mobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden bg-white border-b border-gray-200 shadow-lg"
            >
              <div className="px-4 py-3 space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 transition-all"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className={`w-8 h-8 bg-gradient-to-r ${item.color} rounded-lg flex items-center justify-center mr-3 shadow-sm`}>
                      <item.icon className="h-4 w-4 text-white" />
                    </div>
                    <span className="font-medium">{item.name}</span>
                  </Link>
                ))}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 transition-all mt-2"
                >
                  <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center mr-3">
                    <LogOut className="h-4 w-4 text-red-600" />
                  </div>
                  <span className="font-medium">Logout</span>
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Sidebar - Desktop Only */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", damping: 20 }}
            className="hidden lg:block fixed inset-y-0 left-0 w-72 bg-white/80 backdrop-blur-md border-r border-gray-200 pt-20 shadow-xl z-20"
          >
            <div className="h-full flex flex-col">
              {/* User Status Card */}
              <div className="px-6 py-4 mx-4 mt-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl text-white shadow-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Avatar className="h-12 w-12 border-2 border-white/50">
                    <AvatarFallback className="bg-white/20 text-white">
                      {session?.user?.name?.split(' ').map(n => n[0]).join('') || "ST"}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{session?.user?.name}</p>
                    <div className="flex items-center space-x-1 text-xs text-blue-100">
                      <BadgeCheck className="h-3 w-3" />
                      <span>Staff Member</span>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div className="bg-white/20 rounded-lg py-1">
                    <p className="font-bold">Counter</p>
                    <p className="text-lg font-bold">{session?.user?.counter || 1}</p>
                  </div>
                  <div className="bg-white/20 rounded-lg py-1">
                    <p className="font-bold">Status</p>
                    <p className="text-green-300 font-bold">● Online</p>
                  </div>
                </div>
              </div>

              {/* Navigation */}
              <nav className="flex-1 px-4 py-6 space-y-1 overflow-y-auto">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-xl hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 group transition-all"
                  >
                    <div className={`w-10 h-10 bg-gradient-to-r ${item.color} rounded-xl flex items-center justify-center mr-3 shadow-md group-hover:scale-110 transition-transform`}>
                      <item.icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <span className="font-medium text-gray-900">{item.name}</span>
                      <p className="text-xs text-gray-400">Manage your {item.name.toLowerCase()}</p>
                    </div>
                  </Link>
                ))}
              </nav>

              {/* Logout Button */}
              <div className="px-4 pb-6">
                <button
                  onClick={handleLogout}
                  className="flex items-center w-full px-4 py-3 text-red-600 rounded-xl hover:bg-red-50 group transition-all"
                >
                  <div className="w-10 h-10 bg-red-100 rounded-xl flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                    <LogOut className="h-5 w-5 text-red-600" />
                  </div>
                  <div className="text-left">
                    <span className="font-medium text-gray-900">Logout</span>
                    <p className="text-xs text-gray-400">End your session</p>
                  </div>
                </button>

                {/* Back to Home */}
                <Link
                  href="/"
                  className="flex items-center px-4 py-3 text-gray-500 rounded-xl hover:bg-gray-50 mt-2"
                >
                  <Home className="h-5 w-5 mr-3" />
                  <span className="text-sm">Back to Homepage</span>
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content - Adjusts with sidebar */}
      <main className={`transition-all duration-300 ${sidebarOpen ? 'lg:pl-72' : 'lg:pl-20'} pt-16`}>
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
}