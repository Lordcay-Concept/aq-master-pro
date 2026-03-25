"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useSession } from "next-auth/react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const { data: session } = useSession();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    if (session?.user?.role) {
      const savedTheme = localStorage.getItem(`theme-${session.user.role}`);
      if (savedTheme) {
        setTheme(savedTheme);
      }
    }
  }, [session, setTheme]);

  const handleThemeChange = (checked: boolean) => {
    const newTheme = checked ? "dark" : "light";
    setTheme(newTheme);
    
    if (session?.user?.role) {
      localStorage.setItem(`theme-${session.user.role}`, newTheme);
    }
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-800 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
      <div className="flex items-center space-x-3">
        {theme === "dark" ? (
          <Moon className="h-5 w-5 text-blue-600" />
        ) : (
          <Sun className="h-5 w-5 text-yellow-500" />
        )}
        <div>
          <p className="font-medium dark:text-white">Dark Mode</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            Switch between light and dark theme
          </p>
        </div>
      </div>
      <Switch
        checked={theme === "dark"}
        onCheckedChange={handleThemeChange}
      />
    </div>
  );
}