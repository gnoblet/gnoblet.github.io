<script lang="ts">
    import {
        createEventDispatcher,
        onMount,
        onDestroy,
        getContext,
    } from "svelte";

    export let active: boolean = false;
    export let value: any = undefined;
    export let className: string = "";
    export let type: "button" | "submit" | "reset" = "button";
    export let ariaControls: string | undefined = undefined;
    export let disabled: boolean = false;

    const dispatch = createEventDispatcher();

    // Base classes matching the style used across the site.
    const base =
        "tab px-4 py-2 rounded-full text-black hover:font-semibold focus:text-primary-content focus:font-semibold whitespace-nowrap";

    // Support a couple of common context keys so Tab works with different Tabs implementations.
    // Tabs.svelte should provide a context object with e.g.:
    // {
    //   register: (t) => void,
    //   unregister: (value) => void,
    //   select: (value, originEvent) => void,
    //   value: writable(currentValue) // optional Svelte store for the current value
    //   focusNext / focusPrev / focusFirst / focusLast : optional helpers for keyboard
    // }
    const context =
        getContext<any>("svelte-tabs") ||
        getContext<any>("tabs") ||
        getContext<any>("__tabs__") ||
        null;

    let el: HTMLButtonElement | null = null;

    // Local computed active state. If a Tabs context exposes a value store we
    // subscribe and derive active from that; otherwise we fallback to the `active`
    // prop passed to the component.
    let isActive: boolean = active;
    let unsubscribe: (() => void) | null = null;

    const keyOf = (v: any) => (v !== undefined ? v : v);

    onMount(() => {
        // Register with Tabs parent if available
        if (context?.register) {
            try {
                context.register({ value, el, disabled });
            } catch {
                // swallow errors from badly-behaved context implementations
            }
        }

        // If context exposes a Svelte store `current` (Tabs provides `current`), subscribe to it
        // to update active state. Also accept `value` for backwards compatibility if present.
        if (
            (context?.current &&
                typeof context.current.subscribe === "function") ||
            (context?.value && typeof context.value.subscribe === "function")
        ) {
            const store = context?.current ?? context?.value;
            unsubscribe = store.subscribe((v: any) => {
                isActive = keyOf(v) === keyOf(value);
            });
        } else {
            // No context store: derive from prop
            isActive = !!active;
        }
    });

    onDestroy(() => {
        if (context?.unregister) {
            try {
                // Tabs.unregister expects the element, not the value
                if (el) context.unregister(el);
            } catch {
                // ignore
            }
        }
        if (unsubscribe) unsubscribe();
    });

    // Keep local `isActive` in sync with the `active` prop when there's no context.
    $: if (!context) {
        isActive = !!active;
    }

    $: classes =
        `${base} ${isActive ? "tab-active bg-primary text-primary-content font-semibold" : ""} ${className}`.trim();

    // Accessibility attributes
    $: ariaSelected = isActive ? "true" : "false";
    $: tabIndex = disabled ? -1 : isActive ? 0 : -1;

    function handleClick(event: MouseEvent) {
        if (disabled) return;
        // Emit local select and click events for backward compatibility
        dispatch("select", { value, originalEvent: event });
        dispatch("click", event);

        // If a Tabs context provides a select() helper, call it so the parent can update
        // its bind:value/store or other state.
        if (context?.select && typeof context.select === "function") {
            context.select(value, event);
        }
    }

    // Keyboard navigation: use context helpers when present, otherwise fallback to DOM navigation
    // Keyboard navigation removed — Tab components no longer handle keydown navigation
    // or attempt to focus sibling tabs. Focus and keyboard behavior should be handled
    // by the containing component/page if desired.
</script>

<button
    bind:this={el}
    {type}
    class={classes}
    class:tab-active={isActive}
    class:bg-primary={isActive}
    class:text-primary-content={isActive}
    class:font-semibold={isActive}
    role="tab"
    aria-controls={ariaControls}
    tabindex={tabIndex}
    {disabled}
    on:click={handleClick}
    {...$$restProps}
>
    <slot />
</button>
