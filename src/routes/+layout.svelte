<script lang="ts">
    import "../app.css";
    import Navbar from "$lib/components/Navbar.svelte";
    import Footer from "$lib/components/Footer.svelte";
    import { loading } from "$lib/stores/loading";
    import { navigating } from "$app/stores";

    // Scroll to top on navigation
    $: if ($navigating) {
        window.scrollTo(0, 0);
    }
</script>

<svelte:head>
    <link rel="preconnect" href="https://fonts.bunny.net" />
    <link
        href="https://fonts.bunny.net/css?family=oswald:400,600,700"
        rel="stylesheet"
    />
</svelte:head>

<div class="min-h-screen flex flex-col bg-base-100">
    {#if $loading}
        <div
            class="fixed inset-0 z-50 flex items-center justify-center bg-base-100"
        >
            <span class="loading loading-spinner loading-lg text-primary"
            ></span>
        </div>
    {/if}

    <Navbar />

    <main class="flex-1">
        <slot />
    </main>

    <Footer />
</div>
