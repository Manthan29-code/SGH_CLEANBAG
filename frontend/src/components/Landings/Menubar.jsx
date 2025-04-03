import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

function Menubar({ onClose }) {
  const navigate = useNavigate();

  const handleHomeClick = (e) => {
    e.preventDefault();
    navigate('/');
    onClose();
  };

  const menuVariants = {
    initial: { x: "-100%" },
    animate: { 
      x: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    },
    exit: { 
      x: "-100%",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20
      }
    }
  };

  const itemVariants = {
    initial: { x: -20, opacity: 0 },
    animate: { 
      x: 0, 
      opacity: 1,
      transition: {
        delay: 0.3
      }
    }
  };

  return (
    <motion.div 
      className="fixed top-0 left-0 h-full w-[80%] md:w-64 bg-white shadow-lg z-20"
      variants={menuVariants}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <aside className="bg-white text-emerald-800 h-full p-4 space-y-4">
        <motion.div 
          className="flex justify-between items-center mb-4 md:mb-6"
          variants={itemVariants}
        >
          <h2 className="text-xl md:text-2xl font-bold">Cleanbage</h2>
          <motion.button 
            onClick={onClose}
            className="p-1.5 md:p-2 hover:bg-emerald-100 rounded-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <span className="sr-only">Close menu</span>
            <svg className="w-5 h-5 md:w-6 md:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </motion.button>
        </motion.div>
        
        <motion.nav variants={itemVariants}>
          <ul className="space-y-1 md:space-y-2">
            {[
              { text: 'Home', onClick: handleHomeClick },
              { text: 'Schedule', href: '#' },
              { text: 'Requests', href: '#' },
              { text: 'Wallet', href: '#' },
              { text: 'Leaderboard', href: '#' },
              { text: 'Available Reward', href: '#' },
              { text: 'Feedback for Worker', href: '#' },
            ].map((item, index) => (
              <motion.li 
                key={item.text}
                whileHover={{ x: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                {item.onClick ? (
                  <button 
                    onClick={item.onClick}
                    className="w-full text-left block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base"
                  >
                    {item.text}
                  </button>
                ) : (
                  <a 
                    href={item.href} 
                    className="block hover:bg-emerald-100 p-2 rounded transition-colors text-sm md:text-base"
                  >
                    {item.text}
                  </a>
                )}
              </motion.li>
            ))}
          </ul>
        </motion.nav>

        <motion.div 
          className="mt-6 md:mt-8 space-y-2"
          variants={itemVariants}
        >
          <motion.button 
            onClick={() => {
              navigate('/login');
              onClose();
            }}
            className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 px-4 rounded text-sm md:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Login
          </motion.button>
          <motion.button 
            onClick={() => {
              navigate('/register');
              onClose();
            }}
            className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 px-4 rounded text-sm md:text-base"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Register
          </motion.button>
        </motion.div>
      </aside>
    </motion.div>
  );
}

export default Menubar;
