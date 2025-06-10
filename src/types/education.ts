// src/types/education.ts

/**
 * Interface representing an education entry
 */
export interface Education {
  /**
   * The degree or diploma obtained
   */
  degree: string;
  
  /**
   * The institution where the education was received
   */
  institution: string;
  
  /**
   * Optional thesis title if applicable
   */
  thesis?: string;
  
  /**
   * Years during which the education was pursued (e.g., "2018-2022")
   */
  years: string;
}

/**
 * Array type for multiple education entries
 */
export type EducationList = Education[];