import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Users, UserPlus, Shield, Settings, Mail, MoreHorizontal } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Lightbulb } from "lucide-react";

const UserManagement = () => {
  const quickActions = [
    { label: "Add User", href: "/admin/users/create", icon: UserPlus },
    { label: "Role Settings", href: "/admin/roles", icon: Shield, variant: "outline" as const },
    { label: "User Import", href: "/admin/users/import", icon: Settings, variant: "outline" as const }
  ];

  const users = [
    { id: 1, name: "John Smith", email: "john@company.com", role: "Property Manager", status: "Active", lastLogin: "2024-01-15" },
    { id: 2, name: "Sarah Wilson", email: "sarah@company.com", role: "Administrator", status: "Active", lastLogin: "2024-01-14" },
    { id: 3, name: "Mike Johnson", email: "mike@vendor.com", role: "Vendor", status: "Pending", lastLogin: "Never" },
    { id: 4, name: "Lisa Chen", email: "lisa@company.com", role: "Finance Manager", status: "Active", lastLogin: "2024-01-13" }
  ];

  const userStats = [
    { label: "Total Users", value: 24 },
    { label: "Active", value: 21 },
    { label: "Pending", value: 3 },
    { label: "Roles", value: 5 },
  ];

  const activityData = [
    { month: "Jan", logins: 120 },
    { month: "Feb", logins: 140 },
    { month: "Mar", logins: 135 },
    { month: "Apr", logins: 150 },
    { month: "May", logins: 160 },
    { month: "Jun", logins: 170 },
  ];

  const aiInsights = [
    "AI suggests enabling 2FA for all users.",
    "3 users have not logged in for 60+ days.",
    "Consider reviewing permissions for vendor accounts.",
  ];

  return (
    <PageTemplate
      title="User Management"
      description="Manage users, roles, and permissions"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {userStats.map((item, idx) => (
            <Card key={idx} className="text-center">
              <CardHeader><CardTitle>{item.label}</CardTitle></CardHeader>
              <CardContent className="text-2xl font-bold">{item.value}</CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card>
            <CardHeader><CardTitle>User Activity Trend</CardTitle></CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={activityData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="logins" fill="#3b82f6" name="Logins" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                {aiInsights.map((insight, idx) => <li key={idx}><Lightbulb className="inline w-4 h-4 mr-1 text-yellow-500" />{insight}</li>)}
              </ul>
            </CardContent>
          </Card>
        </div>
        <Card>
          <CardHeader>
            <CardTitle>Users</CardTitle>
            <CardDescription>Manage user accounts and permissions</CardDescription>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Email</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last Login</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {users.map((user, idx) => (
                  <TableRow key={user.id}>
                    <TableCell>{user.name}</TableCell>
                    <TableCell>{user.email}</TableCell>
                    <TableCell><Button asChild size="sm" variant="outline"><a href={`/admin/roles?user=${user.id}`}>{user.role}</a></Button></TableCell>
                    <TableCell>{user.status}</TableCell>
                    <TableCell>{user.lastLogin}</TableCell>
                    <TableCell>
                      <Button asChild size="sm" variant="secondary"><a href={`/admin/users/${user.id}`}>Profile</a></Button>
                      <Button asChild size="sm" variant="outline"><a href={`/admin/permissions?user=${user.id}`}>Permissions</a></Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default UserManagement;
