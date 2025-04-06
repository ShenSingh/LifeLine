import PageMeta from "../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import TopCard from "../../components/user/dashboard/TopCard.tsx";
import PlayTimeChart from "../../components/user/dashboard/PlayTimeChart.tsx"
import TopRankMember from "../../components/user/dashboard/TopRankMember.tsx";


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
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Player Details
                </h3>
                <div className="space-y-6">
                    <TopCard/>
                    <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                        Play Time
                    </h3>
                    <PlayTimeChart/>
                    <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                        Top Rank Member
                    </h3>
                    <TopRankMember/>
                </div>
            </div>
        </>
    );
}
