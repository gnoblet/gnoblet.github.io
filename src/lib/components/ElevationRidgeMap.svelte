<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as d3 from "d3";

    let container: HTMLDivElement;
    let svg: SVGSVGElement;

    const viewWidth = 1600;
    const viewHeight = 900;

    interface DataPoint {
        x: number; // longitude
        y: number; // latitude
        z: number; // elevation
    }

    interface AnimatedDot {
        element: d3.Selection<SVGCircleElement, unknown, null, undefined>;
        pathNode: SVGPathElement;
        pathLength: number;
        progress: number;
        speed: number;
    }

    let animatedDots: AnimatedDot[] = [];
    let animationFrameId: number | null = null;
    let isVisible = false;

    async function renderRidgelines() {
        try {
            const svgElement = d3.select(svg);
            svgElement.selectAll("*").remove();

            // Load the data
            const data: DataPoint[] =
                (await d3.json("/data/europe_elevation_profiles.json")) || [];

            // Group data by latitude (y coordinate) to create profiles
            const profilesMap = d3.group(data, (d) => d.y);
            const allProfiles = Array.from(profilesMap.entries())
                .map(([lat, points]) => ({
                    latitude: lat,
                    points: points.sort((a, b) => a.x - b.x),
                    maxElevation: d3.max(points, (p) => p.z) || 0,
                }))
                .sort((a, b) => b.latitude - a.latitude); // Sort north to south

            // Filter out profiles where max elevation is 0 or below
            const profiles = allProfiles.filter((p) => p.maxElevation > 0);

            // theme_void() - minimal margins, no axes
            const margin = { top: 20, right: 20, bottom: 20, left: 20 };
            const width = viewWidth - margin.left - margin.right;
            const height = viewHeight - margin.top - margin.bottom;

            const g = svgElement
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Calculate scales
            const xExtent = d3.extent(data, (d) => d.x) as [number, number];
            const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);

            // Find max elevation for height scaling (only positive)
            const maxElevation =
                d3.max(
                    profiles.flatMap((p) => p.points),
                    (d) => d.z,
                ) || 1000;

            // scale = 8 means ridges overlap significantly
            const scale = 8;
            const ridgeSpacing = height / profiles.length;
            const ridgeHeight = ridgeSpacing * scale;

            // Elevation scale with the overlap factor
            const elevationScale = d3
                .scaleLinear()
                .domain([0, maxElevation])
                .range([0, ridgeHeight]);

            // rel_min_height = 0.001 (filter very small elevations)
            const minHeightThreshold = maxElevation * 0.001;

            // Create area generator (stat = "identity")
            const area = d3
                .area<DataPoint>()
                .x((d) => xScale(d.x))
                .y0(0)
                .y1((d) => -elevationScale(Math.max(0, d.z)))
                .curve(d3.curveBasis);

            // Create line generator for stroke
            const line = d3
                .line<DataPoint>()
                .x((d) => xScale(d.x))
                .y((d) => -elevationScale(Math.max(0, d.z)))
                .curve(d3.curveBasis);

            // Draw ridgelines from back to front
            const ridges = g.append("g").attr("class", "ridgelines");

            // Clear previous dots
            animatedDots = [];

            profiles.forEach((profile, i) => {
                const yOffset = i * ridgeSpacing;

                // Split profile into continuous segments (no zero/negative elevation gaps)
                const segments: DataPoint[][] = [];
                let currentSegment: DataPoint[] = [];

                profile.points.forEach((point) => {
                    if (point.z > minHeightThreshold) {
                        currentSegment.push(point);
                    } else {
                        if (currentSegment.length >= 2) {
                            segments.push(currentSegment);
                        }
                        currentSegment = [];
                    }
                });

                // Don't forget the last segment
                if (currentSegment.length >= 2) {
                    segments.push(currentSegment);
                }

                if (segments.length === 0) return;

                const ridgeGroup = ridges
                    .append("g")
                    .attr("transform", `translate(0, ${yOffset})`)
                    .attr("class", "ridge-group");

                // Draw each continuous segment separately
                segments.forEach((segment, segmentIndex) => {
                    // Draw stroke (color = "black")
                    const pathElement = ridgeGroup
                        .append("path")
                        .datum(segment)
                        .attr("class", "ridge-stroke")
                        .attr("d", line)
                        .attr("fill", "none")
                        .attr("stroke", "#000000")
                        .attr("stroke-width", 1)
                        .attr("stroke-opacity", 0.8)
                        .style(
                            "transition",
                            "opacity 0.2s ease, stroke-width 0.2s ease",
                        );

                    // Only animate dots on every 4th profile to reduce memory
                    if (i % 4 !== 0) return;

                    // Get the path node for animation
                    const pathNode = pathElement.node() as SVGPathElement;
                    if (!pathNode) return;

                    const pathLength = pathNode.getTotalLength();

                    // Get initial position at start of path
                    const startPoint = pathNode.getPointAtLength(0);

                    // Create animated dot for this segment
                    const dot = ridgeGroup
                        .append("circle")
                        .attr("class", "animated-dot")
                        .attr("r", 3)
                        .attr("cx", startPoint.x)
                        .attr("cy", startPoint.y)
                        .attr("fill", "#ff4444")
                        .attr("stroke", "#ffffff")
                        .attr("stroke-width", 1)
                        .style(
                            "filter",
                            "drop-shadow(0 0 8px rgba(255, 68, 68, 1)) drop-shadow(0 0 4px rgba(255, 68, 68, 0.9))",
                        );

                    // Store dot info for RAF animation
                    animatedDots.push({
                        element: dot,
                        pathNode,
                        pathLength,
                        progress: 0,
                        speed: 1 / 8000, // Complete in 8 seconds
                    });
                });
            });

            // Start RAF animation loop
            startAnimation();
        } catch (error) {
            console.error("Error rendering ridgelines:", error);
        }
    }

    function startAnimation() {
        if (animationFrameId !== null) return; // Already running

        let lastTime = performance.now();

        function animate(currentTime: number) {
            if (!isVisible) {
                animationFrameId = null;
                return; // Pause when not visible
            }

            const deltaTime = currentTime - lastTime;
            lastTime = currentTime;

            // Update all dots in a single loop
            animatedDots.forEach((dot) => {
                dot.progress += dot.speed * deltaTime;
                if (dot.progress >= 1) {
                    dot.progress = 0; // Loop
                }

                const point = dot.pathNode.getPointAtLength(
                    dot.progress * dot.pathLength,
                );
                dot.element.attr("cx", point.x).attr("cy", point.y);
            });

            animationFrameId = requestAnimationFrame(animate);
        }

        animationFrameId = requestAnimationFrame(animate);
    }

    onMount(async () => {
        await renderRidgelines();

        // Intersection Observer to pause when not visible
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    isVisible = entry.isIntersecting;
                    if (isVisible && animatedDots.length > 0) {
                        startAnimation();
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
    });

    onDestroy(() => {
        // Clean up animation frame
        if (animationFrameId !== null) {
            cancelAnimationFrame(animationFrameId);
        }
    });
</script>

<div
    class="absolute inset-0 overflow-hidden z-0 pointer-events-none bg-white"
    bind:this={container}
>
    <svg
        bind:this={svg}
        class="w-full h-full"
        viewBox="0 0 {viewWidth} {viewHeight}"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
    />
</div>

<style>
</style>
