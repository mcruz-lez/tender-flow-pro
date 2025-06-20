import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Classify = () => {
  return (
    <PageTemplate
      title="Document Classification"
      description="Classify and tag documents for better organization."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Classification Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Tag documents by type, project, or department</li>
            <li>Automate classification with AI suggestions</li>
            <li>Filter and search by classification</li>
            <li>Export classification reports</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/documents/versions">Go to Versions</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default Classify;
