import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Workflows = () => {
  return (
    <PageTemplate
      title="Evaluation Workflows"
      description="Manage and automate evaluation workflows."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Workflow Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Design and automate evaluation workflows</li>
            <li>Assign reviewers and set approval steps</li>
            <li>Track workflow progress and status</li>
            <li>Export workflow reports</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/evaluation/awards">Go to Awards</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default Workflows;
