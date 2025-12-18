<script lang="ts">
    import { onMount } from "svelte";
    import Hero from "$lib/sections/Hero.svelte";
    import AboutMe from "$lib/sections/AboutMe.svelte";
    import LatestProjects from "$lib/sections/LatestProjects.svelte";
    import Portfolio from "$lib/sections/Portfolio.svelte";
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

    <LatestProjects />

    <Portfolio />

    <AboutMe />

    <Contact />
</div>
