export type ExperienceEntry = {
  id: string;
  title: string;
  organization: string;
  organizationUrl?: string;
  organizationSegments?: { text: string; url?: string }[];
  location: string;
  dates: string;
  highlights: string[];
  details: string[];
  images?: string[];
  socialLinks?: { platform: "youtube" | "instagram" | "discord" | "facebook"; url: string }[];
};

export const CANADA_EXPERIENCE: ExperienceEntry[] = [
  {
    id: "herb-immortal",
    title: "AI Product Development Intern",
    organization: "Herb Immortal",
    organizationSegments: [
      { text: "Herb Immortal" },
      { text: "herbimmortal.ca", url: "https://herbimmortal.ca" },
      { text: "myherbalshop.ai", url: "https://myherbalshop.ai" },
    ],
    location: "Belleville, ON",
    dates: "Apr 2026 – Present",
    highlights: [
      "Built the backend and admin panel for the corporate investor site (Node.js, Express, MySQL)",
      "Shipped a cross-platform iOS/Android wellness app with AI-powered features",
    ],
    details: [
      "Built the backend and admin panel for the corporate investor website using Node.js, Express, and MySQL with a full REST API",
      "Implemented two-factor authentication from scratch using email OTP and JWT with 8-hour expiry, no third-party auth services",
      "Built a full article CMS, investor lead CRM, contact submission tracker, and login activity logger into the admin panel",
      "Deployed on a VPS with nginx reverse proxy and pm2 process manager, managing two separate backends on one server",
      "Delivered core app features including a marketplace, virtual consultations, and Herbopedia encyclopedia, all live in production",
      "Built and launched an AI-powered platform that matches patients with doctors/healers, live in production",
      "Designed and iterated on UX/UI to align with brand identity and health/privacy compliance requirements",
    ],
    images: [
      "/experience/herb-immortal/1.png",
      "/experience/herb-immortal/2.png",
      "/experience/herb-immortal/3.png",
      "/experience/herb-immortal/4.png",
    ],
  },
  {
    id: "york-laps",
    title: "Field Education Program Associate",
    organization: "York University — Faculty of Liberal Arts & Professional Studies",
    organizationUrl: "https://www.yorku.ca/laps/sowk/",
    location: "Toronto, ON",
    dates: "May 2026 – Present",
    highlights: [
      "Coordinating end-to-end student placements for hundreds of BSW and MSW students",
      "Identified 76 platform issues and led evaluation of two replacement vendors",
    ],
    details: [
      "Coordinating end-to-end student placements for hundreds of BSW and MSW students across the Experience York platform",
      "Managing learning contracts, evaluations, log of hours, placement confirmations, and troubleshooting platform issues for students, field instructors, and faculty advisors",
      "Handling full payroll cycle for Contract Faculty Advisors including ETF forms, agreements, and pay scheduling",
      "Running event and seminar logistics including room bookings, Zoom setup, Machform RSVPs, catering, and honorarium payments",
      "Reconciling monthly budget using e-Reports, processing invoices, and tracking expenses against cost center",
      "Maintaining the practicum website on WordPress and managing practicum agreement contracts",
      "Identified 76 platform issues across 6 months affecting students, instructors, and staff, and built a formal proposal to replace the platform",
      "Evaluated two replacement vendors (InPlace Software and CORE Higher Education) and prepared a presentation for school directors and the dean",
    ],
    images: [
      "/experience/york-university-laps/1.png",
      "/experience/york-university-laps/2.png",
    ],
  },
  {
    id: "york-research",
    title: "Research Assistant",
    organization: "York University",
    organizationUrl: "https://www.yorku.ca/",
    location: "Toronto, ON",
    dates: "Jan 2026 – Apr 2026",
    highlights: [
      "Built Java-based discrete-event simulation modules for blockchain consensus research",
      "Researched Bitcoin/blockchain simulation, cryptographic hashing, and PoW runtime experiments",
    ],
    details: [
      "Contributed to the Conceptual Modeling Group's research on blockchain and cryptocurrency consensus mechanisms through event-driven simulation",
      "Built and extended Java-based discrete-event simulation modules using OOP covering event scheduling, queue and state tracking, and system behavior analysis",
      "Set up and improved the local development and testing workflow using Jira, Git, Maven, and JUnit 5",
      "Researched Bitcoin and blockchain simulation through work on digital signatures, cryptographic hashing, PoW runtime simulation, hashpower experiments, and unit testing",
    ],
  },
  {
    id: "primate",
    title: "Growth Engineer",
    organization: "Primate",
    organizationUrl: "https://primate.sh/",
    location: "Toronto, ON",
    dates: "Jun 2026 – Jul 2026",
    highlights: [
      "Built a fully automated B2B lead-gen pipeline pulling from YC Directory, GitHub, and Product Hunt",
      "Used a local LLM (Ollama/Llama 3) to score company fit and write personalized cold email openers",
    ],
    details: [
      "Built a fully automated B2B lead generation pipeline from scratch pulling from YC Directory, GitHub, and Product Hunt simultaneously",
      "Used a local LLM (Ollama/Llama3) to score each company's fit for Primate's ICP and write personalized cold email openers per lead",
      "Exported enriched leads to a spreadsheet with 14 columns per lead including founder info, fit score, and personalized opener",
      "Implemented seen-company deduplication so re-runs never reprocess the same leads",
      "Streamed results to the UI in real time using Server-Sent Events with a live progress bar and log console",
      "Ran outreach, content, and GTM strategy alongside the founding team",
    ],
    images: ["/experience/primate/1.png"],
  },
  {
    id: "neo-financial",
    title: "Sales Representative",
    organization: "Neo Financial",
    organizationUrl: "https://www.neofinancial.com/",
    location: "Toronto, ON (Woodbine Mall)",
    dates: "Feb 2026 – Jun 2026",
    highlights: [
      "Owned full-cycle onboarding across Neo credit, debit, chequing, and savings products",
      "Exceeded baseline performance through high-volume financial discovery conversations",
    ],
    details: [
      "Exceeded baseline performance at a slow mall location with 0.5+ approved customers per hour through high-volume financial discovery conversations",
      "Owned full-cycle onboarding across Neo credit, debit, chequing, and savings products from start to successful setup",
      "Removed conversion blockers by identifying friction points fast and coordinating directly with technical teams through Slack",
      "Delivered a compliant and customer-focused onboarding experience across all product lines",
    ],
  },
];

