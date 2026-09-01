import type { ReactNode } from "react";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem] overflow-hidden select-none"
    >
      {/* Cool Silver / Neutral Gray Ambient Reflection Layer */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 85% 55% at 50% 0%, rgba(255, 255, 255, 0.025) 0%, rgba(200, 200, 200, 0.015) 45%, transparent 85%),
            radial-gradient(ellipse 50% 45% at 50% 18%, rgba(227, 227, 225, 0.02) 0%, transparent 70%)
          `,
        }}
      />

      {/* Micro-grain film texture layer */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.035] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

