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
                    <div class="w-3 h-3 border-2 border-primary "></div>
                {:else}
                    <div class="w-3 h-3 bg-primary"></div>
                {/if}
            </div>
            <div
                class={index % 2 === 0
                    ? "timeline-start md:text-end mb-10"
                    : "timeline-end mb-10"}
            >
                <time class="font-mono text-sm">{exp.period}</time>
                <div
                    class="text-lg font-black text-primary opacity-80 mt-1"
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
