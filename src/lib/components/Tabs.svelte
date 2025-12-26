<script lang="ts">
    /**
     * Tabs.svelte
     *
     * Tabs wrapper that centralizes container Tailwind classes and provides a small
     * built-in `Tab` usage path via an `items` prop. If `items` is provided, Tabs
     * will render Tab buttons for each item; otherwise it renders the default slot
     * so you can pass custom <Tab> or <button> elements.
     *
     * The component also re-exports the `Tab` component so pages can import it from
     * the same module if desired:
     *
     * import Tabs, { Tab } from '$lib/components/Tabs.svelte'
     *
     * Items shape (optional):
     *  { label: string, value?: any, active?: boolean, className?: string, ariaControls?: string, disabled?: boolean }
     *
     * Events:
     *  - Tabs dispatches `select` with the selected item's value when a tab is selected.
     */

    import Tab from "./Tab.svelte";

    import { createEventDispatcher } from "svelte";

    export let className: string = "";
    export let size: "sm" | "md" | "lg" = "lg";
    export let boxed: boolean = false;
    export let padded: boolean = true;
    export let bgClass: string = "bg-neutral-content";

    // Optional items list; when set, Tabs renders items automatically.
    type TabItem = {
        label: string;
        value?: any;
        active?: boolean;
        className?: string;
        ariaControls?: string;
        disabled?: boolean;
    };
    export let items: TabItem[] | null = null;

    const dispatch = createEventDispatcher();

    $: sizeClass =
        size === "sm" ? "tabs-sm" : size === "md" ? "tabs-md" : "tabs-lg";
    $: boxClass = boxed ? "tabs-box" : "";
    $: padClass = padded ? "p-1" : "";
    $: baseContainer =
        "inline-flex flex-wrap gap-2 items-center rounded-full justify-center";
    $: containerClass = [
        baseContainer,
        sizeClass,
        boxClass,
        padClass,
        bgClass,
        className,
    ]
        .filter(Boolean)
        .join(" ");

    function handleSelect(detail: any) {
        // Forward selection event with the selected value/details
        dispatch("select", detail);
    }
</script>

<div class={containerClass} role="tablist" aria-orientation="horizontal">
    {#if items}
        {#each items as item (item.value ?? item.label)}
            <Tab
                active={!!item.active}
                value={item.value}
                className={item.className}
                ariaControls={item.ariaControls}
                disabled={item.disabled}
                on:select={(e) => handleSelect(e.detail)}
            >
                {item.label}
            </Tab>
        {/each}
    {:else}
        <slot />
    {/if}
</div>
