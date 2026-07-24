"use client";

import { usePathname } from "next/navigation";
import { siteContent } from "@/data/site-content";

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";

  function scrollToTop(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!isHome) return;
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-[#05070f]/80 backdrop-blur-md">
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
            <a
              href="/experience"
              className="text-xs font-medium text-slate-300 transition-colors hover:text-cyan-300 sm:text-sm"
            >
              Experience
            </a>
            <a
              href="/projects"
              className="text-xs font-medium text-slate-300 transition-colors hover:text-cyan-300 sm:text-sm"
            >
              Projects
            </a>
            <a
              href="/awards"
              className="text-xs font-medium text-slate-300 transition-colors hover:text-cyan-300 sm:text-sm"
            >
              Awards
            </a>
            <a
              href="/leadership"
              className="text-xs font-medium text-slate-300 transition-colors hover:text-cyan-300 sm:text-sm"
            >
              Leadership
            </a>
          </nav>
          <a
            href={siteContent.links.resume}
            download
            className="w-full rounded-full border border-cyan-300/50 bg-white/5 px-4 py-2 text-center text-xs font-semibold text-cyan-300 backdrop-blur-sm transition-colors hover:bg-cyan-300/10 sm:w-auto sm:py-1 sm:text-sm"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
