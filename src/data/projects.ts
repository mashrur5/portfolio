export type ProjectBlock =
  | { type: "heading"; text: string }
  | { type: "subheading"; text: string }
  | { type: "paragraph"; text: string }
  | { type: "list"; items: string[] }
  | { type: "keyValue"; items: { key: string; value: string }[] }
  | { type: "image"; images: string[] };

export type ProjectLink = {
  label: string;
  url: string;
  icon: "linkedin" | "github" | "devpost" | "website" | "slides" | "youtube";
};

export type Project = {
  id: string;
  title: string;
  subtitle: string;
  tagline: string;
  thumbnail: string;
  links?: ProjectLink[];
  blocks: ProjectBlock[];
};

export const PROJECTS: Project[] = [
  {
    id: "delatio",
    title: "Delatio — Urban Risk Intelligence Platform",
    subtitle: "Built for the City of Toronto",
    tagline:
      "A local-first, edge-compute urban risk intelligence platform built for the City of Toronto which is running two AI models simultaneously on a single node with zero cloud dependencies.",
    thumbnail: "/projects/thumbnails/delatio.png",
    links: [
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/feed/update/urn:li:activity:7483525837439279104/?utm_source=share&utm_medium=member_desktop&rcm=ACoAAE0pt3IBJrXRgLjK7N0KeFwfvJPifJ8gaQc",
        icon: "linkedin",
      },
      { label: "GitHub", url: "https://lnkd.in/eWxYsRcC", icon: "github" },
      {
        label: "YouTube",
        url: "https://youtube.com/shorts/CmYIwBjBeI4?si=M_EtK-yoi3LnI8Oe",
        icon: "youtube",
      },
    ],
    blocks: [
      { type: "heading", text: "The Problem" },
      {
        type: "paragraph",
        text: "Urban risk reporting in cities like Toronto is slow and fragmented. Citizens reporting infrastructure damage or safety hazards face slow response times and no intelligent routing. Existing systems don't leverage AI to prioritize, classify, or route reports automatically. When someone reports a hazard from a noisy street corner, the system needs to work regardless of background noise, accent, or network conditions.",
      },
      { type: "heading", text: "What I Built" },
      {
        type: "paragraph",
        text: "A local-first, edge-compute urban risk intelligence platform running entirely on a single NVIDIA Grace Blackwell GB10 node with **zero** cloud API dependencies. Built at the NVIDIA Spark Hack Series in Toronto, hosted by NVIDIA, Antler, and ASUS. Team of **4**.",
      },
      { type: "image", images: ["/projects/delatio/team-photo.jpeg"] },
      { type: "paragraph", text: "The platform runs two simultaneous intelligence loops:" },
      { type: "subheading", text: "Policy Reasoning Engine" },
      {
        type: "paragraph",
        text: "**FP8**-quantized Llama-3.1-Nemotron-**70B** served inside an isolated vLLM Docker container. Fine-tuned on roughly **1.2 million** rows of Open Data Toronto 311 logs and municipal by-laws. Handles complex civic routing, policy interpretation, and report classification automatically.",
      },
      { type: "subheading", text: "Vision Engine" },
      {
        type: "paragraph",
        text: "Gemma 4 **26B** Mixture-of-Experts via llama.cpp, trained on roughly **45,000** labeled images of urban infrastructure damage. Only activates **4B** parameters per token for sub-second inference. Evaluates structural hazards directly from raw user uploads.",
      },
      { type: "subheading", text: "Audio Pipeline" },
      {
        type: "list",
        items: [
          "Speech to text: Faster-Whisper Large-v3 with a multicultural audio and accent adaptation pipeline. Fine-tuned on Toronto-native speech samples with varying local accents, slang, and street names, injected with simulated urban background noise including sirens, traffic, and wind.",
          "Text to speech: Kokoro v1.0 fine-tuned on Toronto street phonemes so the system sounds like a professional civic assistant, not a robotic cloud API.",
        ],
      },
      { type: "heading", text: "The Hardest Part" },
      {
        type: "paragraph",
        text: "The hardest bottleneck was not writing the code. It was memory. Running a **70B** reasoning model alongside a **26B** vision engine and raw audio streams concurrently will instantly trigger an Out-of-Memory crash on consumer hardware. We solved it through aggressive FP8 quantization, background model weight-paging, and memory-isolated containers.",
      },
      { type: "heading", text: "Tech Stack" },
      {
        type: "keyValue",
        items: [
          { key: "Orchestration", value: "LangGraph" },
          { key: "Reasoning", value: "vLLM, Llama-3.1-Nemotron-70B (FP8 quantized)" },
          { key: "Vision", value: "llama.cpp, Gemma 4 26B MoE" },
          { key: "Speech", value: "Faster-Whisper Large-v3, Kokoro v1.0" },
          { key: "Infrastructure", value: "Docker, NVIDIA Grace Blackwell GB10" },
          {
            key: "Training data",
            value:
              "Open Data Toronto 311 logs (**1.2M** rows), custom urban damage image dataset (**45,000** images)",
          },
        ],
      },
    ],
  },
  {
    id: "national-livestock-registry",
    title: "National Livestock Registry",
    subtitle: "Built for the Trinidad & Tobago Government",
    tagline:
      "A government-grade national RFID livestock registry built for the Ministry of Agriculture, Land and Fisheries of Trinidad & Tobago — scan a chip, get the owner instantly.",
    thumbnail: "/projects/thumbnails/national-livestock-registry.png",
    links: [{ label: "Website", url: "https://livestock-registry-web.onrender.com", icon: "website" }],
    blocks: [
      { type: "heading", text: "The Problem" },
      {
        type: "paragraph",
        text: "Livestock theft is a serious and ongoing problem across Trinidad & Tobago. When a farmer's cattle or goats get stolen, they have no formal way to prove ownership. Animals are tagged with RFID microchips by vets, but those chip IDs exist nowhere searchable. The chip is meaningless without a registry behind it.",
      },
      {
        type: "paragraph",
        text: "When police or a vet encounters an animal, they have no way to verify who it belongs to. Ownership is disputed. Theft goes unresolved.",
      },
      {
        type: "paragraph",
        text: "The idea was simple: build the registry. Scan a chip ID, get the owner's name and contact instantly. If an animal is reported stolen, flag it so the next scan anywhere in the country surfaces the alert. Every registered animal gets a unique LR ID tied to a verified owner. Ownership records become evidence.",
      },
      { type: "heading", text: "What I Built" },
      {
        type: "paragraph",
        text: "**3** separate applications sharing one backend and one database, solo-built in roughly **3 weeks**. Built for the Ministry of Agriculture, Land and Fisheries of Trinidad & Tobago.",
      },
      { type: "subheading", text: "Backend API" },
      {
        type: "paragraph",
        text: "A REST API serving all **3** client applications. Every endpoint requires authentication, including guest lookup via signed JWT. No open endpoints.",
      },
      {
        type: "paragraph",
        text: "Key things it handles: user sync after every login, role assignment, short-lived guest JWT issuance for scan-only access, full animal and owner CRUD with role-based guards, SHA-256 hashed invitation tokens sent via email, and a health check endpoint for uptime monitoring.",
      },
      {
        type: "paragraph",
        text: "Security was treated as a first-class concern from the first line of code because ownership records may be used as legal evidence in theft disputes.",
      },
      {
        type: "list",
        items: [
          "Every endpoint requires authentication",
          "All queries parameterized, no raw SQL concatenation",
          "Invitation tokens SHA-256 hashed before storage",
          "Sensitive fields redacted from all structured logs",
          "Session state in httpOnly cookies, inaccessible to JavaScript",
          "Auth0 Management API handles farmer account creation and deletion",
        ],
      },
      { type: "subheading", text: "Web Dashboard" },
      { type: "paragraph", text: "**4** completely separate role-based user experiences in one codebase." },
      {
        type: "list",
        items: [
          "Guest: Bluetooth HID scanner-compatible chip lookup. A physical chip reader pairs as a Bluetooth keyboard and types directly into the focused input field. No Web Bluetooth or HID API needed.",
          "Farmer: Register animals, view personal registry, manage profile",
          "Support: Full national animal registry and user management",
          "Admin: Everything in support plus staff invitation system, farmer account creation with real-time password validation, and login activity monitoring",
        ],
      },
      {
        type: "image",
        images: [
          "/projects/national-livestock-registry/farmer-dashboard.png",
          "/projects/national-livestock-registry/farmer-lookup.png",
          "/projects/national-livestock-registry/farmer-register.png",
        ],
      },
      {
        type: "paragraph",
        text: "The login page features a hand-coded SVG Caribbean map with SMIL animation. The sign-in card is absolutely positioned at Trinidad & Tobago's exact coordinates on the map.",
      },
      { type: "image", images: ["/projects/national-livestock-registry/login.png"] },
      { type: "subheading", text: "Mobile App" },
      {
        type: "paragraph",
        text: "A field-facing app for farmers and vets at the point of scanning. The primary use case is simple: scan a chip with a physical reader and see the animal's owner instantly. The HID scanner pairs as a Bluetooth keyboard and fires searches automatically with no special driver or API needed.",
      },
      {
        type: "image",
        images: [
          "/projects/national-livestock-registry/admin-dashboard.png",
          "/projects/national-livestock-registry/support-dashboard.png",
          "/projects/national-livestock-registry/animal-registry.png",
        ],
      },
      { type: "heading", text: "Tech Stack" },
      {
        type: "keyValue",
        items: [
          { key: "Backend", value: "Node.js, Express.js, PostgreSQL (Neon)" },
          { key: "Web", value: "Next.js 16, TypeScript, Tailwind CSS v4, shadcn/ui" },
          { key: "Mobile", value: "React Native, Expo (bare workflow), TypeScript" },
          { key: "Auth", value: "Auth0" },
          { key: "Email", value: "Brevo" },
          { key: "Testing", value: "Jest (**16** invitation route tests, **5** auth tests)" },
          { key: "Infrastructure", value: "Render, Cloudflare, Neon" },
          { key: "Scale", value: "Designed for **2,000-3,000** MAU at ~**$1,026 USD**/year" },
        ],
      },
      { type: "heading", text: "What's Next" },
      {
        type: "paragraph",
        text: "App Store and Google Play submissions, BLE wireless scanner support, offline sync with conflict resolution, and potential migration to a .gov.tt domain pending Ministry IT policy.",
      },
    ],
  },
  {
    id: "hirezz-ai",
    title: "HirezzAI — Resume Roaster",
    subtitle: "Audience Choice @ Sandcastle Hackathon by Sandbox",
    tagline:
      "An AI resume analyzer that gives you specific, job-matched feedback tied to the exact posting you're applying to and not generic advice. Then fixes it and hands you a file you can submit immediately.",
    thumbnail: "/projects/thumbnails/hirezz-ai.png",
    links: [
      { label: "Website", url: "https://hirezz-ai.vercel.app/", icon: "website" },
      {
        label: "LinkedIn",
        url: "https://www.linkedin.com/posts/mashrurmahtab21_hackathon-buildinpublic-webdevelopment-ugcPost-7468378572903100417-7Mrr/?utm_source=social_share_send&utm_medium=member_desktop_web&rcm=ACoAAE0pt3IBJrXRgLjK7N0KeFwfvJPifJ8gaQc",
        icon: "linkedin",
      },
      { label: "Devpost", url: "https://devpost.com/software/hirezzai", icon: "devpost" },
    ],
    blocks: [
      { type: "heading", text: "The Problem" },
      {
        type: "paragraph",
        text: "Most resume tools give you generic advice. Use action verbs. Quantify your impact. Add keywords. None of it is tied to the actual job you're applying to. You still have to figure out what's missing yourself. And after all that, you still have to go fix it yourself too.",
      },
      { type: "heading", text: "The Solution" },
      {
        type: "paragraph",
        text: "Paste your resume and the job description you're applying to. HirezzAI scores your resume against that specific posting across **5** dimensions, translates the diagnosis into something you'll actually read, generates memes based on your exact gaps, rewrites the resume, and hands you a file you can submit immediately.",
      },
      {
        type: "paragraph",
        text: "Built at Sandcastle by Sandbox, an invite-only **30**-builder hackathon sprint. Awarded Audience Choice. Reached **100+** users on day one.",
      },
      {
        type: "image",
        images: ["/projects/hirezz-ai/team-huddle.jpeg", "/projects/hirezz-ai/prize-unboxing.jpeg"],
      },
      { type: "heading", text: "How the Scoring Works" },
      { type: "paragraph", text: "The resume gets scored across **5** dimensions:" },
      {
        type: "list",
        items: [
          "Keyword Match: JD keywords present in the resume",
          "Quantified Bullets: bullets containing numbers or metrics",
          "Section Structure: presence of Experience, Education, and Skills sections",
          "Action Verbs: bullets starting with strong action verbs",
          "Title Alignment: resume job titles matching the target JD title",
        ],
      },
      { type: "paragraph", text: "Final Score = (Rizz Score x **0.7**) + (Aura Score x **0.3**)" },
      {
        type: "list",
        items: ["**75** and above: LOCKED IN", "**50** to **74**: MID", "Below **50**: COOKED"],
      },
      {
        type: "paragraph",
        text: "Rizz Score is weighted at **70%** because ATS systems filter on keyword and structural match before a human ever reads the resume.",
      },
      { type: "heading", text: "What It Does" },
      {
        type: "list",
        items: [
          "Gemini 2.0 Flash scores the resume, writes rewrite suggestions, and generates custom meme captions based on the specific gap pattern",
          "BrainRot API translates the diagnosis into Gen Z language. Same actionable information, just packaged in a way people actually read",
          "Imgflip renders **5** memes using the Gemini-written captions. The memes are not random, they are based on your specific resume gaps",
          "Magic Fix rewrites the resume and exports a ready-to-submit file instantly",
          "Chef Recruiter chatbot handles any follow-up questions",
          "ElevenLabs converts the diagnosis to audio with a Web Speech API fallback",
        ],
      },
      { type: "image", images: ["/projects/hirezz-ai/meme-report.jpeg"] },
      {
        type: "paragraph",
        text: "Every external API has a tested fallback. Mock data for Gemini, a local regex dictionary for BrainRot, static template URLs for Imgflip. The app never breaks during a demo.",
      },
      { type: "heading", text: "Tech Stack" },
      {
        type: "keyValue",
        items: [
          { key: "Framework", value: "Next.js 15, TypeScript" },
          { key: "Styling", value: "Tailwind CSS, shadcn/ui" },
          { key: "AI", value: "Gemini 2.0 Flash" },
          { key: "Translation", value: "BrainRot API with local regex fallback" },
          { key: "Memes", value: "Imgflip API" },
          { key: "Voice", value: "ElevenLabs API with Web Speech API fallback" },
          { key: "File Extraction", value: "mammoth (DOCX), pdf-parse (PDF)" },
          { key: "Export", value: "docx package, HTML Blob (PDF)" },
          { key: "Deployment", value: "Vercel" },
        ],
      },
      { type: "heading", text: "Traction" },
      {
        type: "list",
        items: ["**100+** users on day one", "Audience Choice at Sandcastle Hackathon by Sandbox"],
      },
    ],
  },
  {
    id: "student-helper",
    title: "Student Helper — AI-Powered Learning Platform",
    subtitle: "1st Place @ BEST Startup Experience",
    tagline:
      "An AI-powered university learning platform that predicts your final exam score, adapts your quizzes in real time, and tracks your knowledge gaps and this is built on top of your actual academic data.",
    thumbnail: "/projects/thumbnails/student-helper.png",
    links: [
      { label: "Website", url: "https://student-helper-zeta.vercel.app/sign_in", icon: "website" },
      {
        label: "Slide Deck",
        url: "https://docs.google.com/presentation/d/1Syk_tLJgUVCGCzj4oZh6Y0X6YTwqcbVO/edit?usp=sharing&ouid=101284543466399287693&rtpof=true&sd=true",
        icon: "slides",
      },
    ],
    blocks: [
      { type: "heading", text: "The Problem" },
      {
        type: "paragraph",
        text: "**80%** of students don't meet their academic expectations. Not because they don't try, but because the school system is flawed in ways students don't talk about enough.",
      },
      {
        type: "paragraph",
        text: "No past papers. A massive jump from high school with no real preparation. Uninspired teaching. No idea how to study each subject. Unclear marking schemes. No industry-standard projects. Students are working hard but scoring below expectations, struggling to focus, and feeling overwhelmed before every exam.",
      },
      {
        type: "paragraph",
        text: "The existing platforms don't solve this. Khan Academy has no LMS integration and no grade prediction. Coursera focuses on full courses, not university curriculum. Century Tech is built for K-12. Moodle stores data but gives students zero intelligent insights about where they actually stand.",
      },
      { type: "heading", text: "The Solution" },
      { type: "paragraph", text: "Data-driven confidence." },
      {
        type: "paragraph",
        text: "Student Helper connects directly to university LMS platforms, pulls real academic performance data, adapts quiz difficulty in real time based on how a student is performing, tracks their knowledge over time, and predicts their final exam score using machine learning. Not generic advice. Actual predictions based on their actual data.",
      },
      { type: "heading", text: "How It Works" },
      { type: "subheading", text: "Getting Data" },
      {
        type: "paragraph",
        text: "The platform connects to Google Classroom, Canvas, Moodle, and Blackboard via their APIs to pull quiz scores, assignment submissions, and student engagement history. For first-year students with no history yet, it uses self-assessment surveys and pre-semester engagement data like video watches and reading activity.",
      },
      { type: "subheading", text: "AI-Generated Adaptive Quizzes" },
      {
        type: "paragraph",
        text: "The system collects professor questions from manual input, past exams, and LMS content. It analyzes question structure using NLP to understand topics, difficulty levels, and which concepts appear most frequently. It then generates new questions using GPT-4, T5, and BERT, adjusts difficulty dynamically using Item Response Theory (IRT), and personalizes each quiz based on where a student is weakest using Knowledge Tracing.",
      },
      { type: "subheading", text: "Knowledge Tracing" },
      {
        type: "paragraph",
        text: "Bayesian Knowledge Tracing (BKT) and Deep Knowledge Tracing (DKT) monitor student understanding over time and update a live knowledge graph after every quiz. Instead of just tracking scores, the system tracks how likely a student is to actually know something based on all their past answers.",
      },
      { type: "subheading", text: "Exam Score Prediction" },
      {
        type: "paragraph",
        text: "Linear Regression, Decision Trees, and Neural Networks work together to estimate a student's final exam score based on their full learning trajectory. The model weighs recent progress more than past struggles. The prediction updates dynamically as students improve.",
      },
      { type: "subheading", text: "Student Dashboard" },
      {
        type: "paragraph",
        text: "A visual dashboard showing which topics are mastered and which are weak, quiz stats including accuracy and difficulty trends, and a live final score prediction that updates after every quiz. Built with React, Next.js, D3.js, and Chart.js.",
      },
      { type: "heading", text: "Tech Stack" },
      {
        type: "keyValue",
        items: [
          { key: "Frontend", value: "React, Next.js, Tailwind CSS, D3.js, Chart.js" },
          { key: "Backend", value: "Python, FastAPI, Flask, Node.js" },
          { key: "AI/ML", value: "GPT-4, T5, BERT, BKT, DKT, SciKit-Learn, TensorFlow, PyTorch" },
          { key: "NLP", value: "spaCy, NLTK, Hugging Face Transformers" },
          { key: "Databases", value: "PostgreSQL, Firebase, Neo4j" },
          { key: "LMS APIs", value: "Google Classroom, Canvas, Moodle, Blackboard" },
          { key: "Data Pipeline", value: "Pandas, NumPy, SQL" },
        ],
      },
      { type: "heading", text: "Traction" },
      {
        type: "list",
        items: [
          "**1,000+** unique logins in one summer",
          "**1st Place** at BEST Startup Experience",
          "Started in the Caribbean in **2023**, now adapting for university students",
          "Live: past papers feature",
          "In progress: full AI adaptive system and feature expansion",
        ],
      },
      { type: "heading", text: "Revenue Model" },
      { type: "paragraph", text: "**$20** per semester per user." },
      { type: "heading", text: "Why We Win" },
      { type: "paragraph", text: "Smart algorithms. Research backed. Made by us, for us." },
    ],
  },
];
