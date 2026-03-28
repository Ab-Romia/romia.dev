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

export const NAV_LINKS = [
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Blog", href: "#blog" },
  { label: "Contact", href: "#contact" },
] as const;

export const ZAYLON_SHOWCASE = {
  title: "Zaylon AI",
  subtitle: "Conversational Commerce, Reinvented",
  description:
    "A multi-agent conversational commerce platform built for MENA merchants. Zaylon connects to Shopify, Salla, and Zid — enabling real-time catalog sync, order management, and AI-powered customer interactions across WhatsApp and Instagram.",
  url: "https://zaylon.ai",
  highlights: [
    { label: "AI Tools", value: "10" },
    { label: "Platform Integrations", value: "3" },
    { label: "Architecture", value: "Multi-Agent" },
    { label: "NLP", value: "Bilingual" },
  ],
  techStack: [
    "LangGraph",
    "Python",
    "FastAPI",
    "Next.js",
    "Shopify",
    "Salla",
    "Zid",
    "WhatsApp API",
    "GPT-4o",
  ],
} as const;

export const PROJECTS = [
  {
    title: "Zaylon AI",
    description:
      "Multi-agent conversational commerce system built with LangGraph, serving real users across MENA markets via WhatsApp and Instagram.",
    tags: ["LangGraph", "Python", "Multi-Agent", "Shopify", "Next.js"],
    url: "https://zaylon.ai",
    featured: true,
  },
  {
    title: "AI Collaborative Workspace",
    description:
      "Full-stack graduation project with a context-aware AI assistant and multi-source RAG pipeline for organizational collaboration.",
    tags: ["FastAPI", "RAG", "pgvector", "React", "PostgreSQL"],
    status: "Ongoing" as const,
  },
  {
    title: "ContextIQ: Production RAG System",
    description:
      "Production RAG API supporting 11+ file formats with TF-IDF embeddings, ChromaDB vector search, and smart caching.",
    tags: ["FastAPI", "ChromaDB", "LangChain", "Python"],
    github: "https://github.com/Ab-Romia",
  },
  {
    title: "Virtual Banking Microservices",
    description:
      "Event-driven banking platform with microservices architecture, async Kafka messaging, and AI-powered conversational assistant.",
    tags: ["Spring Boot", "Kafka", "Java", "LangChain", "Docker"],
  },
  {
    title: "Multimodal Emotion Recognition",
    description:
      "Cross-modal attention model combining HuBERT audio and EfficientNet visual encoders with bidirectional fusion across 8 emotion classes.",
    tags: ["PyTorch", "HuBERT", "EfficientNet", "Multimodal AI"],
  },
  {
    title: "VoicePrint: AI Text Humanizer",
    description:
      "NLP system that learns individual writing style from samples using Sentence-BERT embeddings and stylometric analysis.",
    tags: ["NLP", "Sentence-BERT", "Python"],
  },
  {
    title: "Connect4 AI Agent",
    description:
      "Intelligent game-playing agent using Minimax search with alpha-beta pruning for optimal move selection.",
    tags: ["AI", "Python", "Game Theory"],
  },
  {
    title: "CSP Sudoku Solver",
    description:
      "Constraint satisfaction solver using backtracking, AC-3 arc consistency, and MRV heuristic for efficient puzzle solving.",
    tags: ["AI", "Python", "CSP"],
  },
] as const;

export const EXPERIENCE = [
  {
    company: "Zaylon AI",
    role: "AI Engineer & Co-Founder",
    url: "https://zaylon.ai",
    period: "May 2025 – Present",
    highlights: [
      "Built a multi-agent LangGraph system with supervisor/orchestrator pattern and 10 AI tools (search, cart, orders, CRM)",
      "Integrated Shopify, Salla, and Zid for real-time catalog sync, order management, and merchant onboarding",
      "Developed hybrid product search (keyword + semantic with RRF) and visual search via GPT-4o on WhatsApp/Instagram",
      "Built the merchant dashboard with real-time conversation monitoring, AI actions queue, and analytics (Next.js)",
      "Engineered DialectBridge for Egyptian Arabic, Franco-Arabic, and English with auto-detection and response matching",
    ],
  },
  {
    company: "Ejada",
    role: "Software Integration Engineering Intern",
    period: "Jul 2025",
    highlights: [
      "Built RESTful API endpoints for core banking using Spring Boot with query optimization and Redis caching",
      "Configured Apache Kafka producers/consumers for async transaction processing",
      "Implemented API security (OAuth2, rate limiting) with WSO2 API Manager",
    ],
  },
  {
    company: "Scale AI",
    role: "AI Coding Expert",
    type: "Freelance",
    period: "Sep 2024 – Present",
    highlights: [
      "Contribute to RLHF data pipelines evaluating and improving LLM-generated coding solutions",
      "Develop quality rubrics and prompting strategies for Python and backend logic",
    ],
  },
  {
    company: "Swift-ACT",
    role: "Automotive Cybersecurity Intern",
    period: "Aug 2024 – Oct 2024",
    highlights: [
      "Created threat analysis catalog for CAN bus and ECU attack vectors",
      "Conducted fuzz testing on AEB components",
    ],
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

export const CERTIFICATIONS = [
  { name: "Google AI Agents Intensive Capstone", issuer: "Kaggle", year: "2025" },
  { name: "Claude Code in Action", issuer: "Anthropic", year: "2025" },
  { name: "Meta Back-end Developer Specialization", issuer: "Coursera", year: "" },
  { name: "AWS Cloud & ML Foundations", issuer: "AWS Academy", year: "" },
] as const;

export const COMPETITIONS = [
  { name: "MTC-AIC3 BCI Challenge", detail: "Egypt National AI Competition" },
  { name: "ECPC", detail: "3x Participant" },
  { name: "Hepsiburada Address Resolution Hackathon", detail: "TEKNOFEST 2025" },
] as const;

export const LANGUAGES_SPOKEN = [
  { language: "English", level: "Fluent" },
  { language: "Arabic", level: "Native" },
  { language: "German", level: "A2" },
  { language: "Spanish", level: "Conversational" },
] as const;

export const ABOUT = {
  bio: "I'm an AI Engineer and Co-Founder of Zaylon AI, building multi-agent systems that power real-world conversational commerce across MENA markets. My work spans the full stack — from designing LangGraph agent architectures and production RAG pipelines to building merchant dashboards with Next.js. I'm passionate about making AI practical: systems that handle Arabic dialects, integrate with e-commerce platforms, and serve real users at scale. Currently completing my B.Sc. in Computer & Communications Engineering with an AI concentration at Alexandria University.",
} as const;
