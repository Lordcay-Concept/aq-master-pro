"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Link from "next/link";
import { 
  LayoutDashboard, Users, Calendar, BarChart3, 
  Settings, Clock, CreditCard, FileText, 
  Bell, LogOut, Menu, X, Shield, Activity,
  TrendingUp, UserCheck, Smartphone, Globe, Home
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    document.documentElement.classList.remove('dark');
    document.documentElement.style.colorScheme = 'light';
  }, []);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    } else if (session?.user?.role !== "admin") {
      router.push("/unauthorized");
    }
  }, [status, session, router]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  const navigation = [
    { name: "Overview", href: "/admin", icon: LayoutDashboard },
    { name: "Queue Monitor", href: "/admin/queue", icon: Activity },
    { name: "Staff Management", href: "/admin/staff", icon: Users },
    { name: "Service Management", href: "/admin/services", icon: Settings },
    { name: "Appointments", href: "/admin/appointments", icon: Calendar },
    { name: "Customers", href: "/admin/customers", icon: UserCheck },
    { name: "Analytics & Reports", href: "/admin/analytics", icon: BarChart3 },
    { name: "Payments", href: "/admin/payments", icon: CreditCard },
    { name: "System Settings", href: "/admin/settings", icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white border-b border-gray-200 fixed w-full z-30 top-0">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">


              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="p-2 rounded-lg hover:bg-gray-100 mr-4 focus:outline-none transition-colors"
                aria-label="Toggle menu"
              >
                {sidebarOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
              
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                A&Q Master Pro Admin
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="h-5 w-5" />
                <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full" />
              </Button>
              <div className="flex items-center space-x-3">
                <div className="hidden md:block text-right">
                  <div className="text-sm font-medium text-gray-900">{session?.user?.name}</div>
                  <div className="text-xs text-gray-500">Administrator</div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => signOut({ callbackUrl: "/" })}
                >
                  <LogOut className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {sidebarOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black/50 z-40"
            onClick={() => setSidebarOpen(false)}
          />
          
          {/* Sidebar */}
          <aside className="fixed inset-y-0 left-0 w-64 bg-white z-50 overflow-y-auto shadow-xl">
            <div className="pt-16 px-4">
              <div className="mb-6 px-4">
                <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  A&Q Master Pro Admin
                </span>
              </div>
              <nav className="space-y-1">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <item.icon className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-600" />
                    <span className="text-sm font-medium">{item.name}</span>
                  </Link>
                ))}
                
                <Link
                  href="/admin"
                  className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-blue-50 hover:text-blue-600 transition-colors group mt-4 pt-4 border-t"
                  onClick={() => setSidebarOpen(false)}
                >
                  <LayoutDashboard className="h-5 w-5 mr-3 text-gray-400 group-hover:text-blue-600" />
                  <span className="text-sm font-medium">Back to Dashboard</span>
                </Link>
              </nav>

              <div className="mt-8 p-4 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white mx-4">
                <div className="flex items-center mb-2">
                  <Shield className="h-5 w-5 mr-2" />
                  <span className="text-sm font-semibold">System Status</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span>Queue System</span>
                  <span className="text-green-300">● Online</span>
                </div>
                <div className="flex items-center justify-between text-xs mt-1">
                  <span>Database</span>
                  <span className="text-green-300">● Connected</span>
                </div>
              </div>
            </div>
          </aside>
        </>
      )}

      <main className={`pt-16 transition-all duration-300 ${sidebarOpen ? 'overflow-hidden' : ''}`}>
        <div className="p-4 sm:p-8">
          {children}
        </div>
      </main>
    </div>
  );
}