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
import Script from "next/script";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://romia.dev/#person",
  name: "Abdelrahman Abouroumia",
  alternateName: ["Romia", "Ab-Romia", "Abouroumia"],
  jobTitle: "AI Engineer",
  url: "https://romia.dev",
  description:
    "AI Engineer and Co-Founder of Zaylon AI. Building multi-agent systems, production RAG pipelines, and scalable backend infrastructure.",
  sameAs: [
    "https://linkedin.com/in/abdelrahman-abouroumia",
    "https://github.com/Ab-Romia",
    "https://huggingface.co/Ab-Romia",
    "https://zaylon.ai",
  ],
  knowsAbout: [
    "Artificial Intelligence",
    "Multi-Agent Systems",
    "LangGraph",
    "Retrieval-Augmented Generation",
    "Natural Language Processing",
    "Backend Engineering",
    "FastAPI",
    "Spring Boot",
    "Python",
    "TypeScript",
    "Conversational AI",
    "Machine Learning",
  ],
  alumniOf: {
    "@type": "EducationalOrganization",
    name: "Alexandria University, Faculty of Engineering",
  },
  worksFor: {
    "@type": "Organization",
    name: "Zaylon AI",
    url: "https://zaylon.ai",
  },
  hasOccupation: {
    "@type": "Occupation",
    name: "AI Engineer",
    occupationalCategory: "15-1251.00",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Romia - Abdelrahman Abouroumia",
  alternateName: "romia.dev",
  url: "https://romia.dev",
  description:
    "Portfolio of Abdelrahman Abouroumia (Romia), AI Engineer and Co-Founder of Zaylon AI.",
  author: { "@id": "https://romia.dev/#person" },
};

function SectionDivider() {
  return <div className="section-divider max-w-5xl mx-auto" />;
}

export default function Home() {
  return (
    <>
      <Script
        id="person-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
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
