"use client";

import { motion } from "framer-motion";
import { education, siteContent } from "@/data/site-content";

export default function Education() {
  return (
    <section id="education" className="relative bg-[#05070f] px-6 pt-20 pb-10 sm:px-12 sm:pt-28 sm:pb-14">
      <div className="mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="text-2xl font-extrabold text-white sm:text-3xl"
        >
          Education
        </motion.h2>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="mt-8 flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-sm sm:flex-row sm:items-center sm:justify-between sm:p-8"
        >
          <div>
            <h3 className="text-lg font-bold text-white sm:text-xl">{education.degree}</h3>
            <p className="mt-1 text-sm font-semibold text-cyan-300">{education.school}</p>
            <p className="mt-3 text-sm text-slate-300">{education.gpa}</p>
            <p className="mt-1 text-sm text-slate-300">{education.honour}</p>
          </div>

          <a
            href={siteContent.links.transcript}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center justify-center rounded-full border border-cyan-300/50 bg-white/5 px-5 py-2 text-sm font-semibold text-cyan-300 backdrop-blur-sm transition-colors hover:bg-cyan-300/10"
          >
            Transcript
          </a>
        </motion.div>
      </div>
    </section>
  );
}
