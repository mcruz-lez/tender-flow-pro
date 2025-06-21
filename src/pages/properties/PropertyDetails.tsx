import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Users,
  Wrench,
  FileText,
  BarChart3,
  Edit,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
} from "lucide-react";
import DashboardSidebar from "@/components/DashboardSidebar";
import Breadcrumb from "@/components/Breadcrumb";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

const PropertyDetails = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Mock property data - in real app this would come from API
  const property = {
    id: id || "1",
    name: "Sunset Plaza Complex",
    address: "1234 Sunset Blvd, Los Angeles, CA 90028",
    type: "Commercial",
    status: "Active",
    value: 2850000,
    units: 24,
    lastInspection: "2024-01-15",
    activeTenders: 3,
    maintenanceScore: 85,
    monthlyRevenue: 48000,
    yearBuilt: 2018,
    totalArea: 45000,
    occupancyRate: 92,
    manager: "Sarah Johnson",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=400&fit=crop",
  };

  const tenders = [
    {
      id: "T001",
      title: "HVAC System Upgrade",
      status: "Active",
      budget: 45000,
      bids: 8,
      deadline: "2024-02-15",
    },
    {
      id: "T002",
      title: "Parking Lot Resurfacing",
      status: "Evaluation",
      budget: 28000,
      bids: 12,
      deadline: "2024-02-10",
    },
    {
      id: "T003",
      title: "Security System Installation",
      status: "Active",
      budget: 35000,
      bids: 6,
      deadline: "2024-02-20",
    },
  ];

  const maintenanceHistory = [
    {
      date: "2024-01-15",
      task: "Annual HVAC Inspection",
      status: "Completed",
      cost: 850,
      contractor: "Cool Air Systems",
    },
    {
      date: "2024-01-08",
      task: "Elevator Maintenance",
      status: "Completed",
      cost: 1200,
      contractor: "Vertical Solutions",
    },
    {
      date: "2023-12-20",
      task: "Fire Safety Check",
      status: "Completed",
      cost: 650,
      contractor: "Safe Guard Inc",
    },
    {
      date: "2024-01-22",
      task: "Plumbing Repair - Unit 12",
      status: "In Progress",
      cost: 0,
      contractor: "Flow Masters",
    },
  ];

  const documents = [
    {
      name: "Property Insurance Policy",
      type: "Insurance",
      date: "2024-01-01",
      size: "2.3 MB",
    },
    {
      name: "Annual Inspection Report",
      type: "Inspection",
      date: "2024-01-15",
      size: "5.1 MB",
    },
    {
      name: "Tenant Lease Agreements",
      type: "Legal",
      date: "2023-12-01",
      size: "8.7 MB",
    },
    {
      name: "Maintenance Contracts",
      type: "Contract",
      date: "2023-11-15",
      size: "3.2 MB",
    },
  ];

  const financialData = [
    { month: "Jan", revenue: 48000, expenses: 12000 },
    { month: "Feb", revenue: 47000, expenses: 11000 },
    { month: "Mar", revenue: 49500, expenses: 13000 },
    { month: "Apr", revenue: 50000, expenses: 12500 },
  ];

  const occupancyData = [
    { name: "Occupied", value: 22, color: "#10b981" },
    { name: "Vacant", value: 2, color: "#f59e0b" },
  ];

  const aiInsights = [
    "AI predicts 95% occupancy next quarter.",
    "Maintenance costs expected to decrease by 8%.",
    "Suggests renegotiating 2 vendor contracts for savings.",
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300 border-green-400/20";
      case "Evaluation":
        return "bg-blue-500/20 text-blue-300 border-blue-400/20";
      case "Completed":
        return "bg-green-500/20 text-green-300 border-green-400/20";
      case "In Progress":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/20";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/20";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}
      >
        <div className="p-6">
          <Breadcrumb />

          {/* Property Header */}
          <div className="relative mb-8 rounded-3xl overflow-hidden shadow-xl drop-shadow-lg">
            <img
              src={property.image}
              alt={property.name}
              className="w-full h-64 object-cover scale-105 blur-[1px] brightness-75 transition-all duration-500" // subtle 3D effect
            />
            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
            <div className="absolute bottom-6 left-6 right-6">
              <div className="flex justify-between items-end">
                <div>
                  <div className="flex items-center space-x-3 mb-2">
                    <Badge className="bg-green-500/20 text-green-300 border-green-400/20 backdrop-blur-sm animate-pulse">
                      {property.status}
                    </Badge>
                    <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/20 backdrop-blur-sm">
                      {property.type}
                    </Badge>
                  </div>
                  <h1 className="text-4xl font-bold text-white mb-2 drop-shadow-lg tracking-tight">
                    {property.name}
                  </h1>
                  <p className="text-gray-300 flex items-center text-lg">
                    <MapPin className="w-5 h-5 mr-2" />
                    {property.address}
                  </p>
                </div>
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25 rounded-xl font-semibold text-lg transition-all">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Property
                </Button>
              </div>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {/* Property Value */}
            <Card className="bg-gradient-to-br from-indigo-900/40 to-blue-900/10 rounded-2xl shadow-xl border border-white/20 hover:scale-105 hover:shadow-indigo-300 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Property Value</p>
                    <p className="text-2xl font-bold text-white">
                      ${(property.value / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-green-400 drop-shadow-lg" />
                </div>
              </CardContent>
            </Card>
            {/* Monthly Revenue */}
            <Card className="bg-gradient-to-br from-blue-900/40 to-indigo-900/10 rounded-2xl shadow-xl border border-white/20 hover:scale-105 hover:shadow-blue-300 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-white">
                      ${(property.monthlyRevenue / 1000).toFixed(0)}K
                    </p>
                  </div>
                  <BarChart3 className="w-8 h-8 text-blue-400 drop-shadow-lg" />
                </div>
              </CardContent>
            </Card>
            {/* Occupancy Rate */}
            <Card className="bg-gradient-to-br from-purple-900/40 to-indigo-900/10 rounded-2xl shadow-xl border border-white/20 hover:scale-105 hover:shadow-purple-300 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Occupancy Rate</p>
                    <p className="text-2xl font-bold text-white">
                      {property.occupancyRate}%
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-purple-400 drop-shadow-lg" />
                </div>
              </CardContent>
            </Card>
            {/* Maintenance Score */}
            <Card className="bg-gradient-to-br from-green-900/40 to-blue-900/10 rounded-2xl shadow-xl border border-white/20 hover:scale-105 hover:shadow-green-300 transition-all">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Maintenance Score</p>
                    <p className="text-2xl font-bold text-green-400">
                      {property.maintenanceScore}%
                    </p>
                  </div>
                  <Wrench className="w-8 h-8 text-orange-400 drop-shadow-lg" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Detailed Information Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-xl border-white/20">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="tenders">Active Tenders</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
              <TabsTrigger value="analytics">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Property Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Year Built</span>
                      <span className="text-white">{property.yearBuilt}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Total Area</span>
                      <span className="text-white">
                        {property.totalArea.toLocaleString()} sq ft
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Units</span>
                      <span className="text-white">{property.units}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Property Manager</span>
                      <span className="text-white">{property.manager}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Last Inspection</span>
                      <span className="text-white">
                        {property.lastInspection}
                      </span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Quick Actions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      asChild
                    >
                      <Link to="/tenders/create">
                        <FileText className="w-4 h-4 mr-2" />
                        Create New Tender
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link to="/properties/maintenance">
                        <Wrench className="w-4 h-4 mr-2" />
                        Schedule Maintenance
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link to="/vendors">
                        <Users className="w-4 h-4 mr-2" />
                        Find Contractors
                      </Link>
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full border-white/20 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link to="/properties/cost-analysis">
                        <BarChart3 className="w-4 h-4 mr-2" />
                        View Analytics
                      </Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="tenders" className="space-y-6">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Active Tenders
                    <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                      <Link to="/tenders/create">
                        <FileText className="w-4 h-4 mr-2" />
                        Create Tender
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-gray-300">
                          Tender ID
                        </TableHead>
                        <TableHead className="text-gray-300">Title</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Budget</TableHead>
                        <TableHead className="text-gray-300">Bids</TableHead>
                        <TableHead className="text-gray-300">
                          Deadline
                        </TableHead>
                        <TableHead className="text-gray-300">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {tenders.map((tender) => (
                        <TableRow
                          key={tender.id}
                          className="border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="text-blue-400">
                            {tender.id}
                          </TableCell>
                          <TableCell className="text-white">
                            {tender.title}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(tender.status)}>
                              {tender.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">
                            ${tender.budget.toLocaleString()}
                          </TableCell>
                          <TableCell className="text-white">
                            {tender.bids}
                          </TableCell>
                          <TableCell className="text-white">
                            {tender.deadline}
                          </TableCell>
                          <TableCell>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-white/20 text-white hover:bg-white/10"
                              asChild
                            >
                              <Link to={`/tenders/tender/${tender.id}`}>
                                View
                              </Link>
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="maintenance" className="space-y-6">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Maintenance History
                    <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                      <Link to="/properties/maintenance">
                        <Wrench className="w-4 h-4 mr-2" />
                        Schedule Maintenance
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/10">
                        <TableHead className="text-gray-300">Date</TableHead>
                        <TableHead className="text-gray-300">Task</TableHead>
                        <TableHead className="text-gray-300">Status</TableHead>
                        <TableHead className="text-gray-300">Cost</TableHead>
                        <TableHead className="text-gray-300">
                          Contractor
                        </TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {maintenanceHistory.map((item, index) => (
                        <TableRow
                          key={index}
                          className="border-white/10 hover:bg-white/5"
                        >
                          <TableCell className="text-white">
                            {item.date}
                          </TableCell>
                          <TableCell className="text-white">
                            {item.task}
                          </TableCell>
                          <TableCell>
                            <Badge className={getStatusColor(item.status)}>
                              {item.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">
                            {item.cost > 0
                              ? `$${item.cost.toLocaleString()}`
                              : "TBD"}
                          </TableCell>
                          <TableCell className="text-white">
                            {item.contractor}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="documents" className="space-y-6">
              <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
                <CardHeader>
                  <CardTitle className="text-white flex items-center justify-between">
                    Property Documents
                    <Button className="bg-blue-600 hover:bg-blue-700" asChild>
                      <Link to="/documents">
                        <FileText className="w-4 h-4 mr-2" />
                        Manage Documents
                      </Link>
                    </Button>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="p-4 rounded-lg bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
                      >
                        <div className="flex items-center justify-between mb-2">
                          <h4 className="text-white font-medium">{doc.name}</h4>
                          <Badge
                            variant="outline"
                            className="border-white/20 text-gray-300"
                          >
                            {doc.type}
                          </Badge>
                        </div>
                        <div className="text-sm text-gray-400">
                          <p>Date: {doc.date}</p>
                          <p>Size: {doc.size}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 rounded-2xl shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">Revenue Trends</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8 animate-fade-in-up">
                      <BarChart3 className="w-16 h-16 text-blue-400 mx-auto mb-4 animate-bounce" />
                      <p className="text-gray-400">
                        Revenue analytics charts would be displayed here
                      </p>
                      <Button
                        className="mt-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-md rounded-lg transition-all"
                        asChild
                      >
                        <Link to="/properties/property-roi">
                          View Full Analytics
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 rounded-2xl shadow-xl">
                  <CardHeader>
                    <CardTitle className="text-white">
                      Maintenance Costs
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center py-8">
                      <Wrench className="w-16 h-16 text-orange-400 mx-auto mb-4" />
                      <p className="text-gray-400">
                        Maintenance cost breakdown would be displayed here
                      </p>
                      <Button
                        className="mt-4 bg-blue-600 hover:bg-blue-700"
                        asChild
                      >
                        <Link to="/properties/cost-analysis">
                          View Cost Analysis
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>

          {/* New Analytics Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Financial Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <BarChart data={financialData}>
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="revenue" fill="#3b82f6" name="Revenue" />
                    <Bar dataKey="expenses" fill="#f59e0b" name="Expenses" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
              <CardHeader>
                <CardTitle className="text-white">Occupancy</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={200}>
                  <PieChart>
                    <Pie
                      data={occupancyData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={60}
                    >
                      {occupancyData.map((entry, idx) => (
                        <Cell key={idx} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-between mt-2">
                  <span>Occupied: 22</span>
                  <span>Vacant: 2</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card className="mb-8">
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {aiInsights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Tabs defaultValue="tenders" className="mb-8">
            <TabsList>
              <TabsTrigger value="tenders">Tenders</TabsTrigger>
              <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
              <TabsTrigger value="documents">Documents</TabsTrigger>
            </TabsList>
            <TabsContent value="tenders">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Budget</TableHead>
                    <TableHead>Bids</TableHead>
                    <TableHead>Deadline</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tenders.map((tender) => (
                    <TableRow key={tender.id}>
                      <TableCell>{tender.title}</TableCell>
                      <TableCell>{tender.status}</TableCell>
                      <TableCell>${tender.budget.toLocaleString()}</TableCell>
                      <TableCell>{tender.bids}</TableCell>
                      <TableCell>{tender.deadline}</TableCell>
                      <TableCell>
                        <Button asChild size="sm" variant="secondary">
                          <Link to={`/tenders/${tender.id}`}>View</Link>
                        </Button>
                        <Button asChild size="sm" variant="outline">
                          <Link to={`/contracts?property=${property.id}`}>
                            Contracts
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="maintenance">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Date</TableHead>
                    <TableHead>Task</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Cost</TableHead>
                    <TableHead>Contractor</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {maintenanceHistory.map((m, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{m.date}</TableCell>
                      <TableCell>{m.task}</TableCell>
                      <TableCell>{m.status}</TableCell>
                      <TableCell>${m.cost.toLocaleString()}</TableCell>
                      <TableCell>{m.contractor}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
            <TabsContent value="documents">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Type</TableHead>
                    <TableHead>Date</TableHead>
                    <TableHead>Size</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {documents.map((doc, idx) => (
                    <TableRow key={idx}>
                      <TableCell>{doc.name}</TableCell>
                      <TableCell>{doc.type}</TableCell>
                      <TableCell>{doc.date}</TableCell>
                      <TableCell>{doc.size}</TableCell>
                      <TableCell>
                        <Button size="sm" variant="secondary">
                          Download
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TabsContent>
          </Tabs>
          <div className="flex gap-2">
            <Button asChild variant="outline">
              <Link to={`/vendors?property=${property.id}`}>View Vendors</Link>
            </Button>
            <Button asChild variant="outline">
              <Link to={`/analytics?property=${property.id}`}>Analytics</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetails;
