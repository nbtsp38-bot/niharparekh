import { Education } from "@/components/about/education";
import { Experience } from "@/components/about/experience";
import { PolaroidStrip } from "@/components/about/polaroid-strip";
import { Skills } from "@/components/about/skills";
import { Stack } from "@/components/about/stack";
import { ContactCard } from "@/components/contact/contact-card";
import { FadeIn } from "@/components/ui/motion-primitives";
import { createMetadata } from "@/lib/metadata";
import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = createMetadata({
  title: "About",
  description: "About me, background, and how to get in touch.",
  path: "/about",
});

export default function AboutPage(): ReactNode {
  return (
    <main id="main-content" className="flex flex-1 flex-col">
      <section className="mx-auto w-full max-w-312 pt-40 sm:pt-56">
        <PolaroidStrip />
      </section>

      <section className="mx-auto w-full max-w-160 px-6 pt-20 pb-16 sm:px-10 sm:pt-28 sm:pb-24">
        <FadeIn delay={0.5}>
          <div className="rounded-4xl border border-border bg-surface-primary/70 p-8 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)] dark:border-border dark:bg-surface-primary/80 dark:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.85)] sm:p-12">
            <h1 className="font-serif text-[1.75rem] font-medium tracking-tight text-foreground sm:text-[2rem]">
              Hello! I&rsquo;m <span className="border-b border-accent/60 pb-0.5 text-foreground">Nihar</span>.
            </h1>
            <div className="mt-8 space-y-6 text-[17px] leading-[1.7] tracking-tight text-muted-foreground sm:text-[18px]">
              <p>
                I&rsquo;m a self-taught <strong className="font-semibold text-foreground">video editor and motion designer</strong> with 4+ years of experience turning complex ideas into polished visual stories.
              </p>
              <p>
                Editing started as a pure passion for me, and it&rsquo;s a craft I never tire of. I enjoy every layer of the post-production pipeline — from cinematic pacing and high-retention short-form content to kinetic typography, VFX compositing, and visual storytelling.
              </p>
              <p>
                My core philosophy is simple: <strong className="font-semibold text-foreground">experience the edit from the viewer&rsquo;s side</strong>. I don&rsquo;t just stitch clips together; I design each frame to answer the critical questions: What will make the viewer stop? What will keep them engaged? What should the next cut feel like? That viewer-first perspective is what I bring to every project.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>

      <section className="mx-auto w-full max-w-[40rem] px-6 pb-20 sm:px-10 sm:pb-28">
        <FadeIn delay={0.1}>
          <div className="flex flex-col gap-10">
            <Experience />
            <Education />
            <Skills />
            <Stack />
          </div>
        </FadeIn>
      </section>

      <ContactCard />
      <div className="h-12 sm:h-16" />
    </main>
  );
}
