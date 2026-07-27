export type AwardBullet = { text: string; url?: string };

export type AwardLink = { label: string; url: string };

export type Award = {
  id: string;
  title: string;
  organization: string;
  worth?: string;
  detail?: string;
  thumbnail: string;
  /** Displayed width / height of the cover photo, so the modal's cover box matches its real shape instead of cropping it. Account for EXIF rotation, not just raw file dimensions. */
  thumbnailAspect: number;
  /** CSS object-position for the cover photo, for when the subject isn't centered (e.g. "center bottom" to keep the bottom of the frame in view). Defaults to "center". */
  thumbnailPosition?: string;
  /** Overrides the default 28rem cap on the cover photo's height, in rem, for photos that need more room to avoid cropping. */
  thumbnailMaxHeightRem?: number;
  /** "contain" shows the photo un-cropped with blank space below it (for the caption to sit in) instead of filling the whole box. Use when important content sits at the very edge the caption overlay would otherwise cover. */
  thumbnailFit?: "cover" | "contain";
  bullets?: AwardBullet[];
  paragraph?: string;
  readMoreLabel?: string;
  readMoreProjectId?: string;
  links?: AwardLink[];
};

export const AWARDS: Award[] = [
  {
    id: "presidents-scholarship",
    title: "President's International Scholarship of Excellence",
    organization: "York University",
    worth: "$180,000",
    thumbnail: "/awards/presidents-scholarship.jpg",
    thumbnailAspect: 1.15,
    bullets: [
      {
        text: "1 of 20 students from around the world and 1 of 2 students from Bangladesh to receive the award",
      },
      {
        text: "Covers full tuition and most of living expenses for my 4 years of undergraduate studies at York University",
      },
    ],
    links: [
      {
        label: "York University International Scholarship Recipients 2024",
        url: "https://futurestudents.yorku.ca/scholarship/international-recipients/2024",
      },
    ],
  },
  {
    id: "academic-excellence",
    title: "International Award for Academic Excellence",
    organization: "York University",
    worth: "$7,500",
    thumbnail: "/awards/academic-excellence.jpg",
    thumbnailAspect: 1600 / 1200,
  },
  {
    id: "inter-school-swimming",
    title: "Podium in Inter-School Swimming",
    organization: "Multiple Organizations",
    detail: "3 bronze, 1 silver",
    thumbnail: "/awards/swimming-podium.jpg",
    thumbnailAspect: 0.9,
    thumbnailPosition: "center top",
    thumbnailFit: "contain",
    bullets: [
      { text: "🥈 200m Freestyle Relay in ISD Secondary Swim Meet" },
      { text: "🥉 50m Backstroke Swimming in ISD Secondary Swim Meet" },
      {
        text: "🥉 50m Backstroke Swimming in DPS Inter-School Swim Meet",
        url: "https://www.facebook.com/share/p/1D27zSnGBU/",
      },
      {
        text: "🥉 50m Backstroke Swimming in ISD 2020 Swim Meet",
        url: "https://www.facebook.com/share/p/1JphxtG9jQ/",
      },
    ],
  },
  {
    id: "b24-best-goalkeeper",
    title: "Best Goalkeeper of the Tournament",
    organization: "B24 Futsal Cup 2022",
    thumbnail: "/awards/b24-best-goalkeeper.jpg",
    thumbnailAspect: 1200 / 1600,
  },
  {
    id: "daily-star-award",
    title: "The Daily Star Award",
    organization: "The Daily Star",
    thumbnail: "/awards/daily-star-2.jpg",
    thumbnailAspect: 1600 / 1066,
    bullets: [
      {
        text: "Received The Daily Star Award 2022 for 5A* and 1A in Cambridge O-Level Examination.",
      },
      {
        text: "Received The Daily Star Award 2024 for 2A* and 1A in Cambridge A-Level Examination.",
      },
    ],
    links: [
      {
        label: "The Daily Star - Keep reaching for the stars",
        url: "https://www.thedailystar.net/supplements-0/news/keep-reaching-the-stars-3552041",
      },
    ],
  },
  {
    id: "lassonde-entrance-scholarship",
    title: "Lassonde Entrance Scholarship",
    organization: "York University",
    worth: "$2,000",
    thumbnail: "/awards/lassonde-entrance-scholarship.jpg",
    thumbnailAspect: 1200 / 1600,
    thumbnailMaxHeightRem: 44,
  },
  {
    id: "best-startup-experience",
    title: "Audience Choice and First Place at BEST Startup Experience 2024",
    organization: "Bergeron Entrepreneurs in Science and Technology",
    worth: "$1,500",
    thumbnail: "/awards/best-startup-experience.jpeg",
    thumbnailAspect: 1600 / 1066,
    paragraph:
      "Built Student Helper, an AI-powered university learning platform that predicts your final exam score, adapts your quizzes in real time, and tracks your knowledge gaps, all built on top of your actual academic data.",
    readMoreLabel: "Read more about Student Helper",
    readMoreProjectId: "student-helper",
    links: [
      {
        label: "The BEST Startup Experience: Bridging Innovation and Entrepreneurship",
        url: "https://lassonde.yorku.ca/the-best-startup-experience-bridging-innovation-and-entrepreneurship",
      },
    ],
  },
  {
    id: "sandcastle-hackathon",
    title: "Audience Choice at Sandcastle Hackathon",
    organization: "Sandbox",
    thumbnail: "/awards/sandcastle-hackathon.jpeg",
    thumbnailAspect: 1206 / 667,
    paragraph:
      "Built HirezzAI, an AI resume analyzer that gives you specific, job-matched feedback tied to the exact posting you're applying to and not generic advice. Then fixes it and hands you a file you can submit immediately.",
    readMoreLabel: "Read more about HirezzAI",
    readMoreProjectId: "hirezz-ai",
  },
];
