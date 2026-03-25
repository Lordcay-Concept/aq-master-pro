"use client";

import { useEffect, useRef, useState } from "react";
import { getTranslation } from "@/lib/i18n/translations";

export default function GlobalTranslation({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<string>("en");
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTranslating, setIsTranslating] = useState(false);

  useEffect(() => {
    const savedLanguage = localStorage.getItem("language");
    if (savedLanguage && ["en", "fr", "yo", "ig", "ha"].includes(savedLanguage)) {
      setLanguage(savedLanguage);
    }

    const handleStorageChange = () => {
      const newLanguage = localStorage.getItem("language");
      if (newLanguage && ["en", "fr", "yo", "ig", "ha"].includes(newLanguage)) {
        setLanguage(newLanguage);
      }
    };

    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const t = (text: string): string => {
    return getTranslation(language as any, text);
  };

  const translateTextNodes = (node: Node | null) => {
    if (!node) return;
    
    if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
      const originalText = node.textContent.trim();
      if (shouldTranslate(originalText)) {
        const translated = t(originalText);
        if (translated !== originalText && translated !== originalText.toUpperCase()) {
          node.textContent = translated;
        }
      }
      return;
    }
    
    if (node.nodeType === Node.ELEMENT_NODE) {
      const element = node as Element;
      const tagName = element.tagName;
      
      if (tagName === 'SCRIPT' || tagName === 'STYLE' || tagName === 'SVG') {
        return;
      }
      
      if (tagName === 'INPUT' || tagName === 'TEXTAREA') {
        const input = node as HTMLInputElement;
        if (input.placeholder && shouldTranslate(input.placeholder)) {
          const translated = t(input.placeholder);
          if (translated !== input.placeholder) {
            input.placeholder = translated;
          }
        }
        return;
      }
      
      if (tagName === 'BUTTON' || tagName === 'A' || tagName === 'H1' || tagName === 'H2' || 
          tagName === 'H3' || tagName === 'P' || tagName === 'SPAN' || tagName === 'LABEL') {
        if (element.childNodes.length === 1 && element.childNodes[0].nodeType === Node.TEXT_NODE) {
          const textNode = element.childNodes[0];
          if (textNode.textContent?.trim()) {
            const originalText = textNode.textContent.trim();
            if (shouldTranslate(originalText)) {
              const translated = t(originalText);
              if (translated !== originalText && translated !== originalText.toUpperCase()) {
                textNode.textContent = translated;
              }
            }
          }
        } else {
          element.childNodes.forEach(child => translateTextNodes(child));
        }
        return;
      }
      
      try {
        element.childNodes.forEach(child => translateTextNodes(child));
      } catch (error) {
        console.warn('Error processing child nodes:', error);
      }
    }
  };

  const shouldTranslate = (text: string): boolean => {
    if (!text || text.length < 2) return false;
    if (text.match(/^[\d\s\-+()]+$/)) return false;
    if (text.match(/^[\w\.-]+@[\w\.-]+\.\w+$/)) return false;
    if (text.match(/^https?:\/\//)) return false;
    if (text.startsWith('{{') && text.endsWith('}}')) return false;
    if (text === text.toUpperCase() && text.length > 1 && !text.includes(' ')) return false;
    return true;
  };

  useEffect(() => {
    if (!containerRef.current) return;
    
    setIsTranslating(true);
    
    requestAnimationFrame(() => {
      try {
        if (containerRef.current) {
          translateTextNodes(containerRef.current);
        }
      } catch (error) {
        console.error('Translation error:', error);
      } finally {
        setIsTranslating(false);
      }
    });
  }, [language]);

  useEffect(() => {
    if (!containerRef.current) return;
    
    const observer = new MutationObserver(() => {
      if (containerRef.current && !isTranslating) {
        translateTextNodes(containerRef.current);
      }
    });
    
    observer.observe(containerRef.current, {
      childList: true,
      subtree: true,
      characterData: true
    });
    
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="global-translation-container">
      {children}
      {isTranslating && (
        <div className="fixed bottom-4 right-4 z-50">
          <div className="bg-blue-500 text-white text-xs px-2 py-1 rounded animate-pulse">
            Translating...
          </div>
        </div>
      )}
    </div>
  );
}