<script lang="ts">
    import { fade } from "svelte/transition";
    import Tabs from "$lib/components/Tabs.svelte";
    import Tab from "$lib/components/Tab.svelte";
    import AboutSection from "$lib/components/about/AboutSection.svelte";
    import SkillsSection from "$lib/components/about/SkillsSection.svelte";
    import ExperienceSection from "$lib/components/about/ExperienceSection.svelte";
    import EducationSection from "$lib/components/about/EducationSection.svelte";
    import PublicationsSection from "$lib/components/about/PublicationsSection.svelte";

    let activeTab:
        | "about"
        | "skills"
        | "experience"
        | "education"
        | "publications" = "about";
</script>

<section id="about-me" class="py-20 px-4 bg-base-100">
    <div class="container mx-auto max-w-6xl">
        <!-- Header Section -->
        <div class="text-center mb-16">
            <h2 class="text-5xl font-bold mb-4">About Me</h2>
        </div>

        <!-- Hand-drawn Arrow Guide - Positioned as overlay -->
        <div class="relative mb-8">
            <div
                class="absolute z-10 pointer-events-none hidden md:block
                       md:top-[-100px] md:right-[5px]
                        lg:top-[-100px] lg:right-[50px]
                       xl:top-[-100px] xl:right-[90px]
                       2xl:top-[-100px] 2xl:right-[90px]"
            >
                <div class="flex flex-col items-start animate-bounce">
                    <p class="text-lg whitespace-nowrap font-family-hand">
                        Dive into my knowledge <br /> and my journey
                    </p>
                    <!-- Hand-drawn curved arrow SVG pointing down-left to Experience tab -->
                    <svg
                        class="w-20 h-20"
                        xmlns="http://www.w3.org/2000/svg"
                        xmlns:xlink="http://www.w3.org/1999/xlink"
                        viewBox="0 0 415.262 415.261"
                        fill="currentColor"
                    >
                        <g stroke-width="0"></g>
                        <g stroke-linecap="round" stroke-linejoin="round"></g>
                        <path
                            d="M0.325,374.984c7.956-24.479,20.196-47.736,30.601-70.992c1.224-3.06,6.12-3.06,7.956-1.224 c10.403,11.016,22.031,22.032,28.764,35.496h0.612c74.664,5.508,146.88-58.141,198.288-104.652 c59.364-53.244,113.22-118.116,134.64-195.84c1.224-9.792,2.448-20.196,2.448-30.6c0-4.896,6.732-4.896,7.344,0 c0,1.836,0,3.672,0,5.508C413.426,12.68,415.262,14.516,415.262,17.576c-0.612,6.732-2.448,13.464-3.672,20.196 C406.694,203.624,241.454,363.356,79.886,373.76c5.508,9.792,10.403,20.195,16.523,29.988c3.061,4.283-1.836,8.567-6.12,7.955 c-30.6-4.283-58.14-18.972-86.292-29.987C1.55,381.104-0.898,378.656,0.325,374.984z M82.334,399.464 c-3.673-7.956-6.12-15.912-10.404-23.868c-1.225-3.061,0.612-5.508,2.448-6.12c0-1.836,1.224-3.061,3.06-3.672 c146.268-24.48,264.996-124.236,309.06-259.489c-28.764,53.244-72.828,99.756-116.28,138.924 c-31.824,28.765-65.484,54.468-102.204,75.888c-28.764,16.524-64.872,31.824-97.92,21.421l0,0c1.836,4.896-5.508,7.344-7.956,3.672 c-7.956-10.404-15.912-20.196-24.48-29.376c-8.567,18.972-17.748,37.943-24.479,57.527 C35.822,382.94,58.466,393.956,82.334,399.464z"
                        ></path>
                    </svg>
                </div>
            </div>
        </div>

        <!-- Tabs Navigation -->
        <div class="flex justify-center mb-2">
            <Tabs boxed bgClass="bg-neutral-content" className="mb-6">
                <Tab
                    active={activeTab === "about"}
                    value="about"
                    on:select={(e) => (activeTab = e.detail.value)}
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
                </Tab>
                <Tab
                    active={activeTab === "skills"}
                    value="skills"
                    on:select={(e) => (activeTab = e.detail.value)}
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
                </Tab>
                <Tab
                    active={activeTab === "experience"}
                    value="experience"
                    on:select={(e) => (activeTab = e.detail.value)}
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
                </Tab>
                <Tab
                    active={activeTab === "education"}
                    value="education"
                    on:select={(e) => (activeTab = e.detail.value)}
                >
                    <!-- Heroicon: academic-cap -->
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
                            d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"
                        />
                    </svg>
                    Education
                </Tab>
                <Tab
                    active={activeTab === "publications"}
                    value="publications"
                    on:select={(e) => (activeTab = e.detail.value)}
                >
                    <!-- Heroicon: document-text -->
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
                            d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z"
                        />
                    </svg>
                    Publications
                </Tab>
            </Tabs>
        </div>

        <!-- Content Sections -->
        <div class="max-w-5xl mx-auto">
            {#if activeTab === "about"}
                <div in:fade={{ duration: 500 }}>
                    <AboutSection />
                </div>
            {:else if activeTab === "skills"}
                <div in:fade={{ duration: 500 }}>
                    <SkillsSection />
                </div>
            {:else if activeTab === "experience"}
                <div in:fade={{ duration: 500 }}>
                    <ExperienceSection />
                </div>
            {:else if activeTab === "education"}
                <div in:fade={{ duration: 500 }}>
                    <EducationSection />
                </div>
            {:else if activeTab === "publications"}
                <div in:fade={{ duration: 500 }}>
                    <PublicationsSection />
                </div>
            {/if}
        </div>
    </div>
</section>
