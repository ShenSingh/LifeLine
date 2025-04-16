import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import TopCard from "../../components/user/dashboard/TopCard.tsx";
import BloodReqChart from "../../components/user/dashboard/BloodReqChart.tsx"


export default function UserProfile() {
    return (
        <>
            <PageMeta
                title="UserProfile | LifeLine"
                description="This is user profile"
            />
            <PageBreadcrumb pageTitle="My Profile"/>

            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <TopCard/>
                    <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                        Monthly Blood Request
                    </h3>
                    <BloodReqChart/>
                </div>
            </div>
        </>
    );
}
