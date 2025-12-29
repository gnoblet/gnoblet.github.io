<script lang="ts">
    import type { Project } from "$lib/types/project";

    export let project: Project;
    export let showDescription: boolean = true;
    export let maxTags: number = 4;
    // Allow consumers to pass extra classes (e.g. for grid sizing)
    export let className: string = "";
</script>

<div
    class={`card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-500 group overflow-hidden h-full border-2 border-transparent hover:border-primary-content ${className}`}
>
    <figure
        class="relative overflow-hidden bg-base-200 h-64 flex items-center justify-center p-8"
    >
        <img
            src={project.imageUrl}
            alt={project.title}
            class="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110"
            on:error={(e) => {
                (e.currentTarget as HTMLImageElement).src =
                    'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Cpath fill="%239ca3af" d="M0 0h400v300H0z"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="sans-serif" font-size="24" fill="%23fff"%3EProject%3C/text%3E%3C/svg%3E';
            }}
        />
        {#if project.badge}
            <div
                class="absolute top-4 right-4 badge
                {project.badge === 'new'
                    ? 'badge-primary'
                    : project.badge === 'ongoing'
                      ? 'badge-accent'
                      : project.badge === 'V1'
                        ? 'badge-secondary'
                        : 'badge-info'}
                badge-lg font-bold uppercase"
            >
                {project.badge}
            </div>
        {/if}
    </figure>

    <div class="card-body">
        <h3 class="card-title text-2xl mb-2">
            {project.title}
        </h3>

        {#if showDescription}
            <p class="text-lg line-clamp-3 mb-2">
                {project.shortDescription ?? project.description}
            </p>
        {/if}

        <div class="flex flex-wrap gap-2 mb-4">
            {#each project.tags.slice(0, maxTags) as tag}
                <span class="badge badge-outline badge-lg text-sm">
                    {tag}
                </span>
            {/each}
            {#if project.tags.length > maxTags}
                <span class="badge badge-outline badge-lg text-sm">
                    +{project.tags.length - maxTags}
                </span>
            {/if}
        </div>

        <div class="card-actions justify-end">
            <a
                href={project.projectUrl}
                target="_blank"
                rel="noopener noreferrer"
                class="btn btn-primary btn-sm text-base"
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
