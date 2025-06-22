import PageTemplate from "@/components/PageTemplate";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DollarSign,
  TrendingUp,
  FileText,
  Users,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { label: "View Reports", href: "/analytics/financial", icon: BarChart3 },
  { label: "Manage Budgets", href: "/finance/budgets", icon: DollarSign },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
];

const FinanceDashboard = () => {
  return (
    <PageTemplate
      title="Finance Dashboard"
      description="Financial overview, budget tracking, and analytics"
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Spend</CardTitle>
            <DollarSign className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€2.4M</div>
            <p className="text-xs text-muted-foreground">+15% YoY</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">€340K</div>
            <p className="text-xs text-muted-foreground">+22% this year</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Contracts
            </CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">
              Across 12 properties
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Vendors</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">Registered</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Transactions</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Contract Payment</span>
                <Badge variant="secondary">€120K</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Vendor Invoice</span>
                <Badge variant="secondary">€45K</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Maintenance Expense</span>
                <Badge variant="secondary">€8K</Badge>
              </li>
            </ul>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/analytics/financial">View All Reports</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Budget Overview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">
              Current Budget
            </div>
            <div className="text-3xl font-bold mb-2">€1.8M</div>
            <div className="text-xs text-muted-foreground">
              Remaining for FY25
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/finance/budgets">Manage Budgets</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default FinanceDashboard;
