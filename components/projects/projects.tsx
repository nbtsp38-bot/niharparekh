"use client";

import {
  ArrowRight,
  Sparkles,
  Video,
  Play,
  Film,

} from "lucide-react";
import { useState, useRef, type ReactNode } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "motion/react";

import { FadeIn } from "@/components/ui/motion-primitives";

type Project = {
  id: string;
  category: "motion" | "short-form" | "promo";
  icon: any;
  iconLabel: string;
  title: string;
  description: string;
  meta: string;
  video: string;
};

const PROJECTS: Project[] = [
  {
    id: "motion-01",
    category: "motion",
    icon: Sparkles,
    iconLabel: "Motion Graphics",
    title: "Cinematic Motion Graphics",
    description: "Creative visual effects and animated elements designed to capture attention and tell stories.",
    meta: "Motion Graphics · 2026",
    video: "/videos/motion_01.mp4"
  },
  {
    id: "motion-02",
    category: "motion",
    icon: Sparkles,
    iconLabel: "Motion Graphics",
    title: "Kinetic Typography & Titles",
    description: "Dynamic titles and text graphics customized to elevate the style of video narratives.",
    meta: "Kinetic Typography · 2026",
    video: "/videos/motion_02.mp4"
  },
  {
    id: "motion-03",
    category: "motion",
    icon: Sparkles,
    iconLabel: "Motion Graphics",
    title: "VFX Compositing & Keying",
    description: "Seamless compositing, green-screen keying, and tracking integrations for commercial assets.",
    meta: "VFX Compositing · 2025",
    video: "/videos/motion_03.mp4"
  },
  {
    id: "motion-04",
    category: "motion",
    icon: Sparkles,
    iconLabel: "Motion Graphics",
    title: "Brand Logo Motion Design",
    description: "Animated icons, logo reveals, and custom UI transitions built for high-end digital creators.",
    meta: "Logo Animation · 2026",
    video: "/videos/motion_04.mp4"
  },
  {
    id: "motion-05",
    category: "motion",
    icon: Sparkles,
    iconLabel: "Motion Graphics",
    title: "3D Graphics & Render Cuts",
    description: "3D modeling animations and environment design renders processed for promo video campaigns.",
    meta: "3D Animation · 2025",
    video: "/videos/motion_05.mp4"
  },
  {
    id: "short-01",
    category: "short-form",
    icon: Video,
    iconLabel: "Short-Form Cut",
    title: "High-Retention Instagram Reel",
    description: "Engagement-first vertical cut featuring hooks, pacing, and visual subtitles that drive watch time.",
    meta: "Short-Form Editing · 2026",
    video: "/videos/short_001_1.mp4"
  },
  {
    id: "short-02",
    category: "short-form",
    icon: Video,
    iconLabel: "Short-Form Cut",
    title: "Story-Driven TikTok Cut",
    description: "Cinematic vertical format with pacing customized around the creator's voice and brand identity.",
    meta: "Short-Form Editing · 2026",
    video: "/videos/short_002.mp4"
  },
  {
    id: "short-03",
    category: "short-form",
    icon: Video,
    iconLabel: "Short-Form Cut",
    title: "Educational Explainer Short",
    description: "Complex informational video condensed into a dynamic short with graphics, cues, and sound design.",
    meta: "Educational Cut · 2025",
    video: "/videos/short_003.mp4"
  },
  {
    id: "short-04",
    category: "short-form",
    icon: Video,
    iconLabel: "Short-Form Cut",
    title: "Kinetic Text Social Campaign",
    description: "Visual-heavy vertical cut built around sound design cues and responsive subtitle graphics.",
    meta: "Short-Form Editing · 2026",
    video: "/videos/short_02.mp4"
  },
  {
    id: "short-05",
    category: "short-form",
    icon: Video,
    iconLabel: "Short-Form Cut",
    title: "Cinematic Lifestyle Reel",
    description: "Atmospheric pacing, curated soundtrack editing, and detailed color grades for personal brands.",
    meta: "Cinematic Reel · 2026",
    video: "/videos/short_05.mp4"
  },
  {
    id: "short-06",
    category: "short-form",
    icon: Video,
    iconLabel: "Short-Form Cut",
    title: "Docu-Style Creator Cut",
    description: "Mini-documentary formatting with optimized pacing, soundscapes, and supportive B-roll cuts.",
    meta: "Docu-Style Cut · 2026",
    video: "/videos/short_06.mp4"
  },
  {
    id: "promo-01",
    category: "promo",
    icon: Film,
    iconLabel: "Product Promo",
    title: "Product Promo Social Ad",
    description: "Ad cut structured around fast pacing, call-to-action overlays, and high-impact hooks.",
    meta: "Promo Cut · 2026",
    video: "/videos/promo.mp4"
  }
];

export type ProjectsProps = {
  withHeadline?: boolean;
  viewMoreVisible?: boolean;
};

