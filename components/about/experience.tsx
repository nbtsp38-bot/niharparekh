"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

type ExperienceEntry = {
  id: string;
  num: string;
  category: string;
  role: string;
  period: string;
  meta: string;
  tag?: string;
  isCurrent?: boolean;
  type: "freelance" | "agency" | "studio";
  monogram: string;
};

const EXPERIENCES: ExperienceEntry[] = [
  {
    id: "exp-1",
    num: "01",
    category: "FREELANCE",
    role: "Video Editor & Motion Designer",
    period: "2024 – Present",
    meta: "Short-Form, Cinematic Cuts & Motion Graphics",
    tag: "20+ CLIENTS",
    type: "freelance",
    monogram: "NP",
  },
  {
    id: "exp-2",
    num: "02",
    category: "CREATIVE MEDIA AGENCY",
    role: "Video Editor / Motion Designer",
    period: "2024 – 2026",
    meta: "Brand Campaigns, Dynamic Edits & Title Design",
    tag: "CURRENT ROLE",
    isCurrent: true,
    type: "agency",
    monogram: "CA",
  },
  {
    id: "exp-3",
    num: "03",
    category: "DIGITAL CHANNELS & BRANDS",
    role: "Short-Form Content Specialist",
    period: "2022 – 2024",
    meta: "High-Retention Content, Pacing & VFX",
    tag: "CONTRACT",
    type: "studio",
    monogram: "DC",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Experience(): ReactNode {
  const [open, setOpen] = useState(false);
  const visibleEntries = open ? EXPERIENCES : EXPERIENCES.slice(0, 3);
  const hasMore = EXPERIENCES.length > 3;

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="flex items-center gap-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.25em] text-accent">
          <span>//</span> Experience
        </h3>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60">
          2022 — 2026
        </span>
      </div>

      {/* Main Container */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-primary/60 p-5 backdrop-blur-sm shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)] dark:border-border dark:bg-surface-primary/80 dark:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.85)] sm:p-7">
        {/* Subtle Vertical Timeline Guide Line */}
        <div 
          aria-hidden="true" 
          className="pointer-events-none absolute bottom-8 left-[31px] top-8 w-[1px] bg-gradient-to-b from-accent/40 via-border/80 to-transparent dark:from-accent/40 dark:via-border/60 sm:left-[39px]"
        />

        <div className="relative flex flex-col gap-6 sm:gap-7">
          <AnimatePresence initial={false}>
            {visibleEntries.map((entry, index) => (
              <ExperienceItem key={entry.id} entry={entry} index={index} />
            ))}
          </AnimatePresence>
        </div>

        {/* Expand / Collapse Control */}
        {hasMore && (
          <div className="mt-6 flex justify-center border-t border-border/50 pt-4 dark:border-border/50">
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              className="group inline-flex cursor-pointer items-center gap-2 font-mono text-[10.5px] font-medium uppercase tracking-[0.2em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <span>{open ? "SHOW LESS" : "VIEW ALL EXPERIENCE"}</span>
              <motion.span
                animate={{ rotate: open ? 180 : 0 }}
                transition={{ duration: 0.25, ease: EASE }}
                className="inline-flex text-accent"
              >
                <ChevronDown className="h-3.5 w-3.5" aria-hidden="true" />
              </motion.span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

function ExperienceItem({
  entry,
  index: _index,
}: {
  entry: ExperienceEntry;
  index: number;
}): ReactNode {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.35, ease: EASE }}
      whileHover={{ x: 5 }}
      className="group relative flex items-start gap-4 sm:gap-5"
    >
      {/* Timeline Node Marker */}
      <div className="relative z-10 flex shrink-0 items-center justify-center pt-0.5">
        <span
          className={`flex h-6 w-6 items-center justify-center rounded-full border font-mono text-[8px] font-medium tracking-wider transition-all duration-300 sm:h-7 sm:w-7 sm:text-[9px] ${
            entry.isCurrent
              ? "border-accent/90 bg-surface-primary text-accent shadow-[0_0_12px_-2px_rgba(176,138,87,0.4)] ring-3 ring-accent/15 dark:bg-surface-elevated"
              : "border-border bg-surface-primary text-muted-foreground/70 group-hover:border-accent/70 group-hover:text-accent dark:border-border dark:bg-surface-elevated"
          }`}
        >
          {entry.num}
        </span>
      </div>

      {/* Monogram / Brand Icon */}
      <div className="relative z-10 hidden shrink-0 sm:flex">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-border bg-surface-secondary/50 font-mono text-[10.5px] font-semibold tracking-wider text-foreground/80 shadow-xs transition-all duration-300 group-hover:border-accent/40 group-hover:bg-surface-secondary dark:border-border dark:bg-surface-secondary/40 dark:group-hover:border-accent/35 dark:group-hover:bg-surface-secondary">
          {entry.type === "freelance" ? (
            <span className="text-accent">{entry.monogram}</span>
          ) : (
            <span>{entry.monogram}</span>
          )}
        </span>
      </div>

      {/* Content Block */}
      <div className="flex min-w-0 flex-1 flex-col pt-0.5">
        {/* Category Header & Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-foreground sm:text-[13px]">
            {entry.category}
          </span>

          {entry.tag && (
            <span
              className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[7.5px] font-medium uppercase tracking-widest sm:text-[8px] ${
                entry.isCurrent
                  ? "bg-accent/10 text-accent ring-1 ring-accent/30"
                  : "bg-foreground/[0.04] text-muted-foreground ring-1 ring-border/80 dark:bg-white/[0.03] dark:ring-white/[0.08]"
              }`}
            >
              {entry.isCurrent && (
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
                  <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
                </span>
              )}
              {entry.tag}
            </span>
          )}
        </div>

        {/* Role */}
        <span className="mt-1 text-[14.5px] font-medium tracking-tight text-foreground/90 sm:text-[15.5px]">
          {entry.role}
        </span>

        {/* Meta / Supporting Details & Dates */}
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[12px] tracking-tight text-muted-foreground sm:text-[13px]">
          <span className="text-muted-foreground/85">{entry.meta}</span>
          <span className="text-muted-foreground/30 select-none">•</span>
          <span className="font-mono text-[10.5px] tracking-wider text-foreground/60 sm:text-[11px]">
            {entry.period}
          </span>
        </div>
      </div>
    </motion.div>
  );
}

