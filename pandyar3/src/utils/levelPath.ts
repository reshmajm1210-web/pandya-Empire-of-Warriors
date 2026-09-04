export interface PathPoint {
  x: number;
  y: number;
}

// Percentage-based coordinates (viewBox 0 0 100 100) describing a gentle
// left-to-right zigzag across the map terrain, level 1 at far left.
export const LEVEL_POINTS: PathPoint[] = [
  { x: 5, y: 78 },
  { x: 16, y: 50 },
  { x: 27, y: 72 },
  { x: 38, y: 46 },
  { x: 49, y: 68 },
  { x: 60, y: 42 },
  { x: 71, y: 64 },
  { x: 81, y: 38 },
  { x: 91, y: 17 },
];

/**
 * Builds a smooth SVG path string through a set of points using
 * quadratic bezier curves through midpoints (classic "smooth polyline").
 */
export function buildSmoothPath(points: PathPoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i];
    const p1 = points[i + 1];
    const mx = (p0.x + p1.x) / 2;
    const my = (p0.y + p1.y) / 2;
    d += ` Q ${p0.x} ${p0.y} ${mx} ${my}`;
  }
  const last = points[points.length - 1];
  d += ` L ${last.x} ${last.y}`;
  return d;
}
