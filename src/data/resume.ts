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
  { label: "B.Sc. Computer & Communications Engineering", detail: "AI concentration" },
] as const;

export const NAV_LINKS = [
  { label: "Zaylon", href: "#zaylon" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
] as const;

export const ZAYLON_SHOWCASE = {
  title: "Zaylon AI",
  role: "Software Engineer & Co-Founder",
  heading: "Zaylon AI",
  subtitle: "Conversational commerce for MENA merchants, on WhatsApp and Instagram",
  description:
    "Zaylon turns WhatsApp and Instagram into full sales channels for MENA merchants. Customers browse, ask in their own dialect, and check out without ever leaving the chat. It reads Egyptian Arabic and Franco-Arabic the way a local would, matches a product from a photo, recovers carts on its own, and carries someone from the first question to a paid order. We built the dialect engine and the conversational commerce layer in-house.",
  url: "https://zaylon.ai",
  highlights: [
    { label: "Platforms", detail: "Shopify, Salla, WooCommerce, Odoo, YouCan, Zoho", value: 6 },
    { label: "Channels", detail: "WhatsApp, Instagram, Messenger, Telegram, TikTok", value: 5 },
    { label: "Payments", detail: "Stripe, Paymob, Fawry", value: 3 },
    { label: "Dialects", detail: "English, Egyptian Arabic, Franco-Arabic", value: 3 },
  ],
  features: [
    "Handles the whole conversation end to end: answers product questions, builds the cart, and closes the order, all inside the same chat and without a human stepping in.",
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
  /** Internal path to a related blog write-up, e.g. "/blog/<slug>". */
  blog?: string;
  caseStudy: CaseStudy;
}

export const PROJECTS: Project[] = [
  {
    title: "Zaylon AI",
    slug: "zaylon-ai",
    categories: ["AI/ML", "Backend", "Full-Stack"],
    description:
      "An AI that sells over WhatsApp and Instagram for MENA merchants, carrying a customer from the first product question to a confirmed payment, all inside the chat.",
    tags: ["LangGraph", "Python", "FastAPI", "Shopify", "Next.js"],
    url: "https://zaylon.ai",
    status: "Production",
    badge: "Co-Founded",
    featured: true,
    impact: "LangGraph tool-calling agent and tri-lingual NLP on a multi-tenant FastAPI backend",
    caseStudy: {
      problem:
        "MENA shoppers do a lot of their buying over WhatsApp and Instagram, but merchants can't sit in those chats around the clock. Off-the-shelf chatbots fall apart on Egyptian Arabic and Franco-Arabic, and they can't carry someone from a question all the way to a paid order.",
      approach:
        "I built it in LangGraph as one tool-calling agent with about 30 scoped tools spanning sales, support, and checkout. It began as a multi-agent supervisor that routed to separate Sales, Support, and Checkout agents; I consolidated it into a single agent that proved more reliable and easier to reason about. Dialect detection runs first, so the customer is answered in the language they wrote in, and the same flow carries a conversation from the first product question to a confirmed payment.",
      decisions: [
        {
          title: "LangGraph over plain LangChain",
          reasoning: "A state machine lets me pin down exactly which transitions are legal between browsing, carting, and checkout. Plain chains drift, and in a flow that ends in a payment I can't afford drift.",
        },
        {
          title: "Consolidated to a single tool-calling agent",
          reasoning: "It started as a multi-agent supervisor routing to separate agents. A single agent with scoped tools turned out to be more reliable and far easier to reason about: fewer handoffs to get wrong and one place to trace a conversation, while tool-level scoping still limits what any single step can touch.",
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
    title: "Talos",
    slug: "talos",
    categories: ["AI/ML", "Backend"],
    description:
      "Graduation project (team): a multi-user RAG platform for chatting with your own uploaded documents, with answers streamed back and cited inline. I owned the ingestion and retrieval core.",
    tags: ["FastAPI", "RAG", "Milvus", "MinIO", "Redis/ARQ"],
    status: "Ongoing",
    featured: false,
    caseStudy: {
      problem:
        "A team's real knowledge lives in its own documents, so a general chatbot is useless for it. People need answers grounded in their own files, with a pointer to where each answer came from.",
      approach:
        "Talos is a team project; I owned the ingestion and retrieval core. Files upload to MinIO, and an async ARQ worker ingests them through a race-safe processing state machine. Retrieval runs in two stages: a dense plus BM25 hybrid fused with reciprocal rank fusion, then a cross-encoder reranker, streamed back over SSE with inline citations. I also built Google Drive import and a statistical evaluation harness to measure retrieval quality.",
      decisions: [
        {
          title: "Milvus for vector search, MinIO for files",
          reasoning: "A dedicated vector store handled the hybrid dense and sparse retrieval the project needed at scale, while MinIO held the raw uploads separately so storage and search could each be reasoned about on their own.",
        },
        {
          title: "Async ingestion with a race-safe state machine",
          reasoning: "Uploads process in the background through an ARQ worker. A processing state machine keeps concurrent uploads and retries from corrupting a document's state, so a half-ingested file can never be queried as if it were ready.",
        },
        {
          title: "Two-stage retrieval with reranking",
          reasoning: "Hybrid retrieval with reciprocal rank fusion casts a wide net, then a cross-encoder reranker sharpens the top results before they reach the model. The evaluation harness is what told me the reranker was worth its latency.",
        },
      ],
      results: "In progress: teams chat with their own documents and get answers streamed back with inline citations, with a statistical harness measuring retrieval quality.",
    },
  },
  {
    title: "ContextIQ: Hybrid-Retrieval RAG",
    slug: "contextiq-rag",
    categories: ["AI/ML"],
    description:
      "A worked example of production RAG that runs on CPU: dense and lexical retrieval fused with reciprocal rank fusion, cross-encoder reranking, grounded citations, and an evaluation harness that measures the difference.",
    tags: ["FastAPI", "fastembed", "BM25", "ChromaDB", "Python"],
    github: "https://github.com/Ab-Romia/ContextIQ-RAG",
    demo: "https://huggingface.co/spaces/Ab-Romia/Context-Aware-AI",
    blog: "/blog/contextiq-hybrid-rag-retrieval",
    status: "Demo",
    featured: true,
    impact: "Hybrid retrieval plus reranking measured on a confusable corpus: best precision at the top, hit@3 0.83 and MRR 0.78, against a dense-only baseline at 0.67",
    caseStudy: {
      problem:
        "Most RAG tutorials stop at embed, retrieve top-k, paste into a prompt. That falls apart on real questions: pure vector search misses exact terms like an error code or a name, struggles to separate passages that look alike, and nobody measures whether retrieval is any good. I wanted to build the part that comes after the tutorial, and prove it works.",
      approach:
        "Each query runs dense semantic search and lexical BM25 in parallel, fused with reciprocal rank fusion, then a cross-encoder reranks the top of a deliberately deep candidate pool. The model answers only from the reranked passages, cites each claim, and abstains when the context does not cover the question. An evaluation harness indexes a document plus six distractor handbooks and scores four retrievers over the whole corpus, so the gains are measured rather than asserted.",
      decisions: [
        {
          title: "Hybrid retrieval fused with Reciprocal Rank Fusion",
          reasoning: "Dense search captures meaning but smooths over exact terms; BM25 is the opposite. Fusing by rank rather than raw score combines them without trying to reconcile incompatible scales. In the evaluation, hybrid put the right passage in the top five 94% of the time, where dense-only managed 72%.",
        },
        {
          title: "Cross-encoder reranking on a deep candidate pool",
          reasoning: "A reranker reads the query and a passage together, which is far more accurate than comparing vectors but too slow to run over a whole corpus. Running it on a deep fused pool, not a shallow one, is what lets it pull the right passage up from rank twenty. It gave the best precision at the top, lifting hit@3 to 0.83 and nearly doubling MRR over hybrid alone.",
        },
        {
          title: "Measuring retrieval instead of trusting it",
          reasoning: "I built a golden set over a corpus seeded with confusable distractor documents and ran an ablation across TF-IDF, dense, hybrid, and hybrid-plus-rerank. The honest result, that naive dense-only retrieval was the weakest configuration, is exactly the kind of thing you only learn by measuring.",
        },
        {
          title: "CPU only, no GPU, no PyTorch",
          reasoning: "Embeddings and reranking run through ONNX so the whole thing fits on a free 2-vCPU host. The interesting engineering is in the retrieval design, not the hardware, and the constraint keeps it honest.",
        },
      ],
      results: "A live HuggingFace Space where you can index your own document and watch the retrieval trace: dense and BM25 ranks, the fused order, rerank scores, and the cited passages that reach the model. The repository is written to be read, with the evaluation numbers and the reasoning behind each stage.",
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
      "Speaker-independent speech emotion recognition on RAVDESS, rebuilt to remove a speaker-leakage flaw that inflates most published results. WavLM-large audio with learnable layer-weighting, fused with a facial-expression model.",
    tags: ["PyTorch", "WavLM", "Speech", "Evaluation"],
    github: "https://github.com/Ab-Romia/RAVDESS-emotion-recognition",
    demo: "https://huggingface.co/spaces/Ab-Romia/RAVDESS-emotion-recognition",
    status: "Demo",
    featured: true,
    impact: "Honest speaker-independent: 78.8% audio-visual (calibrated late fusion) on a 70.3% audio base, all leak-free, where the common random split would fake the audio up to ~78% by memorizing speakers",
    caseStudy: {
      problem:
        "RAVDESS has 24 actors speaking the same two sentences. The usual random train/test split puts the same voices on both sides, so the model gets rewarded for recognizing the actor, not the emotion. That is why so many reported numbers sit in the 90s, and why my own earlier version looked better than it was.",
      approach:
        "Rebuilt around actor-disjoint cross-validation so no speaker is ever in both train and test. WavLM-large with a learnable weighted sum over its layers and attentive statistics pooling for audio, fused with a face model trained on expressions (not identities) through a small gated layer.",
      decisions: [
        {
          title: "Split by actor, and prove it with a test",
          reasoning: "The whole result hinges on no speaker leaking across the split, so a unit test fails if any actor appears in both the train and test side of any fold. The guarantee is mechanical, not a claim. The same model scores ~78% on a random split and 64.9% speaker-independent: the gap is pure leakage.",
        },
        {
          title: "Freeze the encoder instead of fine-tuning it",
          reasoning: "On 1440 clips, fine-tuning a 300M-parameter encoder overfit the training speakers and scored below a frozen-feature baseline. Freezing it and training only the pooling head generalized better to unseen actors, reaching 70.3%.",
        },
        {
          title: "Use expression features for the face, not identity features",
          reasoning: "ImageNet face features scored 89% when faces leaked but 35% on new faces: they were memorizing identity. Swapping to a facial-expression model lifted video-alone accuracy on unseen faces to 58%, so fusing it actually helps.",
        },
      ],
      results: "70.3% audio-only (in line with the peer-reviewed EmoBox speaker-independent range) and 78.8% audio-visual, speaker-independent. Naive joint fusion scored below audio alone; calibrated late fusion (train each modality separately, then weight their probabilities on validation) added a real 8.6 points from the face with no leak. Full write-up and methodology on the blog.",
      embedDemo: { type: "iframe", src: "https://ab-romia-ravdess-emotion-recognition.hf.space" },
    },
  },
  {
    title: "VoicePrint: Authorship Stylometry",
    slug: "voiceprint",
    categories: ["AI/ML"],
    description:
      "An engine that measures the fingerprint of how you write from your own samples, then adapts your own drafts toward that voice. Interpretable stylometric features paired with a StyleDistance neural style embedding and an in-context rewrite.",
    tags: ["NLP", "Stylometry", "StyleDistance", "Python"],
    github: "https://github.com/Ab-Romia/VoicePrint",
    demo: "https://huggingface.co/spaces/Ab-Romia/voiceprint",
    blog: "/blog/measuring-a-writing-voice",
    status: "Demo",
    featured: true,
    impact: "With zero content words, a 130-dimensional function-word vector separated five authors at 0.684 macro-F1 and 0.889 accuracy, against a 0.20 five-class baseline",
    caseStudy: {
      problem:
        "Your own writing carries a measurable fingerprint: sentence length, punctuation, the function words you reach for without thinking. I wanted to measure that fingerprint from a person's own samples and use it to pull their hurried drafts back toward their real voice, with numbers instead of guesswork.",
      approach:
        "Build a profile from your samples that combines interpretable stylometric features (sentence stats, lexical diversity, a fixed function-word vector, character n-grams, readability, punctuation) with a StyleDistance neural style embedding. Score how far a draft sits from your voice by cosine to the author centroid, adapt it with an in-context rewrite conditioned on the measured profile, and report the voice match before and after with a per-sentence diff.",
      decisions: [
        {
          title: "A content-independent neural fingerprint",
          reasoning: "StyleDistance is a 2024 style embedding trained so two texts in the same voice on different topics land near each other. That is the property a fingerprint needs, so the voice-match score is cosine to the author centroid rather than a generic sentence embedding that tracks topic.",
        },
        {
          title: "Interpretable features, measured honestly",
          reasoning: "I ran a real authorship experiment on the Gutenberg corpus, split by work to block topic leakage. Function words alone reached 0.684 macro-F1 with no content words at all, which is the topic-independent signal worth trusting. The near-perfect character n-gram score on that small set is inflated, and I say so in the writeup rather than quoting it as accuracy.",
        },
        {
          title: "An in-context rewrite, not a regex",
          reasoning: "The first version swapped synonyms and injected noise with regex, which was a dead end. The rewrite now conditions a single model call on your own exemplars and your measured constraints, bring your own key, with a deterministic rule fallback when there is no key.",
        },
      ],
      results: "A live HuggingFace Space where you build a voice fingerprint from your samples, see it as a radar chart, and adapt a draft with the voice match before and after and a per-sentence diff. The repository ships the engine, a reproducible experiment, and a build guide.",
      embedDemo: { type: "iframe", src: "https://ab-romia-voiceprint.hf.space" },
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
    description: "Co-founded Zaylon and built its AI system and backend: a LangGraph tool-calling agent and tri-lingual NLP on a FastAPI backend with PostgreSQL/Redis, multi-tenant isolation, and Docker deployment, serving MENA merchants across WhatsApp, Instagram, and web.",
    highlights: [
      "Built the conversational AI in LangGraph as a single tool-calling agent with about 30 scoped tools across sales, support, and checkout, consolidated from an earlier multi-agent supervisor for reliability and easier reasoning",
      "Built DialectBridge, an NLP pipeline that detects whether a customer is writing English, Egyptian Arabic, or Franco-Arabic and answers in the same dialect",
      "Built hybrid product search combining keyword matching, semantic vector similarity, and Reciprocal Rank Fusion scoring",
      "Wrote the FastAPI Python backend and its service architecture, containerized with Docker for deployment",
      "Built multi-tenant security: argon2id key auth, per-merchant row-level isolation across roughly 80 tables, and semgrep CI gates enforcing tenant scoping",
      "Built a Postgres-backed saga engine with reverse-order compensation so a failed checkout step rolls back cleanly",
      "Batched rapid-fire WhatsApp messages in Redis into a single turn before invoking the agent, so it reads the whole thought at once instead of replying to each fragment",
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
    "Docker", "Git", "GitHub Actions", "Railway",
    "Linux", "Bash",
  ],
  Languages: ["Python", "Java", "SQL", "TypeScript", "C/C++"],
} as const;

export const EDUCATION = {
  university: "Alexandria University, Faculty of Engineering",
  degree: "B.Sc. in Computer and Communications Engineering, AI concentration",
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
  bio: "I co-founded Zaylon AI and built its AI system and backend: the LangGraph agent that sells over WhatsApp and Instagram, the tri-lingual NLP, and the FastAPI backend behind them. I work across the stack but lean toward backend and AI. B.Sc. in Computer and Communications Engineering with an AI concentration from Alexandria University. I speak English, Arabic, German, and Spanish, and I play guitar.",
} as const;

