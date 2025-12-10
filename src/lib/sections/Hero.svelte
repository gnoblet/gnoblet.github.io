<script lang="ts">
    import SocialLinks from "$lib/components/SocialLinks.svelte";
</script>

<section class="hero min-h-screen bg-base-200">
    <div class="hero-content text-center">
        <div class="max-w-4xl">
            <div class="avatar mb-8">
                <div
                    class="w-48 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2"
                >
                    <img src="/assets/myself.jpg" alt="Guillaume Noblet" />
                </div>
            </div>

            <h1 class="text-6xl font-bold mb-4">Hi, I'm Guillaume Noblet</h1>

            <p class="text-3xl mb-8 opacity-80">
                Welcome to my digital space where I share my projects, thoughts,
                and adventures in code.
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

            <div class="mb-8">
                <SocialLinks size="large" />
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

                <a href="/aboutMe" class="btn btn-outline btn-lg"> About Me </a>
            </div>
        </div>
    </div>
</section>
