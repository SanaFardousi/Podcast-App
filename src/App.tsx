import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Sidebar } from './components/Sidebar';
import { Player } from './components/Player';
import { Home } from './pages/Home';
import { Discover } from './pages/Discover';
import { Library } from './pages/Library';
import { Downloads } from './pages/Downloads';
import { Playlists } from './pages/Playlists';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-50">
        <Sidebar />
        <main className="flex-1 overflow-auto pb-24">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/discover" element={<Discover />} />
            <Route path="/library" element={<Library />} />
            <Route path="/downloads" element={<Downloads />} />
            <Route path="/playlists" element={<Playlists />} />
          </Routes>
        </main>
        <Player />
      </div>
    </Router>
  );
}

export default App;