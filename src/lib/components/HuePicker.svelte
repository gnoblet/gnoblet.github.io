<script lang="ts">
    import PaletteControls from "./PaletteControls.svelte";

    let { label = "Pick color:" }: { label?: string } = $props();
</script>

<div class="flex items-center gap-2 pl-8">
    <span class="whitespace-nowrap">{label}</span>
    <div class="dropdown dropdown-end">
        <div
            tabindex="0"
            role="button"
            class="btn btn-ghost btn-circle"
            aria-label="Pick accent color"
        >
            <span
                class="w-5 h-5 inline-block border border-base-content/30"
                style="background: oklch(from var(--color-primary) l c h);"
            ></span>
        </div>
        <div
            tabindex="-1"
            class="dropdown-content mt-4 z-1 p-4 shadow bg-base-100 border border-base-300 w-64"
        >
            <PaletteControls />
        </div>
    </div>
</div>
