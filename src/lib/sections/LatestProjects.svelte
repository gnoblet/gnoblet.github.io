<script lang="ts">
    import SplideCarousel from "$lib/components/SplideCarousel.svelte";
    import { projects } from "$lib/data/projects";
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
        <SplideCarousel items={projects.slice(0, 5)} />
        <div class="text-center mt-8">
            <a
                href="/projects"
                class="btn btn-primary btn-lg inline-flex items-center gap-2"
            >
                View All Projects
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                    />
                </svg>
            </a>
        </div>
    </div>
</section>
