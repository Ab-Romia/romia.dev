export const PERSONAL = {
  name: "Abdelrahman Abouroumia",
  displayName: "Romia",
  title: "AI & Backend Engineer",
  email: "aabouroumia@gmail.com",
  tagline:
    "I build LLM agents, RAG systems, and the backends they run on. At Zaylon AI, the company I co-founded, the agent I built takes a shopper from the first product question to a paid order inside WhatsApp and Instagram, in their own dialect.",
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
  { label: "Projects", href: "#projects" },
  { label: "Zaylon", href: "#zaylon" },
  { label: "commentdraft", href: "#commentdraft" },
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
    { label: "Channels", detail: "WhatsApp, Instagram, Messenger, TikTok, Web chat", value: 5 },
    { label: "Payments", detail: "Stripe, Paymob, Fawry", value: 3 },
    { label: "Dialects", detail: "English, Egyptian Arabic, Franco-Arabic", value: 3 },
  ],
  features: [
    "Handles the whole conversation end to end: answers product questions, builds the cart, and closes the order, all inside the same chat and without a human stepping in.",
    "DialectBridge detects whether a customer is writing English, Egyptian Arabic, or Franco-Arabic and answers back in the same dialect.",
    "Customers can send a photo of a product, and Zaylon matches it against the merchant's catalog.",
    "Follows up on abandoned carts and steps in when a conversation starts to turn negative.",
    "A merchant dashboard with a live inbox, analytics, RFM segmentation, and A/B testing.",
    "Each merchant's data is encrypted on its own and isolated at the row level, so tenants never see each other.",
  ],
  techStack: [
    "LangGraph", "FastAPI", "Supabase", "Next.js", "PostgreSQL",
    "pgvector", "Redis", "GPT-4o", "Gemini", "Docker",
  ],
} as const;

/* ── commentdraft ──────────────────────────────────────────────────────────
   No volume counts here on purpose. Lines of source, lines of tests and a
   test total measure how much was typed, not whether any of it was right, and
   a portfolio that leads with them is bragging about weight. Numbers appear
   below only where the number IS the finding: what the tool decided on a real
   run, and what the prompt cache turned out to be worth.

   Nothing here may imply a connector has been pointed at a real account.
   One connector is published, for Facebook Pages, and it has never been run
   against a live Page. A YouTube connector exists only on an unmerged local
   branch, so nothing on this site may count it: every claim here has to hold
   against github.com/Ab-Romia/commentdraft at main, which is where the links
   send the reader. Raise these numbers when the branch is pushed, not before. */
export const COMMENTDRAFT_SHOWCASE = {
  title: "commentdraft",
  role: "Author. Apache-2.0, on PyPI.",
  subtitle: "A command line tool that drafts replies to comments, and refuses to send them",
  description:
    "It reads the comments on a creator's own posts and decides, for each one, whether to reply, skip, or escalate to a person. Every decision comes back with a one-line reason the operator can disagree with, and every draft is written from one source document they supply. What the tool is, more than any of that, is a set of refusals.",
  repo: "https://github.com/Ab-Romia/commentdraft",
  pypi: "https://pypi.org/project/commentdraft/",
  install: "pip install commentdraft",
  guidesHref: "/commentdraft",
  /* The spec plate: what the tool will not do, which is the product. Each one
     is enforced somewhere a reader can go and check. */
  refusals: [
    {
      head: "It will not send without you",
      body: "No --yes, no --all, and no config key that changes it. Publishing thirty replies costs thirty keystrokes, which is the design and not an oversight. The release on PyPI today is the drafting half: it reads a CSV, writes a page of drafts, and exits.",
    },
    {
      head: "It will not answer past the source",
      body: "A draft may state only what your document states. A question the document does not cover becomes a person's to answer, never a guess.",
    },
    {
      head: "It will not claim reach it lacks",
      body: "One connector exists, for Facebook Pages, and it has never been run against a live Page. The other seven platforms have guides, not code.",
    },
  ],
} as const;

/* What the tool decided, read out of `out/showcase/review.csv`: the same run
   the review page screenshot on the case study was rendered from, so the two
   agree. Comments and reasons are verbatim, never paraphrased. */
export const COMMENTDRAFT_TRIAGE = {
  label: "One published run",
  total: 11,
  counts: [
    { decision: "reply", n: 4 },
    { decision: "skip", n: 3 },
    { decision: "escalate", n: 4 },
  ],
  samples: [
    {
      decision: "reply",
      comment: "Does it cover mushrooms at all?",
      reason: "content question about a subject the book deliberately excludes",
    },
    {
      decision: "skip",
      comment: "This is a scam you are just here to sell a book",
      reason: "accusation rather than an objection, answering it widens the argument",
    },
    {
      decision: "escalate",
      comment: "I have a nut allergy is any of this dangerous for me",
      reason: "health question beyond the scope of the book, directed to medical professional",
    },
  ],
  closing: "Seven of the eleven got no draft at all.",
  provenance:
    "Verbatim from a run of the shipped example, written up with the command that reproduces it.",
} as const;

