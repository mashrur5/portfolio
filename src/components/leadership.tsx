"use client";

import { useRef } from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { LEADERSHIP, type LeadershipEntry } from "@/data/leadership";

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

function LeadershipCard({ entry }: { entry: LeadershipEntry }) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  const rotateX = useSpring(useTransform(mouseY, [0, 1], [7, -7]), { stiffness: 250, damping: 22 });
  const rotateY = useSpring(useTransform(mouseX, [0, 1], [-7, 7]), { stiffness: 250, damping: 22 });
  const glowX = useTransform(mouseX, (v) => `${v * 100}%`);
  const glowY = useTransform(mouseY, (v) => `${v * 100}%`);
  const glowBackground = useMotionTemplate`radial-gradient(280px circle at ${glowX} ${glowY}, rgba(103,232,249,0.95), rgba(103,232,249,0.15) 50%, transparent 75%)`;

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  }

  function handleMouseLeave() {
    mouseX.set(0.5);
    mouseY.set(0.5);
  }

  return (
    <div style={{ perspective: 1000 }}>
      <motion.div
        ref={ref}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        whileHover={{ scale: 1.015 }}
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        transition={{ type: "spring", stiffness: 250, damping: 22 }}
        className="group relative rounded-2xl p-px shadow-xl shadow-black/30"
      >
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: glowBackground }}
        />
        <div className="relative rounded-[15px] border border-white/10 bg-[#0a0e1a] p-5 sm:p-6">
          <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4">
            <h2 className="text-base font-bold text-white sm:text-lg">
              {entry.role}
              <span className="font-normal text-slate-400">, </span>
              <span className="font-semibold text-cyan-300">{entry.organization}</span>
            </h2>
            <span className="shrink-0 text-xs whitespace-nowrap text-slate-400">{entry.dates}</span>
          </div>
          <ul className="mt-3 space-y-2">
            {entry.bullets.map((bullet) => (
              <li key={bullet} className="flex gap-2 text-sm leading-relaxed text-slate-300">
                <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
                <span>{renderBold(bullet)}</span>
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

export default function Leadership() {
  return (
    <main className="mx-auto w-full max-w-4xl px-6 py-12 sm:px-12 sm:py-16">
      <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Leadership</h1>
      <div className="mt-8 flex flex-col gap-5">
        {LEADERSHIP.map((entry) => (
          <LeadershipCard key={entry.id} entry={entry} />
        ))}
      </div>
    </main>
  );
}
