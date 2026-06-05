/**
 * Adaptive performance helpers for the WebGL mesh.
 *
 * The hero has to be smooth on the kind of laptop a CISO uses while
 * skimming the page. We measure rolling-average frame time over the
 * last 60 frames; if it crosses a budget, we drop a quality tier.
 *
 * Downshift only. There is no upshift on recovery — a transient stall
 * (a backgrounded tab, a tooltip layout pass, a chrome animation)
 * would otherwise cause visible flicker as the grid re-builds. The
 * tier persists for the session; a reload restores tier 2.
 */

export type Tier = 0 | 1 | 2;

export type TierConfig = {
  cols: number;
  rows: number;
  /** Whether the additive Points pass is included at this tier. */
  withPoints: boolean;
};

export const TIER_CONFIG: Record<Tier, TierConfig> = {
  2: { cols: 96, rows: 56, withPoints: true },
  1: { cols: 72, rows: 40, withPoints: true },
  0: { cols: 56, rows: 32, withPoints: false },
};

/** Frame-time budgets (seconds) above which we step down a tier. */
const DOWNSHIFT_BUDGET_TIER_2 = 22 / 1000; // ~45 fps headroom on tier 2
const DOWNSHIFT_BUDGET_TIER_1 = 28 / 1000; // ~35 fps headroom on tier 1

const RING_SIZE = 60;

export type PerfMonitor = {
  /**
   * Record one frame's `dt` (seconds). Returns the rolling-average dt
   * across the most recent `RING_SIZE` frames, and a `filled` flag that
   * is true only once we have a full window of samples (so an early
   * burst of variance does not trigger a premature downshift).
   */
  push: (dt: number) => { avg: number; filled: boolean };
};

export function createPerfMonitor(): PerfMonitor {
  const buf = new Float32Array(RING_SIZE);
  let idx = 0;
  let count = 0;

  return {
    push(dt) {
      buf[idx] = dt;
      idx = (idx + 1) % RING_SIZE;
      if (count < RING_SIZE) count++;

      let sum = 0;
      for (let i = 0; i < count; i++) sum += buf[i];
      return { avg: sum / count, filled: count >= RING_SIZE };
    },
  };
}

/**
 * Decide whether to step `current` down to a lower tier given the
 * rolling-average frame time. Returns `current` unchanged if no
 * downshift is warranted.
 */
export function nextTier(current: Tier, avg: number): Tier {
  if (current === 2 && avg > DOWNSHIFT_BUDGET_TIER_2) return 1;
  if (current === 1 && avg > DOWNSHIFT_BUDGET_TIER_1) return 0;
  return current;
}
