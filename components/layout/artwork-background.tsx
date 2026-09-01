"use client";

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { ShaderFlow, BURGUNDY_PRESET } from "@/components/shaders/shader-flow";

/**
 * ArtworkBackground
 *
 * Two-layer decorative WebGL background artwork:
 *   Layer 1 — Antique gold flow  (z -20, opacity 0.42)
 *   Layer 2 — Deep burgundy flow (z -19, opacity 0.30, screen blend)
 *
 * Sits behind PageBackdrop (z -10) and all content.
 * Respects prefers-reduced-motion: both layers are removed.
 */
export function ArtworkBackground(): ReactNode {
  const [reduced, setReduced] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  if (!mounted || reduced) return null;

  return (
    <>
      {/* Layer 1: Antique Gold */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: -20, opacity: 0.42 }}
      >
        <ShaderFlow
          className="absolute inset-0 h-full w-full"
          flowSpeed={[0.04, 0.06]}
          iterations={16}
          scale={5.5}
          brightness={0.85}
          colorLowA={[0.533, 0.439, 0.267]}
          colorHighA={[0.757, 0.647, 0.427]}
          fadeRx={1.6}
          fadeRy={0.7}
          fadeCx={0.5}
          fadeCy={0.08}
        />
      </div>

      {/* Layer 2: Deep Burgundy */}
      <div
        aria-hidden="true"
        className="pointer-events-none fixed inset-0 overflow-hidden"
        style={{ zIndex: -19, opacity: 0.30, mixBlendMode: "screen" }}
      >
        <ShaderFlow
          className="absolute inset-0 h-full w-full"
          flowSpeed={BURGUNDY_PRESET.flowSpeed}
          iterations={BURGUNDY_PRESET.iterations}
          scale={BURGUNDY_PRESET.scale}
          brightness={BURGUNDY_PRESET.brightness}
          colorLowA={BURGUNDY_PRESET.colorLowA}
          colorHighA={BURGUNDY_PRESET.colorHighA}
          fadeRx={1.3}
          fadeRy={0.55}
          fadeCx={0.5}
          fadeCy={0.15}
        />
      </div>
    </>
  );
}
