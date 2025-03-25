import React from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';
import { usePlayerStore } from '../store/usePlayerStore';
import { formatDuration } from '../utils/format';

export const Player: React.FC = () => {
  const {
    isPlaying,
    currentTime,
    duration,
    volume,
    currentEpisode,
    setPlaying,
    setCurrentTime,
    setVolume,
    sound,
    skipNext,
    skipPrevious,
  } = usePlayerStore();

  if (!currentEpisode) return null;

  const togglePlay = () => {
    if (sound) {
      if (isPlaying) {
        sound.pause();
      } else {
        sound.play();
      }
      setPlaying(!isPlaying);
    }
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={currentEpisode.image || 'https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=50&h=50&fit=crop'}
            alt={currentEpisode.title}
            className="w-12 h-12 rounded"
          />
          <div>
            <h3 className="font-medium text-gray-900">{currentEpisode.title}</h3>
            <p className="text-sm text-gray-500">{currentEpisode.author}</p>
          </div>
        </div>

        <div className="flex flex-col items-center space-y-2 flex-1 max-w-2xl mx-8">
          <div className="flex items-center space-x-4">
            <button
              onClick={skipPrevious}
              className="p-2 hover:bg-pastel-blue rounded-full"
            >
              <SkipBack className="w-5 h-5" />
            </button>
            <button
              onClick={togglePlay}
              className="p-3 bg-pastel-blue hover:bg-blue-200 rounded-full"
            >
              {isPlaying ? (
                <Pause className="w-6 h-6" />
              ) : (
                <Play className="w-6 h-6" />
              )}
            </button>
            <button
              onClick={skipNext}
              className="p-2 hover:bg-pastel-blue rounded-full"
            >
              <SkipForward className="w-5 h-5" />
            </button>
          </div>

          <div className="w-full flex items-center space-x-3">
            <span className="text-sm text-gray-500">
              {formatDuration(currentTime)}
            </span>
            <input
              type="range"
              min={0}
              max={duration}
              value={currentTime}
              onChange={(e) => {
                const time = parseFloat(e.target.value);
                setCurrentTime(time);
                sound?.seek(time);
              }}
              className="flex-1 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
            />
            <span className="text-sm text-gray-500">
              {formatDuration(duration)}
            </span>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <Volume2 className="w-5 h-5 text-gray-500" />
          <input
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={volume}
            onChange={(e) => {
              const newVolume = parseFloat(e.target.value);
              setVolume(newVolume);
              sound?.volume(newVolume);
            }}
            className="w-24 h-1 bg-gray-200 rounded-lg appearance-none cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};