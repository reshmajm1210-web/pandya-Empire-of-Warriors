import { useCallback, useEffect, useState } from "react";
import BackgroundScene from "./components/BackgroundScene";
import Header from "./components/Header";
import TasksBadge from "./components/TasksBadge";
import LevelPath from "./components/LevelPath";
import DevPanel from "./components/DevPanel";
import { applyLevelComplete, initialLevelState, type LevelStatus } from "./utils/gameState";

export default function App() {
  const [levelState, setLevelState] = useState<LevelStatus[]>(initialLevelState);
  const [coins, setCoins] = useState(100);
  const [gems, setGems] = useState(50);
  const [lives] = useState(4);
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    window.setTimeout(() => setToast((current) => (current === message ? null : current)), 1800);
  }, []);

  /** Stub hook — wire up the future battle/war scene here. */
  const startBattle = useCallback(
    (levelId: number) => {
      console.log(`[startBattle] Launching battle for level ${levelId}`);
      showToast(`⚔ Starting Level ${levelId} battle…`);
    },
    [showToast],
  );

  /** Marks a level complete and unlocks the next one. */
  const completeLevel = useCallback(
    (levelId: number) => {
      setLevelState((prev) => applyLevelComplete(prev, levelId));
      console.log(`[completeLevel] Level ${levelId} marked complete`);
      showToast(`✔ Level ${levelId} completed! Next level unlocked.`);
    },
    [showToast],
  );

  const openTasks = useCallback(() => {
    console.log("[openTasks] Opening tasks panel (stub)");
    showToast("📜 Tasks panel coming soon");
  }, [showToast]);

  const openShop = useCallback(
    (type: "coins" | "gems") => {
      console.log(`[openShop] Opening shop for ${type}`);
      if (type === "coins") setCoins((c) => c + 0);
      else setGems((g) => g + 0);
      showToast(type === "coins" ? "🪙 Coin shop coming soon" : "💎 Gem shop coming soon");
    },
    [showToast],
  );

  const openSettings = useCallback(() => {
    console.log("[openSettings] Opening settings (stub)");
    showToast("⚙ Settings coming soon");
  }, [showToast]);

  const handleNodeClick = useCallback(
    (levelId: number) => {
      startBattle(levelId);
    },
    [startBattle],
  );

  const handleReset = useCallback(() => {
    setLevelState(initialLevelState);
    showToast("↺ Progress reset");
  }, [showToast]);

  // Expose functions on window for quick manual testing from devtools console.
  useEffect(() => {
    (window as any).kingdomPath = {
      completeLevel,
      startBattle,
      openTasks,
      openShop,
      getLevelState: () => levelState,
    };
  }, [completeLevel, startBattle, openTasks, openShop, levelState]);

  return (
    <div
      className="relative h-[100dvh] w-screen overflow-hidden bg-black text-white"
      style={{ animation: "fade-in-scale 0.7s ease-out" }}
    >
      <BackgroundScene />

      <Header
        coins={coins}
        gems={gems}
        lives={lives}
        maxLives={4}
        onOpenShop={openShop}
        onOpenSettings={openSettings}
      />

      <TasksBadge onOpenTasks={openTasks} />

      <main className="absolute inset-x-0 bottom-0 top-[104px] z-10 sm:top-[110px]">
        <LevelPath levelState={levelState} onNodeClick={handleNodeClick} />
      </main>

      <DevPanel onComplete={completeLevel} onReset={handleReset} />

      {toast && (
        <div
          className="pointer-events-none absolute bottom-16 left-1/2 z-50 -translate-x-1/2 rounded-full border border-[var(--color-gold-deep)]/70 bg-black/80 px-4 py-2 text-xs font-medium tracking-wide text-[var(--color-cream)] shadow-xl sm:bottom-6 sm:text-sm"
          style={{ animation: "pop-in 0.25s ease-out" }}
        >
          {toast}
        </div>
      )}
    </div>
  );
}
