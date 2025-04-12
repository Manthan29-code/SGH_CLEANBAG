import React, { useState } from "react";
import { useCollection } from "@/hooks/useCollection";
import { motion } from "framer-motion";
import { MapPin, Send, AlertCircle, Navigation, Recycle } from "lucide-react";
import { toast } from "react-hot-toast";
import { v4 as uuidv4 } from 'uuid';

const ResidentReportBinPage = () => {
  const { reportBin, loading } = useCollection();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [formData, setFormData] = useState({
    binId: uuidv4(),
    location: "",
    coordinates: {
      latitude: "",
      longitude: "",
    },
    wasteType: "",
    fillLevel: 0,
  });
  const [errors, setErrors] = useState({});

  const wasteTypes = [
    { value: "organic", label: "Organic Waste", icon: "🌱" },
    { value: "recyclable", label: "Recyclable", icon: "♻️" },
    { value: "non-recyclable", label: "Non-Recyclable", icon: "🗑️" },
    { value: "hazardous", label: "Hazardous", icon: "⚠️" },
  ];

  const getCurrentLocation = async () => {
    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      return;
    }

    setLoadingLocation(true);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?lat=${latitude}&lon=${longitude}&format=json`
      );
      const data = await response.json();

      setFormData(prev => ({
        ...prev,
        location: data.display_name,
        coordinates: { latitude, longitude },
      }));
      toast.success("Location detected successfully!");
    } catch (error) {
      toast.error("Failed to get current location");
    } finally {
      setLoadingLocation(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.location) newErrors.location = "Location is required";
    if (!formData.wasteType) newErrors.wasteType = "Waste type is required";
    if (!formData.coordinates.latitude || !formData.coordinates.longitude) {
      newErrors.location = "Please detect your location";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const binData = {
        binId: formData.binId,
        location: {
          type: "Point",
          coordinates: [formData.coordinates.longitude, formData.coordinates.latitude]
        },
        wasteType: formData.wasteType,
        fillLevel: formData.fillLevel,
        status: "pending"
      };
      
      await reportBin(binData);
      toast.success("Bin reported successfully!");
      setFormData({
        binId: uuidv4(),
        location: "",
        coordinates: { latitude: "", longitude: "" },
        wasteType: "",
        fillLevel: 0,
      });
    } catch (error) {
      toast.error(error.message || "Failed to report bin");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 to-emerald-100 py-8 px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-2xl mx-auto"
      >
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-emerald-600 px-6 py-8 text-center">
            <Recycle className="h-12 w-12 text-white mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-white mb-2">Report a Bin</h1>
            <p className="text-emerald-100">Help keep our community clean and green</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            {/* Bin ID Field */}
            <div className="bg-emerald-50 p-4 rounded-lg">
              <label className="block text-sm font-medium text-emerald-800 mb-2">
                Bin ID (Auto-generated)
              </label>
              <input
                type="text"
                value={formData.binId}
                readOnly
                className="w-full bg-white px-4 py-2 rounded-md border border-emerald-200 text-gray-600"
              />
            </div>

            {/* Location Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Location
              </label>
              <div className="relative">
                <MapPin className="absolute top-3 left-3 h-5 w-5 text-emerald-500" />
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-20 py-2 border ${
                    errors.location ? "border-red-300" : "border-emerald-300"
                  } rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent`}
                  placeholder="Bin location"
                />
                <button
                  type="button"
                  onClick={getCurrentLocation}
                  className="absolute right-2 top-1/2 -translate-y-1/2 px-3 py-1 bg-emerald-100 hover:bg-emerald-200 
                    text-emerald-700 rounded-md flex items-center gap-2 transition-colors"
                >
                  <Navigation className={`h-4 w-4 ${loadingLocation ? "animate-spin" : ""}`} />
                  Detect
                </button>
              </div>
              {errors.location && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.location}
                </p>
              )}
            </div>

            {/* Waste Type Field */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Waste Type
              </label>
              <div className="grid grid-cols-2 gap-4">
                {wasteTypes.map(type => (
                  <motion.button
                    key={type.value}
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setFormData(prev => ({ ...prev, wasteType: type.value }))}
                    className={`p-4 rounded-lg border-2 flex items-center gap-3 
                      ${formData.wasteType === type.value
                        ? "border-emerald-500 bg-emerald-50"
                        : "border-gray-200 hover:border-emerald-200"
                      }`}
                  >
                    <span className="text-2xl">{type.icon}</span>
                    <span className="text-sm font-medium">{type.label}</span>
                  </motion.button>
                ))}
              </div>
              {errors.wasteType && (
                <p className="text-red-500 text-xs flex items-center gap-1">
                  <AlertCircle className="h-4 w-4" />
                  {errors.wasteType}
                </p>
              )}
            </div>

            {/* Fill Level Slider */}
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-700">
                Fill Level: {formData.fillLevel}%
              </label>
              <input
                type="range"
                name="fillLevel"
                value={formData.fillLevel}
                onChange={handleChange}
                min="0"
                max="100"
                className="w-full h-2 bg-emerald-200 rounded-lg appearance-none cursor-pointer"
              />
              <div className="flex justify-between text-xs text-gray-500">
                <span>Empty</span>
                <span>Full</span>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              disabled={loading || loadingLocation}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
              className="w-full bg-emerald-600 text-white py-3 px-6 rounded-lg font-medium
                hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 
                focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed
                transition-colors duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                "Submitting..."
              ) : (
                <>
                  Submit Report
                  <Send className="h-5 w-5" />
                </>
              )}
            </motion.button>
          </form>
        </div>
      </motion.div>
    </div>
  );
};

export default ResidentReportBinPage;