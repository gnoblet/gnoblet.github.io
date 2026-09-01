<script lang="ts">
    import AboutSection from "$lib/components/about/AboutSection.svelte";
    import SkillsSection from "$lib/components/about/SkillsSection.svelte";
    import ExperienceSection from "$lib/components/about/ExperienceSection.svelte";
    import EducationSection from "$lib/components/about/EducationSection.svelte";
    import PublicationsSection from "$lib/components/about/PublicationsSection.svelte";
</script>

<section id="about-me" class="py-28 px-4 bg-base-100">
    <div class="section-container">
        <!-- Header Section -->
        <div class="text-center mb-16">
            <h2 class="section-title">About Me</h2>
        </div>

        <!-- Stacked sections -->
        <div class="max-w-6xl mx-auto">
            <div class="mb-20">
                <AboutSection />
            </div>
            <div class="mb-20">
                <SkillsSection />
            </div>
            <div class="mb-20">
                <ExperienceSection />
            </div>
            <div class="mb-20 grid grid-cols-1 lg:grid-cols-2 gap-8 gap-x-12">
                <EducationSection />
                <PublicationsSection />
            </div>
        </div>
    </div>
</section>
