import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Awards = () => {
  return (
    <PageTemplate
      title="Evaluation Awards"
      description="View and manage award decisions and notifications."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Award Management</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Review evaluation results and recommendations</li>
            <li>Approve or reject award decisions</li>
            <li>Send notifications to winning vendors</li>
            <li>Export award reports</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/evaluation/bias-check">Go to Bias Check</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default Awards;
