<script lang="ts">
    import type { Experience } from "$lib/types/experience";
    import { experiences } from "$lib/data/experiences";
</script>

<ul
    class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
>
    {#each experiences as exp, index}
        <li>
            <div class="timeline-middle">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    class="h-5 w-5 text-primary"
                >
                    <path
                        fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                        clip-rule="evenodd"
                    />
                </svg>
            </div>
            <div
                class={index % 2 === 0
                    ? "timeline-start md:text-end mb-10"
                    : "timeline-end mb-10"}
            >
                <time class="font-mono italic text-sm opacity-70"
                    >{exp.period}</time
                >
                <div class="text-lg font-black text-primary mt-1">
                    {exp.company}
                </div>
                <div class="text-xl font-bold mt-1">
                    {exp.title}
                </div>
                <p class="mt-2 text-base opacity-90">
                    {exp.description}
                </p>
            </div>
            <hr class="bg-primary" />
        </li>
    {/each}

    <!-- Future Timeline Item -->
    <li>
        <hr class="bg-primary" />
        <div class="timeline-middle">
            <!-- Heroicon: ellipsis-horizontal-circle -->
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-5 h-5 text-primary"
            >
                <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M8.625 12a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
            </svg>
        </div>
        <div class="timeline-end mb-10">
            <div class="text-lg font-black">More to come...</div>
            <p class="text-sm opacity-70">The journey continues</p>
        </div>
    </li>
</ul>
