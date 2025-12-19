<script lang="ts">
    import SocialLinks from "$lib/components/SocialLinks.svelte";
    import AboutSection from "$lib/components/about/AboutSection.svelte";
    import SkillsSection from "$lib/components/about/SkillsSection.svelte";
    import ExperienceSection from "$lib/components/about/ExperienceSection.svelte";

    let activeTab: "about" | "skills" | "experience" = "about";
</script>

<section id="about-me" class="py-20 px-4 bg-base-100">
    <div class="container mx-auto max-w-6xl">
        <!-- Header Section -->
        <div class="text-center mb-16">
            <h2 class="text-5xl font-bold mb-4">About Me</h2>

            <p class="text-xl max-w-2xl mx-auto mb-8">
                Humanitarian researcher passionate about using data to make a
                difference
            </p>
        </div>

        <!-- Tabs Navigation -->
        <div class="flex justify-center mb-12">
            <div class="tabs tabs-boxed bg-base-200 p-2">
                <button
                    type="button"
                    class="tab tab-lg"
                    class:tab-active={activeTab === "about"}
                    on:click={() => (activeTab = "about")}
                >
                    <!-- Heroicon: user -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5 mr-2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                        />
                    </svg>
                    About
                </button>
                <button
                    type="button"
                    class="tab tab-lg"
                    class:tab-active={activeTab === "skills"}
                    on:click={() => (activeTab = "skills")}
                >
                    <!-- Heroicon: light-bulb -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5 mr-2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M12 18v-5.25m0 0a6.01 6.01 0 0 0 1.5-.189m-1.5.189a6.01 6.01 0 0 1-1.5-.189m3.75 7.478a12.06 12.06 0 0 1-4.5 0m3.75 2.383a14.406 14.406 0 0 1-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 1 0-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
                        />
                    </svg>
                    Skills
                </button>
                <button
                    type="button"
                    class="tab tab-lg"
                    class:tab-active={activeTab === "experience"}
                    on:click={() => (activeTab = "experience")}
                >
                    <!-- Heroicon: briefcase -->
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="h-5 w-5 mr-2"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                        />
                    </svg>
                    Experience
                </button>
            </div>
        </div>

        <!-- Content Sections -->
        <div class="max-w-5xl mx-auto">
            {#if activeTab === "about"}
                <AboutSection />
            {:else if activeTab === "skills"}
                <SkillsSection />
            {:else if activeTab === "experience"}
                <ExperienceSection />
            {/if}
        </div>
    </div>
</section>

<style>
    .tab-active {
        background-color: hsl(var(--p) / 0.2);
    }
</style>
