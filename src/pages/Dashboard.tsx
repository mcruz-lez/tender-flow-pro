
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Building2, 
  FileText, 
  Users, 
  TrendingUp, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  DollarSign,
  Calendar,
  BarChart3,
  Plus,
  Search,
  Filter,
  Bell,
  Settings,
  LogOut,
  User
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      title: "Active Tenders",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      title: "Total Vendors",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      title: "Contracts Value",
      value: "€2.4M",
      change: "+15%",
      icon: DollarSign,
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      title: "Cost Savings",
      value: "€340K",
      change: "+22%",
      icon: TrendingUp,
      color: "text-orange-600",
      bgColor: "bg-orange-50"
    }
  ];

  const recentTenders = [
    {
      id: "TND-2024-001",
      title: "HVAC Maintenance Services - Building Complex A",
      status: "Open",
      dueDate: "2024-01-15",
      bidCount: 8,
      budget: "€45,000"
    },
    {
      id: "TND-2024-002", 
      title: "Security Services - Residential Portfolio",
      status: "Evaluation",
      dueDate: "2024-01-12",
      bidCount: 12,
      budget: "€120,000"
    },
    {
      id: "TND-2024-003",
      title: "Landscaping Services - Commercial Properties",
      status: "Draft",
      dueDate: "2024-01-20",
      bidCount: 0,
      budget: "€28,000"
    },
    {
      id: "TND-2024-004",
      title: "Cleaning Services - Office Buildings",
      status: "Awarded",
      dueDate: "2024-01-08",
      bidCount: 15,
      budget: "€85,000"
    }
  ];

  const upcomingTasks = [
    {
      title: "Review HVAC tender proposals",
      due: "Today",
      priority: "High",
      type: "Evaluation"
    },
    {
      title: "Publish Security Services RFP",
      due: "Tomorrow",
      priority: "Medium",
      type: "Publishing"
    },
    {
      title: "Vendor performance review meeting",
      due: "Jan 15",
      priority: "Low",
      type: "Meeting"
    },
    {
      title: "Contract renewal - Cleaning Services",
      due: "Jan 18",
      priority: "High",
      type: "Contract"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open": return "bg-blue-100 text-blue-700";
      case "Evaluation": return "bg-yellow-100 text-yellow-700";
      case "Draft": return "bg-gray-100 text-gray-700";
      case "Awarded": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-700";
      case "Medium": return "bg-yellow-100 text-yellow-700";
      case "Low": return "bg-green-100 text-green-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        {/* Top Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Welcome back! Here's what's happening with your tenders.</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" size="sm">
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 days
              </Button>
              <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                <Plus className="w-4 h-4 mr-2" />
                Create Tender
              </Button>
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <User className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="p-6">
          {/* Stats Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {stats.map((stat, index) => (
              <Card key={index} className="border-0 shadow-sm">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                      <div className="flex items-center mt-2">
                        <span className="text-2xl font-bold text-gray-900">{stat.value}</span>
                        <span className="text-sm text-green-600 ml-2 font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className={`w-12 h-12 ${stat.bgColor} rounded-lg flex items-center justify-center`}>
                      <stat.icon className={`w-6 h-6 ${stat.color}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4 lg:w-[400px]">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tenders">Tenders</TabsTrigger>
              <TabsTrigger value="vendors">Vendors</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Tenders */}
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle>Recent Tenders</CardTitle>
                      <Link to="/tenders">
                        <Button variant="ghost" size="sm">View All</Button>
                      </Link>
                    </div>
                    <CardDescription>Latest tender activities and status updates</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {recentTenders.map((tender, index) => (
                        <div key={index} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center space-x-3 mb-2">
                              <Badge variant="outline" className="text-xs">{tender.id}</Badge>
                              <Badge className={`text-xs ${getStatusColor(tender.status)}`}>
                                {tender.status}
                              </Badge>
                            </div>
                            <h4 className="font-medium text-gray-900 truncate">{tender.title}</h4>
                            <div className="flex items-center space-x-4 mt-1 text-sm text-gray-500">
                              <span>Due: {tender.dueDate}</span>
                              <span>{tender.bidCount} bids</span>
                              <span className="font-medium text-gray-900">{tender.budget}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                {/* Upcoming Tasks */}
                <Card>
                  <CardHeader>
                    <CardTitle>Upcoming Tasks</CardTitle>
                    <CardDescription>Your pending actions and deadlines</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {upcomingTasks.map((task, index) => (
                        <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                          <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0"></div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center justify-between mb-1">
                              <h4 className="font-medium text-gray-900 truncate">{task.title}</h4>
                              <Badge className={`text-xs ${getPriorityColor(task.priority)}`}>
                                {task.priority}
                              </Badge>
                            </div>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <span>{task.due}</span>
                              <span>{task.type}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Performance Metrics */}
              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                  <CardDescription>Key performance indicators for your procurement process</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Tender Success Rate</span>
                        <span className="text-sm font-bold text-gray-900">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Average Response Time</span>
                        <span className="text-sm font-bold text-gray-900">3.2 days</span>
                      </div>
                      <Progress value={76} className="h-2" />
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-gray-600">Vendor Satisfaction</span>
                        <span className="text-sm font-bold text-gray-900">4.8/5</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="tenders">
              <Card>
                <CardHeader>
                  <CardTitle>Tender Management</CardTitle>
                  <CardDescription>Comprehensive tender overview and management tools</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Tender Management Coming Soon</h3>
                    <p className="text-gray-600 mb-4">Advanced tender creation, management, and tracking tools will be available here.</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create First Tender
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="vendors">
              <Card>
                <CardHeader>
                  <CardTitle>Vendor Management</CardTitle>
                  <CardDescription>Manage your vendor relationships and performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <Users className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Vendor Portal Coming Soon</h3>
                    <p className="text-gray-600 mb-4">Comprehensive vendor management, onboarding, and performance tracking.</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Add Vendor
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <Card>
                <CardHeader>
                  <CardTitle>Analytics & Reporting</CardTitle>
                  <CardDescription>Insights and analytics for data-driven procurement decisions</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-12">
                    <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Advanced Analytics Coming Soon</h3>
                    <p className="text-gray-600 mb-4">Detailed reporting, performance metrics, and predictive analytics.</p>
                    <Button className="bg-blue-600 hover:bg-blue-700">
                      <BarChart3 className="w-4 h-4 mr-2" />
                      View Reports
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
