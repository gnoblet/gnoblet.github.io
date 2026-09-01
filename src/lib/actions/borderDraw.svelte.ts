import { Tween } from "svelte/motion";
import type { Action } from "svelte/action";

/** Full 0→1 sweep time; matches the old 4×0.2s staggered CSS transition (0.8s total, both directions). */
const DURATION_MS = 800;

/**
 * Drives the `.border-draw`/`.btn-draw` line (see app.css) via a single 0→1
 * positioning Tween, written onto the element every frame as `--border-draw-progress`. 
 */
export const borderDraw: Action<HTMLElement> = (node) => {
    const progress = new Tween(0, {
        // Proportional to remaining distance
        duration: (from, to) => Math.abs(to - from) * DURATION_MS,
    });

    function draw() {
        progress.set(1);
    }
    function retract() {
        progress.set(0);
    }

    // Listener setup: reads no reactive state, so this runs once on mount and never re-runs. 
    // Deliberately kept separate from the effect below since merging them would re-add these
    // listeners on every animation frame.
    $effect(() => {
        node.addEventListener("mouseenter", draw);
        node.addEventListener("mouseleave", retract);
        node.addEventListener("focus", draw);
        node.addEventListener("blur", retract);
        return () => {
            node.removeEventListener("mouseenter", draw);
            node.removeEventListener("mouseleave", retract);
            node.removeEventListener("focus", draw);
            node.removeEventListener("blur", retract);
        };
    });

    // Tick sync: reads progress.current
    $effect(() => {
        node.style.setProperty("--border-draw-progress", String(progress.current));
    });
};
