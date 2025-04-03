import { useState } from 'react';
import { motion } from 'framer-motion';
import { FaMapMarkerAlt, FaTrash, FaPercentage } from 'react-icons/fa';
import { MdMyLocation } from 'react-icons/md';
import { useCollection } from '../../context/CollectionContext';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';
import { useTheme } from '@/context/ThemeContext';

const ReportBin = () => {
  const { user } = useAuth();
  const { darkMode } = useTheme();
  const { reportBin, loading } = useCollection();
  const [location, setLocation] = useState({ latitude: '', longitude: '' });
  const [formData, setFormData] = useState({
    binId: '',
    wasteType: 'organic',
    fillLevel: 50,
    location: {
      type: 'Point',
      coordinates: []
    }
  });

  const handleLocationDetect = () => {
    if (!navigator.geolocation) {
      toast.error('Geolocation is not supported by your browser', {
        style: {
          background: darkMode ? "#081C15" : "#DC2626",
          color: "#FFFFFF"
        }
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLocation({ latitude, longitude });
        setFormData(prev => ({
          ...prev,
          location: {
            type: 'Point',
            coordinates: [longitude, latitude]
          }
        }));
      },
      () => {
        toast.error('Unable to retrieve your location', {
          style: {
            background: darkMode ? "#081C15" : "#DC2626",
            color: "#FFFFFF"
          }
        });
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!location.latitude || !location.longitude) {
      toast.error('Please detect your location first', {
        style: {
          background: darkMode ? "#081C15" : "#DC2626",
          color: "#FFFFFF"
        }
      });
      return;
    }

    const result = await reportBin(formData);
    if (result.success) {
      setFormData({
        binId: '',
        wasteType: 'organic',
        fillLevel: 50,
        location: {
          type: 'Point',
          coordinates: []
        }
      });
      setLocation({ latitude: '', longitude: '' });
    }
  };

  return (
    <div className={`min-h-screen mt-16 p-4 sm:p-6 lg:p-8 transition-colors duration-200
                    ${darkMode ? 'bg-[#081C15] text-[#D1FAE5]' : 'bg-[#F0FDF4] text-[#1E3A24]'}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className={`max-w-2xl mx-auto rounded-lg shadow-lg p-4 sm:p-6 lg:p-8
                   ${darkMode ? 'bg-[#1B4332]' : 'bg-white'}`}
      >
        <h1 className={`text-2xl sm:text-3xl font-bold mb-6 sm:mb-8
                       ${darkMode ? 'text-[#D1FAE5]' : 'text-[#2D6A4F]'}`}>
          Report a Bin
        </h1>

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
          {/* Bin ID Input */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Bin ID
            </label>
            <div className={`flex border rounded-lg overflow-hidden transition-colors
                           ${darkMode 
                             ? 'border-[#2D6A4F] focus-within:border-[#95D5B2]' 
                             : 'border-[#2D6A4F] focus-within:border-[#95D5B2]'}`}>
              <div className={`px-3 sm:px-4 py-3 flex items-center
                             ${darkMode ? 'bg-[#2D6A4F]' : 'bg-[#F0FDF4]'}`}>
                <FaTrash className={darkMode ? 'text-[#D1FAE5]' : 'text-[#2D6A4F]'} />
              </div>
              <input
                type="text"
                value={formData.binId}
                onChange={(e) => setFormData(prev => ({ ...prev, binId: e.target.value }))}
                placeholder="Enter Bin ID"
                required
                className={`flex-1 px-3 sm:px-4 py-3 outline-none w-full
                           ${darkMode 
                             ? 'bg-[#1B4332] text-[#D1FAE5] placeholder-[#95D5B2]' 
                             : 'bg-white text-[#1E3A24] placeholder-[#2D6A4F]'}`}
              />
            </div>
          </div>

          {/* Waste Type Selection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Waste Type
            </label>
            <select
              value={formData.wasteType}
              onChange={(e) => setFormData(prev => ({ ...prev, wasteType: e.target.value }))}
              className={`w-full border rounded-lg px-3 sm:px-4 py-3 outline-none transition-colors
                         ${darkMode 
                           ? 'bg-[#1B4332] border-[#2D6A4F] text-[#D1FAE5] focus:border-[#95D5B2]' 
                           : 'bg-white border-[#2D6A4F] text-[#1E3A24] focus:border-[#95D5B2]'}`}
            >
              <option value="organic">Organic Waste</option>
              <option value="recyclable">Recyclable Waste</option>
              <option value="non-recyclable">Non-recyclable Waste</option>
              <option value="hazardous">Hazardous Waste</option>
            </select>
          </div>

          {/* Fill Level Slider */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Fill Level
            </label>
            <div className="flex items-center space-x-4">
              <input
                type="range"
                min="0"
                max="100"
                value={formData.fillLevel}
                onChange={(e) => setFormData(prev => ({ ...prev, fillLevel: parseInt(e.target.value) }))}
                className={`flex-1 h-2 rounded-lg appearance-none cursor-pointer
                           ${darkMode 
                             ? 'bg-[#2D6A4F] accent-[#95D5B2]' 
                             : 'bg-[#F0FDF4] accent-[#2D6A4F]'}`}
              />
              <span className="flex items-center text-sm">
                <FaPercentage className="mr-1" />
                {formData.fillLevel}
              </span>
            </div>
          </div>

          {/* Location Detection */}
          <div className="space-y-2">
            <label className="block text-sm font-medium">
              Location
            </label>
            <div className="flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={handleLocationDetect}
                className={`flex items-center px-4 py-2 rounded-lg transition-colors
                           ${darkMode 
                             ? 'bg-[#95D5B2] text-[#081C15] hover:bg-[#74C69D]' 
                             : 'bg-[#2D6A4F] text-white hover:bg-[#1B4332]'}`}
              >
                <MdMyLocation className="mr-2" />
                Detect Location
              </button>
              {location.latitude && location.longitude && (
                <span className="text-sm flex items-center flex-wrap">
                  <FaMapMarkerAlt className="mr-2" />
                  {location.latitude.toFixed(6)}, {location.longitude.toFixed(6)}
                </span>
              )}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg font-medium transition-colors mt-6
                       ${darkMode
                         ? 'bg-[#95D5B2] text-[#081C15] hover:bg-[#74C69D] disabled:bg-[#2D6A4F]'
                         : 'bg-[#2D6A4F] text-white hover:bg-[#1B4332] disabled:bg-[#95D5B2]'}
                       disabled:cursor-not-allowed disabled:opacity-50`}
          >
            {loading ? 'Reporting...' : 'Report Bin'}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default ReportBin;