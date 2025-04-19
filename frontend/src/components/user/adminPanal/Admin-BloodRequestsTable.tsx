import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../uiComponent/table";

import Badge from "../../uiComponent/badge/Badge";
import { loadAllBloodRequests } from "../../../api/bloodRequest.tsx";
import { useEffect, useState } from "react";

export interface AdminBloodRequest {
  id: string;
  bloodType: string;
  status: string;
  requestDate: string;
  requester: {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    hospital: {
      id: string;
      name: string;
      latitude: string;
      longitude: string;
      district: string;
    };
    role: string;
    status: string;
  };
  hospital: {
    id: string;
    name: string;
    latitude: string;
    longitude: string;
    district: string;
  };
}

export default function AdminBloodRequestsTable() {
  const [tableData, setTableData] = useState<AdminBloodRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await loadAllBloodRequests();
        const transformedData = data.map((item) => ({
          ...item,
          requester: item.requester || { hospital: { name: "Unknown" } },
        }));
        setTableData(transformedData);
      } catch (error) {
        console.error("Error loading blood requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReject = (id: string) => {
    if (window.confirm("Are you sure you want to reject this request?")) {
      console.log(`Request with ID ${id} has been rejected.`);
      // Optionally send an API call here to update the status
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Request ID
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Request Date
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Blood Group
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Hospital
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Status
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((request) => (
                    <TableRow key={request.id} className="hover:bg-gray-50 dark:hover:bg-white/[0.08]">
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {request.id}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.requestDate}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.bloodType}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.requester?.hospital?.name || "Unknown"}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        <Badge
                            size="sm"
                            color={
                              request.status === "Approved"
                                  ? "success"
                                  : request.status === "Pending"
                                      ? "warning"
                                      : "error"
                            }
                        >
                          {request.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="px-4 py-3 text-start">
                        <button
                            onClick={() => handleReject(request.id)}
                            className="px-3 py-2 text-sm font-medium text-white bg-red-500 rounded hover:bg-red-600"
                        >
                          Reject
                        </button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
  );
}
