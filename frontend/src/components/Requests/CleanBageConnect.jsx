import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import connectImage from '../../assets/photos/pexels-vladvictoria-2682683.jpg';

const CleanBageConnect = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-emerald-50 min-h-screen py-8 px-4">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-20 left-4 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        <span className="hidden md:inline">Back</span>
      </motion.button>

      <div className="max-w-3xl mx-auto mt-16 bg-white rounded-2xl shadow-xl overflow-hidden">
        <motion.div 
          className="p-8 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Image Section */}
          <motion.div 
            className="mb-8 rounded-lg overflow-hidden shadow-xl"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={connectImage} 
              alt="Colored Waste Bins" 
              className="w-full h-48 md:h-64 object-cover object-center"
            />
          </motion.div>

          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full bg-gradient-to-r from-emerald-400 to-emerald-600 mx-auto opacity-50 blur-2xl"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-16 h-16 text-emerald-600"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-emerald-800 mb-4">CLEANBAGE Connect</h1>
          <p className="text-lg text-emerald-600 mb-8">Seamless Communication for a Cleaner City</p>
          <div className="max-w-lg mx-auto">
            <p className="text-gray-600 mb-8">
              Connect with your community and contribute to a cleaner environment.
            </p>
            
            {/* Request Buttons */}
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <motion.button
                onClick={() => navigate('/waste-collection')}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-emerald-700 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Waste Collection Request
              </motion.button>
              
              <motion.button
                onClick={() => navigate('/extra-waste-bin')}
                className="bg-emerald-500 text-white px-6 py-3 rounded-lg shadow-lg hover:bg-emerald-600 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Extra Waste Bin Request
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default CleanBageConnect;