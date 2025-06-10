export interface QuartoDocument {
  slug: string;
  title: string;
  date?: string;
  description?: string;
  categories?: string[];
}

export interface QuartoCardProps {
  doc: QuartoDocument;
  className?: string;
  onTagClick?: (tag: string) => void;
  selectedTags?: string[];
}

export interface QuartoPostsGridProps {
  maxPosts?: number;
  className?: string;
  cardClassName?: string;
  onDocumentsLoaded?: (documents: QuartoDocument[]) => void;
}

export interface LatestQuartoPostsProps {
  maxPosts?: number;
}