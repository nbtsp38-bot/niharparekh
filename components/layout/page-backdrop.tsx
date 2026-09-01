import type { ReactNode } from "react";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[52rem] overflow-hidden select-none"
    >
      {/* Layer 2: Subtle warm charcoal elevation around top content with edge vignette */}
      <div
        className="absolute inset-0 opacity-100"
        style={{
          background: `
            radial-gradient(ellipse 90% 65% at 50% 12%, rgba(24, 22, 19, 0.55) 0%, rgba(13, 12, 10, 0.2) 60%, transparent 100%),
            radial-gradient(ellipse 80% 50% at 50% -5%, rgba(178, 138, 104, 0.06) 0%, rgba(220, 210, 195, 0.035) 35%, rgba(88, 99, 72, 0.025) 65%, transparent 100%)
          `,
        }}
      />

      {/* Layer 3: Soft ambient side balance */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 45% 45% at 90% 20%, rgba(157, 173, 183, 0.025) 0%, transparent 70%),
            radial-gradient(ellipse 45% 45% at 10% 30%, rgba(169, 111, 87, 0.02) 0%, transparent 70%)
          `,
        }}
      />

      {/* Micro-grain film texture layer */}
      <div
        className="absolute inset-0 opacity-[0.025] dark:opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

