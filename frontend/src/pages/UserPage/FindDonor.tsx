import MainNavbar from '../../layout/user/MainNavbar';
import Headertitle from '../../components/user/HeaderTitle';
import findDonorBanner from "../../../public/assets/image/findDonorBanner.jpeg";

import DonorFindForm from "../../components/user/findDonor/DonorFindForm";


import QuickSteps from '../../components/user/QuickSteps'
import {Footer} from '../../layout/user/Footer';


export const FindDonor = () => {

    const title = "Find donor";
    const img = findDonorBanner;
    const description = "අපි ඔබගේ දායම සහ සහයෝගය මගින් රුධිර දායකයින් සොයා ගැනීමට සහ අවශ්‍යතාවයන් ඉටු කිරීමට කටයුතු කරමින් සිටිමු.";


    return (
        <>
            <MainNavbar/>
            <Headertitle title={title} img={img} description={description}  />
            <DonorFindForm/>
            <QuickSteps/>
            <Footer/>
        </>
    );

}
