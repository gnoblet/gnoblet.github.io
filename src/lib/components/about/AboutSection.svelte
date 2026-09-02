<script lang="ts">
    import SkillsSection from "./SkillsSection.svelte";
</script>

<div class="mb-16">
    <h3 class="card-title font-bold text-2xl mb-4">My Story (and what a story!)</h3>

    <div class="flex flex-col lg:flex-row gap-8 items-center">
        <div class="space-y-4 text-lg leading-relaxed">
            <p>
                I'd say I'm a
                <span class="text-highlight"
                    >quantitative social-science researcher</span
                > today. I've been trained in mathematics, statistics economics, and history of science before I moved to humanitarian field
                research. 
            </p>

            <p>
                Over the past four years I've led
                <span class="text-highlight"
                    >nationwide data collection efforts</span
                >
                in crisis settings for IMPACT Initiatives. I then moved to a role where I manage the Global R&D team for these large-scale humanitarian surveys in 20+ countries, overseeing the design, implementation, and methodological innovation. So, in short (after this long intro), I thrive in a weird mix between managing research projects and getting hands-on with survey design and messy data cleaning and analysis. 
            </p>

            <p>
                I'm especially passionate about
                <span class="text-highlight"
                    >data visualization</span
                >
                and communicating findings carefull. Also, I very much love learning by doing. Which is why I built this website, mostly to try out things!
            </p>
        </div>
        <img
            src="/images/memes/story.jpeg"
            alt="How important this story is meme"
            class="max-w-sm shadow-2xl"
        />
    </div>
</div>

<div class="px-10 mb-16">
    <h3 class="text-2xl font-bold ml-4 mt-1 mb-4">How I Approach Data (my 2 cents)</h3>

    <div class="grid grid-cols-1 md:grid-cols-2 gap-4 m-4">
        <div class="flex items-start gap-3">
            <div class="badge badge-primary badge-lg mt-1">✓</div>
            <div>
                <p class="font-bold">
                    Data without context is just data
                </p>
                <p class="text-base-content/90 mr-6">
                    Data is constructed, not just collected: understanding
                    how is needed to shape stories.
                </p>
            </div>
        </div>
        <div class="flex items-start gap-3">
            <div class="badge badge-primary badge-lg mt-1">✓</div>
            <div>
                <h4 class="text-lg font-bold">Collective work</h4>
                <p class="text-base-content/90 mr-6">
                    Sharing knowledge horizontally, and
                    building systems that work without me.
                </p>
            </div>
        </div>
        <div class="flex items-start gap-3">
            <div class="badge badge-primary badge-lg mt-1">✓</div>
            <div>
                <h4 class="text-lg font-bold">Transparency & rigor</h4>
                <p class="text-base-content/90 mr-6">
                    Honest analysis backed by solid methodology, not just
                    pretty charts.
                </p>
            </div>
        </div>

        <div class="flex items-start gap-3">
            <div class="badge badge-primary badge-lg mt-1">✓</div>
            <div>
                <h4 class="text-lg font-bold">Learning by doing</h4>
                <p class="text-base-content/90 mr-6">
                    The best way to understand something is to dive in,
                    break it, and fix it.
                </p>
            </div>
        </div>
    </div>
</div>

<SkillsSection />
