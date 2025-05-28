import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Clock, Phone } from "lucide-react";
import { useState } from "react";
import VideoCallModal from './video/VideoCallModal';

interface FoodCardProps {
  id: number;
  name: string;
  description: string;
  quantity: string;
  expiry: string;
  location: string;
  donorName: string;
  status: string;
  image: string;
  createdAt: string;
  onReserve?: (id: number) => void;
  onCancel?: (id: number) => void;
  userRole?: string;
}

const FoodCard = ({
  id,
  name,
  description,
  quantity,
  expiry,
  location,
  donorName,
  status,
  image,
  createdAt,
  onReserve,
  onCancel,
  userRole = "receiver",
}: FoodCardProps) => {
  const [isVideoCallModalOpen, setIsVideoCallModalOpen] = useState(false);
  const [isIncomingCall, setIsIncomingCall] = useState(false);

  const formattedDate = new Date(expiry).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  
  const postedDate = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const isNew = () => {
    const postDate = new Date(createdAt);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - postDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays <= 1; // Consider new if posted within last 24 hours
  };

  return (
    <Card className="overflow-hidden h-full flex flex-col">
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
        />
        <div className="absolute top-2 right-2 flex flex-col gap-2">
          <Badge 
            className={`${
              status === "available" ? "bg-brand-green" : 
              status === "reserved" ? "bg-brand-orange" : 
              "bg-gray-500"
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
          </Badge>
          
          {isNew() && (
            <Badge className="bg-blue-500">New</Badge>
          )}
        </div>
      </div>
      
      <CardHeader className="p-4 pb-0">
        <CardTitle className="text-xl">{name}</CardTitle>
        <CardDescription className="flex items-center text-sm mt-1">
          <span className="text-brand-green font-medium">By {donorName}</span>
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-4 pt-2 flex-grow">
        <p className="text-gray-600 mb-4 line-clamp-2">{description}</p>
        <div className="flex flex-col space-y-2 text-sm">
          <div className="flex items-center text-gray-600">
            <div className="w-5 h-5 mr-2 flex items-center justify-center">
              <span className="font-medium">Qty:</span>
            </div>
            {quantity}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Expires: {formattedDate}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {location}
          </div>
          <div className="flex items-center text-gray-600">
            <Clock className="w-4 h-4 mr-2" />
            Posted: {postedDate}
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="p-4 pt-2 border-t">
        {userRole === "receiver" ? (
          status === "available" ? (
            <div className="flex gap-2">
              <Button
                onClick={() => onReserve && onReserve(id)}
                className="flex-1 bg-brand-green hover:bg-brand-green-dark"
              >
                Claim
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsVideoCallModalOpen(true)}
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          ) : status === "claimed" ? (
            <div className="flex gap-2">
              <Button
                onClick={() => onCancel && onCancel(id)}
                variant="outline"
                className="flex-1 border-brand-orange text-brand-orange hover:bg-brand-orange hover:text-white"
              >
                Cancel Claim
              </Button>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setIsVideoCallModalOpen(true)}
                className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
              >
                <Phone className="h-4 w-4" />
              </Button>
            </div>
          ) : (
            <Button disabled className="w-full">
              Not Available
            </Button>
          )
        ) : (
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex-1 border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
            >
              View Details
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={() => setIsVideoCallModalOpen(true)}
              className="border-brand-green text-brand-green hover:bg-brand-green hover:text-white"
            >
              <Phone className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardFooter>

      <VideoCallModal
        isOpen={isVideoCallModalOpen}
        onClose={() => setIsVideoCallModalOpen(false)}
        otherPartyName={userRole === "receiver" ? donorName : "Receiver"}
        isIncomingCall={isIncomingCall}
        onAcceptCall={() => {
          setIsIncomingCall(false);
          // Handle call acceptance
        }}
        onRejectCall={() => {
          setIsIncomingCall(false);
          // Handle call rejection
        }}
      />
    </Card>
  );
};

export default FoodCard;
