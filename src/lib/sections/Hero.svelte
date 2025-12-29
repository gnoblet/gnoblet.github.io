<script lang="ts">
    import SocialLinks from "$lib/components/SocialLinks.svelte";
    import ElevationRidgeMap from "$lib/components/ElevationRidgeMap.svelte";
</script>

<section class="hero min-h-screen relative">
    <ElevationRidgeMap />
    <div class="hero-overlay bg-neutral-content"></div>
    <div class="hero-content text-center -mt-16">
        <div
            class="max-w-5xl bg-base-100/60 rounded-3xl p-8 shadow-xl animate-fade-slide-up py-8"
        >
            <div
                class="flex flex-col md:flex-row gap-8 items-center md:items-start py-4"
            >
                <div class="avatar shrink-0">
                    <div
                        class="w-40 rounded-full ring ring-primary ring-offset-primary-content ring-offset-4"
                    >
                        <img src="/assets/myself.jpg" alt="Guillaume Noblet" />
                    </div>
                </div>

                <div class="flex-1 text-center md:text-left">
                    <h1 class="text-3xl font-bold mb-6">
                        Hey👋, I'm Guillaume Noblet, a data scientist
                    </h1>

                    <div class="mb-8 flex justify-center md:justify-start">
                        <SocialLinks size="large" />
                    </div>

                    <p class="text-1xl mb-2">
                        I specialize in
                        <span class="text-primary-content font-bold">
                            quantitative field research
                        </span>
                        and
                        <span class="text-primary-content font-bold">
                            data visualization
                        </span>. I juggle between drafting reports from data
                        wrangling to fine-tuned analyses and imagining and
                        managing research projects (and also coming up with good
                        memes!).
                    </p>
                    <p class="text-lg mb-2">
                        Lastly, I was a Data & Research Specialist at <a
                            href="https://www.impact-initiatives.org/"
                            class="link">IMPACT Initiatives</a
                        >
                    </p>
                </div>
            </div>

            <div class="flex gap-4 justify-center flex-wrap py-4">
                <a href="#contact" class="btn btn-accent btn-lg">
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
                <a href="#latest-projects" class="btn btn-primary btn-lg">
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
