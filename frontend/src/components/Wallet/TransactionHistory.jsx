import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const TransactionHistory = () => {
  const navigate = useNavigate();
  const transactions = [
    {
      name: '10% Off at Green Café',
      currentBalance: 500,
      balanceAfterRedeemed: 400,
      time: '2023-10-27 10:00 AM',
      completed: true, // Example: transaction completed
    },
    {
      name: '₹50 Discount on Grocery Bill',
      currentBalance: 500,
      balanceAfterRedeemed: 300,
      time: '2023-10-26 03:30 PM',
      completed: true,
    },
    {
      name: '₹50 Off on Electricity Bill',
      currentBalance: 500,
      balanceAfterRedeemed: 0,
      time: '2023-10-25 11:15 AM',
      completed: false, // Example: transaction not completed
    },
    {
      name: 'Special Eco-Friendly Gift',
      currentBalance: 500,
      balanceAfterRedeemed: 200,
      time: '2023-10-24 02:45 PM',
      completed: true,
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

      <div className="max-w-6xl mx-auto mt-20">
        <motion.div 
          className="bg-white rounded-2xl shadow-xl p-8"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">Transaction History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-4 py-3 border-b border-emerald-100">Name</th>
                  <th className="px-4 py-3 border-b border-emerald-100">Current Balance</th>
                  <th className="px-4 py-3 border-b border-emerald-100">Balance After Redeemed</th>
                  <th className="px-4 py-3 border-b border-emerald-100">Time</th>
                  <th className="px-4 py-3 border-b border-emerald-100">Status</th>
                </tr>
              </thead>
              <tbody>
                {transactions.map((transaction, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-emerald-50'}>
                    <td className="px-4 py-3 border-b border-emerald-100">{transaction.name}</td>
                    <td className="px-4 py-3 border-b border-emerald-100">{transaction.currentBalance}</td>
                    <td className="px-4 py-3 border-b border-emerald-100">{transaction.balanceAfterRedeemed}</td>
                    <td className="px-4 py-3 border-b border-emerald-100">{transaction.time}</td>
                    <td className="px-4 py-3 border-b border-emerald-100">
                      <span className={`px-2 py-1 rounded-full text-sm ${
                        transaction.completed 
                          ? 'bg-emerald-100 text-emerald-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {transaction.completed ? 'Completed' : 'Pending'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default TransactionHistory;