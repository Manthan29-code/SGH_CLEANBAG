import { React, useState } from 'react'
import { Outlet } from 'react-router-dom'
import Footer from './Landings/Footer'
import Header from './Landings/Header'

const Layout = () => {

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };


    return (
        <>
            <Header isMenuOpen={isMenuOpen} toggleMenu={toggleMenu} />
            <Outlet />
            <Footer />
        </>
    )
}

export default Layout
