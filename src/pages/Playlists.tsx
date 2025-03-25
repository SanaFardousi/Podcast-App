import React from 'react';

export const Playlists: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Playlists</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">All Playlists</h2>
          <div className="text-gray-500">
            No playlists created yet. Create a playlist to organize your favorite episodes.
          </div>
          <button className="px-4 py-2 bg-pastel-purple rounded-lg hover:bg-pastel-purple/80 transition-colors">
            Create New Playlist
          </button>
        </div>
      </div>
    </div>
  );
};