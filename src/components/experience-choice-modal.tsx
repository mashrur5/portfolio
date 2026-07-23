"use client";

import { motion, AnimatePresence } from "framer-motion";
import type { ExperienceEntry } from "@/data/work-experience";

export default function ExperienceChoiceModal({
  entries,
  onChoose,
  onClose,
}: {
  entries: ExperienceEntry[] | null;
  onChoose: (id: string) => void;
  onClose: () => void;
}) {
  return (
    <AnimatePresence>
      {entries && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full max-w-md rounded-2xl border border-white/10 bg-[#05070f] p-6"
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
              Choose a role
            </p>
            <div className="mt-4 flex flex-col gap-3">
              {entries.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => onChoose(entry.id)}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:border-cyan-300/40 hover:bg-white/[0.07]"
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <h3 className="text-sm font-bold text-white">{entry.title}</h3>
                    <span className="shrink-0 text-[11px] whitespace-nowrap text-slate-400">
                      {entry.dates}
                    </span>
                  </div>
                  <p className="mt-0.5 text-xs font-semibold text-cyan-300">{entry.organization}</p>
                </button>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
