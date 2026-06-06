<script lang="ts">
    import { education } from "$lib/data/education";
</script>

<div class="space-y-6 max-w-3xl mx-auto">
    {#each education as edu}
        <div class="card bg-base-100">
            <div class="card-body py-4">
                <div class="flex items-start gap-3">
                    <div class="grow">
                        <div class="font-mono text-sm text-primary opacity-70 mb-1">{edu.period}</div>
                        <div class="text-lg font-bold mb-1">{edu.degree}</div>
                        <div class="text-base opacity-80">{edu.institution}</div>
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
