"use client";

import { motion, useReducedMotion } from "framer-motion";
import { Download } from "lucide-react";
import { siteContent } from "@/data/site-content";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M12 .5C5.73.5.98 5.24.98 11.52c0 5.02 3.26 9.28 7.78 10.78.57.1.78-.25.78-.55 0-.27-.01-1.16-.02-2.1-3.17.69-3.84-1.35-3.84-1.35-.52-1.31-1.26-1.66-1.26-1.66-1.03-.7.08-.69.08-.69 1.14.08 1.74 1.17 1.74 1.17 1.01 1.73 2.65 1.23 3.3.94.1-.73.4-1.23.72-1.51-2.53-.29-5.19-1.27-5.19-5.63 0-1.24.44-2.26 1.17-3.05-.12-.29-.51-1.45.11-3.02 0 0 .96-.31 3.15 1.16a10.9 10.9 0 0 1 5.73 0c2.18-1.47 3.14-1.16 3.14-1.16.63 1.57.24 2.73.12 3.02.73.79 1.16 1.81 1.16 3.05 0 4.37-2.66 5.33-5.2 5.62.41.36.77 1.06.77 2.14 0 1.55-.01 2.79-.01 3.17 0 .3.2.66.79.55A11.03 11.03 0 0 0 23.02 11.5C23.02 5.24 18.27.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5 fill-current">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.15 1.45-2.15 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
    </svg>
  );
}

const ICON_START = { left: 62, top: 48 };
const ICON_END = { left: 88, top: 80 };
const ICON_END_POINT = { x: ICON_END.left, y: ICON_END.top };

const LINES = [
  { to: { x: 77, y: 41 }, delay: 0 },
  { to: { x: 77, y: 55 }, delay: 0.15 },
  { to: { x: 55, y: 66 }, delay: 0.3 },
  { to: { x: 55, y: 79 }, delay: 0.45 },
];

function curvePath(from: { x: number; y: number }, to: { x: number; y: number }) {
  const midX = (from.x + to.x) / 2;
  const midY = (from.y + to.y) / 2 - 6;
  return `M ${from.x} ${from.y} Q ${midX} ${midY} ${to.x} ${to.y}`;
}

function DatabaseIcon() {
  return (
    <svg viewBox="0 0 60 84" className="h-full w-full">
      <defs>
        <linearGradient id="dbBody" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#0f1119" />
          <stop offset="50%" stopColor="#242836" />
          <stop offset="100%" stopColor="#0f1119" />
        </linearGradient>
        <filter id="ringGlow" x="-150%" y="-150%" width="400%" height="400%">
          <feGaussianBlur stdDeviation="2.2" />
        </filter>
      </defs>

      <ellipse cx="30" cy="65" rx="20" ry="7" fill="#08090d" opacity="0.7" />
      <path d="M10,10 V65 A20,7 0 0 0 50,65 V10" fill="url(#dbBody)" />
      <ellipse cx="30" cy="10" rx="20" ry="7" fill="url(#dbBody)" />
      <ellipse cx="30" cy="10" rx="20" ry="7" fill="none" stroke="#3a3f52" strokeWidth="0.6" />

      {[23, 37, 51].map((y) => (
        <g key={y}>
          <ellipse cx="30" cy={y} rx="20" ry="2.6" fill="#33d9ff" opacity="0.65" filter="url(#ringGlow)" />
          <ellipse cx="30" cy={y} rx="20" ry="1" fill="#a8f2ff" opacity="0.9" />
        </g>
      ))}

      {[16.5, 30, 44, 58].map((y) => (
        <circle key={y} cx="49" cy={y} r="1" fill="#7fe7ff" opacity="0.8" />
      ))}

      <path
        d="M30,5.5 L31,8.5 L34,9.5 L31,10.5 L30,13.5 L29,10.5 L26,9.5 L29,8.5 Z"
        fill="#cdf7ff"
        opacity="0.9"
      />
    </svg>
  );
}

