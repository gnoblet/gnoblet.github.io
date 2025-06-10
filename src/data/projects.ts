// src/data/projects.ts
import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "TidyTuesday Contributions",
    slug: "tidytuesday",
    description:
      "My weekly data visualization contributions to #TidyTuesday. Each visualization explores different datasets using R and Python, showcasing various visualization techniques and data analysis approaches. Nothing much there yet.",
    imageUrl: "https://via.placeholder.com/400x300?text=TidyTuesday",
    projectUrl: "https://github.com/gnoblet/TidyTuesday/tree/main",
    tags: ["R", "Python", "data visualization", "data analysis", "ongoing"],
  },
  {
    id: 2,
    title: "30 Day Chart Challenge",
    slug: "30-day-chart-challenge",
    description:
      "My submissions for the #30DayChartChallenge, a community-driven data visualization event where participants create and share charts based on daily prompts. First participation in 2025.",
    imageUrl: "https://via.placeholder.com/400x300?text=30DayChartChallenge",
    projectUrl: "https://github.com/gnoblet/30DayChartChallenge",
    tags: ["R", "Python", "data visualization", "challenge", "creative"],
  },
  {
    id: 3,
    title: "hespeR: Humanitarian Emergency Settings Perceived Needs Scale",
    slug: "hespeR",
    description:
      "(Ongoing) R package for handling the WHO's Humanitarian Emergency Settings Perceived Needs Scale (HESPER). In collaboration with Raphael Bacot, it aims to provide an integrated data workflow (wrangling, analysis, reporting, and visualization) based on the HESPER survey methodology.",
    imageUrl: "https://via.placeholder.com/400x300?text=hespeR",
    projectUrl: "https://github.com/gnoblet/hespeR",
    tags: [
      "R",
      "humanitarian",
      "needs assessment",
      "WHO",
      "package",
      "ongoing",
    ],
  },
  {
    id: 4,
    title: "visualizeR: Utility functions for Humanitarian Viz",
    slug: "visualizeR",
    description:
      "(Ongoing) R package providing utility functions and sane defaults for humanitarian analysts with colors, scales and default visualizations. Includes ready-to-go color palettes and pre-configured visualization templates for common humanitarian data viz needs.",
    imageUrl:
      "https://raw.githubusercontent.com/gnoblet/visualizeR/revamp/man/figures/logo.png",
    projectUrl: "https://github.com/gnoblet/visualizeR/tree/revamp",
    tags: ["R", "data visualization", "humanitarian", "package", "ongoing"],
  },
  {
    id: 5,
    title: "humind: Humanitarian Indicators Package",
    slug: "humind",
    description:
      "First comprehensive multisectoral package for humanitarian indicators. Provides functions to prepare usual humanitarian composite indicators related to household-level Multi-Sector Needs Assessments (MSNAs). While still in early-stage of development, it covers usual food security indicators, Washington Group Short Set of questions, JMP ladders among others.",
    imageUrl:
      "https://raw.githubusercontent.com/impact-initiatives-hppu/humind/main/man/figures/logo.png",
    projectUrl: "https://github.com/impact-initiatives-hppu/humind",
    tags: ["R", "humanitarian", "data analysis", "indicators", "package"],
  },
];
