<script lang="ts">
    import { portfolioItems } from "$lib/data/portfolio";
</script>

<section class="py-20 px-4">
    <div class="container mx-auto max-w-6xl">
        <h2 class="text-4xl font-bold text-center mb-12">Portfolio</h2>
        <p class="text-xl text-center opacity-80 mb-12 max-w-2xl mx-auto">
            A collection of data visualizations I'm quite happy with since I
            started participating (a bit) to challenges such as the
            #30DayChartChallenge.
        </p>

        <div class="mb-12 flex justify-center">
            <ul class="steps">
                <li class="step step-primary">
                    <a
                        href="https://guillaume-noblet.com/TidyTuesday/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cursor-pointer hover:text-accent font-family-heading"
                    >
                        #TidyTuesday
                    </a>
                </li>
                <li class="step step-primary">
                    <a
                        href="https://guillaume-noblet.com/30DayMapChallenge/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cursor-pointer hover:text-accent font-family-heading"
                    >
                        #30DayMapChallenge
                    </a>
                </li>
                <li class="step step-primary">
                    <a
                        href="https://guillaume-noblet.com/30DayChartChallenge/"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="cursor-pointer hover:text-accent font-family-heading"
                    >
                        #30DayChartChallenge
                    </a>
                </li>
            </ul>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
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
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden block {item.portfolioUrl &&
                    item.portfolioUrl !== '#'
                        ? 'cursor-pointer'
                        : 'cursor-default'}"
                >
                    <figure
                        class="relative overflow-hidden aspect-square rounded-t-2xl"
                    >
                        <img
                            src={item.thumbnailUrl}
                            alt={item.title}
                            class="w-full h-full object-cover object-top"
                            on:error={(e) => {
                                e.currentTarget.src =
                                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Cpath fill="%239ca3af" d="M0 0h400v300H0z"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23fff"%3EViz%3C/text%3E%3C/svg%3E';
                            }}
                        />
                        <!-- Hover overlay -->
                        <div
                            class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center p-6 text-center"
                        >
                            <div
                                class="absolute inset-0 bg-black opacity-60"
                            ></div>
                            <div class="relative z-10">
                                <h3 class="text-2xl font-bold text-white mb-2">
                                    {item.title}
                                </h3>
                                <p class="text-sm text-white opacity-90">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    </figure>
                </a>
            {/each}
        </div>
    </div>
</section>
