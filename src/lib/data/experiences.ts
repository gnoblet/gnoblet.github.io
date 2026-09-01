import type { Experience } from "../types/experience";

export const experiences: Experience[] = [
  {
    id: 5,
    title: "More to come...",
    company: "The journey continues",
    period: "Future",
    description: "",
    location: "",
    technologies: [],
  }, 
  {
    id: 1,
    title: "Data Visualization & Web Dev Specialist",
    company: "IMPACT Initiatives",
    period: "January to June 2026",
    description: "I built the ANA app featured above, a browser-based analytical pipeline app that ingests raw data and outputs flagged data, pre-populated xlsx files, and interactive visualisations to move teams away from manual Excel-based processes.",
    location: "Switzerland",
    technologies: ["Svelte", "TypeScript", "Tailwind CSS", "DaisyUI", "Data Visualization"],
  },
  {
    id: 1,
    title: "Research & Data Manager and Specialist",
    company: "IMPACT Initiatives",
    period: "2023 — 2025",
    description:
      "I led the Global R&D team for large-scale humanitarian surveys in 20+ countries, overseeing the design, implementation, and methodological innovation. Job was quite broad. I did develop and maintain reproducible R packages and data pipelines for cleaning, analysis, and advanced viz. I also led capacity-building initiatives to strengthen data quality and guidelines with 10+ technical specialists.",
    location: "Switzerland",
    technologies: ["R", "Shiny", "ggplot2", "Data Pipelines", "Survey Design"],
  },
  {
    id: 2,
    title: "(Quantitative Survey) Research & Data Lead",
    company: "IMPACT Initiatives",
    period: "2021 — 2023",
    description:
      "I managed full field-research cycles for nationwide humanitarian surveys, from survey design to analysis using R/Python and Kobo Toolbox. I developed interactive dashboards and visualizations to translate quite complex data and findings to a non-technical audience. I led cross-functional teams of up to 40 staff and co-chaired inter-UN agency groups to standardize data quality across humanitarian agencies.",
    location: "Haiti & Burkina Faso",
    technologies: ["R", "Python", "Kobo Toolbox", "GIS", "Data Visualization"],
  },
  {
    id: 3,
    title: "PhD Candidate in (History of) Economics",
    company: "University of Paris 1 Panthéon-Sorbonne",
    period: "2017 — 2020",
    description:
      "Thesis on agricultural economics in interwar United States, focusing on methods, experiments, and statistics. I co-authored peer-reviewed papers, coordinated the REHPERE research network, and served as Assistant Managing Editor for Œconomia. I also taught mathematics and economic analysis to undegrads and grads students.",
    location: "France",
    technologies: [
      "Research Methods",
      "Economic Analysis",
      "Statistics",
      "Academic Writing",
    ],
  },
  {
    id: 4,
    title: "Research Associate",
    company: "Chair of Energy and Prosperity, Institut Louis Bachelier",
    period: "2015 — 2016",
    description:
      "I developed economic dynamic models of inequalities integrating climate change risks with Gaël Giraud, Chief Economist at Agence Française de Développement.",
    location: "France",
    technologies: [
      "Economic Modeling",
      "Data Analysis",
      "Climate Risk Assessment",
    ],
  },
];
