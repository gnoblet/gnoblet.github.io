<script lang="ts">
    import { onMount } from "svelte";
    import * as d3 from "d3";

    let container: HTMLDivElement;
    let svg: SVGSVGElement;

    const viewWidth = 1500;
    const viewHeight = 600;

    async function loadAndRenderRivers() {
        try {
            // Load Natural Earth 50m rivers data
            const riverData = await d3.json(
                "/data/ne_50m_rivers_lake_centerlines_scale_rank.json",
            );

            // console.log("Loaded features:", riverData.features?.length || 0);

            // Filter out lakes, keep only rivers
            const rivers = riverData.features.filter((feature: any) => {
                const featurecla = feature.properties?.featurecla || "";
                // Keep only "River" features, exclude "Lake Centerline"
                return featurecla === "River";
            });

            // console.log("Filtered rivers:", rivers.length);

            const svgElement = d3.select(svg);
            svgElement.selectAll("*").remove();

            // Natural Earth data is in lat/lon, use geoMercator
            const projection = d3.geoMercator();

            //
            const pathGenerator = d3.geoPath().projection(projection);

            // Create river group
            const riverGroup = svgElement.append("g").attr("class", "rivers");

            // Draw rivers
            riverGroup
                .selectAll("path")
                .data(rivers)
                .enter()
                .append("path")
                .attr("d", (d: any) => pathGenerator(d))
                .attr("fill", "none")
                .attr("stroke", "blue")
                .attr("class", "river-path");
        } catch (error) {
            console.error("Error loading river data:", error);
        }
    }

    // Use load

    onMount(async () => {
        await loadAndRenderRivers();
    });
</script>

<div class="map-basin-background" bind:this={container}>
    <svg
        bind:this={svg}
        width="100%"
        height="100%"
        viewBox="0 0 {viewWidth} {viewHeight}"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
    />
</div>

<style>
    .map-basin-background {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: hidden;
        z-index: 0;
        pointer-events: none;
        opacity: 0.7;
    }

    svg {
        width: 100%;
        height: 100%;
    }

    :global(.river-path) {
        transition: opacity 0.3s ease;
    }

    :global(.river-glow) {
        transition: opacity 0.3s ease;
    }

    :global(.land-path) {
        transition: fill 0.5s ease;
    }
</style>
