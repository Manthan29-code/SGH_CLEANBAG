import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./components/Landings/LandingPage";
import Services from "./components/Landings/Services";
import AboutUs from "./components/Landings/AboutUs";
import Login from "./components/Landings/Login";
import Register from "./components/Landings/Register";
import FeedBackCards from "./components/Landings/FeedBackCards";
import ContactUs from "./components/Landings/ContactUs";
import FbPrompt from "./components/Landings/FbPrompt";
import Footer from "./components/Landings/Footer";


function App() {
  return (
    <Router>
      <div className="font-cursive antialiased">
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
        </Routes>
      </div>
    </Router>
  );
}

export default App;
