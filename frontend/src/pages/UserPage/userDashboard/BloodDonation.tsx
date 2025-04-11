import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import PlayTimeChart from "../../../components/user/dashboard/PlayTimeChart.tsx";
import UserBloodReqCard from "../../../components/user/dashboard/UserBloodReqCard.tsx";

export default function BloodDonation() {
    return (
        <>
            <PageMeta
                title="UserProfile-Blood Donation | LifeLine"
                description="This is user profile -Blood Donation"
            />
            <PageBreadcrumb pageTitle="My Profile"/>

            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Blood Donation
                </h3>
                <div className="space-y-6">
                    <UserBloodReqCard/>
                    <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                        Monthly Blood Request
                    </h3>
                    <PlayTimeChart/>
                </div>
            </div>
        </>
    );
}
