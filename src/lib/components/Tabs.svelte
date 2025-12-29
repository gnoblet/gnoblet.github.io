<script context="module" lang="ts">
    // Re-export Tab so consumers can import both from this module:
    // import Tabs, { Tab } from '$lib/components/Tabs.svelte'
    export { default as Tab } from "./Tab.svelte";
</script>

<script lang="ts">
    import Tab from "./Tab.svelte";
    import { setContext } from "svelte";
    import { createEventDispatcher, onDestroy } from "svelte";
    import { writable, type Writable } from "svelte/store";

    /**
     * Tabs.svelte
     *
     * - Exposes a bindable `value` prop: <Tabs bind:value={selected} items={...} />
     * - If `value` is not provided, the component will choose a sensible default:
     *     1) any item with `active: true` (first match)
     *     2) otherwise the first item
     *   This works for both `items`-driven usage and slot-based tabs (via registration).
     * - Provides a context (`svelte-tabs`) so `Tab.svelte` children can register and
     *   subscribe to the current value store, and use keyboard helpers provided here.
     *
     * Items shape (optional):
     *  { label: string, value?: any, active?: boolean, className?: string, ariaControls?: string, disabled?: boolean }
     *
     * Events:
     *  - dispatches `select` with { value, originalEvent? } when a tab is selected
     */

    export let className: string = "";
    export let size: "sm" | "md" | "lg" = "lg";
    export let boxed: boolean = true;
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

    // Bindable value (controlled usage via bind:value). If parent doesn't bind,
    // Tabs will manage this internally and still update it when user selects a tab.
    export let value: any = undefined;

    const dispatch = createEventDispatcher();

    $: sizeClass =
        size === "sm" ? "tabs-sm" : size === "md" ? "tabs-md" : "tabs-lg";
    $: boxClass = boxed ? "tabs-box" : "";
    $: padClass = padded ? "p-1" : "";
    $: baseContainer =
        "tabs inline-flex flex-wrap gap-2 items-center rounded-full justify-center";
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

    // Internal store representing the current active tab key. Exposed through context.
    const current: Writable<any> = writable(value);

    // Keep the external `value` and internal `current` store in sync:
    // - When parent sets `value`, push to store
    // - When store changes (e.g. due to user click), update `value` so `bind:value` works
    const unsubStore = current.subscribe((v) => {
        if (v !== value) {
            // update exported `value` so children with bind:value get the new value
            value = v;
        }
    });

    $: if (value !== undefined) {
        // Parent explicitly set value -> reflect into store
        current.set(value);
    }

    // Utility to derive a key for items (prefer item.value else label)
    const keyOf = (item: TabItem | { value?: any } | any) =>
        item && item.value !== undefined
            ? item.value
            : item && item.label !== undefined
              ? item.label
              : item;

    // Items-driven initial selection logic:
    // If items present, and `value` is undefined, pick explicit active or first.
    $: if (items && items.length) {
        // If parent provided a value, ensure it exists in items, otherwise fallback to first
        if (value === undefined) {
            const explicit = items.find((i) => !!i.active);
            const key = explicit ? keyOf(explicit) : keyOf(items[0]);
            current.set(key);
        } else {
            const exists = items.some((i) => keyOf(i) === value);
            if (!exists) {
                current.set(keyOf(items[0]));
            }
        }
    }

    // Registration API for slot-based Tabs
    type RegisteredTab = {
        value: any;
        el: HTMLButtonElement;
        disabled?: boolean;
    };
    let registered: RegisteredTab[] = [];

    function register(tab: RegisteredTab) {
        // Keep items in DOM order by insertion
        registered.push(tab);
        // If no value yet (uncontrolled slot usage), default to first registered tab
        current.update((v) => (v === undefined ? tab.value : v));
    }

    function unregister(el: HTMLButtonElement) {
        registered = registered.filter((t) => t.el !== el);
        // If the removed tab was active, choose a new one (first available)
        current.update((v) => {
            const exists = registered.some((t) => t.value === v);
            if (!exists) {
                return registered.length ? registered[0].value : undefined;
            }
            return v;
        });
    }

    function select(
        valueToSelect: any,
        originalEvent?: Event,
        opts?: { focus?: boolean },
    ) {
        // Prevent selecting disabled tabs
        const target = registered.find((r) => r.value === valueToSelect);
        if (target?.disabled) return;

        current.set(valueToSelect);
        dispatch("select", { value: valueToSelect, originalEvent });

        // Optionally focus the selected tab's DOM element if requested
        if (opts?.focus && target?.el) {
            try {
                target.el.focus();
            } catch {
                /* ignore */
            }
        }
    }

    // Keyboard helpers removed — focus/keyboard navigation is intentionally omitted.
    // If you need keyboard navigation later, we can reintroduce explicit helpers here.

    // Provide the context for Tab children so they can:
    // - register/unregister
    // - subscribe to the current store
    // - call select
    setContext("svelte-tabs", {
        register,
        unregister,
        select,
        current,
    });

    onDestroy(() => {
        unsubStore();
    });
</script>

<div class={containerClass} role="tablist" aria-orientation="horizontal">
    {#if items}
        {#each items as item (keyOf(item))}
            <Tab
                active={$current === keyOf(item)}
                value={keyOf(item)}
                className={item.className}
                ariaControls={item.ariaControls}
                disabled={item.disabled}
                on:select={(e) => {
                    // When a Tab is clicked it dispatches select; forward to our select()
                    // so we keep store and bound `value` in sync and re-dispatch the event.
                    select(e.detail?.value, e.detail?.originalEvent, {
                        focus: true,
                    });
                }}
            >
                {item.label}
            </Tab>
        {/each}
    {:else}
        <slot />
    {/if}
</div>
