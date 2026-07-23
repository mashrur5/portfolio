"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import ExperienceList from "@/components/experience-list";
import ExperienceDetailModal from "@/components/experience-detail-modal";
import ExperienceChoiceModal from "@/components/experience-choice-modal";
import { CANADA_EXPERIENCE, BANGLADESH_EXPERIENCE } from "@/data/work-experience";
import type { Country } from "@/components/experience-map";

const ExperienceMap = dynamic(() => import("@/components/experience-map"), {
  ssr: false,
  loading: () => <div className="flex-1 animate-pulse bg-white/5" />,
});

const ALL_EXPERIENCE = [...CANADA_EXPERIENCE, ...BANGLADESH_EXPERIENCE];

export default function Experience() {
  const [country, setCountry] = useState<Country>("canada");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [pendingChoiceIds, setPendingChoiceIds] = useState<string[] | null>(null);

  const entries = country === "canada" ? CANADA_EXPERIENCE : BANGLADESH_EXPERIENCE;
  const selectedEntry = ALL_EXPERIENCE.find((entry) => entry.id === selectedId) ?? null;

  useEffect(() => {
    const openId = new URLSearchParams(window.location.search).get("open");
    const entry = ALL_EXPERIENCE.find((e) => e.id === openId);
    if (!entry) return;
    setCountry(CANADA_EXPERIENCE.includes(entry) ? "canada" : "bangladesh");
    setSelectedId(entry.id);
  }, []);
  const choiceEntries = pendingChoiceIds
    ? pendingChoiceIds
        .map((id) => ALL_EXPERIENCE.find((entry) => entry.id === id))
        .filter((entry): entry is (typeof ALL_EXPERIENCE)[number] => Boolean(entry))
    : null;

  function handlePinSelect(experienceIds: string[]) {
    if (experienceIds.length === 1) {
      setSelectedId(experienceIds[0]);
    } else {
      setPendingChoiceIds(experienceIds);
    }
  }

  return (
    <main className="flex h-full min-h-0 flex-col">
      <div className="px-6 py-8 sm:px-12">
        <h1 className="text-2xl font-extrabold text-white sm:text-3xl">Experience</h1>
      </div>

      <div className="flex min-h-0 flex-1 flex-col sm:flex-row">
        <div className="max-h-72 min-h-0 w-full shrink-0 overflow-y-auto border-b border-white/10 sm:h-full sm:max-h-none sm:w-[360px] sm:border-r sm:border-b-0">
          <ExperienceList entries={entries} onSelect={setSelectedId} />
        </div>
        <div className="relative min-h-0 flex-1">
          <ExperienceMap
            country={country}
            isOverlayOpen={Boolean(selectedId) || Boolean(pendingChoiceIds)}
            onSelect={handlePinSelect}
          />
        </div>
      </div>

      <div className="flex justify-center gap-4 border-t border-white/10 bg-[#05070f] py-5">
        {(["canada", "bangladesh"] as const).map((c) => (
          <button
            key={c}
            onClick={() => setCountry(c)}
            className={`rounded-full border px-5 py-1.5 text-sm font-semibold transition-colors ${
              country === c
                ? "border-cyan-300/60 bg-cyan-300/10 text-cyan-300"
                : "border-white/15 bg-white/5 text-slate-300 hover:border-cyan-300/40 hover:text-cyan-300"
            }`}
          >
            {c === "canada" ? "Canada" : "Bangladesh"}
          </button>
        ))}
      </div>

      <ExperienceChoiceModal
        entries={choiceEntries}
        onChoose={(id) => {
          setPendingChoiceIds(null);
          setSelectedId(id);
        }}
        onClose={() => setPendingChoiceIds(null)}
      />

      <ExperienceDetailModal entry={selectedEntry} onClose={() => setSelectedId(null)} />
    </main>
  );
}
