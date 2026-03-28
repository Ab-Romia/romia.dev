import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { ZaylonShowcase } from "@/components/sections/zaylon-showcase";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <ZaylonShowcase />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
