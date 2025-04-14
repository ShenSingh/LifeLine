import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../../uiComponent/table";

import Badge from "../../uiComponent/badge/Badge";

export interface AdminRequester {
  requesterId: string;
  name: string;
  email: string;
  requestCount: number;
  status: string;
}



// request rejected method

const handleBlockRequester = (requesterId: string) => {
  // Logic to reject the request
  console.log(`Requester with ID ${requesterId} has been Block.`);
};

// Sample table data
const tableData: AdminRequester[] = [
  {
    requesterId: "R001",
    name: "John Doe",
    email: "g@gmail.com",
    requestCount: 5,
    status: "Active",
  },
  {
    requesterId: "R001",
    name: "John Doe",
    email: "g@gmail.com",
    requestCount: 5,
    status: "Active",
  },
  {
    requesterId: "R001",
    name: "John Doe",
    email: "g@gmail.com",
    requestCount: 5,
    status: "Active",
  },
];

export default function AdminUserRequestersTable() {

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
                    Requester ID
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
                    Email
                    </TableCell>
                    <TableCell
                        isHeader
                        className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                    >
                    Request Count
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
                    <TableRow key={request.requesterId}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">
                        {request.requesterId}
                      </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.name}
                      </TableCell>
                        <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                            {request.email}
                        </TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.requestCount}
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

                              handleBlockRequester(request.requesterId);
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