/* Read against live documentation on 2026-08-01, the date every guide carries.
   `connector: "ships"` is true of exactly one row, Facebook Pages. */
export const COMMENTDRAFT_GUIDES = {
  honesty:
    "The guides document how to connect. The code connects to one of them, Facebook Pages, built and tested against fakes and never run against a live Page. Nobody has made a call on any of the eight, the one with a connector included.",
  closing:
    "The first four need no permission from anybody. The last four each need a human at the platform to say yes, and three of the four publish no idea of how long that takes.",
  lesson:
    "Written across all eight, one pattern shows up that no single guide would have surfaced: where the received wisdom names an obstacle, the obstacle it names is either out of date or standing in front of a different one. The section worth reading on each page is not the published gate. It is the one headed \"What is still unknown\".",
} as const;

/* Copy for /commentdraft. The page is written for a stranger who wants to know
   whether they can reach a platform's comments at all, and who has never heard
   of the tool the guides came out of. */
export const COMMENTDRAFT_GUIDES_PAGE = {
  title: "Connecting to comment APIs on eight platforms",
  metaTitle: "Connecting to comment APIs on eight platforms",
  metaDescription:
    "What it takes to read and reply to comments through the APIs of YouTube, Instagram, Facebook, Threads, X, TikTok, LinkedIn and Reddit: the gate on each, roughly what it costs, and the order worth attempting them in. Read against live documentation on 2026-08-01, citing 226 distinct URLs.",
  lede: "Eight guides, one per platform, each written from the platform's own primary sources and each saying out loud how far the checking went. Every endpoint, scope string, quota number and policy clause carries the URL it came from and the date it was read. They came out of building commentdraft, and they are here because they did not exist.",
  /* "Primary sources cited" is distinct http(s) URLs across the eight guides,
     re-derivable in the commentdraft repository with:
     grep -ohE 'https?://[^ )>,"`]+' docs/platforms/{facebook,instagram,linkedin,reddit,threads,tiktok,x,youtube}.md \
       | sed 's#[.,;)]*$##' | sort -u | wc -l
     Run it against main, the branch these links point at, not a working
     branch. Anything published here must come back from that command. */
  meta: [
    { label: "Read against live docs", value: "2026-08-01" },
    { label: "Platforms covered", value: "8" },
    { label: "Distinct URLs cited", value: "226" },
    { label: "Connectors built", value: "1" },
  ],
  orderHeading: "The order worth attempting them in",
  orderIntro:
    "Numbered by how much stands between you and a first working call, not by how much you want the platform.",
  lessonHeading: "The published blocker is rarely the real one",
  closingHeading: "Where the rest of it lives",
  closing:
    "Each guide carries its own verification section saying which claims were read twice, which rest on a single reading, and which cannot be settled without credentials. Two further pages carry what is the same everywhere: platform-policy.md maps each safety property in the tool to the clause that made it necessary, and limits.md is what the tool cannot do regardless of platform.",
} as const;

export type CommentdraftPlatform = {
  name: string;
  slug: string;
  /** "ships" is true of Facebook Pages, and of nothing else. */
  connector: "ships" | "none";
  /** Open means no permission is needed from the platform for a single operator. */
  access: "open" | "gated";
  reply: string;
  blocker: string;
  cost: string;
  attempt: string;
};

