"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Facebook, Twitter, Instagram, Linkedin, 
  Mail, Phone, MapPin, ArrowUp, Globe,
  Sparkles, Heart, Check
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getTranslation } from "@/lib/i18n/translations";

const languages = [
  { code: "en", name: "English", flag: "🇬🇧", native: "English" },
  { code: "yo", name: "Yorùbá", flag: "🇳🇬", native: "Yorùbá" },
  { code: "ig", name: "Igbo", flag: "🇳🇬", native: "Igbo" },
  { code: "ha", name: "Hausa", flag: "🇳🇬", native: "Hausa" },
  { code: "fr", name: "Français", flag: "🇫🇷", native: "Français" },
];

export default function Footer() {
  const [language, setLanguageState] = useState<string>("en");
  const [showScrollTop, setShowScrollTop] = useState(false);

  // Get language from localStorage on mount and listen for changes
  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && ["en", "fr", "yo", "ig", "ha"].includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    }

    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem("language");
      if (newLanguage && ["en", "fr", "yo", "ig", "ha"].includes(newLanguage)) {
        setLanguageState(newLanguage);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  // Translation function using localStorage language
  const t = (key: string): string => {
    return getTranslation(language as any, key);
  };

  const handleSetLanguage = (lang: string) => {
    setLanguageState(lang);
    localStorage.setItem("language", lang);
    window.location.reload();
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 600);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ 
      top: 0, 
      behavior: "smooth" 
    });
  };

  const currentLanguage = languages.find(l => l.code === language) || languages[0];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-footer-pattern opacity-30" />
      
      {/* Floating Orbs */}
      <motion.div
        animate={{ 
          y: [0, 20, 0],
          x: [0, 10, 0],
        }}
        transition={{ 
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute top-20 left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"
      />
      <motion.div
        animate={{ 
          y: [0, -20, 0],
          x: [0, -10, 0],
        }}
        transition={{ 
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="absolute bottom-20 right-20 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl"
      />

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            whileHover={{ scale: 1.1 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 z-50 bg-gradient-to-r from-blue-500 to-purple-500 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 group"
            aria-label="Scroll to top"
          >
            <ArrowUp className="h-6 w-6 group-hover:animate-bounce" />
          </motion.button>
        )}
      </AnimatePresence>

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-6">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center">
                <Sparkles className="h-6 w-6 text-white" />
              </div>
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                A&Q Master Pro
              </span>
            </div>
            <p className="text-gray-300 mb-6">
              {t('footer.description')}
            </p>
            <div className="flex space-x-4">
              {[
                { icon: Facebook, href: "#", color: "hover:bg-blue-600" },
                { icon: Twitter, href: "#", color: "hover:bg-sky-500" },
                { icon: Instagram, href: "#", color: "hover:bg-pink-600" },
                { icon: Linkedin, href: "#", color: "hover:bg-blue-700" },
              ].map((social, index) => (
                <motion.a
                  key={index}
                  whileHover={{ scale: 1.1, y: -2 }}
                  href={social.href}
                  className={`w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center hover:bg-gradient-to-r hover:from-blue-500 hover:to-purple-500 transition-all duration-300`}
                >
                  <social.icon className="h-5 w-5 text-white" />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('footer.quickLinks')}
            </h4>
            <ul className="space-y-3">
              {[
                { name: "home", href: "/" },
                { name: "solutions", href: "/solutions" },
                { name: "industries", href: "/industries" },
                { name: "pricing", href: "/pricing" },
              ].map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0 group-hover:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-0 group-hover:mr-2 transition-all duration-300" />
                    {t(`footer.${item.name}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Our Services */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('footer.services')}
            </h4>
            <ul className="space-y-3">
              {[
                "Queue Management",
                "Appointment Booking",
                "Payment Processing",
                "Analytics & Reports",
                "Staff Management",
                "API Integration"
              ].map((item) => (
                <li key={item}>
                  <Link
                    href={`/solutions/${item.toLowerCase().replace(/\s+/g, '-')}`}
                    className="text-gray-300 hover:text-transparent hover:bg-clip-text hover:bg-gradient-to-r hover:from-blue-400 hover:to-purple-400 transition-all duration-300 flex items-center group"
                  >
                    <span className="w-0 group-hover:w-2 h-0 group-hover:h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full mr-0 group-hover:mr-2 transition-all duration-300" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info & Language Switcher */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h4 className="text-lg font-semibold mb-6 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t('footer.contact')}
            </h4>
            <ul className="space-y-4 mb-6">
              <li className="flex items-center text-gray-300 group hover:text-white transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <MapPin className="h-5 w-5 text-white" />
                </div>
                <span>Abuja, Nigeria</span>
              </li>
              <li className="flex items-center text-gray-300 group hover:text-white transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <Phone className="h-5 w-5 text-white" />
                </div>
                <span>+234 123 456 7890</span>
              </li>
              <li className="flex items-center text-gray-300 group hover:text-white transition-colors">
                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center mr-3 group-hover:scale-110 transition-transform">
                  <Mail className="h-5 w-5 text-white" />
                </div>
                <span>hello@aqmaster.com</span>
              </li>
            </ul>

            {/* Language Switcher */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-300 flex items-center">
                <Globe className="h-4 w-4 mr-2" />
                {t('footer.language')}
              </h5>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full justify-between bg-white/10 border-white/20 text-white hover:bg-white/20">
                    <span className="flex items-center">
                      <span className="mr-2 text-xl">{currentLanguage.flag}</span>
                      {currentLanguage.name}
                    </span>
                    <Globe className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-gray-800 border-gray-700">
                  {languages.map((lang) => (
                    <DropdownMenuItem
                      key={lang.code}
                      onClick={() => handleSetLanguage(lang.code)}
                      className={`cursor-pointer ${language === lang.code ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' : 'text-gray-300 hover:bg-gray-700'}`}
                    >
                      <div className="flex items-center justify-between w-full">
                        <span className="flex items-center">
                          <span className="mr-2 text-xl">{lang.flag}</span>
                          {lang.name}
                        </span>
                        {language === lang.code && <Check className="h-4 w-4" />}
                      </div>
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>

            {/* Newsletter Signup */}
            <div className="mt-6">
              <h5 className="text-sm font-semibold mb-3 text-gray-300">
                {t('footer.newsletter')}
              </h5>
              <div className="flex">
                <input
                  type="email"
                  placeholder={t('footer.emailPlaceholder')}
                  className="flex-1 px-4 py-2 bg-white/10 border border-white/20 rounded-l-lg focus:outline-none focus:border-blue-500 text-white placeholder-gray-400"
                />
                <Button className="bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-l-none">
                  {t('footer.subscribe')}
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="border-t border-white/10 pt-8 mt-8"
        >
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-gray-400 text-sm mb-4 md:mb-0 flex items-center">
              <span>&copy; {new Date().getFullYear()} A&Q Master Pro.</span>
              <span className="mx-2">•</span>
              <span>{t('footer.rights')}</span>
            </div>
            <div className="flex items-center space-x-6">
              <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.privacy')}
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
                {t('footer.terms')}
              </Link>
              <div className="flex items-center text-gray-400 text-sm">
                <Heart className="h-4 w-4 text-red-500 mr-1" />
                <span>{t('footer.made')}</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
}