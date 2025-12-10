<script lang="ts">
    import SocialLinks from "$lib/components/SocialLinks.svelte";
</script>

<section id="contact" class="py-20 px-4 bg-base-200">
    <div class="container mx-auto max-w-4xl text-center">
        <h2 class="text-4xl font-bold mb-6">Let's Connect</h2>
        <p class="text-xl mb-8 opacity-80">
            Interested in collaborating or just want to say hi? Feel free to
            reach out!
        </p>

        <div class="mb-8">
            <SocialLinks size="large" />
        </div>

        <a
            href="mailto:data@guillaume-noblet.com"
            class="btn btn-primary btn-lg"
        >
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
            Send an Email
        </a>
    </div>
</section>
