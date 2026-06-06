<script lang="ts">
    import { publications } from "$lib/data/publications";
</script>

<div class="space-y-6 max-w-3xl mx-auto">
    {#each publications as pub}
        {@const href = pub.doi ? `https://doi.org/${pub.doi}` : pub.url}
        <svelte:element
            this={href ? 'a' : 'div'}
            {href}
            target={href ? '_blank' : undefined}
            rel={href ? 'noopener noreferrer' : undefined}
            class="card bg-base-100 {href ? 'cursor-pointer' : ''}"
        >
            <div class="card-body py-4">
                <div class="flex items-center gap-4 justify-between">
                    <div class="grow">
                        <div class="font-mono text-sm text-primary mb-1">{pub.authors} ({pub.year})</div>
                        <div class="text-lg font-bold mb-1">{pub.title}</div>
                        <div class="text-base opacity-80">
                            <span class="italic">{pub.journal}</span>
                            {#if pub.volume}, <span class="font-medium">{pub.volume}</span>{/if}
                            {#if pub.issue} ({pub.issue}){/if}
                            {#if pub.pages}, {pub.pages}{/if}
                        </div>
                    </div>
                    {#if href}
                        <span class="btn btn-primary btn-sm shrink-0 pointer-events-none">
                            View
                            <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                        </span>
                    {/if}
                </div>
            </div>
        </svelte:element>
    {/each}
</div>
