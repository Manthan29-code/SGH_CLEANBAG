import React from 'react'
import { Outlet } from 'react-router-dom'
import { useTheme } from "@/context/ThemeContext";

import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'

const Layout = () => {
    const { darkMode } = useTheme();
  return (
    <>
      <Navbar />
      <Outlet darkMode={darkMode} />
      <Footer darkMode={darkMode} />
    </>
  )
}

export default Layout
