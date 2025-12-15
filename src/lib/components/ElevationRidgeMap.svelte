<script lang="ts">
    import { onMount } from "svelte";
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

    async function renderRidgelines() {
        try {
            const svgElement = d3.select(svg);
            svgElement.selectAll("*").remove();

            // Load the data
            const data: DataPoint[] = await d3.json(
                "/data/europe_elevation_profiles.json",
            );

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
                segments.forEach((segment) => {
                    // Draw stroke (color = "black")
                    ridgeGroup
                        .append("path")
                        .datum(segment)
                        .attr("class", "ridge-stroke")
                        .attr("d", line)
                        .attr("fill", "none")
                        .attr("stroke", "#000000")
                        .attr("stroke-width", 1)
                        .attr("stroke-opacity", 0.8);
                });
            });
        } catch (error) {
            console.error("Error rendering ridgelines:", error);
        }
    }

    onMount(async () => {
        await renderRidgelines();
    });
</script>

<div class="elevation-spike-map" bind:this={container}>
    <svg
        bind:this={svg}
        width="100%"
        height="100%"
        viewBox="0 0 {viewWidth} {viewHeight}"
        preserveAspectRatio="xMidYMid meet"
        xmlns="http://www.w3.org/2000/svg"
    />
</div>

<style>
    .elevation-spike-map {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
        pointer-events: none;
        background: #ffffff;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    :global(.ridgelines path) {
        transition:
            opacity 0.2s ease,
            stroke-width 0.2s ease;
    }

    :global(.ridge-group:hover .ridge-fill) {
        opacity: 0.85 !important;
    }

    :global(.ridge-group:hover .ridge-stroke) {
        stroke-width: 1;
    }
</style>
