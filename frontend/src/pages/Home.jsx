import React from 'react'
import LandingPage from '@/components/Landings/LandingPage'
import AboutUs from '@/components/Landings/AboutUs'
import Services from '@/components/Landings/Services'
import FeedBackCards from '@/components/Landings/FeedBackCards'
import ContactUs from '@/components/Landings/ContactUs'
import FbPrompt from '@/components/Landings/FbPrompt'
import Footer from '@/components/Landings/Footer'


const Home = () => {
    return (
        <div className='bg-emerald-50 min-h-screen'>
            <LandingPage />
            <AboutUs />
            <Services />
            <FeedBackCards />
            <ContactUs />
            <FbPrompt />
            <Footer />
        </div>
    )
}

export default Home
