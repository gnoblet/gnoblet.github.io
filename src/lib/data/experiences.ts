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
    title: "Research & Data Manager and Specialist",
    company: "IMPACT Initiatives",
    period: "2023 - Present",
    description:
      "I led the Global R&D team for Multi-Sector Needs Assessments (MSNAs), overseeing survey design and implementation across 20+ countries. I developed data pipelines and R packages from cleaning to visualization. I ran capacity-building workshops and advised donors and UN agencies on data-driven funding decisions.",
    location: "Geneva, Switzerland",
    technologies: ["R", "Shiny", "ggplot2", "Data Pipelines", "Survey Design"],
  },
  {
    id: 2,
    title: "(Quantitative Survey) Research & Data Lead",
    company: "IMPACT Initiatives",
    period: "2021 - 2023",
    description:
      "I managed full field-research cycles for nationwide MSNAs, from survey design to analysis using R/Python and Kobo Toolbox. I developed interactive dashboards and visualizations to translate complex findings into actionable insights. I led cross-functional teams of up to 40 staff and co-chaired inter-agency groups to standardize data quality across humanitarian agencies.",
    location: "Port-au-Prince, Haiti & Ouagadougou, Burkina Faso",
    technologies: ["R", "Python", "Kobo Toolbox", "GIS", "Data Visualization"],
  },
  {
    id: 3,
    title: "PhD Candidate in (History of) Economics",
    company: "University of Paris 1 Panthéon-Sorbonne",
    period: "2016 - 2021",
    description:
      "Thesis on agricultural economics in interwar United States, focusing on methods, experiments, and statistics. I co-authored peer-reviewed papers, coordinated the REHPERE research network, and served as Assistant Managing Editor for Œconomia. I also taught mathematics and economic analysis to undegrads and grads students.",
    location: "Paris, France",
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
    period: "2015 - 2016",
    description:
      "I developed economic dynamic models of inequalities integrating climate change risks with Gaël Giraud, Chief Economist at Agence Française de Développement.",
    location: "Geneva, Switzerland",
    technologies: [
      "Economic Modeling",
      "Data Analysis",
      "Climate Risk Assessment",
    ],
  },
];
