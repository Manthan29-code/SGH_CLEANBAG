import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useAuth } from '@/hooks/useAuth';
import Layout from "@/components/Layout";
import Services from "@/components/Landings/Services";
import AboutUs from "@/components/Landings/AboutUs";
import Home from "@/pages/Home";
import Login from "@/pages/auth/Login";
import Register from "@/pages/auth/Register";
import LogoutPage from "@/pages/auth/Logout";
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

// Resident Pages 
import ResidentProfilePage from "@/pages/resident/Profile";
import ResidentReportBinPage from "@/pages/resident/ReportBin";
import ResidentCollectionsPage from "@/pages/resident/Collections";
import ResidentCollectionDetailPage from "@/pages/resident/CollectionDetail";
import ResidentNearbyBinsPage from "@/pages/resident/NearbyBins";
import ResidentDashboardPage from "@/pages/resident/Dashboard";

// Garbage Collector Pages 
import CollectorProfilePage from "@/pages/garbagecollector/Profile";
import CollectorCollectionsPage from "@/pages/garbagecollector/Collections";
import CollectorCollectionDetailPage from "@/pages/garbagecollector/CollectionDetail";
import CollectorAssignCollectorPage from "@/pages/garbagecollector/AssignCollector";
import CollectorDeleteCollectionPage from "@/pages/garbagecollector/DeleteCollection";
import CollectorSchedulesPage from "@/pages/garbagecollector/Schedules";
import CollectorCollectorSchedulesPage from "@/pages/garbagecollector/CollectorSchedules";
import CollectorScheduleDetailPage from "@/pages/garbagecollector/ScheduleDetail";
import CollectorRoutesPage from "@/pages/garbagecollector/Routes";
import CollectorRouteDetailPage from "@/pages/garbagecollector/RouteDetail";
import CollectorCollectorRoutesPage from "@/pages/garbagecollector/CollectorRoutes";
import CollectorCreateReportPage from "@/pages/garbagecollector/CreateReport";
import CollectorReportsPage from "@/pages/garbagecollector/Reports";
import CollectorCollectorReportsPage from "@/pages/garbagecollector/CollectorReports";
import CollectorDashboardPage from "@/pages/garbagecollector/Dashboard";

// Admin Pages 
import AdminProfilePage from "@/pages/admin/Profile";
import AdminUsersPage from "@/pages/admin/Users";
import AdminUserDetailPage from "@/pages/admin/UserDetail";
import AdminCollectionsPage from "@/pages/admin/Collections";
import AdminCollectionDetailPage from "@/pages/admin/CollectionDetail";
import AdminAssignCollectorPage from "@/pages/admin/AssignCollector";
import AdminDeleteCollectionPage from "@/pages/admin/DeleteCollection";
import AdminCreateSchedulePage from "@/pages/admin/CreateSchedule";
import AdminSchedulesPage from "@/pages/admin/Schedules";
import AdminScheduleDetailPage from "@/pages/admin/ScheduleDetail";
import AdminCreateRoutePage from "@/pages/admin/CreateRoute";
import AdminRoutesPage from "@/pages/admin/Routes";
import AdminRouteDetailPage from "@/pages/admin/RouteDetail";
import AdminReportsPage from "@/pages/admin/Reports";
import AdminReportDetailPage from "@/pages/admin/ReportDetail";
import AdminDashboardPage from "@/pages/admin/Dashboard";



