"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { PROJECTS } from "@/data/projects";
import ProjectDetailModal from "@/components/project-detail-modal";

export default function Projects() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selected = PROJECTS.find((p) => p.id === selectedId) ?? null;

  useEffect(() => {
    const openId = new URLSearchParams(window.location.search).get("open");
    if (openId && PROJECTS.some((p) => p.id === openId)) setSelectedId(openId);
  }, []);

  return (
    <main className="flex min-h-screen flex-col sm:h-full sm:min-h-0">
      <div className="px-6 py-8 sm:px-12">
        <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Projects</h1>
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-1 gap-4 px-6 pb-8 sm:grid-cols-2 sm:grid-rows-2 sm:px-12 sm:pb-12">
        {PROJECTS.map((project) => (
          <button
            key={project.id}
            onClick={() => setSelectedId(project.id)}
            className="group relative min-h-[220px] overflow-hidden rounded-2xl border border-white/10 text-left sm:min-h-0"
          >
            <Image
              src={project.thumbnail}
              alt=""
              fill
              sizes="(max-width: 640px) 100vw, 50vw"
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#05070f] via-[#05070f]/55 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6">
              <p className="text-[11px] font-semibold tracking-wide text-cyan-300 uppercase">
                {project.subtitle}
              </p>
              <h2 className="mt-1 text-lg font-extrabold text-white sm:text-xl">{project.title}</h2>
            </div>
          </button>
        ))}
      </div>

      <ProjectDetailModal project={selected} onClose={() => setSelectedId(null)} />
    </main>
  );
}
