import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const BiasCheck = () => {
  return (
    <PageTemplate
      title="Bias Check"
      description="Run bias detection and ensure fair evaluation workflows."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Bias Detection Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Analyze evaluation data for potential bias</li>
            <li>Generate bias detection reports</li>
            <li>Recommend corrective actions</li>
            <li>Export bias analysis results</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/evaluation/workflows">Go to Workflows</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default BiasCheck;
