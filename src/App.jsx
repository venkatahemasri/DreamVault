import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { DreamProvider } from './context/DreamContext';
import DreamAtmosphere from './components/DreamAtmosphere';
import Sidebar from './components/Sidebar';
import Navbar from './components/Navbar';
import MobileNav from './components/MobileNav';
import Toast from './components/Toast';
import CelebrationModal from './components/CelebrationModal';

// Pages
import Home from './pages/Home';
import MyDreams from './pages/MyDreams';
import AddDream from './pages/AddDream';
import DreamDetails from './pages/DreamDetails';
import VisionBoard from './pages/VisionBoard';
import AchievedDreams from './pages/AchievedDreams';
import Profile from './pages/Profile';
import NotFound from './pages/NotFound';

import './App.css';

export default function App() {
  return (
    <DreamProvider>
      <BrowserRouter>
        <div className="app-layout">
          {/* Subtle Visual Atmosphere */}
          <DreamAtmosphere />

          {/* Desktop Sidebar Navigation */}
          <Sidebar />

          {/* Main App Content Area */}
          <div className="main-wrapper">
            <Navbar />
            <main className="content-area">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dreams" element={<MyDreams />} />
                <Route path="/add" element={<AddDream />} />
                <Route path="/dreams/:id" element={<DreamDetails />} />
                <Route path="/dreams/:id/edit" element={<AddDream />} />
                <Route path="/vision-board" element={<VisionBoard />} />
                <Route path="/achieved" element={<AchievedDreams />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/404" element={<NotFound />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </div>

          {/* Mobile Bottom Navigation */}
          <MobileNav />

          {/* Global Toast Notifications */}
          <Toast />

          {/* Global Achievement Celebration Modal */}
          <CelebrationModal />
        </div>
      </BrowserRouter>
    </DreamProvider>
  );
}
