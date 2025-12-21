<script lang="ts">
    import { portfolioItems } from "$lib/data/portfolio";
    import { Tooltip } from "flowbite-svelte";
    import { slide, scale, blur } from "svelte/transition";
</script>

<section class="py-20 px-4 bg-neutral-content/60">
    <div class="container mx-auto max-w-6xl">
        <h2 class="text-4xl font-bold text-center mb-12">Portfolio</h2>
        <p class="text-xl text-center mb-12 max-w-2xl mx-auto">
            A collection of data visualizations I'm quite happy with since I
            started participating (a bit) to challenges such as the
            #30DayChartChallenge.
        </p>

        <div class="mb-12 flex justify-center items-center">
            <ul
                class="steps steps-vertical md:steps-horizontal max-w-3xl md:w-full text-lg justify-center mx-auto"
            >
                <li class="step step-primary">
                    <a
                        href="https://guillaume-noblet.com/TidyTuesday/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cursor-pointer hover:text-primary-content"
                        id="tidytuesday-link"
                    >
                        #TidyTuesday
                    </a>
                    <Tooltip
                        triggeredBy="#tidytuesday-link"
                        placement="top"
                        class="w-96 max-w-lg border-2 border-primary-content"
                    >
                        <h3
                            class="text-xl font-bold mb-2 mt-2 text-base-content"
                        >
                            #TidyTuesday
                        </h3>
                        <img
                            src="/images/previews/tidytuesday-preview.png"
                            alt="TidyTuesday preview"
                            class="w-full rounded-lg py-2 px-4"
                        />
                    </Tooltip>
                </li>

                <li class="step step-primary">
                    <a
                        href="https://guillaume-noblet.com/30DayChartChallenge/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cursor-pointer hover:text-primary-content"
                        id="chart-link"
                    >
                        #30DayChartChallenge
                    </a>
                    <Tooltip
                        triggeredBy="#chart-link"
                        placement="top"
                        class="w-96 max-w-lg border-2 border-primary-content"
                    >
                        <h3
                            class="text-xl font-bold mb-2 mt-2 text-base-content"
                        >
                            #30DayChartChallenge
                        </h3>
                        <img
                            src="/images/previews/30daychart-preview.png"
                            alt="30DayChartChallenge preview"
                            class="w-full rounded-lg py-2 px-4"
                        />
                    </Tooltip>
                </li>

                <li class="step step-primary">
                    <a
                        href="https://guillaume-noblet.com/30DayMapChallenge/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cursor-pointer hover:text-primary-content"
                        id="map-link"
                    >
                        #30DayMapChallenge
                    </a>
                    <Tooltip
                        triggeredBy="#map-link"
                        placement="top"
                        class="w-96 max-w-lg border-2 border-primary-content"
                    >
                        <h3
                            class="text-xl font-bold mb-2 mt-2 text-base-content"
                        >
                            #30DayMapChallenge
                        </h3>
                        <img
                            src="/images/previews/30daymap-preview.png"
                            alt="30DayMapChallenge preview"
                            class="w-full rounded-lg py-2 px-4"
                        />
                    </Tooltip>
                </li>
            </ul>
        </div>

        <div class="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {#each portfolioItems as item}
                <a
                    href={item.portfolioUrl && item.portfolioUrl !== "#"
                        ? item.portfolioUrl
                        : undefined}
                    target={item.portfolioUrl && item.portfolioUrl !== "#"
                        ? "_blank"
                        : undefined}
                    rel={item.portfolioUrl && item.portfolioUrl !== "#"
                        ? "noopener noreferrer"
                        : undefined}
                    class="block relative aspect-square rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl group hover:scale-103 duration-300 transition-all"
                >
                    <img
                        src={item.thumbnailUrl}
                        alt={item.title}
                        class="w-full h-full object-cover object-center"
                    />
                    <!-- Hover overlay -->
                    <div
                        class="absolute inset-0 bg-primary-content/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center"
                    >
                        <h3 class="text-2xl font-bold text-base-100 mb-2">
                            {item.title}
                        </h3>
                        <p class="text-lg text-base-100">
                            {item.description}
                        </p>
                    </div>
                </a>
            {/each}
        </div>
    </div>
</section>
