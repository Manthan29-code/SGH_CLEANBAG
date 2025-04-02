import React from 'react';
import { useNavigate } from 'react-router-dom';

function Menubar({ onClose }) {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    onClose();
  };

  return (
    <div className="fixed top-0 left-0 h-full w-[80%] md:w-64 bg-white shadow-lg z-20">
      <aside className="bg-white text-emerald-800 h-full p-4 space-y-4">
        <div className="flex justify-between items-center mb-4 md:mb-6">
          <h2 className="text-xl md:text-2xl font-bold">Menu</h2>
          <button 
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-emerald-100 rounded-lg"
          >
            <span className="sr-only">Close menu</span>
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <nav>
          <ul className="space-y-1 md:space-y-2">
            <li>
              <button 
                onClick={handleHomeClick}
                className="w-full text-left block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base"
              >
                Home
              </button>
            </li>
            <li>
              <a href="#" className="block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base">
                Schedule
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base">
                Requests
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base">
                Wallet
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base">
                Leaderboard
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base">
                Available Reward
              </a>
            </li>
            <li>
              <a href="#" className="block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base">
                Feedback for Worker
              </a>
            </li>
          </ul>
        </nav>

        <div className="mt-6 md:mt-8 space-y-2">
          <button 
            onClick={() => {
              navigate('/login');
              onClose();
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
          >
            Login
          </button>
          <button 
            onClick={() => {
              navigate('/register');
              onClose();
            }}
            className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 px-4 rounded text-sm md:text-base"
          >
            Register
          </button>
        </div>
      </aside>
    </div>
  );
}

export default Menubar;
