
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

interface PageTemplateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
}

const PageTemplate = ({ title, description, children }: PageTemplateProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
            <p className="text-gray-600 mt-2">{description}</p>
          </div>

          {children || (
            <Card className="max-w-2xl mx-auto text-center">
              <CardHeader>
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Construction className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle>Page Under Development</CardTitle>
                <CardDescription>
                  This feature is currently being developed and will be available soon.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-gray-500 mb-4">
                  We're working hard to bring you this functionality. Check back soon!
                </p>
                <Button variant="outline">
                  Request Feature Updates
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
