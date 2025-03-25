import React from 'react';

export const Library: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Your Library</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Subscribed Podcasts</h2>
          {/* Subscribed podcasts content */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Recent Episodes</h2>
          {/* Recent episodes content */}
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h2 className="text-xl font-semibold mb-4">Favorites</h2>
          {/* Favorites content */}
        </div>
      </div>
    </div>
  );
};