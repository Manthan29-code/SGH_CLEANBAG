import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { fadeIn, staggerContainer, slideIn } from '../Landings/animations';
import { useNavigate } from 'react-router-dom';
import schedulingImage from '../../assets/photos/pexels-enginakyurt-31368357.jpg';

function SchedulingHome() {
  const [imageError, setImageError] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const navigate = useNavigate();

  const handleImageError = () => {
    console.error("Image failed to load");
    setImageError(true);
  };

  return (
    <div className="bg-emerald-50 min-h-screen py-8">
      {/* Top Navigation Button */}
      <div className="fixed top-4 right-4 z-10">
        <motion.button
          onClick={() => navigate('/holiday-calendar')}
          className="bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          <span>Holiday Calendar</span>
        </motion.button>
      </div>

      {/* Hero Section */}
      <motion.div 
        className="max-w-6xl mx-auto px-4"
        initial="initial"
        animate="animate"
        variants={fadeIn}
      >
        <motion.div 
          className="bg-emerald-800 text-white rounded-lg p-8 mb-6"
          variants={slideIn("up")}
        >
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            Experience a revolutionary approach to waste management
          </h1>
          <p className="text-lg text-emerald-100 mb-6">
            Cleanbage's thoughtfully designed scheduling system.
          </p>
          
          {/* Updated Image Section with error handling */}
          <motion.div 
            className="rounded-lg overflow-hidden shadow-xl"
            variants={fadeIn}
          >
            {!imageError ? (
              <img 
                src={schedulingImage}
                alt="Environmental Waste Management" 
                className="w-full h-64 md:h-96 object-cover object-center transform hover:scale-105 transition-transform duration-300"
                onError={handleImageError}
              />
            ) : (
              <div className="w-full h-64 md:h-96 bg-emerald-700 flex items-center justify-center">
                <p className="text-white text-lg">Image could not be loaded</p>
              </div>
            )}
          </motion.div>
        </motion.div>

        {/* Services Grid */}
        <motion.div 
          className="grid md:grid-cols-3 gap-8 mb-12"
          variants={staggerContainer}
        >
          {/* Dry Waste Collection */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg border-2 border-emerald-100 cursor-pointer"
            variants={slideIn("left")}
            whileHover={{ scale: 1.02 }}
            // onClick={() => setShowCalendar(true)}
          >
            <div className="h-12 w-12 bg-emerald-100 rounded-full mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">Dry Waste Collection</h3>
            <p className="text-emerald-600">Schedule your dry waste collection service efficiently and track your disposal history.</p>
            {/* <motion.button
              className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCalendar(true)}
            >
              Schedule Now
            </motion.button> */}
          </motion.div>

          {/* Wet Waste Collection */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg border-2 border-emerald-100 cursor-pointer"
            variants={slideIn()}
            whileHover={{ scale: 1.02 }}
            // onClick={() => setShowCalendar(true)}
          >
            <div className="h-12 w-12 bg-emerald-100 rounded-full mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">Wet Waste Collection</h3>
            <p className="text-emerald-600">Regular collection schedule for your organic and wet waste materials.</p>
            {/* <motion.button
              className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCalendar(true)}
            >
              Schedule Now
            </motion.button> */}
          </motion.div>

          {/* Holiday Interruptions */}
          <motion.div 
            className="bg-white p-6 rounded-lg shadow-lg border-2 border-emerald-100 cursor-pointer"
            variants={slideIn("right")}
            whileHover={{ scale: 1.02 }}
            // onClick={() => setShowCalendar(true)}
          >
            <div className="h-12 w-12 bg-emerald-100 rounded-full mb-4 flex items-center justify-center">
              <svg className="w-6 h-6 text-emerald-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-emerald-800 mb-2">Holiday Interruptions</h3>
            <p className="text-emerald-600">Stay informed about holiday schedules and service adjustments.</p>
            {/* <motion.button
              className="mt-4 w-full bg-emerald-600 text-white py-2 px-4 rounded"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCalendar(true)}
            >
              Schedule Now
            </motion.button> */}
          </motion.div>
        </motion.div>

        {/* Calendar Section - Conditionally rendered */}
        {showCalendar && (
          <motion.div 
            className="bg-white rounded-lg shadow-lg p-6 border-2 border-emerald-100"
            variants={fadeIn}
            initial="initial"
            animate="animate"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-emerald-800">Schedule Your Collection</h2>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                // onClick={() => setShowCalendar(false)}
                className="p-2 hover:bg-emerald-100 rounded-full"
              >
                <svg className="w-6 h-6 text-emerald-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Call to Action when calendar is not shown */}
        {/* {!showCalendar && (
          <motion.div
            className="text-center"
            variants={fadeIn}
          >
            <motion.button
              className="bg-emerald-600 text-white py-3 px-8 rounded-lg font-semibold text-lg"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowCalendar(true)}
            >
              Reporting Extra Waste
            </motion.button>
          </motion.div>
        )} */}
      </motion.div>
    </div>
  );
}

export default SchedulingHome;
