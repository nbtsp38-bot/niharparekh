"use client";

import { ArrowUpRight, Check, Instagram, Mail, Phone } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";
import Link from "next/link";
import { useRef, useState, type ReactNode } from "react";

import { FadeIn } from "@/components/ui/motion-primitives";

const EMAIL = "niharparekh14@gmail.com";
const INSTAGRAM = "https://www.instagram.com/nihharise";

const CONTACT_LINKS = [
  {
    id: "email",
    label: "EMAIL",
    value: "niharparekh14@gmail.com",
    href: `mailto:${EMAIL}`,
    icon: Mail,
    isCopy: true,
  },
  {
    id: "instagram",
    label: "INSTAGRAM",
    value: "@nihharise",
    href: INSTAGRAM,
    icon: Instagram,
    isExternal: true,
  },
  {
    id: "phone",
    label: "CONTACT",
    value: "+91 94288 10041",
    href: "tel:+919428810041",
    icon: Phone,
    isExternal: true,
  },
];

const EASE = [0.16, 1, 0.3, 1] as const;

export function ContactCard(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [copied, setCopied] = useState(false);

  // Normalized cursor coordinates for subtle atmospheric studio lighting
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);
  const springX = useSpring(mouseX, { stiffness: 180, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 180, damping: 28 });

  const spotX = useTransform(springX, [0, 1], ["20%", "80%"]);
  const spotY = useTransform(springY, [0, 1], ["20%", "80%"]);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>): void => {
    if (e.pointerType === "touch") return;
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width);
    mouseY.set((e.clientY - rect.top) / rect.height);
  };

  const handleCopyEmail = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${EMAIL}`;
    }
  };

  return (
    <section className="mx-auto my-16 w-full max-w-275 px-5 sm:my-28 sm:px-8">
      <FadeIn>
        <div
          ref={containerRef}
          onPointerMove={handlePointerMove}
          className="relative overflow-hidden rounded-[2.5rem] border border-border bg-surface-primary/70 p-7 backdrop-blur-md shadow-[0_20px_50px_-20px_rgba(0,0,0,0.06)] dark:border-border dark:bg-background-deep dark:shadow-[0_30px_70px_-25px_rgba(0,0,0,0.9)] sm:p-12 md:p-16 lg:p-20"
        >
          {/* Subtle Atmospheric Studio Light Follower */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-full opacity-30 transition-opacity duration-500 dark:opacity-20"
            style={{
              background: useTransform(
                [spotX, spotY],
                ([x, y]) =>
                  `radial-gradient(500px circle at ${x} ${y}, rgba(196,154,60,0.08) 0%, rgba(212,168,67,0.04) 45%, transparent 70%)`
              ),
            }}
          />

          {/* Micro-Grain Cinematic Paper / Film Texture */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 opacity-[0.03] dark:opacity-[0.045] mix-blend-overlay"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
            }}
          />

          <div className="relative z-10 flex flex-col gap-12 sm:gap-16 md:gap-20">
            {/* Top Frame Indicator */}
            <div className="flex items-center justify-between">
              <span className="font-mono text-[10px] sm:text-[11px] font-semibold uppercase tracking-[0.3em] text-accent">
                01 // END OF FRAME
              </span>
              <span className="font-mono text-[9.5px] sm:text-[10px] tracking-widest text-muted-foreground/60 uppercase">
                AVAILABLE FOR 2026 PROJECTS
              </span>
            </div>

            {/* Main Editorial Statement */}
            <div className="flex flex-col gap-6 sm:gap-8">
              <h2 className="font-serif text-[3.25rem] font-medium leading-[0.92] tracking-tight text-foreground sm:text-[4.75rem] md:text-[5.75rem] lg:text-[6.5rem]">
                LET&rsquo;S<br />
                <span className="font-normal italic text-foreground">CREATE.</span>
              </h2>

              <p className="max-w-[34ch] text-[17px] leading-[1.45] tracking-tight text-muted-foreground sm:text-[21px] md:text-[23px]">
                Have a project, idea, or visual story in mind? Let&rsquo;s turn it into something worth watching.
              </p>
            </div>

            {/* Primary Hero CTA */}
            <div>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="group relative inline-flex cursor-pointer items-center gap-4 py-2 text-left font-mono text-[14px] sm:text-[16px] font-semibold uppercase tracking-[0.22em] text-foreground transition-colors hover:text-accent"
              >
                <span>{copied ? "COPIED TO CLIPBOARD" : "LET'S WORK TOGETHER"}</span>
                <span className="flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-border bg-surface-secondary text-foreground transition-all duration-300 group-hover:border-accent/70 group-hover:bg-accent group-hover:text-background dark:border-border dark:bg-surface-elevated dark:group-hover:text-background-deep">
                  {copied ? (
                    <Check className="h-4 w-4" aria-hidden="true" />
                  ) : (
                    <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                  )}
                </span>

                {/* Animated Underline */}
                <span className="absolute bottom-0 left-0 h-[1.5px] w-0 bg-gradient-to-r from-accent via-accent-highlight to-accent-light transition-all duration-400 ease-out group-hover:w-full" />
              </button>
            </div>

            {/* Minimal Editorial Contact Rows */}
            <div className="flex flex-col border-t border-border dark:border-border">
              {CONTACT_LINKS.map((link) => {
                const Icon = link.icon;
                return (
                  <motion.div
                    key={link.id}
                    whileHover={{ x: 6 }}
                    transition={{ duration: 0.3, ease: EASE }}
                    className="group flex border-b border-border dark:border-border"
                  >
                    {link.isCopy ? (
                      <button
                        type="button"
                        onClick={handleCopyEmail}
                        className="flex w-full cursor-pointer items-center justify-between py-4 sm:py-5 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface-secondary text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent dark:border-border dark:bg-surface-elevated">
                            {copied ? <Check className="h-3.5 w-3.5" /> : <Icon className="h-3.5 w-3.5" />}
                          </span>
                          <span className="font-mono text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-accent">
                            {link.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground transition-colors group-hover:text-foreground">
                          <span className="font-mono text-[12px] sm:text-[13px] tracking-tight">
                            {copied ? "niharparekh14@gmail.com · Copied!" : link.value}
                          </span>
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                        </div>
                      </button>
                    ) : (
                      <Link
                        href={link.href}
                        target={link.isExternal ? "_blank" : undefined}
                        rel={link.isExternal ? "noopener noreferrer" : undefined}
                        className="flex w-full cursor-pointer items-center justify-between py-4 sm:py-5 text-left transition-colors"
                      >
                        <div className="flex items-center gap-3 sm:gap-4">
                          <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-border bg-surface-secondary text-muted-foreground transition-colors group-hover:border-accent/40 group-hover:text-accent dark:border-border dark:bg-surface-elevated">
                            <Icon className="h-3.5 w-3.5" />
                          </span>
                          <span className="font-mono text-[12px] sm:text-[13px] font-semibold uppercase tracking-[0.16em] text-foreground transition-colors group-hover:text-accent">
                            {link.label}
                          </span>
                        </div>

                        <div className="flex items-center gap-2 sm:gap-3 text-muted-foreground transition-colors group-hover:text-foreground">
                          <span className="font-mono text-[12px] sm:text-[13px] tracking-tight">
                            {link.value}
                          </span>
                          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
                        </div>
                      </Link>
                    )}
                  </motion.div>
                );
              })}
            </div>

            {/* Bottom Signature & Cinematic Closing Title */}
            <div className="flex flex-col items-center justify-between gap-6 pt-4 sm:flex-row sm:pt-6">
              <div className="flex flex-col items-center text-center sm:items-start sm:text-left">
                <span className="font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-foreground">
                  NIHAR PAREKH
                </span>
                <span className="font-mono text-[9.5px] tracking-widest text-muted-foreground/60 uppercase">
                  VIDEO EDITOR · MOTION DESIGNER
                </span>
              </div>

              {/* Final Movie-Like Closing Statement */}
              <div className="text-center font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.38em] text-muted-foreground/50 uppercase select-none">
                THANKS FOR WATCHING.
              </div>

              <div className="text-center font-mono text-[9.5px] sm:text-[10px] tracking-wider text-muted-foreground/45 sm:text-right">
                © 2026 NIHAR PAREKH
              </div>
            </div>
          </div>
        </div>
      </FadeIn>
    </section>
  );
}

