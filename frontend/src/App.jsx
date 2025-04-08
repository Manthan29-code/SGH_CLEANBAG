import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/components/Layout";
import Services from "@/components/Landings/Services";
import AboutUs from "@/components/Landings/AboutUs";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import FeedBackCards from "@/components/Landings/FeedBackCards";
import ContactUs from "@/components/Landings/ContactUs";
import SchedulingHome from "@/components/Scheduling/SchedulingHome";
import HolidayCalendar from "@/components/Scheduling/HolidayCalandar";
import CleanBageConnect from '@/components/Requests/CleanBageConnect';
import WcReq from '@/components/Requests/WcReq';
import ExtraWcReq from '@/components/Requests/ExtraWcReq';
import CleanbageWallet from '@/components/Wallet/Whome';
import ProfileSummary from '@/components/Wallet/WMyProfile';
import TransactionHistory from '@/components/Wallet/TransactionHistory';
import RewardHistory from '@/components/Wallet/RewardHistory';
import LBHome from '@/components/LeaderBoard/LBHome';

function App() {

  const LayoutRoutes = [
    { path: "/", element: <Home /> },
    { path: "/about", element: <AboutUs /> },
    { path: "/services", element: <Services /> },
    { path: "/testimonials", element: <FeedBackCards /> },
    { path: "/contact", element: <ContactUs /> },
    { path: "/scheduling", element: <SchedulingHome /> },
    { path: "/holiday-calendar", element: <HolidayCalendar /> },
    { path: "/requests", element: <CleanBageConnect /> },
    { path: "/waste-collection", element: <WcReq /> },
    { path: "/extra-waste-bin", element: <ExtraWcReq /> },
    { path: "/wallet", element: <CleanbageWallet /> },
    { path: "/wallet/profile", element: <ProfileSummary /> },
    { path: "/wallet/transaction-history", element: <TransactionHistory /> },
    { path: "/wallet/rewards-history", element: <RewardHistory /> },
    { path: "/leaderboard", element: <LBHome /> },
  ]

  return (
    <Routes>
      {LayoutRoutes.map((route, index) => (
        <Route key={index} element={<Layout />}>

          <Route
            key={index}
            path={route.path}
            element={route.element}
          />
        </Route>
      ))}
      <Route path="/login" element={<Login />} />
      <Route path="/Register" element={<Register />} />

    </Routes>
  );
}

export default App;