export default function DatabaseDiagram() {
  const reduceMotion = useReducedMotion();

  const iconTransition = reduceMotion
    ? { duration: 0 }
    : { delay: 1, duration: 1.2, ease: "easeInOut" as const };

  return (
    <div className="pointer-events-none absolute inset-0 z-10">
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 h-full w-full"
      >
        <defs>
          <filter id="lineGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.4" />
          </filter>
        </defs>
        {LINES.map((line, i) => {
          const d = curvePath(ICON_END_POINT, line.to);
          const transition = reduceMotion
            ? { duration: 0 }
            : { delay: 2.3 + line.delay, duration: 0.5, ease: "easeOut" as const };
          return (
            <g key={i}>
              <motion.path
                d={d}
                fill="none"
                stroke="#4fd6ff"
                strokeWidth="4"
                strokeOpacity="0.45"
                filter="url(#lineGlow)"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={transition}
              />
              <motion.path
                d={d}
                fill="none"
                stroke="#a8f2ff"
                strokeWidth="1.4"
                strokeOpacity="0.9"
                vectorEffect="non-scaling-stroke"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={transition}
              />
            </g>
          );
        })}
      </svg>

      <motion.div
        className="absolute h-20 w-[3.5rem] -translate-x-1/2 -translate-y-1/2 drop-shadow-[0_0_20px_rgba(79,214,255,0.6)] sm:h-24 sm:w-16"
        initial={{ left: `${ICON_START.left}%`, top: `${ICON_START.top}%` }}
        animate={{ left: `${ICON_END.left}%`, top: `${ICON_END.top}%` }}
        transition={iconTransition}
      >
        <DatabaseIcon />
      </motion.div>

      <motion.div
        className="pointer-events-auto absolute right-[4%] top-[6%] w-[min(90vw,300px)] rounded-xl border border-cyan-300/20 bg-slate-900/60 p-5 backdrop-blur-md sm:right-[14%] sm:top-[31%] sm:w-[300px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { delay: 2.6, duration: 0.4, ease: "easeOut" }}
      >
        <p className="text-2xl font-semibold text-white sm:text-3xl">{siteContent.name}</p>
        <p className="mt-1 text-sm text-cyan-300/80">{siteContent.role}</p>
      </motion.div>

      <motion.div
        className="pointer-events-auto absolute right-[4%] top-[20%] w-[min(85vw,260px)] rounded-xl border border-cyan-300/20 bg-slate-900/60 p-4 backdrop-blur-md sm:right-[14%] sm:top-[47%] sm:w-[260px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { delay: 2.75, duration: 0.4, ease: "easeOut" }}
      >
        <p className="text-sm text-slate-200">{siteContent.tagline}</p>
      </motion.div>

      <motion.a
        href={siteContent.links.github}
        target="_blank"
        rel="noopener noreferrer"
        className="pointer-events-auto absolute left-[4%] top-[50%] flex w-[min(80vw,200px)] items-center gap-3 rounded-xl border border-cyan-300/20 bg-slate-900/60 p-4 backdrop-blur-md transition-colors hover:border-cyan-300/50 sm:left-[33%] sm:top-[59%] sm:w-[190px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { delay: 2.9, duration: 0.4, ease: "easeOut" }}
      >
        <span className="flex gap-2 text-cyan-300">
          <GithubIcon />
          <LinkedinIcon />
        </span>
        <span className="text-sm text-slate-200">Social</span>
      </motion.a>

      <motion.a
        href={siteContent.links.resume}
        download
        className="pointer-events-auto absolute left-[4%] top-[66%] flex w-[min(80vw,200px)] items-center gap-3 rounded-xl border border-cyan-300/20 bg-slate-900/60 p-4 backdrop-blur-md transition-colors hover:border-cyan-300/50 sm:left-[33%] sm:top-[73%] sm:w-[190px]"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={reduceMotion ? { duration: 0 } : { delay: 3.05, duration: 0.4, ease: "easeOut" }}
      >
        <Download className="h-5 w-5 text-cyan-300" />
        <span className="text-sm text-slate-200">Résumé</span>
      </motion.a>
    </div>
  );
}
