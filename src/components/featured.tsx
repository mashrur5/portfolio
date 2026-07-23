"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { CANADA_EXPERIENCE } from "@/data/work-experience";
import { PROJECTS } from "@/data/projects";
import { LEADERSHIP } from "@/data/leadership";
import { AWARDS } from "@/data/awards";

const experience = CANADA_EXPERIENCE.find((e) => e.id === "herb-immortal")!;
const project = PROJECTS.find((p) => p.id === "national-livestock-registry")!;
const leadership = LEADERSHIP.find((l) => l.id === "leo-club-dhaka-400")!;
const award = AWARDS.find((a) => a.id === "presidents-scholarship")!;

function renderBold(text: string) {
  return text.split(/(\*\*[^*]+\*\*)/g).map((part, i) => {
    if (part.startsWith("**") && part.endsWith("**")) {
      return (
        <strong key={i} className="font-bold text-cyan-300">
          {part.slice(2, -2)}
        </strong>
      );
    }
    return <span key={i}>{part}</span>;
  });
}

type FeaturedCard = {
  eyebrow: string;
  title: string;
  subtitle: string;
  description: React.ReactNode;
  image: string;
  href: string;
  linkLabel: string;
};

const CARDS: FeaturedCard[] = [
  {
    eyebrow: experience.dates,
    title: experience.title,
    subtitle: experience.organization,
    description: experience.highlights[0],
    image: experience.images![0],
    href: `/experience?open=${experience.id}`,
    linkLabel: "Read more about my Experiences",
  },
  {
    eyebrow: "June 2026 – Present",
    title: project.title,
    subtitle: project.subtitle,
    description: project.tagline,
    image: project.thumbnail,
    href: `/projects?open=${project.id}`,
    linkLabel: "Read more about my Projects",
  },
  {
    eyebrow: leadership.dates,
    title: leadership.role,
    subtitle: leadership.organization,
    description: renderBold(leadership.bullets[0]),
    image: "/featured/lions-international.jpg",
    href: "/leadership",
    linkLabel: "Read more about my Leadership",
  },
  {
    eyebrow: "2024",
    title: `${award.title} | ${award.worth}`,
    subtitle: award.organization,
    description: "Awarded for academic excellence as an incoming international student.",
    image: "/featured/scholarship-web.jpg",
    href: `/awards?open=${award.id}`,
    linkLabel: "Read more about my Awards",
  },
];

function Card({ card, index }: { card: FeaturedCard; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: "easeOut" }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm transition-colors hover:border-cyan-300/40"
    >
      <div className="relative h-40 w-full shrink-0 overflow-hidden bg-white/5 sm:h-48">
        <Image
          src={card.image}
          alt=""
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-transparent to-transparent" />
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="text-[11px] font-semibold tracking-wide text-cyan-300 uppercase">{card.eyebrow}</p>
        <h3 className="mt-1 text-lg font-extrabold text-white sm:text-xl">{card.title}</h3>
        <p className="mt-0.5 text-sm font-semibold text-slate-300">{card.subtitle}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-400">{card.description}</p>

        <Link
          href={card.href}
          className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-cyan-300 transition-colors hover:text-cyan-200"
        >
          {card.linkLabel}
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">
            →
          </span>
        </Link>
      </div>
    </motion.div>
  );
}

export default function Featured() {
  return (
    <section id="featured" className="relative bg-[#05070f] px-6 pt-10 pb-20 sm:px-12 sm:pt-14 sm:pb-28">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl font-extrabold text-white sm:text-3xl"
        >
          Featured
        </motion.h2>

        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {CARDS.map((card, i) => (
            <Card key={card.href + card.title} card={card} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
