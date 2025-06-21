import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Building2, MapPin, Calendar, Users, Clock, Star } from "lucide-react";

interface VendorData {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  avatar: string;
  status: "Active" | "Inactive" | "Pending";
  description: string;
  yearEstablished: number;
  employeeCount: string;
  responseTime: string;
}

interface VendorProfileHeaderProps {
  vendor: VendorData;
}

const VendorProfileHeader = ({ vendor }: VendorProfileHeaderProps) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
          <Avatar className="w-20 h-20">
            <AvatarImage src={vendor.avatar} alt={vendor.name} />
            <AvatarFallback>
              <Building2 className="w-10 h-10" />
            </AvatarFallback>
          </Avatar>

          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-2">
              <h1 className="text-2xl font-bold">{vendor.name}</h1>
              <Badge
                variant={vendor.status === "Active" ? "default" : "secondary"}
              >
                {vendor.status}
              </Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span>{vendor.location}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-gray-500" />
                <span>Since {vendor.yearEstablished}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-gray-500" />
                <span>{vendor.employeeCount} employees</span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span>Response: {vendor.responseTime}</span>
              </div>
            </div>

            <p className="text-gray-600 mt-3">{vendor.description}</p>
          </div>

          <div className="text-center">
            <div className="flex items-center space-x-1 mb-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(vendor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                />
              ))}
            </div>
            <div className="text-lg font-bold">{vendor.rating}</div>
            <div className="text-sm text-gray-600">
              {vendor.reviews} reviews
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorProfileHeader;
