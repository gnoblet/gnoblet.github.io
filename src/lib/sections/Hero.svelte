<script lang="ts">
    import SocialLinks from "$lib/components/SocialLinks.svelte";
    import ElevationRidgeMap from "$lib/components/ElevationRidgeMap.svelte";
    import { borderDraw } from "$lib/actions/borderDraw.svelte";
</script>

<section class="hero min-h-screen relative">
    <ElevationRidgeMap />
    <div class="hero-content text-center md:-mt-16">
        <div
            class="max-w-5xl bg-base-100/75 p-8 animate-fade-slide-up py-8 border-draw neon-item"
            use:borderDraw
        >
            <div
                class="flex flex-col md:flex-row gap-8 items-center md:items-start py-4"
            >
                <div class="avatar shrink-0 border-draw neon-item bg-transparent">
                    <div class="w-40">
                        <img src="/assets/myself.jpg" alt="Guillaume Noblet" />
                    </div>
                </div>

                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-3xl font-bold mb-6 px-5">
                        Hey👋, I'm Guillaume Noblet and I'd say I'm a
                        quantitative social-science researcher, though it's a
                        bit more chaotic than that.
                    </h1>

                    <div class="mb-8 flex justify-center md:justify-start px-5">
                        <SocialLinks size="large" />
                    </div>

                    <p class="text-1xl mb-2 px-5">
                        These days that means
                        <span class="text-highlight">
                            I built data pipelines and visualizations
                        </span>
                        at <a
                            href="https://www.impact-initiatives.org/"
                            class="link">IMPACT Initiatives</a
                        > — after a few years
                        <span class="text-highlight">
                            running large-scale humanitarian surveys
                        </span>
                        across 20+ countries. Before that: maths, economics,
                        and a long detour into the history of science.
                    </p>
                    <p class="text-lg mb-2 px-5">
                        I'm very much here for data viz, web apps, and good memes.
                    </p>
                </div>
            </div>

            <div class="flex gap-4 justify-center flex-wrap py-4">
                <a href="#contact" class="btn btn-outline btn-draw btn-lg" use:borderDraw>
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
                <a href="#latest-projects" class="btn btn-outline btn-draw btn-lg" use:borderDraw>
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

                <a href="#about-me" class="btn btn-outline btn-lg btn-draw" use:borderDraw>
                    About Me
                </a>
            </div>
        </div>
    </div>
</section>

<style>
    @keyframes fade-slide-up {
        from {
            opacity: 0;
            transform: translateY(2rem);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    .animate-fade-slide-up {
        opacity: 0;
        animation: fade-slide-up 1s ease-out 0.8s forwards;
    }
</style>
