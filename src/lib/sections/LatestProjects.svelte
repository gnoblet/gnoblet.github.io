<script lang="ts">
    import HorizontalCarousel from "$lib/components/HorizontalCarousel.svelte";
    import MapBasinBackground from "$lib/components/MapBasinBackground.svelte";
    import { dataVizProjects } from "$lib/data/dataVizProjects";
</script>

<section class="py-20 px-4 bg-base-200 relative overflow-hidden">
    <div class=" bg-white opacity-50">
        <MapBasinBackground></MapBasinBackground>
    </div>
    <div class="container mx-auto max-w-7xl relative z-10">
        <div class="text-center mb-8">
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
