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
                <!-- Heroicon: heart -->
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="w-5 h-5 mr-1"
                >
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                    />
                </svg>
                Projects
            </a>
            <a
                href="/aboutMe"
                class="btn btn-ghost"
                class:btn-active={isActive("/aboutMe")}
            >
                About Me
            </a>
        </div>

        <!-- Mobile Menu Dropdown (visible on small screens) -->
        <details class="dropdown dropdown-end lg:hidden">
            <summary class="btn btn-ghost btn-circle">
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
            </summary>
            <ul
                class="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
            >
                <li>
                    <a href="/" class:active={isActive("/")}> Home </a>
                </li>
                <li>
                    <a href="/projects" class:active={isActive("/projects")}>
                        Projects
                    </a>
                </li>
                <li>
                    <a href="/aboutMe" class:active={isActive("/aboutMe")}>
                        About Me
                    </a>
                </li>
            </ul>
        </details>
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
