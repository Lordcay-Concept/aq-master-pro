import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";
import RootLayoutClient from "./RootLayoutClient";
import { localBusinessSchema } from "./schema";

const inter = Inter({ subsets: ["latin"] });

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#1a1a1a" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://aqmaster.com"),
  title: {
    default: "A&Q Master Pro - Smart Queue Management System",
    template: "%s | A&Q Master Pro"
  },
  description: "Professional appointment and queue management system for businesses. Reduce wait times, manage customer flow, and improve service delivery with our smart queue solution.",
  keywords: [
    "queue management",
    "appointment system",
    "customer flow",
    "waitlist management",
    "business automation",
    "digital queue",
    "customer service",
    "queue system Nigeria",
    "appointment booking"
  ],
  authors: [{ name: "A&Q Master Pro", url: "https://aqmaster.com" }],
  creator: "A&Q Master Pro",
  publisher: "A&Q Master Pro",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/Company-Logo.ico",  
    apple: "/Company-Logo.ico", 
  },
  openGraph: {
    title: "A&Q Master Pro - Smart Queue Management System",
    description: "Streamline customer flow and reduce wait times with our professional queue management system. Perfect for banks, hospitals, and service centers.",
    url: "https://aqmaster.com",
    siteName: "A&Q Master Pro",
    images: [
      {
        url: "/Company-Logo.ico",
        width: 1200,
        height: 630,
        alt: "A&Q Master Pro Logo",
      },
    ],
    locale: "en_NG",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "A&Q Master Pro - Smart Queue Management",
    description: "Reduce wait times and improve customer service with our smart queue system.",
    images: ["/Company-Logo.ico"],
    creator: "@aqmaster",
    site: "@aqmaster",
  },
  verification: {
    google: "your-google-verification-code",
  },
  alternates: {
    canonical: "/",
    languages: {
      "en-NG": "/",
      "fr": "/fr",
      "yo": "/yo",
    },
  },
  category: "business",
  classification: "Queue Management Software",
  applicationName: "A&Q Master Pro",
  formatDetection: {
    email: true,
    address: true,
    telephone: true,
  },
  appleWebApp: {
    capable: true,
    title: "A&Q Master Pro",
    statusBarStyle: "black-translucent",
  },
};

export const manifest = "/manifest.json";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={inter.className}>
        <Providers>
          <RootLayoutClient>{children}</RootLayoutClient>
        </Providers>
      </body>
    </html>
  );
}