export function Projects({
  withHeadline = false,
  viewMoreVisible = false,
}: ProjectsProps): ReactNode {
  const [filter, setFilter] = useState<"all" | "motion" | "short-form" | "promo">("all");

  const filtered = filter === "all" 
    ? PROJECTS 
    : PROJECTS.filter((p) => p.category === filter);

  const items = viewMoreVisible ? filtered.slice(0, 4) : filtered;

  return (
    <section className="relative w-full">
      <div className="mx-auto w-full max-w-275 px-6 sm:px-10">
        {withHeadline ? (
          <FadeIn className="flex flex-col items-center gap-5 pt-12 pb-6 text-center sm:pt-20 sm:pb-10">
            <h2 className="font-serif text-[2.5rem] font-medium leading-[1.05] tracking-tight text-foreground md:text-[3rem] lg:text-[3.5rem]">
              My Work
            </h2>
            <p className="max-w-[33ch] text-[18px] leading-[1.45] tracking-tight text-foreground/65 sm:text-[20px]">
              Cinematic edits, motion design, and short-form cuts made for creators and brands.
            </p>
          </FadeIn>
        ) : null}

        {/* Category Filters */}
        <FadeIn delay={0.05} className="mb-10 flex justify-center">
          <div className="flex rounded-full bg-foreground/3 p-1 ring-1 ring-foreground/8">
            <button
              onClick={() => setFilter("all")}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300 ${
                filter === "all"
                  ? "bg-surface-primary text-foreground shadow-sm ring-1 ring-accent/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              All Work
            </button>
            <button
              onClick={() => setFilter("motion")}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300 ${
                filter === "motion"
                  ? "bg-surface-primary text-foreground shadow-sm ring-1 ring-accent/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Motion Graphics
            </button>
            <button
              onClick={() => setFilter("short-form")}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300 ${
                filter === "short-form"
                  ? "bg-surface-primary text-foreground shadow-sm ring-1 ring-accent/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Short-Form Editing
            </button>
            <button
              onClick={() => setFilter("promo")}
              className={`rounded-full px-5 py-1.5 text-xs font-semibold tracking-tight transition-all duration-300 ${
                filter === "promo"
                  ? "bg-surface-primary text-foreground shadow-sm ring-1 ring-accent/40"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Promo
            </button>
          </div>
        </FadeIn>

        <motion.div 
          layout
          className={
            filter === "short-form"
              ? "grid grid-cols-2 sm:grid-cols-3 gap-6 md:gap-7"
              : filter === "motion"
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7"
              : filter === "promo"
              ? "grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-7"
              : "columns-1 md:columns-2 gap-6 md:gap-7"
          }
        >
          <AnimatePresence mode="popLayout">
            {items.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </AnimatePresence>
        </motion.div>

        {viewMoreVisible ? (
          <div className="mt-12 flex justify-center sm:mt-16">
            <Link
              href="/projects"
              className="border border-foreground/8 focus-ring group inline-flex cursor-pointer items-center gap-2 rounded-xl bg-background px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-foreground/5"
            >
              View all projects
              <ArrowRight
                className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}

function ProjectCard({
  project,
  index: _index,
}: {
  project: Project;
  index: number;
}): ReactNode {
  const Icon = project.icon;
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleMouseEnter = async () => {
    if (videoRef.current) {
      try {
        await videoRef.current.play();
        setIsPlaying(true);
      } catch (err) {
        // Autoplay policies might restrict play
      }
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
      className="mb-6 break-inside-avoid md:mb-7"
    >
      <article 
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="project-card flex flex-col gap-4 rounded-3xl border border-border bg-surface-primary p-3 sm:p-3.5 transition-all duration-300"
      >
        <header className="flex items-center gap-2.5 px-1 pt-2">
          <span className="border-border inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border bg-surface-secondary">
            <Icon className="h-3.5 w-3.5 text-foreground" aria-hidden="true" />
          </span>
          <span className="text-sm font-medium tracking-tight text-foreground">
            {project.iconLabel}
          </span>
        </header>

        {/* Video Card Player */}
        <div className={`relative w-full overflow-hidden rounded-2xl bg-surface-secondary/60 ring-1 ring-border ${
          project.category === "short-form" ? "aspect-[9/16]" : "aspect-video"
        }`}>
          <video
            ref={videoRef}
            src={project.video}
            preload="metadata"
            loop
            muted
            playsInline
            controls
            className="h-full w-full object-cover"
          />
          {!isPlaying && (
            <div className="absolute inset-0 pointer-events-none flex items-center justify-center bg-black/15 transition-opacity duration-300">
              <div className="rounded-full bg-surface-elevated/95 p-3 shadow-lg ring-1 ring-border flex items-center justify-center">
                <Play className="h-5 w-5 text-foreground fill-foreground translate-x-0.5" />
              </div>
            </div>
          )}
        </div>

        <div className="flex flex-col gap-2.5 px-1 pb-1">
          <h3 className="text-[20px] font-medium leading-[1.2] tracking-tight text-foreground sm:text-[22px]">
            {project.title}
          </h3>
          <p className="text-[14px] leading-normal tracking-tight text-muted-foreground sm:text-[15px]">
            {project.description}
          </p>
        </div>

        <p className="px-1 pb-2 font-mono text-[11px] tracking-wider text-text-muted">
          {project.meta}
        </p>
      </article>
    </motion.div>
  );
}
