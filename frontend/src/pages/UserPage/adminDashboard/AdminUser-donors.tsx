import PageMeta from "../../../components/common/PageMeta.tsx";
import PageBreadcrumb from "../../../components/common/PageBreadCrumb.tsx";
import AdminUserDonorsTable from "../../../components/user/adminPanal/Admin-UserDonorsTable.tsx";

export function AdminUserDonors() {
    return (
        <>
            <PageMeta
                title="Admin-Donors | LifeLine"
                description="This is user admin -Donors"
            />
            <PageBreadcrumb pageTitle="Donors"/>

            <div
                className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
                <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
                    Donors List
                </h3>
                <div className="space-y-6">
                    <AdminUserDonorsTable/>
                </div>
            </div>
        </>
    );
}
