import { Hero } from "@/components/sections/hero";
import { Projects } from "@/components/sections/projects";
import { Skills } from "@/components/sections/skills";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <Projects />
        <Skills />
      </main>
      <Footer />
    </>
  );
}
