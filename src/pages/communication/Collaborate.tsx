import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Collaborate = () => {
  return (
    <PageTemplate
      title="Collaboration Hub"
      description="Collaborate with your team, share files, and manage discussions."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Team Collaboration</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Start a discussion or chat with your team</li>
            <li>Share and manage project files securely</li>
            <li>Assign tasks and track progress</li>
            <li>Schedule meetings and sync calendars</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/help/forums">Go to Forums</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default Collaborate;
