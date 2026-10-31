import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import camila from "@/assets/camila.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Altar de Camila 🌼 | Día de Muertos" },
      { name: "description", content: "Un altar digital lleno de cempasúchil para recordar a Camila, nuestra perrita." },
      { property: "og:title", content: "Altar de Camila 🌼" },
      { property: "og:description", content: "Un altar digital de Día de Muertos para Camila." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Lobster&family=Nunito:wght@400;700&display=swap" },
    ],
  }),
  component: Index,
});

function bark() {
  try {
    const Ctx = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new Ctx();
    const woof = (t: number) => {
      const o = ctx.createOscillator();
      const g = ctx.createGain();
      const f = ctx.createBiquadFilter();
      f.type = "lowpass"; f.frequency.value = 1200;
      o.type = "sawtooth";
      o.frequency.setValueAtTime(520, t);
      o.frequency.exponentialRampToValueAtTime(180, t + 0.15);
      g.gain.setValueAtTime(0.0001, t);
      g.gain.exponentialRampToValueAtTime(0.5, t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, t + 0.18);
      o.connect(f).connect(g).connect(ctx.destination);
      o.start(t); o.stop(t + 0.2);
    };
    woof(ctx.currentTime);
    woof(ctx.currentTime + 0.25);
    setTimeout(() => ctx.close(), 800);
  } catch {}
}

const PICADO = ["var(--picado-1)", "var(--picado-2)", "var(--picado-3)", "var(--picado-4)", "var(--picado-5)"];

function Marigold({ size = 56, className = "" }: { size?: number; className?: string }) {
  const petals = Array.from({ length: 3 }).flatMap((_, ring) =>
    Array.from({ length: 12 }).map((_, i) => (
      <ellipse key={`${ring}-${i}`} cx="50" cy={22 + ring * 9} rx={9 - ring * 2} ry={16 - ring * 4}
        fill={ring === 0 ? "var(--marigold-deep)" : ring === 1 ? "var(--marigold)" : "var(--marigold-light)"}
        transform={`rotate(${i * 30 + ring * 15} 50 50)`} />
    )),
  );
  return (
    <svg viewBox="0 0 100 100" width={size} height={size} className={`grow-hover ${className}`}>
      {petals}
      <circle cx="50" cy="50" r="8" fill="var(--marigold-deep)" />
    </svg>
  );
}

