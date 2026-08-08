"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RESUMES } from "@/data/site-content";

export default function ResumeModal({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (!open) return;
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
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
            <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">Choose a resume</p>
            <div className="mt-4 flex flex-col gap-3">
              {RESUMES.map((resume) => (
                <a
                  key={resume.href}
                  href={resume.href}
                  download
                  onClick={onClose}
                  className="rounded-xl border border-white/10 bg-white/5 p-4 text-sm font-semibold text-white transition-colors hover:border-cyan-300/40 hover:bg-white/[0.07] hover:text-cyan-300"
                >
                  {resume.label}
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
