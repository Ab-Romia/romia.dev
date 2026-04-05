import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SpotlightBg } from "@/components/spotlight-bg";
import { CursorTrail } from "@/components/cursor-trail";
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
    default: "Abdelrahman Abouroumia (Romia) | AI Engineer",
    template: "%s | Abdelrahman Abouroumia",
  },
  description:
    "Abdelrahman Abouroumia (Romia) - AI Engineer and Co-Founder of Zaylon AI. Building multi-agent systems, production RAG pipelines, and scalable backend APIs.",
  keywords: [
    "Abdelrahman Abouroumia",
    "Romia",
    "Abouroumia",
    "Ab-Romia",
    "AI Engineer",
    "Co-Founder Zaylon AI",
    "LangGraph",
    "Multi-Agent Systems",
    "RAG",
    "FastAPI",
    "Backend Engineer",
  ],
  authors: [{ name: "Abdelrahman Abouroumia", url: "https://romia.dev" }],
  creator: "Abdelrahman Abouroumia",
  openGraph: {
    title: "Abdelrahman Abouroumia (Romia) | AI Engineer",
    description:
      "AI Engineer and Co-Founder of Zaylon AI. Building multi-agent systems, production RAG pipelines, and scalable backend APIs.",
    url: "https://romia.dev",
    siteName: "Abdelrahman Abouroumia - Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Abouroumia (Romia) | AI Engineer",
    description:
      "AI Engineer and Co-Founder of Zaylon AI. Building multi-agent systems, production RAG pipelines, and scalable backend APIs.",
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
        <SpotlightBg />
        <CursorTrail />
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
