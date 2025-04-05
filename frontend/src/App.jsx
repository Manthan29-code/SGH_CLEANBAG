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
import SchedulingHome from "./components/Scheduling/SchedulingHome";
import HolidayCalendar from "./components/Scheduling/HolidayCalandar";
import CleanBageConnect from './components/Requests/CleanBageConnect';
import WcReq from './components/Requests/WcReq';
import ExtraWcReq from './components/Requests/ExtraWcReq';
import CleanbageWallet from './components/Wallet/Whome';
import ProfileSummary from './components/Wallet/WMyProfile';
import TransactionHistory from './components/Wallet/TransactionHistory';
import RewardHistory from './components/Wallet/RewardHistory';
import LBHome from './components/LeaderBoard/LBHome';

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
            <Route path="/login" element={
              <>
                <Login />
                <Footer />
              </>
            } />
            <Route path="/register" element={
              <>
                <Register />
                <Footer />
              </>
            } />
            <Route path="/about" element={
              <>
                <AboutUs />
                <Footer />
              </>
            } />
            <Route path="/services" element={
              <>
                <Services />
                <Footer />
              </>
            } />
            <Route path="/testimonials" element={
              <>
                <FeedBackCards />
                <Footer />
              </>
            } />
            <Route path="/contact" element={
              <>
                <ContactUs />
                <Footer />
              </>
            } />
            <Route path="/scheduling" element={
              <>
                <SchedulingHome />
                <Footer />
              </>
            } />
            <Route path="/holiday-calendar" element={
              <>
                <HolidayCalendar />
                <Footer />
              </>
            } />
            <Route path="/requests" element={
              <>
                <CleanBageConnect />
                <Footer />
              </>
            } />
            <Route path="/waste-collection" element={
              <>
                <WcReq />
                <Footer />
              </>
            } />
            <Route path="/extra-waste-bin" element={
              <>
                <ExtraWcReq />
                <Footer />
              </>
            } />
            <Route path="/wallet" element={
              <>
                <CleanbageWallet />
                <Footer />
              </>
            } />
            <Route path="/wallet/profile" element={
              <>
                <ProfileSummary />
                <Footer />
              </>
            } />
            <Route path="/wallet/transaction-history" element={
              <>
                <TransactionHistory />
                <Footer />
              </>
            } />
            <Route path="/wallet/rewards-history" element={
              <>
                <RewardHistory />
                <Footer />
              </>
            } />
            <Route path="/leaderboard" element={
              <>
                <LBHome />
                <Footer />
              </>
            } />
          </Routes>
        </BackgroundLayout>
      </div>
    </Router>
  );
}

export default App;
