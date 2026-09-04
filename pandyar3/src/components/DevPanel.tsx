import { useState } from "react";
import { TOTAL_LEVELS } from "../utils/gameState";

interface DevPanelProps {
  onComplete: (levelId: number) => void;
  onReset: () => void;
}

export default function DevPanel({ onComplete, onReset }: DevPanelProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className="pointer-events-auto absolute bottom-2 left-2 z-40 sm:bottom-3 sm:left-3">
      {open && (
        <div className="mb-2 w-52 rounded-lg border border-[var(--color-gold-deep)]/60 bg-black/80 p-2.5 text-[11px] text-[var(--color-cream)] shadow-xl backdrop-blur-sm">
          <p className="mb-1.5 font-semibold tracking-wide text-[var(--color-gold)]">DEV — TEST PROGRESSION</p>
          <div className="mb-2 grid grid-cols-3 gap-1">
            {Array.from({ length: TOTAL_LEVELS }).map((_, i) => (
              <button
                key={i}
                onClick={() => onComplete(i + 1)}
                className="rounded border border-[var(--color-gold-deep)]/50 bg-[#241c10] px-1.5 py-1 font-medium text-[var(--color-gold)] transition hover:bg-[#3a2c18]"
              >
                Complete {i + 1}
              </button>
            ))}
          </div>
          <button
            onClick={onReset}
            className="w-full rounded border border-red-800/60 bg-red-950/60 px-1.5 py-1 font-medium text-red-200 transition hover:bg-red-900/70"
          >
            Reset Progress
          </button>
        </div>
      )}
      <button
        onClick={() => setOpen((o) => !o)}
        className="rounded-full border border-[var(--color-gold-deep)]/60 bg-black/70 px-3 py-1.5 text-[10px] font-semibold tracking-wide text-[var(--color-gold)] shadow-lg backdrop-blur-sm transition hover:bg-black/85 sm:text-xs"
      >
        {open ? "✕ CLOSE DEV" : "⚙ DEV TOOLS"}
      </button>
    </div>
  );
}
