
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Building2, MapPin, DollarSign, Calendar, Search, Filter, Plus, Eye, Edit, BarChart3, Wrench, TrendingUp, AlertTriangle } from "lucide-react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import Breadcrumb from "@/components/Breadcrumb";

interface Property {
  id: string;
  name: string;
  address: string;
  type: "Commercial" | "Residential" | "Mixed Use";
  status: "Active" | "Maintenance" | "Vacant";
  value: number;
  units: number;
  lastInspection: string;
  activeTenders: number;
  maintenanceScore: number;
  monthlyRevenue: number;
  image: string;
}

const PropertyPortfolio = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "table">("grid");

  const properties: Property[] = [
    {
      id: "1",
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
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop"
    },
    {
      id: "2",
      name: "Broadway Heights",
      address: "567 Broadway Ave, New York, NY 10012",
      type: "Residential",
      status: "Maintenance",
      value: 4200000,
      units: 48,
      lastInspection: "2024-01-08",
      activeTenders: 5,
      maintenanceScore: 72,
      monthlyRevenue: 72000,
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop"
    },
    {
      id: "3",
      name: "Tech District Tower",
      address: "890 Innovation Dr, Austin, TX 78701",
      type: "Commercial",
      status: "Active",
      value: 6750000,
      units: 36,
      lastInspection: "2024-01-20",
      activeTenders: 2,
      maintenanceScore: 92,
      monthlyRevenue: 95000,
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop"
    },
    {
      id: "4",
      name: "Harbor View Apartments",
      address: "321 Harbor St, Miami, FL 33101",
      type: "Residential",
      status: "Active",
      value: 3400000,
      units: 52,
      lastInspection: "2024-01-12",
      activeTenders: 1,
      maintenanceScore: 88,
      monthlyRevenue: 58000,
      image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop"
    },
    {
      id: "5",
      name: "Downtown Mixed Plaza",
      address: "456 Main St, Chicago, IL 60601",
      type: "Mixed Use",
      status: "Vacant",
      value: 5100000,
      units: 32,
      lastInspection: "2023-12-28",
      activeTenders: 7,
      maintenanceScore: 65,
      monthlyRevenue: 0,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop"
    }
  ];

  const filteredProperties = properties.filter(property => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || property.status.toLowerCase() === statusFilter;
    const matchesType = typeFilter === "all" || property.type.toLowerCase().replace(" ", "") === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-500/20 text-green-300 border-green-400/20";
      case "Maintenance": return "bg-yellow-500/20 text-yellow-300 border-yellow-400/20";
      case "Vacant": return "bg-red-500/20 text-red-300 border-red-400/20";
      default: return "bg-gray-500/20 text-gray-300 border-gray-400/20";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const totalValue = properties.reduce((sum, prop) => sum + prop.value, 0);
  const totalRevenue = properties.reduce((sum, prop) => sum + prop.monthlyRevenue, 0);
  const avgMaintenanceScore = Math.round(properties.reduce((sum, prop) => sum + prop.maintenanceScore, 0) / properties.length);

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <Breadcrumb />
          
          {/* Header Section */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent mb-2">
                Property Portfolio
              </h1>
              <p className="text-gray-400 text-lg">Manage your property portfolio and assets across the USA</p>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl">
                <BarChart3 className="w-4 h-4 mr-2" />
                Analytics
              </Button>
              <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-2xl shadow-blue-500/25">
                <Plus className="w-4 h-4 mr-2" />
                Add Property
              </Button>
            </div>
          </div>

          {/* Portfolio Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Total Portfolio Value</p>
                    <p className="text-2xl font-bold text-white">${(totalValue / 1000000).toFixed(1)}M</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-green-500/20 to-emerald-500/20 rounded-xl flex items-center justify-center">
                    <DollarSign className="w-6 h-6 text-green-400" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-green-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +12.5% vs last quarter
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Monthly Revenue</p>
                    <p className="text-2xl font-bold text-white">${(totalRevenue / 1000).toFixed(0)}K</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-xl flex items-center justify-center">
                    <BarChart3 className="w-6 h-6 text-blue-400" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-blue-400 text-sm">
                  <TrendingUp className="w-4 h-4 mr-1" />
                  +8.2% vs last month
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Properties</p>
                    <p className="text-2xl font-bold text-white">{properties.length}</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-500/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-purple-400" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-gray-400 text-sm">
                  <Building2 className="w-4 h-4 mr-1" />
                  {properties.reduce((sum, p) => sum + p.units, 0)} total units
                </div>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-400 text-sm">Avg Maintenance Score</p>
                    <p className={`text-2xl font-bold ${getScoreColor(avgMaintenanceScore)}`}>{avgMaintenanceScore}%</p>
                  </div>
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-500/20 rounded-xl flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-orange-400" />
                  </div>
                </div>
                <div className="flex items-center mt-2 text-orange-400 text-sm">
                  <AlertTriangle className="w-4 h-4 mr-1" />
                  {properties.filter(p => p.maintenanceScore < 75).length} need attention
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Filters and Search */}
          <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
                <div className="flex flex-1 items-center space-x-4">
                  <div className="relative flex-1 max-w-md">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="Search properties..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10 bg-white/10 border-white/20 text-white placeholder-gray-400"
                    />
                  </div>
                  
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/20">
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="maintenance">Maintenance</SelectItem>
                      <SelectItem value="vacant">Vacant</SelectItem>
                    </SelectContent>
                  </Select>

                  <Select value={typeFilter} onValueChange={setTypeFilter}>
                    <SelectTrigger className="w-40 bg-white/10 border-white/20 text-white">
                      <SelectValue placeholder="Type" />
                    </SelectTrigger>
                    <SelectContent className="bg-gray-800 border-white/20">
                      <SelectItem value="all">All Types</SelectItem>
                      <SelectItem value="commercial">Commercial</SelectItem>
                      <SelectItem value="residential">Residential</SelectItem>
                      <SelectItem value="mixeduse">Mixed Use</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center space-x-2">
                  <Button
                    variant={viewMode === "grid" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className={viewMode === "grid" ? "bg-blue-600 hover:bg-blue-700" : "border-white/20 text-white hover:bg-white/10"}
                  >
                    Grid
                  </Button>
                  <Button
                    variant={viewMode === "table" ? "default" : "outline"}
                    size="sm"
                    onClick={() => setViewMode("table")}
                    className={viewMode === "table" ? "bg-blue-600 hover:bg-blue-700" : "border-white/20 text-white hover:bg-white/10"}
                  >
                    Table
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Properties Display */}
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProperties.map((property) => (
                <Card key={property.id} className="group bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20 hover:bg-white/15 transition-all duration-300 hover:scale-105 overflow-hidden">
                  <div className="relative">
                    <img 
                      src={property.image} 
                      alt={property.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute top-4 left-4">
                      <Badge className={`${getStatusColor(property.status)} backdrop-blur-sm`}>
                        {property.status}
                      </Badge>
                    </div>
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/20 backdrop-blur-sm">
                        {property.type}
                      </Badge>
                    </div>
                  </div>
                  
                  <CardHeader>
                    <CardTitle className="text-white group-hover:text-blue-200 transition-colors text-lg">
                      {property.name}
                    </CardTitle>
                    <CardDescription className="text-gray-400 flex items-center">
                      <MapPin className="w-4 h-4 mr-1" />
                      {property.address}
                    </CardDescription>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Value</span>
                        <span className="text-white font-semibold">${(property.value / 1000000).toFixed(1)}M</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Monthly Revenue</span>
                        <span className="text-green-400 font-semibold">${(property.monthlyRevenue / 1000).toFixed(0)}K</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Maintenance Score</span>
                        <span className={`font-semibold ${getScoreColor(property.maintenanceScore)}`}>
                          {property.maintenanceScore}%
                        </span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-gray-400">Active Tenders</span>
                        <span className="text-blue-400 font-semibold">{property.activeTenders}</span>
                      </div>
                    </div>
                    
                    <div className="flex space-x-2 mt-6">
                      <Button size="sm" className="flex-1 bg-blue-600 hover:bg-blue-700" asChild>
                        <Link to={`/properties/property/${property.id}`}>
                          <Eye className="w-4 h-4 mr-1" />
                          View
                        </Link>
                      </Button>
                      <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border-white/20">
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow className="border-white/10">
                      <TableHead className="text-gray-300">Property</TableHead>
                      <TableHead className="text-gray-300">Type</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Value</TableHead>
                      <TableHead className="text-gray-300">Revenue</TableHead>
                      <TableHead className="text-gray-300">Score</TableHead>
                      <TableHead className="text-gray-300">Tenders</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredProperties.map((property) => (
                      <TableRow key={property.id} className="border-white/10 hover:bg-white/5">
                        <TableCell>
                          <div className="flex items-center space-x-3">
                            <img 
                              src={property.image} 
                              alt={property.name}
                              className="w-12 h-12 rounded-lg object-cover"
                            />
                            <div>
                              <div className="text-white font-medium">{property.name}</div>
                              <div className="text-gray-400 text-sm flex items-center">
                                <MapPin className="w-3 h-3 mr-1" />
                                {property.address.split(',')[0]}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/20">
                            {property.type}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(property.status)}>
                            {property.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-white">${(property.value / 1000000).toFixed(1)}M</TableCell>
                        <TableCell className="text-green-400">${(property.monthlyRevenue / 1000).toFixed(0)}K</TableCell>
                        <TableCell className={getScoreColor(property.maintenanceScore)}>
                          {property.maintenanceScore}%
                        </TableCell>
                        <TableCell className="text-blue-400">{property.activeTenders}</TableCell>
                        <TableCell>
                          <div className="flex items-center space-x-2">
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10" asChild>
                              <Link to={`/properties/property/${property.id}`}>
                                <Eye className="w-4 h-4" />
                              </Link>
                            </Button>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Edit className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}

          {/* Quick Links */}
          <div className="mt-8">
            <h3 className="text-xl font-semibold text-white mb-4">Quick Actions</h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl h-auto p-4">
                <Link to="/properties/maintenance" className="flex flex-col items-center space-y-2">
                  <Wrench className="w-6 h-6" />
                  <span>Maintenance Planning</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl h-auto p-4">
                <Link to="/properties/cost-analysis" className="flex flex-col items-center space-y-2">
                  <BarChart3 className="w-6 h-6" />
                  <span>Cost Analysis</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl h-auto p-4">
                <Link to="/tenders" className="flex flex-col items-center space-y-2">
                  <Building2 className="w-6 h-6" />
                  <span>Create Tender</span>
                </Link>
              </Button>
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10 backdrop-blur-xl h-auto p-4">
                <Link to="/vendors" className="flex flex-col items-center space-y-2">
                  <Building2 className="w-6 h-6" />
                  <span>Find Contractors</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyPortfolio;
