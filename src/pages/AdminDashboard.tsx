import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AdminDashboard = () => {
  return (
    <PageTemplate
      title="Admin Dashboard"
      description="Overview and management tools for administrators."
    >
      <Card className="mb-8 rounded-2xl shadow-xl border border-slate-200/40 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#23234a]/80 dark:to-[#2a1e3f]/80 transition-all">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4 text-slate-700 dark:text-slate-200 text-base space-y-1">
            <li>Manage users and roles</li>
            <li>Configure system settings</li>
            <li>Monitor platform activity</li>
            <li>Access audit logs and reports</li>
          </ul>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md rounded-lg transition-all animate-pulse">
            <a href="/admin/config">Go to System Config</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default AdminDashboard;
