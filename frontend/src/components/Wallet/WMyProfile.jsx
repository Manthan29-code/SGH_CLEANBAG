import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const offers = [
    {
      name: '10% Off at Green Café',
      pointsRequired: 100,
      currentBalance: 500,
      balanceAfterRedemption: 400,
      redeemButton: '[ Redeem ]',
    },
    {
      name: '₹50 Discount on Grocery Bill',
      pointsRequired: 200,
      currentBalance: 500,
      balanceAfterRedemption: 300,
      redeemButton: '[ Redeem ]',
    },
    {
      name: '₹50 Off on Electricity Bill',
      pointsRequired: 500,
      currentBalance: 500,
      balanceAfterRedemption: 0,
      redeemButton: '[ Redeem ]',
    },
    {
      name: 'Special Eco-Friendly Gift',
      pointsRequired: 300,
      currentBalance: 500,
      balanceAfterRedemption: 200,
      redeemButton: '[ Redeem ]',
    },
    {
      name: 'Donate to Waste Collector Fund',
      pointsRequired: 'Custom',
      currentBalance: 500,
      balanceAfterRedemption: 'Varies',
      redeemButton: '[ Donate ]',
    },
  ];

  return (
    <div className="min-h-screen bg-emerald-50 py-8 px-4">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/wallet')}
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

      <div className="max-w-7xl mx-auto mt-20">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Points Circle */}
            <div className="md:w-1/4">
              <motion.div 
                className="bg-gradient-to-r from-emerald-400 to-emerald-600 rounded-full w-48 h-48 flex items-center justify-center mx-auto"
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <span className="text-2xl font-bold text-white text-center">500<br/>Points</span>
              </motion.div>
            </div>

            {/* Profile Summary */}
            <div className="md:w-3/4">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold text-emerald-800">Profile Summary and Available Offers</h2>
                <div className="flex items-center gap-4">
                  <span className="text-emerald-600">User Name: XXXXXX</span>
                  <div className="bg-emerald-100 rounded-full w-12 h-12"></div>
                </div>
              </div>

              {/* Offers Table */}
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead className="bg-emerald-50">
                    <tr>
                      <th className="p-4 border border-emerald-100">Offer</th>
                      <th className="p-4 border border-emerald-100">Points Required</th>
                      <th className="p-4 border border-emerald-100">Current Balance</th>
                      <th className="p-4 border border-emerald-100">Balance After Redemption</th>
                      <th className="p-4 border border-emerald-100">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {offers.map((offer, index) => (
                      <tr key={index} className="hover:bg-emerald-50">
                        <td className="p-4 border border-emerald-100">{offer.name}</td>
                        <td className="p-4 border border-emerald-100">{offer.pointsRequired}</td>
                        <td className="p-4 border border-emerald-100">{offer.currentBalance}</td>
                        <td className="p-4 border border-emerald-100">{offer.balanceAfterRedemption}</td>
                        <td className="p-4 border border-emerald-100">
                          <motion.button
                            className="text-emerald-600 hover:text-emerald-700"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                          >
                            {offer.redeemButton}
                          </motion.button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TransactionHistory;