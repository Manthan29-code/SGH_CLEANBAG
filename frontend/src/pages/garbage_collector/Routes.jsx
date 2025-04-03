import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTruck, FaRoute, FaMapMarkedAlt } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

const RoutesPage = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [routes, setRoutes] = useState([]);
  const [loading, setLoading] = useState(true);

  // Sample route data - replace with actual API call
  const sampleRoutes = [
    {
      id: 1,
      name: 'Route A',
      area: 'North District',
      stops: 8,
      estimatedTime: '2 hours',
      status: 'pending'
    },
    {
      id: 2,
      name: 'Route B',
      area: 'South District',
      stops: 6,
      estimatedTime: '1.5 hours',
      status: 'completed'
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setRoutes(sampleRoutes);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className={`min-h-screen mt-16 p-4 sm:p-6 lg:p-8 transition-colors duration-200
                    ${darkMode ? 'bg-[#081C15] text-[#D1FAE5]' : 'bg-[#F0FDF4] text-[#1E3A24]'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className={`text-2xl sm:text-3xl font-bold mb-2
                         ${darkMode ? 'text-[#D1FAE5]' : 'text-[#2D6A4F]'}`}>
              My Routes
            </h1>
            <p className={`text-sm ${darkMode ? 'text-[#95D5B2]' : 'text-[#4A6E5B]'}`}>
              Vehicle Number: {user?.assignedVehicle}
            </p>
          </div>
          
          <div className={`mt-4 md:mt-0 p-4 rounded-lg
                        ${darkMode ? 'bg-[#1B4332]' : 'bg-white'}`}>
            <div className="flex items-center">
              <FaTruck className="text-2xl mr-3 text-[#2D6A4F]" />
              <div>
                <p className="text-sm font-medium">Today's Routes</p>
                <p className={`text-2xl font-bold ${darkMode ? 'text-[#95D5B2]' : 'text-[#2D6A4F]'}`}>
                  {routes.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Routes Grid */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-4 
                           ${darkMode ? 'border-[#95D5B2] border-t-[#1B4332]' 
                                    : 'border-[#2D6A4F] border-t-[#F0FDF4]'}`} />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <motion.div
                key={route.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className={`p-6 rounded-lg shadow-lg transition-transform duration-200 hover:scale-105
                          ${darkMode ? 'bg-[#1B4332]' : 'bg-white'}`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold mb-1">{route.name}</h3>
                    <p className={`text-sm ${darkMode ? 'text-[#95D5B2]' : 'text-[#4A6E5B]'}`}>
                      {route.area}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium
                                ${route.status === 'completed' 
                                  ? (darkMode ? 'bg-[#95D5B2] text-[#081C15]' 
                                            : 'bg-[#2D6A4F] text-white')
                                  : (darkMode ? 'bg-[#2D6A4F] text-[#D1FAE5]' 
                                            : 'bg-[#F0FDF4] text-[#2D6A4F]')}`}>
                    {route.status}
                  </span>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <FaRoute className="mr-2 text-[#2D6A4F]" />
                    <span>{route.stops} stops</span>
                  </div>
                  <div className="flex items-center">
                    <FaMapMarkedAlt className="mr-2 text-[#2D6A4F]" />
                    <span>{route.estimatedTime}</span>
                  </div>
                </div>

                <button
                  className={`mt-4 w-full py-2 rounded-lg transition-colors
                            ${darkMode 
                              ? 'bg-[#95D5B2] text-[#081C15] hover:bg-[#74C69D]' 
                              : 'bg-[#2D6A4F] text-white hover:bg-[#1B4332]'}`}
                >
                  View Details
                </button>
              </motion.div>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default RoutesPage;