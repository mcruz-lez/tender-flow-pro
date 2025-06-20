import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { 
  ArrowLeft, 
  Edit, 
  Share2, 
  Download, 
  Users, 
  MessageSquare, 
  Clock, 
  DollarSign, 
  MapPin, 
  Calendar,
  FileText,
  Award,
  AlertTriangle,
  CheckCircle,
  Eye,
  Send,
  Star
} from "lucide-react";
import { toast } from "sonner";
import { StripeCheckoutButton } from '@/components/StripeCheckoutButton';

const TenderDetails = () => {
  const { id } = useParams();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [newMessage, setNewMessage] = useState("");

  const tender = {
    id: id || "1",
    title: "HVAC System Maintenance Contract",
    category: "Property Maintenance",
    status: "Active",
    deadline: "2024-01-15",
    publishDate: "2023-12-01",
    value: "$50,000",
    location: "Downtown Office Complex",
    description: "Comprehensive HVAC maintenance services including preventive maintenance, emergency repairs, and system optimization for a 50,000 sq ft office complex.",
    requirements: "Licensed HVAC technicians, 24/7 emergency response, preventive maintenance schedule, energy efficiency reporting.",
    bids: 12,
    views: 156,
    questions: 8,
    documents: [
      { name: "Technical Specifications.pdf", size: "2.4 MB", uploaded: "2023-12-01" },
      { name: "Site Plans.dwg", size: "1.8 MB", uploaded: "2023-12-01" },
      { name: "Current System Manual.pdf", size: "5.2 MB", uploaded: "2023-12-02" }
    ]
  };

  const bids = [
    {
      id: "1",
      vendor: "Climate Control Solutions",
      amount: "$48,500",
      status: "Submitted",
      score: 85,
      submittedDate: "2023-12-15",
      rating: 4.8
    },
    {
      id: "2", 
      vendor: "Professional HVAC Services",
      amount: "$52,000",
      status: "Under Review",
      score: 78,
      submittedDate: "2023-12-14",
      rating: 4.6
    },
    {
      id: "3",
      vendor: "Elite Mechanical",
      amount: "$45,900",
      status: "Shortlisted",
      score: 92,
      submittedDate: "2023-12-13",
      rating: 4.9
    }
  ];

  const qaMessages = [
    {
      id: "1",
      vendor: "Climate Control Solutions",
      question: "What is the current age of the HVAC equipment?",
      answer: "The main units were installed in 2018, with the last major service in 2022.",
      date: "2023-12-10"
    },
    {
      id: "2",
      vendor: "Professional HVAC Services", 
      question: "Are there any specific energy efficiency targets?",
      answer: "We aim to maintain current efficiency levels with 10% improvement targets.",
      date: "2023-12-09"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800 border-green-200";
      case "Draft": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "Closed": return "bg-gray-100 text-gray-800 border-gray-200";
      case "Awarded": return "bg-blue-100 text-blue-800 border-blue-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getBidStatusColor = (status: string) => {
    switch (status) {
      case "Submitted": return "bg-blue-100 text-blue-800";
      case "Under Review": return "bg-yellow-100 text-yellow-800";
      case "Shortlisted": return "bg-green-100 text-green-800";
      case "Rejected": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success("Message sent to all bidders");
    setNewMessage("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild className="text-white/70 hover:text-white hover:bg-white/10">
              <Link to="/tenders">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tenders
              </Link>
            </Button>
          </div>

          {/* Title Card */}
          <Card className="mb-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Badge className={getStatusColor(tender.status)}>
                      {tender.status}
                    </Badge>
                    <span className="text-sm text-white/60">ID: {tender.id}</span>
                  </div>
                  <CardTitle className="text-2xl text-white">{tender.title}</CardTitle>
                  <CardDescription className="text-white/70">{tender.category}</CardDescription>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Edit className="w-4 h-4 mr-2" />
                    Edit
                  </Button>
                  <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                    <Share2 className="w-4 h-4 mr-2" />
                    Share
                  </Button>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <DollarSign className="w-5 h-5 text-green-400 mx-auto mb-1" />
                  <p className="text-sm text-white/60">Budget</p>
                  <p className="font-semibold text-white">{tender.value}</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <Calendar className="w-5 h-5 text-blue-400 mx-auto mb-1" />
                  <p className="text-sm text-white/60">Deadline</p>
                  <p className="font-semibold text-white">{tender.deadline}</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <Users className="w-5 h-5 text-purple-400 mx-auto mb-1" />
                  <p className="text-sm text-white/60">Bids</p>
                  <p className="font-semibold text-white">{tender.bids}</p>
                </div>
                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                  <Eye className="w-5 h-5 text-orange-400 mx-auto mb-1" />
                  <p className="text-sm text-white/60">Views</p>
                  <p className="font-semibold text-white">{tender.views}</p>
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Main Content Tabs */}
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-xl border-white/20">
              <TabsTrigger value="overview" className="data-[state=active]:bg-white/20">Overview</TabsTrigger>
              <TabsTrigger value="bids" className="data-[state=active]:bg-white/20">Bids ({tender.bids})</TabsTrigger>
              <TabsTrigger value="qa" className="data-[state=active]:bg-white/20">Q&A ({tender.questions})</TabsTrigger>
              <TabsTrigger value="documents" className="data-[state=active]:bg-white/20">Documents</TabsTrigger>
              <TabsTrigger value="evaluation" className="data-[state=active]:bg-white/20">Evaluation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-6">
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white">Description</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 leading-relaxed">{tender.description}</p>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white">Requirements & Specifications</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-white/80 leading-relaxed">{tender.requirements}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-6">
                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white">Tender Details</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex justify-between">
                        <span className="text-white/60">Published:</span>
                        <span className="text-white">{tender.publishDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Location:</span>
                        <span className="text-white">{tender.location}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-white/60">Category:</span>
                        <span className="text-white">{tender.category}</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                    <CardHeader>
                      <CardTitle className="text-white">Quick Actions</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      <Button asChild className="w-full justify-start bg-blue-600 hover:bg-blue-700">
                        <Link to={`/evaluation/panel/${tender.id}`}>
                          <Award className="w-4 h-4 mr-2" />
                          Start Evaluation
                        </Link>
                      </Button>
                      <Button asChild variant="outline" className="w-full justify-start border-white/20 text-white hover:bg-white/10">
                        <Link to="/vendors">
                          <Users className="w-4 h-4 mr-2" />
                          View Vendors
                        </Link>
                      </Button>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="bids">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white">Submitted Bids</CardTitle>
                  <CardDescription className="text-white/70">
                    Review and manage all submitted bids for this tender
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Table>
                    <TableHeader>
                      <TableRow className="border-white/20">
                        <TableHead className="text-white/80">Vendor</TableHead>
                        <TableHead className="text-white/80">Amount</TableHead>
                        <TableHead className="text-white/80">Status</TableHead>
                        <TableHead className="text-white/80">Score</TableHead>
                        <TableHead className="text-white/80">Rating</TableHead>
                        <TableHead className="text-white/80">Submitted</TableHead>
                        <TableHead className="text-white/80">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {bids.map((bid) => (
                        <TableRow key={bid.id} className="border-white/10 hover:bg-white/5">
                          <TableCell className="text-white">{bid.vendor}</TableCell>
                          <TableCell className="text-white font-medium">{bid.amount}</TableCell>
                          <TableCell>
                            <Badge className={getBidStatusColor(bid.status)}>
                              {bid.status}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-white">{bid.score}/100</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Star className="w-4 h-4 text-yellow-400 fill-current" />
                              <span className="text-white">{bid.rating}</span>
                            </div>
                          </TableCell>
                          <TableCell className="text-white/70">{bid.submittedDate}</TableCell>
                          <TableCell>
                            <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                              <Eye className="w-4 h-4 mr-2" />
                              Review
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="qa">
              <div className="space-y-6">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Send Message to Bidders</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <Textarea
                      placeholder="Type your message to all bidders..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="bg-white/5 border-white/20 text-white placeholder:text-white/50"
                      rows={3}
                    />
                    <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
                      <Send className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Questions & Answers</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {qaMessages.map((qa) => (
                      <div key={qa.id} className="border border-white/10 rounded-lg p-4 space-y-3">
                        <div className="flex justify-between items-start">
                          <span className="font-medium text-white">{qa.vendor}</span>
                          <span className="text-sm text-white/60">{qa.date}</span>
                        </div>
                        <div className="bg-white/5 rounded-lg p-3">
                          <p className="text-sm text-white/80 mb-2">Q: {qa.question}</p>
                          <p className="text-sm text-white">A: {qa.answer}</p>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="documents">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white">Tender Documents</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {tender.documents.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-white/5 rounded-lg border border-white/10">
                        <div className="flex items-center gap-3">
                          <FileText className="w-5 h-5 text-blue-400" />
                          <div>
                            <p className="font-medium text-white">{doc.name}</p>
                            <p className="text-sm text-white/60">{doc.size} • Uploaded {doc.uploaded}</p>
                          </div>
                        </div>
                        <Button size="sm" variant="outline" className="border-white/20 text-white hover:bg-white/10">
                          <Download className="w-4 h-4 mr-2" />
                          Download
                        </Button>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="evaluation">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white">Evaluation Status</CardTitle>
                  <CardDescription className="text-white/70">
                    Track the evaluation progress for all submitted bids
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                        <CheckCircle className="w-8 h-8 text-green-400 mx-auto mb-2" />
                        <p className="text-sm text-white/60">Evaluated</p>
                        <p className="text-xl font-bold text-white">8</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                        <Clock className="w-8 h-8 text-yellow-400 mx-auto mb-2" />
                        <p className="text-sm text-white/60">Pending</p>
                        <p className="text-xl font-bold text-white">3</p>
                      </div>
                      <div className="text-center p-4 bg-white/5 rounded-lg border border-white/10">
                        <AlertTriangle className="w-8 h-8 text-red-400 mx-auto mb-2" />
                        <p className="text-sm text-white/60">Issues</p>
                        <p className="text-xl font-bold text-white">1</p>
                      </div>
                    </div>
                    
                    <Button asChild className="w-full bg-blue-600 hover:bg-blue-700">
                      <Link to={`/evaluation/panel/${tender.id}`}>
                        <Award className="w-4 h-4 mr-2" />
                        Start Evaluation Process
                      </Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          {/* Payment/Checkout Section */}
          <Card className="mb-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-xl text-white flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-400" />
                Secure Payment
              </CardTitle>
              <CardDescription className="text-white/70">
                Pay tender fees, EMD, or subscription securely via Stripe.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <StripeCheckoutButton
                amount={500}
                currency="usd"
                description={`Tender Fee for ${tender.title}`}
                type="tender"
                onSuccess={() => toast.success('Payment successful!')}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default TenderDetails;
