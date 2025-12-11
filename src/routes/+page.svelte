<script lang="ts">
    import { onMount } from "svelte";
    import Hero from "$lib/sections/Hero.svelte";
    import LatestProjects from "$lib/sections/LatestProjects.svelte";
    import Portfolio from "$lib/sections/Portfolio.svelte";
    import RiverBasinShowcase from "$lib/sections/RiverBasinShowcase.svelte";
    import Contact from "$lib/sections/Contact.svelte";

    let loaded = false;

    onMount(() => {
        // Preload critical images
        const preloadImages = async () => {
            const imageUrl = "/assets/myself.jpg";

            try {
                const img = new Image();
                img.src = imageUrl;
                await new Promise((resolve, reject) => {
                    img.onload = resolve;
                    img.onerror = reject;
                });
            } catch (error) {
                console.error("Failed to preload image:", error);
            }
        };

        preloadImages();
        loaded = true;
    });
</script>

<svelte:head>
    <title>Gnoblet | Portfolio & Blog</title>
    <meta
        name="description"
        content="Personal website and portfolio of Gnoblet - Featuring blog posts, project portfolio, and contact information."
    />
</svelte:head>

<div class="w-full">
    <Hero />

    <!-- About Preview Section -->
    <section class="py-20 px-4 bg-base-200">
        <div class="container mx-auto max-w-6xl">
            <h2 class="text-4xl font-bold text-center mb-12">What I Do</h2>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
                >
                    <div class="card-body items-center text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-16 w-16 text-primary mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                        </svg>
                        <h3 class="card-title">Development</h3>
                        <p>
                            Building web applications with modern technologies
                            and best practices.
                        </p>
                    </div>
                </div>

                <div
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
                >
                    <div class="card-body items-center text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-16 w-16 text-secondary mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                        </svg>
                        <h3 class="card-title">Design</h3>
                        <p>
                            Creating intuitive and beautiful user interfaces
                            that users love.
                        </p>
                    </div>
                </div>

                <div
                    class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all"
                >
                    <div class="card-body items-center text-center">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            class="h-16 w-16 text-accent mb-4"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                stroke-linecap="round"
                                stroke-linejoin="round"
                                stroke-width="2"
                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                            />
                        </svg>
                        <h3 class="card-title">Innovation</h3>
                        <p>
                            Exploring new technologies and finding creative
                            solutions to problems.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <LatestProjects />

    <Portfolio />

    <RiverBasinShowcase />

    <Contact />
</div>