export const BANGLADESH_EXPERIENCE: ExperienceEntry[] = [
  {
    id: "metaphor-coordinator",
    title: "Technical Project Coordinator",
    organization: "Metaphor Digital Media",
    organizationUrl: "https://metaphornet.net/",
    location: "Dhaka, Bangladesh",
    dates: "Jul 2024 – Dec 2025",
    highlights: [
      "Led 2+ network expansion projects per month, from field scouting through to network go-live",
      "Drove the migration from cable to fiber to improve service reliability and scalability",
    ],
    details: [
      "Initiated and led 2+ network expansion projects per month covering end-to-end delivery from field scouting and feasibility checks through to deployment and network go-live",
      "Partnered with on-field teams to standardize rollout execution across site readiness, equipment planning, installation sequencing, and issue escalation",
      "Drove the migration from cable to fiber to improve service reliability and scalability across target regions",
      "Liaised directly with Directors and the CEO on priorities, milestones, cross-functional delivery, and change management",
      "Owned billing and customer system updates by turning day-to-day needs into clear requirements, coordinating implementation and testing, and keeping data accurate",
    ],
  },
  {
    id: "metaphor-it",
    title: "IT Coordinator",
    organization: "Metaphor Digital Media",
    organizationUrl: "https://metaphornet.net/",
    location: "Dhaka, Bangladesh",
    dates: "Aug 2023 – Jul 2024",
    highlights: [
      "Managed 10,000+ client accounts and monitored network servers",
      "Digital marketing campaigns resulting in 30% more clients",
    ],
    details: [
      "Managed 10,000+ client accounts, allocated internet bandwidth using Winbox, and monitored and maintained network servers",
      "Troubleshot connectivity issues and coordinated with the parent company to resolve outages",
      "Planned and executed region-targeted digital marketing campaigns across social media resulting in 30% more clients",
    ],
  },
  {
    id: "outrageous-dominance",
    title: "Founder and CEO",
    organization: "Outrageous Dominance",
    location: "Mirpur DOHS, Dhaka",
    dates: "Feb 2020 – Apr 2023",
    images: [
      "/experience/outrageous-dominance/1.png",
      "/experience/outrageous-dominance/2.png",
      "/experience/outrageous-dominance/3.png",
    ],
    highlights: [
      "Scaled a competitive gaming club from scratch to 50+ professional players",
      "Grew the Discord community from 0 to 2,000+ members; raised $5,000 in sponsorships",
    ],
    details: [
      "Founded and scaled a competitive gaming club from scratch to 50+ professional players competing in national and international tournaments across Valorant, Fortnite, and CS:GO",
      "Grew the Discord community from 0 to 2,000+ members, establishing a strong presence in the country's gaming scene",
      "Self-funded the club for over a year, then raised $5,000 and secured sponsorships by building credibility through performance and community growth",
      "Led weekly team meetings, coordinated tournament registrations, and kept operations running smoothly across multiple rosters",
      "Drove competitive success that led to winning 20+ major tournaments",
    ],
    socialLinks: [
      { platform: "youtube", url: "https://www.youtube.com/@outrageousdominance3228" },
      { platform: "instagram", url: "https://www.instagram.com/o_dominance/?hl=en" },
      { platform: "discord", url: "https://discord.gg/nyBCXANcuS" },
      { platform: "facebook", url: "https://www.facebook.com/odominance" },
    ],
  },
];
