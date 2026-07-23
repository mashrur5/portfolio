import type { ExperienceEntry } from "@/data/work-experience";

export default function ExperienceList({
  entries,
  onSelect,
}: {
  entries: ExperienceEntry[];
  onSelect: (experienceId: string) => void;
}) {
  return (
    <div className="flex flex-col gap-4 p-6 sm:p-6">
      {entries.map((entry) => (
        <button
          key={entry.id}
          onClick={() => onSelect(entry.id)}
          className="rounded-xl border border-white/10 bg-white/5 p-4 text-left transition-colors hover:border-cyan-300/40 hover:bg-white/[0.07]"
        >
          <div className="flex items-baseline justify-between gap-2">
            <h3 className="text-sm font-bold text-white">{entry.title}</h3>
            <span className="shrink-0 text-[11px] whitespace-nowrap text-slate-400">
              {entry.dates}
            </span>
          </div>
          <p className="mt-0.5 text-xs font-semibold text-cyan-300">{entry.organization}</p>
          <p className="text-[11px] text-slate-500">{entry.location}</p>
          <ul className="mt-2 space-y-1">
            {entry.highlights.map((highlight) => (
              <li key={highlight} className="text-xs leading-snug text-slate-300">
                • {highlight}
              </li>
            ))}
          </ul>
        </button>
      ))}
    </div>
  );
}
