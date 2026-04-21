import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-wrapper";
import { ParticleNetworkBg } from "@/components/particle-network-bg";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://romia.dev"),
  title: {
    default: "Abdelrahman Abouroumia (Romia) | Software Engineer",
    template: "%s | Abdelrahman Abouroumia",
  },
  description:
    "Abdelrahman Abouroumia (Romia) is a Software Engineer and Co-Founder of Zaylon AI. Building full-stack platforms, multi-agent AI systems, and scalable backend infrastructure.",
  keywords: [
    "Romia",
    "Romia developer",
    "Romia engineer",
    "Romia AI",
    "Romia portfolio",
    "Romia software engineer",
    "Abdelrahman Abouroumia",
    "Abouroumia",
    "Ab-Romia",
    "Software Engineer",
    "Backend Engineer",
    "Full-Stack Engineer",
    "AI Engineer",
    "Co-Founder Zaylon AI",
    "LangGraph",
    "Multi-Agent Systems",
    "FastAPI",
    "Spring Boot",
    "Microservices",
  ],
  authors: [{ name: "Abdelrahman Abouroumia", url: "https://romia.dev" }],
  creator: "Abdelrahman Abouroumia",
  openGraph: {
    title: "Abdelrahman Abouroumia (Romia) | Software Engineer",
    description:
      "Abdelrahman Abouroumia (Romia). Software Engineer and Co-Founder of Zaylon AI. Full-stack platforms, multi-agent AI, scalable backends.",
    url: "https://romia.dev",
    siteName: "Abdelrahman Abouroumia - Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Abouroumia (Romia) | Software Engineer",
    description:
      "Abdelrahman Abouroumia (Romia). Software Engineer and Co-Founder of Zaylon AI. Full-stack platforms, multi-agent AI, scalable backends.",
  },
  alternates: {
    canonical: "/",
  },
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
  other: {
    "theme-color": "#09090B",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-lg focus:text-sm focus:font-medium">
          Skip to content
        </a>
        <ParticleNetworkBg />
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
