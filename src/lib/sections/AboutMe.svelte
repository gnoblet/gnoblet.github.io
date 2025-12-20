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
        </div>

        <!-- Hand-drawn Arrow Guide - Positioned as overlay -->
        <div class="relative mb-8">
            <div
                class="absolute z-10 pointer-events-none hidden md:block
                       lg:top-[-140px] lg:right-[150px]
                       xl:top-[-140px] xl:right-[180px]
                       2xl:top-[-140px] 2xl:right-[220px]"
            >
                <div class="flex flex-col items-start">
                    <p
                        class="text-lg whitespace-nowrap animate-bounce-slow font-family-hand"
                    >
                        Dive into my knowledge <br /> and my journey
                    </p>
                    <!-- Hand-drawn curved arrow SVG pointing down-left to Experience tab -->
                    <svg
                        class="w-30 h-30 animate-bounce-slow"
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
            <div class="tabs tabs-box tabs-lg bg-neutral-content mb-6">
                <button
                    type="button"
                    class="tab"
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
                    class="tab"
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
                    class="tab"
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

    .font-heading {
        font-family: "Oswald", sans-serif;
        text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
    }

    @keyframes bounce-slow {
        0%,
        100% {
            transform: translateY(0);
        }
        50% {
            transform: translateY(-10px);
        }
    }

    .animate-bounce-slow {
        animation: bounce-slow 2s ease-in-out infinite;
    }
</style>
