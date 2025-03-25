import React from 'react';

export const Downloads: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Downloads</h1>
      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Downloaded Episodes</h2>
          <div className="text-gray-500">
            No downloaded episodes yet. Episodes you download will appear here for offline listening.
          </div>
        </div>
      </div>
    </div>
  );
};