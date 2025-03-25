import React from 'react';
import { usePodcastStore } from '../store/usePodcastStore';

export const CategoryFilter: React.FC = () => {
  const { categories, selectedCategory, setSelectedCategory, fetchPodcastsByCategory } = usePodcastStore();

  const handleCategoryClick = (categoryId: string) => {
    setSelectedCategory(categoryId);
    fetchPodcastsByCategory(categoryId);
  };

  return (
    <div className="flex space-x-2 overflow-x-auto pb-4 hide-scrollbar">
      <button
        onClick={() => setSelectedCategory(null)}
        className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
          selectedCategory === null
            ? 'bg-pastel-purple text-gray-900'
            : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
        }`}
      >
        All
      </button>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => handleCategoryClick(category.id)}
          className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors ${
            selectedCategory === category.id
              ? 'bg-pastel-purple text-gray-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          {category.name}
        </button>
      ))}
    </div>
  );
};