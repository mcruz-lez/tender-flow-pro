import { useState } from "react";
import { useParams } from "react-router-dom";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MessageSquare, Eye, FileText } from "lucide-react";
import PageTemplate from "@/components/PageTemplate";
import VendorProfileHeader from "./components/VendorProfileHeader";
import VendorMetricsCards from "./components/VendorMetricsCards";
import VendorOverviewTab from "./components/VendorOverviewTab";
import VendorPerformanceTab from "./components/VendorPerformanceTab";
import VendorCredentialsTab from "./components/VendorCredentialsTab";
import VendorProjectsTab from "./components/VendorProjectsTab";
import VendorContactTab from "./components/VendorContactTab";

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
  description:
    "Elite Construction Co. is a leading construction company specializing in commercial and residential projects. With over 15 years of experience, we deliver high-quality construction services with a focus on sustainability and innovation.",
  yearEstablished: 2008,
  employeeCount: "51-100",
  certifications: [
    "ISO 9001",
    "OSHA Certified",
    "LEED Certified",
    "Licensed Contractor",
  ],
  specialties: [
    "Commercial Construction",
    "Renovation",
    "Green Building",
    "Project Management",
  ],
  serviceAreas: ["New York, NY", "Brooklyn, NY", "Queens, NY", "Manhattan, NY"],
  insuranceTypes: [
    "General Liability",
    "Workers Compensation",
    "Professional Liability",
  ],
  completedProjects: 89,
  activeProjects: 7,
  averageValue: 125000,
  totalValue: 11125000,
  responseTime: "2 hours",
  onTimeDelivery: 95,
  clientSatisfaction: 4.8,
  registrationDate: "2023-01-15",
  lastActive: "2024-01-15",
};

const VendorProfile = () => {
  const { vendorId } = useParams();
  const [vendor] = useState<VendorData>(mockVendor);

  const quickActions = [
    { label: "Contact Vendor", href: "#", icon: MessageSquare },
    {
      label: "View Projects",
      href: "#",
      icon: Eye,
      variant: "outline" as const,
    },
    {
      label: "Request Quote",
      href: "#",
      icon: FileText,
      variant: "outline" as const,
    },
  ];

  return (
    <PageTemplate
      title={vendor.name}
      description={`${vendor.category} vendor profile and performance analytics`}
      quickActions={quickActions}
    >
      <div className="space-y-6">
        <VendorProfileHeader vendor={vendor} />
        <VendorMetricsCards vendor={vendor} />

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
            <TabsTrigger value="certifications">Credentials</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
            <VendorOverviewTab vendor={vendor} />
          </TabsContent>

          <TabsContent value="performance">
            <VendorPerformanceTab />
          </TabsContent>

          <TabsContent value="certifications">
            <VendorCredentialsTab vendor={vendor} />
          </TabsContent>

          <TabsContent value="projects">
            <VendorProjectsTab />
          </TabsContent>

          <TabsContent value="contact">
            <VendorContactTab vendor={vendor} />
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default VendorProfile;
