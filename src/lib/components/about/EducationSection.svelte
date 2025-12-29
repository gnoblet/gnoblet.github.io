<script lang="ts">
    import { education } from "$lib/data/education";
</script>

<div class="space-y-6 max-w-3xl mx-auto">
    {#each education as edu}
        <div
            class="card bg-base-200 shadow-md hover:shadow-lg transition-shadow"
        >
            <div class="card-body py-4">
                <div class="flex items-start gap-2">
                    <div class="grow">
                        <!-- Period -->
                        <div class="text-base font-mono mb-1">
                            ⌛ {edu.period}
                        </div>

                        <!-- Degree -->
                        <div class="text-lg font-semibold mb-1">
                            🎓 {edu.degree}
                        </div>

                        <!-- Institution -->
                        <div class="text-lg">
                            🏫 {edu.institution}
                        </div>

                        <!-- <!-- Thesis -->
                        <!-- {#if edu.thesis}
                            <div class="text-base opacity-90">
                                📝 <span class="italic">
                                    Thesis: {edu.thesis}</span
                                >
                            </div>
                        {/if} -->
                    </div>
                </div>
            </div>
        </div>
    {/each}
</div>
