"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Award } from "@/data/awards";

export default function AwardDetailModal({
  award,
  onClose,
}: {
  award: Award | null;
  onClose: () => void;
}) {
  const [failedSrc, setFailedSrc] = useState<string | null>(null);
  const imageFailed = failedSrc === award?.thumbnail;

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {award && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex max-h-full w-full max-w-lg flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#05070f]"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-44 w-full shrink-0 bg-gradient-to-br from-cyan-400/20 via-[#05070f] to-cyan-300/10 sm:h-56">
              {!imageFailed && (
                <Image
                  src={award.thumbnail}
                  alt=""
                  fill
                  sizes="512px"
                  className="object-cover"
                  onError={() => setFailedSrc(award.thumbnail)}
                />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/40 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-slate-200 backdrop-blur-sm transition-colors hover:text-cyan-300"
              >
                ✕
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-wide text-cyan-300 uppercase">
                  {award.organization}
                </p>
                <h2 className="mt-1 text-lg font-extrabold text-white sm:text-xl">{award.title}</h2>
              </div>
            </div>

            <div className="p-6 sm:p-8">
              <dl className="space-y-2">
                {award.worth && (
                  <div className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-2">
                    <dt className="shrink-0 font-semibold text-white sm:w-28">Worth:</dt>
                    <dd className="text-slate-300">{award.worth}</dd>
                  </div>
                )}
                {award.detail && (
                  <div className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-2">
                    <dt className="shrink-0 font-semibold text-white sm:w-28">Result:</dt>
                    <dd className="text-slate-300">{award.detail}</dd>
                  </div>
                )}
              </dl>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