// PrivateRoute Component
const PrivateRoute = ({ children, allowedRole }) => {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;

  if (!user) return <Navigate to="/login" />;

  if (allowedRole && user.role !== allowedRole) return <Navigate to="/" />;

  return children;
};

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/testimonials" element={<FeedBackCards />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/scheduling" element={<SchedulingHome />} />
        <Route path="/holiday-calendar" element={<HolidayCalendar />} />
        <Route path="/requests" element={<CleanBageConnect />} />
        <Route path="/waste-collection" element={<WcReq />} />
        <Route path="/extra-waste-bin" element={<ExtraWcReq />} />
        <Route path="/wallet" element={<CleanbageWallet />} />
        <Route path="/wallet/profile" element={<ProfileSummary />} />
        <Route path="/wallet/transaction-history" element={<TransactionHistory />} />
        <Route path="/wallet/rewards-history" element={<RewardHistory />} />
        <Route path="/leaderboard" element={<LBHome />} />
      </Route>

      {/* Routes without Layout (public) */}
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/logout" element={<LogoutPage />} />

      {/* Resident Routes (protected, role: "resident") */}
      <Route
        path="/resident/profile"
        element={<PrivateRoute allowedRole="resident"><ResidentProfilePage /></PrivateRoute>}
      />
      <Route
        path="/resident/collections/report"
        element={<PrivateRoute allowedRole="resident"><ResidentReportBinPage /></PrivateRoute>}
      />
      <Route
        path="/resident/collections"
        element={<PrivateRoute allowedRole="resident"><ResidentCollectionsPage /></PrivateRoute>}
      />
      <Route
        path="/resident/collections/:id"
        element={<PrivateRoute allowedRole="resident"><ResidentCollectionDetailPage /></PrivateRoute>}
      />
      <Route
        path="/resident/collections/nearby"
        element={<PrivateRoute allowedRole="resident"><ResidentNearbyBinsPage /></PrivateRoute>}
      />
      <Route
        path="/resident/dashboard"
        element={<PrivateRoute allowedRole="resident"><ResidentDashboardPage /></PrivateRoute>}
      />

      {/* Garbage Collector Routes (protected, role: "garbage_collector") */}
      <Route
        path="/collector/profile"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorProfilePage /></PrivateRoute>}
      />
      <Route
        path="/collector/collections"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorCollectionsPage /></PrivateRoute>}
      />
      <Route
        path="/collector/collections/:id"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorCollectionDetailPage /></PrivateRoute>}
      />
      <Route
        path="/collector/collections/:id/assign"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorAssignCollectorPage /></PrivateRoute>}
      />
      <Route
        path="/collector/collections/:id/delete"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorDeleteCollectionPage /></PrivateRoute>}
      />
      <Route
        path="/collector/schedules"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorSchedulesPage /></PrivateRoute>}
      />
      <Route
        path="/collector/schedules/collector"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorCollectorSchedulesPage /></PrivateRoute>}
      />
      <Route
        path="/collector/schedules/:id"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorScheduleDetailPage /></PrivateRoute>}
      />
      <Route
        path="/collector/routes"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorRoutesPage /></PrivateRoute>}
      />
      <Route
        path="/collector/routes/:id"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorRouteDetailPage /></PrivateRoute>}
      />
      <Route
        path="/collector/routes/collector"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorCollectorRoutesPage /></PrivateRoute>}
      />
      <Route
        path="/collector/reports/create"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorCreateReportPage /></PrivateRoute>}
      />
      <Route
        path="/collector/reports"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorReportsPage /></PrivateRoute>}
      />
      <Route
        path="/collector/reports/collector"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorCollectorReportsPage /></PrivateRoute>}
      />
      <Route
        path="/collector/dashboard"
        element={<PrivateRoute allowedRole="garbage_collector"><CollectorDashboardPage /></PrivateRoute>}
      />

      {/* Admin Routes (protected, role: "admin") */}
      <Route
        path="/admin/profile"
        element={<PrivateRoute allowedRole="admin"><AdminProfilePage /></PrivateRoute>}
      />
      <Route
        path="/admin/users"
        element={<PrivateRoute allowedRole="admin"><AdminUsersPage /></PrivateRoute>}
      />
      <Route
        path="/admin/users/:id"
        element={<PrivateRoute allowedRole="admin"><AdminUserDetailPage /></PrivateRoute>}
      />
      <Route
        path="/admin/collections"
        element={<PrivateRoute allowedRole="admin"><AdminCollectionsPage /></PrivateRoute>}
      />
      <Route
        path="/admin/collections/:id"
        element={<PrivateRoute allowedRole="admin"><AdminCollectionDetailPage /></PrivateRoute>}
      />
      <Route
        path="/admin/collections/:id/assign"
        element={<PrivateRoute allowedRole="admin"><AdminAssignCollectorPage /></PrivateRoute>}
      />
      <Route
        path="/admin/collections/:id/delete"
        element={<PrivateRoute allowedRole="admin"><AdminDeleteCollectionPage /></PrivateRoute>}
      />
      <Route
        path="/admin/schedules/create"
        element={<PrivateRoute allowedRole="admin"><AdminCreateSchedulePage /></PrivateRoute>}
      />
      <Route
        path="/admin/schedules"
        element={<PrivateRoute allowedRole="admin"><AdminSchedulesPage /></PrivateRoute>}
      />
      <Route
        path="/admin/schedules/:id"
        element={<PrivateRoute allowedRole="admin"><AdminScheduleDetailPage /></PrivateRoute>}
      />
      <Route
        path="/admin/routes/create"
        element={<PrivateRoute allowedRole="admin"><AdminCreateRoutePage /></PrivateRoute>}
      />
      <Route
        path="/admin/routes"
        element={<PrivateRoute allowedRole="admin"><AdminRoutesPage /></PrivateRoute>}
      />
      <Route
        path="/admin/routes/:id"
        element={<PrivateRoute allowedRole="admin"><AdminRouteDetailPage /></PrivateRoute>}
      />
      <Route
        path="/admin/reports"
        element={<PrivateRoute allowedRole="admin"><AdminReportsPage /></PrivateRoute>}
      />
      <Route
        path="/admin/reports/:id"
        element={<PrivateRoute allowedRole="admin"><AdminReportDetailPage /></PrivateRoute>}
      />
      <Route
        path="/admin/dashboard"
        element={<PrivateRoute allowedRole="admin"><AdminDashboardPage /></PrivateRoute>}
      />
    </Routes>
  );
}

export default App;