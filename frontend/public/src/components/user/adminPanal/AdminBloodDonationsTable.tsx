import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../uiComponent/table";

import Badge from "../../uiComponent/badge/Badge";

export interface AdminBloodDonation {
  requesterId: string;
  requestDate: string;
  donorId: string;
  status: string;
  bloodGroup: string;
  hospital: string;
  donationDate?: string;
}


// Sample table data
const tableData: AdminBloodDonation[] = [
  {
    requesterId: "U002",
    requestDate: "2023-10-01",
    donorId: "D001",
    status: "Approved",
    bloodGroup: "O+",
    hospital: "City Hospital",
    donationDate: "2023-10-02",
  },
    {
        requesterId: "U003",
        requestDate: "2023-10-03",
        donorId: "D002",
        status: "Pending",
        bloodGroup: "A+",
        hospital: "General Hospital",
    },
    {
        requesterId: "U004",
        requestDate: "2023-10-04",
        donorId: "D003",
        status: "Rejected",
        bloodGroup: "B+",
        hospital: "Community Hospital",
    },
    {
        requesterId: "U005",
        requestDate: "2023-10-05",
        donorId: "D004",
        status: "Approved",
        bloodGroup: "AB+",
        hospital: "City Hospital",
    },
    {
        requesterId: "U006",
        requestDate: "2023-10-06",
        donorId: "D005",
        status: "Pending",
        bloodGroup: "O-",
        hospital: "General Hospital",
    },
    {
        requesterId: "U007",
        requestDate: "2023-10-07",
        donorId: "D006",
        status: "Rejected",
        bloodGroup: "A-",
        hospital: "Community Hospital",
    },
    {
        requesterId: "U008",
        requestDate: "2023-10-08",
        donorId: "D007",
        status: "Approved",
        bloodGroup: "B-",
        hospital: "City Hospital",
    },
];

export default function AdminBloodDonationsTable() {

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
                    Donor ID
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
                    Donation Date
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
                            {request.donorId}
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
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {request.donationDate || "N/A"}
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
