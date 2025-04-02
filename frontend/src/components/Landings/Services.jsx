import React from 'react';

function CleanbageServices() {
  return (
    <div className="bg-emerald-50 py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center px-4 md:px-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-emerald-800">Services at Cleanbage</h2>
          <p className="text-base md:text-lg text-emerald-700 mb-6 md:mb-8">
            Explore Cleanbage's innovative features and user-centric services designed to streamline waste management and enhance community engagement.
          </p>
        </div>

        {/* Image Section */}
        <div className="bg-white rounded-lg shadow-md overflow-hidden border-2 border-emerald-100 mb-8 max-w-2xl mx-auto">
          <img 
            src="/src/assets/photos/pexels-shvetsa-5029859.jpg"
            alt="Cleanbage Services" 
            className="w-full h-auto object-cover" 
          />
        </div>

        {/* Service Information Cards - Vertical Layout */}
        <div className="space-y-6 max-w-2xl mx-auto">
          {/* Waste Scheduling Notifications */}
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-100">
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-3">
              Waste Scheduling Notifications
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              Stay informed with Cleanbage's waste scheduling notifications. Our platform provides timely alerts about collection days and any changes to the schedule, ensuring you never miss a pickup. Enjoy peace of knowing that your waste management is organized and efficient.
            </p>
          </div>

          {/* Holiday Updates */}
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-100">
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-3">
              Holiday Updates
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              Keep up-to-date with Cleanbage's holiday updates that affect waste collection services. Our platform ensures you receive notifications about changes in service due to public holidays, helping you plan accordingly and maintain a tidy home.
            </p>
          </div>

          {/* Rewards for Segregation */}
          <div className="bg-white p-6 rounded-lg shadow-md border-2 border-emerald-100">
            <h3 className="text-lg md:text-xl font-bold text-emerald-800 mb-3">
              Rewards for Segregation
            </h3>
            <p className="text-sm md:text-base text-emerald-700">
              Join Cleanbage's rewards program, designed to incentivize proper waste segregation. By participating in our initiative, you can earn rewards for your commitment to environmental sustainability. Together, we can make a significant impact on waste reduction and promote a cleaner community.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CleanbageServices;
