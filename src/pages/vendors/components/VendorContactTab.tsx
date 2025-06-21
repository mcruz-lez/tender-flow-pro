import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  Phone,
  Mail,
  Globe,
  MessageSquare,
  FileText,
  Calendar,
  DollarSign,
} from "lucide-react";

interface VendorData {
  contactPerson: string;
  phone: string;
  email: string;
  website: string;
}

interface VendorContactTabProps {
  vendor: VendorData;
}

const VendorContactTab = ({ vendor }: VendorContactTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Contact Information</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center space-x-3">
            <Users className="w-5 h-5 text-gray-500" />
            <div>
              <div className="font-medium">{vendor.contactPerson}</div>
              <div className="text-sm text-gray-600">Primary Contact</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div>
              <div className="font-medium">{vendor.phone}</div>
              <div className="text-sm text-gray-600">Business Phone</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-500" />
            <div>
              <div className="font-medium">{vendor.email}</div>
              <div className="text-sm text-gray-600">Email Address</div>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-gray-500" />
            <div>
              <div className="font-medium">{vendor.website}</div>
              <div className="text-sm text-gray-600">Website</div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Button className="w-full">
            <MessageSquare className="w-4 h-4 mr-2" />
            Send Message
          </Button>
          <Button variant="outline" className="w-full">
            <FileText className="w-4 h-4 mr-2" />
            Request Quote
          </Button>
          <Button variant="outline" className="w-full">
            <Calendar className="w-4 h-4 mr-2" />
            Schedule Meeting
          </Button>
          <Button variant="outline" className="w-full">
            <DollarSign className="w-4 h-4 mr-2" />
            View Pricing
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorContactTab;
