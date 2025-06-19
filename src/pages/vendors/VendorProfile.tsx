
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  Building2, MapPin, Phone, Mail, Globe, Calendar, Users, 
  Star, Award, Shield, FileText, TrendingUp, Clock, DollarSign,
  CheckCircle, AlertTriangle, MessageSquare, Eye
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer } from "recharts";
import PageTemplate from "@/components/PageTemplate";

interface VendorData {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviews: number;
  location: string;
  contactPerson: string;
  phone: string;
  email: string;
  website: string;
  avatar: string;
  status: "Active" | "Inactive" | "Pending";
  description: string;
  yearEstablished: number;
  employeeCount: string;
  certifications: string[];
  specialties: string[];
  serviceAreas: string[];
  insuranceTypes: string[];
  completedProjects: number;
  activeProjects: number;
  averageValue: number;
  totalValue: number;
  responseTime: string;
  onTimeDelivery: number;
  clientSatisfaction: number;
  registrationDate: string;
  lastActive: string;
}

const performanceData = [
  { month: 'Jan', projects: 8, satisfaction: 4.8 },
  { month: 'Feb', projects: 12, satisfaction: 4.7 },
  { month: 'Mar', projects: 15, satisfaction: 4.9 },
  { month: 'Apr', projects: 10, satisfaction: 4.6 },
  { month: 'May', projects: 18, satisfaction: 4.8 },
  { month: 'Jun', projects: 14, satisfaction: 4.9 },
];

