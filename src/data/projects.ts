// src/data/projects.ts
import { Project } from "../types/project";

export const projects: Project[] = [
  {
    id: 1,
    title: "E-Commerce Platform",
    slug: "e-commerce-platform",
    description:
      "A fully responsive e-commerce solution with cart functionality and payment integration.",
    imageUrl: "https://via.placeholder.com/400x300?text=E-Commerce",
    projectUrl: "https://example.com/project1",
    tags: ["react", "typescript", "node.js", "mongodb", "frontend", "backend"],
  },
  {
    id: 2,
    title: "Weather App",
    slug: "weather-app",
    description:
      "Real-time weather forecasting application with geolocation support.",
    imageUrl: "https://via.placeholder.com/400x300?text=Weather+App",
    projectUrl: "https://example.com/project2",
    tags: ["react", "api", "frontend"],
  },
  {
    id: 3,
    title: "Task Management Dashboard",
    slug: "task-management",
    description:
      "An interactive dashboard for managing tasks and tracking productivity.",
    imageUrl: "https://via.placeholder.com/400x300?text=Task+Management",
    projectUrl: "https://example.com/project3",
    tags: ["react", "redux", "typescript", "frontend"],
  },
  {
    id: 4,
    title: "Social Media Analytics",
    slug: "social-media-analytics",
    description:
      "Dashboard for tracking social media engagement and audience insights.",
    imageUrl: "https://via.placeholder.com/400x300?text=Social+Analytics",
    projectUrl: "https://example.com/project4",
    tags: ["data visualization", "d3.js", "react", "api"],
  },
  {
    id: 5,
    title: "Healthcare Portal",
    slug: "healthcare-portal",
    description:
      "Secure patient portal for healthcare services with appointment scheduling.",
    imageUrl: "https://via.placeholder.com/400x300?text=Healthcare",
    projectUrl: "https://example.com/project5",
    tags: ["react", "node.js", "security", "fullstack"],
  },
  {
    id: 6,
    title: "Real Estate Listings",
    slug: "real-estate",
    description:
      "Property listing platform with map integration and filtering options.",
    imageUrl: "https://via.placeholder.com/400x300?text=Real+Estate",
    projectUrl: "https://example.com/project6",
    tags: ["react", "maps", "api", "frontend"],
  },
  {
    id: 7,
    title: "Educational Learning System",
    slug: "learning-system",
    description:
      "Interactive learning platform with progress tracking and assessments.",
    imageUrl: "https://via.placeholder.com/400x300?text=Learning",
    projectUrl: "https://example.com/project7",
    tags: ["react", "firebase", "education", "fullstack"],
  },
  {
    id: 8,
    title: "Budget Tracker",
    slug: "budget-tracker",
    description:
      "Personal finance app for tracking expenses and managing budgets.",
    imageUrl: "https://via.placeholder.com/400x300?text=Budget",
    projectUrl: "https://example.com/project8",
    tags: ["react", "charts", "localstorage", "frontend"],
  },
];
