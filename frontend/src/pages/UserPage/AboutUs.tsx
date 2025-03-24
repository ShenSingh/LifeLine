import MainNavbar from '../../layout/user/MainNavbar';
import HeaderTitle from '../../components/user/HeaderTitle.tsx';
import findDonorBanner from "../../../public/assets/image/aboutUsBanner.png";

import AboutInApp from "../../components/user/aboutUs/AboutInApp.tsx";
import AboutDisInApp from "../../components/user/aboutUs/AboutDisInApp";
import HomeRegComp from '../../components/user/home/HomeRegComp';
import JoinUs from "../../components/user/aboutUs/JoinUs";
import {Footer} from '../../layout/user/Footer.tsx';

export const AboutUs = () => {

    const title = "About Us";
    const img = findDonorBanner;
    const description = "අපි ඔබගේ දායම සහ සහයෝගය මගින් රුධිර දායකයින් සොයා ගැනීමට සහ අවශ්‍යතාවයන් ඉටු කිරීමට කටයුතු කරමින් සිටිමු.";


    return (
        <>
            <MainNavbar/>
            <HeaderTitle title={title} img={img} description={description}  />
            <AboutInApp/>
            <AboutDisInApp/>
            <HomeRegComp/>
            <JoinUs/>
            <Footer/>
        </>
    );

}
