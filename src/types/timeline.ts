// src/types/timeline.ts

/**
 * Interface representing a timeline entry for a work or education experience
 */
export interface TimelineEntry {
  /**
   * The time period of the experience (e.g., "2020 - 2022")
   */
  period: string;
  
  /**
   * The company or organization name
   */
  company: string;
  
  /**
   * The job title or role held
   */
  role: string;
  
  /**
   * A brief description of responsibilities and achievements
   */
  description: string;
  
  /**
   * Optional URL to the company or organization website
   */
  companyUrl?: string;
  
  /**
   * Optional location of the job/role
   */
  location?: string;
  
  /**
   * Optional list of key skills or technologies used
   */
  skills?: string[];
  
  /**
   * Optional list of achievements or notable projects
   */
  achievements?: string[];
}