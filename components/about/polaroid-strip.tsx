"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useSyncExternalStore, type ReactNode } from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";

type Panel = {
  id: string;
  label: string;
  rotate: number;
};

const PANELS: Panel[] = [
  { id: "edit", label: "EDIT", rotate: -8 },
  { id: "motion", label: "MOTION", rotate: 6 },
  { id: "vfx", label: "VFX", rotate: -4 },
  { id: "color", label: "COLOR", rotate: 7 },
  { id: "type", label: "TYPE", rotate: -6 },
  { id: "sound", label: "SOUND", rotate: 5 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

function PanelCard({
  panel,
  index,
}: {
  panel: Panel;
  index: number;
}): ReactNode {
  const ref = useRef<HTMLDivElement | null>(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 220, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 220, damping: 18, mass: 0.6 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const handleMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const max = 16;
    const k = 0.22;
    mx.set(Math.max(-max, Math.min(max, dx * k)));
    my.set(Math.max(-max, Math.min(max, dy * k)));
  };

  const handleLeave = (): void => {
    mx.set(0);
    my.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
      initial={{ opacity: 0, y: -120, filter: "blur(18px)", rotate: panel.rotate }}
      animate={{ opacity: 1, y: 0, filter: "blur(0px)", rotate: panel.rotate }}
      whileHover={{
        scale: 1.07,
        zIndex: 20,
        transition: { duration: 0.25, ease: EASE },
      }}
      transition={{
        duration: 0.9,
        delay: 0.05 + index * 0.08,
        ease: EASE,
      }}
      style={{
        x: tx,
        y: ty,
        rotate: panel.rotate,
      }}
      className="group relative aspect-[3/4] w-[clamp(6rem,11vw,9rem)] shrink-0 overflow-hidden rounded-2xl border-6 border-neutral-300/40 bg-white p-1.5 shadow-sm transition-shadow duration-300 hover:shadow-xl dark:border-white/15 dark:bg-neutral-900 select-none"
    >
      <div className="relative flex h-full w-full items-center justify-center overflow-hidden rounded-xl bg-foreground/[0.03] dark:bg-white/[0.02]">
        <DottedPattern className="absolute inset-0 h-full w-full opacity-60 dark:opacity-40" />
        <span className="relative z-10 font-mono text-[11px] font-medium tracking-[0.25em] text-foreground/45 transition-colors duration-250 group-hover:text-foreground sm:text-[12px]">
          {panel.label}
        </span>
      </div>
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />;
  }

  return (
    <div className="flex flex-wrap w-full items-start justify-center gap-1 px-4 sm:gap-1.5 sm:px-8">
      {PANELS.map((panel, i) => (
        <PanelCard key={panel.id} panel={panel} index={i} />
      ))}
    </div>
  );
}

