// Blog content for romia.dev. Post bodies are typed content blocks so they
// render without a markdown dependency. Inline markdown in "md" fields supports
// [text](url) links and `inline code` only. See src/app/blog for the renderer.

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "p"; md: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string }
  | { type: "figure"; src: string; alt: string; caption: string }
  | { type: "callout"; title: string; md: string };

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string; // ISO date
  tags: string[];
  readingMinutes: number;
  body: ContentBlock[];
};

export const BLOG_POSTS: BlogPost[] = [
  {
    "title": "Measuring your own writing voice, one function word at a time",
    "slug": "measuring-a-writing-voice",
    "description": "How I built a tool that turns a few of your writing samples into a measurable fingerprint, scores how far a draft has drifted from it, and nudges it back, with honest numbers about what the signal can and cannot do.",
    "date": "2026-06-18",
    "tags": [
      "NLP",
      "Stylometry",
      "Style Transfer",
      "Python"
    ],
    "readingMinutes": 11,
    "body": [
      {
        "type": "h2",
        "text": "The drift I could feel but not see"
      },
      {
        "type": "p",
        "md": "When I write quickly, something slips. My sentences get longer. I drop my contractions. I start hedging with phrases I would never say out loud. I can feel that the words on the page are not quite mine, but I could never point at the exact thing that changed."
      },
      {
        "type": "p",
        "md": "[VoicePrint](https://github.com/Ab-Romia/VoicePrint) is my attempt to put a number on that feeling. You give it a few samples of your own writing. It measures your voice as a set of habits, scores how far any new draft has drifted, and then nudges the draft back toward you. There is a [live demo](https://huggingface.co/spaces/Ab-Romia/voiceprint) if you want to try it."
      },
      {
        "type": "p",
        "md": "One thing up front: this is about measuring and matching your *own* voice. It is not about imitating anyone else. The target is a positive one you can inspect, which is the writing you already do when you are not in a hurry."
      },
      {
        "type": "callout",
        "title": "The felt difference",
        "md": "Drifted draft: *It is not unreasonable to suggest that the approach may have merit.*\n\nYour real voice: *I think this could work.*\n\nSame idea. One of them sounds like a committee, and one of them sounds like a person."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/pipeline.svg",
        "alt": "VoicePrint end to end: a few of your samples become a measured fingerprint that scores and guides a meaning-preserving rewrite, then re-scores it to prove it helped.",
        "caption": "VoicePrint end to end: a few of your samples become a measured fingerprint that scores and guides a meaning-preserving rewrite, then re-scores it to prove it helped."
      },
      {
        "type": "h2",
        "text": "Style is not what you say, it is how you say it"
      },
      {
        "type": "p",
        "md": "Here is the single most important idea, and it is the one that surprises most people new to this. If you want to identify who wrote something, the *worst* signals are the interesting words: the nouns, the verbs, the topic. Those track the subject matter, not the writer."
      },
      {
        "type": "p",
        "md": "Think about two essays by the same author, one about sailing and one about gardening. On content words they look like two different people, because one is full of ships and one is full of flowers. The author has not changed. The topic has."
      },
      {
        "type": "p",
        "md": "The signal that actually identifies a writer is the stuff they never think about: the small connective words and the rhythm underneath the sentence."
      },
      {
        "type": "callout",
        "title": "Watch what stays put",
        "md": "*The ship sailed past the harbor.*\n\n*The garden bloomed past the fence.*\n\nThe content words (ship, sailed, harbor / garden, bloomed, fence) swap out with the topic. But `the`, `past`, `the` stay exactly where they are. Those little words are doing the identifying."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/function-vs-content.svg",
        "alt": "Function words stay constant across topics and carry the author; content words swap with the subject, so building a classifier on them learns the topic, not the person.",
        "caption": "Function words stay constant across topics and carry the author; content words swap with the subject, so building a classifier on them learns the topic, not the person."
      },
      {
        "type": "h2",
        "text": "A fingerprint is a profile of habits"
      },
      {
        "type": "p",
        "md": "So what is a writing fingerprint, concretely? It is a set of measurable habits. Things like:"
      },
      {
        "type": "ul",
        "items": [
          "How often you reach for function words like `the`, `but`, and `however`",
          "Your average sentence length",
          "How frequently you use commas and semicolons",
          "How wide your vocabulary range is across a passage"
        ]
      },
      {
        "type": "p",
        "md": "None of these are conscious choices. You do not decide your comma rate before you write. That is exactly why they identify you. And because every one of them is just a number, the whole fingerprint becomes a vector you can look at and compare coordinate by coordinate."
      },
      {
        "type": "callout",
        "title": "A tiny fingerprint vector",
        "md": "Six coordinates for one author, as fractions of total words:\n\n`the=0.061  of=0.038  and=0.029  but=0.011  however=0.004  while=0.003`\n\nBecause these are relative frequencies, any two writers line up on the exact same axes. You are comparing apples to apples."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/fingerprint.svg",
        "alt": "A writing fingerprint is a set of unconscious, measurable habits plotted on shared axes, so two authors line up coordinate by coordinate yet trace different shapes.",
        "caption": "A writing fingerprint is a set of unconscious, measurable habits plotted on shared axes, so two authors line up coordinate by coordinate yet trace different shapes."
      },
      {
        "type": "h2",
        "text": "The honest test: train on one book, grade on another"
      },
      {
        "type": "p",
        "md": "This is the methodology lesson that took me the longest to respect: topic leakage. Suppose you take one book, chop it into random chunks, throw some chunks into your training set and the rest into your test set. A classifier will score beautifully. But it won, because it memorized that one book's vocabulary. You have learned nothing about whether it can recognize the author anywhere else."
      },
      {
        "type": "p",
        "md": "The fix is to split by *work*. Train on some of an author's books, then test on a completely different book they wrote that the model has never seen. If it still recognizes them, that is real."
      },
      {
        "type": "p",
        "md": "I want to be upfront here. In my evaluation set, two of the five authors only had a single book available. Their scores test on the tail end of that one book, so they leak topic. Treat those two as a soft upper bound, not as honest cross-book performance."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/topic-leakage.svg",
        "alt": "Splitting one book's chunks across train and test lets a model memorize its vocabulary; splitting by whole work tests on a book the model never saw.",
        "caption": "Splitting one book's chunks across train and test lets a model memorize its vocabulary; splitting by whole work tests on a book the model never saw."
      },
      {
        "type": "h2",
        "text": "The one number I trust, and the one I do not"
      },
      {
        "type": "p",
        "md": "Now the results, with honest framing. Using function words *alone*, with zero content words, the model separated five authors at a macro-F1 of 0.684 and an accuracy of 0.889. With five classes, random guessing would land around 0.20. So this is far above chance, and it got there without ever looking at a single topic word."
      },
      {
        "type": "p",
        "md": "That is the number I trust. It is the whole thesis of stylometry in one result: identity lives in the words you do not think about."
      },
      {
        "type": "p",
        "md": "There is also a character n-gram model that scored 0.996. Please do not quote that as general accuracy. It is inflated. Five authors who write nothing alike, plus two who leak topic from a single book, make this task much easier than real open-world authorship attribution. The high number is a property of the easy set, not a property of the method."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/results-trust.svg",
        "alt": "Function words alone reach 0.889 accuracy with zero content words, the real topic-independent signal; the 0.999 char n-gram and combined scores are inflated by a tiny, easy author set.",
        "caption": "Function words alone reach 0.889 accuracy with zero content words, the real topic-independent signal; the 0.999 char n-gram and combined scores are inflated by a tiny, easy author set."
      },
      {
        "type": "h2",
        "text": "Where function words fail (and why that is fine)"
      },
      {
        "type": "p",
        "md": "Here is the failure case, because you should not trust anything else I say if I hide it. Under function words alone, the model confused one author for another. It labeled 16 of Carroll's test documents as Chesterton, and it never once predicted Carroll for anything."
      },
      {
        "type": "p",
        "md": "The reason is simple. Carroll had the fewest training documents, only 59. The model never gathered enough of his writing to carve out a region for him, so it folded him into his nearest dense neighbor. Function words are a strong signal. They are not a complete one. That gap is exactly why VoicePrint does not stop here and also uses a neural embedding."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/confusion.svg",
        "alt": "Under function words alone, Carroll's 16 test docs were labeled Chesterton and Carroll was never predicted at all, because his 59 training docs were too few to carve out a region.",
        "caption": "Under function words alone, Carroll's 16 test docs were labeled Chesterton and Carroll was never predicted at all, because his 59 training docs were too few to carve out a region."
      },
      {
        "type": "h2",
        "text": "The neural fingerprint catches what counts can't"
      },
      {
        "type": "p",
        "md": "Hand-counted features are honest and easy to read, but they miss a lot of what makes a voice feel like a voice. So I add a learned embedding on top."
      },
      {
        "type": "p",
        "md": "VoicePrint uses StyleDistance, a 2024 style embedding trained on a clever idea: texts in the same voice but on different topics should land *close* together, and texts on the same topic but in different voices should land *far apart*. That is the fingerprint property, learned directly."
      },
      {
        "type": "p",
        "md": "The mechanics are friendly. You embed each of your samples into a point. You average those points into one center, called a centroid, which represents your voice. Then the voice match of any draft is just its cosine similarity to that centroid, a score from 0 to 1. You do not need the math. Closer means more like you."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/centroid-match.svg",
        "alt": "Your samples cluster in style-embedding space and their average is your centroid; a draft's voice match is simply how close it sits, rising from 0.62 to 0.74 after rewriting.",
        "caption": "Your samples cluster in style-embedding space and their average is your centroid; a draft's voice match is simply how close it sits, rising from 0.62 to 0.74 after rewriting."
      },
      {
        "type": "h2",
        "text": "Adapting a draft is rewriting, not generating"
      },
      {
        "type": "p",
        "md": "Once you can measure voice, moving a draft toward it becomes a rewriting problem. The meaning stays fixed. Only the style moves. That framing matters, because it rules out a lot of bad ideas."
      },
      {
        "type": "p",
        "md": "VoicePrint does this in one model call that gets three things at once:"
      },
      {
        "type": "ul",
        "items": [
          "The draft to rewrite",
          "Three to five real excerpts from your own writing, used as examples of how you actually sound",
          "Your measured profile, turned into plain-English rules like \"keep sentences around 18 words,\" \"use contractions,\" and \"use commas at this rate\""
        ]
      },
      {
        "type": "p",
        "md": "The instruction is strict: rewrite while preserving meaning, and return only the rewrite. I tried the older 2021-style approach first, which swapped synonyms, scattered punctuation, and injected typos. That was a dead end. Those edits change meaning and just damage the text. Voice does not live in a thesaurus lookup. It lives in structure and rhythm."
      },
      {
        "type": "callout",
        "title": "Before and after, meaning held fixed",
        "md": "Before: *It would not be inaccurate to state that the results were positive.*\n\nAfter: *I think the results were good.*\n\nThe meaning survives. What changed is the structure: shorter sentence, plainer words, fewer hedges. That is the measured voice doing its job."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/in-context-rewrite.svg",
        "alt": "Adaptation is one constrained model call fed by your draft, real exemplars, and measured habits as rules, returning a meaning-preserving rewrite, unlike the dead-end word-level edits.",
        "caption": "Adaptation is one constrained model call fed by your draft, real exemplars, and measured habits as rules, returning a meaning-preserving rewrite, unlike the dead-end word-level edits."
      },
      {
        "type": "h2",
        "text": "Proving the rewrite actually helped"
      },
      {
        "type": "p",
        "md": "A rewrite is only useful if it moves your voice without losing your meaning. So VoicePrint measures both. It scores voice match before and after against your centroid, and it checks meaning against your own draft rather than some outside reference."
      },
      {
        "type": "p",
        "md": "It also produces a per-sentence diff. Each sentence is labeled improved, regressed, or the same, with a small dead zone so that tiny wobble does not flip a label one way or the other. An honest sentence-by-sentence picture tells you far more than one feel-good number on top."
      },
      {
        "type": "callout",
        "title": "A three-sentence diff",
        "md": "Sentence 1: improved, 0.55 to 0.71.\n\nSentence 2: same, 0.60 to 0.61, inside the dead zone.\n\nSentence 3: regressed, 0.68 to 0.59.\n\nOverall voice match: before 0.62, after 0.74. Better on the whole, and you can see exactly which sentence went the wrong way."
      },
      {
        "type": "h2",
        "text": "Limits and the honest framing"
      },
      {
        "type": "p",
        "md": "I want the caveats to stay as visible as the wins."
      },
      {
        "type": "ul",
        "items": [
          "The evaluation set is tiny, only five authors, and it is not open-world accuracy. Real attribution across thousands of writers is much harder.",
          "Two of those authors leak topic from a single book, so their scores are a soft upper bound.",
          "The rewrite is only as good as the model you bring to it, with a conservative rule-based fallback when needed.",
          "Authorship signals are probabilistic. A high voice match is evidence, not proof."
        ]
      },
      {
        "type": "p",
        "md": "Most of all: this is voice adaptation on your own writing. The target is a positive one you can read, measure, and argue with. It is not impersonation, and it is not working against anything. The number I will stand behind is 0.889 from function words alone, because it shows that the part of your writing you never think about is the part that is most yours. The code is on [GitHub](https://github.com/Ab-Romia/VoicePrint), and you can try the [demo](https://huggingface.co/spaces/Ab-Romia/voiceprint)."
      }
    ]
  },
  {
    title:
      "Hybrid RAG retrieval on a free CPU, and the evaluation where the fancy pipeline did not win",
    slug: "contextiq-hybrid-rag-retrieval",
    description:
      "A plain-language walkthrough of ContextIQ: dense plus BM25 retrieval, reciprocal rank fusion, cross-encoder reranking, and grounded generation, all on a free CPU, with an honest four-way evaluation where no single arm sweeps every metric.",
    date: "2026-06-18",
    tags: ["RAG", "Retrieval", "Embeddings", "BM25", "Reranking", "Evaluation"],
    readingMinutes: 14,
    body: [
      {
        type: "p",
        md: "I keep running into RAG tutorials that end at the same place. Split a document into chunks, embed them, retrieve the handful that look most similar to the question, paste them into a prompt. The demo works on the slide. Then you point it at a real corpus where several documents look almost identical, ask a question that hinges on one specific term, and the whole thing falls apart. The retrieval was never the hard part of the slide; it is the entire part the slide skipped.",
      },
      {
        type: "p",
        md: "So I built [ContextIQ](https://github.com/Ab-Romia/ContextIQ-RAG), a retrieval pipeline that picks up exactly where those tutorials stop. It searches two different ways and merges the results, double-checks the top candidates with a more careful model, writes answers that cite their sources, and, the part I care about most, grades itself against a simple baseline so I can say which numbers I actually trust. The whole thing runs on a free CPU, no GPU and no paid embedding API. This post walks through every stage in plain language, then shows the evaluation, including the place where the full pipeline did not win.",
      },
      { type: "h2", text: "Retrieval is where RAG lives or dies" },
      {
        type: "p",
        md: "Retrieval-augmented generation is a simple idea. Instead of hoping a language model memorized a fact, you fetch the relevant text at question time and hand it to the model to read. The quality of the answer is bounded by the quality of what you fetched. If the right passage never makes it into the prompt, no amount of clever prompting saves you. The model will either guess or, worse, answer confidently from its training data and sound exactly as fluent as when it is right.",
      },
      {
        type: "p",
        md: "To make this concrete, and to make the evaluation honest, I built a corpus designed to be hard in a specific way: seven fictional company handbooks that share the same section structure. They all have an on-call policy, an expense policy, a parental leave policy. The wording differs, the policies differ, but the shape is identical. One handbook is the target; the other six are distractors. Ask something like, what is the single-transaction limit for expenses without prior approval, and a naive retriever has to separate the one passage that answers it from six near-duplicates that look just as relevant. That is the trap, and it is the trap most real document sets set for you too.",
      },
      {
        type: "p",
        md: "The constraint I gave myself was a free CPU environment. No GPU, no PyTorch in the image, no paid API for embeddings. Every model choice below is shaped by that: small models that run through ONNX Runtime, a lexical search library with no C extension to compile. The constraint is real, and I will name where it costs me.",
      },
      {
        type: "p",
        md: "Here is the whole pipeline in one picture. Refer back to it as each stage comes up.",
      },
      {
        type: "figure",
        src: "/blog/contextiq/hybrid-retrieval-pipeline.svg",
        alt: "Flow diagram: a document is chunked, augmented, and indexed two ways into a vector store and a BM25 index; a query fans out to dense and lexical search, the rankings are fused with reciprocal rank fusion, the pool is reranked by a cross-encoder, and the top passages feed grounded generation that emits a cited answer.",
        caption:
          "Chunk, then embed and index two ways, then fuse, then rerank, then generate.",
      },
      { type: "h2", text: "Chunking and contextual headers" },
      {
        type: "p",
        md: "I split each document on its Markdown headings first, then split each section into token-bounded pieces of 400 tokens with 60 tokens of overlap, using a tiktoken-based splitter from `langchain-text-splitters`. A chunk has to be small enough to be specific and large enough to stand on its own. Splitting on structure before size keeps related sentences together instead of cutting a policy in half. Every chunk also carries its heading path, so a citation can later point at a real section, not an anonymous byte offset.",
      },
      {
        type: "p",
        md: "A retrieved chunk often reads like an orphan. A sentence like, it raised the limit to 40, means nothing without knowing which document and section it came from. So before embedding, I prepend a small deterministic header built from the source title, the heading path, and the chunk's position. Only the embedded text carries this header; what gets shown to you stays clean.",
      },
      {
        type: "code",
        code: `header = " > ".join(bit for bit in header_bits if bit)
position = f"part {chunk.ordinal + 1} of {total}"
chunk.augmented_text = f"[{header} | {position}]\\n{chunk.text}"
# The reader still sees the original, unprefixed chunk.text.`,
      },
      {
        type: "p",
        md: "I want to be precise about what this is and is not. A more elaborate version of this idea asks a language model to write a custom sentence of context for every single chunk. That works better, but it costs a model call per chunk. Mine is the cheap version, a fixed template with no model calls, so I do not claim the larger gains the model-generated approach reports.",
      },
      { type: "h2", text: "Two ways to search, and why you need both" },
      {
        type: "p",
        md: "There are two classic ways to find a passage, and they fail in opposite directions.",
      },
      {
        type: "p",
        md: "The first is dense retrieval. An embedding turns text into a list of numbers that captures its meaning, so two passages about the same idea land close together, like points near each other on a map, even when they share no words. You embed every chunk, embed the query the same way, and take the chunks whose vectors sit closest. Its strength is meaning: it can find a passage about supported devices when the question asks about devices per site in different words. Its weakness is that it smooths over exact tokens. A product name, a precise figure like `4,000 Pebbles`, an exact amount: a small embedding model places those near a dozen similar-looking strings, because to it they mean roughly the same thing.",
      },
      {
        type: "p",
        md: "The second is lexical retrieval, the classic being BM25, which scores passages by how many of the query's exact terms they contain, weighted by how rare those terms are. BM25 locks onto the literal token and the literal number that dense search blurs. Its weakness is the mirror image: if the answer passage never uses the query's words, BM25 scores it near zero.",
      },
      {
        type: "p",
        md: "So neither retriever is enough on its own, and they fail on different questions.",
      },
      {
        type: "figure",
        src: "/blog/contextiq/why-hybrid-beats-either-alone.svg",
        alt: "A 2x2 grid: dense retrieval misses exact-term queries but finds paraphrases; lexical BM25 finds exact terms but misses paraphrases; hybrid covers both.",
        caption:
          "Each retriever fails on a different kind of question, so running both covers what either one misses.",
      },
      {
        type: "p",
        md: "In ContextIQ the dense side is `bge-small-en-v1.5`, a 384-dimensional model that runs through ONNX Runtime via `fastembed`, about 67 MB and no PyTorch. The lexical side is `bm25s`, which runs BM25 over scipy sparse matrices with no C extension to compile. The dense vectors live in an in-memory Chroma store. Chroma can generate its own embeddings, but I turn that off and feed it the vectors I already computed, so the whole system speaks one model's language. Indexing is additive: re-indexing one source replaces only that source, which fixed the original design's defining bug, an implicit wipe of the entire store on every upload.",
      },
      { type: "h2", text: "Fusion: combine by rank, not by score" },
      {
        type: "p",
        md: "Now the question both searches leave open. Dense search gives me cosine similarities, BM25 gives me its own scores, and these live on completely incompatible scales. Averaging them is meaningless. The trick is to throw away the raw scores and rank everything by position instead. Position is comparable across the two searches even when the raw scores are not.",
      },
      {
        type: "p",
        md: "That is reciprocal rank fusion. Each retriever contributes one over the quantity k plus rank to a passage's combined score, where the constant `k` softens how much the very top spots dominate. Sixty is the standard value. I pull a deep pool, 50 candidates per retriever, before fusing.",
      },
      {
        type: "code",
        code: `for rank, (chunk, score) in enumerate(dense_ranked, start=1):
    cand = candidate_for(chunk)
    cand.rrf_score += 1.0 / (k + rank)

for rank, (chunk, score) in enumerate(sparse_ranked, start=1):
    cand = candidate_for(chunk)
    cand.rrf_score += 1.0 / (k + rank)

return sorted(candidates.values(), key=lambda c: c.rrf_score, reverse=True)`,
      },
      {
        type: "p",
        md: "A passage that ranks well in either retriever survives into the fused pool. A passage that ranks well in both gets contributions from both and rises to the top. There is nothing to tune beyond `k`.",
      },
      { type: "h2", text: "Reranking: getting the right passage to the top" },
      {
        type: "p",
        md: "Fusion puts the right passage into the pool. It does not reliably put it at position one. The right answer might land at rank twenty, surrounded by near-duplicates from the other six handbooks. This is where a cross-encoder earns its place.",
      },
      {
        type: "p",
        md: "A cross-encoder reads the query and a candidate passage together, in one pass, and scores how relevant the passage actually is. This is far more accurate than comparing two vectors that were embedded separately, because the model attends to both texts at once. Running it over all 99 chunks for every query would be slow; running it over just the roughly 50 the cheap retrievers already shortlisted is fast. That is the whole two-stage design: a fast rough filter, then a slow careful judge. I use `ms-marco-MiniLM-L-6-v2` through `fastembed`, about 80 MB.",
      },
      {
        type: "code",
        code: `def rerank(query: str, candidates: list[Candidate]) -> list[Candidate]:
    if not candidates:
        return []
    scores = list(_model().rerank(query, [c.chunk.text for c in candidates]))
    for candidate, score in zip(candidates, scores):
        candidate.rerank_score = float(score)
    return sorted(candidates, key=lambda c: c.rerank_score, reverse=True)`,
      },
      {
        type: "figure",
        src: "/blog/contextiq/what-reranking-does.svg",
        alt: "Before and after: the fused ranking leaves the correct passage at rank 20 among distractors; after cross-encoder reranking the correct passage sits at rank 1.",
        caption:
          "Reranking's value is rescuing the correct passage from rank twenty and lifting it to the top, where it will actually make it into the prompt.",
      },
      {
        type: "p",
        md: "This is the single biggest quality lever in the pipeline, and it is why I keep the pool deep at 50 rather than shallow. Reranking the top three results changes almost nothing; they were already the top three. The value shows up when reranking rescues the correct passage from rank twenty. A shallow pool would have thrown that passage away before the reranker ever saw it.",
      },
      { type: "h2", text: "Grounded generation: cite, or say I don't know" },
      {
        type: "p",
        md: "The reranked top passages, up to five of them, become numbered sources. The model is told to answer only from them, cite every claim by its marker, and, when the sources do not cover the question, say so and stop rather than fall back on training knowledge. Here is the actual system prompt:",
      },
      {
        type: "code",
        code: `SYSTEM_PROMPT = (
    "You are a careful assistant that answers strictly from the provided sources. "
    "Use only the information in the numbered sources below. Cite every claim with its "
    "source marker in square brackets, for example [1] or [2][3]. If the sources do not "
    "contain the answer, say that the provided context does not cover it and stop. Do "
    "not use outside knowledge and do not guess."
)`,
      },
      {
        type: "p",
        md: "This matters more than it looks. A RAG system that quietly answers from memory when retrieval fails is indistinguishable from a plain chatbot, and that is the harder failure to catch, because the answer still sounds confident. Forcing citations and forcing abstention is how you make retrieval failures visible.",
      },
      {
        type: "callout",
        title: "A debugging note worth recording",
        md: "I first defaulted to a reasoning model, and the streamed answer kept showing up empty. Reasoning models on OpenRouter put their chain of thought in a separate field and do not stream the final answer reliably. Switching to an instruction-tuned model, on a free tier so the demo runs without a credit card, gave me one that streams cleanly and follows the grounding and citation rules.",
      },
      { type: "h2", text: "The evaluation, and which numbers I trust" },
      {
        type: "p",
        md: "Here is the part most write-ups skip. I built four versions of the pipeline, each one an arm, the usual word for a variant in an experiment, and ran all four against the same questions, so I could see what each stage actually buys.",
      },
      {
        type: "p",
        md: "The set is small and I want that stated up front: 21 hand-written questions, 18 answerable and 3 deliberately unanswerable to test whether the system abstains, over 99 chunks from one target handbook plus six distractors. The numbers describe direction on one small set. They are not a benchmark, and I would not let anyone cite them as one. A quick gloss on the metrics:",
      },
      {
        type: "ul",
        items: [
          "`hit@k`: did a right passage land in the top k at all.",
          "`recall@5`: here the same as hit@5, since each question has exactly one gold passage.",
          "`MRR`, mean reciprocal rank: how high up the first right passage sits.",
          "`nDCG@5`: a fuller ranking-quality score that rewards putting the right passage high.",
        ],
      },
      {
        type: "figure",
        src: "/blog/contextiq/evaluation-results.svg",
        alt: "Results table for four arms. A TF-IDF baseline: best MRR 0.81 and nDCG 0.82. B dense only: weakest, hit@3 0.67. C hybrid: best hit@5 and recall 0.94. D hybrid plus rerank: best hit@3 0.83.",
        caption:
          "Four arms, same questions. No single arm wins every metric, which is the honest part.",
      },
      {
        type: "p",
        md: "Two things I will defend, and they are the whole honest headline: the naive dense-only approach is the worst across the board, and the full pipeline gives the best precision at the very top. Everything else depends on the corpus.",
      },
      {
        type: "p",
        md: "No single arm wins every metric. Hybrid has the best hit@5 and recall. The reranked arm has the best hit@3 and a strong MRR. And the plain TF-IDF baseline posts the single highest MRR and nDCG of anything I ran, because my golden questions are keyword-rich: they name specific policies, products, and numbers, which is exactly what lexical matching keys on. That is not a sign the pipeline failed. It is a reminder that lexical search is a real baseline, not a straw man, and that the shape of your questions decides who wins.",
      },
      {
        type: "p",
        md: "The narrow result I do trust, stated narrowly: dense-only retrieval is the weakest arm, because a small embedding model cannot separate near-duplicate policy passages that share a section structure. That is the naive pipeline most tutorials produce. Adding lexical search recovers recall, putting the right passage in the top five 94 percent of the time. And reranking fixes the ordering hybrid leaves rough, lifting hit@3 to its best value and nearly doubling MRR over hybrid alone.",
      },
      { type: "h2", text: "What it does not do" },
      {
        type: "p",
        md: "The limits are as worth stating as the wins.",
      },
      {
        type: "ul",
        items: [
          "The index is not durable. It lives in memory for the life of the process, so a restart clears it. This is a single-session demo by design, not a database, and not built for many people at once.",
          "The evaluation is one small golden set on one corpus, 21 questions over 99 chunks. Illustrative of direction, not a benchmark.",
          "The chunk headers are a cheap template, not the model-generated per-chunk context that some published results measure. No such gain is claimed.",
          "Everything is constrained to a free CPU: no GPU, no PyTorch, no paid embedding API. A larger embedding model would likely close some of dense retrieval's gap.",
        ],
      },
      {
        type: "p",
        md: "Retrieval and the full trace run with no API key at all; only the final answer generation needs a key, which stays in the browser and is never stored. If you want to see it work, or pick apart the places it does not, the code is on [GitHub](https://github.com/Ab-Romia/ContextIQ-RAG) and there is a [live demo](https://huggingface.co/spaces/Ab-Romia/Context-Aware-AI) you can paste a document into and watch the trace, retriever by retriever, all the way to a cited answer. Bring a corpus with confusable documents; that is where the difference between a demo and a working system shows up.",
      },
    ],
  }
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
