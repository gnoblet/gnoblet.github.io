<script lang="ts">
    import { onMount } from "svelte";
    import ElevationRidgeMap from "$lib/components/ElevationRidgeMap.svelte";
    import HorizontalCarousel from "$lib/components/HorizontalCarousel.svelte";
    import { dataVizProjects } from "$lib/data/dataVizProjects";

    let containerElement: HTMLDivElement;
    let isVisible = false;

    onMount(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        isVisible = true;
                    }
                });
            },
            {
                threshold: 1, // Trigger when 100% of element is shown
            },
        );

        if (containerElement) {
            observer.observe(containerElement);
        }

        return () => {
            if (containerElement) {
                observer.unobserve(containerElement);
            }
        };
    });
</script>

<section
    id="latest-projects"
    class="py-20 px-4 bg-base-300 relative overflow-hidden"
>
    <div class="bg-white h-60">
        <ElevationRidgeMap></ElevationRidgeMap>
    </div>
    <div
        bind:this={containerElement}
        class="container mx-auto max-w-6xl relative z-10 transition-all duration-500 ease-out {isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-20 opacity-0'}"
    >
        <div class="text-center mb-8 bg-white/60">
            <h2 class="text-4xl font-bold mb-4">Latest Projects</h2>
            <p class="text-2xl max-w-2xl mx-auto">
                Check out my most recent work and ongoing projects.
            </p>
        </div>
        <HorizontalCarousel
            items={dataVizProjects.slice(0, 5)}
            autoSlideInterval={3000}
            itemsPerView={3}
        />
    </div>
</section>
