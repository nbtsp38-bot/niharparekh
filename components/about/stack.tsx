"use client";

import { RotateCcw } from "lucide-react";
import { useEffect, useRef, useState, type ReactNode } from "react";

type SoftwareTool = {
  id: string;
  name: string;
  renderIcon: () => ReactNode;
};

const TOOLS: SoftwareTool[] = [
  {
    id: "photoshop",
    name: "Adobe Photoshop",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#001E36" />
        <path d="M7 6.5h3.8c1.6 0 2.7.9 2.7 2.3 0 1.5-1.1 2.4-2.7 2.4H8.7V17H7V6.5zm1.7 3.3h1.8c.8 0 1.3-.4 1.3-1 0-.7-.5-1-1.3-1H8.7v2zm5.7 4.7c.6.5 1.4.8 2.3.8 1 0 1.6-.4 1.6-1.1 0-.7-.6-1-1.8-1.3-1.6-.4-2.5-1-2.5-2.2 0-1.4 1.2-2.3 2.8-2.3 1 0 1.8.3 2.4.7l-.5 1.2c-.5-.4-1.2-.6-1.9-.6-.9 0-1.4.4-1.4 1 0 .6.5.9 1.7 1.2 1.7.4 2.6 1.1 2.6 2.3 0 1.4-1.1 2.4-3 2.4-1.1 0-2.1-.4-2.8-.9l.5-1.2z" fill="#31A8FF"/>
      </svg>
    ),
  },
  {
    id: "premiere",
    name: "Adobe Premiere Pro",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#00005B" />
        <path d="M6.5 6.5h4c1.8 0 3 1 3 2.6 0 1.6-1.2 2.6-3 2.6H8.3V17H6.5V6.5zm1.8 3.7h2c.8 0 1.3-.4 1.3-1.1 0-.7-.5-1.1-1.3-1.1h-2v2.2zm7.2 2.6c0-1.1.7-1.8 1.8-1.8.4 0 .7.1 1 .2l-.3 1.3c-.2-.1-.4-.1-.6-.1-.5 0-.8.3-.8.9V17h-1.1v-4.2z" fill="#9999FF"/>
      </svg>
    ),
  },
  {
    id: "audition",
    name: "Adobe Audition",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#001E36" />
        <path d="M9.8 6.5h1.7l3.8 10.5h-1.8l-.9-2.7H8.9l-.9 2.7H6.2L9.8 6.5zm2.3 6.5l-1.4-4.2-1.4 4.2h2.8zm4.4-2.2v4.4c0 1.2.7 1.9 1.8 1.9.5 0 1-.2 1.3-.5v.4h1.1V10.8h-1.1v3.9c-.2.3-.5.5-.9.5-.5 0-.8-.3-.8-.9v-3.5h-1.4z" fill="#00E5FF"/>
      </svg>
    ),
  },
  {
    id: "aftereffects",
    name: "Adobe After Effects",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#00005B" />
        <path d="M9.5 6.5h1.6L15 17h-1.8l-.9-2.7H8.6L7.7 17H6L9.5 6.5zm2.2 6.5l-1.4-4.2-1.4 4.2h2.8zm4.1 1.1c.1 1.2.9 1.9 2.1 1.9.8 0 1.4-.3 1.8-.7l.7 1c-.6.6-1.5 1-2.6 1-2.1 0-3.3-1.4-3.3-3.4 0-2 1.3-3.4 3.1-3.4 2 0 3 1.4 3 3.1v.5h-4.8zm3.6-1.1c-.1-.8-.6-1.4-1.6-1.4-1 0-1.6.6-1.8 1.4h3.4z" fill="#9999FF"/>
      </svg>
    ),
  },
  {
    id: "claude",
    name: "Claude",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L13.8 8.8L20.6 7L15.6 12L20.6 17L13.8 15.2L12 22L10.2 15.2L3.4 17L8.4 12L3.4 7L10.2 8.8L12 2Z" fill="#D97757"/>
        <circle cx="12" cy="12" r="3.2" fill="#FAF9F5"/>
      </svg>
    ),
  },
  {
    id: "chatgpt",
    name: "ChatGPT",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M20.5 10.2c-.3-1.8-1.5-3.3-3.2-3.9-.4-.8-1-1.5-1.8-2-1.7-1.1-4-1-5.6.2-.7-.4-1.6-.6-2.5-.5-1.8.2-3.3 1.4-4 3.1-1.1.5-2 1.4-2.5 2.5-.9 1.7-.8 3.9.3 5.4.3 1.8 1.5 3.3 3.2 3.9.4.8 1 1.5 1.8 2 1.7 1.1 4 1 5.6-.2.7.4 1.6.6 2.5.5 1.8-.2 3.3-1.4 4-3.1 1.1-.5 2-1.4 2.5-2.5.9-1.7.8-3.9-.3-5.4zm-7.6 9.8c-.8 0-1.6-.2-2.3-.7l.2-.4 2.6-1.5c.2-.1.3-.3.3-.5v-3.7l1.1.6 2.1 1.2c0 .1.1.1.1.2 0 2.7-1.8 4.8-4.1 4.8zm-6.6-3.8c-.5-.9-.7-1.9-.5-2.9l.4.2 2.6 1.5c.2.1.4.1.6 0l3.2-1.9v1.3l-2.1 1.2-2.1 1.2c-.1 0-.1 0-.2-.1-.9-.8-1.6-1.9-1.9-3.4zM4.7 9.8c.3-.8.8-1.6 1.5-2.2v.5l-.1 3c0 .2.1.4.3.5l3.2 1.8-1.1.7-2.1 1.2-2.1-1.2c-.1-.1-.1-.1-.1-.2-.4-1.3-.2-2.9.4-4.3zm12.3 1.6l-3.2-1.9v-1.3l2.1-1.2 2.1-1.2c.1 0 .1 0 .2.1.9.9 1.5 2.1 1.7 3.4.3.9.2 1.9-.3 2.8l-.4-.2-2.2-1.3c-.2-.1-.4-.1-.6 0v1.9zm2.3-4.1v-.5l.1-3c0-.2-.1-.4-.3-.5l-3.2-1.8 1.1-.7 2.1-1.2 2.1 1.2c.1.1.1.1.1.2.4 1.3.2 2.9-.4 4.3-.3.8-.8 1.6-1.5 2.2zm-7.9-1.4l-2.1-1.2c0-.1-.1-.1-.1-.2 0-2.7 1.8-4.8 4.1-4.8.8 0 1.6.2 2.3.7l-.2.4-2.6 1.5c-.2.1-.3.3-.3.5v3.7l-1.1-.6z" fill="#10A37F"/>
      </svg>
    ),
  },
  {
    id: "gemini",
    name: "Gemini",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="geminiStackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4E88D4" />
            <stop offset="50%" stopColor="#9B72CB" />
            <stop offset="100%" stopColor="#E37A8C" />
          </linearGradient>
        </defs>
        <path d="M12 2C12 7.52 7.52 12 2 12C7.52 12 12 16.48 12 22C12 16.48 16.48 12 22 12C16.48 12 12 7.52 12 2Z" fill="url(#geminiStackGrad)" />
      </svg>
    ),
  },
  {
    id: "3dsmax",
    name: "Autodesk 3ds Max",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#04566F" />
        <path d="M6 7.5L12 5l6 2.5v9L12 19l-6-2.5v-9zm6 1.5L8.5 10.5l3.5 1.5 3.5-1.5L12 9zm-4.5 3.2v3.1l3.5 1.5v-3.1L7.5 12.2zm9 0l-3.5 1.5v3.1l3.5-1.5v-3.1z" fill="#00C4B4" />
      </svg>
    ),
  },
  {
    id: "maya",
    name: "Autodesk Maya",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <rect width="24" height="24" rx="5" fill="#04566F" />
        <path d="M6.5 17V7l3.5 5 2-3 2 3 3.5-5v10h-2v-5.5l-2 3-1.5-2.2-1.5 2.2-2-3V17h-2z" fill="#00C4B4" />
      </svg>
    ),
  },
  {
    id: "canva",
    name: "Canva",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="canvaStackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#00C4CC" />
            <stop offset="100%" stopColor="#7D2AE8" />
          </linearGradient>
        </defs>
        <circle cx="12" cy="12" r="10" fill="url(#canvaStackGrad)" />
        <path d="M14.8 8.8c-.7-.5-1.6-.7-2.6-.7-2.8 0-4.8 2-4.8 4.7 0 2.4 1.7 4.1 4.1 4.1 1.4 0 2.5-.6 3.1-1.5l-1.3-.9c-.4.6-1.1.9-1.8.9-1.4 0-2.4-1-2.4-2.5 0-1.7 1.2-2.9 2.8-2.9.7 0 1.2.2 1.6.5l1.3-.7z" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    id: "davinci",
    name: "DaVinci Resolve",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="10" fill="#1C1C1E" />
        <path d="M12 5.5c1.2 0 2.3.8 2.6 1.9l.8 3.2-3.4-.9V5.5zm4.8 8.8l-2.4-2.3 2.8-2.1c1 .7 1.4 1.9 1 3-.3.9-1 1.4-1.4 1.4zm-7.6 1.2l2.4-2.4.6 3.4c-.9.8-2.2.8-3 .1-.8-.5-1.1-1.5-.8-2.5l.8 1.4z" fill="#FF3B30" />
        <path d="M12 5.5v4.2l-3.4.9.8-3.2c.3-1.1 1.4-1.9 2.6-1.9zm-4.8 8.8c-.4 0-1.1-.5-1.4-1.4-.4-1.1 0-2.3 1-3l2.8 2.1-2.4 2.3zm7.6 1.2l.8-1.4c.3 1 0 2-.8 2.5-.8.7-2.1.7-3-.1l.6-3.4 2.4 2.4z" fill="#007AFF" />
        <circle cx="12" cy="12.2" r="2.2" fill="#FFCC00" />
      </svg>
    ),
  },
  {
    id: "antigravity",
    name: "Antigravity",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <defs>
          <linearGradient id="agyStackGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EEC878" />
            <stop offset="100%" stopColor="#C49A3C" />
          </linearGradient>
        </defs>
        <rect width="24" height="24" rx="5" fill="#0F0C06" />
        <path d="M12 4L18 12L12 20L6 12L12 4Z" stroke="url(#agyStackGrad)" strokeWidth="1.75" fill="none" />
        <circle cx="12" cy="12" r="2.5" fill="url(#agyStackGrad)" />
      </svg>
    ),
  },
  {
    id: "vscode",
    name: "Visual Studio Code",
    renderIcon: () => (
      <svg className="h-5 w-5 shrink-0" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M17.8 2.2L11.5 8l-4.2-3.2-2.1 1 3.5 3.2L5.2 12l3.5 3-3.5 3.2 2.1 1 4.2-3.2 6.3 5.8 4.2-2V4.2l-4.2-2zm0 4.8v10l-4.8-5 4.8-5z" fill="#007ACC" />
      </svg>
    ),
  },
];

