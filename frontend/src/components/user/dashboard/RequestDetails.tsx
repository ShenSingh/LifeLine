import PageMeta from "../../common/PageMeta.tsx";
import PageBreadcrumb from "../../common/PageBreadCrumb.tsx";

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
                    <div className="p-5">
                        <h2 className="text-lg font-semibold">Request Details</h2>
                        <p><strong>Request ID:</strong> {request.id}</p>
                        <p><strong>Request Date:</strong> {request.requestDate}</p>
                        <p><strong>Blood Group:</strong> {request.bloodGroup}</p>
                        <p><strong>Hospital:</strong> {request.hospital}</p>
                        <p><strong>Status:</strong> {request.status}</p>
                    </div>
                </div>
            </div>
        </>


    );
}
