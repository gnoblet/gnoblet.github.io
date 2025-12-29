<script lang="ts">
    import { onMount } from "svelte";
    import Splide from "@splidejs/splide";
    import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
    import type { Project } from "$lib/types/project";
    import "@splidejs/splide/css/core";
    import ProjectCard from "$lib/components/ProjectCard.svelte";

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
                    <ProjectCard
                        project={item}
                        showDescription={true}
                        maxTags={4}
                    />
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
</style>
