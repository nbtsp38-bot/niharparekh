import type { ReactNode } from "react";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] overflow-hidden select-none"
    >
      {/* Layer 1: Deep graphite base — ambient center lift, no hotspot */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 80% 60% at 50% -5%, rgba(30,30,30,0.55) 0%, rgba(9,9,9,0.18) 55%, transparent 85%)`,
        }}
      />

      {/* Layer 2: Silver/gray texture — faint cool reflection at top */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 65% 40% at 50% 5%, rgba(255,255,255,0.022) 0%, rgba(200,200,200,0.012) 50%, transparent 80%),
            radial-gradient(ellipse 40% 35% at 80% 22%, rgba(220,220,218,0.014) 0%, transparent 65%),
            radial-gradient(ellipse 40% 35% at 20% 28%, rgba(220,220,218,0.01) 0%, transparent 65%)
          `,
        }}
      />

      {/* Layer 3: Ultra-faint aged-gold material dust — maximum 0.04 opacity */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 30%, rgba(164,135,85,0.02) 0%, rgba(142,117,71,0.012) 50%, transparent 80%),
            radial-gradient(ellipse 35% 35% at 72% 40%, rgba(181,154,104,0.016) 0%, transparent 65%),
            radial-gradient(ellipse 30% 30% at 28% 45%, rgba(142,117,71,0.013) 0%, transparent 60%)
          `,
        }}
      />

      {/* Layer 4: Dark vignette at edges — reinforces depth */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 100% 100% at 0% 0%, rgba(6,6,6,0.45) 0%, transparent 55%),
            radial-gradient(ellipse 100% 100% at 100% 0%, rgba(6,6,6,0.35) 0%, transparent 50%),
            radial-gradient(ellipse 100% 60% at 50% 100%, rgba(6,6,6,0.5) 0%, transparent 70%)
          `,
        }}
      />

      {/* Layer 5: Micro-grain film texture — silver/neutral */}
      <div
        className="absolute inset-0 opacity-[0.022] dark:opacity-[0.032] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

