import {
  ArrowDownIcon,
  ArrowUpIcon,
  BoxIconLine,
  TaskIcon,
} from "../../../icons";
import Badge from "../../uiComponent/badge/Badge.tsx";
import {useEffect, useState} from "react";
import {getUser, UserAllInfo} from "../../../api/user.tsx";

export default function TopCard() {
  const [user, setUser] = useState<UserAllInfo | null>(null);
  const [bloodRequests, setBloodRequests] = useState<
      { id: string; bloodType: string; status: string; createdAt: string | null }[]
  >([]);


  useEffect(() => {
    async function fetchUser() {
      try {
        const fetchedUser = await getUser();
        setUser(fetchedUser as unknown as UserAllInfo); // Cast to UserAllInfo if compatible

        if (fetchedUser && Array.isArray(fetchedUser.bloodRequests)) {
          setBloodRequests(fetchedUser.bloodRequests);
        }
      } catch (error) {
        console.error("Error fetching user:", error);
      }
    }
    fetchUser();
  }, []);

  {
    console.log("User:", user);
  }


  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6">
      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <TaskIcon className="text-gray-800 size-6 dark:text-white/90" />
        </div>

        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Blood Request
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              {bloodRequests.length}
            </h4>
          </div>
          <Badge color="success">
            <ArrowUpIcon />
            11.01%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}

      {/* <!-- Metric Item Start --> */}
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] md:p-6">
        <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-xl dark:bg-gray-800">
          <BoxIconLine className="text-gray-800 size-6 dark:text-white/90" />
        </div>
        <div className="flex items-end justify-between mt-5">
          <div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              Blood Donation
            </span>
            <h4 className="mt-2 font-bold text-gray-800 text-title-sm dark:text-white/90">
              5
            </h4>
          </div>

          <Badge color="error">
            <ArrowDownIcon />
            9.05%
          </Badge>
        </div>
      </div>
      {/* <!-- Metric Item End --> */}
    </div>
  );
}
