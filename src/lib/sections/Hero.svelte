<script lang="ts">
    import { onMount } from "svelte";
    import SocialLinks from "$lib/components/SocialLinks.svelte";
    import AnimatedBackground from "$lib/components/AnimatedBackground.svelte";
    import { theme } from "$lib/stores/theme";

    function getOverlayColor(currentTheme: string) {
        const isDark = currentTheme === "dracula";
        return isDark ? "rgba(40, 42, 54, 0.7)" : "rgba(255, 255, 255, 0.5)";
    }

    onMount(() => {
        theme.init();
    });
</script>

<section class="hero h-screen relative">
    <AnimatedBackground />
    <!-- Theme-aware background overlay -->
    <div
        class="absolute inset-0 z-5 transition-colors duration-100"
        style="background-color: {getOverlayColor($theme)}"
    ></div>
    <div class="hero-content text-center relative z-10">
        <div class="max-w-4xl">
            <div class="avatar mb-6">
                <div
                    class="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                >
                    <img src="/assets/myself.jpg" alt="Guillaume Noblet" />
                </div>
            </div>

            <h1 class="text-4xl font-bold mb-8">Hey👋, I'm Guillaume Noblet</h1>

            <div class="mb-8">
                <SocialLinks size="large" />
            </div>

            <p class="text-1xl font-family-body mb-4 opacity-90">
                I specialize in quantitative field research and data
                visualization. I juggle between drafting reports from data
                wrangling to fine-tuned analyses, building web apps, and
                managing research projects.
            </p>
            <p class="text-1xl font-family-body mb-8 opacity-90">
                (and also coming up with good memes!).
            </p>

            <p class="text-lg font-familiy-body mb-8 opacity-90">
                Lastly, I was a Data & Research Specialist at <a
                    href="https://www.impact-initiatives.org/"
                    class="link">IMPACT Initiatives</a
                >
            </p>

            <div class="mb-6">
                <a href="#contact" class="btn btn-primary btn-lg">
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
                    Contact Me
                </a>
            </div>

            <div class="flex gap-4 justify-center flex-wrap">
                <a href="/projects" class="btn btn-primary btn-lg">
                    View My Projects
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
                            d="M13 7l5 5m0 0l-5 5m5-5H6"
                        />
                    </svg>
                </a>

                <a href="#about-me" class="btn btn-outline btn-lg">
                    About Me
                </a>
            </div>
        </div>
    </div>
</section>
