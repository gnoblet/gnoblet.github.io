<script lang="ts">
    import { onMount } from "svelte";
    import Splide from "@splidejs/splide";
    import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
    import type { PortfolioItem } from "$lib/types/portfolio";
    import "@splidejs/splide/css/core";

    export let items: PortfolioItem[] = [];

    let splideElement: HTMLElement;

    onMount(() => {
        if (splideElement) {
            const splide = new Splide(splideElement, {
                type: "loop",
                drag: "free",
                focus: "center",
                perPage: 4,
                perMove: 1,
                gap: "2rem",
                arrows: false,
                pagination: false,
                autoScroll: {
                    speed: 0.5,
                    pauseOnHover: true,
                    pauseOnFocus: true,
                },
                breakpoints: {
                    1024: {
                        perPage: 3,
                        gap: "1.5rem",
                    },
                    768: {
                        perPage: 2,
                        gap: "1rem",
                    },
                    640: {
                        perPage: 1,
                        gap: "0.5rem",
                    },
                },
            });

            splide.mount({ AutoScroll });

            return () => {
                splide.destroy();
            };
        }
    });
</script>

<div class="splide" bind:this={splideElement}>
    <div class="splide__track">
        <ul class="splide__list">
            {#each items as item}
                <li class="splide__slide">
                    <a
                        href={item.portfolioUrl && item.portfolioUrl !== "#"
                            ? item.portfolioUrl
                            : undefined}
                        target={item.portfolioUrl && item.portfolioUrl !== "#"
                            ? "_blank"
                            : undefined}
                        rel={item.portfolioUrl && item.portfolioUrl !== "#"
                            ? "noopener noreferrer"
                            : undefined}
                        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden block border-2 border-transparent hover:border-primary-content {item.portfolioUrl &&
                        item.portfolioUrl !== '#'
                            ? 'cursor-pointer'
                            : 'cursor-default'}"
                    >
                        <figure
                            class="relative overflow-hidden aspect-square rounded-t-2xl"
                        >
                            <img
                                src={item.thumbnailUrl}
                                alt={item.title}
                                class="w-full h-full object-cover object-top"
                                on:error={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Cpath fill="%239ca3af" d="M0 0h400v300H0z"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23fff"%3EViz%3C/text%3E%3C/svg%3E';
                                }}
                            />
                            <!-- Hover overlay -->
                            <div
                                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center"
                            >
                                <div
                                    class="absolute inset-0 bg-primary/90"
                                ></div>
                                <div class="relative z-10">
                                    <h3
                                        class="text-2xl font-bold text-black mb-2"
                                    >
                                        {item.title}
                                    </h3>
                                    <p class="text-md text-black opacity-90">
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </figure>
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    :global(.splide__slide) {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    :global(.splide__track) {
        padding: 1rem 0;
    }
</style>
