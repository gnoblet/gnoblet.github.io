<script lang="ts">
    import { experiences } from "$lib/data/experiences";
</script>

<h3 class="card-title font-bold text-2xl mb-4">Experience</h3>

<ul
    class="timeline timeline-snap-icon max-md:timeline-compact timeline-vertical"
>
    {#each experiences as exp, index}
        <li>
            <div class="timeline-middle">
                {#if exp.title === "More to come..."}
                    <div class="neon-dot w-3 h-3 border-2 border-primary"></div>
                {:else}
                    <div class="neon-dot w-3 h-3 bg-primary"></div>
                {/if}
            </div>
            <div
                class={index % 2 === 0
                    ? "timeline-start md:text-end mb-10"
                    : "timeline-end mb-10"}
            >
                <time class="font-mono text-base">{exp.period}</time>
                <div
                    class="text-lg font-black text-primary exmt-1"
                >
                    {exp.company}
                    {#if exp.location}
                        <span class="text-base-content text-sm font-normal"> ⋅ {exp.location}</span>
                    {/if}
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
                {#if exp.technologies && exp.technologies.length > 0}
                    <div
                        class={index % 2 === 0
                            ? "flex flex-wrap gap-2 mt-3 justify-end"
                            : "flex flex-wrap gap-2 mt-3"}
                    >
                        {#each exp.technologies as tech}
                            <span class="badge badge-outline">{tech}</span>
                        {/each}
                    </div>
                {/if}
            </div>
            <hr class="bg-primary" />
        </li>
    {/each}
</ul>
