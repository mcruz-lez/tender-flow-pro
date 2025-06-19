
import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Search, Filter, Plus, Copy, Edit, Download, Star, Clock, DollarSign, FileText, Award, TrendingUp } from "lucide-react";

const BidLibrary = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [activeTab, setActiveTab] = useState("templates");

  const templates = [
    {
      id: "TEMP-001",
      name: "HVAC Maintenance Template",
      category: "Property Maintenance",
      description: "Comprehensive template for HVAC system maintenance contracts including preventive care and emergency response.",
      usageCount: 12,
      successRate: 85,
      avgBidAmount: "$45,000",
      lastUsed: "2024-01-10",
      tags: ["HVAC", "Maintenance", "Commercial"],
      rating: 4.8
    },
    {
      id: "TEMP-002",
      name: "Security Services Template",
      category: "Security Services", 
      description: "Template for security service proposals including patrol schedules, monitoring systems, and emergency protocols.",
      usageCount: 8,
      successRate: 75,
      avgBidAmount: "$65,000",
      lastUsed: "2024-01-08",
      tags: ["Security", "Monitoring", "24/7"],
      rating: 4.6
    },
    {
      id: "TEMP-003",
      name: "Landscaping Services Template",
      category: "Landscaping",
      description: "Template for landscaping and groundskeeping services including seasonal maintenance and aesthetic improvements.",
      usageCount: 15,
      successRate: 90,
      avgBidAmount: "$28,000",
      lastUsed: "2024-01-05",
      tags: ["Landscaping", "Seasonal", "Maintenance"],
      rating: 4.9
    },
    {
      id: "TEMP-004",
      name: "IT Infrastructure Template",
      category: "Technology",
      description: "Template for IT infrastructure projects including network setup, security implementation, and ongoing support.",
      usageCount: 6,
      successRate: 67,
      avgBidAmount: "$120,000",
      lastUsed: "2023-12-28",
      tags: ["IT", "Network", "Security"],
      rating: 4.4
    }
  ];

  const pastBids = [
    {
      id: "BID-003",
      tenderTitle: "Landscaping and Groundskeeping Services",
      category: "Landscaping",
      status: "Awarded",
      bidAmount: "$28,500",
      submissionDate: "2023-12-28",
      winRate: 100,
      feedback: "Excellent proposal with detailed maintenance schedule",
      template: "TEMP-003",
      reusable: true
    },
    {
      id: "BID-004",
      tenderTitle: "Office Building Renovation Project", 
      category: "Renovation",
      status: "Rejected",
      bidAmount: "$125,000",
      submissionDate: "2023-12-20",
      winRate: 0,
      feedback: "Good technical approach but pricing was too high",
      template: null,
      reusable: true
    },
    {
      id: "BID-005",
      tenderTitle: "Parking Lot Maintenance Contract",
      category: "Property Maintenance",
      status: "Awarded",
      bidAmount: "$35,000",
      submissionDate: "2023-12-15",
      winRate: 100,
      feedback: "Competitive pricing and excellent service history",
      template: "TEMP-001",
      reusable: true
    },
    {
      id: "BID-006",
      tenderTitle: "Commercial Cleaning Services",
      category: "Cleaning",
      status: "Rejected",
      bidAmount: "$42,000",
      submissionDate: "2023-12-10",
      winRate: 0,
      feedback: "Proposal did not meet specialized cleaning requirements",
      template: null,
      reusable: false
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Awarded": return "bg-green-100 text-green-800 border-green-200";
      case "Rejected": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredTemplates = templates.filter(template =>
    template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    template.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const filteredPastBids = pastBids.filter(bid =>
    bid.tenderTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bid.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bid.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/dashboard" className="text-purple-300 hover:text-white">Dashboard</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-purple-400" />
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link to="/bids" className="text-purple-300 hover:text-white">Bid Management</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-purple-400" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">Bid Library</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                Bid Library
              </h1>
              <p className="text-purple-200">Access templates, past bids, and successful proposals</p>
            </div>
            <Button className="glass-button-primary">
              <Plus className="w-4 h-4 mr-2" />
              Create Template
            </Button>
          </div>

          {/* Search and Filters */}
          <Card className="glass-card border-purple-500/20 mb-6">
            <CardContent className="p-6">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-purple-400" />
                  <Input
                    placeholder="Search templates, bids, or categories..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 glass-input"
                  />
                </div>
                <Button variant="outline" size="sm" className="glass-button">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter by Category
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Library Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="glass-card border-purple-500/20">
              <TabsTrigger value="templates" className="data-[state=active]:bg-purple-600">Bid Templates</TabsTrigger>
              <TabsTrigger value="past-bids" className="data-[state=active]:bg-blue-600">Past Bids</TabsTrigger>
              <TabsTrigger value="winning-bids" className="data-[state=active]:bg-green-600">Winning Strategies</TabsTrigger>
            </TabsList>

            <TabsContent value="templates">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTemplates.map((template) => (
                  <Card key={template.id} className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300 transform hover:scale-105">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge className="bg-purple-100 text-purple-800">{template.category}</Badge>
                        <div className="flex items-center">
                          <Star className="w-4 h-4 text-yellow-400 mr-1" />
                          <span className="text-yellow-400 text-sm">{template.rating}</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg text-white">{template.name}</CardTitle>
                      <CardDescription className="text-purple-200">{template.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">Usage Count:</span>
                          <span className="font-medium text-white">{template.usageCount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">Success Rate:</span>
                          <span className="font-medium text-green-400">{template.successRate}%</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">Avg Bid Amount:</span>
                          <span className="font-medium text-white">{template.avgBidAmount}</span>
                        </div>
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">Last Used:</span>
                          <span className="font-medium text-white">{template.lastUsed}</span>
                        </div>
                      </div>

                      <div className="mt-4">
                        <div className="flex flex-wrap gap-1 mb-4">
                          {template.tags.map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs bg-purple-500/10 border-purple-500/30 text-purple-200">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-4 border-t border-purple-500/20">
                        <Button size="sm" className="flex-1 glass-button">
                          <Copy className="w-4 h-4 mr-2" />
                          Use Template
                        </Button>
                        <Button variant="outline" size="sm" className="glass-button">
                          <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="outline" size="sm" className="glass-button">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="past-bids">
              <div className="space-y-4">
                {filteredPastBids.map((bid) => (
                  <Card key={bid.id} className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h3 className="text-lg font-semibold text-white">{bid.tenderTitle}</h3>
                            <Badge className={`${getStatusColor(bid.status)} border`}>
                              {bid.status}
                            </Badge>
                          </div>
                          <p className="text-purple-200 text-sm">Bid ID: {bid.id} • Category: {bid.category}</p>
                        </div>
                        <div className="flex gap-2">
                          {bid.reusable && (
                            <Button size="sm" className="glass-button">
                              <Copy className="w-4 h-4 mr-2" />
                              Reuse Bid
                            </Button>
                          )}
                          <Button variant="outline" size="sm" className="glass-button">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="space-y-3">
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-300">Bid Amount:</span>
                            <span className="font-medium text-white">{bid.bidAmount}</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-purple-300">Submission Date:</span>
                            <span className="font-medium text-white">{bid.submissionDate}</span>
                          </div>
                          {bid.template && (
                            <div className="flex justify-between text-sm">
                              <span className="text-purple-300">Template Used:</span>
                              <span className="font-medium text-blue-400">{bid.template}</span>
                            </div>
                          )}
                        </div>

                        <div className="md:col-span-2">
                          <h4 className="font-medium text-white mb-2">Feedback & Analysis</h4>
                          <p className="text-sm text-purple-200 bg-purple-500/10 rounded-lg p-3 border border-purple-500/20">
                            {bid.feedback}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="winning-bids">
              <div className="space-y-6">
                <Card className="glass-card border-green-500/20">
                  <CardHeader>
                    <CardTitle className="text-white flex items-center">
                      <Award className="w-5 h-5 mr-2 text-green-400" />
                      Winning Strategies Analysis
                    </CardTitle>
                    <CardDescription className="text-purple-200">
                      Insights from your most successful bids
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-green-400 mb-2">75%</div>
                        <p className="text-purple-200 text-sm">Win Rate</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-blue-400 mb-2">$45K</div>
                        <p className="text-purple-200 text-sm">Avg Winning Bid</p>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-purple-400 mb-2">3.2</div>
                        <p className="text-purple-200 text-sm">Avg Days to Submit</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card className="glass-card border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Key Success Factors</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-center text-purple-200">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                          Competitive pricing within budget range
                        </li>
                        <li className="flex items-center text-purple-200">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                          Detailed project methodology
                        </li>
                        <li className="flex items-center text-purple-200">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                          Strong team credentials
                        </li>
                        <li className="flex items-center text-purple-200">
                          <TrendingUp className="w-4 h-4 mr-2 text-green-400" />
                          Early submission timing
                        </li>
                      </ul>
                    </CardContent>
                  </Card>

                  <Card className="glass-card border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white text-lg">Best Performing Categories</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-purple-200">Landscaping</span>
                          <div className="flex items-center">
                            <div className="w-20 bg-purple-500/20 rounded-full h-2 mr-2">
                              <div className="bg-green-500 h-2 rounded-full" style={{width: '90%'}}></div>
                            </div>
                            <span className="text-green-400 text-sm">90%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-200">Property Maintenance</span>
                          <div className="flex items-center">
                            <div className="w-20 bg-purple-500/20 rounded-full h-2 mr-2">
                              <div className="bg-blue-500 h-2 rounded-full" style={{width: '85%'}}></div>
                            </div>
                            <span className="text-blue-400 text-sm">85%</span>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-purple-200">Security Services</span>
                          <div className="flex items-center">
                            <div className="w-20 bg-purple-500/20 rounded-full h-2 mr-2">
                              <div className="bg-yellow-500 h-2 rounded-full" style={{width: '75%'}}></div>
                            </div>
                            <span className="text-yellow-400 text-sm">75%</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default BidLibrary;
