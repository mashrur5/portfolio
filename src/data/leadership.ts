export type LeadershipEntry = {
  id: string;
  role: string;
  organization: string;
  dates: string;
  bullets: string[];
};

export const LEADERSHIP: LeadershipEntry[] = [
  {
    id: "soon-hackathon-operations",
    role: "Operations",
    organization: "SOON Hackathon",
    dates: "June 2026 – Present",
    bullets: [
      "Managing all operations for Canada's first private hackathon with around 50-60 attendees and a $20,000 budget",
      "Overseeing venue booking, budget allocation, logistics coordination, and general event operations",
    ],
  },
  {
    id: "leo-club-dhaka-400",
    role: "Co-Founder and Vice President",
    organization: "Leo Club of Dhaka 400 | Lions International",
    dates: "July 2023 – Aug 2024",
    bullets: [
      "Led a 20-member team in community development initiatives for coastal citizens, coordinating with local authorities and volunteers to rebuild **100+** homes, distribute winter supplies, and ensure transparent, impactful project execution.",
    ],
  },
  {
    id: "bsa-york-president",
    role: "President",
    organization: "Bangladeshi Students' Association | York University",
    dates: "Sept 2024 – Present",
    bullets: [
      "Represent Bangladeshi culture through organizing large-scale programs where I oversee operations, logistics, vendors and venue management, team coordination and production. A recent event was a **250**-attendee 'Nokhotro Ratri' gala.",
    ],
  },
];
