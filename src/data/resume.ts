export const PERSONAL = {
  name: "Abdelrahman Abouroumia",
  displayName: "Romia",
  title: "AI Engineer",
  location: "Alexandria, Egypt",
  email: "aabouroumia@gmail.com",
  tagline:
    "Building intelligent systems — from multi-agent architectures to production ML pipelines.",
  links: {
    linkedin: "https://linkedin.com/in/abdelrahman-abouroumia",
    github: "https://github.com/Ab-Romia",
    huggingface: "https://huggingface.co/Ab-Romia",
  },
} as const;

export const PROJECTS = [
  {
    title: "Zaylon AI",
    description:
      "Multi-agent conversational commerce system built with LangGraph, serving real users across MENA markets via WhatsApp and Instagram.",
    tags: ["LangGraph", "Python", "Multi-Agent", "Shopify", "Next.js"],
  },
  {
    title: "AI Collaborative Workspace",
    description:
      "Full-stack graduation project with a context-aware AI assistant and multi-source RAG pipeline for organizational collaboration.",
    tags: ["FastAPI", "RAG", "pgvector", "React", "PostgreSQL"],
  },
  {
    title: "ContextIQ RAG System",
    description:
      "Production RAG API supporting 11+ file formats with TF-IDF embeddings, ChromaDB vector search, and smart caching.",
    tags: ["FastAPI", "ChromaDB", "LangChain", "Python"],
  },
  {
    title: "Virtual Banking Microservices",
    description:
      "Event-driven banking platform with microservices architecture, async Kafka messaging, and AI-powered conversational assistant.",
    tags: ["Spring Boot", "Kafka", "Java", "LangChain", "Docker"],
  },
] as const;

export const SKILLS = {
  "AI / ML": [
    "PyTorch",
    "LangChain",
    "LangGraph",
    "Transformers",
    "RAG",
    "ChromaDB",
    "pgvector",
    "NLP",
    "Prompt Engineering",
  ],
  Backend: [
    "Spring Boot",
    "FastAPI",
    "Microservices",
    "Kafka",
    "REST APIs",
    "PostgreSQL",
    "Redis",
  ],
  "DevOps & Cloud": [
    "Docker",
    "Git",
    "GitHub Actions",
    "AWS",
    "Google Cloud",
    "Linux",
    "Bash",
  ],
  Languages: ["Python", "Java", "SQL", "TypeScript", "C/C++"],
} as const;

export const EDUCATION = {
  university: "Alexandria University, Faculty of Engineering",
  degree: "B.Sc. in Computer & Communications Engineering (AI Concentration)",
  gpa: "3.73 / 4.0",
  expected: "Expected Jul 2026",
  location: "Alexandria, Egypt",
} as const;
