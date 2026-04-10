"use client";

import { useState, useEffect } from "react";

/* ── Eye SVG icon (crossed-out eye) ── */
function EyeOffIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 64 64"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="w-14 h-14 md:w-18 md:h-18"
      aria-hidden="true"
    >
      {/* Eye shape */}
      <path d="M6 32 C14 16, 50 16, 58 32 C50 48, 14 48, 6 32 Z" />
      {/* Pupil */}
      <circle cx="32" cy="32" r="8" />
      {/* Slash */}
      <line x1="10" y1="10" x2="54" y2="54" strokeWidth="2" />
    </svg>
  );
}

/* ─────────────────────────────────────────
   MAIN PAGE
───────────────────────────────────────── */
export default function ComingSoonPage() {
  const [ready, setReady] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setReady(true);
  }, []);

  // Parallax on mouse move
  useEffect(() => {
    function onMove(e: MouseEvent) {
      setMousePos({
        x: (e.clientX / window.innerWidth - 0.5) * 30,
        y: (e.clientY / window.innerHeight - 0.5) * 30,
      });
    }
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden flex flex-col">
      {/* ── Background image with parallax ── */}
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate(${mousePos.x * 0.4}px, ${mousePos.y * 0.4}px) scale(1.08)`,
          transition: "transform 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/bg.jpg')",
            filter: "blur(1.5px) saturate(0.9) brightness(0.65)",
            transform: "scale(1.06)",
          }}
        />
        {/* Dark overlay gradient */}
        <div className="absolute inset-0" style={{
          background: "linear-gradient(135deg, rgba(2,2,12,0.55) 0%, rgba(6,4,20,0.45) 50%, rgba(2,6,15,0.60) 100%)"
        }} />
        {/* Vignette */}
        <div className="absolute inset-0" style={{
          background: "radial-gradient(ellipse at center, transparent 20%, rgba(0,0,0,0.65) 100%)"
        }} />
      </div>

      {/* ── Ambient orbs ── */}
      <div
        className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(120,80,255,0.15) 0%, transparent 70%)",
          filter: "blur(60px)",
          transform: `translate(${mousePos.x * 0.6}px, ${mousePos.y * 0.6}px)`,
          transition: "transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full pointer-events-none"
        style={{
          background: "radial-gradient(circle, rgba(60,120,255,0.12) 0%, transparent 70%)",
          filter: "blur(80px)",
          transform: `translate(${mousePos.x * -0.4}px, ${mousePos.y * -0.4}px)`,
          transition: "transform 1s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      />

      {/* ── Top bar — year only ── */}
      <header className="relative z-10 flex justify-end items-center px-8 md:px-12 pt-8">
        <div className={`text-xs font-semibold tracking-[0.2em] uppercase text-white/50 animate-fade-in delay-200 ${ready ? "" : "opacity-0"}`}>
          2025
        </div>
      </header>

      {/* ── Center content ── */}
      <section className="relative z-10 flex-1 flex flex-col items-center justify-center px-6 text-center">

        {/* Animated eye icon */}
        <div
          className={`animate-float text-white/60 mb-5 animate-slide-up ${ready ? "" : "opacity-0"}`}
          style={{ animationDelay: "0.1s" }}
        >
          <div className="relative flex items-center justify-center">
            <div
              className="absolute w-28 h-28 rounded-full animate-pulse-ring"
              style={{ background: "radial-gradient(circle, rgba(255,255,255,0.07) 0%, transparent 70%)" }}
            />
            <EyeOffIcon />
          </div>
        </div>

        {/* Headline */}
        <h1
          className={`shimmer-text text-3xl md:text-5xl lg:text-6xl font-bold mb-3 animate-slide-up delay-200 ${ready ? "" : "opacity-0"}`}
          style={{ letterSpacing: "0.12em" }}
        >
          COMING SOON
        </h1>

        {/* Subtitle */}
        <p className={`text-white/45 text-xs md:text-sm max-w-[260px] md:max-w-xs leading-relaxed animate-slide-up delay-300 ${ready ? "" : "opacity-0"}`}>
          this picture holds something that<br />could spark your excitement
        </p>
      </section>

      {/* ── Bottom bar ── */}
      <footer className={`relative z-10 flex justify-between items-center px-8 md:px-12 pb-8 animate-fade-in delay-500 ${ready ? "" : "opacity-0"}`}>
        {/* Social links */}
        <div className="flex items-center gap-5">
          {[
            { label: "TW", href: "#", title: "Twitter" },
            { label: "IG", href: "#", title: "Instagram" },
            { label: "LI", href: "#", title: "LinkedIn" },
          ].map(({ label, href, title }) => (
            <a
              key={label}
              href={href}
              title={title}
              id={`social-${label.toLowerCase()}`}
              className="text-[11px] font-bold tracking-widest text-white/30 hover:text-white/80 transition-colors duration-200"
            >
              {label}
            </a>
          ))}
        </div>

        {/* Stay tuned pill */}
        <button
          id="stay-tuned-btn"
          className="btn-glow glass border border-white/15 rounded-full px-6 py-2.5 text-xs font-semibold tracking-[0.15em] uppercase text-white/70 cursor-pointer"
        >
          Stay Tuned
        </button>
      </footer>
    </main>
  );
}
