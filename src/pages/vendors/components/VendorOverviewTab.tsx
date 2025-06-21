import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";

interface VendorData {
  category: string;
  specialties: string[];
  serviceAreas: string[];
  onTimeDelivery: number;
  clientSatisfaction: number;
}

interface VendorOverviewTabProps {
  vendor: VendorData;
}

const VendorOverviewTab = ({ vendor }: VendorOverviewTabProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Services & Specialties</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h4 className="font-medium mb-2">Primary Category</h4>
              <Badge variant="outline">{vendor.category}</Badge>
            </div>
            <div>
              <h4 className="font-medium mb-2">Specialties</h4>
              <div className="flex flex-wrap gap-2">
                {vendor.specialties.map((specialty, index) => (
                  <Badge key={index} variant="secondary">
                    {specialty}
                  </Badge>
                ))}
              </div>
            </div>
            <div>
              <h4 className="font-medium mb-2">Service Areas</h4>
              <div className="flex flex-wrap gap-2">
                {vendor.serviceAreas.map((area, index) => (
                  <Badge key={index} variant="outline">
                    {area}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>On-Time Delivery</span>
                <span>{vendor.onTimeDelivery}%</span>
              </div>
              <Progress value={vendor.onTimeDelivery} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Client Satisfaction</span>
                <span>{vendor.clientSatisfaction}/5.0</span>
              </div>
              <Progress
                value={(vendor.clientSatisfaction / 5) * 100}
                className="h-2"
              />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Quality Score</span>
                <span>92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            <div>
              <div className="flex justify-between text-sm mb-1">
                <span>Communication</span>
                <span>96%</span>
              </div>
              <Progress value={96} className="h-2" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorOverviewTab;
