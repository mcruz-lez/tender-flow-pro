import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VendorDashboard = () => {
  return (
    <PageTemplate
      title="Vendor Dashboard"
      description="Overview and management tools for vendors."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>View open tenders and submit bids</li>
            <li>Track bid status and feedback</li>
            <li>Manage company profile</li>
            <li>Access analytics and insights</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/vendors">Go to Vendor Portal</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default VendorDashboard;
