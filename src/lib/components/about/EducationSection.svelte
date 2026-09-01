<script lang="ts">
    import { education } from "$lib/data/education";
    import { borderDraw } from "$lib/actions/borderDraw.svelte";
</script>

<div>
    <h3 class="card-title font-bold text-2xl mb-4">Education</h3>

    <div class="space-y-6">
        {#each education as edu}
            <div class="card bg-base-100 border-draw neon-item border-l-0" use:borderDraw>
                <div class="card-body py-4">
                    <div class="flex items-start gap-3">
                        <div class="grow">
                            <div class="font-mono text-primary mb-1">{edu.period}</div>
                            <div class="font-bold mb-1">{edu.degree}</div>
                            <div> {edu.institution}</div>
                            {#if edu.thesis}
                                <div class="text-sm italic mt-1">{edu.thesis}</div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