export const COMMENTDRAFT_PLATFORMS: CommentdraftPlatform[] = [
  {
    name: "Facebook Pages",
    slug: "facebook",
    connector: "ships",
    access: "open",
    reply: "Documented, and Meta documents two readings of the same call",
    blocker:
      "Nothing to clear. An operator who owns the Page and makes their own app needs no App Review and no Business Verification.",
    cost: "No fee. Under an hour from a standing start, by my own estimate.",
    attempt:
      "Start here even if Facebook is not the platform you want. It is a route where nothing is queued and nobody reads anything, so it tells you whether the rest of the tool suits you before you spend a review cycle finding out.",
  },
  {
    name: "Instagram",
    slug: "instagram",
    connector: "none",
    access: "open",
    reply: "Documented",
    blocker:
      "Nothing, for your own professional account at Standard Access. The comments webhook is the exception and needs Advanced Access.",
    cost: "No fee. Polling instead of webhooks is the price of skipping App Review.",
    attempt:
      "Same Meta app, same Graph host, same token concepts. Accept polling in the first version and the whole App Review branch disappears.",
  },
  {
    name: "Threads",
    slug: "threads",
    connector: "none",
    access: "open",
    reply: "Documented, a two-step container then publish",
    blocker:
      "Nothing, for the single-operator path. Anything beyond it needs App Review, which is not reachable until a Business has completed Business Verification.",
    cost: "No fee. Business Verification is company paperwork, not a build.",
    attempt:
      "Gate-free for a single operator, but on its own hosts with its own two-step publish and its own two expiry clocks. More build than Instagram for the same amount of paperwork, which is none.",
  },
  {
    name: "YouTube",
    slug: "youtube",
    connector: "none",
    access: "open",
    reply: "Documented, 50 quota units a call, or 52. Google's own page carries both",
    blocker:
      "A 10,000 unit daily quota, so 200 replies a day at the ceiling, 192 if a reply costs 52. An app left in Testing gets refresh tokens that expire in 7 days.",
    cost: "No fee, and no pricing page exists. OAuth verification, which Google says \"can take up to 10 days\", once anyone but you uses it.",
    attempt:
      "The gate here is paperwork rather than code: no review and no money for your own channel, and the approval gate this tool already has is a policy requirement here rather than a product opinion. What it costs is arithmetic: 50 units a reply, or 52, against 10,000 units a day, minus whatever polling spends.",
  },
  {
    name: "Reddit",
    slug: "reddit",
    connector: "none",
    access: "gated",
    reply: "Documented",
    blocker:
      "Access is granted rather than taken. The Responsible Builder Policy requires approval before the first call, through a support ticket.",
    cost: "Free at 100 queries per minute per OAuth client id. No turnaround is published for the ticket.",
    attempt:
      "File the ticket early, because it is the only thing on this list where the waiting can start before the building does. Read the 48 hour deletion rule first: it reshapes what a review queue is allowed to keep.",
  },
  {
    name: "X",
    slug: "x",
    connector: "none",
    access: "gated",
    reply:
      "Unsettled. A programmatic reply is permitted only when the author summoned you, and nobody has established whether replying on your own post counts.",
    blocker:
      "Prior written approval from X before replies written by software are deployed. No published turnaround, no queue position, no appeal, and no self-serve path.",
    cost: "About $3 a month at 500 comments read and 250 replies published. The $100, $200 and $5,000 figures still dominating search results are for a product X stopped selling on 2026-02-06.",
    attempt:
      "Two questions with no published answer: whether the approval requirement covers a tool with a person approving each reply, and whether replying on your own post counts as being summoned. The second is settleable in an afternoon with a live call and it can make the first moot, so settle it before writing any connector code.",
  },
  {
    name: "TikTok",
    slug: "tiktok",
    connector: "none",
    access: "gated",
    reply: "Documented, on business-api.tiktok.com",
    blocker:
      "The developer of record must be a company with a matching domain. A solo consultant cannot register.",
    cost: "No published fee. Three reviews: \"three business days\", \"2 to 3 business days\", and a form with no published turnaround.",
    attempt:
      "Attempt only if the developer of record is a company. The requirement lands on whoever registers the app and not on the account being moderated, so a creator with a personal account can be covered by an app a company they work with registers.",
  },
  {
    name: "LinkedIn",
    slug: "linkedin",
    connector: "none",
    access: "gated",
    reply: "Documented",
    blocker:
      "A two-stage partner review, and above it the Member Data question. The Marketing API Terms prohibit exporting Member Data to a third party and define it to include a member's comment; whether a model gateway is a third party or the operator's own service provider is unsettled, and passing the review would not answer it.",
    cost: "No price published on any LinkedIn property. No SLA published for either review stage.",
    attempt:
      "Last, because the review is long and the question above it is unanswered. Settle the Member Data reading with somebody qualified before spending a fortnight on a partner application, since a no there ends the project rather than delaying it.",
  },
];

export function commentdraftGuideUrl(slug: string): string {
  return `https://github.com/Ab-Romia/commentdraft/blob/main/docs/platforms/${slug}.md`;
}

/* Corrections found by adversarially verifying the research rather than
   trusting it. Each is quoted or paraphrased from the guide that carries the
   primary source. */
