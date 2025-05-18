import { useState, useEffect } from 'react';

interface UseTagFilterProps<T> {
  items: T[];
  getItemTags: (item: T) => string[];
}

interface UseTagFilterResult<T> {
  filteredItems: T[];
  selectedTags: string[];
  allTags: string[];
  handleTagSelect: (tag: string) => void;
  handleTagClick: (tag: string) => void;
  handleClearAllTags: () => void;
}

/**
 * Custom hook for filtering items by tags
 * @param items - Array of items to filter
 * @param getItemTags - Function to get tags from an item
 */
function useTagFilter<T>({
  items,
  getItemTags
}: UseTagFilterProps<T>): UseTagFilterResult<T> {
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [allTags, setAllTags] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<T[]>(items);

  // Extract all unique tags from items
  useEffect(() => {
    const tags = new Set<string>();
    items.forEach((item) => {
      getItemTags(item).forEach((tag) => tags.add(tag));
    });
    setAllTags(Array.from(tags).sort());
  }, [items, getItemTags]);

  // Filter items based on selectedTags
  useEffect(() => {
    let results = items;

    // Filter by selected tags - item must have ALL selected tags
    if (selectedTags.length > 0) {
      results = results.filter((item) => {
        const tags = getItemTags(item);
        return selectedTags.every((tag) => tags.includes(tag));
      });
    }

    setFilteredItems(results);
  }, [selectedTags, items, getItemTags]);

  // Handle tag selection from TagFilter component
  const handleTagSelect = (tag: string) => {
    setSelectedTags((prevTags) => {
      // Toggle tag
      if (prevTags.includes(tag)) {
        return prevTags.filter((t) => t !== tag);
      } else {
        return [...prevTags, tag];
      }
    });
  };

  // Handle tag click from a card component
  const handleTagClick = (tag: string) => {
    // If it's not selected, just add it (don't toggle off)
    if (!selectedTags.includes(tag)) {
      setSelectedTags((prev) => [...prev, tag]);
    } else {
      // If already selected, toggle it off
      setSelectedTags((prev) => prev.filter((t) => t !== tag));
    }
  };

  // Handle clear all tags
  const handleClearAllTags = () => {
    setSelectedTags([]);
  };

  return {
    filteredItems,
    selectedTags,
    allTags,
    handleTagSelect,
    handleTagClick,
    handleClearAllTags
  };
}

export default useTagFilter;