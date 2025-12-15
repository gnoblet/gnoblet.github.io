<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import { browser } from "$app/environment";

    let mounted = $state(false);
    let container: HTMLDivElement;
    let mouseX = $state(0);
    let mouseY = $state(0);
    let viewWidth = $state(1000);
    let viewHeight = $state(800);
    let isVisible = $state(true);
    let animationFrameId: number | null = null;
    let animationTime = 0; // Track cumulative animation time
    let lastFrameTime = 0;

    interface Shape {
        id: number;
        type: "circle" | "triangle" | "square" | "hexagon";
        x: number;
        y: number;
        baseX: number;
        baseY: number;
        size: number;
        opacity: number;
        rotation: number;
        velocityX: number;
        velocityY: number;
        floatOffsetX: number;
        floatOffsetY: number;
    }

    let shapes = $state<Shape[]>([]);
    const shapeCount = 50;
    const bounceDistance = 100;
    const bounceForce = 8;
    const damping = 0.92;

    // Generate random shapes with better distribution
    function initShapes() {
        if (!browser) return;

        const types: ("circle" | "triangle" | "square" | "hexagon")[] = [
            "circle",
            "triangle",
            "square",
            "hexagon",
        ];

        const newShapes: Shape[] = [];
        const padding = 100; // Padding from edges

        for (let i = 0; i < shapeCount; i++) {
            const baseX = Math.random() * (viewWidth - padding * 2) + padding;
            const baseY = Math.random() * (viewHeight - padding * 2) + padding;

            newShapes.push({
                id: i,
                type: types[Math.floor(Math.random() * types.length)],
                x: baseX,
                y: baseY,
                baseX: baseX,
                baseY: baseY,
                size: Math.random() * 40 + 30,
                opacity: Math.random() * 0.4 + 0.3,
                rotation: Math.random() * 360,
                velocityX: 0,
                velocityY: 0,
                floatOffsetX: Math.random() * Math.PI * 2,
                floatOffsetY: Math.random() * Math.PI * 2,
            });
        }
        shapes = newShapes;
    }

    function handleMouseMove(e: MouseEvent) {
        if (!container) return;

        const rect = container.getBoundingClientRect();
        mouseX = ((e.clientX - rect.left) / rect.width) * viewWidth;
        mouseY = ((e.clientY - rect.top) / rect.height) * viewHeight;

        shapes.forEach((shape) => {
            const dx = shape.x - mouseX;
            const dy = shape.y - mouseY;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < bounceDistance && distance > 0.1) {
                // Bounce effect - push away strongly
                const force = bounceForce;
                shape.velocityX = (dx / distance) * force;
                shape.velocityY = (dy / distance) * force;
            }
        });
    }

    function animate(currentTime: number) {
        if (!isVisible) {
            animationFrameId = null;
            lastFrameTime = 0; // Reset for next resume
            return; // Pause when not visible
        }

        // Calculate delta time and update cumulative animation time
        if (lastFrameTime === 0) {
            lastFrameTime = currentTime;
        }
        const deltaTime = (currentTime - lastFrameTime) / 1000;
        lastFrameTime = currentTime;
        animationTime += deltaTime;

        shapes.forEach((shape) => {
            // Apply velocity with natural floating animation
            const time = animationTime;
            const floatX = Math.sin(time * 0.3 + shape.floatOffsetX) * 3;
            const floatY = Math.cos(time * 0.2 + shape.floatOffsetY) * 3;

            shape.x += shape.velocityX + floatX * 1.1;
            shape.y += shape.velocityY + floatY * 1.1;

            // Apply damping to velocity
            shape.velocityX *= damping;
            shape.velocityY *= damping;

            // Gentle pull back to base position when velocity is low
            if (
                Math.abs(shape.velocityX) < 0.3 &&
                Math.abs(shape.velocityY) < 0.3
            ) {
                const returnDx = shape.baseX - shape.x;
                const returnDy = shape.baseY - shape.y;
                shape.x += returnDx * 0.03;
                shape.y += returnDy * 0.03;
            }

            // Keep within bounds with bounce
            const margin = 50;
            if (shape.x < margin) {
                shape.x = margin;
                shape.velocityX *= -0.5;
            }
            if (shape.x > viewWidth - margin) {
                shape.x = viewWidth - margin;
                shape.velocityX *= -0.5;
            }
            if (shape.y < margin) {
                shape.y = margin;
                shape.velocityY *= -0.5;
            }
            if (shape.y > viewHeight - margin) {
                shape.y = viewHeight - margin;
                shape.velocityY *= -0.5;
            }
        });

        if (mounted) {
            animationFrameId = requestAnimationFrame(animate);
        }
    }

    function updateViewSize() {
        if (!browser || !container) return;
        viewWidth = container.clientWidth;
        viewHeight = container.clientHeight;
    }

    onMount(() => {
        if (browser) {
            updateViewSize();
            initShapes();
            mounted = true;
            animationFrameId = requestAnimationFrame(animate);
            window.addEventListener("mousemove", handleMouseMove);
            window.addEventListener("resize", () => {
                updateViewSize();
                initShapes(); // Reinitialize shapes on resize
            });

            // Intersection Observer to pause when not visible
            const observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach((entry) => {
                        isVisible = entry.isIntersecting;
                        if (isVisible && mounted && animationFrameId === null) {
                            animationFrameId = requestAnimationFrame(animate);
                        }
                    });
                },
                { threshold: 0.1 },
            );

            if (container) {
                observer.observe(container);
            }

            return () => {
                if (container) {
                    observer.unobserve(container);
                }
            };
        }
    });

    onDestroy(() => {
        mounted = false;
        if (browser) {
            window.removeEventListener("mousemove", handleMouseMove);
            if (animationFrameId !== null) {
                cancelAnimationFrame(animationFrameId);
            }
        }
    });
