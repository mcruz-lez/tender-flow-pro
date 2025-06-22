import PageTemplate from "@/components/PageTemplate";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FileText, TrendingUp, Users, Plus, BarChart3 } from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { label: "View Tenders", href: "/tenders", icon: FileText },
  { label: "Submit Bid", href: "/bids/submit", icon: Plus },
  { label: "Performance", href: "/contracts/performance", icon: TrendingUp },
];

const ContractorDashboard = () => {
  return (
    <PageTemplate
      title="Contractor Dashboard"
      description="Overview of available opportunities, active projects, and performance"
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Open Tenders</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">10</div>
            <p className="text-xs text-muted-foreground">+2 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Active Projects
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">4</div>
            <p className="text-xs text-muted-foreground">Ongoing</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Bids Submitted
            </CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Across 3 tenders</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Performance</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">88%</div>
            <p className="text-xs text-muted-foreground">On-time delivery</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Tenders</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Office Renovation</span>
                <Badge variant="secondary">Open</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>HVAC Upgrade</span>
                <Badge variant="secondary">Open</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Security Services</span>
                <Badge variant="secondary">Closed</Badge>
              </li>
            </ul>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/tenders">View All Tenders</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Performance Analytics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">
              Bid Success Rate
            </div>
            <div className="text-3xl font-bold mb-2">74%</div>
            <div className="text-xs text-muted-foreground">
              Based on last 12 months
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/contracts/performance">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default ContractorDashboard;
