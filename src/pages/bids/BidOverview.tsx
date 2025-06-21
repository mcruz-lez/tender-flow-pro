import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Plus,
  Search,
  Filter,
  Calendar,
  Grid3X3,
  List,
  Eye,
  Edit,
  TrendingUp,
  Clock,
  DollarSign,
  FileText,
  Award,
  Download,
  ExternalLink,
  Zap,
} from "lucide-react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { StripeCheckoutButton } from "@/components/StripeCheckoutButton";

const BidOverview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [activeTab, setActiveTab] = useState("all");

  const bids = [
    {
      id: "BID-001",
      tenderId: "1",
      tenderTitle: "HVAC System Maintenance Contract",
      status: "Submitted",
      submissionDate: "2024-01-10",
      deadline: "2024-01-15",
      bidAmount: "$48,500",
      winProbability: 85,
      responseTime: "2 days",
      category: "Property Maintenance",
    },
    {
      id: "BID-002",
      tenderId: "2",
      tenderTitle: "Security Services for Commercial Buildings",
      status: "Draft",
      submissionDate: null,
      deadline: "2024-01-20",
      bidAmount: "$72,000",
      winProbability: 72,
      responseTime: "5 days left",
      category: "Security Services",
    },
    {
      id: "BID-003",
      tenderId: "3",
      tenderTitle: "Landscaping and Groundskeeping Services",
      status: "Awarded",
      submissionDate: "2023-12-28",
      deadline: "2023-12-30",
      bidAmount: "$28,500",
      winProbability: 95,
      responseTime: "Completed",
      category: "Landscaping",
    },
    {
      id: "BID-004",
      tenderId: "4",
      tenderTitle: "Office Building Renovation Project",
      status: "Rejected",
      submissionDate: "2023-12-20",
      deadline: "2023-12-25",
      bidAmount: "$125,000",
      winProbability: 45,
      responseTime: "Completed",
      category: "Renovation",
    },
    {
      id: "BID-005",
      tenderId: "5",
      tenderTitle: "IT Infrastructure Upgrade",
      status: "Under Review",
      submissionDate: "2024-01-08",
      deadline: "2024-01-12",
      bidAmount: "$89,500",
      winProbability: 78,
      responseTime: "Pending",
      category: "Technology",
    },
  ];

  const bidTrends = [
    { month: "Jan", submitted: 10, awarded: 4, winRate: 40 },
    { month: "Feb", submitted: 12, awarded: 5, winRate: 42 },
    { month: "Mar", submitted: 15, awarded: 7, winRate: 47 },
    { month: "Apr", submitted: 11, awarded: 4, winRate: 36 },
    { month: "May", submitted: 18, awarded: 9, winRate: 50 },
    { month: "Jun", submitted: 14, awarded: 6, winRate: 43 },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Draft":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Awarded":
        return "bg-green-100 text-green-800 border-green-200";
      case "Rejected":
        return "bg-red-100 text-red-800 border-red-200";
      case "Under Review":
        return "bg-purple-100 text-purple-800 border-purple-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getWinProbabilityColor = (probability: number) => {
    if (probability >= 80) return "text-green-600";
    if (probability >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const filteredBids = bids
    .filter(
      (bid) =>
        bid.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bid.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        bid.category.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((bid) => {
      if (activeTab === "all") return true;
      if (activeTab === "active")
        return ["Submitted", "Draft", "Under Review"].includes(bid.status);
      if (activeTab === "awarded") return bid.status === "Awarded";
      if (activeTab === "draft") return bid.status === "Draft";
      return true;
    });

  const stats = {
    total: bids.length,
    submitted: bids.filter((b) => b.status === "Submitted").length,
    awarded: bids.filter((b) => b.status === "Awarded").length,
    winRate:
      Math.round(
        (bids.filter((b) => b.status === "Awarded").length /
          bids.filter((b) => ["Awarded", "Rejected"].includes(b.status))
            .length) *
          100,
      ) || 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />
      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}
      >
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/dashboard"
                    className="text-purple-300 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-purple-400" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Bid Management
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                Bid Management
              </h1>
              <p className="text-purple-200">
                Track and manage all your bid submissions
              </p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline">
                <a href="/bids/ai-bid">
                  <Zap className="w-4 h-4 mr-2" />
                  AI Bid Assistant
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="/tenders">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Find Opportunities
                </a>
              </Button>
              <Button asChild variant="outline">
                <a href="#">
                  <Download className="w-4 h-4 mr-2" />
                  Export Data
                </a>
              </Button>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">Total Bids</p>
                    <p className="text-3xl font-bold text-white">
                      {stats.total}
                    </p>
                  </div>
                  <FileText className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Submitted</p>
                    <p className="text-3xl font-bold text-white">
                      {stats.submitted}
                    </p>
                  </div>
                  <Clock className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-green-500/20 hover:border-green-400/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">Awarded</p>
                    <p className="text-3xl font-bold text-white">
                      {stats.awarded}
                    </p>
                  </div>
                  <Award className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-200 text-sm">Win Rate</p>
                    <p className="text-3xl font-bold text-white">
                      {stats.winRate}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card border-purple-500/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
                  <Input
                    placeholder="Search bids, tenders, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass-input"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="glass-button">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <div className="flex border border-purple-500/30 rounded-md overflow-hidden">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-none"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-none"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Bid Status Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="glass-card border-purple-500/20">
              <TabsTrigger
                value="all"
                className="data-[state=active]:bg-purple-600"
              >
                All Bids
              </TabsTrigger>
              <TabsTrigger
                value="active"
                className="data-[state=active]:bg-blue-600"
              >
                Active
              </TabsTrigger>
              <TabsTrigger
                value="draft"
                className="data-[state=active]:bg-yellow-600"
              >
                Draft
              </TabsTrigger>
              <TabsTrigger
                value="awarded"
                className="data-[state=active]:bg-green-600"
              >
                Awarded
              </TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBids.map((bid) => (
                    <Card
                      key={bid.id}
                      className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20"
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge
                            className={`${getStatusColor(bid.status)} border`}
                          >
                            {bid.status}
                          </Badge>
                          <span className="text-sm text-purple-300">
                            ID: {bid.id}
                          </span>
                        </div>
                        <CardTitle className="text-lg text-white line-clamp-2">
                          {bid.tenderTitle}
                        </CardTitle>
                        <CardDescription className="text-purple-200">
                          {bid.category}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-300">Bid Amount:</span>
                            <span className="font-medium text-white">
                              {bid.bidAmount}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-300">
                              Win Probability:
                            </span>
                            <span
                              className={`font-medium ${getWinProbabilityColor(bid.winProbability)}`}
                            >
                              {bid.winProbability}%
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-300">Deadline:</span>
                            <span className="font-medium text-white">
                              {bid.deadline}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-300">
                              Response Time:
                            </span>
                            <span className="font-medium text-white">
                              {bid.responseTime}
                            </span>
                          </div>
                        </div>
                        <div className="mt-6 pt-4 border-t border-purple-500/20 flex gap-2">
                          <Button
                            asChild
                            variant="outline"
                            size="sm"
                            className="flex-1 glass-button"
                          >
                            <Link to={`/tenders/tender/${bid.tenderId}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Tender
                            </Link>
                          </Button>
                          {bid.status === "Draft" && (
                            <Button
                              asChild
                              size="sm"
                              className="flex-1 glass-button-primary"
                            >
                              <Link to={`/bids/submit/${bid.tenderId}`}>
                                <Edit className="w-4 h-4 mr-2" />
                                Edit Bid
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="glass-card border-purple-500/20">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-purple-500/20">
                        <TableHead className="text-purple-200">
                          Bid ID
                        </TableHead>
                        <TableHead className="text-purple-200">
                          Tender Title
                        </TableHead>
                        <TableHead className="text-purple-200">
                          Status
                        </TableHead>
                        <TableHead className="text-purple-200">
                          Bid Amount
                        </TableHead>
                        <TableHead className="text-purple-200">
                          Win Probability
                        </TableHead>
                        <TableHead className="text-purple-200">
                          Deadline
                        </TableHead>
                        <TableHead className="text-purple-200">
                          Actions
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredBids.map((bid) => (
                        <TableRow
                          key={bid.id}
                          className="border-purple-500/20 hover:bg-purple-500/5"
                        >
                          <TableCell className="text-white font-medium">
                            {bid.id}
                          </TableCell>
                          <TableCell className="text-white max-w-xs truncate">
                            {bid.tenderTitle}
                          </TableCell>
                          <TableCell>
                            <Badge
                              className={`${getStatusColor(bid.status)} border`}
                            >
                              {bid.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white font-medium">
                            {bid.bidAmount}
                          </TableCell>
                          <TableCell
                            className={`font-medium ${getWinProbabilityColor(bid.winProbability)}`}
                          >
                            {bid.winProbability}%
                          </TableCell>
                          <TableCell className="text-white">
                            {bid.deadline}
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                asChild
                                variant="outline"
                                size="sm"
                                className="glass-button"
                              >
                                <Link to={`/tenders/tender/${bid.tenderId}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                              {bid.status === "Draft" && (
                                <Button
                                  asChild
                                  size="sm"
                                  className="glass-button-primary"
                                >
                                  <Link to={`/bids/submit/${bid.tenderId}`}>
                                    <Edit className="w-4 h-4" />
                                  </Link>
                                </Button>
                              )}
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>
              )}
            </TabsContent>
          </Tabs>

          {/* Analytics and Insights */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle>Bid Trends</CardTitle>
                <CardDescription>
                  Monthly bid submissions and win rates
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={bidTrends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="submitted" fill="#6366f1" name="Submitted" />
                    <Bar dataKey="awarded" fill="#10b981" name="Awarded" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>AI Insights</CardTitle>
                <CardDescription>
                  Smart recommendations for your bids
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside space-y-2 text-gray-200">
                  <li>
                    Use AI to optimize bid pricing and maximize win probability.
                  </li>
                  <li>Analyze competitor trends for strategic advantage.</li>
                  <li>Automate compliance checks for faster submissions.</li>
                  <li>Leverage past bid data to improve future proposals.</li>
                </ul>
                <Button asChild variant="outline" className="mt-4">
                  <a
                    href="/analytics/bid-analytics"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    View Analytics
                  </a>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="glass-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-12 h-12 text-blue-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  AI Bid Analysis
                </h3>
                <p className="text-purple-200 text-sm mb-4">
                  Get AI-powered insights for your bids
                </p>
                <Button asChild className="glass-button-primary w-full">
                  <Link to="/bids/ai-bid">Analyze Bids</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-green-500/20 hover:border-green-400/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <FileText className="w-12 h-12 text-green-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Bid Library
                </h3>
                <p className="text-purple-200 text-sm mb-4">
                  Access templates and past bids
                </p>
                <Button asChild className="glass-button-primary w-full">
                  <Link to="/bids/library">View Library</Link>
                </Button>
              </CardContent>
            </Card>

            <Card className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105">
              <CardContent className="p-6 text-center">
                <Award className="w-12 h-12 text-purple-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-white mb-2">
                  Win Score
                </h3>
                <p className="text-purple-200 text-sm mb-4">
                  Calculate your winning probability
                </p>
                <Button asChild className="glass-button-primary w-full">
                  <Link to="/bids/win-score">Check Score</Link>
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Payment/Checkout Section */}
          <Card className="mb-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Secure Bid Payment
              </CardTitle>
              <CardDescription className="text-white/70">
                Pay bid fees or deposits securely via Stripe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StripeCheckoutButton
                amount={100}
                currency="usd"
                description="Bid Fee Payment"
                type="bid"
                onSuccess={() => alert("Bid payment successful!")}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default BidOverview;
