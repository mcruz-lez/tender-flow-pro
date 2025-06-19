
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, TrendingDown, DollarSign, Building, 
  Users, FileText, Clock, Target, AlertTriangle 
} from "lucide-react";
import { useTenders } from "@/hooks/useTenders";
import { useVendors } from "@/hooks/useVendors";
import { useProperties } from "@/hooks/useProperties";
import { useBids } from "@/hooks/useBids";
import { useContracts } from "@/hooks/useContracts";

export const DashboardAnalytics = () => {
  const { data: tenders } = useTenders();
  const { data: vendors } = useVendors();
  const { data: properties } = useProperties();
  const { data: bids } = useBids();
  const { data: contracts } = useContracts();

  // Calculate KPIs
  const totalTenders = tenders?.length || 0;
  const activeTenders = tenders?.filter(t => t.status === 'active').length || 0;
  const totalVendors = vendors?.length || 0;
  const approvedVendors = vendors?.filter(v => v.prequalification_status === 'approved').length || 0;
  const totalProperties = properties?.length || 0;
  const totalBids = bids?.length || 0;
  const totalContracts = contracts?.length || 0;
  const activeContracts = contracts?.filter(c => c.status === 'active').length || 0;

  // Calculate financial metrics with proper type checking
  const totalContractValue = contracts?.reduce((sum, contract) => {
    const value = typeof contract.contract_value === 'number' ? contract.contract_value : 0;
    return sum + value;
  }, 0) || 0;

  const tendersWithBudgets = tenders?.filter(t => t.budget_max && typeof t.budget_max === 'number') || [];
  const avgTenderBudget = tendersWithBudgets.length > 0 
    ? tendersWithBudgets.reduce((sum, t) => sum + (t.budget_max || 0), 0) / tendersWithBudgets.length 
    : 0;

  // Calculate performance metrics with proper type checking
  const bidsPerTender = totalTenders > 0 ? (totalBids / totalTenders).toFixed(1) : '0';
  const vendorPrequalificationRate = totalVendors > 0 ? Math.round((approvedVendors / totalVendors) * 100) : 0;

  const kpiCards = [
    {
      title: "Active Tenders",
      value: activeTenders,
      total: totalTenders,
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50",
      trend: "+12%",
      trendUp: true
    },
    {
      title: "Approved Vendors",
      value: approvedVendors,
      total: totalVendors,
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50",
      trend: "+8%",
      trendUp: true
    },
    {
      title: "Active Contracts",
      value: activeContracts,
      total: totalContracts,
      icon: Building,
      color: "text-purple-600",
      bgColor: "bg-purple-50",
      trend: "+5%",
      trendUp: true
    },
    {
      title: "Contract Value",
      value: `$${(totalContractValue / 1000000).toFixed(1)}M`,
      total: null,
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50",
      trend: "+15%",
      trendUp: true
    }
  ];

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpiCards.map((kpi, index) => (
          <Card key={index}>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-gray-600">{kpi.title}</p>
                  <div className="flex items-center space-x-2">
                    <p className="text-2xl font-bold">{kpi.value}</p>
                    <Badge variant="outline" className={`${kpi.trendUp ? 'text-green-600' : 'text-red-600'}`}>
                      {kpi.trendUp ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                      {kpi.trend}
                    </Badge>
                  </div>
                  {kpi.total && (
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs text-gray-500">
                        <span>Progress</span>
                        <span>{Math.round((kpi.value / kpi.total) * 100)}%</span>
                      </div>
                      <Progress value={(kpi.value / kpi.total) * 100} className="h-2" />
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

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
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
                <span className="text-lg font-bold">${(avgTenderBudget / 1000).toFixed(0)}K</span>
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
            <CardDescription>Vendor prequalification and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium">Prequalification Rate</span>
                <span className="text-lg font-bold">{vendorPrequalificationRate}%</span>
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

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2" />
              Alerts & Actions
            </CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
              <div className="flex items-center">
                <Clock className="w-4 h-4 text-orange-600 mr-2" />
                <span className="text-sm">Tenders Closing Soon</span>
              </div>
              <Badge variant="outline" className="text-orange-600">
                {tenders?.filter(t => {
                  if (!t.submission_deadline) return false;
                  const deadline = new Date(t.submission_deadline);
                  const now = new Date();
                  const daysLeft = Math.ceil((deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  return daysLeft <= 7 && daysLeft > 0;
                }).length || 0}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
              <div className="flex items-center">
                <FileText className="w-4 h-4 text-blue-600 mr-2" />
                <span className="text-sm">Pending Evaluations</span>
              </div>
              <Badge variant="outline" className="text-blue-600">
                {bids?.filter(b => b.status === 'submitted').length || 0}
              </Badge>
            </div>
            
            <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
              <div className="flex items-center">
                <Building className="w-4 h-4 text-green-600 mr-2" />
                <span className="text-sm">Contract Renewals</span>
              </div>
              <Badge variant="outline" className="text-green-600">
                {contracts?.filter(c => {
                  if (!c.end_date) return false;
                  const endDate = new Date(c.end_date);
                  const now = new Date();
                  const daysLeft = Math.ceil((endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
                  return daysLeft <= 30 && daysLeft > 0;
                }).length || 0}
              </Badge>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
