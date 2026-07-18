"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import DatabaseDiagram from "@/components/database-diagram";

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section className="relative min-h-screen w-full overflow-hidden bg-[#05070f]">
      <Image
        src="/hero-character.png"
        alt="Illustration of the site owner working at a desk with multiple curved monitors, in front of the Toronto skyline at night with the CN Tower visible."
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />

      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#05070f]/60 via-transparent to-[#05070f]/20" />

      <DatabaseDiagram />

      <motion.div
        className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-slate-400"
        initial={{ opacity: 0 }}
        animate={reduceMotion ? { opacity: 0.7 } : { opacity: [0.3, 0.9, 0.3], y: [0, 6, 0] }}
        transition={reduceMotion ? undefined : { duration: 2, repeat: Infinity, ease: "easeInOut" }}
        aria-hidden="true"
      >
        <svg width="22" height="34" viewBox="0 0 22 34" fill="none">
          <rect x="1" y="1" width="20" height="32" rx="10" stroke="currentColor" strokeWidth="1.5" />
          <circle cx="11" cy="10" r="2.5" fill="currentColor" />
        </svg>
      </motion.div>
    </section>
  );
}
