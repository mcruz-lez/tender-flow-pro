import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, DollarSign, Users, PieChart, Activity } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart as RechartsPieChart, Pie, Cell } from "recharts";

const AnalyticsDashboard = () => {
  const quickActions = [
    { label: "Custom Report", href: "/analytics/custom", icon: BarChart3 },
    { label: "Export Data", href: "/analytics/export", icon: TrendingUp, variant: "outline" as const }
  ];

  const tenderData = [
    { month: 'Jan', tenders: 12, bids: 48, awarded: 8 },
    { month: 'Feb', tenders: 15, bids: 62, awarded: 11 },
    { month: 'Mar', tenders: 18, bids: 71, awarded: 14 },
    { month: 'Apr', tenders: 14, bids: 55, awarded: 10 },
    { month: 'May', tenders: 20, bids: 85, awarded: 16 },
    { month: 'Jun', tenders: 16, bids: 68, awarded: 12 }
  ];

  const categoryData = [
    { name: 'Construction', value: 35, color: '#3b82f6' },
    { name: 'Maintenance', value: 25, color: '#10b981' },
    { name: 'Security', value: 20, color: '#f59e0b' },
    { name: 'Cleaning', value: 20, color: '#8b5cf6' }
  ];

  return (
    <PageTemplate
      title="Analytics Dashboard"
      description="Comprehensive analytics and reporting"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">95</div>
              <div className="text-sm text-gray-600">Total Tenders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">389</div>
              <div className="text-sm text-gray-600">Total Bids</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">€2.8M</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">18%</div>
              <div className="text-sm text-gray-600">Growth Rate</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Tender Activity Trends</CardTitle>
              <CardDescription>Monthly tender and bid statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tenderData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tenders" fill="#3b82f6" name="Tenders" />
                  <Bar dataKey="bids" fill="#10b981" name="Bids" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Tender Categories</CardTitle>
              <CardDescription>Distribution by service category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <RechartsPieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value}%`}
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </RechartsPieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

// --- PROFESSIONAL ENHANCEMENT START ---
// Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to analytics dashboard
// Consistent with Dashboard and design system
// --- PROFESSIONAL ENHANCEMENT END ---

export default AnalyticsDashboard;
