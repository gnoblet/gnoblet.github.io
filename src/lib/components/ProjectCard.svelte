<script lang="ts">
    import type { Project } from "$lib/types/project";
    import { borderDraw } from "$lib/actions/borderDraw.svelte";

    export let project: Project;
    export let showDescription: boolean = true;
    export let maxTags: number = 4;
    // Allow consumers to pass extra classes (e.g. for grid sizing)
    export let className: string = "";
</script>

<div
    class={`card neon-item bg-base-100 transition-all duration-300 group overflow-hidden h-full border-draw border-l-0 ${className}`}
    use:borderDraw
>
    <figure class="relative overflow-hidden bg-base-200 h-48">
        <img
            src={project.imageUrl}
            alt={project.title}
            class="w-full h-full object-contain transition-transform duration-500 group-hover:scale-150"
            on:error={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Cpath fill="%239ca3af" d="M0 0h400v300H0z"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23fff"%3EProject%3C/text%3E%3C/svg%3E';
            }}
        />
        {#if project.badge}
            <div
                class="absolute top-4 right-4 badge badge-primary badge-outline badge-md"
            >
                {project.badge}
            </div>
        {/if}
    </figure>

    <div class="card-body">
        <h3 class="card-title text-xl leading-tight">
            {project.title}
        </h3>

        {#if showDescription}
            <p class="text-base line-clamp-3">
                {project.shortDescription ?? project.description}
            </p>
        {/if}

        <div class="flex flex-wrap gap-2 mb-4">
            {#each project.tags.slice(0, maxTags) as tag}
                <span class="badge badge-outline badge-sm">
                    {tag}
                </span>
            {/each}
            {#if project.tags.length > maxTags}
                <span class="badge badge-outline badge-md">
                    +{project.tags.length - maxTags}
                </span>
            {/if}
        </div>

        <div class="card-actions justify-end">
            <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-ghost btn-draw btn-sm text-base"
                use:borderDraw
            >
                View Project
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-5 w-5 ml-1"
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
        </div>
    </div>
</div>

<style>
    .line-clamp-3 {
        display: -webkit-box;
        -webkit-line-clamp: 3;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }
</style>
