import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import AdminBloodDonationsTable from "../../../components/user/adminPanal/AdminBloodDonationsTable.tsx";

export function AdminBloodDonotion() {
    return (
        <>
            <PageMeta
                title="Admin-Blood Donotion | LifeLine"
                description="This is admin profile -Blood Donotion"
            />
            <PageBreadcrumb pageTitle="Blood Donotion"/>

            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Blood Donotion
                </h3>
                <div className="space-y-6">
                    {/* Add your content here */}

                    <AdminBloodDonationsTable/>

                </div>
            </div>
        </>
    );
}
