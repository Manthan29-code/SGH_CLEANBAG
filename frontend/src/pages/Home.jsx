import React from 'react'
import LandingPage from '@/components/Landings/LandingPage'
import AboutUs from '@/components/Landings/AboutUs'
import Services from '@/components/Landings/Services'
import FeedBackCards from '@/components/Landings/FeedBackCards'
import ContactUs from '@/components/Landings/ContactUs'
import FbPrompt from '@/components/Landings/FbPrompt'


const Home = () => {
    return (
        <div className='bg-emerald-50 min-h-screen'>
            <LandingPage />
            <AboutUs />
            <Services />
            <FeedBackCards />
            <ContactUs />
            <FbPrompt />
        </div>
    )
}

export default Home
