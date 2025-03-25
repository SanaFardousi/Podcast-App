export interface Podcast {
  id: string;
  title: string;
  description: string;
  author: string;
  image: string;
  categories: string[];
  isSubscribed: boolean;
  audio_length_sec?: number;
  latest_pub_date_ms?: number;
  total_episodes?: number;
}

export interface Episode {
  id: string;
  podcastId: string;
  title: string;
  description: string;
  audioUrl: string;
  duration: number;
  publishDate: string;
  isDownloaded: boolean;
  transcript?: {
    text: string;
    translations: Record<string, string>;
  };
}

export interface Playlist {
  id: string;
  name: string;
  description: string;
  episodes: Episode[];
  createdAt: string;
}

export interface Queue {
  current: Episode | null;
  upcoming: Episode[];
  history: Episode[];
}

export interface PodcastApiResponse {
  podcasts: Podcast[];
  total: number;
  has_next: boolean;
  next_offset?: number;
}