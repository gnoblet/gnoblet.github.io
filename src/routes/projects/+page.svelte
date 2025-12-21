<script lang="ts">
    import { onMount } from "svelte";
    import type { Project } from "$lib/types/project";
    import { projects } from "$lib/data/projects";

    let selectedFilter = "all";
    let filteredProjects = projects;

    // Get unique tags from all projects
    $: allTags = [...new Set(projects.flatMap((p) => p.tags))];

    // Filter projects based on selected tag
    $: {
        if (selectedFilter === "all") {
            filteredProjects = projects;
        } else {
            filteredProjects = projects.filter((p) =>
                p.tags.includes(selectedFilter),
            );
        }
    }

    onMount(() => {
        // Any initialization code
    });
</script>

<svelte:head>
    <title>Projects | Gnoblet</title>
    <meta
        name="description"
        content="Browse my portfolio of web development projects and applications."
    />
</svelte:head>

<div class="min-h-screen py-20 px-4">
    <div class="container mx-auto max-w-7xl">
        <!-- Header -->
        <div class="text-center mb-16">
            <h1 class="text-5xl font-bold mb-4">My Projects</h1>
            <p class="text-xl opacity-80 max-w-2xl mx-auto">
                A collection of projects I've worked on, showcasing different
                technologies and approaches to problem-solving.
            </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center mb-12 max-w-4xl mx-auto">
            <div class="tabs tabs-boxed bg-base-300 p-2">
                <button
                    class="tab"
                    class:tab-active={selectedFilter === "all"}
                    on:click={() => (selectedFilter = "all")}
                >
                    All Projects
                </button>
                {#each allTags as tag}
                    <button
                        class="tab"
                        class:tab-active={selectedFilter === tag}
                        on:click={() => (selectedFilter = tag)}
                    >
                        {tag}
                    </button>
                {/each}
            </div>
        </div>

        <!-- Projects Grid -->
        {#if filteredProjects.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each filteredProjects as project (project.id)}
                    <div
                        class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 relative"
                    >
                        {#if project.badge}
                            <div
                                class="badge {project.badge === 'new'
                                    ? 'badge-accent'
                                    : 'badge-secondary'} absolute -top-2 -right-2 z-10 font-family-headingb"
                            >
                                {project.badge.toUpperCase()}
                            </div>
                        {/if}
                        <figure class="px-4 pt-4">
                            <img
                                src={project.imageUrl}
                                alt={project.title}
                                class="rounded-xl w-full h-48 object-cover"
                                on:error={(e) => {
                                    e.currentTarget.src =
                                        'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"%3E%3Crect fill="%23e5e7eb" width="400" height="300"/%3E%3Cpath fill="%239ca3af" d="M0 0h400v300H0z"/%3E%3Cpath fill="%23fff" d="M150 100h100v100H150z"/%3E%3C/svg%3E';
                                }}
                            />
                        </figure>

                        <div class="card-body">
                            <h2 class="card-title">
                                {project.title}
                            </h2>
                            <p class="text-sm opacity-80">
                                {project.description}
                            </p>

                            <!-- Tags -->
                            <div class="flex flex-wrap gap-2 mt-4">
                                {#each project.tags as tag}
                                    <div class="badge badge-outline badge-sm">
                                        {tag}
                                    </div>
                                {/each}
                            </div>

                            <!-- Actions -->
                            <div class="card-actions justify-end mt-4">
                                <a
                                    href={project.projectUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    class="btn btn-primary btn-sm"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        class="h-5 w-5"
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
                                    View Project
                                </a>
                            </div>
                        </div>
                    </div>
                {/each}
            </div>
        {:else}
            <div class="text-center py-20">
                <p class="text-xl opacity-60">
                    No projects found with the selected filter.
                </p>
            </div>
        {/if}

        <!-- Call to Action -->
        <div class="text-center mt-20 p-10 bg-base-200 rounded-3xl">
            <h2 class="text-3xl font-bold mb-4">Want to collaborate?</h2>
            <p class="text-lg opacity-80 mb-6">
                I'm always interested in hearing about new projects and
                opportunities.
            </p>
            <a
                href="mailto:data@guillaume-noblet.com"
                class="btn btn-primary btn-lg"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    class="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                </svg>
                Get in Touch
            </a>
        </div>
    </div>
</div>
