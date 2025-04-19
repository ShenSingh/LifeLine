import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../uiComponent/table";

import Badge from "../../uiComponent/badge/Badge";

export interface AdminDonors {
  donorId: string;
  name: string;
  bloodGroup: string;
  hospital: string;
  status: string;
}



// request rejected method

const handleBlockDonor = (donorId: string) => {
  // Logic to reject the request
  console.log(`Donor with ID ${donorId} has been Block.`);
};

// Sample table data
const tableData: AdminDonors[] = [
  {
    donorId: "D001",
    name: "John Doe",
    bloodGroup: "A+",
    hospital: "City Hospital",
    status: "Active",
  },
  {
    donorId: "D001",
    name: "John Doe",
    bloodGroup: "A+",
    hospital: "City Hospital",
    status: "Active",
  },
  {
    donorId: "D001",
    name: "John Doe",
    bloodGroup: "A+",
    hospital: "City Hospital",
    status: "Active",
  },
];

export default function AdminUserDonorsTable() {

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
                    Donor ID
                  </TableCell>
                  <TableCell
                      isHeader
                      className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                  >
                    Name
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
                    Action
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((request) => (
                    <TableRow key={request.donorId}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {request.donorId}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.name}
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
                              request.status === "Active"
                                  ? "success"
                                  : request.status === "closed"
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

                              handleBlockDonor(request.donorId);
                            }}
                            className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          Block
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
