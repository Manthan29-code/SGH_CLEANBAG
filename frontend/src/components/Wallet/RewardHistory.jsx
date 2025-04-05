import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const RewardHistory = () => {
  const navigate = useNavigate();
  const rewards = [
    {
      date: '2023-10-27',
      time: '10:00 AM',
      details: 'Earned 100 points for completing daily task.',
    },
    {
      date: '2023-10-26',
      time: '03:30 PM',
      details: 'Received 50 points for referring a friend.',
    },
    {
      date: '2023-10-25',
      time: '11:15 AM',
      details: 'Bonus 200 points for monthly loyalty.',
    },
    {
      date: '2023-10-24',
      time: '02:45 PM',
      details: 'Earned 75 points for participating in event.',
    },
    {
      date: '2023-10-23',
      time: '09:00 AM',
      details: 'Received 30 points for daily login.',
    },
    {
      date: '2023-10-28',
      time: '11:00 AM',
      details: 'Earned 1000 points for giving the garbage.',
    }
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
          <h2 className="text-2xl font-bold text-emerald-800 mb-6">Reward History</h2>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-emerald-50">
                <tr>
                  <th className="px-4 py-3 border-b border-emerald-100">Date</th>
                  <th className="px-4 py-3 border-b border-emerald-100">Time</th>
                  <th className="px-4 py-3 border-b border-emerald-100">Details</th>
                </tr>
              </thead>
              <tbody>
                {rewards.map((reward, index) => (
                  <tr key={index} className={index % 2 === 0 ? 'bg-white' : 'bg-emerald-50'}>
                    <td className="px-4 py-3 border-b border-emerald-100">{reward.date}</td>
                    <td className="px-4 py-3 border-b border-emerald-100">{reward.time}</td>
                    <td className="px-4 py-3 border-b border-emerald-100">
                      <span className="text-emerald-700">{reward.details}</span>
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

export default RewardHistory;