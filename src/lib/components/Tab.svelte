<script lang="ts">
    import { createEventDispatcher } from "svelte";
    export let active: boolean = false;
    export let value: any = undefined;
    export let className: string = "";
    export let type: "button" | "submit" | "reset" = "button";
    export let ariaControls: string | undefined = undefined;

    const dispatch = createEventDispatcher();

    // Base classes matching the style used across the site.
    const base =
        "tab px-4 py-2 rounded-full text-black hover:font-semibold focus:text-white focus:font-semibold whitespace-nowrap";

    $: classes =
        `${base} ${active ? "bg-neutral text-white font-semibold" : ""} ${className}`.trim();

    function handleClick(event: MouseEvent) {
        // Forward a semantic `select` event with the tab value
        dispatch("select", { value, originalEvent: event });
        // Also forward a `click` event from the component so consumers
        // who attach `on:click` to <Tab> still receive something.
        dispatch("click", event);
    }
</script>

<button
    {type}
    class={classes}
    role="tab"
    aria-selected={active}
    aria-controls={ariaControls}
    on:click={handleClick}
    {...$$restProps}
>
    <slot />
</button>
