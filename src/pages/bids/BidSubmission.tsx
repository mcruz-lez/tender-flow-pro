
import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Save, Send, FileUp, Calculator, Users, Clock, DollarSign, FileText, AlertCircle, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const BidSubmission = () => {
  const { tenderId } = useParams();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");
  const [progress, setProgress] = useState(25);

  const form = useForm({
    defaultValues: {
      bidAmount: "",
      projectDuration: "",
      startDate: "",
      endDate: "",
      description: "",
      methodology: "",
      teamSize: "",
      keyPersonnel: "",
      experience: "",
      certifications: "",
      equipment: "",
      materials: "",
      laborCosts: "",
      materialCosts: "",
      equipmentCosts: "",
      overheadCosts: "",
      profitMargin: "",
      totalCost: ""
    }
  });

  // Mock tender data
  const tender = {
    id: tenderId,
    title: "HVAC System Maintenance Contract",
    category: "Property Maintenance",
    deadline: "2024-01-15",
    budget: "$40,000 - $60,000",
    description: "Comprehensive HVAC maintenance services for a portfolio of commercial buildings including preventive maintenance, emergency repairs, and system optimization.",
    requirements: [
      "Licensed HVAC technicians",
      "24/7 emergency response capability", 
      "Preventive maintenance schedule",
      "Energy efficiency optimization",
      "Detailed reporting and documentation"
    ],
    location: "Downtown Business District",
    client: "Metro Property Management LLC"
  };

  const handleSaveDraft = () => {
    toast({
      title: "Draft Saved",
      description: "Your bid has been saved as a draft.",
    });
  };

  const handleSubmitBid = () => {
    toast({
      title: "Bid Submitted",
      description: "Your bid has been successfully submitted for review.",
    });
  };

  const completionSteps = [
    { name: "Basic Info", completed: true },
    { name: "Technical Details", completed: true },
    { name: "Pricing", completed: false },
    { name: "Documents", completed: false }
  ];

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
                <BreadcrumbPage className="text-white">Submit Bid</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex justify-between items-start mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                Submit Bid
              </h1>
              <p className="text-purple-200">Tender ID: {tenderId}</p>
            </div>
            <div className="flex gap-3">
              <Button onClick={handleSaveDraft} variant="outline" className="glass-button">
                <Save className="w-4 h-4 mr-2" />
                Save Draft
              </Button>
              <Button onClick={handleSubmitBid} className="glass-button-primary">
                <Send className="w-4 h-4 mr-2" />
                Submit Bid
              </Button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Tender Information */}
            <Card className="glass-card border-purple-500/20">
              <CardHeader>
                <CardTitle className="text-white flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-purple-400" />
                  Tender Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold text-white mb-2">{tender.title}</h3>
                  <Badge className="bg-purple-100 text-purple-800">{tender.category}</Badge>
                </div>
                
                <div className="space-y-3">
                  <div className="flex items-center text-sm">
                    <Clock className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-purple-200">Deadline: </span>
                    <span className="text-white ml-1">{tender.deadline}</span>
                  </div>
                  
                  <div className="flex items-center text-sm">
                    <DollarSign className="w-4 h-4 mr-2 text-purple-400" />
                    <span className="text-purple-200">Budget: </span>
                    <span className="text-white ml-1">{tender.budget}</span>
                  </div>
                </div>

                <div>
                  <h4 className="font-medium text-white mb-2">Key Requirements:</h4>
                  <ul className="space-y-1">
                    {tender.requirements.map((req, index) => (
                      <li key={index} className="text-sm text-purple-200 flex items-start">
                        <CheckCircle className="w-3 h-3 mr-2 mt-0.5 text-green-400 flex-shrink-0" />
                        {req}
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>

            {/* Bid Submission Form */}
            <div className="lg:col-span-2 space-y-6">
              {/* Progress */}
              <Card className="glass-card border-purple-500/20">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-4">
                    <h3 className="font-semibold text-white">Completion Progress</h3>
                    <span className="text-purple-200">{progress}% Complete</span>
                  </div>
                  <Progress value={progress} className="mb-4" />
                  <div className="flex justify-between">
                    {completionSteps.map((step, index) => (
                      <div key={index} className="flex items-center">
                        {step.completed ? (
                          <CheckCircle className="w-4 h-4 text-green-400 mr-1" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-yellow-400 mr-1" />
                        )}
                        <span className={`text-xs ${step.completed ? 'text-green-300' : 'text-purple-200'}`}>
                          {step.name}
                        </span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Bid Form Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab}>
                <TabsList className="glass-card border-purple-500/20 w-full">
                  <TabsTrigger value="overview" className="data-[state=active]:bg-purple-600">Overview</TabsTrigger>
                  <TabsTrigger value="technical" className="data-[state=active]:bg-blue-600">Technical</TabsTrigger>
                  <TabsTrigger value="pricing" className="data-[state=active]:bg-green-600">Pricing</TabsTrigger>
                  <TabsTrigger value="documents" className="data-[state=active]:bg-yellow-600">Documents</TabsTrigger>
                </TabsList>

                <TabsContent value="overview">
                  <Card className="glass-card border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Bid Overview</CardTitle>
                      <CardDescription className="text-purple-200">
                        Provide basic information about your bid proposal
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="bidAmount" className="text-purple-200">Bid Amount ($)</Label>
                          <Input
                            id="bidAmount"
                            placeholder="48,500"
                            className="glass-input mt-1"
                            {...form.register("bidAmount")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="projectDuration" className="text-purple-200">Project Duration (months)</Label>
                          <Input
                            id="projectDuration"
                            placeholder="12"
                            className="glass-input mt-1"
                            {...form.register("projectDuration")}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="startDate" className="text-purple-200">Proposed Start Date</Label>
                          <Input
                            id="startDate"
                            type="date"
                            className="glass-input mt-1"
                            {...form.register("startDate")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="endDate" className="text-purple-200">Proposed End Date</Label>
                          <Input
                            id="endDate"
                            type="date"
                            className="glass-input mt-1"
                            {...form.register("endDate")}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="description" className="text-purple-200">Project Description</Label>
                        <Textarea
                          id="description"
                          placeholder="Describe your approach to this project..."
                          className="glass-input mt-1 min-h-[120px]"
                          {...form.register("description")}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="technical">
                  <Card className="glass-card border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white">Technical Details</CardTitle>
                      <CardDescription className="text-purple-200">
                        Provide technical specifications and methodology
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div>
                        <Label htmlFor="methodology" className="text-purple-200">Project Methodology</Label>
                        <Textarea
                          id="methodology"
                          placeholder="Describe your technical approach and methodology..."
                          className="glass-input mt-1 min-h-[120px]"
                          {...form.register("methodology")}
                        />
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="teamSize" className="text-purple-200">Team Size</Label>
                          <Input
                            id="teamSize"
                            placeholder="5 technicians"
                            className="glass-input mt-1"
                            {...form.register("teamSize")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="experience" className="text-purple-200">Relevant Experience (years)</Label>
                          <Input
                            id="experience"
                            placeholder="10"
                            className="glass-input mt-1"
                            {...form.register("experience")}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="keyPersonnel" className="text-purple-200">Key Personnel</Label>
                        <Textarea
                          id="keyPersonnel"
                          placeholder="List key team members and their qualifications..."
                          className="glass-input mt-1"
                          {...form.register("keyPersonnel")}
                        />
                      </div>

                      <div>
                        <Label htmlFor="equipment" className="text-purple-200">Equipment & Tools</Label>
                        <Textarea
                          id="equipment"
                          placeholder="List specialized equipment and tools to be used..."
                          className="glass-input mt-1"
                          {...form.register("equipment")}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="pricing">
                  <Card className="glass-card border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <Calculator className="w-5 h-5 mr-2 text-green-400" />
                        Pricing Breakdown
                      </CardTitle>
                      <CardDescription className="text-purple-200">
                        Provide detailed cost breakdown for your bid
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="laborCosts" className="text-purple-200">Labor Costs ($)</Label>
                          <Input
                            id="laborCosts"
                            placeholder="25,000"
                            className="glass-input mt-1"
                            {...form.register("laborCosts")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="materialCosts" className="text-purple-200">Material Costs ($)</Label>
                          <Input
                            id="materialCosts"
                            placeholder="15,000"
                            className="glass-input mt-1"
                            {...form.register("materialCosts")}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="equipmentCosts" className="text-purple-200">Equipment Costs ($)</Label>
                          <Input
                            id="equipmentCosts"
                            placeholder="5,000"
                            className="glass-input mt-1"
                            {...form.register("equipmentCosts")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="overheadCosts" className="text-purple-200">Overhead Costs ($)</Label>
                          <Input
                            id="overheadCosts"
                            placeholder="3,500"
                            className="glass-input mt-1"
                            {...form.register("overheadCosts")}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <Label htmlFor="profitMargin" className="text-purple-200">Profit Margin (%)</Label>
                          <Input
                            id="profitMargin"
                            placeholder="10"
                            className="glass-input mt-1"
                            {...form.register("profitMargin")}
                          />
                        </div>
                        <div>
                          <Label htmlFor="totalCost" className="text-purple-200">Total Bid Amount ($)</Label>
                          <Input
                            id="totalCost"
                            placeholder="48,500"
                            className="glass-input mt-1 font-bold"
                            {...form.register("totalCost")}
                          />
                        </div>
                      </div>

                      <div className="bg-purple-500/10 rounded-lg p-4 border border-purple-500/20">
                        <h4 className="font-medium text-white mb-2">Cost Summary</h4>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-purple-200">Subtotal:</span>
                            <span className="text-white">$48,500</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-purple-200">Tax (8.5%):</span>
                            <span className="text-white">$4,123</span>
                          </div>
                          <div className="flex justify-between font-bold border-t border-purple-500/20 pt-2">
                            <span className="text-white">Total:</span>
                            <span className="text-green-400">$52,623</span>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="documents">
                  <Card className="glass-card border-purple-500/20">
                    <CardHeader>
                      <CardTitle className="text-white flex items-center">
                        <FileUp className="w-5 h-5 mr-2 text-yellow-400" />
                        Supporting Documents
                      </CardTitle>
                      <CardDescription className="text-purple-200">
                        Upload required documents and certificates
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-400/50 transition-colors">
                          <FileUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <p className="text-white font-medium mb-1">Company License</p>
                          <p className="text-purple-200 text-sm">Upload your business license</p>
                          <Button className="mt-3 glass-button" size="sm">Choose File</Button>
                        </div>

                        <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-400/50 transition-colors">
                          <FileUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <p className="text-white font-medium mb-1">Insurance Certificate</p>
                          <p className="text-purple-200 text-sm">Upload insurance documentation</p>
                          <Button className="mt-3 glass-button" size="sm">Choose File</Button>
                        </div>

                        <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-400/50 transition-colors">
                          <FileUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <p className="text-white font-medium mb-1">Technical Specifications</p>
                          <p className="text-purple-200 text-sm">Upload detailed technical docs</p>
                          <Button className="mt-3 glass-button" size="sm">Choose File</Button>
                        </div>

                        <div className="border-2 border-dashed border-purple-500/30 rounded-lg p-6 text-center hover:border-purple-400/50 transition-colors">
                          <FileUp className="w-8 h-8 text-purple-400 mx-auto mb-2" />
                          <p className="text-white font-medium mb-1">References</p>
                          <p className="text-purple-200 text-sm">Upload client references</p>
                          <Button className="mt-3 glass-button" size="sm">Choose File</Button>
                        </div>
                      </div>

                      <div className="bg-yellow-500/10 rounded-lg p-4 border border-yellow-500/20">
                        <div className="flex items-start">
                          <AlertCircle className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" />
                          <div>
                            <h4 className="font-medium text-white mb-1">Document Requirements</h4>
                            <ul className="text-sm text-yellow-200 space-y-1">
                              <li>• All documents must be in PDF format</li>
                              <li>• Maximum file size: 10MB per document</li>
                              <li>• Documents must be current and valid</li>
                              <li>• Business license must be active</li>
                            </ul>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BidSubmission;
