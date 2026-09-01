<script lang="ts">
    import SplideCarousel from "$lib/components/SplideCarousel.svelte";
    import { projects } from "$lib/data/projects";
    import { borderDraw } from "$lib/actions/borderDraw.svelte";

    const featured = projects.find((p) => p.featured) ?? projects[0];
</script>

<section
    id="latest-projects"
    class="py-20 bg-base-100 flex items-center justify-center"
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

        <div class="text-center mt-20 mb-8">
            <p class="section-subtitle">
                See below one project I'm particularly proud of, which was my last gig in June.
            </p>
        </div>

        <div class="card lg:card-side bg-base-100 neon-item border-draw " use:borderDraw>
            <figure class="lg:w-1/2 lg:shrink-0 p-4">
                <img src={featured.imageUrl} alt={featured.title} class="w-full h-full object-contain" />
            </figure>
            <div class="card-body p-8 lg:p-10">
                <div class="badge badge-primary">Featured</div>
                <h3 class="card-title text-2xl mt-2">{featured.title}</h3>
                <p class="text-lg">{featured.description}</p>
                <div class="flex flex-wrap gap-2  mb-4">
                    {#each featured.tags as tag}
                        <span class="badge badge-outline">{tag}</span>
                    {/each}
                </div>
                <div class="card-actions justify-end">
                    <a
                        href={featured.projectUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="btn btn-ghost btn-draw btn-sm text-base"
                        use:borderDraw
                    >
                        View Project
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-5 w-5 ml-1"
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