const CHIP_RADIUS = 16;
const WALL_PAD = 14;

type ChipState = {
  tool: SoftwareTool;
  body: Matter.Body;
  width: number;
  height: number;
};

export function Stack(): ReactNode {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const measureRef = useRef<HTMLDivElement | null>(null);
  const chipRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    const measure = measureRef.current;
    if (!container || !measure) return;

    let cancelled = false;
    let cleanup: (() => void) | undefined;

    void (async () => {
      const Matter = await import("matter-js");
      if (cancelled) return;

      const {
        Engine,
        Runner,
        World,
        Bodies,
        Body,
        Mouse,
        MouseConstraint,
        Events,
      } = Matter;

      const measureChildren = Array.from(measure.children) as HTMLElement[];
      const dims = measureChildren.map((el) => {
        const r = el.getBoundingClientRect();
        return { w: Math.max(90, Math.ceil(r.width)), h: Math.max(34, Math.ceil(r.height)) };
      });

      let width = container.clientWidth;
      let height = container.clientHeight;

      const engine = Engine.create();
      engine.gravity.y = 0.95;
      const world = engine.world;

      const wallThickness = 400;
      const floor = Bodies.rectangle(
        width / 2,
        height - WALL_PAD + wallThickness / 2,
        width * 3,
        wallThickness,
        { isStatic: true }
      );
      const leftWall = Bodies.rectangle(
        WALL_PAD - wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true }
      );
      const rightWall = Bodies.rectangle(
        width - WALL_PAD + wallThickness / 2,
        height / 2,
        wallThickness,
        height * 4,
        { isStatic: true }
      );
      World.add(world, [floor, leftWall, rightWall]);

      const states: ChipState[] = TOOLS.map((tool, i) => {
        const dim = dims[i] ?? { w: 140, h: 42 };
        const { w, h } = dim;
        const halfW = w / 2;
        const minX = WALL_PAD + halfW + 4;
        const maxX = width - WALL_PAD - halfW - 4;
        const x = minX + Math.random() * Math.max(1, maxX - minX);
        const y = -70 - i * 50 - Math.random() * 80;
        const body = Bodies.rectangle(x, y, w, h, {
          chamfer: { radius: CHIP_RADIUS },
          restitution: 0.36,
          friction: 0.45,
          frictionAir: 0.02,
          density: 0.0016,
          angle: (Math.random() - 0.5) * 0.35,
        });
        World.add(world, body);
        return { tool, body, width: w, height: h };
      });

      const mouse = Mouse.create(container);

      const wheelTarget = mouse.element as HTMLElement & {
        mousewheel?: EventListener;
      };
      if (wheelTarget.mousewheel) {
        wheelTarget.removeEventListener("wheel", wheelTarget.mousewheel);
        wheelTarget.removeEventListener(
          "DOMMouseScroll",
          wheelTarget.mousewheel
        );
      }

      const mouseConstraint = MouseConstraint.create(engine, {
        mouse,
        constraint: {
          stiffness: 0.22,
          damping: 0.2,
          render: { visible: false },
        },
      });
      World.add(world, mouseConstraint);

      Events.on(mouseConstraint, "startdrag", () => {
        container.style.cursor = "grabbing";
      });
      Events.on(mouseConstraint, "enddrag", () => {
        container.style.cursor = "grab";
      });

      const runner = Runner.create();
      Runner.run(runner, engine);

      let raf = 0;
      const tick = (): void => {
        for (let i = 0; i < states.length; i++) {
          const s = states[i];
          const el = chipRefs.current[i];
          if (!s || !el) continue;
          const { x, y } = s.body.position;
          el.style.transform = `translate3d(${x - s.width / 2}px, ${y - s.height / 2}px, 0) rotate(${s.body.angle}rad)`;
        }
        raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);

      const onResize = (): void => {
        const newW = container.clientWidth;
        const newH = container.clientHeight;
        if (newW === width && newH === height) return;
        Body.setPosition(floor, {
          x: newW / 2,
          y: newH - WALL_PAD + wallThickness / 2,
        });
        Body.setPosition(leftWall, {
          x: WALL_PAD - wallThickness / 2,
          y: newH / 2,
        });
        Body.setPosition(rightWall, {
          x: newW - WALL_PAD + wallThickness / 2,
          y: newH / 2,
        });
        width = newW;
        height = newH;
      };
      const ro = new ResizeObserver(onResize);
      ro.observe(container);

      cleanup = () => {
        cancelAnimationFrame(raf);
        ro.disconnect();
        Runner.stop(runner);
        World.clear(world, false);
        Engine.clear(engine);
      };
    })();

    return () => {
      cancelled = true;
      cleanup?.();
    };
  }, [resetKey]);

  return (
    <div className="flex flex-col gap-3">
      {/* Header */}
      <div className="flex items-center justify-between px-1">
        <h3 className="flex items-center gap-2 font-mono text-[11.5px] font-semibold uppercase tracking-[0.25em] text-accent">
          <span>//</span> Stack
        </h3>
        <span className="font-mono text-[10px] tracking-wider text-muted-foreground/60">
          SOFTWARE & TOOLS
        </span>
      </div>

      {/* Physics Container */}
      <div className="relative h-64 overflow-hidden rounded-3xl border border-border bg-surface-primary/60 backdrop-blur-sm shadow-[0_10px_30px_-15px_rgba(0,0,0,0.04)] dark:border-border dark:bg-surface-primary/80 dark:shadow-[0_16px_36px_-18px_rgba(0,0,0,0.85)] sm:h-80">
        {/* Subtle Surface Texture Detail */}
        <div 
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-[0.02] dark:opacity-[0.035] mix-blend-overlay"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
          }}
        />

        {/* Reset Button with Tooltip */}
        <button
          type="button"
          onClick={() => setResetKey((k) => k + 1)}
          aria-label="Reset stack"
          title="RESET STACK"
          className="focus-ring group absolute right-3 top-3 z-20 inline-flex items-center gap-1.5 rounded-xl border border-border bg-surface-primary/90 px-2.5 py-1 font-mono text-[9.5px] font-medium tracking-wider text-muted-foreground transition-all duration-300 hover:border-accent/40 hover:text-foreground hover:shadow-xs dark:border-border dark:bg-surface-elevated/90"
        >
          <span className="hidden sm:inline">RESET</span>
          <RotateCcw
            className="h-3.5 w-3.5 transition-transform duration-500 group-hover:-rotate-180 text-accent"
            strokeWidth={2}
            aria-hidden="true"
          />
        </button>

        {/* Invisible Measurer */}
        <div
          ref={measureRef}
          aria-hidden="true"
          className="pointer-events-none invisible absolute left-0 top-0 flex flex-wrap gap-2"
        >
          {TOOLS.map((tool) => (
            <ChipPill key={`m-${tool.id}`} tool={tool} />
          ))}
        </div>

        {/* Interactive Physics Canvas Container */}
        <div
          ref={containerRef}
          className="absolute inset-0 cursor-grab select-none active:cursor-grabbing"
          style={{ touchAction: "none" }}
        >
          {TOOLS.map((tool, i) => (
            <div
              key={`${resetKey}-${tool.id}`}
              ref={(el) => {
                chipRefs.current[i] = el;
              }}
              data-stack-chip
              className="pointer-events-none absolute left-0 top-0 will-change-transform"
              style={{ transform: "translate3d(-9999px, -9999px, 0)" }}
            >
              <ChipPill tool={tool} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function ChipPill({ tool }: { tool: SoftwareTool }): ReactNode {
  return (
    <div
      className="group inline-flex items-center gap-2.5 rounded-2xl border border-border bg-surface-primary px-3 py-1.5 text-[13px] font-medium tracking-tight text-foreground shadow-[0_4px_14px_-3px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,0.8)] transition-all duration-300 hover:border-accent/45 hover:shadow-[0_8px_20px_-4px_rgba(0,0,0,0.12),inset_0_1px_0_rgba(255,255,255,0.12)] dark:border-border dark:bg-surface-elevated dark:text-foreground dark:shadow-[0_4px_16px_-4px_rgba(0,0,0,0.7),inset_0_1px_0_rgba(255,255,255,0.05)] dark:hover:border-accent/45 sm:text-[13.5px]"
    >
      <div className="flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
        {tool.renderIcon()}
      </div>
      <span className="font-sans font-medium">{tool.name}</span>
    </div>
  );
}

