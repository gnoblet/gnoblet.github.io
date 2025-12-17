<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import type { Project } from "$lib/types/project";

    export let items: Project[] = [];
    export let autoSlideInterval: number = 3000;
    export let itemsPerView: number = 3;

    let currentIndex = 0;
    let autoSlide: ReturnType<typeof setInterval>;
    let isPaused = false;
    let isTransitioning = true;

    // Create infinite loop by duplicating items
    $: infiniteItems = [...items, ...items, ...items];
    $: itemWidth = 100 / itemsPerView;
    $: totalWidth = infiniteItems.length * itemWidth;

    // Start at the middle set of items
    $: if (items.length > 0 && currentIndex === 0) {
        currentIndex = items.length;
    }

    function nextSlide() {
        isTransitioning = true;
        currentIndex++;

        // Reset to beginning seamlessly after reaching the end
        if (currentIndex >= items.length * 2) {
            setTimeout(() => {
                isTransitioning = false;
                currentIndex = items.length;
            }, 500);
        }
    }

    function prevSlide() {
        isTransitioning = true;
        currentIndex--;

        // Reset to end seamlessly after reaching the beginning
        if (currentIndex < items.length) {
            setTimeout(() => {
                isTransitioning = false;
                currentIndex = items.length * 2 - 1;
            }, 500);
        }
    }

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            if (!isPaused) {
                nextSlide();
            }
        }, autoSlideInterval);
    }

    onMount(() => {
        if (items.length > 0) {
            startAutoSlide();
        }
    });

    onDestroy(() => {
        if (autoSlide) {
            clearInterval(autoSlide);
        }
    });
</script>

<div
    class="relative"
    on:mouseenter={() => (isPaused = true)}
    on:mouseleave={() => (isPaused = false)}
    role="region"
    aria-label="Carousel"
>
    <!-- Carousel Track -->
    <div class="overflow-hidden rounded-box shadow-2xl">
        <div
            class="flex {isTransitioning
                ? 'transition-transform duration-500 ease-in-out'
                : ''}"
            style="transform: translateX(-{currentIndex * itemWidth}%)"
        >
            {#each infiniteItems as item}
                <div class="shrink-0 px-2" style="width: {itemWidth}%">
                    <div
                        class="card bg-base-100 shadow-xl h-full hover:shadow-2xl transition-shadow"
                    >
                        <figure class="px-4 pt-4">
                            <img
                                src={item.imageUrl}
                                alt={item.title}
                                class="rounded-xl w-full h-64 object-cover"
                                on:error={(e) => {
                                    e.currentTarget.src =
                                        "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 400 300'%3E%3Crect fill='%23e5e7eb' width='400' height='300'/%3E%3Cpath fill='%239ca3af' d='M0 0h400v300H0z'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23fff'%3EImage%3C/text%3E%3C/svg%3E";
                                }}
                            />
                        </figure>
                        <div class="card-body">
                            <h3 class="card-title text-lg">
                                {item.title}
                            </h3>
                            <p class="text-sm opacity-80 line-clamp-2">
                                {item.description}
                            </p>

                            <!-- Tags -->
                            <div class="flex flex-wrap gap-1 mt-2">
                                {#each item.tags as tag}
                                    <div class="badge badge-primary badge-sm">
                                        {tag}
                                    </div>
                                {/each}
                            </div>

                            <!-- Action Button -->
                            {#if item.projectUrl}
                                <div class="card-actions justify-end mt-2">
                                    <a
                                        href={item.projectUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        class="btn btn-primary btn-sm"
                                    >
                                        View
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke-width="1.5"
                                            stroke="currentColor"
                                            class="w-4 h-4"
                                        >
                                            <path
                                                stroke-linecap="round"
                                                stroke-linejoin="round"
                                                d="M13.5 6H5.25A2.25 2.25 0 0 0 3 8.25v10.5A2.25 2.25 0 0 0 5.25 21h10.5A2.25 2.25 0 0 0 18 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
                                            />
                                        </svg>
                                    </a>
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            {/each}
        </div>
    </div>

    <!-- Navigation Buttons -->
    <button
        on:click={prevSlide}
        class="btn btn-circle btn-primary absolute left-2 top-1/2 -translate-y-1/2 z-10"
        aria-label="Previous slide"
    >
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
                d="M15.75 19.5 8.25 12l7.5-7.5"
            />
        </svg>
    </button>
    <button
        on:click={nextSlide}
        class="btn btn-circle btn-primary absolute right-2 top-1/2 -translate-y-1/2 z-10"
        aria-label="Next slide"
    >
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
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
        </svg>
    </button>

    <!-- Indicators -->
    <div class="flex justify-center gap-2 mt-6">
        {#each items as _, index}
            <button
                on:click={() => {
                    isTransitioning = true;
                    currentIndex = items.length + index;
                }}
                class="btn btn-xs {currentIndex % items.length === index
                    ? 'btn-primary'
                    : 'btn-ghost'}"
                aria-label="Go to slide {index + 1}"
            >
                {index + 1}
            </button>
        {/each}
    </div>
</div>

<style>
    .line-clamp-2 {
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
