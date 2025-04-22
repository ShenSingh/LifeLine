import { useState, useEffect } from "react";
          import {
            Table,
            TableBody,
            TableCell,
            TableHeader,
            TableRow,
          } from "../../uiComponent/table";
          import Badge from "../../uiComponent/badge/Badge";

          export interface UserBloodRequest {
            id: string;
            bloodType: string;
            status: string;
            createdAt: string | null;
            hospital?: {
              id: string;
              name: string;
              latitude: string;
              longitude: string;
              district: string;
            };
          }

          interface BloodRequest extends UserBloodRequest {
            formattedDate: string;
            hospitalName: string;
          }

          const getBloodRequestsOfUser = async () => {
            const token = localStorage.getItem('token');
            const response = await fetch('http://localhost:8181/api/v1/bloodRequest/user', {
              headers: {
                'Authorization': `Bearer ${token}`
              }
            });
            if (!response.ok) {
              throw new Error('Failed to fetch blood requests');
            }
            return response.json();
          };

          export default function BloodRequestTable() {
            const [tableData, setTableData] = useState<BloodRequest[]>([]);
            const [loading, setLoading] = useState(true);
            const [error, setError] = useState<string | null>(null);

            useEffect(() => {
              const fetchBloodRequests = async () => {
                try {
                  const requests = await getBloodRequestsOfUser();
                  console.log("API Response:", requests);

                  // Transform API data
                  const formattedData = requests.map((request: UserBloodRequest) => ({
                    ...request,
                    formattedDate: request.createdAt
                      ? new Date(parseInt(request.createdAt)).toLocaleDateString()
                      : 'Unknown Date',
                    hospitalName: request.hospital?.name || 'Unknown Hospital',
                    status: request.status || 'Unknown'
                  }));

                  setTableData(formattedData);
                } catch (err) {
                  setError("Failed to load blood requests. Please try again later.");
                  console.error("API Error:", err);
                } finally {
                  setLoading(false);
                }
              };

              fetchBloodRequests();
            }, []);

            if (loading) {
              return (
                <div className="p-4 text-center text-gray-500">
                  Loading blood requests...
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
                          <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                            Request ID
                          </TableCell>
                          <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                            Request Date
                          </TableCell>
                          <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                            Blood Type
                          </TableCell>
                          <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                            Hospital
                          </TableCell>
                          <TableCell isHeader className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs">
                            Status
                          </TableCell>
                        </TableRow>
                      </TableHeader>

                      <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
                        {tableData.length > 0 ? (
                          tableData.map((request) => (
                            <TableRow key={request.id}>
                              <TableCell className="px-5 py-4 sm:px-6 text-start">
                                #{request.id}
                              </TableCell>
                              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                                {request.formattedDate}
                              </TableCell>
                              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                                {request.bloodType.replace('_', '-')}
                              </TableCell>
                              <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm">
                                {request.hospitalName}
                              </TableCell>
                              <TableCell className="px-4 py-3 text-start">
                                <Badge
                                  size="sm"
                                  color={
                                    request.status.toLowerCase() === "approved" ? "success" :
                                    request.status.toLowerCase() === "pending" ? "warning" : "error"
                                  }
                                >
                                  {request.status}
                                </Badge>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell className="text-center py-6 text-gray-500" colSpan={5}>
                              No blood requests found
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </div>
              </div>
            );
          }
