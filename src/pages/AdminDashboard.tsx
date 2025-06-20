import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <PageTemplate
      title="Admin Dashboard"
      description="Overview and management tools for administrators."
    >
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4">
            <li>Manage users and roles</li>
            <li>Configure system settings</li>
            <li>Monitor platform activity</li>
            <li>Access audit logs and reports</li>
          </ul>
          <Button asChild variant="outline">
            <a href="/admin/config">Go to System Config</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default AdminDashboard;
