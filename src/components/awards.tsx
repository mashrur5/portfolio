"use client";

import { useEffect, useState } from "react";
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
  onClick,
}: {
  award: Award;
  featured?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`h-full w-full overflow-hidden rounded-xl border border-white/10 bg-white/5 text-left backdrop-blur-sm transition-colors hover:border-cyan-300/40 hover:bg-white/[0.08] ${
        featured ? "p-2 sm:p-4" : "p-1.5 sm:p-3"
      }`}
    >
      <p
        className={`line-clamp-2 font-bold text-white sm:line-clamp-none ${
          featured ? "text-[11px] leading-tight sm:text-sm sm:leading-normal sm:text-base" : "text-[10px] leading-tight sm:text-xs sm:leading-normal sm:text-sm"
        }`}
      >
        {award.title}
      </p>
      <p
        className={`mt-0.5 line-clamp-1 font-semibold text-cyan-300 sm:line-clamp-none ${
          featured ? "text-[10px] sm:mt-1 sm:text-xs" : "text-[9px] sm:mt-1 sm:text-[11px]"
        }`}
      >
        {award.organization}
      </p>
      {(award.worth || award.detail) && (
        <p
          className={`mt-0.5 line-clamp-1 text-slate-400 sm:line-clamp-none ${
            featured ? "text-[9px] sm:text-xs" : "text-[8px] sm:text-[11px]"
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

  useEffect(() => {
    const openId = new URLSearchParams(window.location.search).get("open");
    if (openId && AWARDS.some((a) => a.id === openId)) setSelectedId(openId);
  }, []);

  return (
    <main className="relative h-full min-h-0 overflow-hidden bg-[#05070f]">
      <h1 className="absolute top-4 left-6 z-10 hidden text-xl font-extrabold text-white sm:top-6 sm:left-12 sm:block sm:text-2xl lg:text-3xl">
        Awards
      </h1>

      {/* Trophy centered with cards scattered around it. Connecting lines only render on tablet/desktop. */}
      <div className="absolute inset-0">
        <div className="relative mx-auto h-full w-full max-w-6xl px-6 py-4 sm:px-12">
          <svg
            className="pointer-events-none absolute inset-0 hidden h-full w-full sm:block"
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
            className="absolute aspect-square w-20 -translate-x-1/2 -translate-y-1/2 sm:w-32 lg:w-36"
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
                  featured ? "w-32 sm:w-64 lg:w-72" : "w-24 sm:w-36 lg:w-40"
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

      <AwardDetailModal award={selected} onClose={() => setSelectedId(null)} />
    </main>
  );
}
