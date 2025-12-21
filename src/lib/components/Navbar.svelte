<script lang="ts">
    import { page } from "$app/stores";

    // Check if the link is active
    function isActive(path: string): boolean {
        if (path === "/") {
            return $page.url.pathname === "/" || $page.url.pathname === "/home";
        }
        return $page.url.pathname.startsWith(path);
    }
</script>

<nav class="navbar bg-base-100 shadow-lg sticky top-0 z-50">
    <div class="navbar-start">
        <a href="/" class="btn btn-ghost text-xl font-bold"> @GNOBLET </a>
    </div>

    <div class="navbar-end gap-4">
        <!-- Desktop Navigation Buttons (visible on large screens) -->
        <div class="hidden lg:flex gap-2">
            <a href="/" class="btn btn-ghost" class:btn-active={isActive("/")}>
                Home
            </a>
            <a
                href="/projects"
                class="btn btn-ghost"
                class:btn-active={isActive("/projects")}
            >
                Projects
            </a>
            <a href="/#about-me" class="btn btn-ghost"> About Me </a>
            <a href="/#contact" class="btn btn-accent"> Contact </a>
        </div>

        <!-- Mobile Menu Dropdown (visible on small screens) -->
        <div class="dropdown dropdown-end lg:hidden">
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
                class="menu dropdown-content mt-4 z-1 p-2 shadow bg-base-100 rounded-box w-42"
            >
                <li>
                    <a
                        href="/"
                        class="btn btn-ghost"
                        class:active={isActive("/")}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="/projects"
                        class="btn btn-ghost"
                        class:active={isActive("/projects")}
                    >
                        Projects
                    </a>
                </li>
                <li>
                    <a href="/#about-me" class="btn btn-ghost"> About Me </a>
                </li>
                <li>
                    <a href="/#contact" class="btn btn-accent"> Contact </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<style>
    .btn-active {
        background-color: hsl(var(--p) / 0.2);
    }

    .active {
        background-color: hsl(var(--p) / 0.2);
    }
</style>
