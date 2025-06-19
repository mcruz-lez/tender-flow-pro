
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { 
  Users, 
  Clock, 
  CheckCircle, 
  AlertTriangle, 
  TrendingUp,
  Award,
  FileText,
  Star,
  Calendar,
  Filter,
  Search,
  MoreHorizontal,
  Eye,
  Play
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";

const EvaluationDashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");

  const quickActions = [
    { label: "Start Evaluation", href: "/evaluation/panel/new", icon: Play },
    { label: "Auto Score", href: "/evaluation/auto-score", icon: TrendingUp },
    { label: "Bias Check", href: "/evaluation/bias-check", icon: AlertTriangle, variant: "outline" as const }
  ];

  const evaluationStats = {
    totalTenders: 24,
    pendingEvaluation: 8,
    inProgress: 6,
    completed: 10,
    avgScore: 78.5,
    avgDuration: "3.2 days"
  };

  const pendingEvaluations = [
    {
      id: "T001",
      title: "HVAC Maintenance Contract",
      bids: 12,
      deadline: "2024-01-20",
      priority: "High",
      status: "Pending",
      evaluators: 3,
      progress: 0
    },
    {
      id: "T002", 
      title: "Security Services Contract",
      bids: 8,
      deadline: "2024-01-25",
      priority: "Medium",
      status: "In Progress",
      evaluators: 4,
      progress: 45
    },
    {
      id: "T003",
      title: "Cleaning Services Contract", 
      bids: 15,
      deadline: "2024-01-30",
      priority: "Low",
      status: "In Progress",
      evaluators: 2,
      progress: 75
    }
  ];

  const recentlyCompleted = [
    {
      id: "T004",
      title: "Landscaping Services",
      winner: "Green Spaces Ltd",
      score: 92,
      completedDate: "2024-01-15",
      evaluators: 3
    },
    {
      id: "T005",
      title: "IT Support Contract",
      winner: "Tech Solutions Inc",
      score: 88,
      completedDate: "2024-01-12",
      evaluators: 4
    }
  ];

  const evaluationData = [
    { month: 'Oct', completed: 12, average: 82 },
    { month: 'Nov', completed: 15, average: 79 },
    { month: 'Dec', completed: 18, average: 85 },
    { month: 'Jan', completed: 10, average: 78 }
  ];

  const statusData = [
    { name: 'Pending', value: 33, color: '#f59e0b' },
    { name: 'In Progress', value: 25, color: '#3b82f6' },
    { name: 'Completed', value: 42, color: '#10b981' }
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "In Progress": return "bg-blue-100 text-blue-800";
      case "Completed": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageTemplate
      title="Evaluation Dashboard"
      description="Manage bid evaluations and awards"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{evaluationStats.totalTenders}</div>
              <div className="text-sm text-gray-600">Total Tenders</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{evaluationStats.pendingEvaluation}</div>
              <div className="text-sm text-gray-600">Pending Evaluation</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Star className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{evaluationStats.avgScore}</div>
              <div className="text-sm text-gray-600">Avg Score</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <TrendingUp className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{evaluationStats.avgDuration}</div>
              <div className="text-sm text-gray-600">Avg Duration</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content Tabs */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Evaluation</TabsTrigger>
            <TabsTrigger value="progress">In Progress</TabsTrigger>
            <TabsTrigger value="completed">Completed</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Pending Evaluations</CardTitle>
                <CardDescription>Tenders awaiting evaluation</CardDescription>
                <div className="flex gap-2">
                  <Input 
                    placeholder="Search tenders..." 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Button variant="outline" size="sm">
                    <Filter className="w-4 h-4 mr-2" />
                    Filter
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tender</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Progress</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingEvaluations.map((tender) => (
                      <TableRow key={tender.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{tender.title}</div>
                            <div className="text-sm text-gray-500">{tender.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{tender.bids} bids</TableCell>
                        <TableCell>{tender.deadline}</TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(tender.priority)}>
                            {tender.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(tender.status)}>
                            {tender.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-2">
                            <Progress value={tender.progress} className="w-16" />
                            <span className="text-sm">{tender.progress}%</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" asChild>
                              <Link to={`/evaluation/panel/${tender.id}`}>
                                <Play className="w-4 h-4 mr-1" />
                                Start
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="completed">
            <Card>
              <CardHeader>
                <CardTitle>Recently Completed</CardTitle>
                <CardDescription>Successfully evaluated tenders</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tender</TableHead>
                      <TableHead>Winner</TableHead>
                      <TableHead>Score</TableHead>
                      <TableHead>Completed</TableHead>
                      <TableHead>Evaluators</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {recentlyCompleted.map((tender) => (
                      <TableRow key={tender.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{tender.title}</div>
                            <div className="text-sm text-gray-500">{tender.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{tender.winner}</TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            {tender.score}/100
                          </div>
                        </TableCell>
                        <TableCell>{tender.completedDate}</TableCell>
                        <TableCell>{tender.evaluators} evaluators</TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            <Eye className="w-4 h-4 mr-1" />
                            View Report
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Trends</CardTitle>
                  <CardDescription>Monthly evaluation performance</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart data={evaluationData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="completed" fill="#3b82f6" name="Completed" />
                      <Bar dataKey="average" fill="#10b981" name="Avg Score" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Evaluation Status</CardTitle>
                  <CardDescription>Current evaluation distribution</CardDescription>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        outerRadius={80}
                        dataKey="value"
                        label={({ name, value }) => `${name}: ${value}%`}
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default EvaluationDashboard;
