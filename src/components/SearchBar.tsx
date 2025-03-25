import React, { useEffect, useState } from 'react';
import { Search } from 'lucide-react';
import { usePodcastStore } from '../store/usePodcastStore';

export const SearchBar: React.FC = () => {
  const { searchQuery, setSearchQuery, searchPodcasts } = usePodcastStore();
  const [debouncedQuery, setDebouncedQuery] = useState(searchQuery);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (debouncedQuery !== searchQuery) {
        setSearchQuery(debouncedQuery);
        searchPodcasts();
      }
    }, 300);

    return () => clearTimeout(timer);
  }, [debouncedQuery, searchQuery, setSearchQuery, searchPodcasts]);

  return (
    <div className="relative max-w-xl w-full">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
        <input
          type="text"
          value={debouncedQuery}
          onChange={(e) => setDebouncedQuery(e.target.value)}
          placeholder="Search podcasts..."
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-pastel-purple focus:border-transparent"
        />
      </div>
    </div>
  );
};