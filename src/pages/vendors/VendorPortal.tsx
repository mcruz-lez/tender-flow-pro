import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import {
  Building2,
  TrendingUp,
  DollarSign,
  Clock,
  Bell,
  FileText,
  MessageSquare,
  Calendar,
  Star,
  Award,
  Eye,
  Edit,
  Plus,
  CheckCircle,
  AlertCircle,
  Users,
  Target,
} from "lucide-react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { Link } from "react-router-dom";
import PageTemplate from "@/components/PageTemplate";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";

interface DashboardData {
  totalProjects: number;
  activeProjects: number;
  completedProjects: number;
  pendingBids: number;
  totalRevenue: number;
  avgRating: number;
  responseTime: string;
  profileCompletion: number;
}

interface Opportunity {
  id: string;
  title: string;
  category: string;
  budget: number;
  deadline: string;
  location: string;
  status: "Open" | "Closing Soon" | "Invited";
  match: number;
}

interface Project {
  id: string;
  title: string;
  client: string;
  value: number;
  status: "Active" | "Completed" | "On Hold";
  progress: number;
  deadline: string;
}

const mockDashboardData: DashboardData = {
  totalProjects: 89,
  activeProjects: 7,
  completedProjects: 82,
  pendingBids: 5,
  totalRevenue: 2840000,
  avgRating: 4.8,
  responseTime: "2 hours",
  profileCompletion: 92,
};

const revenueData = [
  { month: "Jan", revenue: 120000, projects: 8 },
  { month: "Feb", revenue: 150000, projects: 12 },
  { month: "Mar", revenue: 180000, projects: 15 },
  { month: "Apr", revenue: 145000, projects: 10 },
  { month: "May", revenue: 220000, projects: 18 },
  { month: "Jun", revenue: 190000, projects: 14 },
];

const projectStatusData = [
  { name: "Completed", value: 82, color: "#10b981" },
  { name: "Active", value: 7, color: "#3b82f6" },
  { name: "On Hold", value: 2, color: "#f59e0b" },
];

const mockOpportunities: Opportunity[] = [
  {
    id: "1",
    title: "Office Building Renovation",
    category: "Construction",
    budget: 450000,
    deadline: "2024-02-15",
    location: "Manhattan, NY",
    status: "Open",
    match: 95,
  },
  {
    id: "2",
    title: "Shopping Center HVAC Upgrade",
    category: "HVAC",
    budget: 280000,
    deadline: "2024-01-30",
    location: "Brooklyn, NY",
    status: "Closing Soon",
    match: 88,
  },
  {
    id: "3",
    title: "Residential Complex Security System",
    category: "Security",
    budget: 120000,
    deadline: "2024-02-28",
    location: "Queens, NY",
    status: "Invited",
    match: 92,
  },
];

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Corporate Headquarters Renovation",
    client: "TechCorp Inc.",
    value: 580000,
    status: "Active",
    progress: 65,
    deadline: "2024-03-15",
  },
  {
    id: "2",
    title: "Retail Store Buildout",
    client: "Fashion Brands LLC",
    value: 120000,
    status: "Active",
    progress: 30,
    deadline: "2024-02-28",
  },
  {
    id: "3",
    title: "Warehouse Construction",
    client: "Logistics Solutions",
    value: 750000,
    status: "Completed",
    progress: 100,
    deadline: "2023-12-20",
  },
];

