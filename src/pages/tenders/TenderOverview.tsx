import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Plus, Search, Filter, Calendar, Grid3X3, List, Eye, Edit, Users, DollarSign, Clock, Star, Building } from "lucide-react";
import { Link } from "react-router-dom";

const TenderOverview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const tenders = [
    {
      id: "1",
      title: "HVAC System Maintenance Contract",
      category: "Property Maintenance",
      status: "Active",
      deadline: "2024-01-15",
      publishDate: "2023-12-01",
      value: "$50,000",
      bids: 12,
      views: 156,
      location: "Downtown Office Complex",
      priority: "High",
      evaluationScore: 85
    },
    {
      id: "2", 
      title: "Security Services for Commercial Buildings",
      category: "Security Services",
      status: "Draft",
      deadline: "2024-01-20",
      publishDate: "2023-12-05",
      value: "$75,000",
      bids: 0,
      views: 45,
      location: "Business District",
      priority: "Medium",
      evaluationScore: null
    },
    {
      id: "3",
      title: "Landscaping and Groundskeeping Services",
      category: "Landscaping",
      status: "Closed",
      deadline: "2023-12-30",
      publishDate: "2023-11-15",
      value: "$30,000",
      bids: 18,
      views: 234,
      location: "Corporate Campus",
      priority: "Low",
      evaluationScore: 92
    },
    {
      id: "4",
      title: "Electrical Infrastructure Upgrade",
      category: "Construction",
      status: "Evaluation",
      deadline: "2024-01-10",
      publishDate: "2023-11-20",
      value: "$120,000",
      bids: 8,
      views: 189,
      location: "Industrial Complex",
      priority: "High",
      evaluationScore: 78
    },
    {
      id: "5",
      title: "Cleaning Services Contract",
      category: "Cleaning Services", 
      status: "Active",
      deadline: "2024-02-01",
      publishDate: "2023-12-10",
      value: "$25,000",
      bids: 15,
      views: 167,
      location: "Office Building",
      priority: "Medium",
      evaluationScore: null
    },
    {
      id: "6",
      title: "IT Infrastructure Services",
      category: "Technology Services",
      status: "Awarded",
      deadline: "2023-12-20",
      publishDate: "2023-10-15",
      value: "$95,000",
      bids: 6,
      views: 123,
      location: "Tech Hub",
      priority: "High",
      evaluationScore: 94
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Draft": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Closed": return "bg-gray-100 text-gray-800 border-gray-200";
      case "Evaluation": return "bg-blue-100 text-blue-800 border-blue-200";
      case "Awarded": return "bg-purple-100 text-purple-800 border-purple-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredTenders = tenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           tender.status.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: tenders.length,
    active: tenders.filter(t => t.status === "Active").length,
    draft: tenders.filter(t => t.status === "Draft").length,
    evaluation: tenders.filter(t => t.status === "Evaluation").length,
    closed: tenders.filter(t => t.status === "Closed").length,
    awarded: tenders.filter(t => t.status === "Awarded").length,
    totalValue: tenders.reduce((sum, t) => sum + parseInt(t.value.replace(/[$,]/g, "")), 0),
    avgBids: Math.round(tenders.reduce((sum, t) => sum + t.bids, 0) / tenders.length)
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Tender Management</h1>
              <p className="text-white/70 mt-2">Create, manage, and track all your tenders</p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/tenders/templates">
                  <Building className="w-4 h-4 mr-2" />
                  Templates
                </Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/tenders/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Tender
                </Link>
              </Button>
            </div>
          </div>

          {/* Stats Overview */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-6">
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">{stats.total}</div>
                <div className="text-sm text-white/60">Total Tenders</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-green-400">{stats.active}</div>
                <div className="text-sm text-white/60">Active</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-400">{stats.evaluation}</div>
                <div className="text-sm text-white/60">In Evaluation</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-yellow-400">{stats.draft}</div>
                <div className="text-sm text-white/60">Draft</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-white">${(stats.totalValue / 1000).toFixed(0)}K</div>
                <div className="text-sm text-white/60">Total Value</div>
              </CardContent>
            </Card>
            <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-400">{stats.avgBids}</div>
                <div className="text-sm text-white/60">Avg Bids</div>
              </CardContent>
            </Card>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search tenders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                  <div className="flex border border-white/20 rounded-md bg-white/5">
                    <Button
                      variant={viewMode === "grid" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("grid")}
                      className="rounded-r-none border-0"
                    >
                      <Grid3X3 className="w-4 h-4" />
                    </Button>
                    <Button
                      variant={viewMode === "list" ? "default" : "ghost"}
                      size="sm"
                      onClick={() => setViewMode("list")}
                      className="rounded-l-none border-0"
                    >
                      <List className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Tender Status Tabs */}
          <Tabs defaultValue="all" className="space-y-6" onValueChange={setSelectedCategory}>
            <TabsList className="bg-white/10 backdrop-blur-xl border-white/20">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/20">All Tenders ({stats.total})</TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-white/20">Active ({stats.active})</TabsTrigger>
              <TabsTrigger value="evaluation" className="data-[state=active]:bg-white/20">Evaluation ({stats.evaluation})</TabsTrigger>
              <TabsTrigger value="draft" className="data-[state=active]:bg-white/20">Draft ({stats.draft})</TabsTrigger>
              <TabsTrigger value="closed" className="data-[state=active]:bg-white/20">Closed ({stats.closed})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {viewMode === "grid" ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTenders.map((tender) => (
                    <Card key={tender.id} className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge className={getStatusColor(tender.status)}>
                            {tender.status}
                          </Badge>
                          <Badge className={getPriorityColor(tender.priority)}>
                            {tender.priority}
                          </Badge>
                        </div>
                        <CardTitle className="text-lg text-white">{tender.title}</CardTitle>
                        <CardDescription className="text-white/70">{tender.category}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-white/60">Value:</span>
                            <p className="font-medium text-white">{tender.value}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Deadline:</span>
                            <p className="font-medium text-white">{tender.deadline}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Bids:</span>
                            <p className="font-medium text-white">{tender.bids}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Views:</span>
                            <p className="font-medium text-white">{tender.views}</p>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-sm text-white/60">
                          <Building className="w-4 h-4" />
                          <span>{tender.location}</span>
                        </div>

                        {tender.evaluationScore && (
                          <div className="flex items-center gap-2">
                            <Star className="w-4 h-4 text-yellow-400" />
                            <span className="text-sm text-white">Score: {tender.evaluationScore}/100</span>
                          </div>
                        )}

                        <div className="flex gap-2 pt-2">
                          <Button asChild size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700">
                            <Link to={`/tenders/tender/${tender.id}`}>
                              <Eye className="w-4 h-4 mr-2" />
                              View Details
                            </Link>
                          </Button>
                          {tender.status === "Draft" && (
                            <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Link to={`/tenders/edit/${tender.id}`}>
                                <Edit className="w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                          {tender.status === "Active" && (
                            <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Link to={`/bids/submit/${tender.id}`}>
                                <Users className="w-4 h-4" />
                              </Link>
                            </Button>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              ) : (
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-white/80">Title</TableHead>
                        <TableHead className="text-white/80">Category</TableHead>
                        <TableHead className="text-white/80">Status</TableHead>
                        <TableHead className="text-white/80">Value</TableHead>
                        <TableHead className="text-white/80">Bids</TableHead>
                        <TableHead className="text-white/80">Deadline</TableHead>
                        <TableHead className="text-white/80">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredTenders.map((tender) => (
                        <TableRow key={tender.id} className="border-white/10 hover:bg-white/5">
                          <TableCell>
                            <div>
                              <p className="font-medium text-white">{tender.title}</p>
                              <p className="text-sm text-white/60">{tender.location}</p>
                            </div>
                          </TableCell>
                          <TableCell className="text-white">{tender.category}</TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(tender.status)}>
                              {tender.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white font-medium">{tender.value}</TableCell>
                          <TableCell className="text-white">{tender.bids}</TableCell>
                          <TableCell className="text-white">{tender.deadline}</TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                <Link to={`/tenders/tender/${tender.id}`}>
                                  <Eye className="w-4 h-4" />
                                </Link>
                              </Button>
                              {tender.status === "Active" && tender.bids > 0 && (
                                <Button asChild size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                                  <Link to={`/evaluation/panel/${tender.id}`}>
                                    <Star className="w-4 h-4" />
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

            {/* Other tab contents remain the same but filtered */}
            {["active", "evaluation", "draft", "closed"].map((status) => (
              <TabsContent key={status} value={status}>
                {filteredTenders.filter((tender) => tender.status.toLowerCase() === status).length > 0 ? (
                  viewMode === "grid" ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {filteredTenders
                        .filter((tender) => tender.status.toLowerCase() === status)
                        .map((tender) => (
                          <Card
                            key={tender.id}
                            className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1"
                          >
                            <CardHeader className="pb-3">
                              <div className="flex justify-between items-start mb-2">
                                <Badge className={getStatusColor(tender.status)}>
                                  {tender.status}
                                </Badge>
                                <Badge className={getPriorityColor(tender.priority)}>
                                  {tender.priority}
                                </Badge>
                              </div>
                              <CardTitle className="text-lg text-white">
                                {tender.title}
                              </CardTitle>
                              <CardDescription className="text-white/70">
                                {tender.category}
                              </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                              <div className="grid grid-cols-2 gap-2 text-sm">
                                <div>
                                  <span className="text-white/60">Value:</span>
                                  <p className="font-medium text-white">
                                    {tender.value}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-white/60">Deadline:</span>
                                  <p className="font-medium text-white">
                                    {tender.deadline}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-white/60">Bids:</span>
                                  <p className="font-medium text-white">
                                    {tender.bids}
                                  </p>
                                </div>
                                <div>
                                  <span className="text-white/60">Views:</span>
                                  <p className="font-medium text-white">
                                    {tender.views}
                                  </p>
                                </div>
                              </div>

                              <div className="flex items-center gap-2 text-sm text-white/60">
                                <Building className="w-4 h-4" />
                                <span>{tender.location}</span>
                              </div>

                              {tender.evaluationScore && (
                                <div className="flex items-center gap-2">
                                  <Star className="w-4 h-4 text-yellow-400" />
                                  <span className="text-sm text-white">
                                    Score: {tender.evaluationScore}/100
                                  </span>
                                </div>
                              )}

                              <div className="flex gap-2 pt-2">
                                <Button
                                  asChild
                                  size="sm"
                                  className="flex-1 bg-blue-600 hover:bg-blue-700"
                                >
                                  <Link to={`/tenders/tender/${tender.id}`}>
                                    <Eye className="w-4 h-4 mr-2" />
                                    View Details
                                  </Link>
                                </Button>
                                {tender.status === "Draft" && (
                                  <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="border-white/20 text-white hover:bg-white/10"
                                  >
                                    <Link to={`/tenders/edit/${tender.id}`}>
                                      <Edit className="w-4 h-4" />
                                    </Link>
                                  </Button>
                                )}
                                {tender.status === "Active" && (
                                  <Button
                                    asChild
                                    size="sm"
                                    variant="outline"
                                    className="border-white/20 text-white hover:bg-white/10"
                                  >
                                    <Link to={`/bids/submit/${tender.id}`}>
                                      <Users className="w-4 h-4" />
                                    </Link>
                                  </Button>
                                )}
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                    </div>
                  ) : (
                    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                      <Table>
                        <TableHeader>
                          <TableRow className="border-white/20">
                            <TableHead className="text-white/80">Title</TableHead>
                            <TableHead className="text-white/80">
                              Category
                            </TableHead>
                            <TableHead className="text-white/80">Status</TableHead>
                            <TableHead className="text-white/80">Value</TableHead>
                            <TableHead className="text-white/80">Bids</TableHead>
                            <TableHead className="text-white/80">
                              Deadline
                            </TableHead>
                            <TableHead className="text-white/80">Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {filteredTenders
                            .filter(
                              (tender) =>
                                tender.status.toLowerCase() === status
                            )
                            .map((tender) => (
                              <TableRow
                                key={tender.id}
                                className="border-white/10 hover:bg-white/5"
                              >
                                <TableCell>
                                  <div>
                                    <p className="font-medium text-white">
                                      {tender.title}
                                    </p>
                                    <p className="text-sm text-white/60">
                                      {tender.location}
                                    </p>
                                  </div>
                                </TableCell>
                                <TableCell className="text-white">
                                  {tender.category}
                                </TableCell>
                                <TableCell>
                                  <Badge className={getStatusColor(tender.status)}>
                                    {tender.status}
                                  </Badge>
                                </TableCell>
                                <TableCell className="text-white font-medium">
                                  {tender.value}
                                </TableCell>
                                <TableCell className="text-white">
                                  {tender.bids}
                                </TableCell>
                                <TableCell className="text-white">
                                  {tender.deadline}
                                </TableCell>
                                <TableCell>
                                  <div className="flex gap-2">
                                    <Button
                                      asChild
                                      size="sm"
                                      variant="outline"
                                      className="border-white/20 text-white hover:bg-white/10"
                                    >
                                      <Link to={`/tenders/tender/${tender.id}`}>
                                        <Eye className="w-4 h-4" />
                                      </Link>
                                    </Button>
                                    {tender.status === "Active" &&
                                      tender.bids > 0 && (
                                        <Button
                                          asChild
                                          size="sm"
                                          variant="outline"
                                          className="border-white/20 text-white hover:bg-white/10"
                                        >
                                          <Link
                                            to={`/evaluation/panel/${tender.id}`}
                                          >
                                            <Star className="w-4 h-4" />
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
                  )
                ) : (
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardContent className="text-center py-8">
                      <Building className="w-12 h-12 text-white/40 mx-auto mb-4" />
                      <p className="text-white/60">No {status} tenders found</p>
                      <p className="text-white/40 text-sm mt-2">
                        {status === "draft" &&
                          "Create a new tender to get started"}
                        {status === "active" &&
                          "Publish draft tenders to see them here"}
                        {status === "evaluation" &&
                          "Active tenders with bids will appear here"}
                        {status === "closed" &&
                          "Completed tenders will be listed here"}
                      </p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TenderOverview;
