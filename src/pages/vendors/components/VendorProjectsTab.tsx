
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2 } from "lucide-react";

const VendorProjectsTab = () => {
  return (
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
  );
};

export default VendorProjectsTab;
