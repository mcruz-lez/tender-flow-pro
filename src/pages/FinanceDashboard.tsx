import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const FinanceDashboard = () => {
  return (
    <PageTemplate
      title="Finance Dashboard"
      description="Overview and management tools for finance managers."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>View payment status and invoices</li>
            <li>Manage budgets and forecasts</li>
            <li>Track financial KPIs</li>
            <li>Export financial reports</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/contracts">Go to Contracts</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default FinanceDashboard;
