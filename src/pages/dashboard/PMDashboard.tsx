
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { BarChart3, FileText, Clock, AlertTriangle, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router-dom";

const PMDashboard = () => {
  const quickActions = [
    { label: "Create Tender", href: "/tenders/create", icon: FileText },
    { label: "View Properties", href: "/properties", icon: BarChart3 },
    { label: "Check Bids", href: "/bids", icon: Clock }
  ];

  return (
    <PageTemplate
      title="Property Manager Dashboard"
      description="Comprehensive overview of property management activities and performance metrics"
      quickActions={quickActions}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Tenders</CardTitle>
            <FileText className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8</div>
            <p className="text-xs text-muted-foreground">
              +2 from last month
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Evaluations</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              Requiring attention
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Contracts</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
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
            <CardTitle className="text-sm font-medium">Qualified Vendors</CardTitle>
            <Users className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">156</div>
            <p className="text-xs text-muted-foreground">
              Available for bidding
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Tender Activity</CardTitle>
            <CardDescription>Latest tender submissions and updates</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "HVAC Maintenance Contract", status: "Active", deadline: "2024-01-15", bids: 8 },
                { title: "Security Services RFP", status: "Draft", deadline: "2024-01-20", bids: 0 },
                { title: "Landscaping Services", status: "Evaluation", deadline: "2023-12-30", bids: 12 }
              ].map((tender, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <h4 className="font-medium">{tender.title}</h4>
                    <p className="text-sm text-gray-500">Deadline: {tender.deadline}</p>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={tender.status === 'Active' ? 'default' : 'secondary'}>
                      {tender.status}
                    </Badge>
                    <span className="text-sm text-gray-500">{tender.bids} bids</span>
                  </div>
                </div>
              ))}
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/tenders">View All Tenders</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Urgent Actions Required</CardTitle>
            <CardDescription>Items requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "HVAC Bid Evaluation Due", type: "Evaluation", priority: "High", dueDate: "Today" },
                { title: "Security Contract Renewal", type: "Contract", priority: "Medium", dueDate: "3 days" },
                { title: "Vendor Performance Review", type: "Review", priority: "Low", dueDate: "1 week" }
              ].map((item, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle className={`w-4 h-4 ${
                      item.priority === 'High' ? 'text-red-500' : 
                      item.priority === 'Medium' ? 'text-orange-500' : 'text-yellow-500'
                    }`} />
                    <div>
                      <h4 className="font-medium">{item.title}</h4>
                      <p className="text-sm text-gray-500">{item.type} • Due {item.dueDate}</p>
                    </div>
                  </div>
                  <Badge variant={item.priority === 'High' ? 'destructive' : 'secondary'}>
                    {item.priority}
                  </Badge>
                </div>
              ))}
            </div>
            <Button asChild className="w-full mt-4" variant="outline">
              <Link to="/evaluation">View Evaluation Dashboard</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default PMDashboard;
