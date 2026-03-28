import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { ZaylonShowcase } from "@/components/sections/zaylon-showcase";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { About } from "@/components/sections/about";
import { Blog } from "@/components/sections/blog";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

function SectionDivider() {
  return <div className="section-divider max-w-5xl mx-auto" />;
}

export default function Home() {
  return (
    <>
      <Navbar />
      <main className="pt-16">
        <Hero />
        <ZaylonShowcase />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <About />
        <Blog />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