export const COMMENTDRAFT_FINDINGS = {
  heading: "What checking the sources turned up",
  items: [
    {
      platform: "Instagram",
      title: "An id that resolves nothing and raises no error",
      body: "GET /me?fields=id returns the app-scoped id, not the account id. It never matches the webhook payload, resolves nothing, and fails silently. The field that works is user_id.",
    },
    {
      platform: "TikTok",
      title: "The published blocker is not the real one",
      body: "\"TikTok has no comment API\" is true of developers.tiktok.com and false of business-api.tiktok.com, a different product line with two documented comment endpoints. What TikTok refuses is not the feature but the applicant: it will not onboard individual developers at all.",
    },
    {
      platform: "YouTube",
      title: "The channel owner cannot read the original text",
      body: "snippet.textOriginal is only returned to the comment's author, and a channel owner reading a viewer's comment is not that. A connector gets textDisplay, which Google documents as possibly differing from the original: \"it may replace video links with video titles\".",
    },
    {
      platform: "Reddit",
      title: "Every ampersand arrives escaped",
      body: "JSON bodies replace <, > and & with entities unless raw_json=1 is passed. Tom & Jerry reaches the model as Tom &amp; Jerry, and the review page escapes it again, so a person approves a reply drafted against text nobody wrote.",
    },
  ],
  closing:
    "The last two are the same class of bug on two different platforms: the text you receive is not the text the person wrote. Neither platform mentions it at the endpoint that returns it.",
} as const;

// Real production traction. Drop in a true usage number and it renders as a
// highlighted metric in the Zaylon showcase. Leave null to hide.
// Example: { value: "12K+", label: "conversations handled" }
export const ZAYLON_LIVE_METRIC: { value: string; label: string } | null = null;

// Path to a real merchant-dashboard screenshot under /public. When set, the
// showcase renders it in a framed figure. Example: "/zaylon-dashboard.png"
export const ZAYLON_DASHBOARD_IMAGE: string | null = null;

export type ProjectStatus = "Pre-launch" | "Live demo" | "Case study" | "Deployed" | "Completed";

interface TechnicalDecision {
  title: string;
  reasoning: string;
}

interface EmbedDemo {
  type: "iframe" | "component";
  src?: string;
  component?: string;
}

/** A real artefact from the project, rendered under the approach section. */
interface CaseStudyFigure {
  src: string;
  alt: string;
  caption: string;
  width: number;
  height: number;
}

/** A project-specific block rendered after the decisions, named the same way
 *  `embedDemo` names a component rather than inlining one. */
interface CaseStudyReference {
  heading: string;
  intro: string;
  component: "commentdraft-platforms";
}

