import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import UserBloodReqCard from "../../../components/user/dashboard/UserBloodReqCard.tsx";
import BloodRequestTable from "../../../components/user/dashboard/BloodRequestTable.tsx";

export default function BloodRequest() {
    return (
        <>
            <PageMeta
                title="UserProfile-Blood Request | LifeLine"
                description="This is user profile -Blood Request"
            />
            <PageBreadcrumb pageTitle="My Profile"/>

            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Blood Request
                </h3>
                <div className="space-y-6">
                    <UserBloodReqCard/>
                    <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                        Blood Request Details
                    </h3>
                        <BloodRequestTable />
                </div>
            </div>
        </>
    );
}
