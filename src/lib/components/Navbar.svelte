<script lang="ts">
    import { page } from "$app/stores";
    import HuePicker from "./HuePicker.svelte";
    import PaletteControls from "./PaletteControls.svelte";

    // Check if the link is active
    function isActive(path: string): boolean {
        if (path === "/") {
            return $page.url.pathname === "/" || $page.url.pathname === "/home";
        }
        return $page.url.pathname.startsWith(path);
    }
</script>

<nav class="navbar bg-base-100 border-b border-primary/25 sticky top-0 z-50">
    <div class="navbar-start w-auto">
        <a href="/" class="btn btn-lg btn-ghost btn-underline text-xl font-bold tracking-widest"> @GNOBLET </a>
    </div>

    <div class="navbar-end w-auto ml-auto gap-4">
        <!-- Desktop Navigation Buttons (visible on large screens) -->
        <div class="hidden md:flex gap-2">
            <a href="/" class="btn btn-lg btn-ghost btn-underline" class:btn-underline-active={isActive("/")}>
                Home
            </a>
            <a
                href="/projects"
                class="btn btn-lg btn-ghost btn-underline"
                class:btn-underline-active={isActive("/projects")}
            >
                Projects
            </a>
            <a href="/#about-me" class="btn btn-lg btn-ghost btn-underline"> About Me </a>
            <a href="/#contact" class="btn btn-lg btn-ghost btn-underline"> Contact </a>
        </div>

        <!-- Mobile Menu Dropdown (visible on small screens) -->
        <div class="dropdown dropdown-end md:hidden">
            <div tabindex="0" role="button" class="btn btn-ghost">
                <!-- Heroicon: bars-3 -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-6 h-6"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    />
                </svg>
            </div>
            <ul
                tabindex="-1"
                class="menu dropdown-content mt-4 z-1 p-2 shadow bg-base-100 w-64"
            >
                <li>
                    <a
                        href="/"
                        class="btn btn-ghost btn-underline"
                        class:btn-underline-active={isActive("/")}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="/projects"
                        class="btn btn-ghost btn-underline"
                        class:btn-underline-active={isActive("/projects")}
                    >
                        Projects
                    </a>
                </li>
                <li>
                    <a href="/#about-me" class="btn btn-ghost btn-underline"> About Me </a>
                </li>
                <li>
                    <a href="/#contact" class="btn btn-ghost btn-underline"> Contact </a>
                </li>
                <li class="menu-title">Pick color</li>
                <li>
                    <PaletteControls />
                </li>
            </ul>
        </div>

        <div class="hidden md:flex">
            <HuePicker />
        </div>
    </div>
</nav>
