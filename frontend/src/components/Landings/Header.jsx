import React from 'react';
import Menubar from './Menubar';
import { motion, AnimatePresence } from 'framer-motion';

function Header({ isMenuOpen, toggleMenu }) {
  return (
    <>
      {/* Hamburger Menu Button - Hidden when menu is open */}
      {!isMenuOpen && (
        <motion.button
          onClick={toggleMenu}
          className="fixed top-4 left-4 p-2 hover:bg-emerald-700 rounded-lg z-20"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <div className="space-y-1.5">
            <motion.span
              className="block w-6 h-0.5 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.2 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.3 }}
            />
            <motion.span
              className="block w-6 h-0.5 bg-white"
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.4 }}
            />
          </div>
        </motion.button>
      )}

      {/* Menubar and Overlay */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-transparent z-10"
              onClick={() => toggleMenu()}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            />
            <Menubar onClose={() => toggleMenu()} />
          </>
        )}
      </AnimatePresence>

      {/* Welcome Message - Adjusted padding for mobile */}
      <motion.div
        className="bg-emerald-800 text-white text-center pt-16 px-4 pb-6 md:pt-8"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <h1 className="text-2xl md:text-3xl font-bold text-emerald-100 mb-2">
          Welcome to our Smart Waste Management
        </h1>
        <div className="w-16 md:w-24 h-1 bg-emerald-600 mx-auto mb-6"></div>
      </motion.div>
    </>
  );
}

export default Header;
