
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

interface Request {
  id: number;
  foodName: string;
  receiverName: string;
  timestamp: string;
  status: "pending" | "approved" | "rejected";
}

const RequestsList = () => {
  const { toast } = useToast();
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      foodName: "Fresh Vegetables",
      receiverName: "Hope Shelter",
      timestamp: new Date().toISOString(),
      status: "pending"
    }
  ]);

  const handleRequestAction = (requestId: number, action: "approve" | "reject") => {
    setRequests(requests.map(request => 
      request.id === requestId 
        ? { ...request, status: action === "approve" ? "approved" : "rejected" }
        : request
    ));

    toast({
      title: `Request ${action === "approve" ? "Approved" : "Rejected"}`,
      description: `You have ${action === "approve" ? "approved" : "rejected"} the donation request.`,
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Donation Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {requests.length > 0 ? (
            requests.map((request) => (
              <div 
                key={request.id}
                className="border rounded-lg p-4 space-y-3"
              >
                <div>
                  <h4 className="font-semibold">{request.foodName}</h4>
                  <p className="text-sm text-gray-500">
                    Requested by: {request.receiverName}
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(request.timestamp).toLocaleString()}
                  </p>
                </div>
                
                {request.status === "pending" ? (
                  <div className="flex gap-2">
                    <Button 
                      onClick={() => handleRequestAction(request.id, "approve")}
                      className="bg-brand-green hover:bg-brand-green-dark"
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="outline"
                      onClick={() => handleRequestAction(request.id, "reject")}
                    >
                      Reject
                    </Button>
                  </div>
                ) : (
                  <p className={`text-sm font-medium ${
                    request.status === "approved" 
                      ? "text-green-600" 
                      : "text-red-600"
                  }`}>
                    {request.status === "approved" ? "Approved" : "Rejected"}
                  </p>
                )}
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">No pending requests</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestsList;

