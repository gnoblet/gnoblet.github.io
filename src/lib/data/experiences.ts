import type { Experience } from "../types/experience";

export const experiences: Experience[] = [
    {
        id: 1,
        title: "Software Developer",
        company: "Tech Company",
        period: "2022 - Present",
        description:
            "Developing modern web applications using cutting-edge technologies. Working with cross-functional teams to deliver high-quality solutions.",
        location: "Remote",
        technologies: ["TypeScript", "React", "Node.js", "PostgreSQL"],
    },
    {
        id: 2,
        title: "Junior Developer",
        company: "Startup Inc.",
        period: "2020 - 2022",
        description:
            "Built and maintained responsive web applications. Collaborated with designers to implement pixel-perfect UIs.",
        location: "San Francisco, CA",
        technologies: ["JavaScript", "Vue.js", "HTML/CSS", "MongoDB"],
    },
];
