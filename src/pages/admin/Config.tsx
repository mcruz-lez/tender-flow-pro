import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Config = () => {
  return (
    <PageTemplate
      title="System Configuration"
      description="Manage system settings, integrations, and preferences."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Configuration Tools</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Update organization profile and branding</li>
            <li>Manage user roles and permissions</li>
            <li>Configure integrations (Stripe, Supabase, Email, etc.)</li>
            <li>Set up notification and alert preferences</li>
            <li>Export/import configuration data</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/admin/api-docs">API Docs</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default Config;
