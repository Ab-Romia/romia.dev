export const PERSONAL = {
  name: "Abdelrahman Abouroumia",
  displayName: "Romia",
  title: "AI Engineer",
  location: "Alexandria, Egypt",
  email: "aabouroumia@gmail.com",
  tagline:
    "Building intelligent systems and scalable backends. From multi-agent architectures to production-grade APIs.",
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
  role: "Co-Founder & AI Engineer",
  heading: "Co-Founding Zaylon AI",
  subtitle: "Production Multi-Tenant Conversational Commerce for MENA",
  description:
    "A production-grade, multi-tenant SaaS platform powering AI-driven customer interactions for MENA e-commerce merchants. 40,000+ lines of backend code with a supervisor multi-agent architecture that routes conversations through specialized Sales, Support, and Checkout agents, each with scoped tool access.",
  url: "https://zaylon.ai",
  highlights: [
    { label: "Lines of Code", value: 40, suffix: "k+" },
    { label: "E-Commerce Platforms", value: 6 },
    { label: "DB Migrations", value: 84 },
    { label: "Test Files", value: 59 },
  ],
  features: [
    "Supervisor multi-agent routing with 3 specialist agents (Sales, Support, Checkout)",
    "DialectBridge tri-lingual NLP: English, Egyptian Arabic, and Franco-Arabic with auto-detection",
    "Vision AI for product image search via GPT-4o (multimodal-safe checkpointing)",
    "Redis-backed message accumulation batching rapid-fire customer messages",
    "Proactive engagement engine with 6 detection rules and LLM-powered triage",
    "3-layer encryption: Fernet + AES-256-GCM + PostgreSQL Row-Level Security",
    "Hybrid search with Reciprocal Rank Fusion (semantic + keyword via pgvector)",
    "A/B testing framework with variant assignment and outcome tracking",
  ],
  techStack: [
    "LangGraph",
    "FastAPI",
    "Supabase",
    "Next.js",
    "PostgreSQL",
    "pgvector",
    "Redis",
    "GPT-4o",
    "Gemini",
    "Docker",
  ],
} as const;

export type ProjectStatus = "Production" | "Demo" | "Ongoing" | "Deployed";

export const PROJECTS = [
  {
    title: "Zaylon AI",
    description:
      "Multi-agent conversational commerce system built with LangGraph, serving real users across MENA markets via WhatsApp and Instagram.",
    tags: ["LangGraph", "Python", "Multi-Agent", "Shopify", "Next.js"],
    url: "https://zaylon.ai",
    status: "Production" as ProjectStatus,
    badge: "Co-Founded",
    featured: true,
  },
  {
    title: "AI Collaborative Workspace",
    description:
      "Full-stack graduation project with a context-aware AI assistant and multi-source RAG pipeline for organizational collaboration.",
    tags: ["FastAPI", "RAG", "pgvector", "React", "PostgreSQL"],
    status: "Ongoing" as ProjectStatus,
    featured: true,
  },
  {
    title: "ContextIQ: Production RAG System",
    description:
      "Production RAG API supporting 11+ file formats with TF-IDF embeddings, ChromaDB vector search, and smart caching.",
    tags: ["FastAPI", "ChromaDB", "LangChain", "Python"],
    github: "https://github.com/Ab-Romia",
    demo: "https://huggingface.co/spaces/Ab-Romia/Context-Aware-AI",
    status: "Demo" as ProjectStatus,
    featured: true,
  },
  {
    title: "Virtual Banking Microservices",
    description:
      "Event-driven banking platform with microservices architecture, async Kafka messaging, and AI-powered conversational assistant.",
    tags: ["Spring Boot", "Kafka", "Java", "LangChain", "Docker"],
    github: "https://github.com/Ab-Romia",
    status: "Demo" as ProjectStatus,
    featured: true,
  },
  {
    title: "Multimodal Emotion Recognition",
    description:
      "Cross-modal attention model combining HuBERT audio and EfficientNet visual encoders with bidirectional fusion across 8 emotion classes.",
    tags: ["PyTorch", "HuBERT", "EfficientNet", "Multimodal AI"],
    github: "https://github.com/Ab-Romia",
    demo: "https://huggingface.co/spaces/Ab-Romia/RAVDESS-emotion-recognition",
    status: "Demo" as ProjectStatus,
  },
  {
    title: "VoicePrint: AI Text Humanizer",
    description:
      "NLP system that learns individual writing style from samples using Sentence-BERT embeddings and stylometric analysis.",
    tags: ["NLP", "Sentence-BERT", "Python"],
    github: "https://github.com/Ab-Romia",
    demo: "https://huggingface.co/spaces/Ab-Romia/voiceprint-humanizer",
    status: "Demo" as ProjectStatus,
  },
  {
    title: "Connect4 AI Agent",
    description:
      "Intelligent game-playing agent using Minimax search with alpha-beta pruning for optimal move selection.",
    tags: ["AI", "Python", "Game Theory"],
    demo: "https://huggingface.co/spaces/Ab-Romia/connect4-ai",
    status: "Deployed" as ProjectStatus,
  },
  {
    title: "CSP Sudoku Solver",
    description:
      "Constraint satisfaction solver using backtracking, AC-3 arc consistency, and MRV heuristic for efficient puzzle solving.",
    tags: ["AI", "Python", "CSP"],
    demo: "https://huggingface.co/spaces/Ab-Romia/sudoku-ai",
    status: "Deployed" as ProjectStatus,
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
      "Developed hybrid product search (keyword + semantic with RRF) and visual search via GPT-4o on WhatsApp/Instagram",
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
      "Created threat analysis catalog documenting attack vectors on CAN bus and ECU systems",
      "Conducted fuzz testing on Automotive Emergency Braking (AEB) components",
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
  { name: "Meta Back-end Developer Specialization", issuer: "Coursera" },
  { name: "AWS Cloud & ML Foundations", issuer: "AWS Academy" },
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
  bio: "I'm Romia, an AI/ML Engineer and Co-Founder of Zaylon AI based in Alexandria, Egypt. I build intelligent systems ranging from multi-agent architectures to production RAG pipelines, and I design scalable backend systems that power them. Currently finishing my B.Sc. in Computer & Communications Engineering with an AI concentration at Alexandria University (3.73 GPA). I'm passionate about conversational AI, NLP for Arabic, and building products that serve the MENA region. Outside of engineering, I play guitar and learn Spanish and German.",
} as const;

export const BLOG_POSTS = [
  {
    title: "Building Production RAG Systems: Lessons from Zaylon AI",
    slug: "building-production-rag-systems",
    comingSoon: true,
    eta: "Q3 2026",
  },
  {
    title: "Multi-Agent Architecture Patterns with LangGraph",
    slug: "multi-agent-architecture-patterns",
    comingSoon: true,
    eta: "Q3 2026",
  },
  {
    title: "Arabic NLP in Conversational Commerce",
    slug: "arabic-nlp-conversational-commerce",
    comingSoon: true,
    eta: "Q4 2026",
  },
] as const;
