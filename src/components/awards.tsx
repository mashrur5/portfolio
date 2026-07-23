"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { AWARDS, type Award } from "@/data/awards";
import AwardDetailModal from "@/components/award-detail-modal";

const TROPHY_PHOTO = "/awards/main/trophies.jpg";
const FEATHER_MASK = "radial-gradient(ellipse 60% 60% at 50% 50%, black 45%, transparent 100%)";

type Placement = { top: number; left: number };

const LAYOUT: Record<string, Placement> = {
  "presidents-scholarship": { top: 20.5, left: 50 },
  "sandcastle-hackathon": { top: 29, left: 80 },
  "best-startup-experience": { top: 52, left: 83 },
  "lassonde-entrance-scholarship": { top: 77, left: 73 },
  "daily-star-award": { top: 83, left: 50 },
  "b24-best-goalkeeper": { top: 77, left: 27 },
  "inter-school-swimming": { top: 52, left: 17 },
  "academic-excellence": { top: 29, left: 20 },
};

const TROPHY_CENTER: Placement = { top: 52, left: 50 };
const FEATURED_ID = "presidents-scholarship";

function Trophy() {
  return (
    <div className="relative h-full w-full">
      {/* ambient glow: heavily blurred, bleeds into the page background */}
      <div className="absolute inset-0 scale-125 opacity-60 blur-2xl">
        <Image src={TROPHY_PHOTO} alt="" fill sizes="240px" className="object-contain" />
      </div>
      {/* crisp photo, feathered at the edges on every side so it blends rather than cuts off */}
      <div className="absolute inset-0" style={{ maskImage: FEATHER_MASK, WebkitMaskImage: FEATHER_MASK }}>
        <Image
          src={TROPHY_PHOTO}
          alt="Mashrur with his trophies and medals"
          fill
          sizes="240px"
          className="object-contain"
        />
      </div>
    </div>
  );
}

function AwardCard({
  award,
  featured,
  compact,
  onClick,
}: {
  award: Award;
  featured?: boolean;
  compact?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left backdrop-blur-sm transition-colors hover:border-cyan-300/40 hover:bg-white/[0.08] ${
        compact ? "flex flex-col justify-center p-2" : featured ? "p-4" : "p-3"
      }`}
    >
      <p
        className={`font-bold text-white ${
          compact
            ? "line-clamp-2 text-[10px] leading-tight"
            : featured
              ? "text-sm sm:text-base"
              : "text-xs sm:text-sm"
        }`}
      >
        {award.title}
      </p>
      <p
        className={`font-semibold text-cyan-300 ${
          compact ? "mt-0.5 line-clamp-1 text-[9px]" : featured ? "mt-1 text-xs" : "mt-1 text-[11px]"
        }`}
      >
        {award.organization}
      </p>
      {(award.worth || award.detail) && (
        <p
          className={`text-slate-400 ${
            compact ? "line-clamp-1 text-[9px]" : featured ? "mt-0.5 text-xs" : "mt-0.5 text-[11px]"
          }`}
        >
          {award.worth ?? award.detail}
        </p>
      )}
    </button>
  );
}

export default function Awards() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = AWARDS.find((a) => a.id === selectedId) ?? null;

  return (
    <main className="relative h-full min-h-0 overflow-hidden bg-[#05070f]">
      <h1 className="absolute top-4 left-6 z-10 text-xl font-extrabold text-white sm:top-6 sm:left-12 sm:text-2xl lg:text-3xl">
        Awards
      </h1>

      {/* Desktop / tablet: trophy with lines radiating out to scattered cards, centered in the full viewport */}
      <div className="absolute inset-0 hidden sm:block">
        <div className="relative mx-auto h-full w-full max-w-6xl px-6 py-4 sm:px-12">
          <svg
            className="pointer-events-none absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            {AWARDS.map((award) => {
              const pos = LAYOUT[award.id];
              if (!pos) return null;
              return (
                <motion.line
                  key={award.id}
                  x1={TROPHY_CENTER.left}
                  y1={TROPHY_CENTER.top}
                  x2={pos.left}
                  y2={pos.top}
                  stroke="#67e8f9"
                  strokeOpacity="0.3"
                  strokeWidth={1}
                  vectorEffect="non-scaling-stroke"
                  initial={{ pathLength: 0 }}
                  whileInView={{ pathLength: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                />
              );
            })}
          </svg>

          <div
            className="absolute aspect-square w-28 -translate-x-1/2 -translate-y-1/2 sm:w-32 lg:w-36"
            style={{ top: `${TROPHY_CENTER.top}%`, left: `${TROPHY_CENTER.left}%` }}
          >
            <Trophy />
          </div>

          {AWARDS.map((award, i) => {
            const pos = LAYOUT[award.id];
            if (!pos) return null;
            const featured = award.id === FEATURED_ID;
            return (
              <motion.div
                key={award.id}
                className={`absolute -translate-x-1/2 -translate-y-1/2 ${
                  featured ? "w-56 sm:w-64 lg:w-72" : "w-32 sm:w-36 lg:w-40"
                }`}
                style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                initial={{ opacity: 0, scale: 0.85 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: "easeOut" }}
              >
                <AwardCard award={award} featured={featured} onClick={() => setSelectedId(award.id)} />
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Mobile: small trophy strip, then every card sized to fit one screen with no scroll */}
      <div className="absolute inset-0 flex flex-col gap-2 px-6 pt-14 pb-3 sm:hidden">
        <div className="mx-auto aspect-square w-20 shrink-0">
          <Trophy />
        </div>
        <div
          className="grid min-h-0 flex-1 grid-cols-2 gap-1.5"
          style={{ gridTemplateRows: "repeat(5, minmax(0, 1fr))" }}
        >
          {AWARDS.map((award) => {
            const featured = award.id === FEATURED_ID;
            return (
              <div key={award.id} className={featured ? "col-span-2" : ""}>
                <AwardCard
                  award={award}
                  featured={featured}
                  compact
                  onClick={() => setSelectedId(award.id)}
                />
              </div>
            );
          })}
        </div>
      </div>

      <AwardDetailModal award={selected} onClose={() => setSelectedId(null)} />
    </main>
  );
}
