import React from 'react';

function AboutUs() {
  return (
    <div className="bg-emerald-50 text-emerald-700 py-8 md:py-12 px-4">
      <div className="max-w-3xl mx-auto px-4 md:px-8">
        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-emerald-800">About Us</h2>
        <p className="text-base md:text-lg mb-6 md:mb-8">
          At Cleanbage, we are dedicated to revolutionizing waste management for the residents of Jamnagar Municipal Corporation. Our platform serves as a vital communication hub, facilitating efficient waste scheduling and providing timely updates on holidays for households. We are committed to fostering a cleaner environment through innovative solutions that encourage responsible waste segregation and reward users for their efforts.
        </p>

        <h2 className="text-2xl md:text-3xl font-bold mb-4 md:mb-6 text-emerald-800">Our Mission</h2>
        <p className="text-base md:text-lg">
          Our mission at Cleanbage is to empower the community of Jamnagar by promoting sustainable waste practices and enhancing communication between residents and municipal services. We aim to create a user-friendly platform that not only simplifies waste management but also incentivizes households to engage in waste segregation. Together, we strive to build a cleaner, greener future for our city.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;
