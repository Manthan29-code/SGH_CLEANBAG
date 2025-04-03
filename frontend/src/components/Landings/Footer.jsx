import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

function Footer() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
    // Only scroll to top if we're not already at the target route
    if (location.pathname !== path) {
      window.scrollTo(0, 0);
    }
  };

  return (
    <footer className="bg-emerald-800 text-white py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Navigation Links */}
        <nav className="flex flex-wrap justify-center gap-6 mb-6">
          <button 
            onClick={() => handleNavigation('/about')}
            className="text-emerald-100 hover:text-white transition-colors"
          >
            About
          </button>
          <button 
            onClick={() => handleNavigation('/services')}
            className="text-emerald-100 hover:text-white transition-colors"
          >
            Services
          </button>
          <button 
            onClick={() => handleNavigation('/testimonials')}
            className="text-emerald-100 hover:text-white transition-colors"
          >
            Testimonials
          </button>
          <button 
            onClick={() => handleNavigation('/contact')}
            className="text-emerald-100 hover:text-white transition-colors"
          >
            Contact
          </button>
        </nav>

        {/* Copyright Text */}
        <div className="text-center text-emerald-100 text-sm">
          © All Rights Reserved. Cleanbage 2024
        </div>

        {/* Scroll to Top Button - Only show if not at top */}
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-4 right-4 bg-emerald-600 hover:bg-emerald-700 text-white p-3 rounded-lg shadow-lg transition-colors"
          aria-label="Scroll to top"
        >
          <svg 
            className="w-5 h-5" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M5 10l7-7m0 0l7 7m-7-7v18" 
            />
          </svg>
        </button>
      </div>
    </footer>
  );
}

export default Footer;