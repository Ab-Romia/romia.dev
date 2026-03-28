import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { SpotlightBg } from "@/components/spotlight-bg";
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
    default: "Romia | AI Engineer",
    template: "%s | Romia",
  },
  description:
    "Romia - AI/ML Engineer and Co-Founder of Zaylon AI. Building intelligent systems from multi-agent architectures to production-grade APIs.",
  openGraph: {
    title: "Romia | AI Engineer",
    description:
      "AI/ML Engineer and Co-Founder of Zaylon AI. Building intelligent systems from multi-agent architectures to production ML pipelines.",
    url: "https://romia.dev",
    siteName: "Romia",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Romia | AI Engineer",
    description:
      "AI/ML Engineer and Co-Founder of Zaylon AI. Building intelligent systems from multi-agent architectures to production ML pipelines.",
  },
  robots: {
    index: true,
    follow: true,
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
        <SpotlightBg />
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
