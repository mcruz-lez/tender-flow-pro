
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Search, Filter, Calendar, Grid3X3, List } from "lucide-react";
import { Link } from "react-router-dom";

const TenderOverview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");

  const tenders = [
    {
      id: "1",
      title: "HVAC System Maintenance Contract",
      category: "Property Maintenance",
      status: "Active",
      deadline: "2024-01-15",
      value: "$50,000",
      bids: 8
    },
    {
      id: "2", 
      title: "Security Services for Commercial Buildings",
      category: "Security Services",
      status: "Draft",
      deadline: "2024-01-20",
      value: "$75,000",
      bids: 0
    },
    {
      id: "3",
      title: "Landscaping and Groundskeeping Services",
      category: "Landscaping",
      status: "Closed",
      deadline: "2023-12-30",
      value: "$30,000",
      bids: 12
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Draft": return "bg-yellow-100 text-yellow-800";
      case "Closed": return "bg-gray-100 text-gray-800";
      default: return "bg-blue-100 text-blue-800";
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Tender Management</h1>
              <p className="text-gray-600 mt-2">Create, manage, and track all your tenders</p>
            </div>
            <Button asChild className="bg-blue-600 hover:bg-blue-700">
              <Link to="/tenders/create">
                <Plus className="w-4 h-4 mr-2" />
                Create Tender
              </Link>
            </Button>
          </div>

          {/* Search and Filters */}
          <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search tenders..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
                <div className="flex border rounded-md">
                  <Button
                    variant={viewMode === "grid" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("grid")}
                    className="rounded-r-none"
                  >
                    <Grid3X3 className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === "list" ? "default" : "ghost"}
                    size="sm"
                    onClick={() => setViewMode("list")}
                    className="rounded-l-none"
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Tender Status Tabs */}
          <Tabs defaultValue="all" className="space-y-6">
            <TabsList>
              <TabsTrigger value="all">All Tenders</TabsTrigger>
              <TabsTrigger value="active">Active</TabsTrigger>
              <TabsTrigger value="draft">Draft</TabsTrigger>
              <TabsTrigger value="closed">Closed</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
                {tenders.map((tender) => (
                  <Card key={tender.id} className="hover:shadow-md transition-shadow cursor-pointer">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <Badge className={getStatusColor(tender.status)}>
                          {tender.status}
                        </Badge>
                        <span className="text-sm text-gray-500">ID: {tender.id}</span>
                      </div>
                      <CardTitle className="text-lg">{tender.title}</CardTitle>
                      <CardDescription>{tender.category}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Value:</span>
                          <span className="font-medium">{tender.value}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Deadline:</span>
                          <span className="font-medium">{tender.deadline}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">Bids:</span>
                          <span className="font-medium">{tender.bids}</span>
                        </div>
                      </div>
                      <div className="mt-4 pt-4 border-t border-gray-100">
                        <Button asChild variant="outline" size="sm" className="w-full">
                          <Link to={`/tenders/tender/${tender.id}`}>
                            View Details
                          </Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="active">
              <div className="text-center py-8">
                <p className="text-gray-500">Active tenders will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="draft">
              <div className="text-center py-8">
                <p className="text-gray-500">Draft tenders will be displayed here</p>
              </div>
            </TabsContent>

            <TabsContent value="closed">
              <div className="text-center py-8">
                <p className="text-gray-500">Closed tenders will be displayed here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TenderOverview;
