
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const performanceData = [
  { month: 'Jan', projects: 8, satisfaction: 4.8, onTime: 95 },
  { month: 'Feb', projects: 12, satisfaction: 4.7, onTime: 92 },
  { month: 'Mar', projects: 15, satisfaction: 4.9, onTime: 98 },
  { month: 'Apr', projects: 10, satisfaction: 4.6, onTime: 88 },
  { month: 'May', projects: 18, satisfaction: 4.8, onTime: 94 },
  { month: 'Jun', projects: 14, satisfaction: 4.9, onTime: 96 },
];

const categoryPerformance = [
  { category: 'Construction', count: 45, satisfaction: 4.8 },
  { category: 'HVAC', count: 23, satisfaction: 4.6 },
  { category: 'Cleaning', count: 18, satisfaction: 4.9 },
  { category: 'Security', count: 12, satisfaction: 4.7 },
];

const satisfactionColors = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b'];

const VendorPerformanceTab = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Project Completion Trend */}
        <Card>
          <CardHeader>
            <CardTitle>Project Completion Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line 
                  type="monotone" 
                  dataKey="projects" 
                  stroke="#3b82f6" 
                  strokeWidth={2}
                  dot={{ fill: '#3b82f6' }}
                  name="Projects"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Satisfaction Ratings */}
        <Card>
          <CardHeader>
            <CardTitle>Client Satisfaction Ratings</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[4, 5]} />
                <Tooltip formatter={(value) => [value, 'Satisfaction Rating']} />
                <Bar dataKey="satisfaction" fill="#10b981" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* On-Time Delivery */}
        <Card>
          <CardHeader>
            <CardTitle>On-Time Delivery Performance</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis domain={[80, 100]} />
                <Tooltip formatter={(value) => [`${value}%`, 'On-Time Delivery']} />
                <Line 
                  type="monotone" 
                  dataKey="onTime" 
                  stroke="#f59e0b" 
                  strokeWidth={2}
                  dot={{ fill: '#f59e0b' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Category Performance */}
        <Card>
          <CardHeader>
            <CardTitle>Performance by Category</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={categoryPerformance}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="count"
                  label={({ category, count }) => `${category}: ${count}`}
                >
                  {categoryPerformance.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={satisfactionColors[index % satisfactionColors.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Performance Summary */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">98</div>
              <div className="text-sm text-gray-600">Total Projects</div>
              <Badge className="mt-2 bg-blue-100 text-blue-700">Excellent</Badge>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">4.8</div>
              <div className="text-sm text-gray-600">Avg Satisfaction</div>
              <Badge className="mt-2 bg-green-100 text-green-700">Outstanding</Badge>
            </div>
            <div className="text-center p-4 bg-orange-50 rounded-lg">
              <div className="text-2xl font-bold text-orange-600">94%</div>
              <div className="text-sm text-gray-600">On-Time Delivery</div>
              <Badge className="mt-2 bg-orange-100 text-orange-700">Excellent</Badge>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">€2.8M</div>
              <div className="text-sm text-gray-600">Total Value</div>
              <Badge className="mt-2 bg-purple-100 text-purple-700">High Value</Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorPerformanceTab;
