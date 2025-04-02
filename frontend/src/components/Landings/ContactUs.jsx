import React from 'react';

function ContactUs() {
  return (
    <div className="bg-emerald-50 min-h-screen py-8 md:py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="text-center px-4 md:px-8 mb-8">
          <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-emerald-800">
            Contact Us
          </h2>
          <div className="w-16 md:w-24 h-1 bg-emerald-600 mx-auto mb-6 md:mb-8"></div>
        </div>

        {/* Contact Information Card */}
        <div className="max-w-md mx-auto">
          <div className="bg-emerald-800 text-white p-8 rounded-lg shadow-lg">
            {/* Email Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Email</h3>
              <a 
                href="mailto:cleanbage@info.co.in" 
                className="text-emerald-100 hover:text-white transition-colors"
              >
                cleanbage@info.co.in
              </a>
            </div>

            {/* Phone Section */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-2">Phone</h3>
              <a 
                href="tel:646-675-5974" 
                className="text-emerald-100 hover:text-white transition-colors"
              >
                646-675-5974
              </a>
            </div>

            {/* Address Section */}
            <div>
              <h3 className="text-xl font-semibold mb-2">Address</h3>
              <p className="text-emerald-100">
                Waste Management Department,<br />
                Jamnagar Municiple Corporation
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;