const mockVendor: VendorData = {
  id: "1",
  name: "Elite Construction Co.",
  category: "Construction",
  rating: 4.8,
  reviews: 156,
  location: "New York, NY",
  contactPerson: "John Smith",
  phone: "+1 (555) 123-4567",
  email: "john@eliteconstruction.com",
  website: "https://eliteconstruction.com",
  avatar: "/placeholder.svg",
  status: "Active",
  description: "Elite Construction Co. is a leading construction company specializing in commercial and residential projects. With over 15 years of experience, we deliver high-quality construction services with a focus on sustainability and innovation.",
  yearEstablished: 2008,
  employeeCount: "51-100",
  certifications: ["ISO 9001", "OSHA Certified", "LEED Certified", "Licensed Contractor"],
  specialties: ["Commercial Construction", "Renovation", "Green Building", "Project Management"],
  serviceAreas: ["New York, NY", "Brooklyn, NY", "Queens, NY", "Manhattan, NY"],
  insuranceTypes: ["General Liability", "Workers Compensation", "Professional Liability"],
  completedProjects: 89,
  activeProjects: 7,
  averageValue: 125000,
  totalValue: 11125000,
  responseTime: "2 hours",
  onTimeDelivery: 95,
  clientSatisfaction: 4.8,
  registrationDate: "2023-01-15",
  lastActive: "2024-01-15"
};

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor] = useState<VendorData>(mockVendor);

  const quickActions = [
    { label: "Contact Vendor", href: "#", icon: MessageSquare },
    { label: "View Projects", href: "#", icon: Eye, variant: "outline" as const },
    { label: "Request Quote", href: "#", icon: FileText, variant: "outline" as const }
  ];

  return (
    <PageTemplate
      title={vendor.name}
      description={`${vendor.category} vendor profile and performance analytics`}
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Header Card */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
              <Avatar className="w-20 h-20">
                <AvatarImage src={vendor.avatar} alt={vendor.name} />
                <AvatarFallback><Building2 className="w-10 h-10" /></AvatarFallback>
              </Avatar>
              
              <div className="flex-1">
                <div className="flex items-center space-x-3 mb-2">
                  <h1 className="text-2xl font-bold">{vendor.name}</h1>
                  <Badge variant={vendor.status === "Active" ? "default" : "secondary"}>
                    {vendor.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-gray-500" />
                    <span>{vendor.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>Since {vendor.yearEstablished}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-gray-500" />
                    <span>{vendor.employeeCount} employees</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="w-4 h-4 text-gray-500" />
                    <span>Response: {vendor.responseTime}</span>
                  </div>
                </div>
                
                <p className="text-gray-600 mt-3">{vendor.description}</p>
              </div>
              
              <div className="text-center">
                <div className="flex items-center space-x-1 mb-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${i < Math.floor(vendor.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                    />
                  ))}
                </div>
                <div className="text-lg font-bold">{vendor.rating}</div>
                <div className="text-sm text-gray-600">{vendor.reviews} reviews</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{vendor.completedProjects}</div>
              <div className="text-sm text-gray-600">Completed Projects</div>
              <div className="text-xs text-green-600 mt-1">+{vendor.activeProjects} active</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">${(vendor.totalValue / 1000000).toFixed(1)}M</div>
              <div className="text-sm text-gray-600">Total Contract Value</div>
              <div className="text-xs text-gray-500 mt-1">Avg: ${vendor.averageValue.toLocaleString()}</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-orange-600">{vendor.onTimeDelivery}%</div>
              <div className="text-sm text-gray-600">On-Time Delivery</div>
              <div className="text-xs text-green-600 mt-1">Above average</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{vendor.clientSatisfaction}</div>
              <div className="text-sm text-gray-600">Client Satisfaction</div>
              <div className="text-xs text-green-600 mt-1">Excellent rating</div>
            </CardContent>
          </Card>
        </div>

        {/* Detailed Information Tabs */}
        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="certifications">Credentials</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Services & Specialties</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-medium mb-2">Primary Category</h4>
                      <Badge variant="outline">{vendor.category}</Badge>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Specialties</h4>
                      <div className="flex flex-wrap gap-2">
                        {vendor.specialties.map((specialty, index) => (
                          <Badge key={index} variant="secondary">{specialty}</Badge>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-2">Service Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {vendor.serviceAreas.map((area, index) => (
                          <Badge key={index} variant="outline">{area}</Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Performance Metrics</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>On-Time Delivery</span>
                        <span>{vendor.onTimeDelivery}%</span>
                      </div>
                      <Progress value={vendor.onTimeDelivery} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Client Satisfaction</span>
                        <span>{vendor.clientSatisfaction}/5.0</span>
                      </div>
                      <Progress value={(vendor.clientSatisfaction / 5) * 100} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Quality Score</span>
                        <span>92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span>Communication</span>
                        <span>96%</span>
                      </div>
                      <Progress value={96} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="performance">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Project Completion Trend</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Line 
                        type="monotone" 
                        dataKey="projects" 
                        stroke="#3b82f6" 
                        strokeWidth={2}
                        dot={{ fill: '#3b82f6' }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Satisfaction Ratings</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={performanceData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis domain={[4, 5]} />
                      <Tooltip />
                      <Bar dataKey="satisfaction" fill="#10b981" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="certifications">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Award className="w-5 h-5 mr-2" />
                    Certifications
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vendor.certifications.map((cert, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-medium">{cert}</span>
                        </div>
                        <Badge variant="outline">Verified</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Shield className="w-5 h-5 mr-2" />
                    Insurance Coverage
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {vendor.insuranceTypes.map((insurance, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Shield className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">{insurance}</span>
                        </div>
                        <Badge variant="outline">Active</Badge>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="projects">
            <Card>
              <CardHeader>
                <CardTitle>Recent Projects</CardTitle>
                <CardDescription>
                  Latest completed and ongoing projects
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8">
                  <Building2 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-gray-900 mb-2">Project Details</h3>
                  <p className="text-gray-600">
                    Detailed project information will be available in the full implementation.
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="contact">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center space-x-3">
                    <User className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">{vendor.contactPerson}</div>
                      <div className="text-sm text-gray-600">Primary Contact</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Phone className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">{vendor.phone}</div>
                      <div className="text-sm text-gray-600">Business Phone</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Mail className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">{vendor.email}</div>
                      <div className="text-sm text-gray-600">Email Address</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Globe className="w-5 h-5 text-gray-500" />
                    <div>
                      <div className="font-medium">{vendor.website}</div>
                      <div className="text-sm text-gray-600">Website</div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Quick Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button className="w-full">
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Send Message
                  </Button>
                  <Button variant="outline" className="w-full">
                    <FileText className="w-4 h-4 mr-2" />
                    Request Quote
                  </Button>
                  <Button variant="outline" className="w-full">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Meeting
                  </Button>
                  <Button variant="outline" className="w-full">
                    <DollarSign className="w-4 h-4 mr-2" />
                    View Pricing
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default VendorProfile;
