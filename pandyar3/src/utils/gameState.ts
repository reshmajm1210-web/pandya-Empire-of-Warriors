// Level status codes: 0 = locked, 1 = unlocked/current, 2 = completed
export type LevelStatus = 0 | 1 | 2;

export const TOTAL_LEVELS = 9;

// Array-based state, easy to sync with a backend/save system later.
export const initialLevelState: LevelStatus[] = [1, 0, 0, 0, 0, 0, 0, 0, 0];

/**
 * Pure reducer-style helper: marks `levelId` as completed and unlocks the
 * next level (if it exists and is currently locked). Kept isolated so a
 * future war/battle page can call the same logic without touching the map.
 */
export function applyLevelComplete(state: LevelStatus[], levelId: number): LevelStatus[] {
  const idx = levelId - 1;
  if (idx < 0 || idx >= state.length) return state;

  const next = [...state] as LevelStatus[];
  next[idx] = 2;
  if (idx + 1 < next.length && next[idx + 1] === 0) {
    next[idx + 1] = 1;
  }
  return next;
}
