import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Home,
  Compass,
  Library,
  Download,
  ListMusic,
  Headphones,
} from 'lucide-react';

const navigation = [
  { name: 'Home', icon: Home, path: '/' },
  { name: 'Discover', icon: Compass, path: '/discover' },
  { name: 'Library', icon: Library, path: '/library' },
  { name: 'Downloads', icon: Download, path: '/downloads' },
  { name: 'Playlists', icon: ListMusic, path: '/playlists' },
];

export const Sidebar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-6">
      <div className="flex items-center space-x-2 mb-8">
        <Headphones className="w-8 h-8 text-pastel-purple" />
        <span className="text-xl font-semibold">PodcastApp</span>
      </div>

      <nav className="space-y-1">
        {navigation.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                isActive
                  ? 'bg-pastel-purple text-gray-900'
                  : 'text-gray-600 hover:bg-pastel-purple/20'
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span>{item.name}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};