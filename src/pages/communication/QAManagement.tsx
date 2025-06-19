
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  MessageSquare, 
  Clock, 
  CheckCircle, 
  AlertTriangle,
  Search,
  Filter,
  Plus,
  Eye,
  Edit,
  Send,
  FileText,
  Users,
  Calendar
} from "lucide-react";
import { toast } from "sonner";

const QAManagement = () => {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [newQuestion, setNewQuestion] = useState("");
  const [newAnswer, setNewAnswer] = useState("");

  const quickActions = [
    { label: "New Q&A", href: "#", icon: Plus },
    { label: "FAQ Generator", href: "#", icon: FileText },
    { label: "Bulk Publish", href: "#", icon: Send, variant: "outline" as const }
  ];

  const qaData = [
    {
      id: "QA001",
      question: "What is the required emergency response time for HVAC maintenance?",
      answer: "Emergency response time must be within 4 hours of notification, 24/7 including weekends and holidays.",
      tender: "HVAC Maintenance Contract",
      category: "Technical",
      status: "Published",
      submittedBy: "Elite Construction Co.",
      submittedDate: "2024-01-15",
      respondedDate: "2024-01-16",
      priority: "High",
      views: 23
    },
    {
      id: "QA002",
      question: "Are there any specific insurance requirements for security personnel?",
      answer: "All security personnel must have comprehensive liability insurance with minimum coverage of $2M.",
      tender: "Security Services Contract",
      category: "Legal",
      status: "Published",
      submittedBy: "SecureGuard Solutions",
      submittedDate: "2024-01-14",
      respondedDate: "2024-01-15",
      priority: "Medium",
      views: 18
    },
    {
      id: "QA003",
      question: "What are the environmental compliance requirements for cleaning products?",
      answer: "",
      tender: "Cleaning Services Contract",
      category: "Environmental",
      status: "Pending",
      submittedBy: "ProClean Services",
      submittedDate: "2024-01-18",
      respondedDate: "",
      priority: "Medium",
      views: 5
    },
    {
      id: "QA004",
      question: "Can we propose alternative materials that meet the same specifications?",
      answer: "Alternative materials may be proposed if they meet or exceed the specified performance criteria. Please provide detailed technical specifications and certifications.",
      tender: "Building Renovation Project",
      category: "Technical",
      status: "Draft",
      submittedBy: "BuildCorp Ltd",
      submittedDate: "2024-01-17",
      respondedDate: "2024-01-18",
      priority: "Low",
      views: 12
    }
  ];

  const stats = {
    total: qaData.length,
    pending: qaData.filter(qa => qa.status === "Pending").length,
    published: qaData.filter(qa => qa.status === "Published").length,
    draft: qaData.filter(qa => qa.status === "Draft").length
  };

  const categories = ["Technical", "Commercial", "Legal", "Environmental", "Administrative"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published": return "bg-green-100 text-green-800";
      case "Pending": return "bg-yellow-100 text-yellow-800";
      case "Draft": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const filteredQAs = qaData.filter(qa => {
    const matchesSearch = qa.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         qa.tender.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || qa.category === selectedCategory;
    const matchesStatus = selectedStatus === "all" || qa.status === selectedStatus;
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const handlePublishAnswer = (id: string) => {
    toast.success("Answer published successfully");
  };

  const handleSaveAsDraft = (id: string) => {
    toast.success("Answer saved as draft");
  };

  return (
    <PageTemplate
      title="Q&A Management"
      description="Manage tender questions and answers"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Q&As</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.pending}</div>
              <div className="text-sm text-gray-600">Pending Response</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.published}</div>
              <div className="text-sm text-gray-600">Published</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Edit className="w-8 h-8 text-gray-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.draft}</div>
              <div className="text-sm text-gray-600">Draft</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList>
            <TabsTrigger value="manage">Manage Q&As</TabsTrigger>
            <TabsTrigger value="pending">Pending ({stats.pending})</TabsTrigger>
            <TabsTrigger value="published">Published ({stats.published})</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
          </TabsList>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>Question & Answer Management</CardTitle>
                <CardDescription>Review and respond to tender questions</CardDescription>
                <div className="flex gap-2 flex-wrap">
                  <Input
                    placeholder="Search Q&As..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Status</SelectItem>
                      <SelectItem value="Published">Published</SelectItem>
                      <SelectItem value="Pending">Pending</SelectItem>
                      <SelectItem value="Draft">Draft</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Question</TableHead>
                      <TableHead>Tender</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Priority</TableHead>
                      <TableHead>Submitted</TableHead>
                      <TableHead>Views</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredQAs.map((qa) => (
                      <TableRow key={qa.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium max-w-xs truncate">{qa.question}</div>
                            <div className="text-sm text-gray-500">{qa.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{qa.tender}</TableCell>
                        <TableCell>
                          <Badge variant="outline">{qa.category}</Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(qa.status)}>
                            {qa.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Badge className={getPriorityColor(qa.priority)}>
                            {qa.priority}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div>
                            <div className="text-sm">{qa.submittedDate}</div>
                            <div className="text-xs text-gray-500">{qa.submittedBy}</div>
                          </div>
                        </TableCell>
                        <TableCell>{qa.views}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            <Button size="sm" variant="outline">
                              <Eye className="w-4 h-4" />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Edit className="w-4 h-4" />
                            </Button>
                            {qa.status === "Pending" && (
                              <Button size="sm" onClick={() => handlePublishAnswer(qa.id)}>
                                <Send className="w-4 h-4" />
                              </Button>
                            )}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="pending">
            <div className="space-y-6">
              {qaData.filter(qa => qa.status === "Pending").map((qa) => (
                <Card key={qa.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="text-lg">{qa.question}</CardTitle>
                        <CardDescription>
                          {qa.tender} • {qa.category} • Submitted by {qa.submittedBy} on {qa.submittedDate}
                        </CardDescription>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge className={getPriorityColor(qa.priority)}>
                          {qa.priority}
                        </Badge>
                        <Badge className={getStatusColor(qa.status)}>
                          {qa.status}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label className="text-sm font-medium mb-2 block">Your Response</label>
                      <Textarea
                        placeholder="Type your answer here..."
                        value={newAnswer}
                        onChange={(e) => setNewAnswer(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <FileText className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                        <Button variant="outline" size="sm">
                          <Users className="w-4 h-4 mr-2" />
                          Notify Team
                        </Button>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" onClick={() => handleSaveAsDraft(qa.id)}>
                          Save as Draft
                        </Button>
                        <Button onClick={() => handlePublishAnswer(qa.id)}>
                          <Send className="w-4 h-4 mr-2" />
                          Publish Answer
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="published">
            <Card>
              <CardHeader>
                <CardTitle>Published Q&As</CardTitle>
                <CardDescription>Questions and answers visible to all bidders</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {qaData.filter(qa => qa.status === "Published").map((qa) => (
                    <div key={qa.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-medium">{qa.question}</h4>
                          <p className="text-sm text-gray-600 mt-1">{qa.tender} • {qa.category}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-gray-500">{qa.views} views</span>
                          <Badge className={getPriorityColor(qa.priority)}>
                            {qa.priority}
                          </Badge>
                        </div>
                      </div>
                      <div className="bg-blue-50 p-3 rounded">
                        <p className="text-sm">{qa.answer}</p>
                      </div>
                      <div className="flex items-center justify-between mt-3 text-sm text-gray-500">
                        <span>Published on {qa.respondedDate}</span>
                        <div className="flex items-center space-x-2">
                          <Button variant="ghost" size="sm">
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          <Button variant="ghost" size="sm">
                            <Eye className="w-4 h-4 mr-2" />
                            View Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Q&A Performance</CardTitle>
                  <CardDescription>Response times and engagement metrics</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Average Response Time</span>
                      <span className="text-2xl font-bold text-blue-600">1.2 days</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Total Views</span>
                      <span className="text-2xl font-bold text-green-600">348</span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Most Active Category</span>
                      <span className="text-2xl font-bold text-purple-600">Technical</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Category Distribution</CardTitle>
                  <CardDescription>Questions by category</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {categories.map((category) => {
                      const count = qaData.filter(qa => qa.category === category).length;
                      const percentage = (count / qaData.length) * 100;
                      return (
                        <div key={category} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{category}</span>
                            <span>{count} questions</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div 
                              className="bg-blue-600 h-2 rounded-full" 
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default QAManagement;
