const DEFAULT_HUE = 310;
const DEFAULT_CHROMA_SCALE = 1;
const HUE_KEY = "hue-primary";
const CHROMA_KEY = "chroma-scale";

/**
 * Single source of truth for the palette's hue and vibrancy (see
 * --hue-primary/--chroma-scale in app.css). Exported as a mutable object
 * rather than reassignable `let`s — Svelte 5 doesn't allow reassigning an
 * imported binding across modules, but mutating a property on an exported
 * object is fine.
 */
export const palette = $state({ hue: DEFAULT_HUE, chromaScale: DEFAULT_CHROMA_SCALE });

function apply() {
    const el = document.querySelector<HTMLElement>('[data-theme="dark"]');
    el?.style.setProperty("--hue-primary", String(palette.hue));
    el?.style.setProperty("--chroma-scale", String(palette.chromaScale));
}

/** Client-only — call once on mount to apply any previously-picked values. */
export function initPalette() {
    const storedHue = Number(localStorage.getItem(HUE_KEY));
    if (!Number.isNaN(storedHue) && storedHue) {
        palette.hue = storedHue;
    }
    const storedChroma = localStorage.getItem(CHROMA_KEY);
    if (storedChroma !== null && !Number.isNaN(Number(storedChroma))) {
        palette.chromaScale = Number(storedChroma);
    }
    apply();
}

export function setHue(value: number) {
    palette.hue = value;
    apply();
    localStorage.setItem(HUE_KEY, String(value));
}

export function setChromaScale(value: number) {
    palette.chromaScale = value;
    apply();
    localStorage.setItem(CHROMA_KEY, String(value));
}
