<script lang="ts">
    interface Skill {
        category: string;
        items: string[];
    }

    let skills: Skill[] = [
        {
            category: "Research & Analysis",
            items: [
                "Statistical Analysis",
                "Economic Modeling",
                "Data Structuration",
                "Quantitative Surveys",
            ],
        },
        {
            category: "Project Management",
            items: [
                "Horizontal Project Management",
                "Capacity Building",
                "Training",
                "Nation-Wide Data Collection",
            ],
        },
        {
            category: "Programming & Development",
            items: ["R", "Python", "Package Development", "Data Pipelines"],
        },
        {
            category: "Data Visualization",
            items: ["ggplot2", "matplotlib", "d3.js", "QGIS"],
        },
        {
            category: "Web Dev & Reporting",
            items: ["Shiny", "Quarto", "Typst", "Svelte", "React"],
        },
        {
            category: "Tools & Environment",
            items: ["VS Code", "Positron", "Linux", "Kobo Toolbox"],
        },
    ];
</script>

<div class="space-y-6">
    <!-- Self-taught intro with hero layout -->
    <div class="hero bg-base-200 rounded-lg mb-8">
        <div class="hero-content flex-col lg:flex-row gap-8 py-8">
            <img
                src="/images/memes/skills.jpg"
                alt="Self-taught skills meme showing multiple skills being offered at once"
                class="max-w-sm rounded-lg shadow-2xl"
            />
            <div class="px-6 lg:px-8 py-4">
                <p class="text-lg">
                    I love being self-taught, and most of what I know came from
                    diving in and figuring things out. I'm exceptionally good at
                    some skills and still developing others, but I'll always
                    take the time to learn whatever I need to get the job done.
                    This list might seem overwhelming or incomplete, but it's
                    genuinely me!
                </p>
            </div>
        </div>
    </div>

    <!-- 2x3 Grid Layout -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        {#each skills as skillGroup}
            <div class="card bg-base-100 shadow-xl">
                <div class="card-body">
                    <h3 class="card-title text-2xl mb-4 flex items-center">
                        <span class="badge badge-primary badge-lg mr-2"
                            >{skillGroup.category}</span
                        >
                    </h3>

                    <div class="flex flex-wrap gap-3">
                        {#each skillGroup.items as skill}
                            <div
                                class="badge badge-outline badge-md py-4 px-4 hover:text-primary-content transition-all cursor-default"
                            >
                                {skill}
                            </div>
                        {/each}
                    </div>
                </div>
            </div>
        {/each}
    </div>

    <!-- Additional Skills Info -->
    <div class="alert text-accent-content bg-accent">
        <!-- Heroicon: information-circle -->
        <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="stroke-current shrink-0 w-6 h-6"
        >
            <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m11.25 11.25.041-.02a.75.75 0 0 1 1.063.852l-.708 2.836a.75.75 0 0 0 1.063.853l.041-.021M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9-3.75h.008v.008H12V8.25Z"
            />
        </svg>
        <span>
            Things I'm good at, enjoy, and feel somewhat passionate about!
        </span>
    </div>
</div>