const VendorPortal = () => {
  const [dashboardData] = useState<DashboardData>(mockDashboardData);
  const [opportunities] = useState<Opportunity[]>(mockOpportunities);
  const [projects] = useState<Project[]>(mockProjects);

  const quickActions = [
    { label: "Submit New Bid", href: "/submit-bid", icon: Plus },
    {
      label: "View Opportunities",
      href: "/opportunities",
      icon: Eye,
      variant: "outline" as const,
    },
    {
      label: "Update Profile",
      href: "/vendors/profile/1",
      icon: Edit,
      variant: "outline" as const,
    },
  ];

  return (
    <PageTemplate
      title="Vendor Portal"
      description="Your comprehensive dashboard for managing opportunities and projects"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Dashboard Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Projects
                  </p>
                  <p className="text-2xl font-bold">
                    {dashboardData.totalProjects}
                  </p>
                  <p className="text-xs text-green-600">
                    +{dashboardData.activeProjects} active
                  </p>
                </div>
                <Building2 className="w-8 h-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Total Revenue
                  </p>
                  <p className="text-2xl font-bold">
                    ${(dashboardData.totalRevenue / 1000000).toFixed(1)}M
                  </p>
                  <p className="text-xs text-green-600">+12% this month</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Average Rating
                  </p>
                  <p className="text-2xl font-bold">
                    {dashboardData.avgRating}
                  </p>
                  <p className="text-xs text-green-600">
                    Excellent performance
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">
                    Pending Bids
                  </p>
                  <p className="text-2xl font-bold">
                    {dashboardData.pendingBids}
                  </p>
                  <p className="text-xs text-blue-600">2 closing soon</p>
                </div>
                <Clock className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Profile Completion Alert */}
        {dashboardData.profileCompletion < 100 && (
          <Card className="border-orange-200 bg-orange-50">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <AlertCircle className="w-6 h-6 text-orange-600" />
                  <div>
                    <h3 className="font-medium text-orange-900">
                      Complete Your Profile
                    </h3>
                    <p className="text-sm text-orange-700">
                      Your profile is {dashboardData.profileCompletion}%
                      complete. Complete it to get more opportunities.
                    </p>
                  </div>
                </div>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/vendors/profile/1">Complete Profile</Link>
                </Button>
              </div>
              <Progress
                value={dashboardData.profileCompletion}
                className="mt-3"
              />
            </CardContent>
          </Card>
        )}

        {/* Main Content Tabs */}
        <Tabs defaultValue="dashboard" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
            <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
            <TabsTrigger value="projects">My Projects</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="messages">Messages</TabsTrigger>
          </TabsList>

          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* Revenue Chart */}
              <Card>
                <CardHeader>
                  <CardTitle>Revenue Trend</CardTitle>
                  <CardDescription>
                    Monthly revenue over the last 6 months
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => [
                          `$${Number(value).toLocaleString()}`,
                          "Revenue",
                        ]}
                      />
                      <Line
                        type="monotone"
                        dataKey="revenue"
                        stroke="#3b82f6"
                        strokeWidth={2}
                        dot={{ fill: "#3b82f6" }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              {/* Project Status */}
              <Card>
                <CardHeader>
                  <CardTitle>Project Status Distribution</CardTitle>
                  <CardDescription>
                    Overview of all your projects
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={projectStatusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}`}
                      >
                        {projectStatusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>Recent Activity</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div className="flex-1">
                      <p className="font-medium">Project milestone completed</p>
                      <p className="text-sm text-gray-600">
                        Corporate Headquarters Renovation - Phase 2
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">2 hours ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <Bell className="w-5 h-5 text-blue-600" />
                    <div className="flex-1">
                      <p className="font-medium">New opportunity match</p>
                      <p className="text-sm text-gray-600">
                        Office Building Renovation - 95% match
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">1 day ago</span>
                  </div>
                  <div className="flex items-center space-x-3 p-3 border rounded-lg">
                    <MessageSquare className="w-5 h-5 text-purple-600" />
                    <div className="flex-1">
                      <p className="font-medium">New message from client</p>
                      <p className="text-sm text-gray-600">
                        TechCorp Inc. sent you a message
                      </p>
                    </div>
                    <span className="text-sm text-gray-500">3 days ago</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="opportunities" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Available Opportunities</h3>
              <Button asChild>
                <Link to="/opportunities">View All Opportunities</Link>
              </Button>
            </div>

            <div className="grid gap-4">
              {opportunities.map((opportunity) => (
                <Card
                  key={opportunity.id}
                  className="hover:shadow-md transition-shadow"
                >
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-lg">
                          {opportunity.title}
                        </h4>
                        <p className="text-gray-600">{opportunity.location}</p>
                      </div>
                      <div className="text-right">
                        <Badge
                          variant={
                            opportunity.status === "Closing Soon"
                              ? "destructive"
                              : opportunity.status === "Invited"
                                ? "default"
                                : "secondary"
                          }
                        >
                          {opportunity.status}
                        </Badge>
                        <div className="text-sm text-gray-600 mt-1">
                          {opportunity.match}% match
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex space-x-4 text-sm">
                        <span>
                          <strong>Budget:</strong> $
                          {opportunity.budget.toLocaleString()}
                        </span>
                        <span>
                          <strong>Category:</strong> {opportunity.category}
                        </span>
                        <span>
                          <strong>Deadline:</strong>{" "}
                          {new Date(opportunity.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                        <Button size="sm">Submit Bid</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="projects" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">My Projects</h3>
              <Button variant="outline">Export Report</Button>
            </div>

            <div className="grid gap-4">
              {projects.map((project) => (
                <Card key={project.id}>
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <h4 className="font-medium text-lg">{project.title}</h4>
                        <p className="text-gray-600">
                          Client: {project.client}
                        </p>
                      </div>
                      <Badge
                        variant={
                          project.status === "Completed"
                            ? "default"
                            : project.status === "Active"
                              ? "secondary"
                              : "outline"
                        }
                      >
                        {project.status}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} />
                    </div>

                    <div className="flex justify-between items-center mt-3">
                      <div className="flex space-x-4 text-sm">
                        <span>
                          <strong>Value:</strong> $
                          {project.value.toLocaleString()}
                        </span>
                        <span>
                          <strong>Deadline:</strong>{" "}
                          {new Date(project.deadline).toLocaleDateString()}
                        </span>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="performance" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4 text-center">
                  <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">95%</div>
                  <div className="text-sm text-gray-600">On-Time Delivery</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">4.8/5</div>
                  <div className="text-sm text-gray-600">
                    Client Satisfaction
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                  <div className="text-2xl font-bold">92%</div>
                  <div className="text-sm text-gray-600">Quality Score</div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Performance Metrics</CardTitle>
                <CardDescription>
                  Your key performance indicators over time
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <TrendingUp className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Detailed Analytics
                  </h3>
                  <p className="text-gray-600">
                    Comprehensive performance analytics and insights will be
                    available here.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="messages" className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-medium">Messages & Notifications</h3>
              <Button variant="outline" size="sm">
                Mark All Read
              </Button>
            </div>

            <Card>
              <CardContent className="p-4">
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">
                    Message Center
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Stay connected with clients and manage all communications.
                  </p>
                  <Button asChild>
                    <Link to="/communication">Open Message Center</Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Payment/Checkout Section */}
        <Card className="mb-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Vendor Portal Payment
            </CardTitle>
            <CardDescription className="text-white/70">
              Pay vendor subscription or service fees securely via Stripe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StripeCheckoutButton
              amount={50}
              currency="usd"
              description="Vendor Portal Subscription"
              type="vendor"
              onSuccess={() => alert("Vendor payment successful!")}
            />
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default VendorPortal;

// Next: Professionally enhance VendorPortal.tsx with vibrant, animated, accessible, and consistent design system
// This includes animated gradients, glassmorphism, badge pulse, animated CTAs, responsive layouts, and accessibility improvements
// All enhancements will follow the same design system as Dashboard
