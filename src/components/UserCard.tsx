
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Phone, Mail, MapPin } from "lucide-react";

interface UserCardProps {
  id: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  address: string;
  description: string;
  joinDate: string;
}

const UserCard = ({
  name,
  email,
  phone,
  role,
  address,
  description,
  joinDate,
}: UserCardProps) => {
  const formattedDate = new Date(joinDate).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="overflow-hidden h-full">
      <CardHeader className="p-4 pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">{name}</CardTitle>
          <Badge className={role === "donor" ? "bg-brand-green" : "bg-brand-orange"}>
            {role.charAt(0).toUpperCase() + role.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="p-4 pt-2">
        <p className="text-gray-600 mb-4">{description}</p>
        <div className="flex flex-col space-y-3 text-sm">
          <div className="flex items-center text-gray-600">
            <Mail className="w-4 h-4 mr-2" />
            {email}
          </div>
          <div className="flex items-center text-gray-600">
            <Phone className="w-4 h-4 mr-2" />
            {phone}
          </div>
          <div className="flex items-center text-gray-600">
            <MapPin className="w-4 h-4 mr-2" />
            {address}
          </div>
          <div className="flex items-center text-gray-600">
            <Calendar className="w-4 h-4 mr-2" />
            Member since: {formattedDate}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default UserCard;
