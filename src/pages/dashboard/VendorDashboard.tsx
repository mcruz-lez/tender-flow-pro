import PageTemplate from "@/components/PageTemplate";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  TrendingUp,
  DollarSign,
  Plus,
  BarChart3,
} from "lucide-react";
import { Link } from "react-router-dom";

const quickActions = [
  { label: "Register Vendor", href: "/vendors/register", icon: Plus },
  { label: "View Opportunities", href: "/opportunities", icon: BarChart3 },
  { label: "Analytics", href: "/vendors/analytics", icon: TrendingUp },
];

const VendorDashboard = () => {
  return (
    <PageTemplate
      title="Vendor Dashboard"
      description="Manage your vendor profile, track opportunities, and view analytics"
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Bids</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">+1 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Open for bidding</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Contracts Awarded
            </CardTitle>
            <DollarSign className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">€1.2M total value</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Team Members</CardTitle>
            <Users className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">Collaborators</p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Opportunities</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>Office Renovation</span>
                <Badge variant="secondary">Open</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>IT Infrastructure Upgrade</span>
                <Badge variant="secondary">Open</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Security Services</span>
                <Badge variant="secondary">Closed</Badge>
              </li>
            </ul>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/opportunities">View All Opportunities</Link>
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
            <div className="text-3xl font-bold mb-2">62%</div>
            <div className="text-xs text-muted-foreground">
              Based on last 12 months
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/vendors/analytics">View Analytics</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default VendorDashboard;
