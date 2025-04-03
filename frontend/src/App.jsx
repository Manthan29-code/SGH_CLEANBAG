import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Landings/Header";
import LandingPage from "./components/Landings/LandingPage";
import Services from "./components/Landings/Services";
import AboutUs from "./components/Landings/AboutUs";
import Login from "./components/Landings/Login";
import Register from "./components/Landings/Register";
import FeedBackCards from "./components/Landings/FeedBackCards";
import ContactUs from "./components/Landings/ContactUs";
import FbPrompt from "./components/Landings/FbPrompt";
import Footer from "./components/Landings/Footer";
import BackgroundLayout from "./components/Landings/BackgroundLayout";

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <Router>
      <div className="font-cursive antialiased">
        <BackgroundLayout>
          <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
          <Routes>
            <Route path="/" element={
              <>
                <LandingPage />
                <AboutUs />
                <Services />
                <FeedBackCards/>
                <ContactUs/>
                <FbPrompt/>
                <Footer/>
              </>
            } />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<AboutUs />} />
            <Route path="/services" element={<Services />} />
            <Route path="/testimonials" element={<FeedBackCards />} />
            <Route path="/contact" element={<ContactUs />} />
          </Routes>
        </BackgroundLayout>
      </div>
    </Router>
  );
}

export default App;
