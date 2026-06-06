<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";
    import SocialLinks from "$lib/components/SocialLinks.svelte";

    let isVisible = false;
    const currentYear = new Date().getFullYear();

    function toggleVisibility() {
        if (browser && window.scrollY > 300) {
            isVisible = true;
        } else {
            isVisible = false;
        }
    }

    function scrollToTop() {
        if (browser) {
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        }
    }

    onMount(() => {
        if (browser) {
            window.addEventListener("scroll", toggleVisibility);
        }
    });

    onDestroy(() => {
        if (browser) {
            window.removeEventListener("scroll", toggleVisibility);
        }
    });
</script>

<footer class="footer footer-center bg-base-100 text-base-content p-10">
    <aside class="max-w-sm">
        <p class="font-bold text-xl">
            Guillaume Noblet &copy; {currentYear}
        </p>
        <p class="text-sm opacity-80 mt-2">
            Thanks to <a
                href="https://a2-ai.github.io/rv-docs/"
                class="link link-hover"
                target="_blank"
                rel="noopener noreferrer">rv</a
            >
            and
            <a
                href="https://rspatial.org/pkg/"
                class="link link-hover"
                target="_blank"
                rel="noopener noreferrer">terra</a
            >
            for elevation data with R • contributors to Svelte, daisyUI, d3.js, splide.js,
            and Tailwind CSS.
        </p>
    </aside>
    <nav class="flex items-center gap-2">
        <SocialLinks size="large" />
        <a href="mailto:data@guillaume-noblet.com" class="neon-btn btn-square bg-transparent hover:bg-primary hover:text-primary-content flex items-center justify-center btn-lg" aria-label="Email">
            <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" class="fill-current">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"></path>
            </svg>
        </a>
    </nav>
</footer>

<!-- Scroll to Top Button with Heroicon -->
{#if isVisible}
    <button
        on:click={scrollToTop}
        class="btn btn-square btn-primary fixed bottom-8 right-8 z-50 transition-all duration-300 hover:scale-110"
        aria-label="Scroll to top"
    >
        <!-- Heroicon: arrow-up -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2"
            stroke="currentColor"
            class="w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M4.5 10.5 12 3m0 0 7.5 7.5M12 3v18"
            />
        </svg>
    </button>
{/if}
