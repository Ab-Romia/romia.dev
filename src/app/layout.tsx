import type { Metadata, Viewport } from "next";
import { Archivo, JetBrains_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

// Archivo for everything set in words (its width axis carries the poster
// headings), JetBrains Mono for labels, dates, figures and code.
const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const mono = JetBrains_Mono({
  variable: "--font-code",
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#F2F0EB" },
    { media: "(prefers-color-scheme: dark)", color: "#0A0B0D" },
  ],
};

export const metadata: Metadata = {
  metadataBase: new URL("https://romia.dev"),
  title: {
    default: "Abdelrahman Abouroumia (Romia) | AI & Backend Engineer",
    template: "%s | Abdelrahman Abouroumia",
  },
  description:
    "Abdelrahman Abouroumia (Romia), AI & Backend Engineer. Software Engineer at Tutanic and Co-Founder of Zaylon AI. Builds LLM agents, RAG systems, and the backends they run on.",
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
    "AI & Backend Engineer",
    "Co-Founder Zaylon AI",
    "Tutanic",
    "Software Engineer at Tutanic",
    "LangGraph",
    "Multi-Agent Systems",
    "FastAPI",
    "Spring Boot",
    "Microservices",
  ],
  authors: [{ name: "Abdelrahman Abouroumia", url: "https://romia.dev" }],
  creator: "Abdelrahman Abouroumia",
  openGraph: {
    title: "Abdelrahman Abouroumia (Romia) | AI & Backend Engineer",
    description:
      "Abdelrahman Abouroumia (Romia). AI & Backend Engineer. Software Engineer at Tutanic and Co-Founder of Zaylon AI. LLM agents, RAG systems, full-stack platforms, and the backends behind them.",
    url: "https://romia.dev",
    siteName: "Abdelrahman Abouroumia - Portfolio",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
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
      className={`${archivo.variable} ${mono.variable} h-full`}
    >
      <body className="min-h-full flex flex-col">
        <a href="#main-content" className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:bg-accent focus:text-accent-foreground focus:rounded-md focus:text-sm focus:font-medium">
          Skip to content
        </a>
        <ThemeProvider>{children}</ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
