import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PMDashboard = () => {
  return (
    <PageTemplate
      title="Property Manager Dashboard"
      description="Overview and management tools for property managers."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>View and manage properties</li>
            <li>Track maintenance and service requests</li>
            <li>Monitor vendor performance</li>
            <li>Access analytics and reports</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/properties">Go to Properties</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default PMDashboard;
