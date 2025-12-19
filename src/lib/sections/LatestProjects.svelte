<script lang="ts">
    import SplideCarousel from "$lib/components/SplideCarousel.svelte";
    import { dataVizProjects } from "$lib/data/dataVizProjects";
</script>

<section
    id="latest-projects"
    class="py-12 px-4 bg-white flex items-center justify-center"
>
    <div
        class="container mx-auto max-w-6xl transition-all duration-200 ease-out"
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
