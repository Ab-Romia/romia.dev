import { Navbar } from "@/components/navbar";
import { Hero } from "@/components/sections/hero";
import { ZaylonShowcase } from "@/components/sections/zaylon-showcase";
import { Projects } from "@/components/sections/projects";
import { Experience } from "@/components/sections/experience";
import { Skills } from "@/components/sections/skills";
import { Writing } from "@/components/sections/writing";
import { About } from "@/components/sections/about";
import { Contact } from "@/components/sections/contact";
import { Footer } from "@/components/sections/footer";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": "https://romia.dev/#person",
  name: "Abdelrahman Abouroumia",
  givenName: "Abdelrahman",
  familyName: "Abouroumia",
  alternateName: ["Romia", "Ab-Romia", "Abouroumia"],
  jobTitle: "AI & Backend Engineer",
  url: "https://romia.dev",
  description:
    "AI & Backend Engineer and Co-Founder of Zaylon AI. Builds LLM agents, RAG systems, and the full-stack platforms and backends around them.",
  sameAs: [
    "https://linkedin.com/in/abdelrahman-abouroumia",
    "https://github.com/Ab-Romia",
    "https://huggingface.co/Ab-Romia",
    "https://www.kaggle.com/abdelrahmanromia",
    "https://zaylon.ai",
  ],
  knowsAbout: [
    "Software Engineering",
    "Backend Engineering",
    "Full-Stack Development",
    "Microservices",
    "Event-Driven Architecture",
    "Multi-Agent Systems",
    "LLM Agents",
    "AI Agents",
    "LangGraph",
    "LangChain",
    "Retrieval-Augmented Generation",
    "Vector Databases",
    "pgvector",
    "Prompt Engineering",
    "FastAPI",
    "Spring Boot",
    "Apache Kafka",
    "Next.js",
    "React",
    "PostgreSQL",
    "Redis",
    "Python",
    "TypeScript",
    "Docker",
    "PyTorch",
    "Natural Language Processing",
    "Computer Vision",
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
    name: "AI & Backend Engineer",
    occupationalCategory: "15-1252.00",
  },
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Romia - Abdelrahman Abouroumia",
  alternateName: "romia.dev",
  url: "https://romia.dev",
  description:
    "Portfolio of Abdelrahman Abouroumia (Romia), AI & Backend Engineer and Co-Founder of Zaylon AI.",
  author: { "@id": "https://romia.dev/#person" },
};

function SectionDivider() {
  return <div className="section-divider max-w-5xl mx-auto" />;
}

export default function Home() {
  return (
    <>
      {/* Plain script tags so the structured data ships in the initial HTML;
          next/script injects only after hydration, hiding it from non-JS crawlers. */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />
      <Navbar />
      <main id="main-content" className="pt-16">
        <Hero />
        <ZaylonShowcase />
        <Projects />
        <SectionDivider />
        <Experience />
        <SectionDivider />
        <Skills />
        <SectionDivider />
        <Writing />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Contact />
      </main>
      <Footer showSocials={false} />
    </>
  );
}
