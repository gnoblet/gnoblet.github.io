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

<nav class="navbar bg-base-100 border-b border-primary/25 sticky top-0 z-50">
    <div class="navbar-start">
        <a href="/" class="btn btn-ghost nav-link text-xl font-bold tracking-widest"> @GNOBLET </a>
    </div>

    <div class="navbar-end gap-4">
        <!-- Desktop Navigation Buttons (visible on large screens) -->
        <div class="hidden md:flex gap-2">
            <a href="/" class="btn btn-ghost nav-link text-lg" class:nav-active={isActive("/")}>
                Home
            </a>
            <a
                href="/projects"
                class="btn btn-ghost nav-link text-lg"
                class:nav-active={isActive("/projects")}
            >
                Projects
            </a>
            <a href="/#about-me" class="btn btn-ghost nav-link text-lg"> About Me </a>
            <a href="/#contact" class="btn btn-ghost nav-link text-lg"> Contact </a>
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
                class="menu dropdown-content mt-4 z-1 p-2 shadow bg-base-100 w-42"
            >
                <li>
                    <a
                        href="/"
                        class="btn btn-ghost nav-link"
                        class:nav-active={isActive("/")}
                    >
                        Home
                    </a>
                </li>
                <li>
                    <a
                        href="/projects"
                        class="btn btn-ghost nav-link"
                        class:nav-active={isActive("/projects")}
                    >
                        Projects
                    </a>
                </li>
                <li>
                    <a href="/#about-me" class="btn btn-ghost nav-link"> About Me </a>
                </li>
                <li>
                    <a href="/#contact" class="btn btn-ghost nav-link"> Contact </a>
                </li>
            </ul>
        </div>
    </div>
</nav>

<style>
    .nav-link {
        position: relative;
    }

    .nav-link:hover,
    .nav-link:focus,
    .nav-link:focus-visible,
    .nav-link.nav-active {
        background-color: transparent;
        border-color: transparent;
        outline: none;
        box-shadow: none;
    }

    .nav-link::after {
        content: "";
        position: absolute;
        left: 0.9rem;
        right: 0.9rem;
        bottom: 6px;
        height: 2px;
        background-color: var(--color-primary);
        transform: scaleX(0);
        transform-origin: left;
        transition: transform 0.25s ease;
    }

    .nav-link:hover::after,
    .nav-link:focus-visible::after,
    .nav-link.nav-active::after {
        transform: scaleX(1);
    }

    .nav-link.nav-active {
        color: var(--color-primary);
    }
</style>
