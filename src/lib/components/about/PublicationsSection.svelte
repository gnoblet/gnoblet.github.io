<script lang="ts">
    import { publications } from "$lib/data/publications";
</script>

<div class="space-y-6">
    <div class="space-y-6 max-w-3xl mx-auto">
        {#each publications as pub}
            <div
                class="card bg-base-200 shadow-md hover:shadow-lg transition-shadow"
            >
                <div class="card-body py-4">
                    <div class="flex items-start gap-3">
                        <!-- Book/Document Icon -->
                        <div class="shrink-0 mt-1">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="size-6 text-primary-content"
                            >
                                <path
                                    d="M5.625 1.5c-1.036 0-1.875.84-1.875 1.875v17.25c0 1.035.84 1.875 1.875 1.875h12.75c1.035 0 1.875-.84 1.875-1.875V12.75A3.75 3.75 0 0 0 16.5 9h-1.875a1.875 1.875 0 0 1-1.875-1.875V5.25A3.75 3.75 0 0 0 9 1.5H5.625Z"
                                />
                                <path
                                    d="M12.971 1.816A5.23 5.23 0 0 1 14.25 5.25v1.875c0 .207.168.375.375.375H16.5a5.23 5.23 0 0 1 3.434 1.279 9.768 9.768 0 0 0-6.963-6.963Z"
                                />
                            </svg>
                        </div>

                        <div class="grow">
                            <!-- Authors and Year -->
                            <div class="text-lg text-primary-content mb-1">
                                {pub.authors} ({pub.year})
                            </div>

                            <!-- Title -->
                            <div class="text-lg mb-1">
                                {pub.title}
                            </div>

                            <!-- Journal Info -->
                            <div class="text-base opacity-80">
                                <span class="italic">{pub.journal}</span>
                                {#if pub.volume}
                                    , <span class="font-medium"
                                        >{pub.volume}</span
                                    >
                                {/if}
                                {#if pub.issue}
                                    ({pub.issue})
                                {/if}
                                {#if pub.pages}
                                    , {pub.pages}
                                {/if}
                            </div>
                        </div>
                        <div>
                            <!-- Optional DOI/URL -->
                            {#if pub.doi || pub.url}
                                <div class="mt-2">
                                    {#if pub.doi}
                                        <a
                                            href="https://doi.org/{pub.doi}"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="btn btn-primary"
                                        >
                                            View
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4 ml-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        </a>
                                    {:else if pub.url}
                                        <a
                                            href={pub.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            class="btn btn-primary"
                                        >
                                            View
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                class="h-4 w-4 ml-1"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                            >
                                                <path
                                                    stroke-linecap="round"
                                                    stroke-linejoin="round"
                                                    stroke-width="2"
                                                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                                                />
                                            </svg>
                                        </a>
                                    {/if}
                                </div>
                            {/if}
                        </div>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
