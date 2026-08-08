"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { RESUMES } from "@/data/site-content";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [resumeOpen, setResumeOpen] = useState(false);
  const resumeRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!resumeOpen) return;
    function handlePointerDown(e: PointerEvent) {
      if (resumeRef.current && !resumeRef.current.contains(e.target as Node)) setResumeOpen(false);
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setResumeOpen(false);
    }
    window.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("keydown", handleKey);
    return () => {
      window.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("keydown", handleKey);
    };
  }, [resumeOpen]);

  function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!isHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function navLinkClass(href: string) {
    const isActive = pathname === href;
    return `text-xs font-medium transition-colors hover:text-cyan-300 sm:text-sm sm:text-slate-300 ${
      isActive ? "text-cyan-300 underline decoration-2 underline-offset-4 sm:no-underline" : "text-slate-300"
    }`;
  }

  return (
    <header
      className={
        isHome
          ? "sticky top-4 z-50 mx-4 rounded-2xl border border-white/10 bg-[#05070f]/80 shadow-lg shadow-black/30 backdrop-blur-md sm:mx-8"
          : "sticky top-0 z-50 border-b border-white/10 bg-[#05070f]/80 backdrop-blur-md"
      }
    >
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-3 px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:gap-2 sm:px-12 sm:py-4">
        <a
          href="/"
          onClick={scrollToTop}
          className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap text-sm font-semibold tracking-wide text-white sm:w-auto sm:justify-start"
        >
          <span>🐼</span>
          <span>MMMM</span>
        </a>
        <div className="flex w-full flex-col items-center gap-3 sm:w-auto sm:flex-row sm:gap-x-8 sm:gap-y-2">
          <nav className="flex flex-wrap items-center justify-center gap-x-4 gap-y-1 sm:gap-x-8">
            <a href="/experience" className={navLinkClass("/experience")}>
              Experience
            </a>
            <a href="/projects" className={navLinkClass("/projects")}>
              Projects
            </a>
            <a href="/awards" className={navLinkClass("/awards")}>
              Awards
            </a>
            <a href="/leadership" className={navLinkClass("/leadership")}>
              Leadership
            </a>
          </nav>
          <div ref={resumeRef} className="relative w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setResumeOpen((open) => !open)}
              aria-expanded={resumeOpen}
              className="w-full rounded-full border border-cyan-300/50 bg-white/5 px-4 py-2 text-center text-xs font-semibold text-cyan-300 backdrop-blur-sm transition-colors hover:bg-cyan-300/10 sm:w-auto sm:py-1 sm:text-sm"
            >
              Resume
            </button>
            {resumeOpen && (
              <div className="absolute top-full right-0 left-0 z-10 mt-2 overflow-hidden rounded-xl border border-white/10 bg-[#05070f] shadow-lg shadow-black/40 sm:left-auto sm:w-56">
                {RESUMES.map((resume) => (
                  <a
                    key={resume.href}
                    href={resume.href}
                    download
                    onClick={() => setResumeOpen(false)}
                    className="block px-4 py-2.5 text-xs font-medium text-slate-300 transition-colors hover:bg-white/5 hover:text-cyan-300 sm:text-sm"
                  >
                    {resume.label}
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
