import type { Metadata, Viewport } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import { LanguageProvider } from "@/components/LanguageContext";
import TopAlertBar from "@/components/TopAlertBar";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import RescueBotAI from "@/components/RescueBotAI";
import MobileBottomNav from "@/components/MobileBottomNav";
import ParallaxStarsBackground from "@/components/ParallaxStarsBackground";
import DayAmbientBackground from "@/components/DayAmbientBackground";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
  themeColor: "#05130b",
};

export const metadata: Metadata = {
  title: "Punarva — Where Every Resource Returns",
  description:
    "AI-powered surplus food rescue and circular waste management platform connecting food donors, verified NGOs, volunteers, and municipal recyclers across India.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Punarva",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
      </head>
      <body className="min-h-screen flex flex-col bg-slate-50 dark:bg-[#05130b] text-slate-900 dark:text-slate-100 antialiased selection:bg-emerald-500 selection:text-black pb-20 md:pb-0 transition-colors duration-200">
        <LanguageProvider>
          <ThemeProvider>
            <ParallaxStarsBackground />
            <DayAmbientBackground />
            <TopAlertBar />
            <Navbar />
            <main className="flex-1 w-full relative z-10">{children}</main>
            <Footer />
            <RescueBotAI />
            <MobileBottomNav />
          </ThemeProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
