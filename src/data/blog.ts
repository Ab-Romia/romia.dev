// Blog content for romia.dev. Post bodies are typed content blocks so they
// render without a markdown dependency. Inline markdown in "md" fields supports
// [text](url) links and `inline code` only. See src/app/blog for the renderer.

export type ContentBlock =
  | { type: "h2"; text: string }
  | { type: "p"; md: string }
  | { type: "ul"; items: string[] }
  | { type: "code"; code: string }
  | { type: "figure"; src: string; alt: string; caption: string }
  | { type: "callout"; title: string; md: string }
  | {
      type: "table";
      headers: string[];
      rows: string[][];
      caption?: string;
      /** 0-based index into rows to highlight (e.g. a winning result). */
      highlightRow?: number;
    };

export type BlogPost = {
  title: string;
  slug: string;
  description: string;
  date: string; // ISO date
  tags: string[];
  readingMinutes: number;
  body: ContentBlock[];
};

/* Figures in the commentdraft post describe the public repository, not a local
   branch, because every one of them is a link away from being checked. Today
   that is origin/main: 703 tests, 7,036 lines across the eight guides, 5,612
   lines of Python, and one connector. Re-derive rather than edit:

     git -C ~/commentdraft fetch && git -C ~/commentdraft worktree add /tmp/pub main
     cd /tmp/pub && uv run pytest
     wc -l docs/platforms/{facebook,instagram,linkedin,reddit,threads,tiktok,x,youtube}.md
     find src -name '*.py' | xargs wc -l | tail -1

   One figure here is ahead of main on purpose. The cached prefix is 4,112
   tokens, which is what the run's own CSV holds; docs/bakeoff.md still says
   4,162 on main and is corrected on the unpushed branch. Push before this
   deploys, or the post disagrees with the page it cites. */
