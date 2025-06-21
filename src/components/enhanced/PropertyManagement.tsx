import { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Building,
  MapPin,
  DollarSign,
  Users,
  Calendar,
  Plus,
  Search,
  Filter,
  TrendingUp,
  AlertCircle,
} from "lucide-react";
import { useProperties, useCreateProperty } from "@/hooks/useProperties";
import { useTenders } from "@/hooks/useTenders";
import { PropertyCard } from "./PropertyCard";
import { toast } from "sonner";

const animatedGradient =
  "bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 dark:from-[#23234a] dark:via-[#2a1e3f] dark:to-[#1e1e3f] shadow-2xl border-0 backdrop-blur-xl";
const glassCard =
  "rounded-2xl border-0 shadow-2xl bg-white/60 dark:bg-[#23234a]/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-400/30";
const badgePulse =
  "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-pulse after:bg-current after:opacity-20";

export const PropertyManagement = () => {
  const { data: properties, isLoading } = useProperties();
  const { data: tenders } = useTenders();
  const createProperty = useCreateProperty();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredProperties =
    properties?.filter((property) => {
      const matchesSearch =
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus =
        statusFilter === "all" || property.status === statusFilter;
      return matchesSearch && matchesStatus;
    }) || [];

  // Calculate property analytics
  const totalProperties = properties?.length || 0;
  const activeProperties =
    properties?.filter((p) => p.status === "active").length || 0;
  const totalValue =
    properties?.reduce((sum, p) => sum + (p.budget_annual || 0), 0) || 0;
  const avgSize =
    properties
      ?.filter((p) => p.size_sqft)
      .reduce((sum, p) => sum + (p.size_sqft || 0), 0) /
      (properties?.filter((p) => p.size_sqft).length || 1) || 0;

  // Property insights
  const propertiesWithTenders =
    properties?.filter((p) => tenders?.some((t) => t.property_id === p.id))
      .length || 0;

  const handleCreateTender = (propertyId: string) => {
    // Navigate to create tender with property pre-selected
    toast.info("Redirecting to create tender...");
  };

  const handleViewDetails = (propertyId: string) => {
    // Navigate to property details
    toast.info("Opening property details...");
  };

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardContent className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-8 bg-gray-200 rounded w-1/2"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Analytics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className={glassCard}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Total Properties
                </p>
                <p className="text-2xl font-bold">{totalProperties}</p>
                <p className="text-xs text-green-600">
                  {activeProperties} active
                </p>
              </div>
              <Building className="w-8 h-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card className={glassCard}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  Annual Budget
                </p>
                <p className="text-2xl font-bold">
                  ${(totalValue / 1000000).toFixed(1)}M
                </p>
                <p className="text-xs text-green-600">+8% from last year</p>
              </div>
              <DollarSign className="w-8 h-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card className={glassCard}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg. Size</p>
                <p className="text-2xl font-bold">
                  {(avgSize / 1000).toFixed(0)}K
                </p>
                <p className="text-xs text-gray-600">sq ft per property</p>
              </div>
              <MapPin className="w-8 h-8 text-purple-600" />
            </div>
          </CardContent>
        </Card>

        <Card className={glassCard}>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">
                  With Active Tenders
                </p>
                <p className="text-2xl font-bold">{propertiesWithTenders}</p>
                <p className="text-xs text-blue-600">
                  {Math.round((propertiesWithTenders / totalProperties) * 100)}%
                  of portfolio
                </p>
              </div>
              <TrendingUp className="w-8 h-8 text-orange-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div className="flex flex-1 gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search properties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>

          <div className="flex gap-2">
            {["all", "active", "inactive", "maintenance"].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? "default" : "outline"}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        <Button className={animatedGradient}>
          <Plus className="w-4 h-4 mr-2" />
          Add Property
        </Button>
      </div>

      {/* Properties Grid */}
      {filteredProperties.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Building className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No Properties Found
            </h3>
            <p className="text-gray-600 mb-4">
              {searchTerm || statusFilter !== "all"
                ? "No properties match your current filters"
                : "Get started by adding your first property"}
            </p>
            <Button className={animatedGradient}>
              <Plus className="w-4 h-4 mr-2" />
              Add Property
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProperties.map((property) => (
            <PropertyCard
              key={property.id}
              property={property}
              onViewDetails={handleViewDetails}
              onCreateTender={handleCreateTender}
            />
          ))}
        </div>
      )}

      {/* Property Insights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Property Performance</CardTitle>
            <CardDescription>Key metrics and trends</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Occupancy Rate</span>
                <span className="text-sm text-gray-600">95%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  Maintenance Requests
                </span>
                <Badge
                  variant="outline"
                  className={`text-orange-600 ${badgePulse}`}
                >
                  <AlertCircle className="w-3 h-3 mr-1" />
                  12 Open
                </Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Budget Utilization</span>
                <span className="text-sm text-green-600">78%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Upcoming Actions</CardTitle>
            <CardDescription>Items requiring attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-orange-600 mr-2" />
                  <span className="text-sm">Lease Renewals</span>
                </div>
                <Badge variant="outline" className="text-orange-600">
                  3
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
                <div className="flex items-center">
                  <Building className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="text-sm">Inspections Due</span>
                </div>
                <Badge variant="outline" className="text-blue-600">
                  5
                </Badge>
              </div>
              <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
                <div className="flex items-center">
                  <Users className="w-4 h-4 text-green-600 mr-2" />
                  <span className="text-sm">New Inquiries</span>
                </div>
                <Badge variant="outline" className="text-green-600">
                  8
                </Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
