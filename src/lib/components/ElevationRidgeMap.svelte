<script lang="ts">
    import * as d3 from "d3";

    let container: HTMLDivElement | undefined = $state();

    const viewWidth = 1600;
    const viewHeight = 900;
    const margin = { top: 20, right: 20, bottom: 20, left: 20 };

    interface DataPoint {
        x: number; // longitude
        y: number; // latitude
        z: number; // elevation
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
        /** SVG y-offset of the profile group this dot lives in; added to cy at render time. */
        yOffset: number;
    }

    let isVisible = $state(false);
    let dataPoints = $state<DataPoint[]>([]);
    let dots = $state<DotState[]>([]);

    // Populated by bind:this on dot-eligible <path> elements; not reactive.
    let pathRefs: (SVGPathElement | null)[] = [];

    // Phosphor Cyan theme colors
    const colors = {
        stroke: "rgba(0, 212, 160, 0.38)",     /* phosphor cyan ridgelines */
        dotFill: "#00D4A0",                     /* primary neon cyan-green */
        dotStroke: "#06100E",
        dotGlow:
            "drop-shadow(0 0 16px rgba(0,212,160,0.9)) drop-shadow(0 0 8px rgba(0,212,160,0.7)) drop-shadow(0 0 4px rgba(0,212,160,0.5))",
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

    // Load elevation data from JSON; setting dataPoints triggers $derived profiles.
    $effect(() => {
        d3.json<DataPoint[]>("/data/europe_elevation_profiles.json").then(
            (data) => {
                dataPoints = data ?? [];
            },
        );
    });

    // After profiles recompute, bind:this has already populated pathRefs.
    // Re-initialize dots from the freshly bound SVGPathElements.
    $effect(() => {
        void profiles;

        // Build dotIndex → yOffset lookup so dots rendered outside profile groups
        // can still be positioned correctly in global SVG space.
        const yOffsets: number[] = [];
        for (const profile of profiles) {
            for (const seg of profile.segments) {
                if (seg.dotIndex !== null) {
                    yOffsets[seg.dotIndex] = profile.yOffset;
                }
            }
        }

        dots = pathRefs
            .filter((node): node is SVGPathElement => node !== null)
            .map((node, i): DotState => {
                const pathLength = node.getTotalLength();
                const progress = Math.random();
                const pt = node.getPointAtLength(progress * pathLength);
                return {
                    pathNode: node,
                    pathLength,
                    progress,
                    speed: 1 / 8000,
                    cx: pt.x,
                    cy: pt.y,
                    yOffset: yOffsets[i] ?? 0,
                };
            });
    });

    // RAF animation loop; pauses when scrolled out of view, cleans up on destroy.
    $effect(() => {
        if (!isVisible || dots.length === 0) return;

        let id: number;
        let last = performance.now();

        function animate(now: number) {
            const dt = now - last;
            last = now;
            for (const dot of dots) {
                dot.progress = (dot.progress + dot.speed * dt) % 1;
                const pt = dot.pathNode.getPointAtLength(
                    dot.progress * dot.pathLength,
                );
                dot.cx = pt.x;
                dot.cy = pt.y;
            }
            id = requestAnimationFrame(animate);
        }

        id = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(id);
    });

    // Pause animation when the component scrolls out of the viewport.
    $effect(() => {
        if (!container) return;
        const obs = new IntersectionObserver(
            (entries) => {
                isVisible = entries[0].isIntersecting;
            },
            { threshold: 0.1 },
        );
        obs.observe(container);
        return () => obs.disconnect();
    });
</script>

<div
    class="absolute inset-0 overflow-hidden z-0 pointer-events-none"
    bind:this={container}
>
    <svg
        class="w-full h-full"
        viewBox="0 0 {viewWidth} {viewHeight}"
        preserveAspectRatio="xMidYMin slice"
        xmlns="http://www.w3.org/2000/svg"
    >
        <g transform="translate({margin.left}, {margin.top})">
            {#each profiles as profile (profile.latitude)}
                <g transform="translate(0, {profile.yOffset})">
                    {#each profile.segments as seg}
                        {#if seg.dotIndex !== null}
                            <path
                                d={seg.d}
                                fill="none"
                                stroke={colors.stroke}
                                stroke-width="1"
                                stroke-opacity="0.8"
                                bind:this={pathRefs[seg.dotIndex]}
                            />
                        {:else}
                            <path
                                d={seg.d}
                                fill="none"
                                stroke={colors.stroke}
                                stroke-width="1"
                                stroke-opacity="0.8"
                            />
                        {/if}
                    {/each}
                </g>
            {/each}
            {#each dots as dot}
                <circle
                    cx={dot.cx}
                    cy={dot.cy + dot.yOffset}
                    r="3"
                    fill={colors.dotFill}
                    stroke={colors.dotStroke}
                    stroke-width="1"
                    style:filter={colors.dotGlow}
                />
            {/each}
        </g>
    </svg>
</div>

<style>
</style>
