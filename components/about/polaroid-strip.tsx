"use client";

import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import { useRef, useState, useSyncExternalStore, type ReactNode } from "react";

import { DottedPattern } from "@/components/ui/dotted-pattern";

type Panel = {
  id: string;
  label: string;
  sub: string;
  rotate: number;
};

const PANELS: Panel[] = [
  { id: "edit", label: "EDIT", sub: "Pacing • Cuts • Rhythm", rotate: -8 },
  { id: "motion", label: "MOTION", sub: "Animation • Transitions", rotate: 6 },
  { id: "vfx", label: "VFX", sub: "Compositing • Effects", rotate: -4 },
  { id: "color", label: "COLOR", sub: "Grade • Mood • Tone", rotate: 7 },
  { id: "type", label: "TYPE", sub: "Typography • Kinetic Type", rotate: -6 },
  { id: "sound", label: "SOUND", sub: "SFX • Music • Sync", rotate: 5 },
];

const EASE = [0.22, 1, 0.36, 1] as const;

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

  // Pointer position for 3D tilt & parallax
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const spX = useSpring(px, { stiffness: 260, damping: 20, mass: 0.5 });
  const spY = useSpring(py, { stiffness: 260, damping: 20, mass: 0.5 });

  // 3D tilt
  const rotateX = useTransform(spY, [-0.5, 0.5], [7, -7]);
  const rotateY = useTransform(spX, [-0.5, 0.5], [-7, 7]);

  // Internal dotted pattern parallax
  const patternX = useTransform(spX, [-0.5, 0.5], [-6, 6]);
  const patternY = useTransform(spY, [-0.5, 0.5], [-6, 6]);

  // Spotlight coordinates (px)
  const spotX = useMotionValue(70);
  const spotY = useMotionValue(90);

  // Specular radial gradient
  const spotlightBg = useTransform(
    [spotX, spotY],
    ([x, y]) =>
      `radial-gradient(130px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12), transparent 70%)`
  );

  // Push distance for other cards when one is hovered
  const hoveredIndex = PANELS.findIndex((p) => p.id === hoveredId);
  const pushOffset = isOtherHovered
    ? (index < hoveredIndex ? -5 : 5)
    : 0;

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
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

  const handlePointerEnter = (): void => {
    setHoveredId(panel.id);
  };

  const handlePointerLeave = (): void => {
    px.set(0);
    py.set(0);
    setHoveredId(null);
  };

  // Idle float animation timing varied per card
  const floatDuration = 4.2 + (index % 3) * 0.8;
  const floatDelay = index * 0.25;

  return (
    <motion.div
      ref={cardRef}
      onPointerMove={handlePointerMove}
      onPointerEnter={handlePointerEnter}
      onPointerLeave={handlePointerLeave}
      onClick={() => setHoveredId(isHovered ? null : panel.id)}
      initial={{ opacity: 0, y: -100, filter: "blur(14px)", rotate: panel.rotate }}
      animate={{
        opacity: isOtherHovered ? 0.68 : 1,
        y: isHovered ? -8 : [0, -3, 0],
        x: pushOffset,
        scale: isHovered ? 1.08 : isOtherHovered ? 0.97 : 1,
        filter: "blur(0px)",
        rotate: isHovered
          ? panel.rotate * 0.3
          : [panel.rotate - 0.35, panel.rotate + 0.35, panel.rotate - 0.35],
      }}
      transition={{
        y: isHovered
          ? { duration: 0.25, ease: EASE }
          : { duration: floatDuration, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        rotate: isHovered
          ? { duration: 0.25, ease: EASE }
          : { duration: floatDuration * 1.1, repeat: Infinity, ease: "easeInOut", delay: floatDelay },
        scale: { duration: 0.25, ease: EASE },
        x: { duration: 0.25, ease: EASE },
        opacity: { duration: 0.25, ease: EASE },
        filter: { duration: 0.6, ease: EASE },
      }}
      style={{
        zIndex: isHovered ? 30 : 10 + index,
        transformPerspective: 800,
      }}
      className="group relative aspect-[3/4] w-[clamp(6.2rem,11.5vw,9.2rem)] shrink-0 cursor-pointer select-none"
    >
      <motion.div
        style={{
          rotateX: isHovered ? rotateX : 0,
          rotateY: isHovered ? rotateY : 0,
        }}
        className={`relative flex h-full w-full flex-col overflow-hidden rounded-2xl border-4 sm:border-5 p-1.5 transition-all duration-300 ${
          isHovered
            ? "border-neutral-400/80 bg-neutral-100 shadow-2xl ring-1 ring-foreground/10 dark:border-white/30 dark:bg-neutral-900/95"
            : "border-neutral-300/40 bg-white/90 shadow-md ring-1 ring-foreground/5 dark:border-white/10 dark:bg-neutral-950/80"
        }`}
      >
        {/* Subtle Specular / Cursor Light Overlay on Hover */}
        <motion.div
          animate={{ opacity: isHovered ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="pointer-events-none absolute inset-0 z-20 rounded-xl"
          style={{ background: spotlightBg }}
        />

        {/* Inner Card Frame */}
        <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-xl border border-foreground/5 bg-foreground/[0.02] dark:border-white/[0.04] dark:bg-white/[0.02]">
          {/* Subtle Top Specular Bevel Edge */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-foreground/15 to-transparent dark:via-white/20" />

          {/* Dotted Pattern with Subtle Cursor Parallax */}
          <motion.div
            style={{
              x: isHovered ? patternX : 0,
              y: isHovered ? patternY : 0,
            }}
            className="pointer-events-none absolute inset-[-12px] h-[calc(100%+24px)] w-[calc(100%+24px)]"
          >
            <DottedPattern className="h-full w-full opacity-55 transition-opacity duration-300 group-hover:opacity-75 dark:opacity-35 dark:group-hover:opacity-55" />
          </motion.div>

          {/* Centered Typography Container */}
          <div className="relative z-10 flex flex-col items-center justify-center px-1.5 text-center">
            <span className="font-mono text-[11.5px] font-semibold tracking-[0.28em] text-foreground/55 transition-colors duration-250 group-hover:text-foreground sm:text-[12.5px]">
              {panel.label}
            </span>

            {/* Secondary Descriptive Line (Reveals smoothly on hover) */}
            <motion.p
              initial={false}
              animate={{
                opacity: isHovered ? 0.9 : 0,
                y: isHovered ? 0 : 5,
                height: isHovered ? "auto" : 0,
                marginTop: isHovered ? 5 : 0,
              }}
              transition={{ duration: 0.22, ease: EASE }}
              className="overflow-hidden font-mono text-[8px] font-normal tracking-[0.12em] text-foreground/60 uppercase dark:text-foreground/55 sm:text-[8.5px]"
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
      className="flex w-full flex-wrap items-start justify-center gap-1.5 px-4 sm:gap-2 sm:px-8"
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


