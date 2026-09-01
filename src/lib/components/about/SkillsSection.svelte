<script lang="ts">
    import { borderDraw } from "$lib/actions/borderDraw.svelte";
</script>

<div class="bg-base-100/75 p-8 border-draw neon-item" use:borderDraw>
    <h2 class="card-title text-3xl mb-4">Skills</h2>

    <div class="flex flex-col lg:flex-row gap-8 items-center">
        <img
            src="/images/memes/skills.jpg"
            alt="Self-taught skills meme showing multiple skills being offered at once"
            class="max-w-sm shadow-2xl"
        />
        <div class="space-y-4 text-lg">
            <p>
                Mostly self-taught—I'm exceptionally good at some of
                the below and still developing others. But I'll take the
                time to learn for every new task.
            </p>
            <p>
                My toolkit runs from
                <span class="text-highlight">R</span> (a lot) and
                <span class="text-highlight">Python</span> for statistics,
                survey design, data pipelines and data viz. I do also love a good map made with <span class="text-highlight">ggplot2</span>! Happily building interactive
                dashboards (<span class="text-highlight">Shiny</span>,
                <span class="text-highlight">d3.js</span> more and more, and <span class="text-highlight">Svelte</span>) that make the
                data tangible for non-technical audiences.
            </p>
            <p>
                I'm just as at home with <span class="text-highlight">Quarto</span> to write reports
                as I am building
                small web tools. I used to have a soft spot for LaTeX , but I guess it's time to move on to  <span class="text-highlight">Typst</span>.
            </p>
        </div>
    </div>
</div>
