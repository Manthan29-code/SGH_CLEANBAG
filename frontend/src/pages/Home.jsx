import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import Footer from "@/components/Footer";
import { FaRecycle, FaLeaf, FaTruck, FaMedal } from "react-icons/fa";
import { TbLoader3 } from "react-icons/tb";
import { MdSchedule } from "react-icons/md";

const Home = ({ darkMode }) => {

  const features = [
    {
      icon: <FaRecycle className="w-8 h-8" />,
      title: "Smart Waste Management",
      description: "Efficient collection and disposal of waste using smart technology"
    },
    {
      icon: <FaLeaf className="w-8 h-8" />,
      title: "Eco-Friendly Practices",
      description: "Promoting sustainable waste management solutions"
    },
    {
      icon: <MdSchedule className="w-8 h-8" />,
      title: "Collection Schedule",
      description: "Set your preferred waste collection times and frequency"
    },
    {
      icon: <FaMedal className="w-8 h-8" />,
      title: "Rewards Program",
      description: "Earn rewards for responsible waste management"
    }
  ];

  return (
    <div className={`${darkMode ? 'dark' : ''}`}>
      <div className="min-h-screen bg-[#F0FDF4] dark:bg-[#081C15] transition-colors duration-300">
        {/* <Navbar /> */}
        
        {/* Hero Section */}
        <main className="pt-16">
          <HeroSection darkMode={darkMode} />
          
          {/* Features Section */}
          <section className="py-20 px-4 bg-white/50 dark:bg-[#1B4332]/50 backdrop-blur-sm">
            <div className="max-w-7xl mx-auto">
              <motion.h2 
                className="text-3xl md:text-4xl font-bold text-center text-[#2D6A4F] dark:text-[#95D5B2] mb-16"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                Why Choose CleanBage?
              </motion.h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {features.map((feature, index) => (
                  <motion.div
                    key={index}
                    className="p-6 rounded-xl bg-white/80 dark:bg-[#2D6A4F]/20 backdrop-blur-sm
                             border border-[#95D5B2]/20 hover:border-[#2D6A4F]/50 transition-all
                             group hover:shadow-lg hover:shadow-[#2D6A4F]/10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <div className="mb-4 text-[#2D6A4F] dark:text-[#95D5B2] 
                                  group-hover:scale-110 transition-transform">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-semibold mb-2 text-[#2D6A4F] dark:text-[#95D5B2]">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {feature.description}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* Statistics Section */}
          <section className="py-20 px-4">
            <div className="max-w-7xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <StatsCard
                  number="95%"
                  label="Waste Collection Rate"
                  icon={<TbLoader3 className="w-6 h-6 animate-spin" />}
                />
                <StatsCard
                  number="24/7"
                  label="Support Available"
                  icon={<FaTruck className="w-6 h-6" />}
                />
                <StatsCard
                  number="5000+"
                  label="Happy Users"
                  icon={<FaMedal className="w-6 h-6" />}
                />
              </div>
            </div>
          </section>

          {/* CTA Section */}
          <section className="py-20 px-4 bg-gradient-to-br from-[#2D6A4F] to-[#95D5B2] dark:from-[#1B4332] dark:to-[#2D6A4F]">
            <div className="max-w-4xl mx-auto text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to Make a Difference?
              </h2>
              <p className="text-lg text-white/90 mb-8">
                Join CleanBage today and be part of the solution for a cleaner tomorrow.
              </p>
              <Link
                to="/register"
                className="inline-block px-8 py-3 bg-white text-[#2D6A4F] rounded-lg
                         font-semibold hover:bg-[#95D5B2] hover:text-white transition-colors
                         shadow-lg hover:shadow-xl"
              >
                Get Started Now
              </Link>
            </div>
          </section>
        </main>

        {/* <Footer darkMode={darkMode} /> */}
      </div>
    </div>
  );
};

// Stats Card Component
const StatsCard = ({ number, label, icon }) => {
  return (
    <motion.div
      className="p-6 rounded-xl bg-white/80 dark:bg-[#2D6A4F]/20 backdrop-blur-sm
                 border border-[#95D5B2]/20 text-center group hover:scale-105 transition-transform"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="inline-flex items-center justify-center p-3 rounded-full
                    bg-[#2D6A4F]/10 dark:bg-[#95D5B2]/10 text-[#2D6A4F] dark:text-[#95D5B2]
                    group-hover:scale-110 transition-transform mb-4">
        {icon}
      </div>
      <h3 className="text-3xl font-bold text-[#2D6A4F] dark:text-[#95D5B2] mb-2">
        {number}
      </h3>
      <p className="text-gray-600 dark:text-gray-300">
        {label}
      </p>
    </motion.div>
  );
};

export default Home;