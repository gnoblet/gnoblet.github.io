<script lang="ts">
    import { page } from "$app/stores";

    let status = $derived($page.status);
    let message = $derived(
        $page.error?.message ??
            (status === 404 ? "Page Not Found" : "Something Went Wrong"),
    );
    let description = $derived(
        status === 404
            ? "Sorry, the page you're looking for doesn't exist or may have been moved."
            : "An unexpected error occurred while loading this page.",
    );
</script>

<svelte:head>
    <title>{message} | Gnoblet</title>
</svelte:head>

<section class="hero min-h-[70vh]">
    <div class="hero-content text-center">
        <div class="max-w-2xl">
            <p class="text-8xl font-bold text-primary mb-4">{status}</p>
            <h1 class="text-4xl font-bold mb-4">{message}</h1>
            <p class="text-xl mb-8">{description}</p>

            <a href="/" class="btn btn-primary btn-lg">
                Back to Home
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
        </div>
    </div>
</section>
