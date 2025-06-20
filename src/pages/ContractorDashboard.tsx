import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ContractorDashboard = () => {
  return (
    <PageTemplate
      title="Contractor Dashboard"
      description="Overview and management tools for contractors."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>View assigned contracts</li>
            <li>Submit progress updates</li>
            <li>Access compliance documents</li>
            <li>Monitor payment status</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/contracts">Go to Contracts</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default ContractorDashboard;
