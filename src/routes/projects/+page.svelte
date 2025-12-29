<script lang="ts">
    import { onMount } from "svelte";
    import { fade } from "svelte/transition";
    import { flip } from "svelte/animate";
    import { cubicOut } from "svelte/easing";
    import { projects } from "$lib/data/projects";
    import ProjectCard from "$lib/components/ProjectCard.svelte";
    import Tabs from "$lib/components/Tabs.svelte";
    import Tab from "$lib/components/Tab.svelte";

    let selectedFilter = "all";
    let filteredProjects = projects;

    function handleTabSelect(e: CustomEvent) {
        // update filter (simple: no visual feedback state)
        selectedFilter = e.detail.value;
    }

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
            <h1 class="text-4xl font-bold mb-4">My Projects</h1>
            <p class="text-2xl opacity-80 max-w-2xl mx-auto">
                Check out a (small) collection of projects I've worked on.
            </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center mb-12 max-w-4xl mx-auto">
            <Tabs boxed size="lg" className="p-2">
                <Tab
                    active={selectedFilter === "all"}
                    value="all"
                    on:select={handleTabSelect}
                >
                    All Projects
                </Tab>
                {#each allTags as tag}
                    <Tab
                        active={selectedFilter === tag}
                        value={tag}
                        on:select={handleTabSelect}
                    >
                        {tag}
                    </Tab>
                {/each}
            </Tabs>
        </div>

        <!-- Projects Grid -->
        {#if filteredProjects.length > 0}
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {#each filteredProjects as project (project.id)}
                    <div
                        animate:flip={{ duration: 400, easing: cubicOut }}
                        in:fade={{ duration: 400 }}
                        out:fade={{ duration: 200 }}
                    >
                        <ProjectCard
                            {project}
                            showDescription={true}
                            maxTags={4}
                        />
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
