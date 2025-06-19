
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Search, Filter, Star, MapPin, Phone, Mail, Eye, UserPlus, Building2 } from "lucide-react";
import { Link } from "react-router-dom";
import PageTemplate from "@/components/PageTemplate";

interface Vendor {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  certifications: string[];
  specialties: string[];
  contactPerson: string;
  phone: string;
  email: string;
  avatar: string;
  status: "Active" | "Inactive" | "Pending";
  completedProjects: number;
  averageValue: number;
  responseTime: string;
  registrationDate: string;
}

const mockVendors: Vendor[] = [
  {
    id: "1",
    name: "Elite Construction Co.",
    category: "Construction",
    rating: 4.8,
    reviews: 156,
    location: "New York, NY",
    certifications: ["ISO 9001", "OSHA Certified"],
    specialties: ["Commercial", "Renovation", "Green Building"],
    contactPerson: "John Smith",
    phone: "+1 (555) 123-4567",
    email: "john@eliteconstruction.com",
    avatar: "/placeholder.svg",
    status: "Active",
    completedProjects: 89,
    averageValue: 125000,
    responseTime: "2 hours",
    registrationDate: "2023-01-15"
  },
  {
    id: "2",
    name: "ProClean Services",
    category: "Cleaning",
    rating: 4.6,
    reviews: 203,
    location: "Los Angeles, CA",
    certifications: ["EPA Certified", "Green Seal"],
    specialties: ["Commercial Cleaning", "Janitorial", "Deep Cleaning"],
    contactPerson: "Sarah Johnson",
    phone: "+1 (555) 987-6543",
    email: "sarah@proclean.com",
    avatar: "/placeholder.svg",
    status: "Active",
    completedProjects: 234,
    averageValue: 15000,
    responseTime: "1 hour",
    registrationDate: "2022-08-22"
  },
  {
    id: "3",
    name: "SecureGuard Solutions",
    category: "Security",
    rating: 4.9,
    reviews: 98,
    location: "Chicago, IL",
    certifications: ["Licensed Security", "Background Verified"],
    specialties: ["24/7 Security", "Access Control", "Surveillance"],
    contactPerson: "Mike Wilson",
    phone: "+1 (555) 456-7890",
    email: "mike@secureguard.com",
    avatar: "/placeholder.svg",
    status: "Active",
    completedProjects: 67,
    averageValue: 45000,
    responseTime: "30 minutes",
    registrationDate: "2023-03-10"
  }
];

const VendorDirectory = () => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.specialties.some(specialty => specialty.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === "all" || vendor.category === categoryFilter;
    const matchesStatus = statusFilter === "all" || vendor.status === statusFilter;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = ["Construction", "Cleaning", "Security", "HVAC", "Plumbing", "Electrical"];

  const VendorCard = ({ vendor }: { vendor: Vendor }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="w-12 h-12">
              <AvatarImage src={vendor.avatar} alt={vendor.name} />
              <AvatarFallback><Building2 className="w-6 h-6" /></AvatarFallback>
            </Avatar>
            <div>
              <CardTitle className="text-lg">{vendor.name}</CardTitle>
              <CardDescription className="flex items-center">
                <MapPin className="w-4 h-4 mr-1" />
                {vendor.location}
              </CardDescription>
            </div>
          </div>
          <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>
            {vendor.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-1">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                />
              ))}
              <span className="text-sm text-gray-600 ml-2">
                {vendor.rating} ({vendor.reviews} reviews)
              </span>
            </div>
            <Badge variant="outline">{vendor.category}</Badge>
          </div>
          
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="font-medium">Projects:</span> {vendor.completedProjects}
            </div>
            <div>
              <span className="font-medium">Avg Value:</span> ${vendor.averageValue.toLocaleString()}
            </div>
            <div>
              <span className="font-medium">Response:</span> {vendor.responseTime}
            </div>
            <div>
              <span className="font-medium">Since:</span> {new Date(vendor.registrationDate).getFullYear()}
            </div>
          </div>

          <div className="flex flex-wrap gap-1">
            {vendor.specialties.slice(0, 3).map((specialty, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {specialty}
              </Badge>
            ))}
            {vendor.specialties.length > 3 && (
              <Badge variant="secondary" className="text-xs">
                +{vendor.specialties.length - 3} more
              </Badge>
            )}
          </div>

          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Phone className="w-4 h-4" />
            <span>{vendor.phone}</span>
          </div>
          
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <Mail className="w-4 h-4" />
            <span>{vendor.email}</span>
          </div>

          <div className="flex space-x-2 pt-2">
            <Button asChild size="sm" className="flex-1">
              <Link to={`/vendors/profile/${vendor.id}`}>
                <Eye className="w-4 h-4 mr-1" />
                View Profile
              </Link>
            </Button>
            <Button variant="outline" size="sm">
              Contact
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const quickActions = [
    { label: "Register New Vendor", href: "/vendors/register", icon: UserPlus },
    { label: "Vendor Analytics", href: "/vendors/analytics", icon: Building2, variant: "outline" as const },
    { label: "Prequalification", href: "/vendors/prequalification", icon: Filter, variant: "outline" as const }
  ];

  return (
    <PageTemplate
      title="Vendor Directory"
      description="Browse and manage certified vendors and contractors"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Filters */}
        <Card>
          <CardContent className="p-4">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search vendors by name or specialty..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger className="w-full lg:w-[200px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map(category => (
                    <SelectItem key={category} value={category}>{category}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full lg:w-[150px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="icon">
                <Filter className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{vendors.length}</div>
              <div className="text-sm text-gray-600">Total Vendors</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">
                {vendors.filter(v => v.status === "Active").length}
              </div>
              <div className="text-sm text-gray-600">Active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{categories.length}</div>
              <div className="text-sm text-gray-600">Categories</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">
                {(vendors.reduce((sum, v) => sum + v.rating, 0) / vendors.length).toFixed(1)}
              </div>
              <div className="text-sm text-gray-600">Avg Rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <VendorCard key={vendor.id} vendor={vendor} />
          ))}
        </div>

        {filteredVendors.length === 0 && (
          <Card className="text-center py-12">
            <CardContent>
              <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No vendors found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your search criteria or register a new vendor.
              </p>
              <Button asChild>
                <Link to="/vendors/register">Register New Vendor</Link>
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </PageTemplate>
  );
};

export default VendorDirectory;
