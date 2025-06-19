
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, Calendar, DollarSign, MapPin, Users, Eye } from "lucide-react";

interface Project {
  id: string;
  title: string;
  client: string;
  location: string;
  value: number;
  status: "Completed" | "Active" | "On Hold";
  startDate: string;
  endDate: string;
  category: string;
  teamSize: number;
  progress: number;
}

const mockProjects: Project[] = [
  {
    id: "1",
    title: "Corporate Headquarters Renovation",
    client: "TechCorp Inc.",
    location: "Manhattan, NY",
    value: 580000,
    status: "Active",
    startDate: "2024-01-15",
    endDate: "2024-03-15",
    category: "Renovation",
    teamSize: 12,
    progress: 65
  },
  {
    id: "2",
    title: "Retail Store Buildout",
    client: "Fashion Brands LLC",
    location: "Brooklyn, NY",
    value: 120000,
    status: "Active",
    startDate: "2024-02-01",
    endDate: "2024-02-28",
    category: "Construction",
    teamSize: 8,
    progress: 30
  },
  {
    id: "3",
    title: "Warehouse Construction",
    client: "Logistics Solutions",
    location: "Queens, NY",
    value: 750000,
    status: "Completed",
    startDate: "2023-10-01",
    endDate: "2023-12-20",
    category: "Construction",
    teamSize: 15,
    progress: 100
  },
  {
    id: "4",
    title: "Office Complex HVAC Upgrade",
    client: "Property Management Co.",
    location: "Manhattan, NY",
    value: 95000,
    status: "Completed",
    startDate: "2023-11-15",
    endDate: "2023-12-30",
    category: "HVAC",
    teamSize: 6,
    progress: 100
  }
];

const VendorProjectsTab = () => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-blue-100 text-blue-700";
      case "Completed": return "bg-green-100 text-green-700";
      case "On Hold": return "bg-orange-100 text-orange-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Project Portfolio</CardTitle>
        <CardDescription>
          Completed and ongoing projects showcasing our expertise
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          {mockProjects.map((project) => (
            <Card key={project.id} className="hover:shadow-md transition-shadow">
              <CardContent className="p-4">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h4 className="font-semibold text-lg">{project.title}</h4>
                    <p className="text-gray-600">{project.client}</p>
                  </div>
                  <Badge className={getStatusColor(project.status)}>
                    {project.status}
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                  <div className="flex items-center space-x-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="text-sm">${project.value.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <MapPin className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{project.location}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Users className="w-4 h-4 text-purple-600" />
                    <span className="text-sm">{project.teamSize} team members</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Calendar className="w-4 h-4 text-orange-600" />
                    <span className="text-sm">{new Date(project.startDate).toLocaleDateString()}</span>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline">{project.category}</Badge>
                    <span className="text-sm text-gray-600">
                      {project.progress}% Complete
                    </span>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default VendorProjectsTab;