function Petals() {
  const [items, setItems] = useState<{ l: number; d: number; dl: number; s: number }[]>([]);
  useEffect(() => {
    setItems(Array.from({ length: 35 }).map(() => ({
      l: Math.random() * 100, d: 6 + Math.random() * 8, dl: Math.random() * 10, s: 10 + Math.random() * 14,
    })));
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {items.map((p, i) => (
        <span key={i} className="petal" style={{ left: `${p.l}%`, width: p.s, height: p.s * 0.7, animationDuration: `${p.d}s`, animationDelay: `${p.dl}s` }} />
      ))}
    </div>
  );
}

function PapelPicado() {
  return (
    <div className="relative h-28 w-full overflow-hidden">
      <div className="absolute left-0 right-0 top-3 h-0.5 bg-foreground/60" />
      <div className="flex justify-center gap-1 px-2">
        {Array.from({ length: 14 }).map((_, i) => (
          <svg key={i} viewBox="0 0 60 80" className="picado grow-hover w-14 shrink-0 md:w-20"
            style={{ animationDelay: `${i * 0.15}s`, color: PICADO[i % 5] }}>
            <path d="M0 4 H60 V70 L52 80 L45 70 L37 80 L30 70 L22 80 L15 70 L7 80 L0 70 Z" fill="currentColor" />
            <circle cx="30" cy="32" r="9" fill="var(--background)" />
            <circle cx="15" cy="18" r="4" fill="var(--background)" />
            <circle cx="45" cy="18" r="4" fill="var(--background)" />
            <path d="M12 50 l6 -6 l6 6 l-6 6z M36 50 l6 -6 l6 6 l-6 6z" fill="var(--background)" />
            <path d="M24 32 a6 6 0 0 0 12 0" fill="none" stroke="currentColor" strokeWidth="2" />
          </svg>
        ))}
      </div>
    </div>
  );
}

function Arch() {
  const flowers = useMemo(() => Array.from({ length: 23 }).map((_, i) => {
    const a = Math.PI - (i / 22) * Math.PI;
    return { x: 50 + Math.cos(a) * 46, y: 52 - Math.sin(a) * 48 };
  }), []);
  return (
    <div className="pointer-events-none absolute inset-0">
      {flowers.map((f, i) => (
        <div key={i} className="pointer-events-auto absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${f.x}%`, top: `${f.y}%` }}>
          <Marigold size={i % 2 ? 54 : 68} />
        </div>
      ))}
      {[60, 70, 80, 90].map((y) => (
        <div key={y} className="contents">
          <div className="pointer-events-auto absolute -translate-x-1/2" style={{ left: "4%", top: `${y}%` }}><Marigold size={60} /></div>
          <div className="pointer-events-auto absolute -translate-x-1/2" style={{ left: "96%", top: `${y}%` }}><Marigold size={60} /></div>
        </div>
      ))}
    </div>
  );
}

const ofrendas = [
  { e: "🦴", t: "Su hueso favorito" },
  { e: "🕯️", t: "Velas que iluminan su camino" },
  { e: "💧", t: "Agua fresca para el viaje" },
  { e: "🍖", t: "Sus premios preferidos" },
  { e: "🎾", t: "Su pelota de juegos" },
  { e: "💀", t: "Calaverita de azúcar" },
];

function Index() {
  const [barks, setBarks] = useState(0);
  return (
    <main className="paw-cursor relative min-h-screen overflow-x-hidden bg-background font-body text-foreground">
      <Petals />
      <PapelPicado />

      <header className="px-4 pt-6 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.3em] text-accent">Día de Muertos</p>
        <h1 className="grow-hover mt-2 font-display text-6xl text-primary drop-shadow-glow md:text-8xl">Camila</h1>
        <p className="mt-3 text-lg text-foreground/80">Siempre en nuestro corazón 🐾</p>
      </header>

      <section className="relative mx-auto mt-10 aspect-[4/5] w-full max-w-3xl px-4 md:aspect-[5/4]">
        <Arch />
        <div className="absolute inset-x-[16%] bottom-[8%] top-[18%] flex flex-col items-center justify-center">
          <button
            type="button"
            onMouseEnter={() => { bark(); setBarks((b) => b + 1); }}
            onClick={bark}
            aria-label="Foto de Camila, pasa el cursor para escucharla ladrar"
            className="paw-cursor group relative rounded-[2rem] border-8 border-marigold bg-card p-2 shadow-altar transition-transform duration-500 hover:scale-110 hover:-rotate-2"
          >
            <img src={camila} alt="Camila, perrita blanca de pelo chino" width={768} height={960}
              className="h-64 w-52 rounded-[1.4rem] object-cover md:h-80 md:w-64" />
            <span className="absolute -top-10 left-1/2 -translate-x-1/2 rounded-full bg-secondary px-4 py-1 font-display text-xl text-secondary-foreground opacity-0 transition-opacity group-hover:opacity-100">
              ¡Guau guau!
            </span>
          </button>
          {barks > 0 && <p className="mt-4 text-sm text-foreground/70">Camila te ha saludado {barks} {barks === 1 ? "vez" : "veces"} 💛</p>}
        </div>
      </section>

      <section className="mx-auto max-w-5xl px-4 py-16">
        <h2 className="text-center font-display text-4xl text-secondary md:text-5xl">Su ofrenda</h2>
        <div className="mt-10 grid grid-cols-2 gap-5 md:grid-cols-3">
          {ofrendas.map((o) => (
            <div key={o.t} className="grow-hover rounded-3xl border-2 border-marigold/60 bg-card/70 p-6 text-center shadow-altar backdrop-blur">
              <div className="text-5xl">{o.e}</div>
              <p className="mt-3 font-bold">{o.t}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-2xl px-6 pb-20 text-center">
        <div className="grow-hover rounded-3xl bg-primary p-8 text-primary-foreground shadow-altar">
          <p className="font-display text-3xl">Querida Camila</p>
          <p className="mt-4 leading-relaxed">
            Gracias por cada colita moviéndose, por cada paseo y por tu amor incondicional.
            Que los pétalos de cempasúchil te guíen de regreso a casa esta noche.
          </p>
        </div>
        <div className="mt-10 flex justify-center gap-3">
          {[48, 64, 48].map((s, i) => <Marigold key={i} size={s} />)}
        </div>
      </section>
    </main>
  );
}
