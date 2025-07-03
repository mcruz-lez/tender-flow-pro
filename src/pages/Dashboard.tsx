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
  User,
  Eye,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Link } from "react-router-dom";
import AuditLogsNav from "@/components/audit/AuditLogsNav";

// Animated glassmorphism and gradient helpers
const animatedGradient =
  "bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 dark:from-[#23234a] dark:via-[#2a1e3f] dark:to-[#1e1e3f] shadow-2xl border-0 backdrop-blur-xl";
const glassCard =
  "rounded-2xl border-0 shadow-2xl bg-white/60 dark:bg-[#23234a]/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-400/30";
const glassButton =
  "rounded-full px-5 py-2 font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-blue-900/20 hover:scale-105 hover:shadow-blue-400/40 transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none";
const badgePulse =
  "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-pulse after:bg-current after:opacity-20";

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const stats = [
    {
      title: "Active Tenders",
      value: "24",
      change: "+12%",
      icon: FileText,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
    {
      title: "Total Vendors",
      value: "156",
      change: "+8%",
      icon: Users,
      color: "text-secondary-foreground",
      bgColor: "bg-secondary/10",
    },
    {
      title: "Contracts Value",
      value: "€2.4M",
      change: "+15%",
      icon: DollarSign,
      color: "text-accent-foreground",
      bgColor: "bg-accent/10",
    },
    {
      title: "Cost Savings",
      value: "€340K",
      change: "+22%",
      icon: TrendingUp,
      color: "text-primary",
      bgColor: "bg-primary/10",
    },
  ];

  const recentTenders = [
    {
      id: "TND-2024-001",
      title: "HVAC Maintenance Services - Building Complex A",
      status: "Open",
      dueDate: "2024-01-15",
      bidCount: 8,
      budget: "€45,000",
    },
    {
      id: "TND-2024-002",
      title: "Security Services - Residential Portfolio",
      status: "Evaluation",
      dueDate: "2024-01-12",
      bidCount: 12,
      budget: "€120,000",
    },
    {
      id: "TND-2024-003",
      title: "Landscaping Services - Commercial Properties",
      status: "Draft",
      dueDate: "2024-01-20",
      bidCount: 0,
      budget: "€28,000",
    },
    {
      title: "Cleaning Services - Office Buildings",
      status: "Awarded",
      dueDate: "2024-01-08",
      bidCount: 15,
      budget: "€85,000",
    },
  ];

  const upcomingTasks = [
    {
      title: "Review HVAC tender proposals",
      due: "Today",
      priority: "High",
      type: "Evaluation",
    },
    {
      title: "Publish Security Services RFP",
      due: "Tomorrow",
      priority: "Medium",
      type: "Publishing",
    },
    {
      title: "Vendor performance review meeting",
      due: "Jan 15",
      priority: "Low",
      type: "Meeting",
    },
    {
      title: "Contract renewal - Cleaning Services",
      due: "Jan 18",
      priority: "High",
      type: "Contract",
    },
  ];

  const topVendors = [
    {
      name: "Elite Construction Co.",
      rating: 4.8,
      projects: 89,
      category: "Construction",
    },
    {
      name: "ProClean Services",
      rating: 4.6,
      projects: 234,
      category: "Cleaning",
    },
    {
      name: "SecureGuard Solutions",
      rating: 4.9,
      projects: 67,
      category: "Security",
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Open":
        return "bg-primary/20 text-primary";
      case "Evaluation":
        return "bg-accent/20 text-accent-foreground";
      case "Draft":
        return "bg-muted text-muted-foreground";
      case "Awarded":
        return "bg-secondary/20 text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-destructive/20 text-destructive";
      case "Medium":
        return "bg-accent/20 text-accent-foreground";
      case "Low":
        return "bg-secondary/20 text-secondary-foreground";
      default:
        return "bg-muted text-muted-foreground";
    }
  };

  return (
    <>
      {/* Animated Background Overlays */}
      <div
        className="pointer-events-none fixed inset-0 z-0 overflow-hidden"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-0 w-[80vw] h-[60vw] -translate-x-1/2 bg-gradient-to-br from-indigo-300/30 via-purple-300/20 to-blue-200/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute right-0 bottom-0 w-[40vw] h-[40vw] bg-gradient-to-tr from-purple-400/20 to-indigo-200/10 rounded-full blur-2xl animate-pulse-slower" />
      </div>
      <div
        className={`min-h-screen ${animatedGradient} transition-colors relative z-10 motion-safe:animate-fadeInUp`}
      >
        <DashboardSidebar
          isOpen={sidebarOpen}
          onToggle={() => setSidebarOpen(!sidebarOpen)}
        />
        <div
          className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} min-h-screen`}
        >
          {/* Top Header */}
          <header className="bg-gradient-to-r from-purple-600 to-indigo-500 text-white px-6 py-6 rounded-b-2xl shadow-2xl drop-shadow-lg mb-6 transition-all flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-extrabold tracking-tight text-white drop-shadow-lg">
                Dashboard
              </h1>
              <p className="text-lg text-white/80 font-medium mt-1">
                Welcome back! Here's what's happening with your tenders.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <Button
                variant="outline"
                size="sm"
                className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-all"
              >
                <Calendar className="w-4 h-4 mr-2" />
                Last 30 days
              </Button>
              <Button asChild size="sm" className={glassButton}>
                <Link to="/tenders/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Tender
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 transition-all"
              >
                <Bell className="w-5 h-5" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="hover:bg-white/10 transition-all"
              >
                <User className="w-5 h-5" />
              </Button>
            </div>
          </header>
          {/* Audit Logs Navigation */}
          <AuditLogsNav />
          {/* Main Content */}
          <main className="p-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <Card
                  key={index}
                  className={`${glassCard} group`}
                  tabIndex={0}
                  aria-label={stat.title}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-semibold text-slate-800 dark:text-slate-200 tracking-tight">
                          {stat.title}
                        </p>
                        <div className="flex items-center mt-2">
                          <span className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
                            {stat.value}
                          </span>
                          <span className="text-sm text-green-600 ml-2 font-medium animate-pulse">
                            {stat.change}
                          </span>
                        </div>
                      </div>
                      <div
                        className={`w-12 h-12 ${stat.bgColor} rounded-xl flex items-center justify-center drop-shadow-lg group-hover:animate-pulse transition-all`}
                      >
                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            {/* Content Tabs */}
            <Tabs defaultValue="overview" className="space-y-6">
              <TabsList className="grid w-full grid-cols-4 lg:w-[400px] bg-gradient-to-r from-purple-100/60 to-indigo-100/60 dark:from-[#23234a]/40 dark:to-[#2a1e3f]/40 rounded-xl shadow-sm mb-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="tenders">Tenders</TabsTrigger>
                <TabsTrigger value="vendors">Vendors</TabsTrigger>
                <TabsTrigger value="analytics">Analytics</TabsTrigger>
              </TabsList>
              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {/* Recent Tenders */}
                  <Card className={`${glassCard} border-blue-200/30`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                          Recent Tenders
                        </CardTitle>
                        <Link to="/tenders">
                          <Button
                            variant="ghost"
                            size="sm"
                            className={
                              glassButton +
                              " !bg-transparent !text-indigo-700 dark:!text-indigo-300"
                            }
                          >
                            View All
                          </Button>
                        </Link>
                      </div>
                      <CardDescription className="text-sm text-muted-foreground italic">
                        Latest tender activities and status updates
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {recentTenders.map((tender, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 rounded-xl border border-slate-200/40 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-[#23234a]/40 dark:hover:to-[#2a1e3f]/40 transition-all group"
                          >
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center space-x-3 mb-2">
                                <Badge
                                  variant="outline"
                                  className="text-xs font-mono border-slate-300/40 dark:border-slate-600/40"
                                >
                                  {tender.id}
                                </Badge>
                                <Badge
                                  className={`text-xs font-semibold ${getStatusColor(tender.status)} ${badgePulse} inline-flex items-center gap-2`}
                                >
                                  {tender.status}
                                </Badge>
                              </div>
                              <h4 className="font-medium text-slate-900 dark:text-white truncate text-lg tracking-tight">
                                {tender.title}
                              </h4>
                              <div className="flex items-center space-x-4 mt-1 text-sm text-slate-500 dark:text-slate-300">
                                <span>Due: {tender.dueDate}</span>
                                <span>{tender.bidCount} bids</span>
                                <span className="font-medium text-slate-900 dark:text-white">
                                  {tender.budget}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                  {/* Upcoming Tasks */}
                  <Card className={`${glassCard} border-purple-200/30`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                        Upcoming Tasks
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground italic">
                        Your pending actions and deadlines
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {upcomingTasks.map((task, index) => (
                          <div
                            key={index}
                            className="flex items-center space-x-3 p-3 rounded-xl border border-slate-200/40 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-[#23234a]/40 dark:hover:to-[#2a1e3f]/40 transition-all group"
                          >
                            <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 animate-pulse group-hover:scale-125 transition-transform" />
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <h4 className="font-medium text-slate-900 dark:text-white truncate text-lg tracking-tight">
                                  {task.title}
                                </h4>
                                <Badge
                                  className={`text-xs font-semibold ${getPriorityColor(task.priority)} ${badgePulse} inline-flex items-center gap-2`}
                                >
                                  {task.priority}
                                </Badge>
                              </div>
                              <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-300">
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
                <Card className={`${glassCard} border-indigo-200/30`}>
                  <CardHeader>
                    <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                      Performance Metrics
                    </CardTitle>
                    <CardDescription className="text-sm text-muted-foreground italic">
                      Key performance indicators for your procurement process
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Tender Success Rate
                          </span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            92%
                          </span>
                        </div>
                        <Progress
                          value={92}
                          className="h-2 rounded-full animate-pulse transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Average Response Time
                          </span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            3.2 days
                          </span>
                        </div>
                        <Progress
                          value={76}
                          className="h-2 rounded-full animate-pulse transition-all"
                        />
                      </div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
                            Vendor Satisfaction
                          </span>
                          <span className="text-sm font-bold text-slate-900 dark:text-white">
                            4.8/5
                          </span>
                        </div>
                        <Progress
                          value={96}
                          className="h-2 rounded-full animate-pulse transition-all"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              <TabsContent value="tenders">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={`${glassCard} border-blue-200/30`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                        Active Tenders
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground italic">
                        Currently open for bidding
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        {recentTenders
                          .filter((t) => t.status === "Open")
                          .map((tender, index) => (
                            <div
                              key={index}
                              className="flex items-center justify-between p-3 border rounded-xl border-slate-200/40 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-[#23234a]/40 dark:hover:to-[#2a1e3f]/40 transition-all group"
                            >
                              <div>
                                <h4 className="font-medium text-slate-900 dark:text-white text-lg tracking-tight">
                                  {tender.title}
                                </h4>
                                <p className="text-sm text-slate-600 dark:text-slate-300">
                                  {tender.bidCount} bids • {tender.budget}
                                </p>
                              </div>
                              <Button
                                asChild
                                size="sm"
                                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md rounded-lg transition-all"
                              >
                                <Link to="/tenders">View</Link>
                              </Button>
                            </div>
                          ))}
                      </div>
                      <Button
                        asChild
                        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold shadow-md rounded-lg transition-all"
                      >
                        <Link to="/tenders">
                          <Eye className="w-4 h-4 mr-2" />
                          View All Tenders
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className={`${glassCard} border-purple-200/30`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                        Quick Actions
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground italic">
                        Common tender management tasks
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        asChild
                        className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md rounded-lg transition-all"
                      >
                        <Link to="/tenders/create">
                          <Plus className="w-4 h-4 mr-2" />
                          Create New Tender
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-slate-200/40 dark:border-slate-600/40 text-slate-800 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      >
                        <Link to="/evaluation">
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Evaluation Dashboard
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-slate-200/40 dark:border-slate-600/40 text-slate-800 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      >
                        <Link to="/tenders/templates">
                          <FileText className="w-4 h-4 mr-2" />
                          Tender Templates
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="vendors">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={`${glassCard} border-blue-200/30`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                        Top Performing Vendors
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground italic">
                        Highest rated vendors by category
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {topVendors.map((vendor, index) => (
                          <div
                            key={index}
                            className="flex items-center justify-between p-3 border rounded-xl border-slate-200/40 hover:bg-gradient-to-r hover:from-indigo-50 hover:to-purple-50 dark:hover:from-[#23234a]/40 dark:hover:to-[#2a1e3f]/40 transition-all group"
                          >
                            <div>
                              <h4 className="font-medium text-slate-900 dark:text-white text-lg tracking-tight">
                                {vendor.name}
                              </h4>
                              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-300">
                                <span>★ {vendor.rating}</span>
                                <span>•</span>
                                <span>{vendor.projects} projects</span>
                                <span>•</span>
                                <span>{vendor.category}</span>
                              </div>
                            </div>
                            <Button
                              asChild
                              size="sm"
                              variant="outline"
                              className="border-slate-200/40 dark:border-slate-600/40 text-slate-800 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                            >
                              <Link to={`/vendors/profile/${index + 1}`}>
                                View
                              </Link>
                            </Button>
                          </div>
                        ))}
                      </div>
                      <Button
                        asChild
                        className="w-full mt-4 bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold shadow-md rounded-lg transition-all"
                      >
                        <Link to="/vendors">
                          <Users className="w-4 h-4 mr-2" />
                          View All Vendors
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                  <Card className={`${glassCard} border-purple-200/30`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                        Vendor Management
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground italic">
                        Manage vendor relationships
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-slate-200/40 dark:border-slate-600/40 text-slate-800 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      >
                        <Link to="/vendors/register">
                          <Plus className="w-4 h-4 mr-2" />
                          Register New Vendor
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-slate-200/40 dark:border-slate-600/40 text-slate-800 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      >
                        <Link to="/vendors/prequalification">
                          <Filter className="w-4 h-4 mr-2" />
                          Prequalification
                        </Link>
                      </Button>
                      <Button
                        asChild
                        variant="outline"
                        className="w-full border-slate-200/40 dark:border-slate-600/40 text-slate-800 dark:text-white hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all"
                      >
                        <Link to="/vendors/audit-logs">
                          <FileText className="w-4 h-4 mr-2" />
                          Audit Logs
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
              <TabsContent value="analytics">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <Card className={`${glassCard} border-indigo-200/30`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                        Tender Analytics
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground italic">
                        Insights on tender performance and vendor participation
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Example chart placeholder */}
                        <div className="h-48 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                          <p className="text-sm font-medium">
                            {/* Replace with actual chart component */}
                            Tender analytics chart (e.g., bar chart, line graph)
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white shadow-md">
                            <h5 className="text-sm font-semibold text-slate-800">
                              Total Tenders
                            </h5>
                            <p className="text-2xl font-bold text-slate-900">
                              1,024
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white shadow-md">
                            <h5 className="text-sm font-semibold text-slate-800">
                              Avg. Tender Value
                            </h5>
                            <p className="text-2xl font-bold text-slate-900">
                              €45,000
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white shadow-md">
                            <h5 className="text-sm font-semibold text-slate-800">
                              Total Vendors
                            </h5>
                            <p className="text-2xl font-bold text-slate-900">
                              156
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white shadow-md">
                            <h5 className="text-sm font-semibold text-slate-800">
                              Active Contracts
                            </h5>
                            <p className="text-2xl font-bold text-slate-900">
                              342
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <Card className={`${glassCard} border-purple-200/30`}>
                    <CardHeader>
                      <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
                        Vendor Engagement
                      </CardTitle>
                      <CardDescription className="text-sm text-muted-foreground italic">
                        Analysis of vendor interactions and feedback
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        {/* Example chart placeholder */}
                        <div className="h-48 bg-slate-100 rounded-xl flex items-center justify-center text-slate-400">
                          <p className="text-sm font-medium">
                            {/* Replace with actual chart component */}
                            Vendor engagement chart (e.g., pie chart, line
                            graph)
                          </p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <div className="p-4 rounded-xl bg-white shadow-md">
                            <h5 className="text-sm font-semibold text-slate-800">
                              Total Responses
                            </h5>
                            <p className="text-2xl font-bold text-slate-900">
                              2,340
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white shadow-md">
                            <h5 className="text-sm font-semibold text-slate-800">
                              Positive Feedback
                            </h5>
                            <p className="text-2xl font-bold text-slate-900">
                              87%
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white shadow-md">
                            <h5 className="text-sm font-semibold text-slate-800">
                              Total Meetings
                            </h5>
                            <p className="text-2xl font-bold text-slate-900">
                              120
                            </p>
                          </div>
                          <div className="p-4 rounded-xl bg-white shadow-md">
                            <h5 className="text-sm font-semibold text-slate-800">
                              Avg. Response Time
                            </h5>
                            <p className="text-2xl font-bold text-slate-900">
                              3.2 days
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
