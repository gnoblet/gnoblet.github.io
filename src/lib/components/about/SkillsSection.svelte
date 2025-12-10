<script lang="ts">
    interface Skill {
        category: string;
        items: string[];
    }

    let skills: Skill[] = [
        {
            category: "Frontend",
            items: [
                "Svelte",
                "SvelteKit",
                "React",
                "TypeScript",
                "Tailwind CSS",
                "HTML5",
                "CSS3",
            ],
        },
        {
            category: "Backend",
            items: [
                "Node.js",
                "Python",
                "REST APIs",
                "GraphQL",
                "PostgreSQL",
                "MongoDB",
            ],
        },
        {
            category: "Tools & Others",
            items: ["Git", "Docker", "VS Code", "Figma", "CI/CD", "Agile"],
        },
    ];
</script>

<div class="space-y-6">
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
                            class="badge badge-outline badge-lg py-4 px-4 hover:badge-primary transition-all cursor-default"
                        >
                            {skill}
                        </div>
                    {/each}
                </div>
            </div>
        </div>
    {/each}

    <!-- Additional Skills Info -->
    <div class="alert alert-info">
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
        <span>I'm always learning and adding new skills to my toolkit!</span>
    </div>
</div>
