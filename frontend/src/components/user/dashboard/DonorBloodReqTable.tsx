import { useState } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../uiComponent/table";
import Badge from "../../uiComponent/badge/Badge";
import { Modal } from "../../uiComponent/modal";
import ChatUi from "../../chat/chatUi";

export interface DonorBloodRequest {
  id: number;
  requesterName: string;
  requestDate: string;
  status: string;
}

// Sample table data
const tableData: DonorBloodRequest[] = [
  {
    id: 1,
    requesterName: "John Doe",
    requestDate: "2023-10-01",
    status: "Approved",
  },
  {
    id: 2,
    requesterName: "Jane Smith",
    requestDate: "2023-10-02",
    status: "Pending",
  },
  {
    id: 3,
    requesterName: "Alice Johnson",
    requestDate: "2023-10-03",
    status: "Rejected",
  },
];

export default function DonorBloodReqTable() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DonorBloodRequest | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeRequester, setActiveRequester] = useState<DonorBloodRequest | null>(null);

  const handleViewDetails = (request: DonorBloodRequest) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleChatOpen = (request: DonorBloodRequest) => {
    setActiveRequester(request);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setActiveRequester(null);
  };

  const confirmRequestDonor = ( request : DonorBloodRequest) => {
    // Logic to confirm the request
    console.log("Request confirmed:", request);
    setIsModalOpen(false);
  }

  return (
      <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-[900px]">
            <Table>
              {/* Table Header */}
              <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Requester Name
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Request Date
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Status
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHeader>

              {/* Table Body */}
              <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                {tableData.map((request) => (
                    <TableRow key={request.id}>
                      <TableCell className="px-5 py-4 sm:px-6 text-start">{request.requesterName}</TableCell>
                      <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                        {request.requestDate}
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
                      <TableCell className="px-4 py-3 text-start space-x-2">
                        <button
                            onClick={() => handleViewDetails(request)}
                            className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                        >
                          View Details
                        </button>
                        <button
                            onClick={() => handleChatOpen(request)}
                            className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                        >
                          Chat
                        </button>
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Modal for Requester Details */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Requester Details</h2>
            {selectedRequest && (
                <div className="space-y-2">
                  <p>
                    <strong>ID:</strong> {selectedRequest.id}
                  </p>
                  <p>
                    <strong>Name:</strong> {selectedRequest.requesterName}
                  </p>
                  <p>
                    <strong>Request Date:</strong> {selectedRequest.requestDate}
                  </p>
                  <p>
                    <strong>Status:</strong> {selectedRequest.status}
                  </p>

                  <button
                      onClick={() => confirmRequestDonor(selectedRequest)}
                      className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                </div>
            )}
          </div>
        </Modal>

        {/* Chat UI */}
        {isChatOpen && activeRequester && (
            <ChatUi
                donorId={activeRequester.id}
                onClose={handleChatClose}
            />
        )}
      </div>
  );
}


// if (admin){
//  href="/localhost/8087/adminpage"
// }
