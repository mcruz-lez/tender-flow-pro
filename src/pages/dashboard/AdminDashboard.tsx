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
  { label: "User Management", href: "/admin/user-management", icon: Users },
  {
    label: "System Config",
    href: "/admin/system-configuration",
    icon: BarChart3,
  },
  { label: "Audit Logs", href: "/admin/audit-logs", icon: FileText },
];

const AdminDashboard = () => {
  return (
    <PageTemplate
      title="Admin Dashboard"
      description="System administration and user management overview"
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">42</div>
            <p className="text-xs text-muted-foreground">+3 this week</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Alerts</CardTitle>
            <TrendingUp className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Critical: 1</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Audit Logs</CardTitle>
            <FileText className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1,234</div>
            <p className="text-xs text-muted-foreground">Last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <DollarSign className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Good</div>
            <p className="text-xs text-muted-foreground">
              All systems operational
            </p>
          </CardContent>
        </Card>
      </div>
      <div className="flex flex-col md:flex-row gap-6">
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2">
              <li className="flex justify-between items-center">
                <span>User JohnDoe created</span>
                <Badge variant="secondary">User</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>System config updated</span>
                <Badge variant="secondary">Config</Badge>
              </li>
              <li className="flex justify-between items-center">
                <span>Critical alert resolved</span>
                <Badge variant="secondary">Alert</Badge>
              </li>
            </ul>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/admin/audit-logs">View Audit Logs</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="flex-1">
          <CardHeader>
            <CardTitle>System Configuration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-sm text-muted-foreground mb-2">
              Last updated
            </div>
            <div className="text-3xl font-bold mb-2">2 days ago</div>
            <div className="text-xs text-muted-foreground">By admin</div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/admin/system-configuration">Go to Config</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default AdminDashboard;
