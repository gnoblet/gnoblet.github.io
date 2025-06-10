// src/data/projects.ts
import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "TidyTuesday Contributions",
    slug: "tidytuesday",
    description:
      "My weekly data visualization contributions to the #TidyTuesday social data project. Each visualization explores different datasets using R and Python, showcasing various visualization techniques and data analysis approaches.",
    imageUrl: "https://via.placeholder.com/400x300?text=TidyTuesday",
    projectUrl: "https://github.com/gnoblet/TidyTuesday/tree/main",
    tags: ["R", "Python", "data visualization", "data analysis", "ongoing"],
  },
  {
    id: 2,
    title: "30 Day Chart Challenge",
    slug: "30-day-chart-challenge",
    description:
      "My submissions for the #30DayChartChallenge, a community-driven data visualization event where participants create and share charts based on daily prompts. This project demonstrates my skills in creating diverse data visualizations using R and Python.",
    imageUrl: "https://via.placeholder.com/400x300?text=30DayChartChallenge",
    projectUrl: "https://github.com/gnoblet/30DayChartChallenge",
    tags: ["R", "Python", "data visualization", "challenge", "creative"],
  },
  {
    id: 3,
    title: "hespeR: Humanitarian Emergency Settings Perceived Needs Scale",
    slug: "hespeR",
    description:
      "(Ongoing) R package for handling the WHO's Humanitarian Emergency Settings Perceived Needs Scale (HESPER). Developed in collaboration with Raphael Bacot to provide tools for data analysis, composition, cleaning and visualization of humanitarian needs assessments based on the HESPER methodology.",
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
    title: "visualizeR: Utility functions for Humanitarian Analysis",
    slug: "visualizeR",
    description:
      "(Ongoing) R package providing utility functions and sane defaults for humanitarian analysts with colors, scales and default visualizations. Includes ready-to-go color palettes and pre-configured visualization templates for common humanitarian data presentation needs.",
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
      "First comprehensive multisectoral package for humanitarian indicators. Provides functions to compose usual humanitarian composite indicators related to IMPACT Multi-Sector Needs Assessments (MSNAs). Includes food security indicators, Washington Group Short Set of questions, JMP ladders, and specific indicators related to the MSNI framework.",
    imageUrl:
      "https://raw.githubusercontent.com/impact-initiatives-hppu/humind/main/man/figures/logo.png",
    projectUrl: "https://github.com/impact-initiatives-hppu/humind",
    tags: ["R", "humanitarian", "data analysis", "indicators", "package"],
  },
  {
    id: 6,
    title:
      "'The Eyes and Ears of the Agricultural Markets': A History of Information in Interwar Agricultural Economics",
    slug: "eyes-and-ears",
    description:
      "This article with Thomas Delcey offers a historical analysis of the contributions of U.S. interwar agricultural economics to the economics of information. ",
    imageUrl: "https://via.placeholder.com/400x300?text=E-Commerce",
    projectUrl:
      "https://hope.econ.duke.edu/publications/eyes-and-ears-agricultural-markets-history-information-interwar-agricultural-economics",
    tags: ["article", "research", "history", "economics", "U.S.A"],
  },
];
