import MainNavbar from '../../layout/user/MainNavbar';
import Headertitle from '../../components/user/HeaderTitle.tsx';

import DonorBanner from '../../../public/assets/image/donorBanner.jpg';
import {Footer} from '../../layout/user/Footer.tsx';
import DonorRegForm from "../../components/user/donor/DonorRegForm";
import DonorDetails01Comp from "../../components/user/donor/DonorDetails01Comp";
import DonorDetails02Comp from "../../components/user/donor/DonorDetails02Comp";


export const Donor = () => {

    const title = "Donor";
    const img = DonorBanner;
    const description = "අපි ඔබගේ දායම සහ සහයෝගය මගින් රුධිර දායකයින් සොයා ගැනීමට සහ අවශ්‍යතාවයන් ඉටු කිරීමට කටයුතු කරමින් සිටිමු.";


    return (
        <>
            <MainNavbar/>
            <Headertitle title={title} img={img} description={description}  />
            <DonorRegForm/>
            <DonorDetails01Comp/>
            <DonorDetails02Comp/>
            <Footer/>
        </>
    );

}
