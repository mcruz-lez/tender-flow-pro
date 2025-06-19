
import { Card, CardContent } from "@/components/ui/card";

interface VendorData {
  completedProjects: number;
  activeProjects: number;
  totalValue: number;
  averageValue: number;
  onTimeDelivery: number;
  clientSatisfaction: number;
}

interface VendorMetricsCardsProps {
  vendor: VendorData;
}

const VendorMetricsCards = ({ vendor }: VendorMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-blue-600">{vendor.completedProjects}</div>
          <div className="text-sm text-gray-600">Completed Projects</div>
          <div className="text-xs text-green-600 mt-1">+{vendor.activeProjects} active</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-green-600">${(vendor.totalValue / 1000000).toFixed(1)}M</div>
          <div className="text-sm text-gray-600">Total Contract Value</div>
          <div className="text-xs text-gray-500 mt-1">Avg: ${vendor.averageValue.toLocaleString()}</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-orange-600">{vendor.onTimeDelivery}%</div>
          <div className="text-sm text-gray-600">On-Time Delivery</div>
          <div className="text-xs text-green-600 mt-1">Above average</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <div className="text-2xl font-bold text-purple-600">{vendor.clientSatisfaction}</div>
          <div className="text-sm text-gray-600">Client Satisfaction</div>
          <div className="text-xs text-green-600 mt-1">Excellent rating</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorMetricsCards;
