import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../uiComponent/table";

import Badge from "../../uiComponent/badge/Badge";

export interface AdminBloodRequest {
  requesterId: string;
  requestDate: string;
  status: string;
  bloodGroup: string;
  hospital: string;
}



// request rejected method

const handleReject = (requestId: string) => {
  // Logic to reject the request
  console.log(`Request with ID ${requestId} has been rejected.`);
};

// Sample table data
const tableData: AdminBloodRequest[] = [
  {
    requesterId: "U002",
    requestDate: "2023-10-01",
    status: "Approved",
    bloodGroup: "O+",
    hospital: "City Hospital",
  },
  {
    requesterId: "U009",
    requestDate: "2023-10-05",
    status: "Pending",
    bloodGroup: "A-",
    hospital: "Green Valley Clinic",
  },
  {
    requesterId: "U005",
    requestDate: "2023-10-10",
    status: "Rejected",
    bloodGroup: "B+",
    hospital: "Sunrise Medical Center",
  },
  {
    requesterId: "U005",
    requestDate: "2023-10-10",
    status: "Rejected",
    bloodGroup: "B+",
    hospital: "Sunrise Medical Center",
  },
  {
    requesterId: "U005",
    requestDate: "2023-10-10",
    status: "Rejected",
    bloodGroup: "B+",
    hospital: "Sunrise Medical Center",
  },
  {
    requesterId: "U005",
    requestDate: "2023-10-10",
    status: "Rejected",
    bloodGroup: "B+",
    hospital: "Sunrise Medical Center",
  },
  {
    requesterId: "U005",
    requestDate: "2023-10-10",
    status: "Rejected",
    bloodGroup: "B+",
    hospital: "Sunrise Medical Center",
  },
  {
    requesterId: "U005",
    requestDate: "2023-10-10",
    status: "Rejected",
    bloodGroup: "B+",
    hospital: "Sunrise Medical Center",
  },
];

export default function AdminBloodRequestsTable() {

  return (


      <div
          className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Request ID
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Request Date
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Blood Group
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Hospital
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Status
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((request) => (
                    <TableRow key={request.requesterId}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {request.requesterId}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.requestDate}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.bloodGroup}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.hospital}
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
                            onClick={() => {
                                // Handle approve action

                              // conform alert
                                if (window.confirm("Are you sure you want to approve this request?")) {
                                    console.log(`Request with ID ${request.requesterId} has been approved.`);
                                }
                              handleReject(request.requesterId);
                            }}
                            className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
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
