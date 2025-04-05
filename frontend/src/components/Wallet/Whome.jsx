import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import rewardsImage from '../../assets/photos/pexels-n-voitkevich-6532370.jpg';

function CleanbageWallet() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-emerald-50 py-8 px-4">
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

      {/* Profile Button */}
      <motion.button
        onClick={() => navigate('/wallet/profile')}
        className="fixed top-20 right-4 bg-emerald-600 text-white px-6 py-2 rounded-lg shadow-lg hover:bg-emerald-700 transition-colors"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.3 }}
      >
        Profile
      </motion.button>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto mt-20">
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Hero Image Section */}
          

          <h1 className="text-4xl font-bold text-emerald-800 mb-4">CLEANBAGE Wallet</h1>
          <p className="text-lg text-emerald-600 mb-8">Track your earnings, redeem rewards, and contribute to a cleaner city!</p>

          <motion.div 
            className="mb-8 rounded-2xl overflow-hidden shadow-xl max-w-3xl mx-auto"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <img 
              src={rewardsImage} 
              alt="Rewards and Achievements" 
              className="w-full h-64 object-cover object-center"
            />
          </motion.div>

          {/* Wallet Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-40 bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-lg flex flex-col items-center justify-center p-4">
                <span className="text-2xl font-bold text-white mb-2">Current Balance</span>
                <span className="text-4xl font-bold text-white">500 Points</span>
              </div>
            </motion.div>

            <motion.div 
              className="bg-white rounded-2xl p-6 shadow-xl"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.2 }}
            >
              <div className="h-40 bg-gradient-to-r from-emerald-500 to-emerald-700 rounded-lg flex flex-col items-center justify-center space-y-4 p-4">
                <motion.button
                  onClick={() => navigate('/wallet/transaction-history')}
                  className="bg-white text-emerald-700 px-6 py-2 rounded-lg shadow-md hover:bg-emerald-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Transaction History
                </motion.button>
                <motion.button
                  onClick={() => navigate('/wallet/rewards-history')}
                  className="bg-white text-emerald-700 px-6 py-2 rounded-lg shadow-md hover:bg-emerald-50 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Rewards History
                </motion.button>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default CleanbageWallet;
