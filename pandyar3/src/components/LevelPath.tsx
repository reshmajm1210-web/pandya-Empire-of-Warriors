import { useState } from "react";
import type { LevelStatus } from "../utils/gameState";
import { LEVEL_POINTS, buildSmoothPath } from "../utils/levelPath";
import { CheckIcon, LockIcon } from "./icons";

interface LevelPathProps {
  levelState: LevelStatus[];
  onNodeClick: (levelId: number) => void;
}

type Transient = "flash" | "shake" | undefined;

export default function LevelPath({ levelState, onNodeClick }: LevelPathProps) {
  const [transient, setTransient] = useState<Record<number, Transient>>({});

  const highestUnlockedIndex = (() => {
    let idx = 0;
    for (let i = 0; i < levelState.length; i++) {
      if (levelState[i] !== 0) idx = i;
    }
    return idx;
  })();

  const fullPathD = buildSmoothPath(LEVEL_POINTS);
  const brightPathD = buildSmoothPath(LEVEL_POINTS.slice(0, highestUnlockedIndex + 1));

  const handleClick = (levelId: number, status: LevelStatus) => {
    if (status === 0) {
      setTransient((p) => ({ ...p, [levelId]: "shake" }));
      window.setTimeout(() => setTransient((p) => ({ ...p, [levelId]: undefined })), 420);
      return;
    }
    setTransient((p) => ({ ...p, [levelId]: "flash" }));
    window.setTimeout(() => setTransient((p) => ({ ...p, [levelId]: undefined })), 520);
    onNodeClick(levelId);
  };

  return (
    <div className="h-full w-full overflow-x-auto overflow-y-hidden [-webkit-overflow-scrolling:touch] md:overflow-visible">
      <div className="relative h-full min-w-[1180px] md:min-w-full">
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden="true"
        >
          <path
            d={fullPathD}
            fill="none"
            stroke="rgba(190,180,150,0.4)"
            strokeWidth="3"
            strokeDasharray="9 8"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
          />
          <path
            d={brightPathD}
            fill="none"
            stroke="url(#brightGoldGrad)"
            strokeWidth="3.4"
            strokeDasharray="10 7"
            strokeLinecap="round"
            vectorEffect="non-scaling-stroke"
            style={{ animation: "dash-shimmer 1.6s linear infinite", filter: "drop-shadow(0 0 4px rgba(255,214,120,0.75))" }}
          />
          <defs>
            <linearGradient id="brightGoldGrad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fff3cf" />
              <stop offset="50%" stopColor="#f3cf7a" />
              <stop offset="100%" stopColor="#ffe9b0" />
            </linearGradient>
          </defs>
        </svg>

        {LEVEL_POINTS.map((point, i) => {
          const levelId = i + 1;
          const status = levelState[i];
          const anim = transient[levelId];
          return (
            <LevelNode
              key={levelId}
              levelId={levelId}
              status={status}
              x={point.x}
              y={point.y}
              anim={anim}
              onClick={() => handleClick(levelId, status)}
            />
          );
        })}
      </div>
    </div>
  );
}

function LevelNode({
  levelId,
  status,
  x,
  y,
  anim,
  onClick,
}: {
  levelId: number;
  status: LevelStatus;
  x: number;
  y: number;
  anim: Transient;
  onClick: () => void;
}) {
  const locked = status === 0;
  const current = status === 1;
  const completed = status === 2;

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={locked}
      aria-label={`Level ${levelId}${locked ? " (locked)" : completed ? " (completed)" : " (unlocked)"}`}
      className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        cursor: locked ? "not-allowed" : "pointer",
        animation: anim === "shake" ? "shake 0.4s ease-in-out" : anim === "flash" ? "flash-pop 0.5s ease-out" : undefined,
      }}
    >
      <span className="relative grid h-12 w-12 place-items-center rounded-full md:h-16 md:w-16">
        {/* pulsing ring for current/unlocked level */}
        {current && (
          <span
            className="absolute inset-[-6px] rounded-full border-2 border-[var(--color-gold-bright)]/70"
            style={{ animation: "pulse-glow 2.1s ease-in-out infinite" }}
          />
        )}

        <span
          className={
            "relative grid h-full w-full place-items-center rounded-full border-[3px] font-bold transition-all duration-200 " +
            (locked
              ? "border-dashed border-[var(--color-locked)] bg-gradient-to-b from-[#4a463c] to-[#2a271f] text-[#8b8577] opacity-70 saturate-50"
              : completed
              ? "border-[var(--color-gold-deep)] bg-gradient-to-b from-[#f3cf7a] to-[#b9781a] text-[#4a2a0a] shadow-[0_0_10px_rgba(255,214,120,0.5)] group-hover:scale-110 group-hover:shadow-[0_0_18px_rgba(255,214,120,0.8)]"
              : "border-[var(--color-gold-bright)] bg-gradient-to-b from-[#fff3cf] to-[#e0a83c] text-[#4a2a0a] shadow-[0_0_14px_rgba(255,214,120,0.75)] group-hover:scale-110 group-hover:shadow-[0_0_24px_rgba(255,225,140,0.95)]")
          }
          style={{ fontFamily: "var(--font-title)" }}
        >
          <span className="text-lg md:text-2xl">{levelId}</span>
        </span>

        {locked && (
          <span className="absolute -bottom-1 -right-1 grid h-5 w-5 place-items-center rounded-full bg-[#1c1a15] ring-2 ring-[#2a271f] md:h-6 md:w-6">
            <LockIcon className="h-3.5 w-3.5 md:h-4 md:w-4" />
          </span>
        )}
        {completed && (
          <span className="absolute -top-1.5 -right-1.5 h-5 w-5 md:h-6 md:w-6">
            <CheckIcon className="h-full w-full drop-shadow" />
          </span>
        )}
      </span>

      <span
        className={
          "mt-1 rounded-sm px-1.5 py-0.5 text-[8px] font-semibold tracking-wider md:text-[10px] " +
          (locked ? "bg-black/40 text-[#a39d8c]" : "bg-black/50 text-[var(--color-gold-bright)]")
        }
        style={{ fontFamily: "var(--font-ui)" }}
      >
        LEVEL {levelId}
      </span>
    </button>
  );
}
