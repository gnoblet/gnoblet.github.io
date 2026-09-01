<script lang="ts">
    import SplideCarousel from "$lib/components/SplideCarousel.svelte";
    import { projects } from "$lib/data/projects";
    import { borderDraw } from "$lib/actions/borderDraw.svelte";
</script>

<section
    id="latest-projects"
    class="py-20 px-4 bg-base-100 flex items-center justify-center"
>
    <div
        class="section-container transition-all duration-200 ease-out"
    >
        <div class="mb-8">
            <h2 class="section-title">Latest Projects</h2>
            <p class="section-subtitle">
                Check out my most recent work and ongoing projects.
            </p>
        </div>
        <SplideCarousel items={projects.slice(0, 5)} />
        <div class="text-center mt-8">
            <a
                href="/projects"
                class="btn btn-outline btn-draw btn-lg "
                use:borderDraw
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
