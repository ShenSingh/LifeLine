import { useState } from "react";
import ChatUi from "../../chat/chatUi";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "../../uiComponent/table";
import Badge from "../../uiComponent/badge/Badge.tsx";
import { Modal } from "../../uiComponent/modal";

export default function ConformDonorTable() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [activeDonorId, setActiveDonorId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDonor, setSelectedDonor] = useState<Donor>();


  interface Donor {
    donorId: number;
    name: string;
    confirmDate: string;
    status: string;
  }

  const handleChatOpen = (donorId: number) => {
    setActiveDonorId(donorId);
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
    setActiveDonorId(null);
  };

  const donorDetails = (donor: Donor ) => {
    setSelectedDonor(donor);
    setIsModalOpen(true);
  };

  const confirmDonor = (donor: Donor) => {
    // Logic to confirm the donor
    console.log("Confirming donor:", donor);
    setIsModalOpen(false);
  }



  const donorData = [
    { donorId: 1, name: "John Doe", confirmDate: "2023-10-01", status: "Available" },
    { donorId: 2, name: "Jane Smith", confirmDate: "2023-10-02", status: "Unavailable" },
    { donorId: 3, name: "Alice Johnson", confirmDate: "2023-10-03", status: "Available" },
    { donorId: 4, name: "Bob Brown", confirmDate: "2023-10-04", status: "Unavailable" },
  ];

  return (
      <div>
        {/* Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
          <div className="max-w-full overflow-x-auto">
            <div className="min-w-[900px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableCell>Donor ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>Confirm Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Actions</TableCell>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {donorData.map((donor) => (
                      <TableRow key={donor.donorId}>
                        <TableCell>{donor.donorId}</TableCell>
                        <TableCell>{donor.name}</TableCell>
                        <TableCell>{donor.confirmDate}</TableCell>
                        <TableCell>
                          <Badge
                              size="sm"
                              color={donor.status === "Available" ? "success" : "error"}
                          >
                            {donor.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <button
                              onClick={() => handleChatOpen(donor.donorId)}
                              className="px-3 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600"
                          >
                            Chat
                          </button>
                        </TableCell>
                        <TableCell>
                          <button
                              onClick={() => donorDetails(donor)}
                              className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-green-600"
                          >
                            Details
                          </button>
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </div>

        {/* Chat UI */}
        {isChatOpen && (
            <ChatUi
                donorId={activeDonorId}
                onClose={handleChatClose}
            />
        )}

        {/* Modal for Donor Details */}
        <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
          <div className="p-4">
            <h2 className="text-lg font-semibold mb-4">Donor Details</h2>
            {selectedDonor && (
                <div className="space-y-2">
                  <p><strong>Donor ID:</strong> {selectedDonor.donorId}</p>
                  <p><strong>Name:</strong> {selectedDonor.name}</p>
                  <p><strong>Confirm Date:</strong> {selectedDonor.confirmDate}</p>
                  <p><strong>Status:</strong> {selectedDonor.status}</p>

                  <button
                      onClick={() => confirmDonor(selectedDonor)}
                      className="px-3 py-2 text-sm font-medium text-white bg-blue-500 rounded hover:bg-green-600"
                  >
                    Confirm
                  </button>
                </div>
            )}
          </div>
        </Modal>
      </div>
  );
}
