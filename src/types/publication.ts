export interface Publication {
  title: string;
  authors: string[];
  journal: string;
  year: number;
  volume?: string;
  issue?: string;
  pages?: string;
  url: string;
}

export type PublicationList = Publication[];
