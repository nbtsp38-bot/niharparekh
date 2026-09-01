"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";

type Panel = {
  id: string;
  num: string;
  label: string;
  sub: string;
  rotate: number;
  yOffset: number;
};

const PANELS: Panel[] = [
  { id: "edit", num: "01", label: "EDIT", sub: "PACING · CUTS · RHYTHM", rotate: -7.5, yOffset: 4 },
  { id: "motion", num: "02", label: "MOTION", sub: "ANIMATION · TRANSITIONS", rotate: 5.5, yOffset: -5 },
  { id: "vfx", num: "03", label: "VFX", sub: "COMPOSITING · EFFECTS", rotate: -3.5, yOffset: 6 },
  { id: "color", num: "04", label: "COLOR", sub: "GRADE · MOOD · TONE", rotate: 7, yOffset: -3 },
  { id: "type", num: "05", label: "TYPE", sub: "TYPOGRAPHY · KINETIC TYPE", rotate: -5.5, yOffset: 5 },
  { id: "sound", num: "06", label: "SOUND", sub: "SFX · MUSIC · SYNC", rotate: 4.5, yOffset: -2 },
];

const EASE = [0.16, 1, 0.3, 1] as const;

function PanelCard({
  panel,
  index,
  hoveredId,
  setHoveredId,
}: {
  panel: Panel;
  index: number;
  hoveredId: string | null;
  setHoveredId: (id: string | null) => void;
}): ReactNode {
  const isHovered = hoveredId === panel.id;
  const isAnyHovered = hoveredId !== null;
  const isOtherHovered = isAnyHovered && !isHovered;

  const cardRef = useRef<HTMLDivElement | null>(null);

  // Normalized cursor coordinates for 3D tilt & parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spX = useSpring(px, { stiffness: 280, damping: 24, mass: 0.4 });
  const spY = useSpring(py, { stiffness: 280, damping: 24, mass: 0.4 });

  // Physical 3D tilt (subtle & restrained: max ±3.5 deg)
  const rotateX = useTransform(spY, [-0.5, 0.5], [3.5, -3.5]);
  const rotateY = useTransform(spX, [-0.5, 0.5], [-3.5, 3.5]);

  // Dotted pattern parallax shifting in opposite direction
  const patternX = useTransform(spX, [-0.5, 0.5], [4, -4]);
  const patternY = useTransform(spY, [-0.5, 0.5], [4, -4]);

  // Spotlight coordinates (px)
  const spotX = useMotionValue(70);
  const spotY = useMotionValue(90);

  const spotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(130px circle at ${x}px ${y}px, rgba(178,138,104,0.08) 0%, rgba(203,167,135,0.04) 55%, transparent 75%)`
  );

  // Smooth outward focus shift for neighboring cards
  const hoveredIndex = PANELS.findIndex((p) => p.id === hoveredId);
  const pushOffset = isOtherHovered
    ? (index < hoveredIndex ? -4 : 4)
    : 0;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    // Only apply 3D cursor physics on fine pointers (desktop)
    if (e.pointerType === "touch") return;
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    px.set(x);
    py.set(y);
    spotX.set(e.clientX - rect.left);
    spotY.set(e.clientY - rect.top);
  };

  const handlePointerEnter = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType === "touch") return;
    setHoveredId(panel.id);
  };

  const handlePointerLeave = (): void => {
    px.set(0);
    py.set(0);
    setHoveredId(null);
  };

  // Extremely calm, slow micro-float (1.2px amplitude, 7.5s - 9.5s period)
  const floatDuration = 7.5 + (index % 3) * 0.9;
  const floatDelay = index * 0.4;

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={() => setHoveredId(isHovered ? null : panel.id)}
      initial={{ opacity: 0, y: -70, filter: "blur(10px)", rotate: panel.rotate }}
      animate={{
        opacity: isOtherHovered ? 0.6 : 1,
        y: isHovered
          ? panel.yOffset - 6
          : [panel.yOffset, panel.yOffset - 1.2, panel.yOffset],
        x: pushOffset,
        scale: isHovered ? 1.05 : isOtherHovered ? 0.98 : 1,
        filter: "blur(0px)",
        rotate: isHovered
          ? panel.rotate * 0.2
          : [panel.rotate - 0.15, panel.rotate + 0.15, panel.rotate - 0.15],
      }}
      transition={{
        y: isHovered
          ? { duration: 0.28, ease: EASE }
          : { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        rotate: isHovered
          ? { duration: 0.28, ease: EASE }
          : { duration: floatDuration * 1.05, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        scale: { duration: 0.28, ease: EASE },
        x: { duration: 0.28, ease: EASE },
        opacity: { duration: 0.28, ease: EASE },
        filter: { duration: 0.45, ease: EASE },
      }}
      style={{
        zIndex: isHovered ? 30 : 10 + index,
        transformPerspective: 1000,
      }}
      className="group relative aspect-[3/4] w-[clamp(6.2rem,11.5vw,9.2rem)] shrink-0 cursor-pointer select-none"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border p-1.5 transition-all duration-300 ${
          isHovered
            ? "border-accent-sand/50 bg-surface-elevated shadow-[0_18px_38px_-10px_rgba(28,26,23,0.1),0_4px_12px_-3px_rgba(28,26,23,0.04),inset_0_1px_0_rgba(203,167,135,0.12)] dark:border-accent-sand/45 dark:bg-surface-elevated dark:shadow-[0_20px_45px_-12px_rgba(0,0,0,0.85),0_6px_16px_-4px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(240,233,222,0.07)]"
            : "border-border bg-surface-primary shadow-[0_10px_24px_-8px_rgba(28,26,23,0.06),inset_0_1px_0_rgba(255,253,248,0.8)] dark:border-border dark:bg-surface-primary dark:shadow-[0_14px_34px_-10px_rgba(5,5,5,0.8),inset_0_1px_0_rgba(240,233,222,0.04),inset_0_-1px_0_rgba(5,5,5,0.4)]"
        }`}
      >
        {/* Softbox Studio Lighting Specular Layer */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.25 }}
          className="pointer-events-none absolute inset-0 z-20 rounded-xl"
          style={{ background: spotlightBg }}
        />

        {/* Inner Tactile Frame */}
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-border bg-surface-secondary/40 dark:border-border dark:bg-surface-soft/30">
          {/* Subtle Top Inner Edge Highlight */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-accent/25 to-transparent" />

          {/* Micro-Grain / Paper Matte Background Texture */}
          <div 
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.04] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          {/* Identity Detail: Low-contrast Corner Index Number */}
          <span className="pointer-events-none absolute top-2.5 left-3 font-mono text-[7px] font-normal tracking-[0.2em] text-foreground/25 transition-colors duration-300 group-hover:text-accent/80 select-none sm:text-[7.5px]">
            {panel.num}
          </span>

          {/* Dotted Pattern with Opposing Parallax Shift */}
          <motion.div
            style={{
              x: isHovered ? patternX : 0,
              y: isHovered ? patternY : 0,
            }}
            className="pointer-events-none absolute inset-[-14px] h-[calc(100%+28px)] w-[calc(100%+28px)]"
          >
            <DottedPattern className="h-full w-full opacity-45 transition-opacity duration-300 group-hover:opacity-65 dark:opacity-28 dark:group-hover:opacity-45" />
          </motion.div>

          {/* Centered Typography */}
          <div className="relative z-10 flex flex-col items-center justify-center px-2 text-center">
            <span className="font-mono text-[11px] font-medium tracking-[0.32em] text-foreground/60 transition-all duration-300 group-hover:tracking-[0.36em] group-hover:text-foreground sm:text-[12px]">
              {panel.label}
            </span>

            {/* Secondary Description (Smooth reveal only on hover) */}
            <motion.p
              initial={false}
              animate={{
                opacity: isHovered ? 0.85 : 0,
                y: isHovered ? 0 : 5,
                height: isHovered ? "auto" : 0,
                marginTop: isHovered ? 4 : 0,
              }}
              transition={{ duration: 0.22, ease: EASE }}
              className="overflow-hidden font-mono text-[7px] font-normal tracking-[0.14em] text-muted-foreground uppercase select-none sm:text-[7.5px]"
            >
              {panel.sub}
            </motion.p>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export function PolaroidStrip(): ReactNode {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  if (!mounted) {
    return <div aria-hidden="true" className="h-[clamp(8rem,15vw,12rem)] w-full" />;
  }

  return (
    <div
      onMouseLeave={() => setHoveredId(null)}
      className="flex w-full flex-wrap items-start justify-center gap-1.5 px-4 sm:gap-2.5 sm:px-8"
    >
      {PANELS.map((panel, i) => (
        <PanelCard
          key={panel.id}
          panel={panel}
          index={i}
          hoveredId={hoveredId}
          setHoveredId={setHoveredId}
        />
      ))}
    </div>
  );
}



