import React from 'react';

export const Home: React.FC = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-6">Welcome Back</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-pastel-pink p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Continue Listening</h2>
          {/* Continue listening content */}
        </div>
        
        <div className="bg-pastel-blue p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">New Episodes</h2>
          {/* New episodes content */}
        </div>
        
        <div className="bg-pastel-green p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Your Subscriptions</h2>
          {/* Subscriptions content */}
        </div>
      </div>
    </div>
  );
};