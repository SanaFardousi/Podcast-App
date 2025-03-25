import React from 'react';
import { Play, Plus } from 'lucide-react';
import type { Podcast } from '../types';

interface PodcastCardProps {
  podcast: Podcast;
}

export const PodcastCard: React.FC<PodcastCardProps> = ({ podcast }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      <img
        src={podcast.image}
        alt={podcast.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <h3 className="font-semibold text-lg mb-1 line-clamp-1">{podcast.title}</h3>
        <p className="text-sm text-gray-500 mb-2">{podcast.author}</p>
        <p className="text-sm text-gray-600 line-clamp-2 mb-4">{podcast.description}</p>
        <div className="flex items-center justify-between">
          <div className="flex space-x-2">
            {podcast.categories.slice(0, 2).map((category) => (
              <span
                key={category}
                className="px-2 py-1 text-xs rounded-full bg-pastel-blue text-gray-700"
              >
                {category}
              </span>
            ))}
          </div>
          <div className="flex space-x-2">
            <button className="p-2 rounded-full hover:bg-pastel-green/20">
              <Play className="w-5 h-5" />
            </button>
            <button className="p-2 rounded-full hover:bg-pastel-purple/20">
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};