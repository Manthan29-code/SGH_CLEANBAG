import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeIn, scaleIn } from './animations';

function CleanbageApp() {
  const navigate = useNavigate();

  return (
    <div className="relative bg-emerald-50 min-h-screen">
      {/* Main Content */}
      <motion.div 
        className="flex items-center justify-center min-h-[calc(100vh-140px)] px-4"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <motion.div 
          className="border-2 border-emerald-100 p-6 md:p-8 rounded-lg shadow-lg bg-white w-full max-w-sm md:w-96"
          variants={scaleIn}
        >
          <h1 className="text-xl md:text-2xl font-bold text-center mb-4 text-emerald-800">Cleanbage</h1>
          <p className="text-sm md:text-base text-center text-emerald-700 mb-6">
            Cleanbage connects Jamnagar residents with waste collectors, offering rewards for segregation and efficient service requests for events.
          </p>
          <motion.button 
            onClick={() => navigate('/login')}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded mb-4"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Log In
          </motion.button>
          <motion.button 
            onClick={() => navigate('/register')}
            className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 px-4 rounded"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Register Now
          </motion.button>
        </motion.div>
      </motion.div>
    </div>
  );
}

export default CleanbageApp;