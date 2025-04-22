import { useState, useEffect } from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../uiComponent/table";
import Badge from "../../uiComponent/badge/Badge";
import { Modal } from "../../uiComponent/modal";
import ChatUi from "../../chat/chatUi";

export interface DonationAppointment {
  id: string;
  donorId: string;
  requesterId: string;
  requesterName: string;
  hospitalId: string;
  hospitalName: string;
  appointmentDate: string;
  status: string;
  bloodType: string;
  createdAt: string;
}

const getBloodDonationsOfUser = async () => {
  const token = localStorage.getItem('token');
  const response = await fetch('http://localhost:8181/api/v1/donationAppointments/user', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) {
    throw new Error('Failed to fetch blood donations');
  }
  return response.json();
};

export default function DonorBloodReqTable() {
  const [tableData, setTableData] = useState<DonationAppointment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<DonationAppointment | null>(null);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeRequester, setActiveRequester] = useState<DonationAppointment | null>(null);

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const donations = await getBloodDonationsOfUser();
        console.log("API Response:", donations);
        setTableData(donations);
      } catch (err) {
        setError("Failed to load donation appointments. Please try again later.");
        console.error("API Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const handleViewDetails = (request: DonationAppointment) => {
    setSelectedRequest(request);
    setIsModalOpen(true);
  };

  const handleChatOpen = (request: DonationAppointment) => {
    setActiveRequester(request);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setActiveRequester(null);
  };

  const confirmRequestDonor = (request: DonationAppointment) => {
    // Logic to confirm the request
    console.log("Request confirmed:", request);
    setIsModalOpen(false);
  };

  if (loading) {
    return (
      <div className="p-4 text-center text-gray-500">
        Loading donation appointments...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[900px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Requester Name
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Hospital
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Blood Type
                </TableCell>
                <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400">
                  Appointment Date
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
              {tableData.length > 0 ? (
                tableData.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="px-5 py-4 sm:px-6 text-start">
                      {request.requesterName || "Unknown"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {request.hospitalName || "Unknown"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {request.bloodType || "Unknown"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      {new Date(request.appointmentDate).toLocaleDateString() || "Unknown"}
                    </TableCell>
                    <TableCell className="px-4 py-3 text-start">
                      <Badge
                        size="sm"
                        color={
                          request.status?.toLowerCase() === "approved" ? "success" :
                          request.status?.toLowerCase() === "pending" ? "warning" : "error"
                        }
                      >
                        {request.status || "Unknown"}
                      </Badge>
                    </TableCell>
                    <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                      <button
                        onClick={() => handleViewDetails(request)}
                        className="px-3 py-1 mr-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-blue-600"
                      >
                        Details
                      </button>
                      <button
                        onClick={() => handleChatOpen(request)}
                        className="px-3 py-1 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                      >
                        Chat
                      </button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell className="text-center py-6 text-gray-500" colSpan={6}>
                    No donation appointments found
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Modal for Requester Details */}
      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="p-4">
          <h2 className="text-lg font-semibold mb-4">Donation Appointment Details</h2>
          {selectedRequest && (
            <div className="space-y-2">
              <p><strong>ID:</strong> {selectedRequest.id}</p>
              <p><strong>Requester:</strong> {selectedRequest.requesterName}</p>
              <p><strong>Hospital:</strong> {selectedRequest.hospitalName}</p>
              <p><strong>Blood Type:</strong> {selectedRequest.bloodType}</p>
              <p><strong>Appointment Date:</strong> {new Date(selectedRequest.appointmentDate).toLocaleString()}</p>
              <p><strong>Status:</strong> {selectedRequest.status}</p>

              {selectedRequest.status?.toLowerCase() === "pending" && (
                <button
                  onClick={() => confirmRequestDonor(selectedRequest)}
                  className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                >
                  Confirm Appointment
                </button>
              )}
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
