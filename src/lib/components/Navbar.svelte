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
                class="menu menu-sm dropdown-content mt-3 z-1 p-2 shadow bg-base-100 rounded-box w-52"
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
