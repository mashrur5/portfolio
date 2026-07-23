export type Award = {
  id: string;
  title: string;
  organization: string;
  worth?: string;
  detail?: string;
  thumbnail: string;
};

export const AWARDS: Award[] = [
  {
    id: "presidents-scholarship",
    title: "President's International Scholarship of Excellence",
    organization: "York University",
    worth: "$180,000",
    thumbnail: "/awards/thumbnails/presidents-scholarship.jpg",
  },
  {
    id: "academic-excellence",
    title: "International Award for Academic Excellence",
    organization: "York University",
    worth: "$7,500",
    thumbnail: "/awards/thumbnails/academic-excellence.jpg",
  },
  {
    id: "inter-school-swimming",
    title: "Podium in Inter-School Swimming",
    organization: "Multiple Organizations",
    detail: "3 bronze, 1 silver",
    thumbnail: "/awards/thumbnails/inter-school-swimming.jpg",
  },
  {
    id: "b24-best-goalkeeper",
    title: "Best Goalkeeper of the Tournament",
    organization: "B24 Futsal Cup 2022",
    thumbnail: "/awards/thumbnails/b24-best-goalkeeper.jpg",
  },
  {
    id: "daily-star-award",
    title: "The Daily Star Award",
    organization: "The Daily Star",
    thumbnail: "/awards/thumbnails/daily-star-award.jpg",
  },
  {
    id: "lassonde-entrance-scholarship",
    title: "Lassonde Entrance Scholarship",
    organization: "York University",
    worth: "$2,000",
    thumbnail: "/awards/thumbnails/lassonde-entrance-scholarship.jpg",
  },
  {
    id: "best-startup-experience",
    title: "Audience Choice and First Place at BEST Startup Experience 2024",
    organization: "Bergeron Entrepreneurs in Science and Technology",
    worth: "$1,500",
    thumbnail: "/awards/thumbnails/best-startup-experience.jpg",
  },
  {
    id: "sandcastle-hackathon",
    title: "Audience Choice at Sandcastle Hackathon",
    organization: "Sandbox",
    thumbnail: "/awards/thumbnails/sandcastle-hackathon.jpg",
  },
];
