"use client";

import { useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import type { Project, ProjectBlock } from "@/data/projects";
import { GithubIcon, LinkedinIcon, DevpostIcon, WebsiteIcon, SlidesIcon } from "@/components/social-icons";

const PROJECT_LINK_ICON = {
  linkedin: LinkedinIcon,
  github: GithubIcon,
  devpost: DevpostIcon,
  website: WebsiteIcon,
  slides: SlidesIcon,
};

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

function Block({ block }: { block: ProjectBlock }) {
  switch (block.type) {
    case "heading":
      return (
        <h3 className="mt-8 text-base font-extrabold text-white first:mt-0 sm:text-lg">{block.text}</h3>
      );
    case "subheading":
      return <h4 className="mt-5 text-sm font-bold text-cyan-300">{block.text}</h4>;
    case "paragraph":
      return <p className="mt-3 text-sm leading-relaxed text-slate-300">{renderBold(block.text)}</p>;
    case "list":
      return (
        <ul className="mt-3 space-y-2.5">
          {block.items.map((item) => (
            <li key={item} className="flex gap-2 text-sm leading-relaxed text-slate-300">
              <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
              <span>{renderBold(item)}</span>
            </li>
          ))}
        </ul>
      );
    case "keyValue":
      return (
        <dl className="mt-3 space-y-2">
          {block.items.map(({ key, value }) => (
            <div key={key} className="flex flex-col gap-0.5 text-sm sm:flex-row sm:gap-2">
              <dt className="shrink-0 font-semibold text-white sm:w-36">{key}:</dt>
              <dd className="text-slate-300">{renderBold(value)}</dd>
            </div>
          ))}
        </dl>
      );
  }
}

export default function ProjectDetailModal({
  project,
  onClose,
}: {
  project: Project | null;
  onClose: () => void;
}) {
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose]);

  return (
    <AnimatePresence>
      {project && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className="flex max-h-full w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#05070f]"
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-44 w-full shrink-0 sm:h-64">
              <Image src={project.thumbnail} alt="" fill sizes="768px" className="object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/30 to-transparent" />
              <button
                onClick={onClose}
                aria-label="Close"
                className="absolute top-4 right-4 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-black/40 text-slate-200 backdrop-blur-sm transition-colors hover:text-cyan-300"
              >
                ✕
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
                <p className="text-xs font-semibold tracking-wide text-cyan-300 uppercase">
                  {project.subtitle}
                </p>
                <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">{project.title}</h2>
              </div>
            </div>

            <div className="overflow-y-auto p-6 sm:p-8">
              {project.links && project.links.length > 0 && (
                <div className="mb-4 flex items-center gap-4">
                  {project.links.map(({ label, url, icon }) => {
                    const Icon = PROJECT_LINK_ICON[icon];
                    return (
                      <a
                        key={label}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={label}
                        className="text-slate-400 transition-colors hover:text-cyan-300"
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              )}
              <p className="text-sm text-slate-400 italic">{project.tagline}</p>
              {project.blocks.map((block, i) => (
                <Block key={i} block={block} />
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
