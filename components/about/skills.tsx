import type { ReactNode } from "react";

const SKILLS = [
  "Video Editing",
  "Motion Graphics",
  "Cinematic Editing",
  "Short-Form Content",
  "VFX Compositing",
  "Visual Storytelling",
  "Kinetic Typography",
  "Color Grading",
  "Audio Mixing",
];

export function Skills(): ReactNode {
  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="flex items-center gap-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.25em] text-accent">
          <span>//</span> What I Do
        </h3>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60">
          CORE DISCIPLINES
        </span>
      </div>

      <div className="rounded-3xl border border-border bg-surface-primary/60 p-4 backdrop-blur-sm shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)] dark:border-border dark:bg-surface-primary/80 dark:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.85)] sm:p-6">
        <div className="flex flex-wrap gap-2.5 sm:gap-3">
          {SKILLS.map((skill) => (
            <span
              key={skill}
              className="rounded-full border border-border bg-surface-primary px-4 py-2 text-[13px] font-medium tracking-tight text-foreground/90 transition-all duration-300 hover:border-accent/40 hover:text-foreground dark:border-border dark:bg-surface-elevated dark:text-foreground/90 sm:text-[13.5px]"
            >
              {skill}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
