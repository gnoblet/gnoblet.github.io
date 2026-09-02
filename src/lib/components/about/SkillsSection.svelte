<script lang="ts">
    import ElevationRidgeMap from "$lib/components/ElevationRidgeMap.svelte";
    import { borderDraw } from "$lib/actions/borderDraw.svelte";
</script>

<div class="relative w-screen left-1/2 -translate-x-1/2 overflow-hidden py-20 flex items-center justify-center">
    <ElevationRidgeMap />
    <div
        class="relative z-10 max-w-5xl w-full mx-4 bg-base-100/75 p-8 border-draw neon-item"
        use:borderDraw
    >
        <h3 class="text-2xl font-bold mb-4">Skills</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-4 text-lg">
   
            <p> Mostly self-taught—I'm exceptionally good at some skills and still developing others. 
                
            But I'll take the time to learn for every new task. My toolkit runs from
            <span class="text-highlight">R</span> (a lot) and
            <span class="text-highlight">Python</span> for statistics, survey design, data pipelines and data viz. 
            
            I really like the packaging and testing work, not sure why. And I love a good map made with <span class="text-highlight">ggplot2</span>!

            
            </p>
            <p>
                Happily building interactive
                dashboards (<span class="text-highlight">Shiny</span>,
                <span class="text-highlight">d3.js</span> more and more, and <span class="text-highlight">Svelte</span>) that make the data tangible for non-technical audiences,
                
                I'm just as at home with <span class="text-highlight">Quarto</span> to write reports as I am building small web tools. I used to have a soft spot for LaTeX , but I guess it's time to move on to  <span class="text-highlight">Typst</span>.
            </p>
        </div>
    </div>
</div>
