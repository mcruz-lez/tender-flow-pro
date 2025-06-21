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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Search,
  Filter,
  Star,
  MapPin,
  Phone,
  Mail,
  Eye,
  UserPlus,
  Building2,
  List,
} from "lucide-react";
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
    registrationDate: "2023-01-15",
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
    registrationDate: "2022-08-22",
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
    registrationDate: "2023-03-10",
  },
];

// Animated glassmorphism and gradient helpers
const animatedGradient =
  "bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 dark:from-[#23234a] dark:via-[#2a1e3f] dark:to-[#1e1e3f] shadow-2xl border-0 backdrop-blur-xl";
const glassCard =
  "rounded-2xl border-0 shadow-2xl bg-white/60 dark:bg-[#23234a]/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-400/30";
const glassButton =
  "rounded-full px-5 py-2 font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-blue-900/20 hover:scale-105 hover:shadow-blue-400/40 transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none";
const badgePulse =
  "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-pulse after:bg-current after:opacity-20";

const VendorDirectory = () => {
  const [vendors] = useState<Vendor[]>(mockVendors);
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState("grid");

  const filteredVendors = vendors.filter((vendor) => {
    const matchesSearch =
      vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor.specialties.some((specialty) =>
        specialty.toLowerCase().includes(searchTerm.toLowerCase()),
      );
    const matchesCategory =
      categoryFilter === "all" || vendor.category === categoryFilter;
    const matchesStatus =
      statusFilter === "all" || vendor.status === statusFilter;

    return matchesSearch && matchesCategory && matchesStatus;
  });

  const categories = [
    "Construction",
    "Cleaning",
    "Security",
    "HVAC",
    "Plumbing",
    "Electrical",
  ];

  return (
    <PageTemplate
      title="Vendor Directory"
      description="Browse and manage all registered vendors"
    >
      <div className={`min-h-screen ${animatedGradient} transition-colors p-6`}>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">
          <div className="flex gap-2 w-full md:w-auto">
            <Input
              placeholder="Search vendors or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full md:w-64 rounded-full px-4 py-2 border-0 shadow focus:ring-2 focus:ring-blue-400"
            />
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="rounded-full px-4 border-0 shadow bg-white/80 dark:bg-[#23234a]/80">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="rounded-full px-4 border-0 shadow bg-white/80 dark:bg-[#23234a]/80">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="Active">Active</SelectItem>
                <SelectItem value="Inactive">Inactive</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex gap-2">
            <Button
              className={glassButton}
              onClick={() => setViewMode("grid")}
              variant={viewMode === "grid" ? "default" : "outline"}
            >
              <Eye className="w-4 h-4 mr-1" /> Grid
            </Button>
            <Button
              className={glassButton}
              onClick={() => setViewMode("list")}
              variant={viewMode === "list" ? "default" : "outline"}
            >
              <List className="w-4 h-4 mr-1" /> List
            </Button>
            <Button asChild className={glassButton}>
              <Link to="/vendors/VendorRegistration">
                <UserPlus className="w-4 h-4 mr-1" /> Register Vendor
              </Link>
            </Button>
          </div>
        </div>
        <div
          className={`grid ${viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" : "grid-cols-1 gap-4"} mb-8`}
        >
          {filteredVendors.length === 0 ? (
            <div className="col-span-full text-center text-lg text-gray-500 dark:text-gray-300 py-12">
              No vendors found.
            </div>
          ) : (
            filteredVendors.map((vendor) => (
              <Card
                key={vendor.id}
                className={`${glassCard} group hover:shadow-blue-400/30`}
              >
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={vendor.avatar} alt={vendor.name} />
                        <AvatarFallback>
                          <Building2 className="w-6 h-6" />
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <CardTitle className="text-lg text-slate-900 dark:text-white font-bold">
                          {vendor.name}
                        </CardTitle>
                        <CardDescription className="flex items-center text-blue-700 dark:text-blue-200">
                          <MapPin className="w-4 h-4 mr-1" />
                          {vendor.location}
                        </CardDescription>
                      </div>
                    </div>
                    <Badge
                      className={`px-3 py-1 text-xs font-bold rounded-full ${badgePulse} ${vendor.status === "Active" ? "bg-green-100 text-green-700" : vendor.status === "Inactive" ? "bg-gray-100 text-gray-700" : "bg-yellow-100 text-yellow-700"}`}
                    >
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
                            className={`w-4 h-4 ${i < Math.floor(vendor.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                          />
                        ))}
                        <span className="text-sm text-gray-600 dark:text-gray-300 ml-2">
                          {vendor.rating} ({vendor.reviews} reviews)
                        </span>
                      </div>
                      <Badge
                        variant="outline"
                        className="text-xs font-semibold border-blue-300/40 dark:border-blue-600/40 text-blue-700 dark:text-blue-200 bg-blue-50 dark:bg-blue-900/20"
                      >
                        {vendor.category}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Projects:</span>{" "}
                        {vendor.completedProjects}
                      </div>
                      <div>
                        <span className="font-medium">Avg Value:</span> $
                        {vendor.averageValue.toLocaleString()}
                      </div>
                      <div>
                        <span className="font-medium">Response:</span>{" "}
                        {vendor.responseTime}
                      </div>
                      <div>
                        <span className="font-medium">Since:</span>{" "}
                        {new Date(vendor.registrationDate).getFullYear()}
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {vendor.specialties
                        .slice(0, 3)
                        .map((specialty, index) => (
                          <Badge
                            key={index}
                            variant="secondary"
                            className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-200"
                          >
                            {specialty}
                          </Badge>
                        ))}
                      {vendor.specialties.length > 3 && (
                        <Badge
                          variant="secondary"
                          className="text-xs bg-purple-100 text-purple-700 dark:bg-purple-900/20 dark:text-purple-200"
                        >
                          +{vendor.specialties.length - 3} more
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-300">
                      <Phone className="w-4 h-4" />
                      <span>{vendor.phone}</span>
                      <Mail className="w-4 h-4 ml-4" />
                      <span>{vendor.email}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </PageTemplate>
  );
};

export default VendorDirectory;
