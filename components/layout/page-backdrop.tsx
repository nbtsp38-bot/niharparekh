import type { ReactNode } from "react";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-160 sm:h-200 overflow-hidden select-none"
    >
      {/* Ultra-subtle bounced ambient light — strictly capped under 0.035 opacity */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 65% 55% at 50% -10%, rgba(178, 138, 104, 0.035) 0%, rgba(88, 99, 72, 0.02) 45%, rgba(169, 111, 87, 0.012) 70%, transparent 100%),
            radial-gradient(ellipse 40% 40% at 85% 15%, rgba(157, 173, 183, 0.015) 0%, transparent 70%)
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

