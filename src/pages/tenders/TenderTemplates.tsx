import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Plus, 
  Search, 
  Filter, 
  Eye, 
  Edit, 
  Copy, 
  Star, 
  Download, 
  Upload,
  FileText,
  Clock,
  Users,
  Building,
  Wrench,
  Shield,
  Leaf,
  Laptop,
  Briefcase,
  BarChart3,
  TrendingUp
} from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const TenderTemplates = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const categories = [
    { id: "all", name: "All Templates", icon: FileText, count: 24 },
    { id: "maintenance", name: "Property Maintenance", icon: Wrench, count: 8 },
    { id: "construction", name: "Construction", icon: Building, count: 6 },
    { id: "security", name: "Security Services", icon: Shield, count: 4 },
    { id: "cleaning", name: "Cleaning Services", icon: Leaf, count: 3 },
    { id: "technology", name: "Technology", icon: Laptop, count: 2 },
    { id: "professional", name: "Professional Services", icon: Briefcase, count: 1 }
  ];

  const templates = [
    {
      id: "1",
      name: "HVAC Maintenance Contract",
      category: "maintenance",
      description: "Comprehensive template for HVAC system maintenance and repair contracts",
      lastUsed: "2023-12-10",
      usage: 45,
      rating: 4.8,
      featured: true,
      estimatedValue: "$25,000 - $75,000",
      duration: "12 months",
      complexity: "Medium"
    },
    {
      id: "2",
      name: "Office Building Security Services",
      category: "security", 
      description: "Complete security services template for commercial buildings",
      lastUsed: "2023-12-08",
      usage: 32,
      rating: 4.7,
      featured: true,
      estimatedValue: "$50,000 - $150,000",
      duration: "24 months",
      complexity: "High"
    },
    {
      id: "3",
      name: "Electrical System Upgrade",
      category: "construction",
      description: "Template for electrical infrastructure upgrades and installations",
      lastUsed: "2023-12-05",
      usage: 28,
      rating: 4.6,
      featured: false,
      estimatedValue: "$15,000 - $50,000",
      duration: "6 months",
      complexity: "High"
    },
    {
      id: "4",
      name: "Cleaning Services Contract",
      category: "cleaning",
      description: "Standard template for commercial cleaning and janitorial services",
      lastUsed: "2023-12-03",
      usage: 67,
      rating: 4.9,
      featured: true,
      estimatedValue: "$10,000 - $30,000",
      duration: "12 months",
      complexity: "Low"
    },
    {
      id: "5",
      name: "Landscaping Services",
      category: "maintenance",
      description: "Comprehensive landscaping and groundskeeping services template",
      lastUsed: "2023-11-28",
      usage: 23,
      rating: 4.5,
      featured: false,
      estimatedValue: "$8,000 - $25,000",
      duration: "12 months",
      complexity: "Medium"
    },
    {
      id: "6",
      name: "IT Infrastructure Services",
      category: "technology",
      description: "Technology services and IT infrastructure management template",
      lastUsed: "2023-11-25",
      usage: 19,
      rating: 4.4,
      featured: false,
      estimatedValue: "$20,000 - $80,000",
      duration: "18 months",
      complexity: "High"
    }
  ];

  const filteredTemplates = templates.filter(template => {
    const matchesSearch = template.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         template.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || template.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case "Low": return "bg-green-100 text-green-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "High": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const handleUseTemplate = (templateId: string, templateName: string) => {
    toast.success(`Using template: ${templateName}`);
  };

  const handlePreviewTemplate = (templateId: string) => {
    toast.info(`Opening preview for template ${templateId}`);
  };

  // Add export and analytics quick actions
  const quickActions = [
    { label: "Create Template", href: "#", icon: Plus, variant: "default" },
    { label: "Import Template", href: "#", icon: Upload, variant: "outline" },
    { label: "Export Data", href: "#", icon: Download, variant: "outline" },
    { label: "Analytics Dashboard", href: "/analytics", icon: BarChart3, variant: "outline" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Tender Templates</h1>
              <p className="text-white/70 mt-2">Create tenders faster with pre-built templates</p>
            </div>
            <div className="flex gap-3">
              {quickActions.map((action, idx) => (
                <Button key={idx} variant={action.variant as "default" | "outline" | "link" | "destructive" | "secondary" | "ghost"} className={action.variant === "default" ? "bg-blue-600 hover:bg-blue-700" : "border-white/20 text-white hover:bg-white/10"}>
                  {action.icon && <action.icon className="w-4 h-4 mr-2" />}
                  {action.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Search and Filters */}
          <Card className="mb-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
            <CardContent className="p-4">
              <div className="flex flex-col sm:flex-row gap-4 items-center justify-between">
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3 top-3 w-4 h-4 text-white/40" />
                  <Input
                    placeholder="Search templates..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white/5 border-white/20 text-white placeholder:text-white/50"
                  />
                </div>
                <Button variant="outline" size="sm" className="border-white/20 text-white hover:bg-white/10">
                  <Filter className="w-4 h-4 mr-2" />
                  Filter
                </Button>
              </div>
            </CardContent>
          </Card>

          <Tabs defaultValue="gallery" className="space-y-6">
            <TabsList className="bg-white/10 backdrop-blur-xl border-white/20">
              <TabsTrigger value="gallery" className="data-[state=active]:bg-white/20">Template Gallery</TabsTrigger>
              <TabsTrigger value="categories" className="data-[state=active]:bg-white/20">Categories</TabsTrigger>
              <TabsTrigger value="my-templates" className="data-[state=active]:bg-white/20">My Templates</TabsTrigger>
              <TabsTrigger value="analytics" className="data-[state=active]:bg-white/20">Analytics</TabsTrigger>
            </TabsList>

            <TabsContent value="gallery">
              {/* Featured Templates */}
              <div className="mb-8">
                <h2 className="text-xl font-semibold text-white mb-4">Featured Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.filter(t => t.featured).map((template) => (
                    <Card
                      key={template.id}
                      className={`bg-gradient-to-br from-[#1e1e3f] to-[#3c1d60] text-white p-6 rounded-2xl shadow-xl transition-all hover:scale-105 hover:shadow-indigo-300 border border-slate-200/40 group ${template.featured ? 'ring-2 ring-purple-400/40' : ''}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          {template.featured ? (
                            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 animate-pulse">Featured</Badge>
                          ) : (
                            <Badge variant="outline" className="border-white/20 text-white">{categories.find(c => c.id === template.category)?.name}</Badge>
                          )}
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-white font-semibold">{template.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-xl font-semibold tracking-tight line-clamp-2 group-hover:text-indigo-200 transition-colors">{template.name}</CardTitle>
                        <CardDescription className="text-white/70 line-clamp-2">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-white/60">Value Range:</span>
                            <p className="text-white font-medium">{template.estimatedValue}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Duration:</span>
                            <p className="text-white font-medium">{template.duration}</p>
                          </div>
                        </div>
                        <div className="flex justify-between items-center">
                          <Badge className={`text-xs font-semibold ${getComplexityColor(template.complexity)} inline-flex items-center gap-2`}>{template.complexity}</Badge>
                          <div className="flex items-center gap-1 text-white/60">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{template.usage} uses</span>
                          </div>
                        </div>
                        <div className="flex gap-2 pt-2">
                          <Button
                            size="sm"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md rounded-lg transition-all animate-pulse group-hover:scale-105 group-hover:shadow-indigo-300"
                            onClick={() => handleUseTemplate(template.id, template.name)}
                          >
                            Use Template
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 transition-all"
                            onClick={() => handlePreviewTemplate(template.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            className="border-white/20 text-white hover:bg-white/10 transition-all"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* All Templates */}
              <div>
                <h2 className="text-xl font-semibold text-white mb-4">All Templates</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredTemplates.filter(t => !t.featured).map((template) => (
                    <Card
                      key={template.id}
                      className={`bg-gradient-to-br from-[#1e1e3f] to-[#3c1d60] text-white p-6 rounded-2xl shadow-xl transition-all hover:scale-105 hover:shadow-indigo-300 border border-slate-200/40 group ${template.featured ? 'ring-2 ring-purple-400/40' : ''}`}
                    >
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start mb-2">
                          <Badge variant="outline" className="border-white/20 text-white">
                            {categories.find(c => c.id === template.category)?.name}
                          </Badge>
                          <div className="flex items-center gap-1">
                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                            <span className="text-sm text-white">{template.rating}</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg text-white">{template.name}</CardTitle>
                        <CardDescription className="text-white/70">{template.description}</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        <div className="grid grid-cols-2 gap-2 text-sm">
                          <div>
                            <span className="text-white/60">Value Range:</span>
                            <p className="text-white font-medium">{template.estimatedValue}</p>
                          </div>
                          <div>
                            <span className="text-white/60">Duration:</span>
                            <p className="text-white font-medium">{template.duration}</p>
                          </div>
                        </div>
                        
                        <div className="flex justify-between items-center">
                          <Badge className={getComplexityColor(template.complexity)}>
                            {template.complexity}
                          </Badge>
                          <div className="flex items-center gap-1 text-white/60">
                            <Users className="w-4 h-4" />
                            <span className="text-sm">{template.usage} uses</span>
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button 
                            size="sm" 
                            className="flex-1 bg-blue-600 hover:bg-blue-700"
                            onClick={() => handleUseTemplate(template.id, template.name)}
                          >
                            Use Template
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-white/20 text-white hover:bg-white/10"
                            onClick={() => handlePreviewTemplate(template.id)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button 
                            size="sm" 
                            variant="outline" 
                            className="border-white/20 text-white hover:bg-white/10"
                          >
                            <Copy className="w-4 h-4" />
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="categories">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categories.filter(cat => cat.id !== "all").map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.id} 
                      className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1 cursor-pointer"
                      onClick={() => setSelectedCategory(category.id)}
                    >
                      <CardHeader className="text-center">
                        <div className="mx-auto w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-3">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <CardTitle className="text-white">{category.name}</CardTitle>
                        <CardDescription className="text-white/70">
                          {category.count} templates available
                        </CardDescription>
                      </CardHeader>
                    </Card>
                  );
                })}
              </div>
            </TabsContent>

            <TabsContent value="my-templates">
              <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                <CardHeader>
                  <CardTitle className="text-white">My Custom Templates</CardTitle>
                  <CardDescription className="text-white/70">
                    Templates you've created or customized
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="text-center py-8">
                    <FileText className="w-12 h-12 text-white/40 mx-auto mb-4" />
                    <p className="text-white/60">No custom templates yet</p>
                    <p className="text-white/40 text-sm mt-2">Create your first template or customize an existing one</p>
                    <Button className="mt-4 bg-blue-600 hover:bg-blue-700">
                      <Plus className="w-4 h-4 mr-2" />
                      Create Template
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="analytics">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Most Used Templates</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {templates.slice(0, 3).map((template, index) => (
                        <div key={template.id} className="flex items-center justify-between">
                          <div>
                            <p className="font-medium text-white">{template.name}</p>
                            <p className="text-sm text-white/60">{template.usage} uses</p>
                          </div>
                          <Badge className="bg-blue-600 text-white">#{index + 1}</Badge>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Category Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {categories.filter(cat => cat.id !== "all").slice(0, 4).map((category) => (
                        <div key={category.id} className="flex items-center justify-between">
                          <span className="text-white">{category.name}</span>
                          <span className="text-white/60">{category.count}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
                  <CardHeader>
                    <CardTitle className="text-white">Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {templates.slice(0, 3).map((template) => (
                        <div key={template.id} className="flex items-center gap-3">
                          <Clock className="w-4 h-4 text-blue-400" />
                          <div>
                            <p className="text-sm text-white">{template.name}</p>
                            <p className="text-xs text-white/60">Used {template.lastUsed}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TenderTemplates;
