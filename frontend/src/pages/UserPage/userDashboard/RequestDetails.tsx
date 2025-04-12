import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import ReqDetailsHeader from "../../../components/user/dashboard/ReqDetailsHeader.tsx";
import ConformDonorTable from "../../../components/user/dashboard/ConformDonorTable.tsx";

export default function RequestDetails() {
    // Retrieve the request object from localStorage
    const request = JSON.parse(localStorage.getItem("request") || "null");

    if (!request) {
        return <div>No request details available.</div>;
    }

    return (
        <>
            <PageMeta
                title="UserProfile-requestDetails | LifeLine"
                description="This is user profile"
            />

            <PageBreadcrumb pageTitle="Request Details"/>


            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <div className="space-y-6">
                    <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                        Play Time
                    </h3>
                    < ReqDetailsHeader/>

                    <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                        Conform Donors
                    </h3>

                    <ConformDonorTable />




                </div>
            </div>
        </>


    );
}
