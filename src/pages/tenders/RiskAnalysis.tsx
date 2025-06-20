import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const RiskAnalysis = () => {
  return (
    <PageTemplate
      title="Tender Risk Analysis"
      description="Analyze and manage risks for tenders."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Risk Analysis Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Identify and assess tender risks</li>
            <li>Generate risk analysis reports</li>
            <li>Recommend mitigation strategies</li>
            <li>Export risk data</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/tenders/categories">Go to Categories</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default RiskAnalysis;
