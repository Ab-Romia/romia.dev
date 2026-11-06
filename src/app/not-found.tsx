import Link from "next/link";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/sections/footer";

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main id="main-content" className="flex flex-1 items-center">
        <div className="mx-auto w-full max-w-6xl px-5 py-40 sm:px-8">
          <p className="eyebrow">404</p>
          <h1 className="display-xl mt-5 max-w-[14ch]">This page isn&apos;t here.</h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            The link may be old, or the page may have moved. Everything that exists is one click
            from the front page.
          </p>
          <div className="mt-10 flex flex-wrap gap-x-8 gap-y-3 text-[15px]">
            <Link href="/" className="link">
              Home
            </Link>
            <Link href="/#projects" className="link">
              Work
            </Link>
            <Link href="/blog" className="link">
              Writing
            </Link>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
