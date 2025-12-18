<script lang="ts">
    import { onMount } from "svelte";
    import SplideCarousel from "$lib/components/SplideCarousel.svelte";
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
    class="py-12 px-4 bg-white flex items-center justify-center"
>
    <div
        bind:this={containerElement}
        class="container mx-auto max-w-6xl transition-all duration-200 ease-out {isVisible
            ? 'translate-y-0 opacity-100'
            : 'translate-y-20 opacity-0'}"
    >
        <div class="text-center mb-8">
            <h2 class="text-4xl font-bold mb-4">Latest Projects</h2>
            <p class="text-2xl max-w-2xl mx-auto">
                Check out my most recent work and ongoing projects.
            </p>
        </div>
        <SplideCarousel items={dataVizProjects.slice(0, 5)} />
    </div>
</section>
