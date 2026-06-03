import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { MotionProvider } from "@/components/motion-wrapper";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#FFFFFF" },
    { media: "(prefers-color-scheme: dark)", color: "#09090B" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://romia.dev"),
  title: {
    default: "Abdelrahman Abouroumia (Romia) | AI Engineer",
    template: "%s | Abdelrahman Abouroumia",
  },
  description:
    "Abdelrahman Abouroumia (Romia) is an AI Engineer and Co-Founder of Zaylon AI. Builds production multi-agent LLM systems and the full-stack platforms and backends around them.",
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
    title: "Abdelrahman Abouroumia (Romia) | AI Engineer",
    description:
      "Abdelrahman Abouroumia (Romia). AI Engineer and Co-Founder of Zaylon AI. Multi-agent LLM systems, full-stack platforms, and the backends behind them.",
    url: "https://romia.dev",
    siteName: "Abdelrahman Abouroumia - Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdelrahman Abouroumia (Romia) | AI Engineer",
    description:
      "Abdelrahman Abouroumia (Romia). AI Engineer and Co-Founder of Zaylon AI. Multi-agent LLM systems, full-stack platforms, and the backends behind them.",
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
        {/* Static dot-grid texture, no animation */}
        <div
          aria-hidden="true"
          className="fixed inset-0 -z-10 dot-grid-bg opacity-60 pointer-events-none"
        />
        <ThemeProvider>
          <MotionProvider>{children}</MotionProvider>
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
