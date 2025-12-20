<script lang="ts">
    import { onMount } from "svelte";
    import Splide from "@splidejs/splide";
    import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
    import type { Project } from "$lib/types/project";
    import "@splidejs/splide/css/core";

    export let items: Project[] = [];

    let splideElement: HTMLElement;

    onMount(() => {
        if (splideElement) {
            const splide = new Splide(splideElement, {
                type: "loop",
                drag: "free",
                focus: "center",
                perPage: 3,
                perMove: 1,
                gap: "2rem",
                arrows: false,
                pagination: false,
                autoScroll: {
                    speed: 1,
                    pauseOnHover: false,
                    pauseOnFocus: false,
                },
                breakpoints: {
                    1024: {
                        perPage: 2,
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
                    <div
                        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden h-full border-2 border-transparent hover:border-primary-content"
                    >
                        <figure
                            class="relative overflow-hidden bg-base-200 h-64 flex items-center justify-center p-8"
                        >
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
                                on:error={(e) => {
                                    (e.currentTarget as HTMLImageElement).src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Cpath fill="%239ca3af" d="M0 0h400v300H0z"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23fff"%3EProject%3C/text%3E%3C/svg%3E';
                                }}
                            />
                            {#if item.badge}
                                <div
                                    class="absolute top-4 right-4 badge badge-primary badge-lg font-bold uppercase"
                                >
                                    {item.badge}
                                </div>
                            {/if}
                        </figure>
                        <div class="card-body">
                            <h3 class="card-title text-2xl mb-2">
                                {item.title}
                            </h3>
                            <p class="text-base opacity-80 mb-4 line-clamp-3">
                                {item.description}
                            </p>
                            <div class="flex flex-wrap gap-2 mb-4">
                                {#each item.tags.slice(0, 4) as tag}
                                    <span class="badge badge-outline badge-sm">
                                        {tag}
                                    </span>
                                {/each}
                                {#if item.tags.length > 4}
                                    <span class="badge badge-outline badge-sm">
                                        +{item.tags.length - 4}
                                    </span>
                                {/if}
                            </div>
                            <div class="card-actions justify-end">
                                <a
                                    href={item.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-primary btn-sm"
                                >
                                    View Project
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-4 w-4 ml-1"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            stroke-width="2"
                                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </li>
            {/each}
        </ul>
    </div>
</div>

<style>
    :global(.splide__slide) {
        display: flex;
        justify-content: center;
        align-items: stretch;
    }

    :global(.splide__track) {
        padding: 1rem 0;
    }

    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
