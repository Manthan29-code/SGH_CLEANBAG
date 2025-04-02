import React from 'react';

function CleanJamnagarPage() {
  return (
    <div className="bg-emerald-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center px-4 md:px-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-emerald-800">
            Stay Informed and Engaged
          </h2>
          <div className="w-16 md:w-24 h-1 bg-emerald-600 mx-auto mb-6 md:mb-8"></div>
          <p className="text-base md:text-lg text-emerald-700">
            Join Cleanbage today and be a part of Jamnagar's journey towards a cleaner, greener future.
          </p>
        </div>

        {/* Image Section */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-emerald-100">
            <img 
              src="/src/assets/photos/pexels-anthony-nguyen-41365574-7300719.jpg"
              alt="Waste Collection Service"
              className="w-full h-auto object-cover"
            />
          </div>
        </div>

        {/* Testimonial Cards - Vertical Layout */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Jayesh Patel's Review */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border-2 border-emerald-100">
            <h3 className="text-lg md:text-xl font-semibold text-emerald-800 text-center mb-4">
              Jayesh Patel
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              Cleanbage has transformed how I manage waste at home. The notifications keep me informed about collection schedules, making it easier to maintain a clean environment.
            </p>
          </div>

          {/* Divyaben Thakkar's Review */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border-2 border-emerald-100">
            <h3 className="text-lg md:text-xl font-semibold text-emerald-800 text-center mb-4">
              Divyaben Thakkar
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              The rewards program at Cleanbage motivates me to segregate waste properly. Knowing that my efforts are recognized and rewarded makes me feel more connected to the community and the environment.
            </p>
          </div>

          {/* Riya Memon's Review */}
          <div className="bg-white p-6 md:p-8 rounded-lg shadow-md border-2 border-emerald-100">
            <h3 className="text-lg md:text-xl font-semibold text-emerald-800 text-center mb-4">
              Riya Memon
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              Cleanbage's updates about holiday schedules have been incredibly helpful. I appreciate the timely information, which allows me to plan my waste disposal without any hassle.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CleanJamnagarPage;