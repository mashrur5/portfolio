"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { SOCIAL_LINKS, SocialLink } from "@/components/social-icons";

const LEFT_LINKS = SOCIAL_LINKS.slice(0, 3);
const RIGHT_LINKS = SOCIAL_LINKS.slice(3);

function SocialColumn({
  links,
  side,
  visible,
}: {
  links: typeof SOCIAL_LINKS;
  side: "left" | "right";
  visible: boolean;
}) {
  const reduceMotion = useReducedMotion();
  const offset = side === "left" ? -12 : 12;

  return (
    <motion.div
      className={`fixed top-1/2 z-40 hidden -translate-y-1/2 flex-col items-center gap-4 sm:flex ${
        side === "left" ? "left-4 sm:left-6" : "right-4 sm:right-6"
      }`}
      initial={false}
      animate={{ opacity: visible ? 1 : 0, x: visible ? 0 : offset }}
      transition={{ duration: reduceMotion ? 0 : 0.4, ease: "easeOut" }}
      style={{ pointerEvents: visible ? "auto" : "none" }}
    >
      {links.map((item) => (
        <SocialLink key={item.label} {...item} className="text-slate-400 transition-colors hover:text-cyan-300" />
      ))}
    </motion.div>
  );
}

export default function FloatingSocials() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function handleScroll() {
      setVisible(window.scrollY > window.innerHeight * 0.6);
    }
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <SocialColumn links={LEFT_LINKS} side="left" visible={visible} />
      <SocialColumn links={RIGHT_LINKS} side="right" visible={visible} />
    </>
  );
}
