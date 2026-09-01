<script lang="ts">
    import { palette, setHue, setChromaScale } from "$lib/stores/palette.svelte";
</script>

<label for="hue-slider" class="text-xs block mb-2">
    Hue — {palette.hue}°
</label>
<input
    id="hue-slider"
    type="range"
    min="0"
    max="360"
    step="1"
    value={palette.hue}
    oninput={(e) => setHue(Number((e.currentTarget as HTMLInputElement).value))}
    class="palette-slider hue-slider w-full"
/>

<label for="chroma-slider" class="text-xs block mb-2 mt-4">
    Vibrancy — {Math.round((palette.chromaScale / 4) * 100)}%
</label>
<input
    id="chroma-slider"
    type="range"
    min="0"
    max="4"
    step="0.01"
    value={palette.chromaScale}
    oninput={(e) => setChromaScale(Number((e.currentTarget as HTMLInputElement).value))}
    class="palette-slider chroma-slider w-full"
/>

<style>
    .palette-slider {
        -webkit-appearance: none;
        appearance: none;
        width: 100%;
        height: 8px;
        cursor: pointer;
    }
    /* Stops follow this file's usual convention (see app.css) — derived
       from the live primary color, not hardcoded literals, so each track
       always previews the real lightness/chroma, not a duplicated guess. */
    .hue-slider {
        background: linear-gradient(
            to right,
            oklch(from var(--color-primary) l c 0),
            oklch(from var(--color-primary) l c 60),
            oklch(from var(--color-primary) l c 120),
            oklch(from var(--color-primary) l c 180),
            oklch(from var(--color-primary) l c 240),
            oklch(from var(--color-primary) l c 300),
            oklch(from var(--color-primary) l c 360)
        );
    }
    .chroma-slider {
        background: linear-gradient(
            to right,
            oklch(from var(--color-primary) l 0 h),
            oklch(from var(--color-primary) l c h)
        );
    }
    /* Square thumb, not round — matches the site's zero-radius design language
       rather than introducing a rounded element just for these two controls. */
    .palette-slider::-webkit-slider-thumb {
        -webkit-appearance: none;
        appearance: none;
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid var(--color-base-content);
        cursor: pointer;
    }
    .palette-slider::-moz-range-thumb {
        width: 16px;
        height: 16px;
        background: white;
        border: 2px solid var(--color-base-content);
        border-radius: 0;
        cursor: pointer;
    }
</style>
