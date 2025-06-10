// src/pages/AboutMe.tsx
import React from "react";
import Timeline from "../components/Timeline";
import Education from "../components/Education";
import FeaturesList from "../components/FeaturesList";
import Publications from "../components/Publications";
import Title from "../components/layout/Title";

const AboutMe: React.FC = () => {
  return (
    <div className="page-spacing">
      <Title
        title="About Me"
        subtitle="I'm a (humanitarian) quantitative researcher who loves a good meme almost
        as much as bouncing ideas around with others. Whether I'm trying to make
        sense of messy data or just swapping stories about bits of history,
        I genuinely enjoy taking complicated things and making them a little
        clearer —for others, and honestly, for myself too. And if we can share a
        laugh or two along the way, even better."
        marginAfterSubtitle="var(--spacing-2xl)"
      />

      <div
        style={{
          width: "100%",
          maxWidth: "var(--content-width-narrow)",
          margin: "0 auto",
          textAlign: "left",
        }}
      >
        <h3>
          ✨ Things I'm good at, enjoy, and feel somewhat passionate about
        </h3>

        <FeaturesList />

        <h3> ⏰ A little professional timeline </h3>

        <Timeline />

        <h3>
          📚 Before entering the workforce, I had the chance to got to the
          university
        </h3>

        <Education />

        <h3>
          📄 I’ve also done some academic research, and I might dip back into it
          from time to time.
        </h3>

        <Publications />
      </div>
    </div>
  );
};

export default AboutMe;
