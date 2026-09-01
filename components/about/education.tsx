"use client";

import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState, type ReactNode } from "react";

type JourneyItem = {
  id: string;
  num: string;
  category: string;
  title: string;
  subtitle: string;
  detail: string;
  badge: string;
  isCurrent?: boolean;
  type: "formal" | "active-learning" | "creative-practice";
  monogram: string;
};

const JOURNEY_ITEMS: JourneyItem[] = [
  {
    id: "journey-1",
    num: "01",
    category: "FORMAL EDUCATION",
    title: "SSC",
    subtitle: "Secondary School Certificate",
    detail: "Fundamental Academic Foundation",
    badge: "FOUNDATION",
    type: "formal",
    monogram: "SC",
  },
  {
    id: "journey-2",
    num: "02",
    category: "FORMAL EDUCATION",
    title: "HSC · SCIENCE (A GROUP)",
    subtitle: "Higher Secondary Certificate",
    detail: "Grades 11–12 · Science, A Group",
    badge: "GRADUATION",
    type: "formal",
    monogram: "HS",
  },
  {
    id: "journey-3",
    num: "03",
    category: "3D & VISUAL EFFECTS",
    title: "MAAC INSTITUTE",
    subtitle: "3D / Animation / Visual Effects",
    detail: "Currently learning 3D foundations, modeling & visual motion",
    badge: "CURRENTLY LEARNING",
    isCurrent: true,
    type: "active-learning",
    monogram: "3D",
  },
  {
    id: "journey-4",
    num: "04",
    category: "CREATIVE DEVELOPMENT",
    title: "VIDEO EDITING",
    subtitle: "Professional Video Editor",
    detail: "2–3 years of professional practice · Narrative pacing, soundscapes & cuts",
    badge: "PROFESSIONAL PRACTICE",
    type: "creative-practice",
    monogram: "VE",
  },
  {
    id: "journey-5",
    num: "05",
    category: "CREATIVE DEVELOPMENT",
    title: "MOTION DESIGN",
    subtitle: "Professional Motion Designer",
    detail: "Kinetic typography, 2D animation, brand motion & visual storytelling",
    badge: "PROFESSIONAL PRACTICE",
    type: "creative-practice",
    monogram: "MD",
  },
  {
    id: "journey-6",
    num: "06",
    category: "CREATIVE DEVELOPMENT",
    title: "STATIC DESIGN",
    subtitle: "Visual & Promotional Design",
    detail: "Social creatives, promotional graphics, layout systems & branding assets",
    badge: "CREATIVE PRACTICE",
    type: "creative-practice",
    monogram: "SD",
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function Education(): ReactNode {
  const [open, setOpen] = useState(false);
  const visibleItems = open ? JOURNEY_ITEMS : JOURNEY_ITEMS.slice(0, 3);
  const hasMore = JOURNEY_ITEMS.length > 3;

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="flex items-center gap-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.25em] text-accent">
          <span>//</span> Learning Journey
        </h3>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60">
          EDUCATION · SKILLS · GROWTH
        </span>
      </div>

      {/* Main Container */}
      <div className="relative overflow-hidden rounded-3xl border border-border bg-surface-primary/60 p-5 backdrop-blur-sm shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)] dark:border-border dark:bg-surface-primary/80 dark:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.85)] sm:p-7">
        {/* Subtle Vertical Timeline Progression Guide Line */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute bottom-8 left-[31px] top-8 w-[1px] bg-gradient-to-b from-border/80 via-accent/50 to-border/30 dark:from-border/60 dark:via-accent/40 dark:to-border/20 sm:left-[39px]"
        />

        <div className="relative flex flex-col gap-6 sm:gap-7">
          <AnimatePresence initial={false}>
            {visibleItems.map((item, index) => (
              <JourneyEntry key={item.id} item={item} index={index} />
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
              <span>{open ? "SHOW LESS" : "VIEW FULL JOURNEY"}</span>
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

function JourneyEntry({
  item,
  index: _index,
}: {
  item: JourneyItem;
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
            item.isCurrent
              ? "border-accent-olive bg-surface-primary text-accent-olive shadow-[0_0_12px_-2px_rgba(85,97,69,0.35)] ring-3 ring-accent-olive/15 dark:bg-surface-elevated"
              : "border-border bg-surface-primary text-muted-foreground/70 group-hover:border-accent-sand/70 group-hover:text-accent-sand dark:border-border dark:bg-surface-elevated"
          }`}
        >
          {item.num}
        </span>
      </div>

      {/* Geometric Monogram Container */}
      <div className="relative z-10 hidden shrink-0 sm:flex">
        <span
          className={`flex h-11 w-11 items-center justify-center rounded-xl border font-mono text-[10px] font-semibold tracking-wider shadow-xs transition-all duration-300 ${
            item.isCurrent
              ? "border-accent-olive/50 bg-accent-olive/[0.08] text-accent-olive ring-1 ring-accent-olive/20"
              : item.type === "creative-practice"
              ? "border-border bg-surface-secondary/50 text-foreground/80 group-hover:border-accent-sand/40 group-hover:bg-surface-secondary dark:border-border dark:bg-surface-secondary/40 dark:group-hover:border-accent-sand/35"
              : "border-border bg-surface-secondary/30 text-muted-foreground group-hover:border-border group-hover:text-foreground/75 dark:border-border dark:bg-surface-secondary/20"
          }`}
        >
          {item.monogram}
        </span>
      </div>

      {/* Content Block */}
      <div className="flex min-w-0 flex-1 flex-col pt-0.5">
        {/* Category Header & Tag */}
        <div className="flex flex-wrap items-center justify-between gap-2">
          <span className="font-mono text-[12px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-foreground sm:text-[13px]">
            {item.title}
          </span>

          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 font-mono text-[7.5px] font-medium uppercase tracking-widest sm:text-[8px] ${
              item.isCurrent
                ? "bg-accent-olive/10 text-accent-olive ring-1 ring-accent-olive/30"
                : item.type === "creative-practice"
                ? "bg-surface-secondary text-muted-foreground ring-1 ring-border"
                : "bg-surface-primary text-muted-foreground ring-1 ring-border"
            }`}
          >
            {item.isCurrent && (
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent-olive opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent-olive" />
              </span>
            )}
            {item.badge}
          </span>
        </div>

        {/* Subtitle / Role */}
        <span className="mt-1 text-[14.5px] font-medium tracking-tight text-foreground/90 sm:text-[15.5px]">
          {item.subtitle}
        </span>

        {/* Detail / Description */}
        <div className="mt-0.5 flex flex-wrap items-center gap-x-2 text-[12px] tracking-tight text-muted-foreground sm:text-[12.5px]">
          <span className="text-muted-foreground/80">{item.detail}</span>
        </div>
      </div>
    </motion.div>
  );
}

