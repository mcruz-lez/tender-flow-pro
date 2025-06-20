import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Categories = () => {
  return (
    <PageTemplate
      title="Tender Categories"
      description="Manage and explore tender categories."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Category Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>View all available tender categories</li>
            <li>Add, edit, or remove categories</li>
            <li>Assign categories to tenders</li>
            <li>Export category data</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/tenders/risk-analysis">Go to Risk Analysis</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default Categories;
