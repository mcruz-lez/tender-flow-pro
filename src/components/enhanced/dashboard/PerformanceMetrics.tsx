import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Target, Users } from "lucide-react";

interface PerformanceMetricsProps {
  bidsPerTender: string;
  avgTenderBudget: number;
  vendorPrequalificationRate: number;
  totalVendors: number;
}

export const PerformanceMetrics = ({
  bidsPerTender,
  avgTenderBudget,
  vendorPrequalificationRate,
  totalVendors,
}: PerformanceMetricsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Target className="w-5 h-5 mr-2" />
            Tender Performance
          </CardTitle>
          <CardDescription>Average metrics across all tenders</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Bids per Tender</span>
              <span className="text-lg font-bold">{bidsPerTender}</span>
            </div>
            <Progress value={parseFloat(bidsPerTender) * 10} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Avg. Budget</span>
              <span className="text-lg font-bold">
                ${(avgTenderBudget / 1000).toFixed(0)}K
              </span>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="w-5 h-5 mr-2" />
            Vendor Metrics
          </CardTitle>
          <CardDescription>
            Vendor prequalification and performance
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Prequalification Rate</span>
              <span className="text-lg font-bold">
                {vendorPrequalificationRate}%
              </span>
            </div>
            <Progress value={vendorPrequalificationRate} className="h-2" />
          </div>
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Total Registered</span>
              <span className="text-lg font-bold">{totalVendors}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