interface CaseStudy {
  problem: string;
  approach: string;
  figure?: CaseStudyFigure;
  decisions?: TechnicalDecision[];
  reference?: CaseStudyReference;
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
    status: "Pre-launch",
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
        "Integrates 6 commerce platforms and 5 messaging channels, handling product discovery, support, and checkout across three dialects. Launching commercially in 2026.",
    },
  },
  {
    title: "commentdraft",
    slug: "commentdraft",
    categories: ["AI/ML", "Backend"],
    description:
      "A command line tool that triages comments on your own posts into reply, skip, or escalate, drafts the reply from one source document, and sends nothing a person has not approved one keystroke at a time.",
    tags: ["Python", "CLI", "Apache-2.0", "PyPI", "Platform APIs"],
    github: "https://github.com/Ab-Romia/commentdraft",
    url: "https://pypi.org/project/commentdraft/",
    status: "Deployed",
    badge: "On PyPI",
    featured: true,
    impact:
      "Eight platform connection guides written from primary sources, and a publish path with no way to approve in bulk: one keystroke, one reply",
    caseStudy: {
      problem:
        "I was building comment handling for paying clients, and the failure that mattered was never a crash. It was a public reply under someone's own post quoting a price that had changed, or answering a question the source material never covered. That lands on the client, in front of their audience, and nothing raises an exception. Sitting on top of it, every platform has rules about replying with software, and the documentation for those rules contradicts itself often enough that reading it properly is part of the work rather than a preliminary to it. What the job needed was a tool that could refuse: refuse to answer what it cannot source, refuse to send what a person has not read, and refuse to claim a reach it does not have.",
      approach:
        "One model call per comment, against a prefix assembled once and kept byte-identical for the whole run so the provider serves it from cache. The prefix carries the operator's voice rules, their worked examples, the output contract, and the entire source document, which the prompt instructs it to treat as the only thing it may state as fact. Every comment comes back as reply, skip, or escalate with a one-line reason the operator can disagree with, and the run writes a CSV and a review page. Publishing is a separate command that shows one comment and one draft and waits for a key. Reading a platform and writing to it are separate config tables holding separate credentials, so the starting posture holds no write credential and cannot post at all. The interesting parts of this design are all places where the obvious answer turned out to be wrong.",
      figure: {
        src: "/projects/commentdraft-review.png",
        width: 1585,
        height: 1398,
        alt: "The commentdraft review page: eleven comments in one table, each with its decision, the reason for it, and the draft reply where there is one. Rows that were answered are tinted green, rows escalated to a person are tinted pink and carry no draft, and skipped rows are untinted.",
        caption:
          "The reviewer artefact, rendered by commentdraft review from the run's own CSV rather than mocked up. Green was answered, pink goes to a person, plain was left alone. Seven of these eleven comments got no draft at all, which is the part worth reading. It closes on its own status line: nothing on the page has been posted anywhere.",
      },
      decisions: [
        {
          title: "The approval gate, and the keystrokes that walked straight through it",
          reasoning:
            "The first version read a key before each send, and I took that to be the gate. It was not. Five characters pasted into the terminal before the reply had rendered approved five replies nobody had read: the keys were already sitting in the input queue, and the read consumed them in order. A keystroke buffered before the content appears is not consent, it is timing. The gate now discards the terminal's input queue at the moment the prompt becomes readable and reads exactly one byte after that, and a test drives a real pty to prove the pasted case approves nothing. The rest of the property is structural rather than configurable, because a setting that exists is a setting somebody eventually turns on: there is no --yes and no --all, the config vocabulary is a frozen allowlist so a key of any name that could stand in for a keystroke fails the build until somebody writes it down, and an AST test fails if the send is named anywhere outside the one branch a keystroke reaches. YouTube's Developer Policies require express consent before each action, which makes this a compliance requirement on that platform rather than a product opinion.",
        },
        {
          title: "A safety claim I had to retire, and the grep that proved nothing",
          reasoning:
            "For a while the strongest line in the README was that no HTTP client existed anywhere in the package. It was true, it was checkable in one command, and it was about to stop being either the moment a connector shipped. It was also being checked badly: the command ran with --exclude=approve.py --exclude-dir=platforms, which excluded the only two paths a send would ever live in, so it proved the send was not somewhere it had never been. I replaced the claim rather than the connector. What survives a connector is that nothing reaches a platform a person did not read and approve, and that is what is enforced now, by a marker on the single send statement and an AST walk that fails the build if the send is referenced anywhere else, or referenced without being called, which is how an alias would otherwise carry it into a loop. A claim that is about to become false is worse than no claim, because people plan around it.",
        },
        {
          title: "A contradiction in Meta's documentation, answered with a runtime check",
          reasoning:
            "Meta documents one call as both \"reply to this comment\" and \"edit this comment\". Both readings are published, they cannot both be right, and the wrong one means every reply silently overwrites the customer's own words. I could not settle it from the documentation and I was not going to find out on somebody's Page, so the connector proves the outcome instead of assuming it: it compares the id the POST returned against the id it posted to, then reads the reply back and confirms it carries the right parent. A read-back that cannot be performed ends the whole run rather than the row, because a write path that edits comments will edit the next one too. The comparison allows for both of Facebook's spellings of a comment id, because the two ways of being wrong are not symmetric: a false positive halts a run over an overwrite that did not happen, which is recoverable, and a false negative destroys comments quietly.",
        },
        {
          title: "The cheap model that cost twenty-seven times more",
          reasoning:
            "I assumed the cheaper published rate meant the cheaper run. In the bake-off it cost about 27 times more per comment than the default, where the sticker prices alone predicted a gap near 8. The difference was the prompt cache. The prefix dominates the bill on every call here, and the default's route billed it at a reduced cached rate on 28 of its 29 calls while neither of the others was served from a cache at all. That measurement is why the prefix is assembled once and kept byte-identical, and why anything that varies per row, a timestamp, a row counter, a shuffled example order, costs every cache hit in the run rather than a little latency. It is also the reason there is no retrieval: while the source document fits the window there is nothing for a retriever to miss, and a retriever that misses is precisely the failure this tool exists to prevent. One run, one example, one gateway, one day, published with the command that reproduces it and the caveat that says to read it narrowly.",
        },
      ],
      reference: {
        heading: "Connecting it to a social platform",
        intro:
          "Reading and replying through a platform's own API is where most of the real work turned out to be, and almost none of it is code. Each of the eight platforms was researched from its own primary sources, with every endpoint, scope string, quota number and policy clause carrying the URL it came from and the date it was read, and each guide states near the top which of its claims were read twice and which cannot be settled without credentials. What follows is the short version: what stands between an operator and a first working call on each one.",
        component: "commentdraft-platforms",
      },
      results:
        "Published on PyPI under Apache-2.0, with a worked example in the repository, a fictional field guide with its knowledge file, its voice file and a small comment file, so the whole loop runs from a clone. The claims are built to be checked rather than believed: the test suite runs offline with no API key, the review page in the write-up is rendered by the tool from its own run rather than mocked up, and every figure in the documentation resolves to a command a reader can run. Eight platform connection guides carry the primary-source URL behind each endpoint, scope and quota, and the date each was read. What it does not do is stated in the same places: one connector exists, for Facebook Pages, and it has never been run against a live Page.",
    },
  },
  {
    title: "Talos: Workspace-Grounded RAG Assistant",
    slug: "talos",
    categories: ["AI/ML", "Backend"],
    description:
      "Graduation project (team): a team chat platform with a workspace-grounded RAG assistant that answers from your own documents, with citations. I owned the AI, retrieval, evaluation, and deployment.",
    tags: ["FastAPI", "RAG", "Milvus", "LangChain", "Evaluation"],
    github: "https://github.com/Ab-Romia/talos",
    status: "Completed",
    featured: true,
    impact:
      "Found the root cause of weak answers (over-fragmented chunks) and proved the fix with a paired, Holm-corrected eval: judged correctness 0.657 to 0.855 on the workspace's own corpus.",
    caseStudy: {
      problem:
        "A team's real knowledge lives in its own documents, so a general chatbot is useless for it. People need answers grounded in their own files, scoped per workspace, with a pointer to where each answer came from.",
      approach:
        "Talos is a team project; I owned the AI, retrieval, evaluation, and deployment track. Files upload to MinIO and a taskiq worker processes them out of band: parse, chunk by title, embed with bge-small, and write into a per-workspace Milvus collection. A question runs a dense plus BM25 hybrid fused with reciprocal rank fusion, then a cross-encoder reranker, and the model answers from the reranked passages only, streamed token by token with inline citations. When the assistant gave weak answers, I built a statistical harness that runs the exact production pipeline to find and prove the fix.",
      decisions: [
        {
          title: "Milvus for vector search, MinIO for files",
          reasoning: "A dedicated vector store handled the hybrid dense and sparse retrieval, one collection scoped per workspace, while MinIO held the raw uploads separately so storage and search could each be reasoned about on their own.",
        },
        {
          title: "Async ingestion so a half-ingested file is never queried",
          reasoning: "Uploads process in the background through a taskiq worker, and the API returns 202 immediately. A file only becomes retrievable once it's fully indexed, so a partial ingest can never surface as if it were ready.",
        },
        {
          title: "Measured retrieval instead of trusting it",
          reasoning: "When answers were weak, I traced it to over-fragmented chunks (1,778 fragments, median 67 characters) and proved the fix with a paired evaluation on the production pipeline. Chunk hygiene alone raised judged correctness by 18.6 points; the reranker earned its latency; the numbers, not a hunch, set the defaults.",
        },
      ],
      results: "Deployed on Railway with managed Milvus on Zilliz Cloud, demoed live at the defense (A+), then decommissioned. The retrieval fix is proven with a paired, Holm-corrected evaluation on the production pipeline: judged answer correctness rose from 0.657 to 0.855 on the workspace's own corpus. Full write-up in the case study.",
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
    status: "Live demo",
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
          reasoning: "A reranker reads the query and a passage together, which is far more accurate than comparing vectors but too slow to run over a whole corpus. Running it on a deep fused pool, not a shallow one, is what lets it pull the right passage up from rank twenty. It gave the best precision at the top, lifting hit@3 to 0.83 and MRR from 0.60 to 0.78 over hybrid alone.",
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
      "An event-driven banking system: a Spring Cloud Gateway fronting four core services, with a transfer saga over Kafka that holds up under concurrency, retries, and restarts, and tests that prove it.",
    tags: ["Spring Boot 3", "Kafka", "Java 21", "PostgreSQL", "Docker"],
    github: "https://github.com/Ab-Romia/Virtual-Bank-System",
    blog: "/blog/event-driven-bank-transfer-saga",
    status: "Case study",
    featured: true,
    impact:
      "A transfer saga with a transactional outbox, idempotent consumers, and pessimistic locking; a Testcontainers test fires twenty simultaneous transfers and proves no double-spend.",
    caseStudy: {
      problem:
        "Build a small bank where the money path is provably correct under concurrency, retries, and restarts. A transfer must not double-spend, must not drive a balance negative, must not move money twice when a request or event is retried, and must not lose or invent money if a service or the broker restarts. The system also needs authentication so no one can read or move another user's money, and an audit trail that records every step without dropping events.",
      approach:
        "I built it as a Spring Cloud Gateway fronting four core services: user-service for identity, account-service for balances and the atomic transfer, transaction-service for the transfer ledger and orchestration, audit-service for an event-sourced history, plus an optional Spring AI assistant. The system is synchronous over REST at the edge and event-driven in the core, where the transfer runs as a saga over a single KRaft Kafka broker on the transfer.commands and transfer.events topics. transaction-service writes a PENDING transfer and a TransferRequested event to its outbox in one transaction and returns 202; a relay publishes it to Kafka; account-service locks both accounts, applies the debit and credit atomically, and emits the result through its own outbox; transaction-service marks the outcome; audit-service records every event. Each service owns its own PostgreSQL database, and shared events, the outbox, and security live in a vbank-common Spring Boot starter. The whole stack comes up with one docker compose command.",
      decisions: [
        {
          title: "Synchronous at the edge, event-driven only in the core",
          reasoning: "Everything a client does is a synchronous REST request handled by the gateway. Only the transfer is event-driven: it returns 202 and settles on the Kafka path while the client polls. Keeping the split narrow means the asynchronous complexity is confined to the one operation that needs it, the money movement, rather than spread across the whole system.",
        },
        {
          title: "Transactional outbox so events are never lost",
          reasoning: "Saving a row and then publishing to Kafka leaves a gap where a crash loses the event or the state change. Writing the business row and the event into the same database in one transaction, then relaying outbox rows to Kafka afterwards, makes the event durable the moment the transaction commits and impossible to drop. The OUTBOX table lives in account-service and transaction-service, the two services that publish events, so a crash mid-transfer is safe.",
        },
        {
          title: "Idempotent consumers keyed by transfer id",
          reasoning: "Kafka delivers at least once, so account-service records each transfer id it applies in a processed-events table in the same transaction as the money movement. A redelivery finds the id already there and does nothing. The same transfer id is the idempotency key end to end, including the client's Idempotency-Key header, so re-posting a transfer returns the same one rather than creating a second.",
        },
        {
          title: "Pessimistic locking plus a CHECK (balance >= 0) constraint instead of a compensating saga",
          reasoning: "Both accounts live in account-service's database, so the debit and credit are a single ACID transaction protected by a pessimistic write lock taken in a fixed id order to avoid deadlocks, with the CHECK constraint as a database-level backstop. A multi-step compensating saga with refunds would add machinery this single-database transfer does not need, so it was left out and documented. A Testcontainers test fires twenty simultaneous transfers at one account funded with 100 and asserts exactly ten succeed, ten fail with insufficient funds, and the balance lands on exactly zero, never negative.",
        },
        {
          title: "RS256 JWT validated at the gateway and at every service",
          reasoning: "user-service signs the token and publishes its public keys at a JWKS endpoint. The gateway and every service validate it against that JWKS, the user id always comes from the token's sub claim rather than a request field, and ownership is checked on every resource, so a request that reaches a service directly still cannot touch another user's money.",
        },
      ],
      results:
        "A reader gets a runnable, readable reference for event-driven microservices. One command (docker compose up --build) brings up PostgreSQL, a single KRaft Kafka broker, and the gateway and services built from source, with a React frontend for opening accounts, depositing, and following a transfer to its outcome alongside its audit history. The transfer cannot double-spend, cannot go negative, is safe to retry, and recovers from a crash, with Testcontainers tests covering the concurrency, saga, idempotency, and audit behavior. The architecture notes explain each mechanism and state one limitation plainly: because the outbox relay publishes on its own schedule, the HTTP request and the asynchronous publish are linked but separate traces rather than one tree.",
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
    blog: "/blog/speaker-leakage-ravdess",
    status: "Live demo",
    featured: true,
    impact: "Honest speaker-independent: 78.8% audio-visual (calibrated late fusion) on a 70.3% audio base, all leak-free, where the common random split would fake the audio up to ~78% by memorizing speakers",
    caseStudy: {
      problem:
        "RAVDESS has 24 actors speaking the same two sentences. The usual random train/test split puts the same voices on both sides, so the model gets rewarded for recognizing the actor, not the emotion. That is why so many reported numbers sit in the 90s, and why my own earlier version looked better than it was.",
      approach:
        "Rebuilt around actor-disjoint cross-validation so no speaker is ever in both train and test. WavLM-large with a learnable weighted sum over its layers and attentive statistics pooling for audio, fused with a face model trained on expressions (not identities) through calibrated late fusion.",
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
      results: "70.3% audio-only (in line with the peer-reviewed EmoBox speaker-independent range) and 78.8% audio-visual, speaker-independent. Naive joint fusion scored below audio alone; calibrated late fusion (train each modality separately, then weight their probabilities on validation) added a real 8.5 points from the face with no leak. Full write-up and methodology on the blog.",
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
    status: "Live demo",
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
    description: "Co-founded Zaylon and built its AI system and backend: a LangGraph tool-calling agent and tri-lingual NLP on a FastAPI backend with PostgreSQL/Redis, multi-tenant isolation, and Docker deployment, built for MENA merchants selling on WhatsApp, Instagram, and web.",
    highlights: [
      "Built the conversational AI in LangGraph as a single tool-calling agent with about 35 scoped tools across sales, support, and checkout. An earlier multi-agent supervisor was kept behind a flag and deleted once it was clear the single agent was the only path ever serving a request",
      "Built hybrid product search combining keyword matching, semantic vector similarity, and Reciprocal Rank Fusion scoring",
      "Wrote the FastAPI Python backend and its service architecture, containerized with Docker for deployment",
      "Built multi-tenant security: argon2id key auth, per-merchant row-level isolation, and semgrep rules that fail CI on raw table access outside the repository layer",
      "Built a Postgres-backed saga engine with reverse-order compensation so a failed checkout step rolls back cleanly",
      "Batched rapid-fire WhatsApp messages in Redis into a single turn before invoking the agent, so it reads the whole thought at once instead of replying to each fragment",
    ],
  },
  {
    company: "Scale AI",
    role: "AI Coding Expert",
    type: "Contract",
    period: "Sep 2024 – Feb 2026",
    description: "Reviewed and improved LLM-generated code for RLHF training data used to train frontier AI models.",
    highlights: [
      "Reviewed and ranked code repositories across languages for RLHF data pipelines used to train frontier AI models",
      "Built test suites as quality control, scoring correctness, efficiency, style adherence, and edge case handling",
      "Reviewed thousands of code samples, providing detailed feedback on reasoning chains, code structure, and technical accuracy",
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
    company: "Swift-ACT",
    role: "Automotive Cybersecurity Intern",
    period: "Aug 2024 – Oct 2024",
    description: "Contributed to automotive cybersecurity research, building security scenario catalogs and running attack simulations in vehicle simulation environments.",
    highlights: [
      "Built security scenario catalogs with threat models, attack vectors, and mitigations for CAN bus and ECU communication systems following automotive cybersecurity standards",
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
  gpa: "3.75 / 4.0",
} as const;

export const CERTIFICATIONS = [
  {
    name: "micro1 Certified Software Engineer",
    issuer: "micro1",
    year: "2026",
    logo: "/certs/micro1.jpg",
    certificates: [{ src: "/certs/micro1.jpg", width: 600, height: 424 }],
  },
  {
    name: "Google AI Agents Intensive",
    issuer: "Google / Kaggle",
    year: "2025",
    logo: "/logos/google.svg",
    certificates: [
      {
        src: "/certs/google-ai-agents.png",
        width: 1600,
        height: 987,
        verifyUrl: "https://www.kaggle.com/certification/badges/abdelrahmanromia/105",
        verifyLabel: "Verify on Kaggle",
      },
    ],
  },
  {
    name: "AWS Cloud & ML Foundations",
    issuer: "AWS Academy",
    year: "2024",
    logo: "/logos/aws.svg",
    certificates: [
      {
        src: "/certs/aws-cloud-foundations.png",
        width: 1600,
        height: 1236,
        verifyUrl: "https://www.credly.com/go/vM9Vw99o",
        verifyLabel: "Verify on Credly",
      },
      {
        src: "/certs/aws-ml-foundations.png",
        width: 1600,
        height: 1236,
        verifyUrl: "https://www.credly.com/go/brqqLkmU",
        verifyLabel: "Verify on Credly",
      },
    ],
  },
  { name: "Meta Back-end Developer Specialization", issuer: "Coursera", year: "2023", logo: "/logos/coursera.svg" },
] as const;

// Contact details are published with the reference's own agreement.
export const REFERENCES = [
  {
    name: "Dr. Mohamed Moustafa Mahmoud",
    alsoKnownAs: "Dr. 3M",
    // Title left out until confirmed by him directly: public sources disagree on
    // his exact GPMA title, and the MILE listings are archived or stale.
    title: "",
    credential: "Ph.D., University of Pennsylvania",
    organization: "Global Performance Management Academy (GPMA)",
    url: "https://gpma-mena.com/",
    relationship: "Client. AI agents and automation for his organization.",
    email: "mmmim1954@gmail.com",
    phone: "+966 53 008 1400",
    phoneHref: "tel:+966530081400",
  },
] as const;

export const COMPETITIONS = [
  { name: "MTC-AIC3 BCI Challenge", detail: "Egypt National AI Competition" },
  { name: "ECPC", detail: "3x Participant" },
  { name: "Hepsiburada Address Resolution Hackathon", detail: "TEKNOFEST 2025" },
] as const;

export const LANGUAGES_SPOKEN = [
  { language: "English", level: "Fluent" },
  { language: "Arabic", level: "Native" },
  { language: "German", level: "A1" },
  { language: "Spanish", level: "Conversational" },
] as const;

export const ABOUT = {
  bio: "I co-founded Zaylon AI and built its AI system and backend: the LangGraph agent that sells over WhatsApp and Instagram, the tri-lingual NLP, and the FastAPI backend behind them. I work across the stack but lean toward backend and AI. B.Sc. in Computer and Communications Engineering with an AI concentration from Alexandria University. I speak English, Arabic, German, and Spanish, and I play guitar.",
} as const;

