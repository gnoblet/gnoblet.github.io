import type { Action } from "svelte/action";

/**
 * Mobile-only companion to `borderDraw`: toggles the reveal as this element
 * crosses the vertical middle of the viewport while scrolling — entering the
 * middle band "hovers" it in (dispatches the same `mouseenter` `borderDraw`
 * already listens for), leaving the band "hovers" it back out (`mouseleave`)
 * — a running scroll-spotlight, not a one-shot reveal; scrolling back up
 * un-triggers it the same way scrolling down does. Also toggles
 * `.is-revealed` for the CSS/Tailwind hooks that otherwise only key off real
 * `:hover` (the neon-item glow boost, the title overlay), since touch
 * devices never fire either. No-ops entirely on desktop widths.
 */
export const scrollDraw: Action<HTMLElement> = (node) => {
    $effect(() => {
        if (!window.matchMedia("(max-width: 767px)").matches) {
            return;
        }

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    node.classList.add("is-revealed");
                    node.dispatchEvent(new Event("mouseenter"));
                } else {
                    node.classList.remove("is-revealed");
                    node.dispatchEvent(new Event("mouseleave"));
                }
            },
            // Shrinks the observed viewport to a thin band at vertical center ".
            { rootMargin: "-45% 0px -45% 0px", threshold: 0 },
        );
        observer.observe(node);
        return () => observer.disconnect();
    });
};
