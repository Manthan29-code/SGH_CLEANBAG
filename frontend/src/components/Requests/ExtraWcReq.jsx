import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const ExtraWcReq = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    binType: 'Bin Type',
    binSize: 'Bin Size',
    quantity: '',
    description: ''
  });

  const binTypes = [
    'Plastic Dustbin',
    'Metal Dustbin',
    'Bio-medical Dustbin',
    'E-waste Dustbin',
    'Organic Dustbin'
  ];

  const binSizes = [
    'Small Household Dustbins',
    'Standard Outdoor Dustbins',
    'Large Household Dustbins',
    'Large Commercial Dustbins',
    
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-emerald-50 py-8 px-4">
      <div className="max-w-2xl w-full">
        <motion.div 
          className="border-2 border-emerald-100 p-8 rounded-lg shadow-lg bg-white"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-center mb-6 text-emerald-800">Additional Waste Bin Request Form</h2>
          <p className="text-gray-600 text-center mb-8">Get the waste bins by requesting with filling the request form...</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* User Details Section */}
            <div className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                  placeholder="Enter address"
                  rows="3"
                  required
                />
              </div>
            </div>

            {/* Bin Details Section */}
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <select
                    name="binType"
                    value={formData.binType}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                    required
                  >
                    {binTypes.map((type, index) => (
                      <option key={index} value={type}>{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <select
                    name="binSize"
                    value={formData.binSize}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                    required
                  >
                    {binSizes.map((size, index) => (
                      <option key={index} value={size}>{size}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <input
                    type="number"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                    placeholder="Enter quantity"
                    min="1"
                    required
                  />
                </div>
              </div>

              <div>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-emerald-200 rounded-md focus:outline-none focus:ring focus:border-emerald-300 text-emerald-800"
                  placeholder="Write a short description about the bin"
                  rows="3"
                />
              </div>
            </div>

            <motion.button
              type="submit"
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold py-2 rounded mb-4"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Submit
            </motion.button>
          </form>

          <div className="mt-4 text-center">
            <button
              onClick={() => navigate('/requests')}
              className="w-full bg-emerald-100 hover:bg-emerald-200 text-emerald-800 font-bold py-2 rounded"
            >
              Back to Requests
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ExtraWcReq;
