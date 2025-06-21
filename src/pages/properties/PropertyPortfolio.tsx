import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  BarChart3,
  Wrench,
  TrendingUp,
  AlertTriangle,
} from "lucide-react";
import { Link } from "react-router-dom";
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
      image:
        "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=300&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&h=300&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&h=300&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=400&h=300&fit=crop",
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
      image:
        "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop",
    },
  ];

  const filteredProperties = properties.filter((property) => {
    const matchesSearch =
      property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      property.address.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus =
      statusFilter === "all" || property.status.toLowerCase() === statusFilter;
    const matchesType =
      typeFilter === "all" ||
      property.type.toLowerCase().replace(" ", "") === typeFilter;
    return matchesSearch && matchesStatus && matchesType;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active":
        return "bg-green-500/20 text-green-300 border-green-400/20";
      case "Maintenance":
        return "bg-yellow-500/20 text-yellow-300 border-yellow-400/20";
      case "Vacant":
        return "bg-red-500/20 text-red-300 border-red-400/20";
      default:
        return "bg-gray-500/20 text-gray-300 border-gray-400/20";
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return "text-green-400";
    if (score >= 70) return "text-yellow-400";
    return "text-red-400";
  };

  const totalValue = properties.reduce((sum, prop) => sum + prop.value, 0);
  const totalRevenue = properties.reduce(
    (sum, prop) => sum + prop.monthlyRevenue,
    0,
  );
  const avgMaintenanceScore = Math.round(
    properties.reduce((sum, prop) => sum + prop.maintenanceScore, 0) /
      properties.length,
  );

  const portfolioSummary = [
    { label: "Total Properties", value: properties.length },
    {
      label: "Total Value",
      value: `$${properties.reduce((a, p) => a + p.value, 0).toLocaleString()}`,
    },
    { label: "Avg. Occupancy", value: "91%" },
    {
      label: "Monthly Revenue",
      value: `$${properties.reduce((a, p) => a + p.monthlyRevenue, 0).toLocaleString()}`,
    },
  ];

  const typeData = [
    {
      name: "Commercial",
      value: properties.filter((p) => p.type === "Commercial").length,
      color: "#3b82f6",
    },
    {
      name: "Residential",
      value: properties.filter((p) => p.type === "Residential").length,
      color: "#10b981",
    },
    {
      name: "Mixed Use",
      value: properties.filter((p) => p.type === "Mixed Use").length,
      color: "#f59e0b",
    },
  ];

  const aiInsights = [
    "2 properties flagged for upcoming maintenance risk.",
    "Portfolio value increased 4% in last quarter.",
    "AI suggests optimizing lease terms for 3 units.",
  ];

  return (
    <div className="flex">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen((v) => !v)}
      />
      <main className="flex-1 p-6">
        <Breadcrumb />
        <h1 className="text-3xl font-bold mb-2">Property Portfolio</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {portfolioSummary.map((item, idx) => (
            <Card key={idx} className="text-center">
              <CardHeader>
                <CardTitle>{item.label}</CardTitle>
              </CardHeader>
              <CardContent className="text-2xl font-bold">
                {item.value}
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Property Types</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <PieChart>
                  <Pie
                    data={typeData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={60}
                  >
                    {typeData.map((entry, idx) => (
                      <Cell key={idx} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart
                  data={properties.map((p) => ({
                    name: p.name,
                    revenue: p.monthlyRevenue,
                  }))}
                >
                  <XAxis dataKey="name" hide />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="revenue" fill="#3b82f6" />
                </BarChart>
              </ResponsiveContainer>
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
        <div className="flex justify-between items-center mb-4">
          <div className="flex gap-2">
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Maintenance">Maintenance</SelectItem>
                <SelectItem value="Vacant">Vacant</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="Commercial">Commercial</SelectItem>
                <SelectItem value="Residential">Residential</SelectItem>
                <SelectItem value="Mixed Use">Mixed Use</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button asChild variant="outline">
            <Link to="/properties/create">
              <Plus className="mr-2" />
              Add Property
            </Link>
          </Button>
        </div>
        <div className="mb-8 flex gap-2">
          <Button
            variant={viewMode === "grid" ? "default" : "outline"}
            onClick={() => setViewMode("grid")}
          >
            Grid
          </Button>
          <Button
            variant={viewMode === "table" ? "default" : "outline"}
            onClick={() => setViewMode("table")}
          >
            Table
          </Button>
        </div>
        {viewMode === "grid" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties
              .filter(
                (p) =>
                  (statusFilter === "all" || p.status === statusFilter) &&
                  (typeFilter === "all" || p.type === typeFilter) &&
                  p.name.toLowerCase().includes(searchTerm.toLowerCase()),
              )
              .map((property) => (
                <Card key={property.id} className="relative">
                  <img
                    src={property.image}
                    alt={property.name}
                    className="w-full h-32 object-cover rounded-t"
                  />
                  <CardHeader>
                    <CardTitle>{property.name}</CardTitle>
                    <CardDescription>{property.address}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 mb-2">
                      <Badge>{property.type}</Badge>
                      <Badge variant="secondary">{property.status}</Badge>
                      <Badge variant="outline">
                        ${property.value.toLocaleString()}
                      </Badge>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>
                        <Building2 className="inline w-4 h-4 mr-1" />
                        {property.units} units
                      </span>
                      <span>
                        <Calendar className="inline w-4 h-4 mr-1" />
                        Last Inspection: {property.lastInspection}
                      </span>
                    </div>
                    <div className="flex justify-between text-xs text-gray-500 mb-2">
                      <span>
                        <BarChart3 className="inline w-4 h-4 mr-1" />
                        Score: {property.maintenanceScore}
                      </span>
                      <span>
                        <DollarSign className="inline w-4 h-4 mr-1" />$
                        {property.monthlyRevenue.toLocaleString()}/mo
                      </span>
                    </div>
                    <div className="flex gap-2 mt-2">
                      <Button asChild size="sm" variant="secondary">
                        <Link to={`/properties/${property.id}`}>Details</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/tenders?property=${property.id}`}>
                          Tenders
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/maintenance?property=${property.id}`}>
                          Maintenance
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Value</TableHead>
                <TableHead>Units</TableHead>
                <TableHead>Revenue</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {properties
                .filter(
                  (p) =>
                    (statusFilter === "all" || p.status === statusFilter) &&
                    (typeFilter === "all" || p.type === typeFilter) &&
                    p.name.toLowerCase().includes(searchTerm.toLowerCase()),
                )
                .map((property) => (
                  <TableRow key={property.id}>
                    <TableCell>{property.name}</TableCell>
                    <TableCell>{property.type}</TableCell>
                    <TableCell>{property.status}</TableCell>
                    <TableCell>${property.value.toLocaleString()}</TableCell>
                    <TableCell>{property.units}</TableCell>
                    <TableCell>
                      ${property.monthlyRevenue.toLocaleString()}
                    </TableCell>
                    <TableCell>
                      <Button asChild size="sm" variant="secondary">
                        <Link to={`/properties/${property.id}`}>Details</Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/tenders?property=${property.id}`}>
                          Tenders
                        </Link>
                      </Button>
                      <Button asChild size="sm" variant="outline">
                        <Link to={`/maintenance?property=${property.id}`}>
                          Maintenance
                        </Link>
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        )}
      </main>
    </div>
  );
};

export default PropertyPortfolio;
