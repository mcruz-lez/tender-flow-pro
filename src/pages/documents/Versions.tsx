import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DocumentVersions = () => {
  return (
    <PageTemplate
      title="Document Versions"
      description="View and manage document version history."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Version History</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Track changes and revisions for all documents</li>
            <li>Restore previous versions as needed</li>
            <li>Compare differences between versions</li>
            <li>Export version history for compliance</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/documents/sharing">Go to Sharing</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default DocumentVersions;
