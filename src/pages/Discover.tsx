import React, { useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { CategoryFilter } from '../components/CategoryFilter';
import { PodcastCard } from '../components/PodcastCard';
import { usePodcastStore } from '../store/usePodcastStore';
import { Loader2 } from 'lucide-react';

export const Discover: React.FC = () => {
  const {
    podcasts,
    searchResults,
    searchQuery,
    isLoading,
    fetchTrendingPodcasts,
  } = usePodcastStore();

  useEffect(() => {
    fetchTrendingPodcasts();
  }, [fetchTrendingPodcasts]);

  const displayedPodcasts = searchQuery ? searchResults : podcasts;

  return (
    <div className="p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col space-y-6">
          <h1 className="text-3xl font-bold">Discover</h1>
          <SearchBar />
          <CategoryFilter />

          {isLoading ? (
            <div className="flex items-center justify-center py-12">
              <Loader2 className="w-8 h-8 animate-spin text-pastel-purple" />
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedPodcasts.map((podcast) => (
                <PodcastCard key={podcast.id} podcast={podcast} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};