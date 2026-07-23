"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { ExperienceEntry } from "@/data/work-experience";
import { YoutubeIcon, InstagramIcon, DiscordIcon, FacebookIcon } from "@/components/social-icons";

const SOCIAL_ICON_BY_PLATFORM = {
  youtube: YoutubeIcon,
  instagram: InstagramIcon,
  discord: DiscordIcon,
  facebook: FacebookIcon,
};

const COLLAGE_SLOTS = [
  "left-[2%] top-[4%] w-[56%] rotate-[-8deg] z-10",
  "left-[32%] top-[0%] w-[56%] rotate-[6deg] z-20",
  "left-[8%] top-[40%] w-[56%] rotate-[5deg] z-30",
  "left-[36%] top-[46%] w-[56%] rotate-[-6deg] z-40",
];

function SnapshotGallery({
  images,
  onSelect,
}: {
  images: string[];
  onSelect: (src: string) => void;
}) {
  if (images.length === 1) {
    return (
      <div className="flex min-h-0 flex-1 items-center justify-center">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={images[0]}
          alt=""
          onClick={() => onSelect(images[0])}
          className="max-h-full min-h-0 w-full cursor-pointer rounded-lg border border-white/10 object-contain shadow-xl shadow-black/50 transition-transform hover:scale-[1.02] hover:brightness-110"
        />
      </div>
    );
  }

  if (images.length === 2) {
    return (
      <div className="flex min-h-0 flex-1 flex-col gap-3">
        {images.map((src) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={src}
            src={src}
            alt=""
            onClick={() => onSelect(src)}
            className="min-h-0 w-full flex-1 cursor-pointer rounded-lg border border-white/10 object-contain shadow-xl shadow-black/50 transition-transform hover:scale-[1.02] hover:brightness-110"
          />
        ))}
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      {images.map((src, i) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={src}
          src={src}
          alt=""
          onClick={() => onSelect(src)}
          className={`absolute aspect-[4/3] cursor-pointer overflow-hidden rounded-lg border-4 border-[#05070f] object-cover shadow-2xl shadow-black/60 transition-transform hover:scale-[1.03] hover:brightness-110 ${COLLAGE_SLOTS[i % COLLAGE_SLOTS.length]}`}
        />
      ))}
    </div>
  );
}

export default function ExperienceDetailModal({
  entry,
  onClose,
}: {
  entry: ExperienceEntry | null;
  onClose: () => void;
}) {
  const [zoomedImage, setZoomedImage] = useState<string | null>(null);
  const hasImages = Boolean(entry?.images && entry.images.length > 0);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key !== "Escape") return;
      if (zoomedImage) setZoomedImage(null);
      else onClose();
    }
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [onClose, zoomedImage]);

  useEffect(() => {
    if (!entry) setZoomedImage(null);
  }, [entry]);

  return (
    <AnimatePresence>
      {entry && (
        <motion.div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm sm:p-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            className={`flex max-h-full w-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-[#05070f] sm:flex-row ${hasImages ? "max-w-5xl" : "max-w-2xl"}`}
            initial={{ opacity: 0, scale: 0.96, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={onClose}
              aria-label="Close"
              className="absolute top-4 right-4 z-10 flex h-8 w-8 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors hover:text-cyan-300 sm:top-6 sm:right-6"
            >
              ✕
            </button>

            <div className={`w-full overflow-y-auto p-6 sm:p-8 ${hasImages ? "sm:w-1/2" : ""}`}>
              <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                {entry.dates}
              </p>
              <h2 className="mt-1 text-xl font-extrabold text-white sm:text-2xl">{entry.title}</h2>
              {entry.organizationSegments ? (
                <p className="mt-1 text-sm font-semibold text-cyan-300">
                  {entry.organizationSegments.map((segment, i) => (
                    <span key={segment.text}>
                      {i > 0 && <span className="text-slate-500"> | </span>}
                      {segment.url ? (
                        <a
                          href={segment.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="hover:underline"
                        >
                          {segment.text}
                        </a>
                      ) : (
                        segment.text
                      )}
                    </span>
                  ))}
                </p>
              ) : entry.organizationUrl ? (
                <a
                  href={entry.organizationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-block text-sm font-semibold text-cyan-300 hover:underline"
                >
                  {entry.organization}
                </a>
              ) : (
                <p className="mt-1 text-sm font-semibold text-cyan-300">{entry.organization}</p>
              )}
              <p className="text-xs text-slate-500">{entry.location}</p>

              <ul className="mt-5 space-y-2.5">
                {entry.details.map((detail) => (
                  <li key={detail} className="flex gap-2 text-sm leading-snug text-slate-300">
                    <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-cyan-300/70" />
                    {detail}
                  </li>
                ))}
              </ul>

              {entry.socialLinks && entry.socialLinks.length > 0 && (
                <div className="mt-6 flex items-center gap-4 border-t border-white/10 pt-5">
                  {entry.socialLinks.map(({ platform, url }) => {
                    const Icon = SOCIAL_ICON_BY_PLATFORM[platform];
                    return (
                      <a
                        key={platform}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={platform}
                        className="text-slate-400 transition-colors hover:text-cyan-300"
                      >
                        <Icon />
                      </a>
                    );
                  })}
                </div>
              )}
            </div>

            {hasImages && entry.images && (
              <div className="flex w-full flex-col border-t border-white/10 bg-white/[0.02] p-6 sm:w-1/2 sm:border-t-0 sm:border-l sm:p-8">
                <p className="text-xs font-semibold tracking-wide text-slate-400 uppercase">
                  Work
                </p>
                <SnapshotGallery images={entry.images} onSelect={setZoomedImage} />
              </div>
            )}
          </motion.div>

          <AnimatePresence>
            {zoomedImage && (
              <motion.div
                className="fixed inset-0 z-[1100] flex items-center justify-center bg-black/85 p-4 sm:p-10"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onClick={(e) => {
                  e.stopPropagation();
                  setZoomedImage(null);
                }}
              >
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setZoomedImage(null);
                  }}
                  aria-label="Close image"
                  className="absolute top-4 right-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-white/15 bg-white/5 text-slate-300 transition-colors hover:text-cyan-300 sm:top-6 sm:right-6"
                >
                  ✕
                </button>
                <motion.img
                  src={zoomedImage}
                  alt=""
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  className="max-h-full max-w-full rounded-xl border border-white/10 object-contain shadow-2xl"
                  onClick={(e) => e.stopPropagation()}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
