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
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-6 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-12 sm:py-4">
        <a
          href="/"
          onClick={scrollToTop}
          className="whitespace-nowrap text-sm font-semibold tracking-wide text-white"
        >
          <span className="sm:hidden">{siteContent.shortName}</span>
          <span className="hidden sm:inline">{siteContent.name}</span>
        </a>
        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 sm:gap-x-8">
          <nav className="flex flex-wrap items-center gap-x-4 gap-y-1 sm:gap-x-8">
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
            className="rounded-full border border-cyan-300/50 bg-white/5 px-4 py-1 text-xs font-semibold text-cyan-300 backdrop-blur-sm transition-colors hover:bg-cyan-300/10 sm:text-sm"
          >
            Resume
          </a>
        </div>
      </div>
    </header>
  );
}
