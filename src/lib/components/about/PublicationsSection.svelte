<script lang="ts">
    import { publications } from "$lib/data/publications";
    import { borderDraw } from "$lib/actions/borderDraw.svelte";
</script>

<div>
    <h3 class="card-title font-bold text-2xl mb-4">Publications</h3>

    <div class="space-y-6">
        {#each publications as pub}
            {@const href = pub.doi ? `https://doi.org/${pub.doi}` : pub.url}
            <svelte:element
                this={href ? 'a' : 'div'}
                {href}
                target={href ? '_blank' : undefined}
                rel={href ? 'noopener noreferrer' : undefined}
                class="card bg-base-100 border-draw neon-item border-l-0 {href ? 'cursor-pointer' : ''}"
                use:borderDraw
            >
                <div class="card-body py-4">
                    <div class="flex items-center gap-4 justify-between">
                        <div class="grow">
                            <div class="font-mono  text-primary mb-1">{pub.authors} ({pub.year})</div>
                            <div class="font-bold mb-1">{pub.title}</div>
                            <div>
                                <span class="italic">{pub.journal}</span>
                                {#if pub.volume}, <span class="font-medium">{pub.volume}</span>{/if}
                                {#if pub.issue} ({pub.issue}){/if}
                                {#if pub.pages}, {pub.pages}{/if}
                            </div>
                        </div>
                    </div>
                </div>
            </svelte:element>
        {/each}
    </div>
</div>
