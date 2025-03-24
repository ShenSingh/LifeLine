import { useState, useEffect } from 'react';
import Navbar from '../../layout/user/Navbar';
import Hero from '../../components/user/Hero';
import HomeFeature01Comp from '../../components/user/home/HomeFeature01Comp';
import HomeFeature02Comp from '../../components/user/home/HomeFeature02Comp';
import HomeFeature04Comp from '../../components/user/home/HomeFeature04Comp';
import QuickSteps from '../../components/user/QuickSteps';
import HomeRegComp from '../../components/user/home/HomeRegComp';
import { Footer } from '../../layout/user/Footer';

export default function Home() {
    const [isNavbarVisible, setIsNavbarVisible] = useState(true);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsNavbarVisible(false);
            } else {
                setIsNavbarVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Navbar isVisible={isNavbarVisible} />
            <Hero />
            <HomeFeature02Comp />
            <HomeFeature01Comp />
            <QuickSteps />
            <HomeRegComp />
            <HomeFeature04Comp />
            <Footer />
        </>
    );
}
