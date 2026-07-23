"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { siteContent } from "@/data/site-content";
import ConstellationBackground from "@/components/constellation-background";
import { SOCIAL_LINKS, SocialLink } from "@/components/social-icons";

const TAGLINE_HIGHLIGHTS = ["products", "code", "scale"];
const TAGLINE_PATTERN = new RegExp(`(${TAGLINE_HIGHLIGHTS.join("|")})`, "g");

function renderTagline(text: string) {
  return text.split(TAGLINE_PATTERN).map((part, i) =>
    TAGLINE_HIGHLIGHTS.includes(part) ? (
      <span key={i} className="font-extrabold text-cyan-300">
        {part}
      </span>
    ) : (
      <span key={i}>{part}</span>
    ),
  );
}

export default function Hero() {
  const reduceMotion = useReducedMotion();

  return (
    <section
      id="profile"
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-[#05070f] px-6 py-24"
    >
      <ConstellationBackground />

      <motion.div
        className="relative z-10 flex max-w-xl flex-col items-center text-center"
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        <div className="relative mb-6 h-24 w-24 overflow-hidden rounded-full border border-white/15 bg-white/5 backdrop-blur-sm sm:h-28 sm:w-28">
          <Image
            src="/profile-photo.jpg"
            alt={siteContent.name}
            fill
            priority
            unoptimized
            sizes="112px"
            className="object-cover object-[50%_20%]"
          />
        </div>

        <h1 className="text-3xl font-extrabold text-white sm:text-5xl">{siteContent.name}</h1>

        <p className="mt-4 max-w-md text-sm font-medium text-slate-100 sm:text-base">
          {renderTagline(siteContent.tagline)}
        </p>

        <div className="mt-8 flex items-center gap-5 text-slate-300">
          {SOCIAL_LINKS.map((item) => (
            <SocialLink key={item.label} {...item} className="transition-colors hover:text-cyan-300" />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
