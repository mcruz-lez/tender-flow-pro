
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Progress } from "@/components/ui/progress";
import { Search, Filter, Eye, MessageSquare, Clock, CheckCircle, XCircle, AlertCircle, TrendingUp, Calendar } from "lucide-react";

const BidTracking = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("active");

  const bids = [
    {
      id: "BID-001",
      tenderId: "T-001",
      tenderTitle: "HVAC System Maintenance Contract",
      status: "Under Review",
      submissionDate: "2024-01-10",
      deadline: "2024-01-15",
      bidAmount: "$48,500",
      evaluationStage: "Technical Review",
      progress: 65,
      feedback: "Technical specifications under review. Financial evaluation pending.",
      nextUpdate: "2024-01-13",
      evaluators: ["John Smith", "Sarah Wilson"],
      timeline: [
        { stage: "Submitted", date: "2024-01-10", status: "completed" },
        { stage: "Initial Review", date: "2024-01-11", status: "completed" },
        { stage: "Technical Review", date: "2024-01-12", status: "current" },
        { stage: "Financial Review", date: "2024-01-14", status: "pending" },
        { stage: "Final Decision", date: "2024-01-15", status: "pending" }
      ]
    },
    {
      id: "BID-002",
      tenderId: "T-002", 
      tenderTitle: "Security Services for Commercial Buildings",
      status: "Submitted",
      submissionDate: "2024-01-12",
      deadline: "2024-01-20",
      bidAmount: "$72,000",
      evaluationStage: "Initial Review",
      progress: 25,
      feedback: "Bid received and acknowledged. Initial review in progress.",
      nextUpdate: "2024-01-15",
      evaluators: ["Mike Johnson", "Lisa Chen"],
      timeline: [
        { stage: "Submitted", date: "2024-01-12", status: "completed" },
        { stage: "Initial Review", date: "2024-01-13", status: "current" },
        { stage: "Technical Review", date: "2024-01-16", status: "pending" },
        { stage: "Financial Review", date: "2024-01-18", status: "pending" },
        { stage: "Final Decision", date: "2024-01-20", status: "pending" }
      ]
    },
    {
      id: "BID-003",
      tenderId: "T-003",
      tenderTitle: "Landscaping and Groundskeeping Services",
      status: "Awarded",
      submissionDate: "2023-12-28",
      deadline: "2023-12-30",
      bidAmount: "$28,500",
      evaluationStage: "Completed",
      progress: 100,
      feedback: "Congratulations! Your bid has been selected. Contract signing scheduled.",
      nextUpdate: "Contract Signing",
      evaluators: ["David Brown", "Emily Davis"],
      timeline: [
        { stage: "Submitted", date: "2023-12-28", status: "completed" },
        { stage: "Initial Review", date: "2023-12-29", status: "completed" },
        { stage: "Technical Review", date: "2023-12-29", status: "completed" },
        { stage: "Financial Review", date: "2023-12-30", status: "completed" },
        { stage: "Final Decision", date: "2023-12-30", status: "completed" }
      ]
    },
    {
      id: "BID-004",
      tenderId: "T-004",
      tenderTitle: "Office Building Renovation Project",
      status: "Rejected",
      submissionDate: "2023-12-20",
      deadline: "2023-12-25",
      bidAmount: "$125,000",
      evaluationStage: "Completed",
      progress: 100,
      feedback: "Thank you for your submission. While competitive, another bid was selected based on technical expertise.",
      nextUpdate: "Completed",
      evaluators: ["Robert Wilson", "Anna Taylor"],
      timeline: [
        { stage: "Submitted", date: "2023-12-20", status: "completed" },
        { stage: "Initial Review", date: "2023-12-21", status: "completed" },
        { stage: "Technical Review", date: "2023-12-22", status: "completed" },
        { stage: "Financial Review", date: "2023-12-23", status: "completed" },
        { stage: "Final Decision", date: "2023-12-25", status: "completed" }
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Submitted": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Under Review": return "bg-purple-100 text-purple-800 border-purple-200";
      case "Awarded": return "bg-green-100 text-green-800 border-green-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getProgressColor = (progress: number) => {
    if (progress === 100) return "bg-green-500";
    if (progress >= 75) return "bg-blue-500";
    if (progress >= 50) return "bg-purple-500";
    if (progress >= 25) return "bg-yellow-500";
    return "bg-gray-500";
  };

  const filteredBids = bids.filter(bid => {
    const matchesSearch = bid.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         bid.id.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (activeTab === "active") return matchesSearch && ["Submitted", "Under Review"].includes(bid.status);
    if (activeTab === "awarded") return matchesSearch && bid.status === "Awarded";
    if (activeTab === "rejected") return matchesSearch && bid.status === "Rejected";
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard" className="text-purple-300 hover:text-white">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-purple-400" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/bids" className="text-purple-300 hover:text-white">Bid Management</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-purple-400" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Bid Tracking</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                Bid Tracking
              </h1>
              <p className="text-purple-200">Monitor the status and progress of your submitted bids</p>
            </div>
            <Button asChild className="glass-button-primary">
              <Link to="/bids">
                <TrendingUp className="w-4 h-4 mr-2" />
                View All Bids
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card border-purple-500/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
                  <Input
                    placeholder="Search bids or tenders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass-input"
                  />
                </div>
                <Button variant="outline" size="sm" className="glass-button">
                  <Filter className="w-4 h-4 mr-2" />
                  Advanced Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Bid Status Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="glass-card border-purple-500/20">
              <TabsTrigger value="active" className="data-[state=active]:bg-purple-600">Active Bids</TabsTrigger>
              <TabsTrigger value="awarded" className="data-[state=active]:bg-green-600">Awarded</TabsTrigger>
              <TabsTrigger value="rejected" className="data-[state=active]:bg-red-600">Rejected</TabsTrigger>
            </TabsList>

            <TabsContent value={activeTab}>
              <div className="space-y-6">
                {filteredBids.map((bid) => (
                  <Card key={bid.id} className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <CardTitle className="text-xl text-white">{bid.tenderTitle}</CardTitle>
                            <Badge className={`${getStatusColor(bid.status)} border`}>
                              {bid.status}
                            </Badge>
                          </div>
                          <CardDescription className="text-purple-200">
                            Bid ID: {bid.id} • Tender ID: {bid.tenderId} • Amount: {bid.bidAmount}
                          </CardDescription>
                        </div>
                        <div className="flex gap-2">
                          <Button asChild variant="outline" size="sm" className="glass-button">
                            <Link to={`/tenders/tender/${bid.tenderId}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Tender
                            </Link>
                          </Button>
                          <Button variant="outline" size="sm" className="glass-button">
                            <MessageSquare className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        {/* Progress Section */}
                        <div className="lg:col-span-2">
                          <div className="mb-4">
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-medium text-white">Evaluation Progress</h4>
                              <span className="text-sm text-purple-200">{bid.progress}% Complete</span>
                            </div>
                            <Progress value={bid.progress} className="mb-2" />
                            <p className="text-sm text-purple-200">Current Stage: {bid.evaluationStage}</p>
                          </div>

                          {/* Timeline */}
                          <div>
                            <h4 className="font-medium text-white mb-3">Evaluation Timeline</h4>
                            <div className="space-y-3">
                              {bid.timeline.map((stage, index) => (
                                <div key={index} className="flex items-center gap-3">
                                  {stage.status === "completed" ? (
                                    <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0" />
                                  ) : stage.status === "current" ? (
                                    <Clock className="w-5 h-5 text-blue-400 flex-shrink-0" />
                                  ) : (
                                    <AlertCircle className="w-5 h-5 text-gray-400 flex-shrink-0" />
                                  )}
                                  <div className="flex-1">
                                    <div className="flex justify-between items-center">
                                      <span className={`font-medium ${
                                        stage.status === "completed" ? "text-green-300" :
                                        stage.status === "current" ? "text-blue-300" : "text-gray-400"
                                      }`}>
                                        {stage.stage}
                                      </span>
                                      <span className="text-sm text-purple-300">{stage.date}</span>
                                    </div>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>

                        {/* Details Section */}
                        <div className="space-y-4">
                          <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                            <h4 className="font-medium text-white mb-2 flex items-center">
                              <MessageSquare className="w-4 h-4 mr-2 text-purple-400" />
                              Latest Feedback
                            </h4>
                            <p className="text-sm text-purple-200">{bid.feedback}</p>
                          </div>

                          <div className="space-y-3">
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-300">Submission Date:</span>
                              <span className="text-white">{bid.submissionDate}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-300">Deadline:</span>
                              <span className="text-white">{bid.deadline}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-300">Next Update:</span>
                              <span className="text-white">{bid.nextUpdate}</span>
                            </div>
                          </div>

                          <div>
                            <h5 className="font-medium text-white mb-2">Evaluators</h5>
                            <div className="space-y-1">
                              {bid.evaluators.map((evaluator, index) => (
                                <div key={index} className="text-sm text-purple-200">
                                  {evaluator}
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>

          {/* Summary Statistics */}
          <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card className="glass-card border-blue-500/20 hover:border-blue-400/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <Clock className="w-8 h-8 text-blue-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Active Bids</h3>
                <p className="text-2xl font-bold text-blue-400">
                  {bids.filter(b => ["Submitted", "Under Review"].includes(b.status)).length}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-green-500/20 hover:border-green-400/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Won Bids</h3>
                <p className="text-2xl font-bold text-green-400">
                  {bids.filter(b => b.status === "Awarded").length}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-red-500/20 hover:border-red-400/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <XCircle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Lost Bids</h3>
                <p className="text-2xl font-bold text-red-400">
                  {bids.filter(b => b.status === "Rejected").length}
                </p>
              </CardContent>
            </Card>

            <Card className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <TrendingUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                <h3 className="font-semibold text-white mb-1">Win Rate</h3>
                <p className="text-2xl font-bold text-purple-400">
                  {Math.round((bids.filter(b => b.status === "Awarded").length / 
                    bids.filter(b => ["Awarded", "Rejected"].includes(b.status)).length) * 100) || 0}%
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidTracking;
