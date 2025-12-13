// src/lib/data/dataVizProjects.ts
import type { Project } from "../types/project";

export const dataVizProjects: Project[] = [
  {
    id: 1,
    title: "ggbranding",
    slug: "ggbranding",
    description:
      "Easily add personal branding elements like social media icons to 'ggplot2' charts such as GitHub, GitLab, LinkedIn, Bluesky, and other brand icons with minimal effort. Automatically downloads Font Awesome 7 fonts from official sources if not already available.",
    imageUrl:
      "https://raw.githubusercontent.com/gnoblet/ggbranding/main/man/figures/logo.png",
    projectUrl: "https://gnoblet.github.io/ggbranding/",
    tags: ["R", "ggplot2", "branding", "visualization", "package"],
    badge: "new",
  },
  {
    id: 2,
    title: "SurveyLiteR",
    slug: "surveyliter",
    description:
      "A streamlined workflow for analyzing survey data based on sampling designs (weights, strata, clusters). Perfect for KoboToolbox data and humanitarian survey analysis, offering standardized analysis functions built on top of the srvyr package with consistent outputs for faster reporting and visualization.",
    imageUrl:
      "https://gnoblet.github.io/SurveyLiteR/reference/figures/logo.svg",
    projectUrl: "https://github.com/gnoblet/SurveyLiteR",
    tags: [
      "R",
      "survey analysis",
      "KoboToolbox",
      "humanitarian",
      "data analysis",
      "package",
    ],
  },
  {
    id: 3,
    title: "House Expenses Accounting",
    slug: "house-expenses-accounting",
    description:
      "A Shiny app for fair, flexible, and transparent splitting of shared household expenses. Handles absences, partial participation, always-shared services, and provides detailed analysis and professional reports. Built with the Golem framework for robust R Shiny apps.",
    imageUrl: "/images/projects/house-expenses-accounting_homepage.png",
    projectUrl: "https://github.com/gnoblet/house-expenses-accounting",
    tags: [
      "R",
      "Shiny",
      "expense tracking",
      "fairness",
      "data analysis",
      "automation",
    ],
  },
  {
    id: 4,
    title: "TidyTuesday Contributions",
    slug: "tidytuesday",
    description:
      "My weekly data visualization contributions to #TidyTuesday. Each visualization explores different datasets using R and Python, showcasing various visualization techniques and data analysis approaches. Nothing much there yet.",
    imageUrl: "/images/projects/tidytuesday.png",
    projectUrl: "https://gnoblet.github.io/TidyTuesday/",
    tags: ["R", "Python", "data visualization", "data analysis", "ongoing"],
    badge: "ongoing",
  },
  {
    id: 5,
    title: "30 Day Chart Challenge",
    slug: "30-day-chart-challenge",
    description:
      "My submissions for the #30DayChartChallenge, a community-driven data visualization event where participants create and share charts based on daily prompts. First participation in 2025.",
    imageUrl: "/images/projects/30-day-chart-challenge.png",
    projectUrl: "https://gnoblet.github.io/30DayChartChallenge/",
    tags: ["R", "Python", "data visualization", "challenge", "creative"],
  },
  {
    id: 6,
    title: "hespeR: Humanitarian Emergency Settings Perceived Needs Scale",
    slug: "hespeR",
    description:
      "(Ongoing) R package for handling the WHO's Humanitarian Emergency Settings Perceived Needs Scale (HESPER). In collaboration with Raphael Bacot, it aims to provide an integrated data workflow (wrangling, analysis, reporting, and visualization) based on the HESPER survey methodology.",
    imageUrl: "/images/projects/hespeR.svg",
    projectUrl: "https://github.com/gnoblet/hespeR",
    tags: [
      "R",
      "humanitarian",
      "needs assessment",
      "WHO",
      "package",
      "ongoing",
    ],
    badge: "ongoing",
  },
  {
    id: 7,
    title: "visualizeR: Utility functions for Humanitarian Viz",
    slug: "visualizeR",
    description:
      "(Ongoing) R package providing utility functions and sane defaults for humanitarian analysts with colors, scales and default visualizations. Includes ready-to-go color palettes and pre-configured visualization templates for common humanitarian data viz needs.",
    imageUrl:
      "https://raw.githubusercontent.com/gnoblet/visualizeR/revamp/man/figures/logo.png",
    projectUrl: "https://github.com/gnoblet/visualizeR/tree/revamp",
    tags: ["R", "data visualization", "humanitarian", "package", "ongoing"],
    badge: "ongoing",
  },
  {
    id: 8,
    title: "humind: Humanitarian Indicators Package",
    slug: "humind",
    description:
      "First comprehensive multisectoral package for humanitarian indicators. Provides functions to prepare usual humanitarian composite indicators related to household-level Multi-Sector Needs Assessments (MSNAs). While still in early-stage of development, it covers usual food security indicators, Washington Group Short Set of questions, JMP ladders among others.",
    imageUrl:
      "https://raw.githubusercontent.com/impact-initiatives-hppu/humind/main/man/figures/logo.png",
    projectUrl: "https://impact-initiatives-hppu.github.io/humind/",
    tags: ["R", "humanitarian", "data analysis", "indicators", "package"],
  },
];
