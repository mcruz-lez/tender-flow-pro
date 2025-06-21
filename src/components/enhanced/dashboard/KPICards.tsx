import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  Building,
  Users,
  FileText,
} from "lucide-react";

interface KPICardData {
  title: string;
  value: string | number;
  total: number | null;
  icon: React.ComponentType<{ className?: string }>;
  color: string;
  bgColor: string;
  trend: string;
  trendUp: boolean;
}

interface KPICardsProps {
  activeTenders: number;
  totalTenders: number;
  approvedVendors: number;
  totalVendors: number;
  activeContracts: number;
  totalContracts: number;
  totalContractValue: number;
}

export const KPICards = ({
  activeTenders,
  totalTenders,
  approvedVendors,
  totalVendors,
  activeContracts,
  totalContracts,
  totalContractValue,
}: KPICardsProps) => {
  const kpiCards: KPICardData[] = [
    {
      title: "Active Tenders",
      value: activeTenders,
      total: totalTenders,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Approved Vendors",
      value: approvedVendors,
      total: totalVendors,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Active Contracts",
      value: activeContracts,
      total: totalContracts,
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Contract Value",
      value: `$${(totalContractValue / 1000000).toFixed(1)}M`,
      total: null,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "+15%",
      trendUp: true,
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {kpiCards.map((kpi, index) => (
        <Card key={index}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                <div className="flex items-center space-x-2">
                  <p className="text-2xl font-bold">{kpi.value}</p>
                  <Badge
                    variant="outline"
                    className={`${kpi.trendUp ? "text-green-600" : "text-red-600"}`}
                  >
                    {kpi.trendUp ? (
                      <TrendingUp className="w-3 h-3 mr-1" />
                    ) : (
                      <TrendingDown className="w-3 h-3 mr-1" />
                    )}
                    {kpi.trend}
                  </Badge>
                </div>
                {kpi.total && (
                  <div className="space-y-1">
                    <div className="flex justify-between text-xs text-gray-500">
                      <span>Progress</span>
                      <span>
                        {Math.round((Number(kpi.value) / kpi.total) * 100)}%
                      </span>
                    </div>
                    <Progress
                      value={(Number(kpi.value) / kpi.total) * 100}
                      className="h-2"
                    />
                  </div>
                )}
              </div>
              <div className={`p-3 rounded-full ${kpi.bgColor}`}>
                <kpi.icon className={`w-6 h-6 ${kpi.color}`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
