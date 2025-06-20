import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DocumentSharing = () => {
  return (
    <PageTemplate
      title="Document Sharing"
      description="Securely share documents with your team and partners."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Sharing Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Share documents with internal and external users</li>
            <li>Set permissions and access controls</li>
            <li>Track document access and downloads</li>
            <li>Revoke sharing at any time</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/documents/classify">Go to Classification</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default DocumentSharing;
