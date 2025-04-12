import ComponentCard from "../../common/ComponentCard";
import Label from "../../../components/form/Label";

export default function ReqDetailsHeader() {

  // Retrieve the request object from localStorage
  const request = JSON.parse(localStorage.getItem("request") || "null");

  if (!request) {
    return <div>No request details available.</div>;
  }

  return (
      <ComponentCard title="Request Details">
        <div className="space-y-4">
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="requestId">Request ID</Label>
              <p className="text-lg font-semibold">{request.id}</p>
            </div>
            <div className="flex-1">
              <Label htmlFor="requestDate">Request Date</Label>
                <p className="text-lg font-semibold">{request.requestDate}</p>
            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="bloodGroup">Blood Group</Label>
              <p className="text-lg font-semibold">{request.bloodGroup}</p>
            </div>
            <div className="flex-1">
            <Label htmlFor="hospital">Hospital</Label>
              <p className="text-lg font-semibold">{request.hospital}</p>

            </div>
          </div>
          <div className="flex space-x-4">
            <div className="flex-1">
              <Label htmlFor="status">Status</Label>
              <p className="text-lg font-semibold">{request.status}</p>

            </div>
          </div>
        </div>
      </ComponentCard>
  );
}
