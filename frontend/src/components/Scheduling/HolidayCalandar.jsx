import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { format, addMonths, subMonths, startOfMonth, endOfMonth, eachDayOfInterval, isSameMonth, isSameDay, isSunday } from 'date-fns';
import { useNavigate } from 'react-router-dom';

function HolidayCalendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentEvents, setCurrentEvents] = useState([
    { date: new Date(2024, 3, 27), title: 'Day 09 Daily CSS Image' }
  ]);
  const navigate = useNavigate();

  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'July', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  // Special dates array (specific holidays)
  const specialDates = [
    new Date(2024, 2, 25), // March 25, 2024
    new Date(2024, 3, 14), // April 14, 2024
    new Date(2024, 3, 27), // April 27, 2024
    new Date(2024, 4, 1),  // May 1, 2024
  ];

  // Updated helper function to check if a date is special or a Sunday
  const isSpecialDate = (date) => {
    if (!date) return false;
    return specialDates.some(specialDate => isSameDay(specialDate, date)) || isSunday(date);
  };

  const handlePrevMonth = () => setCurrentDate(subMonths(currentDate, 1));
  const handleNextMonth = () => setCurrentDate(addMonths(currentDate, 1));

  const getDaysInMonth = () => {
    const start = startOfMonth(currentDate);
    const end = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start, end });

    // Get the day of the week for the first day (0-6)
    const firstDayOfMonth = start.getDay();

    // Add empty days at the start
    const emptyDays = Array(firstDayOfMonth).fill(null);

    return [...emptyDays, ...days];
  };

  return (
    <div className="bg-emerald-50 min-h-screen py-8 px-4">
      {/* Back Button - Adjusted position */}
      <motion.button
        onClick={() => navigate('/scheduling')}
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
        <span className="hidden md:inline">Back to Schedule</span>
      </motion.button>

      {/* Calendar Container - Made responsive */}
      <div className="flex flex-col md:flex-row bg-white rounded-2xl shadow-xl overflow-hidden max-w-3xl mx-auto mt-16">
        {/* Left Panel - Full width on mobile */}
        <motion.div 
          className="w-full md:w-1/3 bg-emerald-500 p-4 md:p-6 text-white"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex md:block items-center justify-between">
            <div>
              <div className="text-4xl md:text-6xl font-bold mb-1 md:mb-2">
                {format(selectedDate, 'd')}
              </div>
              <div className="text-lg md:text-xl mb-4 md:mb-8">
                {format(selectedDate, 'EEEE').toUpperCase()}
              </div>
            </div>

            {/* Holiday Information - Responsive layout */}
            <div className="space-y-2 md:space-y-4">
              <h3 className="text-base md:text-lg font-semibold">Holiday Information</h3>
              {isSpecialDate(selectedDate) && (
                <div className="text-sm">
                  {isSunday(selectedDate) ? (
                    "• Weekly Holiday (Sunday)"
                  ) : (
                    "• Special Holiday"
                  )}
                </div>
              )}
              {currentEvents.map((event, index) => (
                <div key={index} className="text-sm">
                  • {event.title}
                </div>
              ))}
            </div>
          </div>

          {/* Create Event Button - Hidden on mobile */}
          <motion.button
            className="hidden md:flex mt-8 items-center space-x-2 text-white border border-white rounded-full px-4 py-2"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            <span>Create an Event</span>
          </motion.button>
        </motion.div>

        {/* Right Panel - Full width on mobile */}
        <motion.div 
          className="w-full md:w-2/3 p-4 md:p-6"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {/* Year and Navigation */}
          <div className="flex justify-between items-center mb-4 md:mb-6">
            <div className="text-base md:text-lg text-gray-500">• {format(currentDate, 'yyyy')} •</div>
            <div className="flex space-x-4">
              <button onClick={handlePrevMonth} className="text-gray-500 hover:text-emerald-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button onClick={handleNextMonth} className="text-gray-500 hover:text-emerald-500">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>

          {/* Months - Scrollable on mobile */}
          <div className="flex overflow-x-auto md:justify-center space-x-4 mb-4 md:mb-6 pb-2 md:pb-0 hide-scrollbar">
            {months.map((month, index) => (
              <motion.button
                key={month}
                className={`text-sm whitespace-nowrap ${
                  index === currentDate.getMonth() 
                    ? 'text-emerald-500 font-bold' 
                    : 'text-gray-400'
                }`}
                whileHover={{ scale: 1.1 }}
              >
                {month}
              </motion.button>
            ))}
          </div>

          {/* Calendar Grid - Responsive sizing */}
          <div className="grid grid-cols-7 gap-1 md:gap-2">
            {/* Day Headers */}
            {days.map(day => (
              <div 
                key={day} 
                className={`text-center text-xs md:text-sm font-medium ${
                  day === 'SUN' ? 'text-red-500' : 'text-gray-500'
                }`}
              >
                {day}
              </div>
            ))}

            {/* Calendar Days */}
            {getDaysInMonth().map((date, index) => (
              <motion.button
                key={index}
                className={`
                  h-8 text-xs md:text-sm rounded-full transition-colors
                  ${!date ? 'invisible' : ''}
                  ${date && isSameDay(date, selectedDate) ? 'bg-emerald-500 text-white' : ''}
                  ${date && isSpecialDate(date) ? 'bg-emerald-800 text-white hover:bg-emerald-900' : ''}
                  ${date && !isSameDay(date, selectedDate) && !isSpecialDate(date) ? 'hover:bg-emerald-100' : ''}
                `}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => {
                  if (date) {
                    setSelectedDate(date);
                    if (isSpecialDate(date)) {
                      console.log(`Holiday: ${isSunday(date) ? 'Sunday' : 'Special Holiday'}`);
                    }
                  }
                }}
              >
                {date ? format(date, 'd') : ''}
              </motion.button>
            ))}
          </div>

          {/* Legend - Stacked on mobile */}
          <div className="mt-4 md:mt-6 flex flex-col md:flex-row md:justify-end space-y-2 md:space-y-0 md:space-x-4 text-xs md:text-sm">
            <div className="flex items-center">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-800 mr-2"></div>
              <span className="text-gray-600">Holiday (Sunday & Special)</span>
            </div>
            <div className="flex items-center">
              <div className="w-3 h-3 md:w-4 md:h-4 rounded-full bg-emerald-500 mr-2"></div>
              <span className="text-gray-600">Selected</span>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}

// Add this CSS to your global styles or as a style tag
const styles = `
  .hide-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .hide-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
`;

export default HolidayCalendar;