</script>

<div
    class="absolute inset-0 w-full h-full overflow-hidden z-0 pointer-events-none"
    bind:this={container}
>
    <svg
        class="w-full h-full"
        viewBox="0 0 {viewWidth} {viewHeight}"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
    >
        <defs>
            <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                    offset="0%"
                    style="stop-color:rgb(99,102,241);stop-opacity:0.7"
                />
                <stop
                    offset="100%"
                    style="stop-color:rgb(168,85,247);stop-opacity:0.7"
                />
            </linearGradient>
            <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                    offset="0%"
                    style="stop-color:rgb(236,72,153);stop-opacity:0.7"
                />
                <stop
                    offset="100%"
                    style="stop-color:rgb(251,113,133);stop-opacity:0.7"
                />
            </linearGradient>
            <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop
                    offset="0%"
                    style="stop-color:rgb(59,130,246);stop-opacity:0.7"
                />
                <stop
                    offset="100%"
                    style="stop-color:rgb(147,51,234);stop-opacity:0.7"
                />
            </linearGradient>
        </defs>

        {#each shapes as shape (shape.id)}
            {#if shape.type === "circle"}
                <circle
                    class="shape"
                    cx={shape.x}
                    cy={shape.y}
                    r={shape.size / 2}
                    fill={shape.id % 3 === 0
                        ? "url(#grad1)"
                        : shape.id % 3 === 1
                          ? "url(#grad2)"
                          : "url(#grad3)"}
                    opacity={shape.opacity}
                />
            {:else if shape.type === "triangle"}
                <polygon
                    class="shape"
                    points="{shape.size /
                        2},0 {shape.size},{shape.size} 0,{shape.size}"
                    fill={shape.id % 3 === 0
                        ? "url(#grad2)"
                        : shape.id % 3 === 1
                          ? "url(#grad3)"
                          : "url(#grad1)"}
                    opacity={shape.opacity}
                    transform="translate({shape.x}, {shape.y}) rotate({shape.rotation} {shape.size /
                        2} {shape.size / 2}) translate({-shape.size /
                        2}, {-shape.size / 2})"
                />
            {:else if shape.type === "square"}
                <rect
                    class="shape"
                    x={shape.x - shape.size / 2}
                    y={shape.y - shape.size / 2}
                    width={shape.size}
                    height={shape.size}
                    fill={shape.id % 3 === 0
                        ? "url(#grad3)"
                        : shape.id % 3 === 1
                          ? "url(#grad1)"
                          : "url(#grad2)"}
                    opacity={shape.opacity}
                    transform="rotate({shape.rotation} {shape.x} {shape.y})"
                />
            {:else if shape.type === "hexagon"}
                <polygon
                    class="shape"
                    points="{shape.size / 2},0 {shape.size},{shape.size /
                        4} {shape.size},{shape.size * 0.75} {shape.size /
                        2},{shape.size} 0,{shape.size * 0.75} 0,{shape.size /
                        4}"
                    fill={shape.id % 3 === 0
                        ? "url(#grad1)"
                        : shape.id % 3 === 1
                          ? "url(#grad2)"
                          : "url(#grad3)"}
                    opacity={shape.opacity}
                    transform="translate({shape.x}, {shape.y}) rotate({shape.rotation} {shape.size /
                        2} {shape.size / 2}) translate({-shape.size /
                        2}, {-shape.size / 2})"
                />
            {/if}
        {/each}
    </svg>
</div>
