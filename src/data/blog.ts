// Blog content lives here as typed data, mirroring the resume.ts pattern.
// The post body is a discriminated union of content blocks so a small switch
// in a renderer can paint it without pulling in a markdown or MDX dependency.

export type InlineNode =
  | string
  | { text: string; href: string }
  | { code: string };

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "p"; content: InlineNode[] }
  | { type: "code"; language?: string; code: string }
  | { type: "ul"; items: InlineNode[][] };

export interface BlogPost {
  title: string;
  slug: string;
  description: string;
  /** ISO date (YYYY-MM-DD). */
  date: string;
  tags: string[];
  readingMinutes: number;
  body: ContentBlock[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    title: "Measuring a writing voice, and adapting your own drafts toward it",
    slug: "measuring-a-writing-voice",
    description:
      "How authorship stylometry puts a number on the way you write, the one experiment result I actually trust, and why I rebuilt VoicePrint to adapt drafts toward a measured voice instead of swapping synonyms.",
    date: "2026-06-18",
    tags: ["NLP", "Stylometry", "Style Transfer", "Python"],
    readingMinutes: 7,
    body: [
      {
        type: "p",
        content: [
          "I kept noticing that my own drafts drifted out of my voice when I wrote them in a hurry. Longer sentences, fewer contractions, more hedging. I could feel the drift, but I could not see it. So I built ",
          { text: "VoicePrint", href: "https://github.com/Ab-Romia/VoicePrint" },
          ", a tool that measures the way I write from a handful of my own samples, scores how far a draft sits from that, and nudges the draft back. This post is the distilled version of how it works and, more importantly, which of its numbers I trust.",
        ],
      },
      {
        type: "h2",
        text: "The problem",
      },
      {
        type: "p",
        content: [
          "Authorship stylometry is the study of measuring who wrote something from how it is written rather than what it says. The field already knows how to put a number on a writing identity. I wanted that number pointed at my own writing: a way to see, concretely, when a draft has wandered off, and a way to pull it back without pretending to be anyone else. The target is always my own measured voice, never an imitation of someone else's.",
        ],
      },
      {
        type: "h2",
        text: "What a writing fingerprint actually is",
      },
      {
        type: "p",
        content: [
          "When most people think about writing style they think about word choice and subject matter. Those are the worst features to use, because they track topic. An essay about ships and an essay about gardens differ on content words even when the same person wrote both. A classifier built on content words learns the subject, not the author.",
        ],
      },
      {
        type: "p",
        content: [
          "The features that carry identity are the ones the writer is not thinking about. Function words are the clearest case: how often someone reaches for ",
          { code: "the" },
          ", ",
          { code: "of" },
          ", ",
          { code: "but" },
          ", ",
          { code: "however" },
          ", whether they prefer ",
          { code: "while" },
          " or ",
          { code: "whereas" },
          ". Nobody picks these consciously, and they barely move with subject matter, so they carry personal habit rather than topic. Character n-grams, the short overlapping character sequences in a text, do something similar for spelling, morphology, and punctuation rhythm. The whole game in stylometry is to find the signal that survives a topic change and ignore the signal that does not.",
        ],
      },
      {
        type: "h2",
        text: "The one result I trust, and the one I do not",
      },
      {
        type: "p",
        content: [
          "I ran the honest version of the experiment on the NLTK Gutenberg corpus, cut into non-overlapping 400-word chunks across five authors (Austen, Carroll, Chesterton, Melville, Shakespeare). The trap in any authorship experiment is topic leakage: if you split a single book into random chunks and scatter them across train and test, the classifier aces the test by memorizing that book's vocabulary and you learn nothing about generalization. So authors with more than one work are tested on a fully held-out work. A plain multinomial logistic regression with a fixed seed gave this:",
        ],
      },
      {
        type: "ul",
        items: [
          ["Function words (130-word frequency vector): macro-F1 0.684, accuracy 0.889."],
          ["Character n-grams: macro-F1 0.996, accuracy 0.999."],
          ["Combined: macro-F1 0.996, accuracy 0.999."],
        ],
      },
      {
        type: "p",
        content: [
          "The 0.996 char n-gram score is the one I do not trust, and I want to say so plainly. This is a small five-author set whose authors sit stylistically far apart, and two of them are single-work authors whose test text leaks topic and vocabulary from training. Both effects make the task easier than open-world attribution, so 0.996 is not a general accuracy claim.",
        ],
      },
      {
        type: "p",
        content: [
          "The number I do trust is the function-word one: macro-F1 0.684 and accuracy 0.889. Five-class chance is 0.20, so the signal sits well above it, and it earns that score with zero content words. Function words do not track topic, so the signal carries across subjects instead of memorizing one book's vocabulary. That gap above chance, on a feature that ignores what the text is about, is the whole thesis of stylometry: identity lives in the words you do not think about. It is not a complete signal on its own; the honest failure case is Carroll, who has the fewest training documents and gets folded into Chesterton's English prose. That is exactly why I pair it with a neural embedding.",
        ],
      },
      {
        type: "h2",
        text: "The neural voice match",
      },
      {
        type: "p",
        content: [
          "Interpretable features are honest and readable, but they miss a lot of what makes a voice. For the fingerprint itself I use StyleDistance, a 2024 style embedding trained to be content-independent: two texts in the same voice on different topics land near each other, and two texts on the same topic in different voices land apart. That is precisely the property a fingerprint needs. I embed each of your samples, normalize, average into a centroid, and normalize again so cosine reduces to a dot product:",
        ],
      },
      {
        type: "code",
        language: "python",
        code: `embeddings = self.embed(samples)
normalized = self._normalize_rows(embeddings)
centroid = normalized.mean(axis=0)
norm = np.linalg.norm(centroid)
return centroid / norm if norm else centroid`,
      },
      {
        type: "p",
        content: [
          "Voice match for any draft is then the cosine of its embedding to that centroid, clamped to the zero-to-one range. The same method runs per sentence, which is what powers the sentence-by-sentence diff later.",
        ],
      },
      {
        type: "h2",
        text: "Adapting a draft is rewriting, not generating",
      },
      {
        type: "p",
        content: [
          "Once you can measure voice, adapting toward it is a rewriting problem. The meaning is fixed; only the style moves. The in-context approach does this in a single model call. The prompt carries three pieces: the source draft, three to five real excerpts from your own samples as exemplars, and the measured profile rendered as plain-English constraints (average sentence length, contraction rate, comma rate). It then asks for a meaning-preserving rewrite and nothing else:",
        ],
      },
      {
        type: "code",
        language: "python",
        code: `"Rewrite the draft below so it reads in this author's voice. "
"Preserve the meaning, the facts, and the structure of the "
"argument. Do not add new claims. Return only the rewritten draft."`,
      },
      {
        type: "p",
        content: [
          "This is a clean break from where the repo started. The 2021 prototype tried to transform style with regex synonym swaps and random punctuation insertion, and it even injected deliberate misspellings. That is a dead end: synonym swaps change meaning, random punctuation is not a style, and injected typos are just damage. Word-level surface edits cannot carry voice, because voice lives in structure and rhythm, not in a thesaurus lookup. In-context rewriting works because the model sees real exemplars and measured constraints together and rewrites the whole passage at once.",
        ],
      },
      {
        type: "p",
        content: [
          "The client is OpenAI-compatible, so the rewrite is bring-your-own-key against OpenAI or OpenRouter. With no key, it falls back to a deterministic rule rewriter that only touches the two signals it can move without breaking meaning: contraction rate toward your measured rate, and comma rate toward your comma rate. Every rewrite is then re-scored, voice match before against voice match after, with a per-sentence diff that labels each sentence improved, regressed, or same.",
        ],
      },
      {
        type: "h2",
        text: "What it does not do",
      },
      {
        type: "p",
        content: [
          "I want the limits as visible as the results. The evaluation set is small, five authors, and the numbers above are not open-world accuracy. Two of those authors are single-work, so their per-author scores leak topic and read as a soft upper bound, not cross-domain performance. The rewrite is only as good as the model you bring; the rule fallback makes a few conservative edits and otherwise leaves your text alone. And this is voice adaptation on your own writing, not impersonation of anyone else. Authorship signals are probabilistic: a high voice match is evidence, not proof.",
        ],
      },
      {
        type: "p",
        content: [
          "The code is on ",
          { text: "GitHub", href: "https://github.com/Ab-Romia/VoicePrint" },
          ", and you can try ",
          // TODO: confirm this Hugging Face Space URL is live before publishing.
          { text: "the live demo", href: "https://huggingface.co/spaces/Ab-Romia/voiceprint" },
          ". Paste a few samples of your own writing, then paste a draft and watch the voice match move.",
        ],
      },
    ],
  },
];

export function getPostBySlug(slug: string): BlogPost | undefined {
  return BLOG_POSTS.find((post) => post.slug === slug);
}
