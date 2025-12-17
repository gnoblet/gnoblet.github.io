export interface PortfolioItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  thumbnailUrl: string;
  portfolioUrl?: string;
  date: string;
  category: string;
}
