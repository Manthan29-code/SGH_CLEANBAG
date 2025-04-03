import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FaTrash, FaMapMarkerAlt, FaClock, FaCheck } from 'react-icons/fa';
import { useTheme } from '@/context/ThemeContext';
import { useAuth } from '@/context/AuthContext';
import { toast } from 'react-hot-toast';

const Collections = () => {
  const { darkMode } = useTheme();
  const { user } = useAuth();
  const [collections, setCollections] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('pending');

  // Sample collection data - replace with actual API call
  const sampleCollections = [
    {
      id: 1,
      binId: 'BIN-001',
      location: 'North Street, Block A',
      reportedAt: '2024-04-02T10:30:00Z',
      status: 'pending',
      wasteType: 'organic',
      fillLevel: 85
    },
    {
      id: 2,
      binId: 'BIN-002',
      location: 'South Avenue, Block B',
      reportedAt: '2024-04-02T09:15:00Z',
      status: 'completed',
      wasteType: 'recyclable',
      fillLevel: 90
    }
  ];

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setCollections(sampleCollections);
      setLoading(false);
    }, 1000);
  }, []);

  const handleStatusUpdate = (id, newStatus) => {
    setCollections(prev => 
      prev.map(collection => 
        collection.id === id 
          ? { ...collection, status: newStatus }
          : collection
      )
    );
    
    toast.success('Collection status updated!', {
      style: {
        background: darkMode ? "#1B4332" : "#2D6A4F",
        color: "#FFFFFF"
      }
    });
  };

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
              Waste Collections
            </h1>
            <p className={`text-sm ${darkMode ? 'text-[#95D5B2]' : 'text-[#4A6E5B]'}`}>
              Vehicle Number: {user?.assignedVehicle}
            </p>
          </div>

          {/* Filter Buttons */}
          <div className="mt-4 md:mt-0 flex space-x-2">
            {['pending', 'completed'].map((status) => (
              <button
                key={status}
                onClick={() => setFilter(status)}
                className={`px-4 py-2 rounded-lg transition-colors
                          ${filter === status
                            ? (darkMode 
                                ? 'bg-[#95D5B2] text-[#081C15]' 
                                : 'bg-[#2D6A4F] text-white')
                            : (darkMode 
                                ? 'bg-[#1B4332] text-[#95D5B2]' 
                                : 'bg-white text-[#2D6A4F]')}`}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Collections List */}
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className={`animate-spin rounded-full h-12 w-12 border-4 
                           ${darkMode ? 'border-[#95D5B2] border-t-[#1B4332]' 
                                    : 'border-[#2D6A4F] border-t-[#F0FDF4]'}`} />
          </div>
        ) : (
          <div className="space-y-4">
            {collections
              .filter(collection => collection.status === filter)
              .map((collection) => (
                <motion.div
                  key={collection.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className={`p-6 rounded-lg shadow-lg
                            ${darkMode ? 'bg-[#1B4332]' : 'bg-white'}`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center mb-2">
                        <FaTrash className={`mr-2 ${darkMode ? 'text-[#95D5B2]' : 'text-[#2D6A4F]'}`} />
                        <h3 className="text-lg font-semibold">{collection.binId}</h3>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="flex items-center">
                          <FaMapMarkerAlt className="mr-2 text-[#2D6A4F]" />
                          <span className="text-sm">{collection.location}</span>
                        </div>
                        
                        <div className="flex items-center">
                          <FaClock className="mr-2 text-[#2D6A4F]" />
                          <span className="text-sm">
                            {new Date(collection.reportedAt).toLocaleString()}
                          </span>
                        </div>
                      </div>

                      <div className="mt-2 flex items-center space-x-4">
                        <span className={`px-3 py-1 rounded-full text-xs
                                     ${collection.wasteType === 'organic'
                                       ? 'bg-green-200 text-green-800'
                                       : 'bg-blue-200 text-blue-800'}`}>
                          {collection.wasteType}
                        </span>
                        <span className={`px-3 py-1 rounded-full text-xs
                                     ${collection.fillLevel > 80
                                       ? 'bg-red-200 text-red-800'
                                       : 'bg-yellow-200 text-yellow-800'}`}>
                          {collection.fillLevel}% full
                        </span>
                      </div>
                    </div>

                    {collection.status === 'pending' && (
                      <button
                        onClick={() => handleStatusUpdate(collection.id, 'completed')}
                        className={`mt-4 md:mt-0 px-6 py-2 rounded-lg flex items-center transition-colors
                                  ${darkMode 
                                    ? 'bg-[#95D5B2] text-[#081C15] hover:bg-[#74C69D]' 
                                    : 'bg-[#2D6A4F] text-white hover:bg-[#1B4332]'}`}
                      >
                        <FaCheck className="mr-2" />
                        Mark Collected
                      </button>
                    )}
                  </div>
                </motion.div>
              ))}
          </div>
        )}
      </motion.div>
    </div>
  );
};

export default Collections;