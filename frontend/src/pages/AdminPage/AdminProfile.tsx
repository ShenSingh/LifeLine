import PageBreadcrumb from "../../components/common/PageBreadCrumb.tsx";
import PageMeta from "../../components/common/PageMeta.tsx";
import UserDonorInfoCard from "../../components/UserProfile/UserDonorInfoCard.tsx";
import UserInfoCard from "../../components/UserProfile/UserInfoCard.tsx";
import {getUser} from "../../api/user.tsx";
import {useEffect, useState} from "react";

export default function AdminProfile() {
    const [role, setRole] = useState<string | null>(null);

    useEffect(() => {
        async function fetchUserRole() {
            try {
                const user = await getUser(); // Fetch user data
                setRole(user.role); // Extract and set the role
            } catch (error) {
                console.error("Error fetching user role:", error);
            }
        }
        fetchUserRole();
    }, []);

    return (
    <>
      <PageMeta
        title="Profile Dashboard | Lifeline"
        description="Profile Dashboard"
      />
      <PageBreadcrumb pageTitle="Profile" />
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          My Profile Information
        </h3>
        <div className="space-y-6">

            {role === "DONOR" && <UserInfoCard />}
            {role === "DONOR" && <UserDonorInfoCard />}
            {role === "REQUESTER" && <UserInfoCard />}
        </div>
      </div>
    </>
  );
}
