import { useState } from "react";
import { Plus, Search, Filter, Grid3X3, List, Download, ExternalLink, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import PageTemplate from "@/components/PageTemplate";
import { useTenders } from "@/hooks/useTenders";
import { TenderCard } from "@/components/enhanced/TenderCard";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const TenderOverview = () => {
  const navigate = useNavigate();
  const { data: tenders, isLoading, error } = useTenders();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredTenders = tenders?.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === "all" || tender.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const tenderStats = {
    total: tenders?.length || 0,
    active: tenders?.filter(t => t.status === 'active').length || 0,
    draft: tenders?.filter(t => t.status === 'draft').length || 0,
    closed: tenders?.filter(t => t.status === 'closed').length || 0,
    awarded: tenders?.filter(t => t.status === 'awarded').length || 0
  };

  const tenderTrends = [
    { month: 'Jan', tenders: 12, bids: 48, awarded: 8 },
    { month: 'Feb', tenders: 15, bids: 62, awarded: 11 },
    { month: 'Mar', tenders: 18, bids: 71, awarded: 14 },
    { month: 'Apr', tenders: 14, bids: 55, awarded: 10 },
    { month: 'May', tenders: 20, bids: 85, awarded: 16 },
    { month: 'Jun', tenders: 16, bids: 68, awarded: 12 }
  ];

  const handleViewDetails = (tenderId: string) => {
    navigate(`/tenders/${tenderId}`);
  };

  const handleSubmitBid = (tenderId: string) => {
    navigate(`/bids/submit?tender=${tenderId}`);
  };

  if (error) {
    console.error('Error loading tenders:', error);
    toast.error('Failed to load tenders');
  }

  return (
    <PageTemplate 
      title="Tender Management" 
      description="Manage and track all tender opportunities"
      quickActions={[
        { label: "Create Tender", href: "/tenders/create", icon: Plus },
        { label: "AI Create", href: "/tenders/ai-create", icon: Zap, variant: "outline" },
        { label: "Export Data", href: "#", icon: Download, variant: "outline" },
      ]}
      relatedPages={[
        { label: "Bid Management", href: "/bids" },
        { label: "Contract Management", href: "/contracts" },
        { label: "Vendor Directory", href: "/vendors" },
        { label: "Analytics Dashboard", href: "/analytics" },
      ]}
    >
      <div className="space-y-6">
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
          <div className="flex gap-2">
            <Button onClick={() => navigate('/tenders/create')}>
              <Plus className="w-4 h-4 mr-2" />
              Create Tender
            </Button>
            <Button variant="outline" onClick={() => navigate('/tenders/ai-create')}>
              AI Create
            </Button>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('grid')}
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setViewMode('list')}
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl">{tenderStats.total}</CardTitle>
              <CardDescription>Total Tenders</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-green-600">{tenderStats.active}</CardTitle>
              <CardDescription>Active</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-gray-600">{tenderStats.draft}</CardTitle>
              <CardDescription>Draft</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-red-600">{tenderStats.closed}</CardTitle>
              <CardDescription>Closed</CardDescription>
            </CardHeader>
          </Card>
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-2xl text-blue-600">{tenderStats.awarded}</CardTitle>
              <CardDescription>Awarded</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search tenders..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <div className="flex gap-2">
            {['all', 'active', 'draft', 'closed', 'awarded'].map((status) => (
              <Button
                key={status}
                variant={statusFilter === status ? 'default' : 'outline'}
                size="sm"
                onClick={() => setStatusFilter(status)}
              >
                {status.charAt(0).toUpperCase() + status.slice(1)}
              </Button>
            ))}
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <Card key={i} className="animate-pulse">
                <CardHeader>
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded"></div>
                    <div className="h-4 bg-gray-200 rounded w-5/6"></div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : filteredTenders.length === 0 ? (
          <Card className="text-center py-12">
            <CardContent>
              <p className="text-gray-500 mb-4">
                {searchTerm || statusFilter !== 'all' 
                  ? 'No tenders match your current filters' 
                  : 'No tenders available yet'
                }
              </p>
              <Button onClick={() => navigate('/tenders/create')}>
                <Plus className="w-4 h-4 mr-2" />
                Create Your First Tender
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className={viewMode === 'grid' 
            ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" 
            : "space-y-4"
          }>
            {filteredTenders.map((tender) => (
              <TenderCard
                key={tender.id}
                tender={tender}
                onViewDetails={handleViewDetails}
                onSubmitBid={handleSubmitBid}
              />
            ))}
          </div>
        )}

        {/* Analytics and Insights */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-8">
          <Card>
            <CardHeader>
              <CardTitle>Tender Activity Trends</CardTitle>
              <CardDescription>Monthly tender and bid statistics</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={tenderTrends}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="tenders" fill="#3b82f6" name="Tenders" />
                  <Bar dataKey="bids" fill="#8b5cf6" name="Bids" />
                  <Bar dataKey="awarded" fill="#10b981" name="Awarded" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>AI Insights</CardTitle>
              <CardDescription>Smart recommendations for your tenders</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-gray-700">
                <li>Automate bid evaluation to reduce manual errors.</li>
                <li>Leverage AI to predict tender success rates.</li>
                <li>Optimize document workflows for faster approvals.</li>
                <li>Schedule regular vendor performance reviews.</li>
              </ul>
              <Button asChild variant="outline" className="mt-4">
                <a href="/analytics/tender-analytics" target="_blank" rel="noopener noreferrer">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  View Analytics
                </a>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default TenderOverview;
