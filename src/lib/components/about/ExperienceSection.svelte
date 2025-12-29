<script lang="ts">
    import { experiences } from "$lib/data/experiences";
</script>

<ul
    class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
>
    {#each experiences as exp, index}
        <li>
            <div class="timeline-middle">
                {#if exp.title === "More to come..."}
                    <!-- Heroicon: ellipsis-horizontal-circle -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="w-5 h-5 text-primary-content"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
                    </svg>
                {:else}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        class="h-5 w-5 text-primary-content opacity-70"
                    >
                        <path
                            fill-rule="evenodd"
                            d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                            clip-rule="evenodd"
                        />
                    </svg>
                {/if}
            </div>
            <div
                class={index % 2 === 0
                    ? "timeline-start md:text-end mb-10"
                    : "timeline-end mb-10"}
            >
                <time class="font-mono text-sm">{exp.period}</time>
                <div
                    class="text-lg font-black text-primary-content opacity-80 mt-1 opac"
                >
                    {exp.company}
                </div>
                <!-- {#if exp.title !== "More to come..."} -->
                <div class="text-xl font-bold mt-1">
                    {exp.title}
                </div>
                <!-- {/if} -->
                {#if exp.description}
                    <p class="mt-2 text-base opacity-90">
                        {exp.description}
                    </p>
                {/if}
            </div>
            <hr class="bg-primary" />
        </li>
    {/each}
</ul>
