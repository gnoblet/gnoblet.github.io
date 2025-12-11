<script lang="ts">
    import MapBasinBackground from "$lib/components/MapBasinBackground.svelte";
</script>

<section class="py-32 px-4 bg-base-300 relative overflow-hidden min-h-screen">
    <MapBasinBackground />
    <div class="container mx-auto max-w-7xl relative z-10">
        <div class="text-center">
            <h2 class="text-5xl font-bold mb-6">World River Basins</h2>
            <p class="text-xl opacity-80 max-w-3xl mx-auto mb-8">
                Watch as water flows through the world's major river systems.
                Each glowing particle represents water flowing from tributaries
                to the main rivers and eventually to the ocean.
            </p>
            <div class="text-sm opacity-60">
                Data source: Natural Earth
            </div>
        </div>
    </div>
</section>
