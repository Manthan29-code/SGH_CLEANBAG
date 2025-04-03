import React from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, slideIn } from './animations';

function CleanbageServices() {
  return (
    <motion.div 
      className="bg-emerald-50 py-8 md:py-12 px-4"
      initial="initial"
      animate="animate"
      variants={fadeIn}
    >
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <motion.div 
          className="text-center px-4 md:px-8 mb-8"
          variants={fadeIn}
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-emerald-800">
            Services at Cleanbage
          </h2>
          <p className="text-base md:text-lg text-emerald-700 mb-6 md:mb-8">
            Explore Cleanbage's innovative features and user-centric services designed to streamline waste management.
          </p>
        </motion.div>

        {/* Image Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-emerald-100 mb-8 max-w-2xl mx-auto">
          <img 
            src="/src/assets/photos/pexels-shvetsa-5029859.jpg"
            alt="Cleanbage Services" 
            className="w-full h-auto object-cover" 
          />
        </div>

        {/* Service Information Cards - Vertical Layout */}
        <motion.div 
          className="space-y-6 max-w-2xl mx-auto"
          variants={staggerContainer}
        >
          {/* Waste Scheduling Notifications */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-100 hover:shadow-xl transition-shadow"
            variants={slideIn("left")}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-3">
              Waste Scheduling Notifications
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              Stay informed with timely alerts about collection days and schedule changes.
            </p>
          </motion.div>

          {/* Holiday Updates */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-100 hover:shadow-xl transition-shadow"
            variants={slideIn("right")}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-3">
              Holiday Updates
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              Receive notifications about service changes during public holidays.
            </p>
          </motion.div>

          {/* Rewards for Segregation */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-100 hover:shadow-xl transition-shadow"
            variants={slideIn("left")}
            whileHover={{ scale: 1.02 }}
          >
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-3">
              Rewards for Segregation
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              Earn rewards for proper waste segregation and environmental sustainability.
            </p>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default CleanbageServices;
