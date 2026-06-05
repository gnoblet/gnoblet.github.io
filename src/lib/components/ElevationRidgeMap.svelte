<script lang="ts">
    import { onMount, onDestroy } from "svelte";
    import * as d3 from "d3";

    let container: HTMLDivElement;
    let svg: SVGSVGElement;

    const viewWidth = 1600;
    const viewHeight = 900;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

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

    /** A single continuous elevation segment with its pre-computed SVG path string. dotIndex is set for segments that carry an animated dot (every 8th profile). */
    interface RenderedSegment {
        d: string;
        dotIndex: number | null;
    }

    /** One latitude band: its vertical offset in the SVG and its list of rendered segments. */
    interface RenderedProfile {
        latitude: number;
        yOffset: number;
        segments: RenderedSegment[];
    }

    /** Mutable position of one animated dot, updated each animation frame via $state. */
    interface DotState {
        pathNode: SVGPathElement;
        pathLength: number;
        progress: number;
        speed: number;
        cx: number;
        cy: number;
    }

    let animatedDots: AnimatedDot[] = [];
    let animationFrameId: number | null = null;
    let isVisible = $state(false);

    // Svelte 5 reactive state (replaces D3 DOM management)
    let dataPoints = $state<DataPoint[]>([]);
    let dots = $state<DotState[]>([]);
    let pathRefs: (SVGPathElement | null)[] = [];

    // Light theme colors only
    const colors = {
        stroke: "#000000",
        dotFill: "#4444ff",
        dotStroke: "#ffffff",
        dotGlow:
            "drop-shadow(0 0 16px rgba(68, 68, 255, 1)) drop-shadow(0 0 8px rgba(68, 68, 255, 1)) drop-shadow(0 0 4px rgba(68, 68, 255, 0.9))",
    };

    /**
     * Derives all rendered profiles from raw dataPoints using D3 for pure math:
     * grouping by latitude, computing scales, and generating SVG path strings.
     * No DOM manipulation — Svelte renders the output declaratively.
     */
    let profiles = $derived.by<RenderedProfile[]>(() => {
        if (dataPoints.length === 0) return [];

        const width = viewWidth - margin.left - margin.right;
        const height = viewHeight - margin.top - margin.bottom;

        const profilesMap = d3.group(dataPoints, (d) => d.y);
        const allProfiles = Array.from(profilesMap.entries())
            .map(([lat, points]) => ({
                latitude: lat,
                points: points.sort((a, b) => a.x - b.x),
                maxElevation: d3.max(points, (p) => p.z) || 0,
            }))
            .sort((a, b) => b.latitude - a.latitude);

        const filteredProfiles = allProfiles.filter((p) => p.maxElevation > 0);
        if (filteredProfiles.length === 0) return [];

        const xExtent = d3.extent(dataPoints, (d) => d.x) as [number, number];
        const xScale = d3.scaleLinear().domain(xExtent).range([0, width]);

        const maxElevation =
            d3.max(
                filteredProfiles.flatMap((p) => p.points),
                (d) => d.z,
            ) || 1000;

        const scale = 8;
        const ridgeSpacing = height / filteredProfiles.length;
        const ridgeHeight = ridgeSpacing * scale;
        const minHeightThreshold = maxElevation * 0.001;

        const elevationScale = d3
            .scaleLinear()
            .domain([0, maxElevation])
            .range([0, ridgeHeight]);

        const line = d3
            .line<DataPoint>()
            .x((d) => xScale(d.x))
            .y((d) => -elevationScale(Math.max(0, d.z)))
            .curve(d3.curveBasis);

        let dotCount = 0;

        return filteredProfiles.map((profile, i) => {
            const yOffset = i * ridgeSpacing;

            const rawSegments: DataPoint[][] = [];
            let current: DataPoint[] = [];
            for (const point of profile.points) {
                if (point.z > minHeightThreshold) {
                    current.push(point);
                } else {
                    if (current.length >= 2) rawSegments.push(current);
                    current = [];
                }
            }
            if (current.length >= 2) rawSegments.push(current);

            const segments: RenderedSegment[] = rawSegments.map((seg) => ({
                d: line(seg) ?? "",
                dotIndex: i % 8 === 0 ? dotCount++ : null,
            }));

            return { latitude: profile.latitude, yOffset, segments };
        });
    });

    async function renderRidgelines() {
        try {
            const svgElement = d3.select(svg);
            svgElement.selectAll("*").remove();

            // Load the data
            const dataPoints: DataPoint[] =
                (await d3.json("/data/europe_elevation_profiles.json")) || [];

            // Group data by latitude (y coordinate) to create profiles
            const profilesMap = d3.group(dataPoints, (d) => d.y);
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
            const width = viewWidth - margin.left - margin.right;
            const height = viewHeight - margin.top - margin.bottom;

            const g = svgElement
                .append("g")
                .attr("transform", `translate(${margin.left}, ${margin.top})`);

            // Calculate scales
            const xExtent = d3.extent(dataPoints, (d) => d.x) as [
                number,
                number,
            ];
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
                    // Draw stroke
                    const pathElement = ridgeGroup
                        .append("path")
                        .datum(segment)
                        .attr("class", "ridge-stroke")
                        .attr("d", line)
                        .attr("fill", "none")
                        .attr("stroke", colors.stroke)
                        .attr("stroke-width", 1)
                        .attr("stroke-opacity", 0.8)
                        .style(
                            "transition",
                            "opacity 0.2s ease, stroke-width 0.2s ease",
                        );

                    // Only animate dots on every 4th profile to reduce memory
                    if (i % 8 !== 0) return;

                    // Get the path node for dot animation
                    const dotPathNode = pathElement.node() as SVGPathElement;
                    if (!dotPathNode) return;

                    const dotPathLength = dotPathNode.getTotalLength();

                    // Get initial position at random point on path
                    const randomProgress = Math.random();
                    const startPoint = dotPathNode.getPointAtLength(
                        randomProgress * dotPathLength,
                    );

                    // Create animated dot for this segment with theme colors
                    const dot = ridgeGroup
                        .append("circle")
                        .attr("class", "animated-dot")
                        .attr("r", 3)
                        .attr("cx", startPoint.x)
                        .attr("cy", startPoint.y)
                        .attr("fill", colors.dotFill)
                        .attr("stroke", colors.dotStroke)
                        .attr("stroke-width", 1)
                        .style("filter", colors.dotGlow);

                    // Store dot info for RAF animation
                    animatedDots.push({
                        element: dot,
                        pathNode: dotPathNode,
                        pathLength: dotPathLength,
                        progress: randomProgress,
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
        const visibilityObserver = new IntersectionObserver(
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
            visibilityObserver.observe(container);
        }

        return () => {
            if (container) {
                visibilityObserver.unobserve(container);
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
    class="absolute inset-0 overflow-hidden z-0 pointer-events-none"
    bind:this={container}
>
    <svg
        bind:this={svg}
        class="w-full h-full"
        viewBox="0 0 {viewWidth} {viewHeight}"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
    />
</div>

<style>
</style>
