import { create } from 'zustand';
import { Howl } from 'howler';
import type { Episode, Queue } from '../types';

interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  queue: Queue;
  sound: Howl | null;
  currentEpisode: Episode | null;
  setPlaying: (playing: boolean) => void;
  setCurrentTime: (time: number) => void;
  setVolume: (volume: number) => void;
  playEpisode: (episode: Episode) => void;
  addToQueue: (episode: Episode) => void;
  removeFromQueue: (episodeId: string) => void;
  skipNext: () => void;
  skipPrevious: () => void;
}

export const usePlayerStore = create<PlayerState>((set, get) => ({
  isPlaying: false,
  currentTime: 0,
  duration: 0,
  volume: 1,
  queue: {
    current: null,
    upcoming: [],
    history: [],
  },
  sound: null,
  currentEpisode: null,

  setPlaying: (playing) => set({ isPlaying: playing }),
  setCurrentTime: (time) => set({ currentTime: time }),
  setVolume: (volume) => set({ volume: volume }),

  playEpisode: (episode) => {
    const { sound: currentSound } = get();
    if (currentSound) {
      currentSound.unload();
    }

    const sound = new Howl({
      src: [episode.audioUrl],
      html5: true,
      volume: get().volume,
      onplay: () => set({ isPlaying: true }),
      onpause: () => set({ isPlaying: false }),
      onend: () => get().skipNext(),
      onload: () => set({ duration: sound.duration() }),
    });

    set({
      sound,
      currentEpisode: episode,
      queue: { ...get().queue, current: episode },
    });
    sound.play();
  },

  addToQueue: (episode) => {
    set((state) => ({
      queue: {
        ...state.queue,
        upcoming: [...state.queue.upcoming, episode],
      },
    }));
  },

  removeFromQueue: (episodeId) => {
    set((state) => ({
      queue: {
        ...state.queue,
        upcoming: state.queue.upcoming.filter((ep) => ep.id !== episodeId),
      },
    }));
  },

  skipNext: () => {
    const { queue, playEpisode } = get();
    if (queue.upcoming.length > 0) {
      const nextEpisode = queue.upcoming[0];
      const newUpcoming = queue.upcoming.slice(1);
      const newHistory = [...queue.history];
      if (queue.current) {
        newHistory.push(queue.current);
      }
      set((state) => ({
        queue: {
          ...state.queue,
          upcoming: newUpcoming,
          history: newHistory,
        },
      }));
      playEpisode(nextEpisode);
    }
  },

  skipPrevious: () => {
    const { queue, playEpisode } = get();
    if (queue.history.length > 0) {
      const previousEpisode = queue.history[queue.history.length - 1];
      const newHistory = queue.history.slice(0, -1);
      const newUpcoming = [...queue.upcoming];
      if (queue.current) {
        newUpcoming.unshift(queue.current);
      }
      set((state) => ({
        queue: {
          ...state.queue,
          upcoming: newUpcoming,
          history: newHistory,
        },
      }));
      playEpisode(previousEpisode);
    }
  },
}));