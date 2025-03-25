import { create } from 'zustand';
import type { Podcast, PodcastApiResponse } from '../types';

interface PodcastState {
  podcasts: Podcast[];
  searchQuery: string;
  searchResults: Podcast[];
  categories: Array<{ id: string; name: string }>;
  selectedCategory: string | null;
  isLoading: boolean;
  setSearchQuery: (query: string) => void;
  setSelectedCategory: (category: string | null) => void;
  searchPodcasts: () => Promise<void>;
  fetchTrendingPodcasts: () => Promise<void>;
  fetchPodcastsByCategory: (categoryId: string) => Promise<void>;
}

const transformPodcastData = (data: any): Podcast => ({
  id: data.id,
  title: data.title,
  description: data.description,
  author: data.publisher,
  image: data.image,
  categories: data.genres || [],
  isSubscribed: false,
  audio_length_sec: data.audio_length_sec,
  latest_pub_date_ms: data.latest_pub_date_ms,
  total_episodes: data.total_episodes,
});

export const usePodcastStore = create<PodcastState>((set, get) => ({
  podcasts: [],
  searchQuery: '',
  searchResults: [],
  categories: [
    { id: '144', name: 'Personal Finance' },
    { id: '151', name: 'Technology' },
    { id: '93', name: 'Business' },
    { id: '133', name: 'Comedy' },
    { id: '122', name: 'Society & Culture' },
    { id: '111', name: 'Education' },
    { id: '100', name: 'Arts' },
    { id: '107', name: 'Science' },
    { id: '77', name: 'Sports' },
    { id: '134', name: 'Music' },
  ],
  selectedCategory: null,
  isLoading: false,

  setSearchQuery: (query) => {
    set({ searchQuery: query });
  },

  setSelectedCategory: (category) => {
    set({ selectedCategory: category });
  },

  searchPodcasts: async () => {
    const { searchQuery } = get();
    if (!searchQuery.trim()) return;

    set({ isLoading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/podcasts?type=search&q=${encodeURIComponent(
          searchQuery
        )}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      const data: PodcastApiResponse = await response.json();
      const transformedPodcasts = data.podcasts.map(transformPodcastData);
      set({ searchResults: transformedPodcasts });
    } catch (error) {
      console.error('Error searching podcasts:', error);
      set({ searchResults: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchTrendingPodcasts: async () => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/podcasts?type=trending`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      const data: PodcastApiResponse = await response.json();
      const transformedPodcasts = data.podcasts.map(transformPodcastData);
      set({ podcasts: transformedPodcasts });
    } catch (error) {
      console.error('Error fetching trending podcasts:', error);
      set({ podcasts: [] });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchPodcastsByCategory: async (categoryId: string) => {
    set({ isLoading: true });
    try {
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/podcasts?type=category&genre_id=${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
        }
      );

      const data: PodcastApiResponse = await response.json();
      const transformedPodcasts = data.podcasts.map(transformPodcastData);
      set({ podcasts: transformedPodcasts });
    } catch (error) {
      console.error('Error fetching podcasts by category:', error);
      set({ podcasts: [] });
    } finally {
      set({ isLoading: false });
    }
  },
}));