import type { ReactNode } from "react";

export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-[56rem] overflow-hidden select-none"
    >
      {/* Layer 1: Deep black-velvet base with warm center lift */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse 85% 65% at 50% -8%, rgba(35,26,8,0.65) 0%, rgba(8,7,5,0.2) 55%, transparent 85%)`,
        }}
      />

      {/* Layer 2: Rich gold ambient glow from center-top */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 70% 50% at 50% 8%, rgba(196,154,60,0.10) 0%, rgba(212,168,67,0.055) 40%, transparent 75%),
            radial-gradient(ellipse 45% 40% at 50% 20%, rgba(224,184,102,0.06) 0%, transparent 65%)
          `,
        }}
      />

      {/* Layer 3: Gold edge side-reflections */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 40% 55% at 0% 35%, rgba(184,134,11,0.07) 0%, transparent 60%),
            radial-gradient(ellipse 40% 55% at 100% 35%, rgba(196,154,60,0.05) 0%, transparent 60%),
            radial-gradient(ellipse 60% 30% at 50% 55%, rgba(196,154,60,0.04) 0%, transparent 65%)
          `,
        }}
      />

      {/* Layer 4: Dark vignette to keep edges deep black */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse 110% 110% at 0% 0%, rgba(3,2,1,0.55) 0%, transparent 50%),
            radial-gradient(ellipse 110% 110% at 100% 0%, rgba(3,2,1,0.45) 0%, transparent 50%),
            radial-gradient(ellipse 110% 70% at 50% 100%, rgba(3,2,1,0.60) 0%, transparent 65%)
          `,
        }}
      />

      {/* Layer 5: Micro-grain film texture */}
      <div
        className="absolute inset-0 opacity-[0.028] dark:opacity-[0.042] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}

