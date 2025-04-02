import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menubar from './Menubar';

function CleanbageApp() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="relative bg-emerald-50 min-h-screen">
      {/* Hamburger Menu Button - Hidden when menu is open */}
      {!isMenuOpen && (
        <button 
          onClick={toggleMenu}
          className="absolute top-2 left-2 p-2 hover:bg-emerald-100 rounded-lg z-20 md:top-4 md:left-4"
        >
          <div className="space-y-1.5 md:space-y-2">
            <span className="block w-6 h-0.5 bg-emerald-800 md:w-8"></span>
            <span className="block w-6 h-0.5 bg-emerald-800 md:w-8"></span>
            <span className="block w-6 h-0.5 bg-emerald-800 md:w-8"></span>
          </div>
        </button>
      )}

      {/* Menubar and Overlay */}
      {isMenuOpen && (
        <>
          <div 
            className="fixed inset-0 bg-black bg-opacity-50 z-10"
            onClick={() => setIsMenuOpen(false)}
          ></div>
          <Menubar onClose={() => setIsMenuOpen(false)} />
        </>
      )}

      {/* Welcome Message */}
      <div className="text-center pt-6 px-4 md:pt-8">
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-800 mb-2">
          Welcome to our Smart Waste Management
        </h1>
        <div className="w-16 md:w-24 h-1 bg-emerald-600 mx-auto mb-6 md:mb-8"></div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4">
        <div className="border-2 border-emerald-100 p-6 md:p-8 rounded-lg shadow-lg bg-white w-full max-w-sm md:w-96">
          <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-emerald-800">Cleanbage</h1>
          <p className="text-sm md:text-base text-center text-emerald-700 mb-6">
            Cleanbage connects Jamnagar residents with waste collectors, offering rewards for segregation and efficient service requests for events.
          </p>
          <button 
            onClick={() => navigate('/login')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-4"
          >
            Log In
          </button>
          <button 
            onClick={() => navigate('/register')}
            className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 px-4 rounded"
          >
            Register Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default CleanbageApp;