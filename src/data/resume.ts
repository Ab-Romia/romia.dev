export const PERSONAL = {
  name: "Abdelrahman Abouroumia",
  displayName: "Romia",
  title: "AI Engineer & Co-Founder",
  email: "aabouroumia@gmail.com",
  tagline:
    "I co-founded Zaylon AI, where I built a multi-agent system that turns WhatsApp conversations into completed purchases across 6 e-commerce platforms and 3 languages.",
  links: {
    linkedin: "https://linkedin.com/in/abdelrahman-abouroumia",
    github: "https://github.com/Ab-Romia",
    huggingface: "https://huggingface.co/Ab-Romia",
  },
} as const;

export const HERO_SIGNALS = [
  { label: "Co-Founder", detail: "Zaylon AI" },
  { label: "Freelance", detail: "AI Coding Expert" },
  { label: "Alexandria Univ", detail: "3.73 GPA, CCE" },
] as const;

export const NAV_LINKS = [
  { label: "Zaylon", href: "#zaylon" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const ZAYLON_SHOWCASE = {
  title: "Zaylon AI",
  role: "Co-Founder & AI Engineer",
  heading: "Building Zaylon AI",
  subtitle: "Production Multi-Tenant Conversational Commerce for MENA",
  description:
    "Zaylon turns WhatsApp and Instagram into full sales channels for MENA merchants. Customers browse products, ask questions in their own dialect, and complete purchases without ever leaving the chat. Behind the scenes, a supervisor agent routes each conversation to specialized Sales, Support, or Checkout agents with scoped tool access.",
  url: "https://zaylon.ai",
  highlights: [
    { label: "AI Tools", detail: "Search, Cart, Orders, CRM & more", value: 10 },
    { label: "Platforms", detail: "Shopify, Salla, WooCommerce, Odoo, YouCan, Zoho", value: 6 },
    { label: "Channels", detail: "WhatsApp, Instagram, Messenger", value: 3 },
    { label: "Languages", detail: "English, Egyptian Arabic, Franco-Arabic", value: 3 },
  ],
  features: [
    "Supervisor agent routes each conversation to Sales, Support, or Checkout agents with scoped tool access, preventing hallucinated actions",
    "DialectBridge NLP pipeline detects and responds in English, Egyptian Arabic, and Franco-Arabic automatically",
    "Vision AI matches customer product photos to catalog items for instant discovery",
    "Real-time catalog sync across Shopify, Salla, WooCommerce, Odoo, YouCan, and Zoho",
    "Proactive re-engagement on cart abandonment and negative sentiment detection",
    "Multi-provider payment processing (Stripe, Paymob, Fawry) with webhook-verified security",
    "Merchant dashboard: real-time inbox, analytics, RFM segmentation, and A/B testing",
    "Multi-tenant architecture with per-merchant encryption and row-level data isolation",
  ],
  techStack: [
    "LangGraph", "FastAPI", "Supabase", "Next.js", "PostgreSQL",
    "pgvector", "Redis", "GPT-4o", "Gemini", "Docker",
  ],
} as const;

export type ProjectStatus = "Production" | "Demo" | "Ongoing" | "Deployed";

interface TechnicalDecision {
  title: string;
  reasoning: string;
}

interface EmbedDemo {
  type: "iframe" | "component";
  src?: string;
  component?: string;
}

interface CaseStudy {
  problem: string;
  approach: string;
  decisions?: TechnicalDecision[];
  results: string;
  embedDemo?: EmbedDemo;
}

export interface Project {
  title: string;
  description: string;
  tags: string[];
  slug: string;
  categories: ("AI/ML" | "Backend" | "Full-Stack" | "Games/Puzzles")[];
  status: ProjectStatus;
  badge?: string;
  featured?: boolean;
  impact?: string;
  url?: string;
  github?: string;
  demo?: string;
  caseStudy: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    title: "Zaylon AI",
    slug: "zaylon-ai",
    categories: ["AI/ML", "Backend", "Full-Stack"],
    description:
      "Multi-agent conversational commerce system built with LangGraph, serving real users across MENA markets via WhatsApp and Instagram.",
    tags: ["LangGraph", "Python", "Multi-Agent", "Shopify", "Next.js"],
    url: "https://zaylon.ai",
    status: "Production",
    badge: "Co-Founded",
    featured: true,
    impact: "Production multi-agent system: 6 platforms, 3 languages, 10 scoped AI tools",
    caseStudy: {
      problem:
        "MENA merchants lose sales because customers abandon messaging channels when they can't get instant, dialect-aware product assistance. Traditional chatbots fail with Arabic dialects and can't handle complex multi-step purchases.",
      approach:
        "Built a multi-agent supervisor architecture with LangGraph that routes conversations to specialized agents, each with scoped tool access and dialect-aware NLP. The system handles the full purchase lifecycle from product discovery to payment processing across multiple messaging channels.",
      decisions: [
        {
          title: "LangGraph over plain LangChain",
          reasoning: "State machine routing gives deterministic conversation flow control that chain-based approaches can't guarantee. Each conversation phase (browsing, carting, checkout) has well-defined transitions.",
        },
        {
          title: "Supervisor pattern over flat multi-agent",
          reasoning: "Scoped tool access per agent prevents hallucinated actions and reduces the attack surface. A sales agent should never be able to process payments.",
        },
        {
          title: "Redis message accumulation",
          reasoning: "WhatsApp users send 3-5 rapid messages instead of one coherent prompt. Without batching, each triggers a separate agent invocation, wasting tokens and producing fragmented responses.",
        },
      ],
      results:
        "Production system serving merchants across 6 e-commerce platforms with supervisor multi-agent architecture, tri-lingual NLP, and multi-provider payment processing.",
    },
  },
  {
    title: "AI Collaborative Workspace",
    slug: "ai-collaborative-workspace",
    categories: ["AI/ML", "Backend", "Full-Stack"],
    description:
      "Full-stack graduation project with a context-aware AI assistant and multi-source RAG pipeline for organizational collaboration.",
    tags: ["FastAPI", "RAG", "pgvector", "React", "PostgreSQL"],
    status: "Ongoing",
    featured: false,
    caseStudy: {
      problem:
        "Organizations need AI assistants that understand their specific context, not generic chatbots. Knowledge is scattered across documents, databases, and team communications.",
      approach:
        "Building a multi-source RAG pipeline with PostgreSQL/pgvector for grounded answers from organizational documents, files, and databases. FastAPI microservices architecture allows each service to scale independently.",
      decisions: [
        {
          title: "pgvector over dedicated vector DB",
          reasoning: "Keeps everything in one database, simplifies deployment and operations. PostgreSQL is battle-tested for production workloads.",
        },
        {
          title: "FastAPI microservices architecture",
          reasoning: "Each service (auth, documents, AI, collaboration) scales independently. A spike in AI queries doesn't affect document uploads.",
        },
      ],
      results: "Ongoing graduation project with context-aware AI assistance for organizational collaboration.",
    },
  },
  {
    title: "ContextIQ: Production RAG System",
    slug: "contextiq-rag",
    categories: ["AI/ML"],
    description:
      "Production RAG API supporting 11+ file formats with TF-IDF embeddings, ChromaDB vector search, and smart caching.",
    tags: ["FastAPI", "ChromaDB", "LangChain", "Python"],
    github: "https://github.com/Ab-Romia/ContextIQ-RAG",
    demo: "https://huggingface.co/spaces/Ab-Romia/Context-Aware-AI",
    status: "Demo",
    featured: true,
    impact: "11+ file formats with hybrid retrieval (keyword + vector + RRF scoring)",
    caseStudy: {
      problem:
        "Most RAG demos handle PDFs only. Real organizations have knowledge spread across 11+ file formats, and retrieval quality degrades without hybrid search strategies.",
      approach:
        "Production RAG API with hybrid retrieval combining TF-IDF keyword search and vector similarity search, smart caching for repeated queries, and multi-format document processing.",
      decisions: [
        {
          title: "Hybrid retrieval with Reciprocal Rank Fusion",
          reasoning: "Pure semantic search misses exact keyword matches that users expect. Combining keyword and vector search with RRF scoring gives the best of both worlds.",
        },
        {
          title: "Smart caching layer",
          reasoning: "Repeated queries to the same document corpus shouldn't re-embed or re-retrieve. Caching dramatically reduces latency and API costs for common queries.",
        },
      ],
      results: "API supporting 11+ file formats with deployed demo on HuggingFace.",
      embedDemo: { type: "iframe", src: "https://ab-romia-context-aware-ai.hf.space" },
    },
  },
  {
    title: "Virtual Banking Microservices",
    slug: "virtual-banking",
    categories: ["Backend", "Full-Stack"],
    description:
      "Event-driven banking platform with microservices architecture, async Kafka messaging, and AI-powered conversational assistant.",
    tags: ["Spring Boot", "Kafka", "Java", "LangChain", "Docker"],
    github: "https://github.com/Ab-Romia/Virtual-Bank-System",
    status: "Demo",
    featured: true,
    impact: "Event-driven microservices with Kafka async messaging and independent scaling",
    caseStudy: {
      problem:
        "Monolithic banking backends can't scale individual services independently. A spike in transaction processing shouldn't affect account lookups or user authentication.",
      approach:
        "Event-driven microservices with Spring Boot and Kafka for decoupled, independently scalable banking operations with OAuth2 security and an embedded AI assistant.",
      decisions: [
        {
          title: "Kafka over synchronous REST for inter-service communication",
          reasoning: "Eventual consistency is acceptable for banking ledgers, and decoupling prevents cascade failures. If the notification service goes down, transactions still process.",
        },
        {
          title: "AI agent as a separate microservice",
          reasoning: "Allows independent scaling and model updates without redeploying core banking logic. The AI service can be versioned, A/B tested, and rolled back independently.",
        },
      ],
      results: "Complete banking platform with transaction processing, account management, and AI assistant.",
    },
  },
  {
    title: "Multimodal Emotion Recognition",
    slug: "emotion-recognition",
    categories: ["AI/ML"],
    description:
      "Cross-modal attention model combining HuBERT audio and EfficientNet visual encoders with bidirectional fusion across 8 emotion classes.",
    tags: ["PyTorch", "HuBERT", "EfficientNet", "Multimodal AI"],
    github: "https://github.com/Ab-Romia/RAVDESS-emotion-recognition",
    demo: "https://huggingface.co/spaces/Ab-Romia/RAVDESS-emotion-recognition",
    status: "Demo",
    featured: true,
    impact: "8-class multimodal classification fusing audio (HuBERT) and visual (EfficientNet) encoders",
    caseStudy: {
      problem:
        "Single-modality emotion detection misses context. Audio tone and facial expressions together reveal more than either alone.",
      approach:
        "Cross-modal attention model fusing HuBERT audio and EfficientNet visual encoders with bidirectional attention and learnable modality weights.",
      results: "8-class emotion classification with deployed demo on HuggingFace.",
      embedDemo: { type: "iframe", src: "https://ab-romia-ravdess-emotion-recognition.hf.space" },
    },
  },
  {
    title: "VoicePrint: AI Text Humanizer",
    slug: "voiceprint-humanizer",
    categories: ["AI/ML"],
    description:
      "NLP system that learns individual writing style from samples using Sentence-BERT embeddings and stylometric analysis.",
    tags: ["NLP", "Sentence-BERT", "Python"],
    github: "https://github.com/Ab-Romia/Style-Echo-AI-Humanizer",
    demo: "https://huggingface.co/spaces/Ab-Romia/voiceprint-humanizer",
    status: "Demo",
    caseStudy: {
      problem:
        "AI-generated text is detectable because it lacks individual writing fingerprints. Each person has measurable stylistic patterns.",
      approach:
        "Style learning system using Sentence-BERT embeddings and 20+ stylometric features to build and apply personal writing profiles.",
      results: "Style transfer system with deployed demo on HuggingFace.",
      embedDemo: { type: "iframe", src: "https://ab-romia-voiceprint-humanizer.hf.space" },
    },
  },
  {
    title: "Connect4 AI Agent",
    slug: "connect4-ai",
    categories: ["Games/Puzzles"],
    description:
      "Intelligent game-playing agent using Minimax search with alpha-beta pruning for optimal move selection.",
    tags: ["AI", "Python", "Game Theory"],
    github: "https://github.com/Ab-Romia/AI_Connect4_Agent",
    demo: "https://huggingface.co/spaces/Ab-Romia/connect4-ai",
    status: "Deployed",
    caseStudy: {
      problem:
        "Building an AI that plays optimally requires efficient search through massive game trees. Connect4 has over 4 trillion possible positions.",
      approach:
        "Minimax algorithm with alpha-beta pruning for optimal move selection, cutting the search space dramatically while maintaining perfect play at reasonable depths.",
      results: "Playable AI opponent with interactive browser demo.",
      embedDemo: { type: "component", component: "connect4" },
    },
  },
  {
    title: "CSP Sudoku Solver",
    slug: "sudoku-solver",
    categories: ["Games/Puzzles"],
    description:
      "Constraint satisfaction solver using backtracking, AC-3 arc consistency, and MRV heuristic for efficient puzzle solving.",
    tags: ["AI", "Python", "CSP"],
    github: "https://github.com/Ab-Romia/Sudoku_CSP",
    demo: "https://huggingface.co/spaces/Ab-Romia/sudoku-ai",
    status: "Deployed",
    caseStudy: {
      problem:
        "Brute-force Sudoku solving is computationally expensive for complex puzzles. Intelligent constraint propagation can solve most puzzles without any backtracking.",
      approach:
        "Constraint satisfaction with backtracking, AC-3 arc consistency preprocessing, and MRV heuristic for intelligent variable ordering.",
      results: "Efficient solver with interactive browser demo. The AI Solve button demonstrates the CSP algorithm solving any puzzle instantly.",
      embedDemo: { type: "component", component: "sudoku" },
    },
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}

export function getAdjacentProjects(slug: string) {
  const idx = PROJECTS.findIndex((p) => p.slug === slug);
  return {
    prev: idx > 0 ? PROJECTS[idx - 1] : null,
    next: idx < PROJECTS.length - 1 ? PROJECTS[idx + 1] : null,
  };
}

export const EXPERIENCE = [
  {
    company: "Zaylon AI",
    role: "AI Engineer & Co-Founder",
    url: "https://zaylon.ai",
    period: "May 2025 – Present",
    highlights: [
      "Architected multi-agent LangGraph system with supervisor routing to 3 specialized agents, each with scoped access to a subset of 10 AI tools",
      "Built hybrid product search combining keyword, semantic, and Reciprocal Rank Fusion scoring, deployed across WhatsApp and Instagram channels",
      "Engineered DialectBridge NLP pipeline handling English, Egyptian Arabic, and Franco-Arabic with automatic dialect detection and response matching",
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
    period: "Sep 2024 – Feb 2026",
    highlights: [
      "Evaluated and improved LLM-generated coding solutions across Python and backend systems for RLHF data pipelines",
      "Developed quality rubrics and prompting strategies for code generation, correctness, and style",
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
    "PyTorch", "LangChain", "LangGraph", "Transformers", "RAG",
    "ChromaDB", "pgvector", "NLP", "Prompt Engineering",
  ],
  Backend: [
    "Spring Boot", "FastAPI", "Microservices", "Kafka",
    "REST APIs", "PostgreSQL", "Redis",
  ],
  "DevOps & Cloud": [
    "Docker", "Git", "GitHub Actions", "AWS",
    "Google Cloud", "Linux", "Bash",
  ],
  Languages: ["Python", "Java", "Go", "SQL", "TypeScript", "C/C++"],
} as const;

export const EDUCATION = {
  university: "Alexandria University, Faculty of Engineering",
  degree: "B.Sc. in Computer & Communications Engineering (AI Concentration)",
  gpa: "3.73 / 4.0",
  expected: "Expected Jul 2026",
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
  bio: "I'm Romia, an AI Engineer and Co-Founder of Zaylon AI, where I built a multi-agent system that handles real commerce conversations across 3 languages and 6 e-commerce platforms. I specialize in LangGraph multi-agent architectures, production RAG pipelines, and the backend systems that power them. Currently finishing my B.Sc. in Computer & Communications Engineering at Alexandria University (3.73 GPA, AI Concentration). I speak English, Arabic, German, and Spanish. Outside engineering, I play guitar.",
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
