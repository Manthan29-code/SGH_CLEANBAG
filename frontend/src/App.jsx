import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "@/layout/Layout";
import Register from "@/pages/auth/Register";
import Login from "@/pages/auth/Login";
import Home from "@/pages/Home";
import ReportBin from "@/pages/resident/ReportBin";
import Dashboard from "@/pages/resident/Dashboard";
import RoutesPage from "@/pages/garbage_collector/Routes";
import Collections from "@/pages/garbage_collector/Collections";

const layoutRoutes = [
  { path: "/", element: <Home /> },
  {path: "/resident/report", element: <ReportBin />},
  {path: "/resident", element: <Dashboard />},
  {path: "/collector/routes", element: <RoutesPage />},
  {path: "/collector/collections", element: <Collections />}
];

const App = () => {
  return (
      <Routes>
        <Route path="/" element={<Layout />}>
          {layoutRoutes.map((route) => (
            <Route key={route.path} path={route.path} element={route.element} />
          ))}
        </Route>

        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        

      </Routes>
  );
};

export default App;
