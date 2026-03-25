"use client";

import { usePathname } from "next/navigation";
import Navbar from "./(marketing)/components/Navbar";
import Footer from "./(marketing)/components/Footer";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { LanguageProvider } from "@/contexts/LanguageContext";
import GlobalTranslation from "@/components/GlobalTranslation";

const noNavbarPages = [
  '/login', '/register', '/dashboard', '/dashboard/customer',
  '/admin', '/admin/staff', '/admin/services', '/admin/appointments',
  '/admin/customers', '/admin/analytics', '/admin/settings',
  '/staff', '/staff/dashboard', '/customer', '/customer/dashboard',
  '/customer/history', '/customer/profile', '/forgot-password', '/reset-password',
  '/kiosk', '/payment', '/unauthorized'
];

const noFooterPages = [
  '/login', '/register', '/dashboard', '/dashboard/customer',
  '/admin', '/admin/staff', '/admin/services', '/admin/appointments',
  '/admin/customers', '/admin/analytics', '/admin/settings',
  '/staff', '/staff/dashboard', '/customer', '/customer/dashboard',
  '/customer/history', '/customer/profile', '/forgot-password', '/reset-password',
  '/kiosk', '/payment', '/unauthorized'
];

export default function RootLayoutClient({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  const showNavbar = !noNavbarPages.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );
  
  const showFooter = !noFooterPages.some(path => 
    pathname === path || pathname.startsWith(path + '/')
  );

  if (!mounted) {
    return (
      <div className="min-h-screen flex flex-col">
        <main className="flex-grow">{children}</main>
      </div>
    );
  }

  return (
    <LanguageProvider>
      <GlobalTranslation>
        <div className={`min-h-screen flex flex-col ${theme === 'dark' ? 'dark' : ''}`}>
          {showNavbar && <Navbar />}
          <main className="flex-grow">{children}</main>
          {showFooter && <Footer />}
        </div>
      </GlobalTranslation>
    </LanguageProvider>
  );
}