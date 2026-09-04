import { useMemo } from "react";

function ShipSilhouette({ className = "", style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <svg viewBox="0 0 64 48" className={className} style={style} aria-hidden="true">
      <path
        d="M6 34 L58 34 L50 42 L14 42 Z"
        fill="#1a120a"
        opacity="0.85"
      />
      <line x1="32" y1="34" x2="32" y2="6" stroke="#1a120a" strokeWidth="1.6" opacity="0.85" />
      <path d="M32 8 L48 22 L32 24 Z" fill="#3a2c18" opacity="0.85" />
      <path d="M32 12 L20 24 L32 25 Z" fill="#2a2013" opacity="0.85" />
    </svg>
  );
}

interface Sparkle {
  left: string;
  top: string;
  delay: string;
  duration: string;
  size: number;
}

export default function BackgroundScene() {
  const sparkles = useMemo<Sparkle[]>(() => {
    const arr: Sparkle[] = [];
    for (let i = 0; i < 18; i++) {
      arr.push({
        left: `${2 + Math.random() * 30}%`,
        top: `${55 + Math.random() * 38}%`,
        delay: `${(Math.random() * 5).toFixed(2)}s`,
        duration: `${(2 + Math.random() * 2.5).toFixed(2)}s`,
        size: 2 + Math.random() * 2.5,
      });
    }
    return arr;
  }, []);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden">
      <img
        src="/images/kingdom-map-bg.jpg"
        alt="Pandya Kingdom map"
        className="h-full w-full object-cover"
        style={{ animation: "drift-slow 26s ease-in-out infinite" }}
      />

      {/* warm vignette */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_45%,rgba(10,10,15,0.55)_100%)]" />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/25" />

      {/* drifting mist layers */}
      <div
        className="pointer-events-none absolute -inset-x-10 top-[18%] h-40 opacity-40 blur-2xl"
        style={{
          background: "radial-gradient(ellipse at 30% 50%, rgba(255,220,170,0.35), transparent 60%)",
          animation: "drift-slower 34s ease-in-out infinite",
        }}
      />
      <div
        className="pointer-events-none absolute -inset-x-10 top-[38%] h-32 opacity-30 blur-2xl"
        style={{
          background: "radial-gradient(ellipse at 70% 50%, rgba(200,230,255,0.25), transparent 60%)",
          animation: "drift-slow 40s ease-in-out infinite reverse",
        }}
      />

      {/* decorative bobbing ships (parallax accents over the painted ocean) */}
      <ShipSilhouette className="absolute left-[4%] top-[46%] h-10 w-14 opacity-90 sm:h-14 sm:w-20" style={{ animation: "bob 5s ease-in-out infinite" }} />
      <ShipSilhouette className="absolute left-[10%] top-[66%] h-8 w-11 opacity-80 sm:h-11 sm:w-16" style={{ animation: "bob-alt 6.2s ease-in-out infinite" }} />

      {/* water sparkle shimmer */}
      {sparkles.map((s, i) => (
        <span
          key={i}
          className="pointer-events-none absolute rounded-full bg-[#fff3cf]"
          style={{
            left: s.left,
            top: s.top,
            width: s.size,
            height: s.size,
            animation: `sparkle-twinkle ${s.duration} ease-in-out infinite`,
            animationDelay: s.delay,
            boxShadow: "0 0 6px 1px rgba(255,244,210,0.8)",
          }}
        />
      ))}
    </div>
  );
}
