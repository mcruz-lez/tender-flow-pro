import { useState } from "react";
import { useParams } from "react-router-dom";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Progress } from "@/components/ui/progress";
import {
  Star,
  Users,
  MessageSquare,
  Save,
  Send,
  Download,
  Award,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  ThumbsUp,
  ThumbsDown,
} from "lucide-react";
import { toast } from "sonner";

interface EvaluatorScore {
  technical: number;
  price: number;
  experience: number;
  resources: number;
  compliance: number;
}

interface BidWithScores {
  id: string;
  vendor: string;
  amount: string;
  submittedDate: string;
  status: string;
  overallScore: number;
  evaluatorScores: Record<string, EvaluatorScore>;
}

const EvaluationPanel = () => {
  const { tenderId } = useParams();
  const [selectedBid, setSelectedBid] = useState("1");
  const [scores, setScores] = useState<Record<string, Record<string, number>>>(
    {},
  );
  const [comments, setComments] = useState<Record<string, string>>({});
  const [newComment, setNewComment] = useState("");

  const quickActions = [
    { label: "Auto Score", href: "/evaluation/auto-score", icon: Star },
    {
      label: "Generate Report",
      href: "#",
      icon: FileText,
      variant: "outline" as const,
    },
    {
      label: "Send to Approval",
      href: "#",
      icon: Send,
      variant: "outline" as const,
    },
  ];

  const tender = {
    id: tenderId || "T001",
    title: "HVAC Maintenance Contract",
    category: "Property Maintenance",
    deadline: "2024-01-20",
    budget: "$50,000",
    description: "Comprehensive HVAC maintenance services for office complex",
  };

  const evaluationCriteria = [
    {
      id: "technical",
      name: "Technical Capability",
      weight: 30,
      maxScore: 100,
    },
    { id: "price", name: "Price Competitiveness", weight: 25, maxScore: 100 },
    {
      id: "experience",
      name: "Experience & Track Record",
      weight: 20,
      maxScore: 100,
    },
    {
      id: "resources",
      name: "Resource Availability",
      weight: 15,
      maxScore: 100,
    },
    {
      id: "compliance",
      name: "Compliance & Certifications",
      weight: 10,
      maxScore: 100,
    },
  ];

  const bids: BidWithScores[] = [
    {
      id: "1",
      vendor: "Climate Control Solutions",
      amount: "$48,500",
      submittedDate: "2024-01-15",
      status: "Under Review",
      overallScore: 0,
      evaluatorScores: {
        evaluator1: {
          technical: 85,
          price: 90,
          experience: 80,
          resources: 85,
          compliance: 95,
        },
        evaluator2: {
          technical: 80,
          price: 88,
          experience: 85,
          resources: 80,
          compliance: 90,
        },
      },
    },
    {
      id: "2",
      vendor: "Professional HVAC Services",
      amount: "$52,000",
      submittedDate: "2024-01-14",
      status: "Under Review",
      overallScore: 0,
      evaluatorScores: {
        evaluator1: {
          technical: 90,
          price: 75,
          experience: 95,
          resources: 90,
          compliance: 85,
        },
        evaluator2: {
          technical: 88,
          price: 78,
          experience: 90,
          resources: 85,
          compliance: 88,
        },
      },
    },
    {
      id: "3",
      vendor: "Elite Mechanical",
      amount: "$45,900",
      submittedDate: "2024-01-13",
      status: "Under Review",
      overallScore: 0,
      evaluatorScores: {
        evaluator1: {
          technical: 95,
          price: 95,
          experience: 85,
          resources: 80,
          compliance: 90,
        },
        evaluator2: {
          technical: 92,
          price: 92,
          experience: 88,
          resources: 85,
          compliance: 88,
        },
      },
    },
  ];

  const evaluators = [
    {
      id: "evaluator1",
      name: "John Smith",
      role: "Technical Manager",
      status: "Active",
    },
    {
      id: "evaluator2",
      name: "Sarah Wilson",
      role: "Procurement Lead",
      status: "Active",
    },
    {
      id: "evaluator3",
      name: "Mike Johnson",
      role: "Finance Manager",
      status: "Pending",
    },
  ];

  const discussionComments = [
    {
      id: "1",
      evaluator: "John Smith",
      timestamp: "2 hours ago",
      comment:
        "Elite Mechanical shows strong technical capability but I'm concerned about their resource availability for this scale of project.",
      bidId: "3",
    },
    {
      id: "2",
      evaluator: "Sarah Wilson",
      timestamp: "1 hour ago",
      comment:
        "Climate Control Solutions has competitive pricing and excellent compliance records. Their experience with similar projects is impressive.",
      bidId: "1",
    },
  ];

  const calculateWeightedScore = (bid: BidWithScores) => {
    let totalScore = 0;
    const evaluatorCount = Object.keys(bid.evaluatorScores).length;

    evaluationCriteria.forEach((criteria) => {
      let criteriaAvg = 0;
      Object.values(bid.evaluatorScores).forEach(
        (evaluatorScore: EvaluatorScore) => {
          criteriaAvg += evaluatorScore[criteria.id] || 0;
        },
      );
      criteriaAvg = criteriaAvg / evaluatorCount;
      totalScore += (criteriaAvg * criteria.weight) / 100;
    });

    return Math.round(totalScore);
  };

  const handleScoreChange = (
    bidId: string,
    criteriaId: string,
    score: number,
  ) => {
    setScores((prev) => ({
      ...prev,
      [bidId]: {
        ...prev[bidId],
        [criteriaId]: score,
      },
    }));
  };

  const handleSaveScore = () => {
    toast.success("Scores saved successfully");
  };

  const handleSubmitEvaluation = () => {
    toast.success("Evaluation submitted for approval");
  };

  const handleAddComment = () => {
    if (!newComment.trim()) return;
    toast.success("Comment added successfully");
    setNewComment("");
  };

  return (
    <PageTemplate
      title="Evaluation Panel"
      description="Collaborative bid evaluation interface"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Tender Info Card */}
        <Card>
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle>{tender.title}</CardTitle>
                <CardDescription>
                  ID: {tender.id} • {tender.category}
                </CardDescription>
              </div>
              <Badge>Under Evaluation</Badge>
            </div>
            <div className="grid grid-cols-3 gap-4 mt-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Budget</div>
                <div className="font-semibold">{tender.budget}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Deadline</div>
                <div className="font-semibold">{tender.deadline}</div>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <div className="text-sm text-gray-600">Bids Received</div>
                <div className="font-semibold">{bids.length}</div>
              </div>
            </div>
          </CardHeader>
        </Card>

        {/* Main Evaluation Interface */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Bid Selection Sidebar */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Bids ({bids.length})</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {bids.map((bid) => (
                <div
                  key={bid.id}
                  className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                    selectedBid === bid.id
                      ? "border-blue-500 bg-blue-50"
                      : "hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedBid(bid.id)}
                >
                  <div className="font-medium text-sm">{bid.vendor}</div>
                  <div className="text-xs text-gray-500">{bid.amount}</div>
                  <div className="flex items-center justify-between mt-2">
                    <div className="text-xs">
                      Score: {calculateWeightedScore(bid)}/100
                    </div>
                    <Progress
                      value={calculateWeightedScore(bid)}
                      className="w-12 h-2"
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Main Evaluation Content */}
          <div className="lg:col-span-3">
            <Tabs defaultValue="scoring" className="space-y-6">
              <TabsList>
                <TabsTrigger value="scoring">Scoring</TabsTrigger>
                <TabsTrigger value="comparison">Comparison</TabsTrigger>
                <TabsTrigger value="discussion">Discussion</TabsTrigger>
                <TabsTrigger value="documents">Documents</TabsTrigger>
              </TabsList>

              <TabsContent value="scoring">
                <Card>
                  <CardHeader>
                    <CardTitle>
                      Score: {bids.find((b) => b.id === selectedBid)?.vendor}
                    </CardTitle>
                    <CardDescription>
                      Evaluate each criteria and provide your scores
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {evaluationCriteria.map((criteria) => (
                      <div key={criteria.id} className="space-y-2">
                        <div className="flex justify-between items-center">
                          <span className="font-medium">{criteria.name}</span>
                          <span className="text-sm text-gray-500">
                            Weight: {criteria.weight}%
                          </span>
                        </div>
                        <div className="flex items-center gap-4">
                          <Input
                            type="number"
                            min="0"
                            max={criteria.maxScore}
                            placeholder="Enter score"
                            value={scores[selectedBid]?.[criteria.id] || ""}
                            onChange={(e) =>
                              handleScoreChange(
                                selectedBid,
                                criteria.id,
                                parseInt(e.target.value) || 0,
                              )
                            }
                            className="w-24"
                          />
                          <span className="text-sm text-gray-500">
                            / {criteria.maxScore}
                          </span>
                          <Progress
                            value={
                              ((scores[selectedBid]?.[criteria.id] || 0) /
                                criteria.maxScore) *
                              100
                            }
                            className="flex-1"
                          />
                        </div>
                      </div>
                    ))}

                    <div className="pt-4 border-t">
                      <Textarea
                        placeholder="Add evaluation comments..."
                        value={comments[selectedBid] || ""}
                        onChange={(e) =>
                          setComments({
                            ...comments,
                            [selectedBid]: e.target.value,
                          })
                        }
                        rows={3}
                      />
                    </div>

                    <div className="flex gap-2">
                      <Button onClick={handleSaveScore}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Scores
                      </Button>
                      <Button variant="outline">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="comparison">
                <Card>
                  <CardHeader>
                    <CardTitle>Bid Comparison</CardTitle>
                    <CardDescription>
                      Compare all bids side by side
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>Criteria</TableHead>
                          {bids.map((bid) => (
                            <TableHead key={bid.id}>{bid.vendor}</TableHead>
                          ))}
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {evaluationCriteria.map((criteria) => (
                          <TableRow key={criteria.id}>
                            <TableCell className="font-medium">
                              {criteria.name}
                            </TableCell>
                            {bids.map((bid) => {
                              const avgScore =
                                Object.values(bid.evaluatorScores).reduce(
                                  (sum: number, scores: EvaluatorScore) =>
                                    sum + (scores[criteria.id] || 0),
                                  0,
                                ) / Object.keys(bid.evaluatorScores).length;
                              return (
                                <TableCell key={bid.id}>
                                  <div className="flex items-center gap-2">
                                    <span>{Math.round(avgScore)}</span>
                                    <Progress
                                      value={avgScore}
                                      className="w-16"
                                    />
                                  </div>
                                </TableCell>
                              );
                            })}
                          </TableRow>
                        ))}
                        <TableRow className="border-t-2">
                          <TableCell className="font-bold">
                            Overall Score
                          </TableCell>
                          {bids.map((bid) => (
                            <TableCell key={bid.id} className="font-bold">
                              {calculateWeightedScore(bid)}/100
                            </TableCell>
                          ))}
                        </TableRow>
                      </TableBody>
                    </Table>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="discussion">
                <Card>
                  <CardHeader>
                    <CardTitle>Evaluation Discussion</CardTitle>
                    <CardDescription>
                      Collaborate with other evaluators
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {/* Add Comment */}
                    <div className="flex gap-2">
                      <Textarea
                        placeholder="Add your thoughts on this evaluation..."
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        rows={2}
                        className="flex-1"
                      />
                      <Button onClick={handleAddComment}>
                        <Send className="w-4 h-4 mr-2" />
                        Post
                      </Button>
                    </div>

                    {/* Comments */}
                    <div className="space-y-3">
                      {discussionComments.map((comment) => (
                        <div key={comment.id} className="border rounded-lg p-4">
                          <div className="flex justify-between items-start mb-2">
                            <div className="font-medium">
                              {comment.evaluator}
                            </div>
                            <div className="text-sm text-gray-500">
                              {comment.timestamp}
                            </div>
                          </div>
                          <p className="text-gray-700 mb-2">
                            {comment.comment}
                          </p>
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">
                              Bid:{" "}
                              {bids.find((b) => b.id === comment.bidId)?.vendor}
                            </Badge>
                            <Button size="sm" variant="ghost">
                              <ThumbsUp className="w-3 h-3 mr-1" />
                              Like
                            </Button>
                            <Button size="sm" variant="ghost">
                              <MessageSquare className="w-3 h-3 mr-1" />
                              Reply
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="documents">
                <Card>
                  <CardHeader>
                    <CardTitle>Bid Documents</CardTitle>
                    <CardDescription>
                      Review submitted documents for each bid
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {bids.map((bid) => (
                        <div key={bid.id} className="border rounded-lg p-4">
                          <h4 className="font-medium mb-2">{bid.vendor}</h4>
                          <div className="grid grid-cols-2 gap-2">
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Technical Proposal
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Financial Proposal
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Company Profile
                            </Button>
                            <Button variant="outline" size="sm">
                              <FileText className="w-4 h-4 mr-2" />
                              Certifications
                            </Button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>

        {/* Submit Evaluation */}
        <Card>
          <CardContent className="p-4">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-medium">Evaluation Progress</h3>
                <p className="text-sm text-gray-600">
                  2 of 3 evaluators have completed their assessment
                </p>
              </div>
              <div className="flex gap-2">
                <Button variant="outline">Save Draft</Button>
                <Button onClick={handleSubmitEvaluation}>
                  <Award className="w-4 h-4 mr-2" />
                  Submit Evaluation
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default EvaluationPanel;
