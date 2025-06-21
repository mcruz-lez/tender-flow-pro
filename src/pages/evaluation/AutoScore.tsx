import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Brain,
  Play,
  Settings,
  CheckCircle,
  AlertTriangle,
  TrendingUp,
  BarChart3,
  Zap,
  Target,
  Shield,
} from "lucide-react";
import { toast } from "sonner";

const AutoScore = () => {
  const [isScoring, setIsScoring] = useState(false);
  const [scoringProgress, setScoringProgress] = useState(0);

  const quickActions = [
    { label: "Configure AI", href: "#", icon: Settings },
    {
      label: "View Analytics",
      href: "/analytics",
      icon: BarChart3,
      variant: "outline" as const,
    },
  ];

  const aiModels = [
    {
      id: "comprehensive",
      name: "Comprehensive Analyzer",
      description:
        "Full document analysis with technical and financial scoring",
      accuracy: 94,
      speed: "2-3 minutes",
      status: "active",
    },
    {
      id: "financial",
      name: "Financial Evaluator",
      description: "Focused on cost analysis and financial viability",
      accuracy: 97,
      speed: "1 minute",
      status: "active",
    },
    {
      id: "technical",
      name: "Technical Assessor",
      description: "Technical capability and experience evaluation",
      accuracy: 91,
      speed: "3-4 minutes",
      status: "active",
    },
  ];

  const pendingTenders = [
    {
      id: "T001",
      title: "HVAC Maintenance Contract",
      bids: 12,
      deadline: "2024-01-20",
      status: "Pending",
      complexity: "Medium",
    },
    {
      id: "T002",
      title: "Security Services Contract",
      bids: 8,
      deadline: "2024-01-25",
      status: "Pending",
      complexity: "High",
    },
    {
      id: "T003",
      title: "Cleaning Services Contract",
      bids: 15,
      deadline: "2024-01-30",
      status: "Ready",
      complexity: "Low",
    },
  ];

  const recentScores = [
    {
      id: "T004",
      title: "Landscaping Services",
      completedAt: "2024-01-15",
      accuracy: 96,
      bidsScored: 9,
      topBid: "Green Spaces Ltd (92/100)",
    },
    {
      id: "T005",
      title: "IT Support Contract",
      completedAt: "2024-01-12",
      accuracy: 89,
      bidsScored: 6,
      topBid: "Tech Solutions Inc (88/100)",
    },
  ];

  const scoringCriteria = [
    { name: "Technical Capability", weight: 30, aiConfidence: 94 },
    { name: "Price Competitiveness", weight: 25, aiConfidence: 98 },
    { name: "Experience & Track Record", weight: 20, aiConfidence: 87 },
    { name: "Resource Availability", weight: 15, aiConfidence: 82 },
    { name: "Compliance & Certifications", weight: 10, aiConfidence: 96 },
  ];

  const handleStartScoring = async (tenderId: string) => {
    setIsScoring(true);
    setScoringProgress(0);

    // Simulate AI scoring progress
    const interval = setInterval(() => {
      setScoringProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsScoring(false);
          toast.success("AI scoring completed successfully!");
          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageTemplate
      title="Automated Scoring"
      description="AI-powered automatic evaluation and scoring of bid submissions"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* AI Models Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {aiModels.map((model) => (
            <Card key={model.id}>
              <CardContent className="p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Brain className="w-5 h-5 text-purple-600" />
                  <Badge
                    className={
                      model.status === "active"
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {model.status}
                  </Badge>
                </div>
                <h3 className="font-medium mb-1">{model.name}</h3>
                <p className="text-sm text-gray-600 mb-3">
                  {model.description}
                </p>
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span>Accuracy:</span>
                    <span className="font-medium">{model.accuracy}%</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Speed:</span>
                    <span className="font-medium">{model.speed}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <Tabs defaultValue="pending" className="space-y-6">
          <TabsList>
            <TabsTrigger value="pending">Pending Scoring</TabsTrigger>
            <TabsTrigger value="criteria">AI Criteria</TabsTrigger>
            <TabsTrigger value="results">Recent Results</TabsTrigger>
            <TabsTrigger value="settings">Configuration</TabsTrigger>
          </TabsList>

          <TabsContent value="pending">
            <Card>
              <CardHeader>
                <CardTitle>Tenders Ready for AI Scoring</CardTitle>
                <CardDescription>
                  Select tenders to automatically score using AI analysis
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isScoring && (
                  <div className="mb-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                    <div className="flex items-center gap-3 mb-2">
                      <Zap className="w-5 h-5 text-blue-600 animate-pulse" />
                      <span className="font-medium">
                        AI Scoring in Progress...
                      </span>
                    </div>
                    <Progress value={scoringProgress} className="mb-2" />
                    <p className="text-sm text-blue-700">
                      Analyzing documents and scoring bids: {scoringProgress}%
                    </p>
                  </div>
                )}

                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Tender</TableHead>
                      <TableHead>Bids</TableHead>
                      <TableHead>Deadline</TableHead>
                      <TableHead>Complexity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingTenders.map((tender) => (
                      <TableRow key={tender.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{tender.title}</div>
                            <div className="text-sm text-gray-500">
                              {tender.id}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{tender.bids} bids</TableCell>
                        <TableCell>{tender.deadline}</TableCell>
                        <TableCell>
                          <Badge
                            className={getComplexityColor(tender.complexity)}
                          >
                            {tender.complexity}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              tender.status === "Ready"
                                ? "default"
                                : "secondary"
                            }
                          >
                            {tender.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button
                            size="sm"
                            onClick={() => handleStartScoring(tender.id)}
                            disabled={isScoring}
                          >
                            <Play className="w-4 h-4 mr-2" />
                            Start AI Scoring
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="criteria">
            <Card>
              <CardHeader>
                <CardTitle>AI Scoring Criteria</CardTitle>
                <CardDescription>
                  Current scoring criteria and AI confidence levels
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scoringCriteria.map((criteria, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between p-4 border rounded-lg"
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-medium">{criteria.name}</h4>
                          <Badge variant="outline">
                            Weight: {criteria.weight}%
                          </Badge>
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm text-gray-600">
                            AI Confidence:
                          </span>
                          <Progress
                            value={criteria.aiConfidence}
                            className="w-24"
                          />
                          <span className="text-sm font-medium">
                            {criteria.aiConfidence}%
                          </span>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        {criteria.aiConfidence >= 90 ? (
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        ) : criteria.aiConfidence >= 80 ? (
                          <Target className="w-5 h-5 text-yellow-600" />
                        ) : (
                          <AlertTriangle className="w-5 h-5 text-red-600" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="results">
            <Card>
              <CardHeader>
                <CardTitle>Recent AI Scoring Results</CardTitle>
                <CardDescription>
                  Recently completed automated evaluations
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentScores.map((result) => (
                    <div key={result.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{result.title}</h4>
                          <p className="text-sm text-gray-500">
                            Completed: {result.completedAt}
                          </p>
                        </div>
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Completed
                        </Badge>
                      </div>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Accuracy</div>
                          <div className="font-semibold">
                            {result.accuracy}%
                          </div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">
                            Bids Scored
                          </div>
                          <div className="font-semibold">
                            {result.bidsScored}
                          </div>
                        </div>
                        <div className="text-center p-2 bg-gray-50 rounded">
                          <div className="text-sm text-gray-600">Top Bid</div>
                          <div className="font-semibold text-xs">
                            {result.topBid}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <Card>
              <CardHeader>
                <CardTitle>AI Configuration</CardTitle>
                <CardDescription>
                  Configure AI models and scoring parameters
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h4 className="font-medium">Model Selection</h4>
                    {aiModels.map((model) => (
                      <div
                        key={model.id}
                        className="flex items-center justify-between p-3 border rounded-lg"
                      >
                        <div>
                          <div className="font-medium">{model.name}</div>
                          <div className="text-sm text-gray-600">
                            Accuracy: {model.accuracy}%
                          </div>
                        </div>
                        <Badge
                          className={
                            model.status === "active"
                              ? "bg-green-100 text-green-800"
                              : "bg-gray-100 text-gray-800"
                          }
                        >
                          {model.status}
                        </Badge>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-4">
                    <h4 className="font-medium">Scoring Thresholds</h4>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Minimum Score for Consideration:
                        </span>
                        <span className="font-medium">60/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">
                          Auto-Shortlist Threshold:
                        </span>
                        <span className="font-medium">85/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm">Confidence Threshold:</span>
                        <span className="font-medium">90%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button>
                    <Settings className="w-4 h-4 mr-2" />
                    Update Configuration
                  </Button>
                  <Button variant="outline">
                    <Shield className="w-4 h-4 mr-2" />
                    Test AI Models
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default AutoScore;
