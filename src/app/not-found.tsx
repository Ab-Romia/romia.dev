import Link from "next/link";
import { Navbar } from "@/components/navbar";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="min-h-screen flex flex-col items-center justify-center px-6">
        <p className="font-mono text-sm text-accent mb-3">
          &gt; route not found
        </p>
        <h1 className="text-8xl md:text-9xl font-bold text-accent tracking-tight">
          404
        </h1>
        <p className="text-lg text-muted-foreground mt-4">
          Page not found
        </p>
        <div className="mt-8 flex items-center gap-3">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors px-6 py-3 rounded-lg border border-border hover:border-accent/30"
          >
            Home
          </Link>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm font-medium text-foreground hover:text-accent transition-colors px-6 py-3 rounded-lg border border-border hover:border-accent/30"
          >
            Blog
          </Link>
        </div>
      </main>
    </>
  );
}
