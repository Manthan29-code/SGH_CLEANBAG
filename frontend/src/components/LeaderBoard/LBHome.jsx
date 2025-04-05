import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { PieChart, Pie, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, LineChart, Line, ResponsiveContainer } from 'recharts';

const LBHome = () => {
  const navigate = useNavigate();
  const [activeChart, setActiveChart] = useState('bar'); // 'bar', 'pie', or 'line'

  // Data for bar chart
  const barData = [
    { day: '1st Apr', recyclable: 60, organic: 20, nonRecyclable: 20 },
    { day: '2nd Apr', recyclable: 22, organic: 56, nonRecyclable: 22 },
    { day: '3rd Apr', recyclable: 20, organic: 50, nonRecyclable: 30 },
    { day: '4th Apr', recyclable: 64, organic: 36, nonRecyclable: 0 },
    { day: '5th Apr', recyclable: 63, organic: 38, nonRecyclable: 0 },
    { day: '6th Apr', recyclable: 40, organic: 40, nonRecyclable: 20 },
    { day: '7th Apr', recyclable: 43, organic: 43, nonRecyclable: 14 },
  ];

  // Data for pie chart
  const pieData = [
    { name: 'Recyclable', value: 1200, fill: '#82ca9d' },
    { name: 'Non-Recyclable', value: 1800, fill: '#ffc658' },
    { name: 'Organic', value: 800, fill: '#8884d8' },
  ];

  // Data for line chart
  const lineData = [
    { name: 'Home 1', series1: 15, series2: 12, series3: 5 },
    { name: 'Home 2', series1: 18, series2: 8, series3: 3 },
    { name: 'Home 3', series1: 25, series2: 5, series3: 8 },
    { name: 'Home 4', series1: 4, series2: 12, series3: 10 },
    { name: 'Home 5', series1: 15, series2: 2, series3: 5 },
    { name: 'Home 6', series1: 8, series2: 15, series3: 7 },
    { name: 'Home 7', series1: 12, series2: 4, series3: 4 },
  ];

  const ChartSelector = () => (
    <div className="flex justify-center gap-4 mb-6">
      {['bar', 'pie', 'line'].map((chartType) => (
        <motion.button
          key={chartType}
          onClick={() => setActiveChart(chartType)}
          className={`px-4 py-2 rounded-lg ${
            activeChart === chartType
              ? 'bg-emerald-600 text-white'
              : 'bg-emerald-100 text-emerald-800'
          } font-medium shadow-md`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart
        </motion.button>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen bg-emerald-50 py-8 px-4">
      {/* Back Button */}
      <motion.button
        onClick={() => navigate('/')}
        className="fixed top-20 left-4 z-10 bg-emerald-600 text-white px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2 hover:bg-emerald-700 transition-colors"
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
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h1 className="text-3xl font-bold text-emerald-800 mb-2">Ward 15 — Vasundhara Society</h1>
          <p className="text-emerald-600">Waste Collection Analytics and Statistics</p>
        </motion.div>

        {/* Chart Selector */}
        <ChartSelector />

        {/* Responsive Chart Container */}
        <motion.div
          className="bg-white p-4 md:p-6 rounded-2xl shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              {activeChart === 'bar' && (
                <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="day" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="recyclable" fill="#82ca9d" stackId="a" />
                  <Bar dataKey="organic" fill="#8884d8" stackId="a" />
                  <Bar dataKey="nonRecyclable" fill="#ffc658" stackId="a" />
                </BarChart>
              )}
              {activeChart === 'pie' && (
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius="40%"
                    outerRadius="70%"
                    fill="#8884d8"
                    paddingAngle={5}
                    dataKey="value"
                    label
                  />
                  <Tooltip />
                  <Legend />
                </PieChart>
              )}
              {activeChart === 'line' && (
                <LineChart data={lineData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="series1" stroke="#8884d8" strokeWidth={2} />
                  <Line type="monotone" dataKey="series2" stroke="#82ca9d" strokeWidth={2} />
                  <Line type="monotone" dataKey="series3" stroke="#ffc658" strokeWidth={2} />
                </LineChart>
              )}
            </ResponsiveContainer>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default LBHome;