export const BLOG_POSTS: BlogPost[] = [
  {
    "title": "commentdraft: replying in public on a client's behalf",
    "slug": "commentdraft-guides-that-did-not-exist",
    "description": "Paid work: drafting public replies under a client's name, where a wrong price is a bill the client pays. The four ways the obvious build fails them, the approval gate that five pasted characters walked straight through, the three platforms whose comment text is not what the person typed, and a measured run where the bargain model billed 27 times more per comment.",
    "date": "2026-08-06",
    "tags": [
      "CLI",
      "Python",
      "Platform APIs",
      "Security",
      "Evaluation",
      "AI/ML"
    ],
    "readingMinutes": 14,
    "body": [
      {
        "type": "p",
        "md": "The job arrived the way freelance work does: a client with a real product, a real price, and more comments under their posts than they could keep up with. The obvious build is a loop that reads the comments, sends each one to a model, and posts what comes back, and it takes about an afternoon. It is also wrong in four ways, and every one of them sends the bill to the client rather than to the person who wrote the loop."
      },
      {
        "type": "p",
        "md": "What the job needed is [commentdraft](https://github.com/Ab-Romia/commentdraft), a command line tool on [PyPI](https://pypi.org/project/commentdraft/) under Apache-2.0, generalized from that job once its constraints turned out to have nothing to do with the client in particular. It reads the comments on a creator's own posts, decides for each one whether to reply, skip, or escalate to a person, and drafts the reply from one source document the operator supplies. A person approves every draft, one keystroke per reply, immediately before that one reply is sent. The [case study](/projects/commentdraft) is the same system with more screenshots and less argument."
      },
      {
        "type": "h2",
        "text": "A wrong price is a bill somebody else pays"
      },
      {
        "type": "p",
        "md": "The first failure named the requirements. A public reply under the client's own post that quotes a price that changed last month, or promises a delivery window the product does not offer, does not crash and raises no exception. It is a wrong number, in public, under their name, read by the one audience they cannot afford to mislead. The client pays."
      },
      {
        "type": "p",
        "md": "So the drafting rule is absolute rather than encouraged: a draft may state as fact only what the operator's source document states, and a question that document does not answer is never an invitation to be helpful. It becomes an escalation, no draft, routed to the person who can actually answer it. Declining to answer is an output."
      },
      {
        "type": "p",
        "md": "There is no retrieval step behind that rule, and the absence is a decision. The whole document goes into the prompt, once, byte for byte. Retrieval exists to fit a corpus that does not fit a context window, and it buys that at the price of a new failure mode: the retriever misses the relevant passage, the model answers anyway, and the answer is confident and wrong. At this size a retriever would introduce the exact failure the tool exists to prevent. While the document fits the window there is nothing to miss, and when a document outgrows the window the tool says the design is wrong for it and does not truncate quietly."
      },
      {
        "type": "figure",
        "src": "/projects/commentdraft-review.png",
        "alt": "The commentdraft review page: eleven comments in one table, each row carrying the platform, the author, the comment, the decision, the one-line reason for that decision, and the draft reply where one exists. Rows that were answered are tinted green, rows escalated to a person are tinted pink and carry no draft, skipped rows are untinted, and a footer states that nothing on the page has been posted anywhere.",
        "caption": "Eleven comments from the run measured later in this post, rendered by the tool from its own CSV. Four got replies; seven got no draft at all, three skipped and four sent to a person, and that ratio is the part worth reading."
      },
      {
        "type": "h2",
        "text": "Approval is structural, because a setting eventually gets turned on"
      },
      {
        "type": "p",
        "md": "The second failure is that the afternoon build posts. Every platform has rules about replying with software, almost nobody reads them, and at least one of them decides the design outright. YouTube's API Services Developer Policies require that the user \"expressly consent to those actions prior to their actual execution.\" Read narrowly, the way a policy gets read when a client's channel is the one at stake, that rules out a batch approval, a default, and any setting that stands in for a person. What it leaves is per-reply human approval, which on YouTube is not a product preference. There is no other compliant design."
      },
      {
        "type": "p",
        "md": "So there is no `--yes`, no `--all`, and no config key that changes it. Not defaulted off; absent, and kept absent by a test that walks the config schema, which is a frozen allowlist, so a key of any name that could stand in for a keystroke fails the build until somebody writes it down. Publishing thirty replies costs thirty keystrokes, on purpose."
      },
      {
        "type": "h2",
        "text": "Typeahead is not consent"
      },
      {
        "type": "p",
        "md": "Then I pointed three reviewers at that gate and asked them to break it. One of them did, in a way I would not have found. Start the tool under a pseudo-terminal. Before it has printed a single character, write five approvals into the terminal. Then wait."
      },
      {
        "type": "code",
        "code": "LEAD = 1.0                    # the child sleeps this long before rendering\nPAYLOAD = b\"y\\ny\\ny\\ny\\ny\\n\"    # five approvals, delivered during the sleep\nROWS = 5\n\npid, master = pty.fork()\nif pid == 0:\n    os.execv(sys.executable, [sys.executable, driver, ...])\n\ntime.sleep(0.3)\nos.write(master, PAYLOAD)     # nothing has been drawn yet"
      },
      {
        "type": "p",
        "md": "Five replies published. Not one of them was on the screen when the key that approved it arrived. No pipe, no flag, no configuration, no monkeypatching, no edit to the source. On a real terminal, in front of a real person, that sequence is a single paste."
      },
      {
        "type": "callout",
        "title": "Why this is worse than a bypass",
        "md": "The gate exists because platforms require it: consent given prior to execution, and expressly. A keystroke that was sitting in a buffer before the content existed is neither prior nor express. The gate was failing at the exact property the policy asks for, while reporting success."
      },
      {
        "type": "p",
        "md": "The prompt was reading with `input()`. That reads a line from the terminal's input queue, and the line discipline has been filling that queue since long before the program asked. Everything typed or pasted while the reply was still being written to the screen is already sitting there, waiting."
      },
      {
        "type": "p",
        "md": "The gate proved a key was pressed, and it proved the send happened inside the branch that key selects. It never proved the key arrived after the reply was readable, and only that last part makes it consent. Every confirmation prompt I have written has this shape. `Delete 400 files? [y/N]`. `Deploy to production? [y/N]`. If the user was typing while the tool was still computing what to warn them about, the answer was in the buffer before the question reached the screen."
      },
      {
        "type": "code",
        "code": "_line(stream, PROMPT)                                  # 1. print the prompt\n_flush(stream)                                         # 2. push it to the screen\n\ndescriptor = sys.stdin.fileno()\nsaved = termios.tcgetattr(descriptor)\ntry:\n    termios.tcflush(descriptor, termios.TCIFLUSH)      # 3. discard what was typed before\n    tty.setcbreak(descriptor)                          # 4. no line discipline, no Enter\n    pressed = os.read(descriptor, 1)                   # 5. exactly one byte\nfinally:\n    termios.tcsetattr(descriptor, termios.TCSADRAIN, saved)"
      },
      {
        "type": "p",
        "md": "Four lines, and the order carries all of it. Discard the queue at the moment the prompt becomes readable, then read one byte after that. Anything typed before the reader could have seen the reply is gone. `cbreak` earns its place twice: a key needs no Enter behind it, so it also cannot be joined to the key behind it, and a held-down key walks nothing."
      },
      {
        "type": "p",
        "md": "The replacement quietly loses two things. `input()` flushes stdout before it reads and a hand-rolled reader does not, so under block buffering, which is what a piped run looks like, the prompt sits in a buffer while the program waits for a key and the reviewer approves a blank screen. The flush is step two for that reason. And the terminal has to be restored in a `finally`, not on the happy path, because if anything below raises or the operator presses Ctrl-C, the alternative is handing them back a shell with no echo and no line editing."
      },
      {
        "type": "p",
        "md": "A bug about terminals has to be tested against a real terminal, so the test forks a pty, writes the payload during the lead time, and asserts that nothing was published. The first version of that test passed against the broken code. The child was a fork of the pytest process, pytest imports `readline`, and a forked child inherits the hook `readline` installs under `input()`. That hook handles the terminal itself, and it hid the entire behavior I was trying to catch. The fix was to launch the child as a fresh interpreter under `os.execv`, which is also what an operator's own process looks like."
      },
      {
        "type": "code",
        "code": "# before\nISATTY True   RC 0   SENDS 5  ['r1', 'r2', 'r3', 'r4', 'r5']\n\n# after\nISATTY True   SENDS 0  []\nLAST ROW SHOWN ['[ 1 / 5 ]  video-site  r1 on \"a clip\"']"
      },
      {
        "type": "p",
        "md": "There is no `RC` line in the second one because the queue is still holding, waiting for a key that has to arrive after the reply was on the screen."
      },
      {
        "type": "p",
        "md": "I had tested that the gate could not be bypassed by a flag, by a config key, by calling the function directly, or by piping `yes` into it. All of those were closed. I had not tested the one property the gate exists to guarantee, because I had not noticed it was a separate property from having pressed the key. Proving a keystroke happened is easy, and I had done it thoroughly."
      },
      {
        "type": "h2",
        "text": "The text you receive is not the text the person wrote"
      },
      {
        "type": "p",
        "md": "The third failure is quieter, and it belongs to no single platform. I read the comment documentation of eight platforms end to end, and on three of them the value that comes back is not the one it appears to be. None of the three says so at the endpoint that returns it. Every page quoted below was read on 2026-08-01 and can be re-read today without an account."
      },
      {
        "type": "p",
        "md": "A YouTube comment carries two text fields. `snippet.textOriginal` is documented on the [comments resource page](https://developers.google.com/youtube/v3/docs/comments) as \"The original, raw text of the comment as it was initially posted or last updated. The original text is only returned to the authenticated user if they are the comment's author.\" Nobody moderating their own video is the author of the comments under it, so on every one of them the field holding the typed words is withheld, and the one account exempt from the rule is the account that already knows what it wrote."
      },
      {
        "type": "p",
        "md": "What arrives instead is `snippet.textDisplay`, described on the same page: \"Even the plain text may differ from the original comment text. For example, it may replace video links with video titles.\" A viewer pastes a link and a title comes back. Quote that comment back at them and you publish words they never typed, and a link blocklist matched against that string never fires, because the string that held the link now holds English. A second alteration stacks on the first: `textFormat` defaults to `html` on the read endpoints, so a reader that does not explicitly ask for `plainText` gets markup as well."
      },
      {
        "type": "p",
        "md": "Reddit writes down exactly what it does, on the [API overview page](https://www.reddit.com/dev/api/oauth), not at any endpoint that returns a comment: \"For legacy reasons, all JSON response bodies currently have `<`, `>`, and `&` replaced with `&lt;`, `&gt;`, and `&amp;`, respectively. If you wish to opt out of this behaviour, add a `raw_json=1` parameter to your request.\" So `Tom & Jerry` reaches the model as `Tom &amp; Jerry`. Then the trap closes a second time. Any page that renders strangers' text has to escape its output, which is the defense against script injection, so a correctly built page escapes the already-escaped string and shows a person `Tom &amp; Jerry`, rendered faithfully, as if that is what got typed."
      },
      {
        "type": "p",
        "md": "Every component did its job, and the text on the screen is still text nobody wrote."
      },
      {
        "type": "p",
        "md": "The Instagram case is not comment text at all, and it fails the same way. An Instagram comment webhook names the account it belongs to in the payload's `entry.id`, so a handler's first job is to know its own account's id, and the obvious call is `GET /me?fields=id`. On the Instagram Login route, the [get-started page](https://developers.facebook.com/docs/instagram-platform/instagram-api-with-instagram-login/get-started) carries a field table with two entries a reader skims past. `id` is \"The app user's app-scoped ID\". `user_id` is \"The Instagram professional acount ID, `<IG_ID>`, for your app user. This ID is value of the `id` field received in webhook notifications for this account.\" The typo and the missing word are Meta's, on a page stamped 2024-12-02."
      },
      {
        "type": "code",
        "code": "GET https://graph.instagram.com/v26.0/me?fields=id       # the app-scoped id: matches nothing\nGET https://graph.instagram.com/v26.0/me?fields=user_id  # the id webhook payloads carry"
      },
      {
        "type": "p",
        "md": "The app-scoped id is well formed, stable, and genuinely yours. It also matches no `entry.id` in any webhook payload and addresses nothing on `/{ig-id}/media`. What it builds is a handler that returns 200 to Meta forever without recognizing a single notification as its own, next to a media listing that comes back empty instead of refused. Nothing raises. Both dashboards stay green. I am not reporting that one from a safe distance: my own research had the wrong field, and it survived until a second pass pulled Meta's raw field table rather than a summary of it. That pass found twelve errors in the research behind this one platform, and this was the expensive one, because it fails by producing nothing."
      },
      {
        "type": "p",
        "md": "No test suite catches any of the three, because every altered value is legal. The escaped string is valid JSON holding a plausible sentence. The rewritten text is a plausible comment. The wrong id has the right shape and came from the right host with a 200. Catching them means comparing the value inside your system against the person's screen, and no harness has the person's screen. The person best placed to notice is outside the system entirely: a commenter reading their own words, misquoted back at them by an account they trusted."
      },
      {
        "type": "h2",
        "text": "Meta documents the same call as reply and as edit"
      },
      {
        "type": "p",
        "md": "The fourth failure is the one that could have destroyed something that was not mine to destroy. Meta documents one Graph API call as both \"reply to this comment\" and \"edit this comment.\" Both readings are published, and they cannot both be right. Pick the wrong one and every approved reply silently overwrites the customer's own comment with the client's words: not a failed reply, which you would notice, but a customer's comment replaced in place, which you would not, until somebody complains."
      },
      {
        "type": "p",
        "md": "I could not settle it from the documentation, and I was not going to settle it experimentally on somebody's Page. The connector proves the outcome on every write. The id the platform returns must differ from the id that was posted to, and the reply read back must carry the right parent, the comment it was answering. A read-back that cannot be performed ends the whole run rather than the row, because a write path that edits comments will edit the next one too."
      },
      {
        "type": "code",
        "code": "created = _call(\"POST\", _url(f\"{parent}/comments\", token), {\"message\": text})\npublished = _identifier(created.get(\"id\"))\nif not published:\n    raise _unusable(parent, token, text)\nif _same_comment(published, parent):\n    raise ReplyInvariantError(_overwritten(parent), parent)\nseen = _verify(published, parent, token)   # reads back id, parent{id}, message\n_confirm(published, parent, token, text, seen)"
      },
      {
        "type": "p",
        "md": "The check is permanent, not a placeholder until Meta's pages agree with each other, and its two failure directions are deliberately not symmetric. A false positive halts a run over an overwrite that did not happen, which costs a re-run. A false negative destroys customers' comments quietly. The comparison is built to fail toward the first."
      },
      {
        "type": "p",
        "md": "That connector, for Facebook Pages, is the only one. Built and tested against fakes, it has never been run against a live Page, and the other seven platforms have guides instead of code."
      },
      {
        "type": "h2",
        "text": "Eight guides, because the tutorials name the wrong obstacle"
      },
      {
        "type": "p",
        "md": "Underneath all four failures sits the question a client asks first, which is what it takes to connect to their platform at all. Answering it honestly, eight times, turned out to be most of the work. For each platform it meant reading the primary sources end to end, the developer policies, the API reference, the quota tables, the pricing pages, because the tutorials answering the same question are wrong, and wrong in a consistent direction. I went looking for these guides before writing them, and they did not exist."
      },
      {
        "type": "p",
        "md": "X is the cleanest example. The received wisdom is that the barrier is money, and the $100, $200 and $5,000 figures still dominate the search results. Those are prices for a product X stopped selling on 2026-02-06; at this tool's shape of workload, the metered replacement bills about three dollars a month. What replaced the money is a requirement for prior written approval from X before replies written by software are deployed, with no published turnaround, no queue position, and no appeal."
      },
      {
        "type": "p",
        "md": "TikTok is repeated everywhere as having no comment API. It has two documented comment endpoints, on `business-api.tiktok.com`, a different product line from the `developers.tiktok.com` portal every tutorial means. What TikTok refuses is not the feature but the applicant: it does not onboard individual developers, and says so on its registration page."
      },
      {
        "type": "p",
        "md": "That pattern held across all eight. Where the received wisdom names an obstacle, the named obstacle is out of date or standing in front of a different one, so the section worth reading on each guide is the one headed \"What is still unknown.\" The eight guides run to 7,036 lines, against 5,612 lines of Python in the package. Line counts measure typing, not truth, but the ratio says where the work went, and every endpoint, scope string, quota number and policy clause in them carries the URL it came from and the date it was read. The short version, what stands between an operator and a first working call on each platform, is at [/commentdraft](/commentdraft)."
      },
      {
        "type": "h2",
        "text": "The sticker prices predicted a gap of 8; the run measured 27"
      },
      {
        "type": "p",
        "md": "Cost is where this design is easiest to doubt, because the prompt carries the whole document on every call. The model comparison therefore ships as a subcommand instead of a slide: `commentdraft bakeoff` runs the same comments through the default model and every challenger in the config and writes one CSV per model, and a `--blind` flag on the review command turns those CSVs into one page with the sources hidden behind letters and the key returned separately. One run is published in [docs/bakeoff.md](https://github.com/Ab-Romia/commentdraft/blob/main/docs/bakeoff.md): thirty comments against the fictional field guide the repository ships, on 2026-08-01. One comment is empty and is decided locally as a skip with no call and no cost, so each model billed twenty-nine calls."
      },
      {
        "type": "table",
        "headers": ["Label", "Model", "Total cost", "Per billed call", "Cache hits", "Decisions"],
        "rows": [
          ["primary", "qwen/qwen3.7-flash", "$0.0012", "$0.000040", "28/29", "16 reply, 9 skip, 5 escalate"],
          ["cheap", "deepseek/deepseek-chat", "$0.0318", "$0.001095", "0/29", "16 reply, 9 skip, 5 escalate"],
          ["small", "mistralai/mistral-small-3.2-24b-instruct", "$0.0093", "$0.000320", "0/29", "16 reply, 10 skip, 4 escalate"]
        ],
        "highlightRow": 0,
        "caption": "One run, thirty comments, 2026-08-01. The route with the bargain reputation is the middle row: per comment it billed about 27 times the default, where published rates alone predict a gap near 8. The column that explains it is the cache column, not the price."
      },
      {
        "type": "p",
        "md": "The arithmetic is short. The `cheap` entry's input rate is 8.6 times the default's and its output rate 7.9 times, so sticker prices predict a gap near 8, not 27. The rest is the prompt cache. The prefix, 4,112 tokens holding the voice rules, the worked examples, the output contract and the entire source document, dominates the bill on every call, against a user message holding one comment and a reply of a sentence or two. The default's route served that prefix from cache on 28 of its 29 calls and billed it at the cached rate; the other two billed it at full input rate on all 29, because neither served it from a cache at all. Here the no-retrieval decision arrives as a measurement: the prefix is assembled once and kept byte-identical across a run so a provider can cache it, and on this run that property was worth more than the difference in sticker price between all three routes."
      },
      {
        "type": "callout",
        "title": "What one run does and does not establish",
        "md": "It establishes that on this gateway, on this day, the cache term dominated the rate term. It is one run, on one example product, through one gateway. A route that adds or drops cached input pricing moves that column further than these three models differ from each other, and none of those changes announces itself. Re-run the command before relying on any number in the table."
      },
      {
        "type": "p",
        "md": "The same run reports the results that do not flatter it, at the same size. The example config sets an alarm threshold on how often a reply mentions the product, and two of the three models went over it. The report line, identical for `primary` and `cheap`:"
      },
      {
        "type": "code",
        "code": "plugs: 13/16 replies contain a configured plug marker OVER plug_cap 0.75"
      },
      {
        "type": "p",
        "md": "Nothing stopped, nothing was rewritten, and no row was dropped, because the cap is an alarm and never a limiter; what holds the rate down is what the operator wrote in their voice file. The default model's report also named, row by row, the thirteen replies that closed on the same pointer and the six that opened on the same word, a repetition no per-comment call can prevent, since no call knows how any other call ended."
      },
      {
        "type": "p",
        "md": "The report does not catch everything, and the screenshot near the top of this post carries one it missed. Row 22 is a question in Polish. The voice file's first rule is to reply in the language of the comment, and the default model answered it in English. The two cheaper models both answered in Polish. So the entry this pass ranked first is the one that broke the rule, on the only row where the rule was tested, and no threshold in the report was watching for it. A report catches what somebody thought to count, and the row it misses is the row you find later by reading."
      },
      {
        "type": "h2",
        "text": "What survived the job"
      },
      {
        "type": "p",
        "md": "The client-specific parts are gone. The product, the language, the source document and the credentials all stayed behind. What survived is the shape the constraints forced, and those constraints turned out not to be about the client at all: anyone with a price and an audience has a document that is true, questions it does not answer, platforms with rules about software that replies, and comment text the platform already touched on its way in."
      },
      {
        "type": "p",
        "md": "The general version is on PyPI as `pip install commentdraft`, Apache-2.0, with one runtime dependency, the OpenAI client pointed at whatever compatible gateway the config names, and a suite of 703 tests that runs offline with no API key. One thing to know before you install it: the release on PyPI is the drafting half. It reads a CSV, writes the page of drafts, and exits. The connector and the approval gate that most of this post is about are in the repository and not yet in a release, so `pip install` today gets the part that cannot send anything at all."
      },
      {
        "type": "p",
        "md": "Its claims are written to be checked rather than believed. The review page above is the tool's own output; the run behind the table is written up in the repository with the command that reproduces it; and the README is not allowed to say bot, auto-reply, engagement, or growth, because a test fails the build on each of those words. Every one of them would claim something the code does not do."
      },
      {
        "type": "p",
        "md": "If you are about to build the afternoon version for a client of your own, read the guide for their platform before you write any code, then go and paste five characters into whatever confirmation prompt you already trust. The loop is the easy part, and it was never the part they were paying for."
      }
    ]
  },
  {
    "title": "Talos: a document-grounded team assistant, and the retrieval evaluation behind it",
    "slug": "talos-rag-retrieval-evaluation",
    "description": "A walkthrough of Talos, a team chat platform whose assistant answers from a team's own uploaded documents with citations. It covers the retrieval pipeline (hybrid search, cross-encoder reranking, cited generation) and the paired evaluation that found and fixed the chunking bug behind weak answers, raising judged correctness from 0.657 to 0.855 on the workspace's own corpus.",
    "date": "2026-07-05",
    "tags": [
      "RAG",
      "Retrieval",
      "Evaluation",
      "FastAPI",
      "Milvus",
      "AI/ML"
    ],
    "readingMinutes": 9,
    "body": [
      {
        "type": "p",
        "md": "Talos is a team chat platform, workspaces and channels and direct messages, with an assistant that answers questions from a team's own uploaded documents and cites where each answer came from. It was our graduation project, and I owned the AI, retrieval, and evaluation. This post walks through how the assistant works and how I found and fixed the thing that was making its answers weak. If you want the shorter visual tour instead, the [case study](/projects/talos) tells the same story with more screenshots."
      },
      {
        "type": "h2",
        "text": "What Talos does"
      },
      {
        "type": "p",
        "md": "From the outside it looks like any team chat app: workspaces, channels, direct messages, group chats, threads, and mentions that turn into notifications. Sign-in runs over passwords, TOTP, Google and GitHub OAuth, and WebAuthn passkeys, with JWE-encrypted sessions. The part that makes it Talos is the assistant sitting inside the chat. You ask it something in a channel and it answers from the workspace's files, with numbered citations you can check."
      },
      {
        "type": "figure",
        "src": "/projects/talos/01-chat-ai-answer.png",
        "alt": "A team channel where a user asks the Talos assistant how it decides which document chunks to use, and it replies with a grounded answer that cites its sources with bracketed numbers.",
        "caption": "Ask the assistant in any channel; it retrieves, reranks, and answers with citations."
      },
      {
        "type": "p",
        "md": "It's grounded on purpose. The assistant answers only from the workspace's own documents, scoped so one team's files never show up in another team's answers, and it says so when the corpus doesn't cover the question instead of guessing."
      },
      {
        "type": "figure",
        "src": "/projects/talos/05-ai-assistant.png",
        "alt": "The dedicated Talos AI page, grounded in the workspace corpus and answering with citations.",
        "caption": "A workspace-grounded assistant, not a generic chatbot."
      },
      {
        "type": "h2",
        "text": "How the assistant answers"
      },
      {
        "type": "p",
        "md": "A file goes in once and gets processed out of band. A question then runs through two retrieval stages before the model ever sees it. The whole path is five steps:"
      },
      {
        "type": "ul",
        "items": [
          "**Upload.** A file lands in MinIO, checked by magic-byte MIME sniffing, size-capped, and SHA-256 deduped. The API returns `202` and hands off to a background worker.",
          "**Process.** A taskiq worker parses the document, chunks it by title, embeds each chunk with `bge-small`, and writes the vectors into the workspace's Milvus collection.",
          "**Retrieve.** A question runs dense search and BM25 in parallel, fused with reciprocal rank fusion, fetching around 50 candidates so nothing good gets missed early.",
          "**Rerank.** A cross-encoder reads the question and each candidate together and keeps the top 10. That second pass is what pulls the right passage up from the pack.",
          "**Answer.** The model answers from the reranked passages only, streamed token by token with inline citations. Ask something out of corpus and it says so instead of guessing."
        ]
      },
      {
        "type": "p",
        "md": "Processing is asynchronous on purpose. The upload endpoint returns immediately and the worker does the slow work, so a half-ingested file can never be queried as if it were ready. Storage and search stay separate too: MinIO holds the raw bytes and issues short-lived presigned download URLs, Milvus holds the vectors in one collection per workspace. Soft-deleting a file drops its chunks from Milvus as well, so retrieval never surfaces something a user thought they deleted."
      },
      {
        "type": "figure",
        "src": "/projects/talos/04-documents.png",
        "alt": "The Documents page showing drag-and-drop upload, Drive import, and indexed files marked Ready.",
        "caption": "Upload documents (PDF, DOCX, PPTX, TXT, MD, and images) or import from Drive; they're parsed, chunked, and indexed for retrieval."
      },
      {
        "type": "h2",
        "text": "The problem: the assistant gave weak answers"
      },
      {
        "type": "p",
        "md": "Early on, the in-channel assistant kept giving thin, hand-wavy answers on a workspace whose corpus was a single 90-page guide. It wasn't the model and it wasn't the prompt. I went and looked at what retrieval was actually pulling, and the problem was upstream of all of it. That one document had been ingested with a recursive splitter that cut it into 1,778 tiny fragments, median 67 characters each. At that size, whole-page boilerplate outranked the real content, so the assistant was reading headers and footers instead of answers."
      },
      {
        "type": "h2",
        "text": "Measuring the fix"
      },
      {
        "type": "p",
        "md": "A hunch isn't a fix, so I ran a real experiment. I wrote 83 questions with page-level gold labels, LLM-authored and then LLM-reviewed, and paraphrase-constrained so a question couldn't win just by sharing words with its source. The harness runs the exact production chunking, retrieval, and prompt. The only thing swapped out is the vector store, replaced with an in-memory one that ranks by the same cosine geometry, so the evaluation measures what actually ships. I swept 48 retrieval configurations, then took 5 arms all the way to a graded answer, scored by a gpt-4o judge against the reference answer, paired per question, with Wilcoxon signed-rank tests, Holm correction, and effect sizes."
      },
      {
        "type": "table",
        "headers": ["Arm", "Config", "Correctness", "Δ", "Wilcoxon p", "Effect r"],
        "rows": [
          ["A0 baseline", "recursive chunks + MiniLM, rerank 20→5", "0.657", "ref", "n/a", "n/a"],
          ["A1", "by_title chunks + MiniLM, 50→10", "0.843", "+0.186", "8.2e-06", "0.79"],
          ["A2 (winner)", "by_title + bge-small, 50→10, rewrite on", "0.855", "+0.198", "5.5e-06", "0.81"],
          ["A3", "A2 without query rewrite", "0.849", "+0.192", "3.3e-05", "0.67"],
          ["A4", "A2 without reranker", "0.837", "+0.180", "3.8e-05", "0.64"]
        ],
        "highlightRow": 2,
        "caption": "Judged answer correctness across five end-to-end arms, 83 questions, scored by a gpt-4o judge and paired per question."
      },
      {
        "type": "p",
        "md": "The reading is clean. Chunk hygiene was the whole ballgame: fixing the fragmentation alone lifted correctness by 18.6 points, before touching the embedder or anything else. Swapping MiniLM for `bge-small` added a small, consistent gain on top. The reranker earned its latency, since dropping it cost real accuracy end to end. Query rewrite was marginal on these standalone questions, but I left it on because a separate benchmark showed it worth about +0.41 recall@5 on conversational follow-ups, which is where it matters."
      },
      {
        "type": "callout",
        "title": "What this does and doesn't prove",
        "md": "The questions and the judge are both LLMs, so there are no human relevance labels here. And it's one corpus in one domain, so the +19.8-point headline is specific to this document's particular problem, not a general benchmark. What transfers is the direction: chunk hygiene mattered far more than the embedder, which mattered more than the reranker or the rewrite. That ordering is the finding worth carrying to the next corpus."
      },
      {
        "type": "h2",
        "text": "The same assistant, in Slack"
      },
      {
        "type": "p",
        "md": "A team doesn't always want a new app, so the assistant meets them where they already are. An MCP server exposes Jira, GitHub, filesystem, chat, and RAG tools, and a Slack bot answers over the same workspace corpus, citing the exact PDF page it drew from."
      },
      {
        "type": "figure",
        "src": "/projects/talos/08-slack-integration.png",
        "alt": "The Talos app answering a question in Slack and citing a source PDF page.",
        "caption": "The same assistant, in Slack: it answers from your documents and cites the source."
      },
      {
        "type": "figure",
        "src": "/projects/talos/09-slack-compare.png",
        "alt": "Talos answering in Slack with multi-source citations across several document pages.",
        "caption": "Grounded, multi-source answers delivered where the team already works."
      },
      {
        "type": "h2",
        "text": "What shipped"
      },
      {
        "type": "p",
        "md": "The project got an A+. We deployed it and ran the whole thing live during the defense, then took the hosted app down afterward. The [code is on GitHub](https://github.com/Ab-Romia/talos). It was a team project; my track was the AI, retrieval, evaluation, and deployment, and the full team is credited in the [case study](/projects/talos)."
      },
      {
        "type": "p",
        "md": "If I kept going, the next moves are clear. The honest gap in the evaluation is the lack of human relevance labels, so real qrels come first. After that, more than one corpus and more than one domain, to see which of these gains hold and which were specific to this document. Then the ordinary work of scaling: the retrieval path is sound, but the indexing and memory would need real load before I'd trust them under a busy team."
      }
    ]
  },
  {
    "title": "The Virtual Bank System: event-driven microservices and a correct transfer saga",
    "slug": "event-driven-bank-transfer-saga",
    "description": "A study guide to the Virtual Bank System: a Spring Cloud Gateway fronting four core services, synchronous REST at the edge and an event-driven transfer saga over Kafka. It explains the architecture, the transfer step by step, and the three mechanisms that keep the money path correct: the transactional outbox, idempotent consumers, and pessimistic locking.",
    "date": "2025-07-15",
    "tags": [
      "Microservices",
      "Event-Driven",
      "Spring Boot",
      "Kafka",
      "Distributed Systems",
      "Backend"
    ],
    "readingMinutes": 12,
    "body": [
      {
        "type": "p",
        "md": "This is a walkthrough of the Virtual Bank System, a small bank built as event-driven microservices in Spring Boot. The code is small and meant to be read: the goal here is to explain how the parts fit and why the money path is correct. A transfer cannot double-spend, cannot drive a balance negative, is idempotent under retries, and survives a service or broker restart without losing or inventing money. The [code is on GitHub](https://github.com/Ab-Romia/Virtual-Bank-System) and the whole thing comes up with one command. I have organized this around the concepts a learner can carry out of it, each tied to the running system."
      },
      {
        "type": "h2",
        "text": "What the app does"
      },
      {
        "type": "p",
        "md": "Before the internals, here is the system from the outside. A React single-page app talks to one gateway. You sign in, see your accounts and balances, open accounts, deposit, and transfer money between accounts. Every transfer keeps a history you can read back."
      },
      {
        "type": "figure",
        "src": "/blog/virtual-bank/dashboard.png",
        "alt": "The Virtual Bank dashboard. Two account cards: a CHECKING account ending 4917 with a $3,200.00 balance marked ACTIVE, and a SAVINGS account ending 7908 with a $0.00 balance marked ACTIVE. An Open account button sits to the right and a Recent transfers panel below reads No transfers yet.",
        "caption": "The dashboard after sign-in: account cards with balances and status, aggregated by the gateway into one response."
      },
      {
        "type": "p",
        "md": "Opening an account is a short dialog that takes a type and a currency, and the new card starts at a zero balance. Depositing is a similar dialog scoped to one account. A deposit is a synchronous credit handled inside account-service, so the new balance is visible the moment the call returns."
      },
      {
        "type": "figure",
        "src": "/blog/virtual-bank/open-account.png",
        "alt": "An Open account dialog over the dashboard, with an Account type field set to Checking and a Currency field set to USD, and Cancel and Open account buttons.",
        "caption": "The open-account dialog: pick a type and a currency. This is a synchronous request to account-service."
      },
      {
        "type": "figure",
        "src": "/blog/virtual-bank/deposit.png",
        "alt": "A Deposit dialog over the dashboard, labeled Into CHECKING ending 4917, with an Amount (USD) field and Cancel and Deposit buttons.",
        "caption": "The deposit dialog, scoped to one account, which funds it so a transfer has something to move."
      },
      {
        "type": "p",
        "md": "The transfer screen is where the event path becomes visible. You pick a source account and a destination, enter an amount, and send. The app follows the transfer to its outcome and shows the audit history that audit-service built by consuming the event streams. Here a transfer of $750.00 has settled to COMPLETED, with its history listing REQUESTED and then COMPLETED, each with a timestamp. Those two entries come from two different events on the event path, recorded independently. That ordered, two-step history is what the rest of this post explains."
      },
      {
        "type": "figure",
        "src": "/blog/virtual-bank/transfer.png",
        "alt": "The Transfer money screen. A form moves funds from a CHECKING account ending 4917 ($3,200.00) to a destination account id, with an amount of 750. Below it a card shows a COMPLETED transfer of $750.00 with a HISTORY listing REQUESTED then COMPLETED, each with a timestamp.",
        "caption": "A $750.00 transfer settled to COMPLETED, with the audit history audit-service recorded from the event streams: REQUESTED, then COMPLETED, each timestamped."
      },
      {
        "type": "figure",
        "src": "/blog/virtual-bank/dashboard-activity.png",
        "alt": "The dashboard after the transfer. The CHECKING account ending 4917 now shows $2,450.00 and the SAVINGS account ending 7908 shows $750.00. A Recent transfers table lists one row from an account ending c35b to one ending 2b0c, amount $750.00, status COMPLETED.",
        "caption": "After the transfer: checking dropped from $3,200.00 to $2,450.00, savings rose to $750.00, and the recent-transfers panel shows the completed movement."
      },
      {
        "type": "h2",
        "text": "The system at a glance"
      },
      {
        "type": "p",
        "md": "Five Spring Boot apps make up the system: a Spring Cloud Gateway and four services behind it. The gateway is the only thing reachable from outside: it validates the request's token, routes `/api/**` to a service, and aggregates the dashboard. Behind it, the four services each own a single responsibility, backed by one PostgreSQL server (a database per service) and one KRaft Kafka broker. An optional Spring AI assistant over OpenRouter can be turned on (it uses a local embedding model for retrieval and degrades gracefully without a key), and so can a Tempo, Prometheus, and Grafana stack for observability."
      },
      {
        "type": "figure",
        "src": "/blog/virtual-bank/architecture.svg",
        "alt": "A client calls a gateway over REST; the gateway validates a JWT and routes to user-service, account-service, transaction-service, and audit-service. Each service has its own PostgreSQL database. A dashed asynchronous path runs from transaction-service to the Kafka transfer.commands topic, into account-service, back out to the transfer.events topic, into transaction-service, and into audit-service from both the transfer.commands and transfer.events topics.",
        "caption": "Solid arrows are synchronous REST at the edge; dashed arrows are the asynchronous event path over Kafka. Only the gateway is reachable from outside, and every service validates the same token."
      },
      {
        "type": "p",
        "md": "The split between the two arrow styles is the first concept to hold onto. Everything a client does is a synchronous request over HTTP: register, log in, open an account, deposit, read balances, start a transfer, read a transfer's status. Exactly one thing is asynchronous over Kafka: the transfer itself. Starting a transfer returns `202 Accepted` immediately, and the actual money movement happens on the event path while the client polls for the result. So the system is synchronous at the edge and event-driven in its core, where the consistency requirements concentrate."
      },
      {
        "type": "ul",
        "items": [
          "gateway (Spring Cloud Gateway): the single entry point. It validates the JWT, routes `/api/**`, and aggregates the dashboard.",
          "user-service: identity. Registration, login, RS256 JWT issuance, and a JWKS endpoint that publishes its public keys.",
          "account-service: accounts and balances. It applies a transfer atomically; both the debit and the credit live here.",
          "transaction-service: the transfer ledger. It records a transfer, orchestrates it on the event path, and marks its outcome.",
          "audit-service: an event-sourced, queryable history. It is a separate consumer of the transfer streams and records one immutable entry per event."
        ]
      },
      {
        "type": "p",
        "md": "The stack is Java 21 with virtual threads, Spring Boot 3.5, Spring Cloud Gateway, Spring Kafka on a single KRaft broker, Spring Security as an OAuth2 resource server (RS256 JWT plus JWKS), Spring Data JPA with Flyway, PostgreSQL, Micrometer Tracing with OpenTelemetry, and Testcontainers. Shared events, the outbox, and the security code live in a `vbank-common` Spring Boot starter so the services cannot drift apart on them."
      },
      {
        "type": "h2",
        "text": "Database per service"
      },
      {
        "type": "p",
        "md": "Each service owns its own schema in PostgreSQL, and no service reads another service's tables. user-service holds users, account-service holds accounts and balances, transaction-service holds the transfer ledger, and audit-service holds the immutable audit entries. Two extra tables appear only in the services that publish or consume events: an `OUTBOX` table and a `PROCESSED_EVENTS` table, both explained in the sections below. Keeping the data private to each service is what lets them deploy and evolve independently, and it is why they communicate only through the gateway's API or through Kafka, never by sharing a database."
      },
      {
        "type": "h2",
        "text": "The transfer saga, step by step"
      },
      {
        "type": "p",
        "md": "A transfer is coordinated by transaction-service and executed by account-service. The two services never call each other directly; they exchange a request and a result over Kafka, and each writes those messages through a transactional outbox. Both accounts live in account-service's database, so the debit and the credit are a single local ACID transaction. The transfer still routes through Kafka rather than a direct call, because that gives a durable, replayable, audited record, and it leaves room for the destination to move to another service or bank later."
      },
      {
        "type": "figure",
        "src": "/blog/virtual-bank/transfer-saga.svg",
        "alt": "Swimlanes for client, transaction-service, Kafka, and account-service. The client posts a transfer with an Idempotency-Key; transaction-service writes a PENDING transfer and a TransferRequested row to its outbox in one transaction and returns 202; a relay publishes the outbox row to the transfer.commands topic; account-service consumes it, locks both accounts, applies debit and credit in one atomic idempotent local transaction, and emits the result on transfer.events through its own outbox; transaction-service marks the transfer COMPLETED, or FAILED on insufficient funds. Three labels mark the outbox, the idempotent consumer, and the pessimistic lock.",
        "caption": "The transfer saga in swimlanes. Three labels mark the mechanisms that keep it correct: the outbox, the idempotent consumer, and the pessimistic lock. The FAILED branch is the insufficient-funds path."
      },
      {
        "type": "p",
        "md": "Reading the flow in order:"
      },
      {
        "type": "ul",
        "items": [
          "The client posts the transfer with an `Idempotency-Key` header. The gateway validates the JWT and forwards it to transaction-service.",
          "transaction-service writes a `PENDING` transfer and a `TransferRequested` event into its outbox in one database transaction, then returns `202 Accepted` with the transfer id and a status URL.",
          "A relay reads unsent outbox rows and publishes the `TransferRequested` event to the `transfer.commands` topic.",
          "account-service consumes the event, takes a pessimistic write lock on both accounts, validates, and applies the debit and credit in one atomic, idempotent local transaction, then emits `TransferCompleted` or `TransferFailed` on the `transfer.events` topic through its own outbox.",
          "transaction-service consumes the result and marks the transfer `COMPLETED`, or `FAILED` on insufficient funds.",
          "audit-service is a separate consumer reading both `transfer.commands` and `transfer.events`, so it records the REQUESTED entry and the outcome entry independently.",
          "The client polls the status URL and reads `COMPLETED` or `FAILED`."
        ]
      },
      {
        "type": "p",
        "md": "A poison message, anything that keeps failing, is routed to a per-topic dead-letter topic so one bad record does not block the partition or get silently dropped. Three properties make this correct: the transactional outbox, idempotent consumers, and pessimistic locking. Each maps to a label on the saga diagram above, and the next three sections take them one at a time."
      },
      {
        "type": "h2",
        "text": "The transactional outbox: events are never lost"
      },
      {
        "type": "p",
        "md": "The naive way to publish an event is to save your row, then send to Kafka. If the process dies between those two steps, the state changed but nobody heard about it, or the reverse. The outbox pattern removes that gap. A service writes the business row and a row describing the event into the same database, in the same transaction. A small relay later reads unsent outbox rows and publishes them to Kafka. The event cannot exist without its state change committing, and once written it cannot be dropped. In this system the `OUTBOX` table lives in both account-service and transaction-service, since both publish events. This is why a crash mid-transfer is safe: when the service comes back, the relay picks up where it left off."
      },
      {
        "type": "h2",
        "text": "Idempotent consumers: money never moves twice"
      },
      {
        "type": "p",
        "md": "Kafka delivers at least once, so account-service assumes it will see the same transfer request more than once. Before it touches a balance, it records the transfer id in its `PROCESSED_EVENTS` table, in the same transaction as the money movement. A redelivery finds the id already there and does nothing. The transfer id is the idempotency key all the way through, including the client's `Idempotency-Key` header, so re-posting the same transfer returns the same one instead of creating a second. The same guard protects transaction-service when it consumes results, and `AUDIT_ENTRIES` is unique on (transfer_id, event_type) so a redelivered event is recorded once."
      },
      {
        "type": "h2",
        "text": "Pessimistic locking: no double-spend"
      },
      {
        "type": "p",
        "md": "When account-service applies a transfer it takes a pessimistic write lock on both accounts, in a fixed id order so two opposite-direction transfers cannot deadlock, then moves the money. Concurrent transfers on the same account serialize instead of racing. A `CHECK (balance >= 0)` constraint is the backstop that makes a negative balance impossible even if the logic were wrong. Because both accounts share account-service's database, the debit and the credit are a single ACID transaction that either fully happens or does not."
      },
      {
        "type": "callout",
        "title": "Why a lock and a constraint",
        "md": "Two callers both read the balance, both pass the check, and both write, so one dollar becomes two. A pessimistic write lock serializes the change so the second caller reads the balance the first already left, a `CHECK (balance >= 0)` constraint backs it at the database level, and recording the transfer id makes the operation safe to repeat. Together the outbox, idempotency, and locking keep the money path correct under retries and restarts."
      },
      {
        "type": "p",
        "md": "A concurrency test verifies this. It seeds an account with 100.00, then fires twenty transfers of 10.00 at it from twenty threads released at the same instant by a `start` latch, and waits on a `done` latch. The source can fund exactly ten of the twenty, so the lock must serialize them: the balance lands on exactly 0.00, the destination on 100.00, and the outbox holds ten `TransferCompleted` results and ten `INSUFFICIENT_FUNDS` failures. The assertions read the outbox directly rather than a broker, so the test needs no Kafka:"
      },
      {
        "type": "code",
        "code": "@Test\nvoid concurrentTransfersNeverDoubleSpend() throws InterruptedException {\n    Account source = seedAccount(OWNER, new BigDecimal(\"100.00\"));\n    Account destination = seedAccount(OWNER, new BigDecimal(\"0.00\"));\n\n    int transfers = 20;\n    BigDecimal amount = new BigDecimal(\"10.00\");\n    ExecutorService pool = Executors.newFixedThreadPool(transfers);\n    CountDownLatch start = new CountDownLatch(1);\n    CountDownLatch done = new CountDownLatch(transfers);\n\n    for (int i = 0; i < transfers; i++) {\n        pool.submit(() -> {\n            try {\n                start.await();                                       // release all at once\n                transferService.apply(command(source, destination, amount));\n            } catch (InterruptedException e) {\n                Thread.currentThread().interrupt();\n            } finally {\n                done.countDown();\n            }\n        });\n    }\n    start.countDown();\n    assertThat(done.await(60, TimeUnit.SECONDS)).isTrue();\n\n    // the source funds exactly 10 of 20; it lands on 0 and never goes negative\n    assertThat(balanceOf(source)).isEqualByComparingTo(\"0.00\");\n    assertThat(balanceOf(destination)).isEqualByComparingTo(\"100.00\");\n    // 10 TransferCompleted and 10 INSUFFICIENT_FUNDS in the outbox\n}"
      },
      {
        "type": "h2",
        "text": "Security: every service validates the token"
      },
      {
        "type": "p",
        "md": "user-service issues an RS256 JWT on login and publishes its public keys at `/.well-known/jwks.json`. The gateway validates that token, and so does every service behind it, against the same JWKS. This is defense in depth: a request that somehow reaches a service without passing through the gateway still cannot read or move another user's money."
      },
      {
        "type": "ul",
        "items": [
          "The user id always comes from the token's `sub` claim, never from a request parameter or body.",
          "Ownership is checked on every account and transfer resource, so one user cannot read or move another user's money.",
          "Passwords are hashed with BCrypt.",
          "Secrets come from the environment, never the source tree."
        ]
      },
      {
        "type": "h2",
        "text": "Observability: a trace that crosses Kafka"
      },
      {
        "type": "p",
        "md": "Each service bridges Micrometer observations to OpenTelemetry and exports spans over OTLP. Kafka producer and consumer observation is turned on, so the W3C `traceparent` header rides along on every record and the trace continues on the far side of the broker: a single trace shows transaction-service publishing a command and account-service plus audit-service consuming it. An opt-in compose override adds Tempo for traces, Prometheus for metrics, and Grafana to view both. Tracing is off in the lean default run and on under the override."
      },
      {
        "type": "callout",
        "title": "Where the trace stops",
        "md": "The HTTP request that starts a transfer and the Kafka publish that carries it out are linked but separate traces, not one tree. The outbox relay publishes on its own schedule, decoupled from the request thread, so the producer span roots at the relay rather than the original request. Joining them would mean storing the trace context in the outbox row and restoring it in the relay. This trades a single tidy trace for the durability the outbox provides."
      },
      {
        "type": "h2",
        "text": "Running it"
      },
      {
        "type": "p",
        "md": "The only requirement is Docker (or podman) and Docker Compose; the services build from source inside the images. One command brings up PostgreSQL, a single KRaft Kafka broker, and the five Spring Boot apps, with the gateway on `http://localhost:8080`:"
      },
      {
        "type": "code",
        "code": "git clone https://github.com/Ab-Romia/Virtual-Bank-System.git\ncd Virtual-Bank-System\ncp .env.example .env        # adjust the Postgres password for anything real\ndocker compose up --build   # gateway on http://localhost:8080"
      },
      {
        "type": "p",
        "md": "From there you can walk a transfer end to end with curl: register and log in to get a token, open two accounts and fund one, post a transfer with an `Idempotency-Key`, then read the result and the audit trail."
      },
      {
        "type": "code",
        "code": "# register and log in\ncurl -s -XPOST localhost:8080/api/auth/register -H 'Content-Type: application/json' \\\n  -d '{\"username\":\"alice\",\"email\":\"a@example.com\",\"password\":\"pw123456\",\"fullName\":\"Alice\"}'\nTOKEN=$(curl -s -XPOST localhost:8080/api/auth/login -H 'Content-Type: application/json' \\\n  -d '{\"username\":\"alice\",\"password\":\"pw123456\"}' | sed 's/.*\"accessToken\":\"\\([^\"]*\\)\".*/\\1/')\nAUTH=\"Authorization: Bearer $TOKEN\"\n\n# open two accounts, fund one\nA=$(curl -s -XPOST localhost:8080/api/accounts -H \"$AUTH\" -H 'Content-Type: application/json' -d '{\"type\":\"CHECKING\",\"currency\":\"USD\"}' | sed 's/.*\"id\":\"\\([^\"]*\\)\".*/\\1/')\nB=$(curl -s -XPOST localhost:8080/api/accounts -H \"$AUTH\" -H 'Content-Type: application/json' -d '{\"type\":\"SAVINGS\",\"currency\":\"USD\"}'  | sed 's/.*\"id\":\"\\([^\"]*\\)\".*/\\1/')\ncurl -s -XPOST localhost:8080/api/accounts/$A/deposit -H \"$AUTH\" -H 'Content-Type: application/json' -d '{\"amount\":100}' >/dev/null\n\n# transfer 30 (returns 202 with a transfer id), then read the result and the audit trail\nTX=$(curl -s -XPOST localhost:8080/api/transfers -H \"$AUTH\" -H 'Content-Type: application/json' -H 'Idempotency-Key: demo-1' \\\n  -d \"{\\\"fromAccountId\\\":\\\"$A\\\",\\\"toAccountId\\\":\\\"$B\\\",\\\"amount\\\":30,\\\"currency\\\":\\\"USD\\\"}\" | sed 's/.*\"transferId\":\"\\([^\"]*\\)\".*/\\1/')\ncurl -s localhost:8080/api/transfers/$TX -H \"$AUTH\"          # COMPLETED or FAILED\ncurl -s localhost:8080/api/audit/transfers/$TX -H \"$AUTH\"   # the REQUESTED + COMPLETED trail"
      },
      {
        "type": "p",
        "md": "Two optional profiles add to the lean run when you want them: an observability override that brings up Tempo, Prometheus, and Grafana on `http://localhost:3000`, and an AI profile that starts the Spring AI assistant when you supply a free OpenRouter key. Running `./mvnw verify` exercises the unit and Testcontainers integration tests, including the concurrency test above and the saga, idempotency, and audit tests."
      },
      {
        "type": "h2",
        "text": "What to take away"
      },
      {
        "type": "p",
        "md": "The core of this project is the three mechanisms that make the events trustworthy: the transactional outbox so events are never lost, idempotent consumers keyed by the transfer id so at-least-once delivery never moves money twice, and pessimistic locking plus a `CHECK (balance >= 0)` constraint so concurrent transfers cannot double-spend. The gateway, the per-service databases, the audit log, and the tracing all exist to make those mechanisms easy to inspect. The full diagrams and reasoning, including where the trace stops, are in the [architecture notes](https://github.com/Ab-Romia/Virtual-Bank-System/blob/main/docs/architecture.md)."
      }
    ]
  },
  {
      "title": "When a speech-emotion model is really just recognizing the actors",
      "slug": "speaker-leakage-ravdess",
      "description": "A speech-emotion model can look impressive and still be mostly memorizing the 24 RAVDESS actors. Here is the leak, the speaker-independent pipeline that replaced it (frozen WavLM, layer weighting, attentive pooling, calibrated late fusion), and the honest speaker-independent result: 78.8%.",
      "date": "2025-11-01",
      "tags": [
        "Speech",
        "Emotion Recognition",
        "Evaluation",
        "WavLM",
        "Multimodal"
      ],
      "readingMinutes": 14,
      "body": [
        {
          "type": "h2",
          "text": "An accuracy that was answering an easier question"
        },
        {
          "type": "p",
          "md": "I had a speech-emotion model I was proud of. The first thing I found when I rebuilt it was that its accuracy was mostly the model recognizing the 24 RAVDESS actors, not reading their emotions. It had been graded on the same people it trained on, and once I stopped letting it do that, a chunk of the accuracy went with it."
        },
        {
          "type": "p",
          "md": "This is the honest rebuild: a speaker-independent pipeline that fuses voice and face, with every number measured on people the model has never heard or seen. The [code is on GitHub](https://github.com/Ab-Romia/RAVDESS-emotion-recognition) and there is a [live demo](https://huggingface.co/spaces/Ab-Romia/RAVDESS-emotion-recognition) you can talk to. The headline number is 78.8%, speaker-independent, and by the end of this post you can see exactly why it is worth more than that inflated score was."
        },
        {
          "type": "h2",
          "text": "The whole system in one picture"
        },
        {
          "type": "p",
          "md": "Before any of the details, here is the entire system. Two models, trained separately, that only meet at the very end when their probabilities are combined. Keep this picture in mind; every section below zooms into one piece of it."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/system-pipeline-overview.svg",
          "alt": "Two lanes that merge: an emerald audio path (waveform, frozen WavLM-large, layer weighting, attentive pooling, MLP head) and a gray face path (frames, expression features, classifier), both producing class probabilities that feed a temperature-scaled weighted average into eight final emotion probabilities.",
          "caption": "The full pipeline. The audio branch carries most of the signal; the face is a separate, weaker model that is added only at the probabilities."
        },
        {
          "type": "p",
          "md": "The reason it is built as two separate models, rather than one network that swallows both, is the most interesting engineering decision in the project, and I will get to why the obvious alternative fails."
        },
        {
          "type": "h2",
          "text": "Why RAVDESS is a trap: 24 actors, two sentences"
        },
        {
          "type": "p",
          "md": "RAVDESS is a standard benchmark for emotion from speech. 24 professional actors each speak the same two sentences, \"Kids are talking by the door\" and \"Dogs are sitting by the door\", in eight emotions: neutral, calm, happy, sad, angry, fearful, disgust, surprised. That is 1440 short clips in total."
        },
        {
          "type": "p",
          "md": "Read that again. Twenty-four people, two sentences. That tiny, repetitive structure is what makes it a trap. There is so little variety that a model can do well by memorizing voices instead of learning emotion, and the standard way people split the data lets it do exactly that."
        },
        {
          "type": "h2",
          "text": "Split by clip and you measure the wrong thing"
        },
        {
          "type": "p",
          "md": "If you shuffle all 1440 clips and take a random fifth as your test set, the same actor saying the same sentence in the same emotion ends up on both sides, separated only by which of the two takes it was. The model never has to learn what anger sounds like in general. It only has to remember what actor 14 sounds like angry, because it already met actor 14 being angry in training."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/speaker-leakage-split.svg",
          "alt": "Top panel, a random split where actor 14 appears in both the train and test boxes, connected by a red arrow labeled same voice both sides, scoring ~78% inflated. Bottom panel, an actor-disjoint split with actors 1-20 in train and 21-24 in test, no actor crossing the divider, scoring 64.9% honest.",
          "caption": "The same actor on both sides of a random split is the leak. Splitting by actor closes it, and the score drops 13 points."
        },
        {
          "type": "p",
          "md": "I did not want to argue about this in the abstract, so I ran a controlled experiment: the same model, the same training code, the same everything, changing only the split."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/leak-vs-honest.png",
          "alt": "A bar chart comparing the same audio model: about 78% on a random split versus 64.9% on a speaker-independent split.",
          "caption": "Thirteen points from nothing but the partition. The high number is not a better model, only an easier test, and a random split like this is where almost every inflated RAVDESS score comes from."
        },
        {
          "type": "callout",
          "title": "The leak in one line",
          "md": "A random split lets the model memorize voices, then grades it on those same voices. The score goes up, but it is measuring speaker recognition, not emotion that transfers to a person it has never heard. The 90%-plus numbers you see quoted for RAVDESS are almost all this."
        },
        {
          "type": "h2",
          "text": "Proving the split is clean, mechanically"
        },
        {
          "type": "p",
          "md": "The fix is to split by actor. I use six-fold cross-validation where each fold tests on four actors who appear in no training or validation data, balanced by gender, and four more actors are held out of each training set for early stopping. No actor is ever on two sides of a fold."
        },
        {
          "type": "p",
          "md": "Because the entire result rests on this, I did not want to trust myself to get it right by hand. A unit test fails the build if any actor leaks across any fold:"
        },
        {
          "type": "code",
          "code": "def test_no_actor_leaks_across_splits():\n    for f in make_speaker_independent_folds(Config()):\n        assert not (set(f.train_actors) & set(f.test_actors))\n        assert not (set(f.val_actors) & set(f.test_actors))\n        assert set(f.train_actors | f.val_actors | f.test_actors) == set(range(1, 25))"
        },
        {
          "type": "h2",
          "text": "Is 64.9% just a bad model?"
        },
        {
          "type": "p",
          "md": "That was my first worry. Watching the honest score land at 64.9%, after the leaky split had flattered the same model to 78%, feels like failure. It is not. It lands almost exactly on the peer-reviewed, genuinely speaker-independent baseline: EmoBox (Interspeech 2024) reports 66.2% for a HuBERT-base model on RAVDESS under a comparable protocol. My 64.9% with the same encoder sitting right there is the evidence that the pipeline is honest, not broken. The 90s are the mirage; the 60s are the real floor for a base-size model. Now the job is to raise that floor without cheating."
        },
        {
          "type": "h2",
          "text": "The audio model: where emotion actually lives"
        },
        {
          "type": "p",
          "md": "The audio branch is a self-supervised speech encoder (WavLM-large) with a small head on top. Two choices in that head matter specifically for emotion, and they are worth understanding because they are where most of the honest gain comes from."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/audio-encoder-architecture.svg",
          "alt": "A frozen WavLM-large encoder shown as 25 stacked layer bars with the middle bars highlighted and labeled emotion lives here while the top is labeled the last layer drifts toward the words. All 25 outputs feed a learnable softmax layer-weighting box, then attentive statistics pooling that keeps a weighted mean and a weighted std, then an MLP head. A legend marks only the layer weights, pooling, and head as trainable; the encoder is frozen.",
          "caption": "The encoder stays frozen. All the learning happens in a small head that decides which layers to listen to and how to pool them."
        },
        {
          "type": "ul",
          "items": [
            "Learnable layer weighting. Instead of using only the encoder's final layer, the head learns a softmax-weighted sum over all 25 layers. Emotion is carried in the middle layers; the final layer has drifted toward the actual words being spoken, which is what the encoder was pretrained to predict.",
            "Attentive statistics pooling. The head pools both the attention-weighted mean and the standard deviation over time. Affect lives in how much the tone varies, and a plain average throws that variation away."
          ]
        },
        {
          "type": "p",
          "md": "The weighted-layer sum is a handful of lines, and the learned weights end up favoring the middle of the network, exactly as the intuition predicts:"
        },
        {
          "type": "code",
          "code": "stack = torch.stack(out.hidden_states, dim=0)   # (25, B, T, H)\nw = torch.softmax(self.layer_weights, dim=0)    # one learnable weight per layer\nhidden = (w.view(-1, 1, 1, 1) * stack).sum(0)   # weighted blend of all layers"
        },
        {
          "type": "p",
          "md": "And it does not just match the intuition in theory. These are the actual weights the head learned, read straight out of the trained checkpoint:"
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/layer-weighting.png",
          "alt": "A bar chart of the head's learned softmax weight for each of WavLM's 25 layers. The weights rise from the input layers, peak in the middle of the network around layer 11, then fall below the uniform baseline for the top transformer layers.",
          "caption": "Not a diagram I drew; these are the weights the head actually learned, pulled from the checkpoint. It leans on the middle layers, where prosody lives, and pushes the top layers, where speaker identity concentrates, below the uniform line."
        },
        {
          "type": "h2",
          "text": "When fine-tuning loses: frozen features win on small data"
        },
        {
          "type": "p",
          "md": "Here is the result that surprised me most. The obvious move is to fine-tune the big encoder on the task. I tried it, and WavLM-large fine-tuned scored 67.6%, which is below a simple frozen-feature baseline. A 300-million-parameter model fine-tuned on 1440 clips overfits, and the speaker-independent folds are exactly where that overfitting shows. So I froze the encoder entirely and put all of the learning into the small head described above. That gave 70.3%."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/training-curves.png",
          "alt": "Two panels of validation macro-F1 against training epoch, each showing six thin per-fold lines and a bold mean line, with the held-out test accuracy boxed in each. The frozen WavLM panel settles at 70.3% test; the full fine-tune panel reaches 67.6%.",
          "caption": "Validation macro-F1 through training, every fold drawn. The frozen probe climbs steadily and lands at 70.3% on held-out actors; fully fine-tuning the backbone on so few clips tops out lower, at 67.6%. Freezing is simpler here, and it wins."
        },
        {
          "type": "callout",
          "title": "The lesson",
          "md": "The bigger model helped, but only once I stopped fine-tuning it. On data this small, freezing the encoder and training a head that knows where to look beats a fully fine-tuned model, and it overfits the handful of training speakers far less. Restraint won."
        },
        {
          "type": "h2",
          "text": "The face has the same trap, in a new costume"
        },
        {
          "type": "p",
          "md": "RAVDESS is audio-visual, so the natural next step is to add the speaker's face. My first attempt made things worse, and the reason was the same lesson wearing a different costume. I had encoded each face with a standard image network trained on ImageNet, and I tested it the same way I tested the audio."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/face-identity-vs-expression-leak.svg",
          "alt": "Two grouped bars on an accuracy axis. ImageNet features score 89% when faces leak across the split but only 35% on new faces, a 54-point drop labeled it memorized identities, with a small face icon labeled encodes WHO. Facial-expression ViT features score 90% leaky and 58% on new faces, a much smaller 32-point gap, with a face icon labeled encodes WHAT.",
          "caption": "Same test as the audio. ImageNet face features memorize who the person is and collapse on new faces; expression features transfer."
        },
        {
          "type": "p",
          "md": "The ImageNet features scored 89% when the same faces leaked across the split but only 35% on faces the model had never seen. They were memorizing identity, not reading expressions, which is the visual version of the speaker leak. Swapping to a model trained on facial expressions shrank that gap from 54 points to 32, lifting new-face accuracy to 58%. Now the face carried something real and transferable, worth fusing."
        },
        {
          "type": "h2",
          "text": "Why the obvious fusion fails, and the one that works"
        },
        {
          "type": "p",
          "md": "With a 70% audio model and a 58% face model, fusing them should be easy. It is not. The obvious approach, one network trained on both streams at once, scored 43 to 47%, below either model alone. That is a known failure mode called modality competition: with so few clips and identities, the optimizer leans on whichever stream is easier to fit on the training data, which here was the face with its leftover identity signal, and the joint model transfers worse than just trusting the audio."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/joint-vs-late-fusion.svg",
          "alt": "Left, naive joint fusion: audio and face features flow into one learned fusion head, the optimizer leans on the easier stream, and it collapses to 43-47% from modality competition. Right, calibrated late fusion: separate audio and face models each produce probabilities, each temperature-scaled on validation, then a weighted average, reaching 78.8%, with a w slider noting that w=1 keeps audio-only in the grid so the blend can never do worse than audio.",
          "caption": "Training the two streams together lets the weaker one drag the model down. Combining only their probabilities, with a validation-tuned weight, cannot."
        },
        {
          "type": "p",
          "md": "The fix is decision-level fusion, the rule that won the older audio-video emotion challenges for exactly this reason. Keep the two models separate, let each be its best, and combine only their class probabilities. Two details make the average safe instead of harmful: calibrate each model with temperature scaling so a confidently-wrong face cannot shout down a quiet-but-right voice, and choose the mixing weight on held-out validation, where audio-only (weight one) is always one of the options."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/calibrated-late-fusion-detail.svg",
          "alt": "Audio logits and face logits each divided by a temperature fit on validation and floored at 1.0 so it can only soften, shown as an overconfident bar distribution softening. The two are combined as w times audio plus (1 minus w) times face, with the weight swept on validation only and w=1 marked as the audio floor. A note states temperatures and weight never see the test actors.",
          "caption": "The temperatures and the weight are fit per fold on the training and validation actors only, never on the test actors, so the gain cannot smuggle the leak back in."
        },
        {
          "type": "p",
          "md": "Choosing that weight on validation, never on the test set, is what separates a real gain from a fake one. Because weight one means audio only, the floor is guaranteed: late fusion can never score below the better single model."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/fusion-calibration.png",
          "alt": "Two panels of the real per-fold fusion settings. Left, the audio and visual temperatures for each of the six folds, every bar above the T=1 line, so both streams are softened. Right, the audio versus visual weight per fold, audio between 0.50 and 0.55.",
          "caption": "What the calibration actually chose, fold by fold. Every temperature lands above one, so both networks were overconfident and got softened; the validation search settles audio at 0.50 to 0.55 of the blend. None of these values ever sees a test actor."
        },
        {
          "type": "h2",
          "text": "Fold by fold, emotion by emotion"
        },
        {
          "type": "p",
          "md": "Put the whole arc on one axis. Every number here is speaker-independent, the mean across six actor-disjoint folds."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/model-comparison.png",
          "alt": "A horizontal bar chart, every result measured in this post. Audio-visual fusion 78.8% and the same HuBERT on a leaky random split 78.0% (red) sit at the top, then WavLM frozen probe 70.3%, WavLM fine-tuned 67.6% (gray), HuBERT-base 64.9%, and facial expression only 58.1%.",
          "caption": "Every result in this post on one axis, drawn straight from the saved runs. The honest progression is emerald; the fine-tuned model that overfit is gray; the leaky split is red, and notice it scores as high as the real best system. That is the whole point: leakage can fake a great number."
        },
        {
          "type": "p",
          "md": "The means above hide nothing, because here is every fold behind them. The spread is real, and reporting it honestly is part of the point."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/per-fold-spread.png",
          "alt": "A dot plot with one dot per fold for four models. HuBERT-base clusters near 64.9%, WavLM fine-tuned near 67.6%, WavLM frozen near 70.3% with one weak fold near 57%, and audio-visual fusion near 78.8% with one fold reaching 87.5%. A dashed line marks the 1/8 chance level.",
          "caption": "The same means, with every actor-disjoint fold plotted. Frozen WavLM has one genuinely hard fold near 57%, which is exactly why I quote a standard deviation and not just an average."
        },
        {
          "type": "p",
          "md": "Calibrated late fusion reaches 78.8%, a real 8.5 points over the 70.3% audio model, with no leak. The face is not magic; it is a modest, honest lift that the simple combination rule is able to keep. Per emotion, the model is confident where the voice is unambiguous and hesitant where people hesitate too."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/per-emotion-f1.png",
          "alt": "A horizontal bar chart of per-emotion F1 for the fused model, sorted from highest to lowest: happy 0.87, angry 0.84, calm 0.84, disgust 0.81, surprised 0.80, neutral 0.75, fearful 0.74, sad 0.63.",
          "caption": "Where the fused model is strong and where it struggles. Happy, angry and calm are clean; sad is the hardest at 0.63."
        },
        {
          "type": "figure",
          "src": "/blog/ravdess-emotion/confusion-matrix.png",
          "alt": "A row-normalized confusion matrix for the fused speaker-independent model across the eight emotions, brightest on the diagonal, with sad most often confused with the other low-arousal emotions calm and neutral, and calm leaking into neutral.",
          "caption": "The same story as a matrix, which shows where it slips, not just how often. Sad is most often mistaken for calm or neutral, and calm itself leaks into neutral. These low-arousal, quiet emotions sound alike, and people mix them up from audio too."
        },
        {
          "type": "h2",
          "text": "What it does not do"
        },
        {
          "type": "p",
          "md": "A model is only as honest as its limitations, so here they are plainly:"
        },
        {
          "type": "ul",
          "items": [
            "1440 clips and only 24 actors. The speaker-independent numbers carry a real standard deviation across folds, from about 2 points for the steadier models to 6 for the noisiest, as the per-fold plot above shows, and no amount of cleverness changes that the dataset is small.",
            "Acted, frontal, clean. RAVDESS emotions are performed in a studio. These numbers do not transfer directly to spontaneous, in-the-wild speech and faces.",
            "One corpus. Cross-dataset generalization is a separate, harder question I did not test here.",
            "The hosted demo runs the audio branch only. The face and fusion pipeline needs video frames and more compute than a free CPU Space, so the live demo predicts from voice alone at 70.3%."
          ]
        },
        {
          "type": "h2",
          "text": "What the rebuild was really about"
        },
        {
          "type": "p",
          "md": "In the end this taught me less about emotion and more about measurement. The first version was not dishonest on purpose; it just answered an easier question than the one I thought I was asking. \"Can it read emotion in actors it already knows\" is a very different, much easier question than \"a person it has never met.\" The second one is the one that matters, and it is the one worth reporting even when the number is smaller."
        },
        {
          "type": "p",
          "md": "So the honest number is 78.8%, speaker-independent, with everything above to back it up. You can try the audio model yourself just below: record or upload a few seconds of speech and watch it predict, on a voice it has never heard."
        }
      ]
    },
  {
    "title": "Measuring your own writing voice, one function word at a time",
    "slug": "measuring-a-writing-voice",
    "description": "How I built a tool that turns a few of your writing samples into a measurable fingerprint, scores how far a draft has drifted from it, and nudges it back, with honest numbers about what the signal can and cannot do.",
    "date": "2025-11-11",
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
        "md": "There is also a character n-gram model that scored 0.996 macro-F1 (0.999 accuracy). Please do not quote that as general accuracy. It is inflated. Five authors who write nothing alike, plus two who leak topic from a single book, make this task much easier than real open-world authorship attribution. The high number is a property of the easy set, not a property of the method."
      },
      {
        "type": "figure",
        "src": "/blog/voiceprint/results-trust.svg",
        "alt": "Function words alone reach 0.889 accuracy with zero content words, the real topic-independent signal; the 0.999-accuracy char n-gram and combined scores are inflated by a tiny, easy author set.",
        "caption": "Function words alone reach 0.889 accuracy with zero content words, the real topic-independent signal; the 0.999-accuracy char n-gram and combined scores are inflated by a tiny, easy author set."
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
        "md": "Most of all: this is voice adaptation on your own writing. The target is a positive one you can read, measure, and argue with. It is not impersonation, and it is not working against anything. The number that matters is 0.889 accuracy from function words alone, because it shows that the part of your writing you never think about is the part that is most yours. The code is on [GitHub](https://github.com/Ab-Romia/VoicePrint), and you can try the [demo](https://huggingface.co/spaces/Ab-Romia/voiceprint)."
      }
    ]
  },
  {
    title:
      "Hybrid RAG retrieval on a free CPU, and the evaluation where the fancy pipeline did not win",
    slug: "contextiq-hybrid-rag-retrieval",
    description:
      "A plain-language walkthrough of ContextIQ: dense plus BM25 retrieval, reciprocal rank fusion, cross-encoder reranking, and grounded generation, all on a free CPU, with an honest four-way evaluation where no single arm sweeps every metric.",
    date: "2025-07-24",
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
        md: "A cross-encoder reads the query and a candidate passage together, in one pass, and scores how relevant the passage actually is. This is far more accurate than comparing two vectors that were embedded separately, because the model attends to both texts at once. At 99 chunks you could afford to rerank everything; the two-stage design is for real corpora with thousands of chunks, where the shortlist pins the cross-encoder's cost to roughly 50 passages no matter how large the corpus grows. That is the whole design: a fast rough filter, then a slow careful judge. I use `ms-marco-MiniLM-L-6-v2` through `fastembed`, about 80 MB.",
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
        md: "Two results hold up across the board, and they are the whole honest headline: the naive dense-only approach is the worst configuration, and the full pipeline gives the best precision at the very top. Everything else depends on the corpus.",
      },
      {
        type: "p",
        md: "No single arm wins every metric. Hybrid has the best hit@5 and recall. The reranked arm has the best hit@3 and a strong MRR. And the plain TF-IDF baseline posts the single highest MRR and nDCG of anything I ran, because my golden questions are keyword-rich: they name specific policies, products, and numbers, which is exactly what lexical matching keys on. That is not a sign the pipeline failed. It is a reminder that lexical search is a real baseline, not a straw man, and that the shape of your questions decides who wins.",
      },
      {
        type: "p",
        md: "The narrow result I do trust, stated narrowly: dense-only retrieval is the weakest arm, because a small embedding model cannot separate near-duplicate policy passages that share a section structure. That is the naive pipeline most tutorials produce. Adding lexical search recovers recall, putting the right passage in the top five 94 percent of the time. And reranking fixes the ordering hybrid leaves rough, lifting hit@3 to its best value and MRR from 0.60 to 0.78 over hybrid alone.",
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
