export const PERSONAL = {
  name: "Abdelrahman Abouroumia",
  displayName: "Romia",
  title: "AI Engineer",
  email: "aabouroumia@gmail.com",
  tagline:
    "I build multi-agent LLM systems. At Zaylon AI, the company I co-founded, the agents I built let customers shop and check out by chatting on WhatsApp and Instagram in their own dialect.",
  links: {
    linkedin: "https://linkedin.com/in/abdelrahman-abouroumia",
    github: "https://github.com/Ab-Romia",
    huggingface: "https://huggingface.co/Ab-Romia",
  },
} as const;

export const HERO_SIGNALS = [
  { label: "Co-Founder", detail: "Zaylon AI" },
  { label: "B.Sc. Computer Engineering", detail: "AI Minor" },
] as const;

export const NAV_LINKS = [
  { label: "Zaylon", href: "#zaylon" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const ZAYLON_SHOWCASE = {
  title: "Zaylon AI",
  role: "Software Engineer & Co-Founder",
  heading: "Zaylon AI",
  subtitle: "Conversational commerce for MENA merchants, on WhatsApp and Instagram",
  description:
    "Zaylon turns WhatsApp and Instagram into sales channels for MENA merchants. Customers browse products, ask questions in their own dialect, and check out inside the chat. A supervisor agent reads each message and hands it to a Sales, Support, or Checkout agent, and each one can only touch the tools its job needs.",
  url: "https://zaylon.ai",
  highlights: [
    { label: "AI Tools", detail: "Search, Cart, Orders, CRM & more", value: 10 },
    { label: "Platforms", detail: "Shopify, Salla, WooCommerce, Odoo, YouCan, Zoho", value: 6 },
    { label: "Channels", detail: "WhatsApp, Instagram, Messenger", value: 3 },
    { label: "Languages", detail: "English, Egyptian Arabic, Franco-Arabic", value: 3 },
  ],
  features: [
    "A supervisor agent routes each conversation to a Sales, Support, or Checkout agent. Each one can only reach the tools its job needs, so a sales agent never touches a payment.",
    "DialectBridge detects whether a customer is writing English, Egyptian Arabic, or Franco-Arabic and answers back in the same dialect.",
    "Customers can send a photo of a product, and Zaylon matches it against the merchant's catalog.",
    "Catalog and orders stay in sync across Shopify, Salla, WooCommerce, Odoo, YouCan, and Zoho.",
    "Follows up on abandoned carts and steps in when a conversation starts to turn negative.",
    "Takes payments through Stripe, Paymob, and Fawry, with every charge confirmed by a verified webhook.",
    "A merchant dashboard with a live inbox, analytics, RFM segmentation, and A/B testing.",
    "Each merchant's data is encrypted on its own and isolated at the row level, so tenants never see each other.",
  ],
  techStack: [
    "LangGraph", "FastAPI", "Supabase", "Next.js", "PostgreSQL",
    "pgvector", "Redis", "GPT-4o", "Gemini", "Docker",
  ],
} as const;

// Real production traction. Drop in a true usage number and it renders as a
// highlighted metric in the Zaylon showcase. Leave null to hide.
// Example: { value: "12K+", label: "conversations handled" }
export const ZAYLON_LIVE_METRIC: { value: string; label: string } | null = null;

// Path to a real merchant-dashboard screenshot under /public. When set, the
// showcase renders it in a framed figure. Example: "/zaylon-dashboard.png"
export const ZAYLON_DASHBOARD_IMAGE: string | null = null;

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
      "A multi-agent system on LangGraph that sells over WhatsApp and Instagram for MENA merchants, carrying a customer from product search to a confirmed payment.",
    tags: ["LangGraph", "Python", "Multi-Agent", "Shopify", "Next.js"],
    url: "https://zaylon.ai",
    status: "Production",
    badge: "Co-Founded",
    featured: true,
    impact: "Supervisor multi-agent system across 6 commerce platforms, 3 dialects, and 3 payment providers",
    caseStudy: {
      problem:
        "MENA shoppers do a lot of their buying over WhatsApp and Instagram, but merchants can't sit in those chats around the clock. Off-the-shelf chatbots fall apart on Egyptian Arabic and Franco-Arabic, and they can't carry someone from a question all the way to a paid order.",
      approach:
        "I built a supervisor architecture in LangGraph. One router reads each incoming message and hands it to the agent that should own it, Sales, Support, or Checkout, and each agent only holds the tools for its own job. Dialect detection runs first, so the customer is answered in the language they wrote in, and the same flow carries a conversation from the first product question to a confirmed payment.",
      decisions: [
        {
          title: "LangGraph over plain LangChain",
          reasoning: "A state machine lets me pin down exactly which transitions are legal between browsing, carting, and checkout. Plain chains drift, and in a flow that ends in a payment I can't afford drift.",
        },
        {
          title: "Supervisor pattern over flat multi-agent",
          reasoning: "Giving each agent only its own tools means a sales agent can never reach the payment tools, which also rules out a whole class of wrong actions. One flat agent holding every tool is a single bad generation away from doing real damage.",
        },
        {
          title: "Redis message accumulation",
          reasoning: "People on WhatsApp send three or four quick messages instead of one. I batch them in Redis for a short window so the agent reads the whole thought at once, instead of firing on each fragment and answering three times.",
        },
      ],
      results:
        "Live with merchants across 6 commerce platforms, handling product discovery, support, and checkout in three dialects.",
    },
  },
  {
    title: "AI Collaborative Workspace",
    slug: "ai-collaborative-workspace",
    categories: ["AI/ML", "Backend", "Full-Stack"],
    description:
      "Graduation project: a team workspace with an assistant that answers from the org's own documents, files, and databases instead of general knowledge, and cites where each answer came from.",
    tags: ["FastAPI", "RAG", "pgvector", "React", "PostgreSQL"],
    status: "Ongoing",
    featured: false,
    caseStudy: {
      problem:
        "A team's real knowledge is spread across documents, databases, and chat history, so a general chatbot is useless for it. People need answers that come from their own material, with a pointer to the source.",
      approach:
        "A RAG pipeline over PostgreSQL/pgvector pulls answers straight from the org's documents, files, and databases and cites the source. The backend is split into FastAPI services so each piece scales on its own.",
      decisions: [
        {
          title: "pgvector over a dedicated vector DB",
          reasoning: "Keeping the vectors in the same Postgres I already run means one database to deploy, back up, and reason about, instead of operating a separate vector store alongside it.",
        },
        {
          title: "FastAPI microservices",
          reasoning: "Auth, documents, AI, and collaboration are separate services, so a flood of AI queries doesn't slow down document uploads.",
        },
      ],
      results: "In progress: an assistant that answers from a team's own knowledge base and shows its sources.",
    },
  },
  {
    title: "ContextIQ: RAG API",
    slug: "contextiq-rag",
    categories: ["AI/ML"],
    description:
      "A RAG API that ingests 11+ file formats and answers questions over them, combining keyword and vector search with a caching layer.",
    tags: ["FastAPI", "ChromaDB", "LangChain", "Python"],
    github: "https://github.com/Ab-Romia/ContextIQ-RAG",
    demo: "https://huggingface.co/spaces/Ab-Romia/Context-Aware-AI",
    status: "Demo",
    featured: true,
    impact: "Hybrid retrieval over 11+ file formats: keyword + vector, fused with RRF",
    caseStudy: {
      problem:
        "Most RAG demos only ingest PDFs. The documents I needed to search were spread across 11+ formats, and pure vector search kept missing the exact-keyword matches people actually expect, like an error code or a name.",
      approach:
        "The API parses each format into clean text, then retrieves with both TF-IDF keyword search and vector similarity and fuses the two rankings. Repeated queries hit a cache instead of re-embedding.",
      decisions: [
        {
          title: "Hybrid retrieval with Reciprocal Rank Fusion",
          reasoning: "Pure semantic search misses exact terms like error codes or product names. RRF blends the keyword ranking and the vector ranking, so exact hits and semantic matches both surface.",
        },
        {
          title: "A caching layer",
          reasoning: "Repeated questions against the same corpus shouldn't re-embed anything. Caching them skips the work and the token spend on the queries that come up most.",
        },
      ],
      results: "Live API plus a HuggingFace Space where you can query it against your own files.",
      embedDemo: { type: "iframe", src: "https://ab-romia-context-aware-ai.hf.space" },
    },
  },
  {
    title: "Virtual Banking Microservices",
    slug: "virtual-banking",
    categories: ["Backend", "Full-Stack"],
    description:
      "An event-driven banking backend: independent services that talk over Kafka, plus a conversational assistant for account questions.",
    tags: ["Spring Boot", "Kafka", "Java", "LangChain", "Docker"],
    github: "https://github.com/Ab-Romia/Virtual-Bank-System",
    status: "Demo",
    featured: true,
    impact: "Kafka-decoupled microservices that scale independently",
    caseStudy: {
      problem:
        "In a monolithic banking backend, a surge in transaction processing drags down account lookups and login too, because everything shares one process. I wanted each part to scale on its own.",
      approach:
        "Spring Boot services communicate through Kafka topics instead of calling each other directly, so they stay decoupled. OAuth2 guards the gateway, and an assistant that answers account questions runs as its own service.",
      decisions: [
        {
          title: "Kafka over synchronous REST between services",
          reasoning: "A ledger can tolerate eventual consistency, and decoupling stops one failure from cascading. If notifications go down, transactions still post.",
        },
        {
          title: "The assistant as a separate service",
          reasoning: "Keeping it out of the core banking code means I can update the model, A/B test it, or roll it back without redeploying the ledger.",
        },
      ],
      results: "A working banking backend: transfers, account management, and an assistant, each as its own service.",
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
        "Audio-only or face-only models miss a lot. Tone of voice and facial expression disagree often enough that using both does better than either on its own.",
      approach:
        "Cross-modal attention model fusing HuBERT audio and EfficientNet visual encoders with bidirectional attention and learnable modality weights.",
      decisions: [
        {
          title: "Cross-modal attention instead of late fusion",
          reasoning: "Concatenating audio and video features at the very end lets each stream stay in its own silo. Bidirectional attention lets the audio attend to the video and the other way around, so a flat tone paired with a smiling face gets reconciled rather than averaged.",
        },
        {
          title: "Learnable modality weights",
          reasoning: "Audio and video aren't equally reliable for every emotion. The model learns how much to trust each stream per sample instead of weighting them equally up front.",
        },
      ],
      results: "Upload a clip on the HuggingFace Space and it returns the predicted emotion across 8 classes.",
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
        "Generic AI text reads flat because it has no personal fingerprint. Everyone's writing has measurable habits: sentence length, punctuation, the words they reach for.",
      approach:
        "Style learning system using Sentence-BERT embeddings and 20+ stylometric features to build and apply personal writing profiles.",
      decisions: [
        {
          title: "Embeddings plus explicit stylometrics",
          reasoning: "Sentence-BERT captures semantic voice but misses concrete habits like average sentence length or how often someone uses commas. Pairing the embeddings with 20+ measured features gives the profile something interpretable to anchor on.",
        },
        {
          title: "A per-person profile, not one global model",
          reasoning: "Style is individual. Building a profile from each person's own samples means the system rewrites toward that specific fingerprint instead of a generic average of 'human' writing.",
        },
      ],
      results: "Paste a few samples on the HuggingFace Space and it rewrites new text in that style.",
      embedDemo: { type: "iframe", src: "https://ab-romia-voiceprint-humanizer.hf.space" },
    },
  },
  {
    title: "Connect4 AI Agent",
    slug: "connect4-ai",
    categories: ["Games/Puzzles"],
    description:
      "A Connect 4 agent that searches the game tree with minimax and alpha-beta pruning.",
    tags: ["AI", "Python", "Game Theory"],
    github: "https://github.com/Ab-Romia/AI_Connect4_Agent",
    demo: "https://huggingface.co/spaces/Ab-Romia/connect4-ai",
    status: "Deployed",
    caseStudy: {
      problem:
        "Connect 4 has over 4 trillion positions, so you can't search all of them. The agent has to look far enough ahead to play well inside a move-time budget.",
      approach:
        "Minimax with alpha-beta pruning skips the branches that can't change the outcome, so it searches several moves deeper for the same cost and plays a strong game within the time budget.",
      decisions: [
        {
          title: "Alpha-beta pruning over plain minimax",
          reasoning: "Plain minimax explores the whole tree to a given depth. Alpha-beta skips branches that can't beat what's already been found, which roughly doubles the depth reachable in the same time: the difference between a weak opponent and a strong one.",
        },
        {
          title: "Move ordering to make the pruning pay off",
          reasoning: "Alpha-beta only prunes well if strong moves are tried first. Searching center columns before edges (they win more often in Connect 4) cuts far more branches than going left to right.",
        },
      ],
      results: "Play it in the browser; the agent runs entirely client-side.",
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
        "Brute-forcing a hard Sudoku is slow. With the right constraint propagation, most puzzles collapse to a solution with little or no backtracking.",
      approach:
        "Constraint satisfaction with backtracking, AC-3 arc consistency preprocessing, and MRV heuristic for intelligent variable ordering.",
      decisions: [
        {
          title: "AC-3 arc consistency before any search",
          reasoning: "Propagating constraints first strips impossible values from every cell up front. Many puzzles fall out from propagation alone, and the rest start from a much smaller search space.",
        },
        {
          title: "MRV heuristic for variable ordering",
          reasoning: "When search is still needed, filling the cell with the fewest remaining candidates first fails fast on dead ends and keeps the branching factor low, instead of marching through the grid in row order.",
        },
      ],
      results: "Solve any grid in the browser. The Solve button runs the CSP solver and fills a valid solution in well under a second.",
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
    role: "Software Engineer & Co-Founder",
    url: "https://zaylon.ai",
    period: "May 2025 – Present",
    description: "Co-founded and built the full-stack platform: Next.js merchant dashboard, FastAPI backend with PostgreSQL/Redis, Docker deployment, and multi-agent AI system serving MENA merchants across WhatsApp, Instagram, and web.",
    highlights: [
      "Built full-stack platform: Next.js/React merchant dashboard with real-time inbox, analytics, and A/B testing on top of a FastAPI Python backend with Docker containerized deployment",
      "Integrated 6 e-commerce platforms (Shopify, Salla, WooCommerce, Odoo, YouCan, Zoho) via REST APIs with webhook-driven sync, idempotent operations, and retry logic",
      "Built a multi-agent LangGraph system where a supervisor routes each conversation to one of 3 agents (Sales, Support, Checkout), each scoped to only the AI tools its job needs",
      "Built DialectBridge, an NLP pipeline that detects whether a customer is writing English, Egyptian Arabic, or Franco-Arabic and answers in the same dialect",
      "Built hybrid product search combining keyword matching, semantic vector similarity, and Reciprocal Rank Fusion scoring, running across WhatsApp and Instagram",
      "Batched rapid-fire WhatsApp messages in Redis into a single turn before invoking the agent, so it reads the whole thought at once instead of replying to each fragment",
      "Built multi-tenant architecture with per-merchant encryption, row-level data isolation, and webhook-verified payment processing through Stripe, Paymob, and Fawry",
    ],
  },
  {
    company: "Ejada",
    role: "Software Integration Engineering Intern",
    period: "Jul 2025",
    description: "Worked on core banking integration systems, building APIs and event-driven messaging pipelines.",
    highlights: [
      "Built RESTful API endpoints for core banking operations using Spring Boot with query optimization and Redis caching for frequently accessed account data",
      "Configured Apache Kafka producers and consumers for asynchronous transaction processing, decoupling payment events from the main request lifecycle",
      "Implemented API gateway security with OAuth2 authentication, rate limiting, and request validation using WSO2 API Manager",
    ],
  },
  {
    company: "Freelance",
    role: "AI Coding Expert",
    type: "Independent Contractor",
    period: "Sep 2024 – Feb 2026",
    description: "Evaluated and improved LLM-generated code across multiple platforms, contributing to RLHF training data for frontier AI models.",
    highlights: [
      "Evaluated LLM-generated coding solutions across Python, backend systems, and algorithmic problems for RLHF data pipelines used to train frontier AI models",
      "Developed quality rubrics and prompting strategies for code generation, measuring correctness, efficiency, style adherence, and edge case handling",
      "Reviewed and ranked thousands of code samples, providing detailed feedback on reasoning chains, code structure, and technical accuracy",
    ],
  },
  {
    company: "Swift-ACT",
    role: "Automotive Cybersecurity Intern",
    period: "Aug 2024 – Oct 2024",
    description: "Contributed to automotive cybersecurity research, building security scenario catalogs and running attack simulations in vehicle simulation environments.",
    highlights: [
      "Built security scenario catalogs with threat models, attack vectors, and mitigations for CAN bus and ECU communication systems following automotive cybersecurity standards",
      "Designed and ran cybersecurity test scenarios in Dyna4 and CARLA, covering spoofing, replay, and denial-of-service attacks on vehicle CAN networks",
      "Used Vector CANoe for CAN bus simulation and analysis, monitoring message traffic, injecting fault conditions, and validating ECU response behavior under adversarial inputs",
      "Conducted fuzz testing on Automotive Emergency Braking (AEB) components, identifying edge cases in sensor fusion timing and brake actuation logic under corrupted input data",
    ],
  },
] as const;

export const SKILLS = {
  Backend: [
    "Spring Boot", "FastAPI", "Microservices", "Kafka",
    "REST APIs", "PostgreSQL", "Redis", "Webhooks",
  ],
  "AI / ML": [
    "LangGraph", "LangChain", "PyTorch", "RAG",
    "ChromaDB", "pgvector", "NLP", "Computer Vision",
  ],
  "DevOps & Cloud": [
    "Docker", "Git", "GitHub Actions", "AWS",
    "Google Cloud", "Linux", "Bash",
  ],
  Languages: ["Python", "Java", "Go", "SQL", "TypeScript", "C/C++"],
} as const;

export const EDUCATION = {
  university: "Alexandria University, Faculty of Engineering",
  degree: "B.Sc. in Computer Engineering, AI Minor",
  gpa: "3.73 / 4.0",
} as const;

export const CERTIFICATIONS = [
  { name: "micro1 Certified Software Engineer", issuer: "micro1", year: "2026", image: "/certs/micro1.jpg" },
  { name: "Google AI Agents Intensive", issuer: "Google / Kaggle", year: "2025" },
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
  bio: "I co-founded Zaylon AI and wrote most of it: the Next.js dashboard, the FastAPI backend, and the LangGraph agents that sell over WhatsApp and Instagram. I'm comfortable across the stack and lean toward backend and AI. B.Sc. in Computer Engineering with an AI minor from Alexandria University. I speak English, Arabic, German, and Spanish, and I play guitar.",
} as const;

