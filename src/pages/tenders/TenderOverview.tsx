
import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Plus, Building } from "lucide-react";
import { Link } from "react-router-dom";
import { mockTenders, getStatusColor, getPriorityColor, type Tender } from "./data/tenderData";
import TenderStats from "./components/TenderStats";
import TenderFilters from "./components/TenderFilters";
import TenderGrid from "./components/TenderGrid";
import TenderTable from "./components/TenderTable";
import EmptyTenderState from "./components/EmptyTenderState";

const TenderOverview = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [viewMode, setViewMode] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");

  const filteredTenders = mockTenders.filter(tender => {
    const matchesSearch = tender.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tender.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || 
                           tender.status.toLowerCase() === selectedCategory.toLowerCase();
    return matchesSearch && matchesCategory;
  });

  const stats = {
    total: mockTenders.length,
    active: mockTenders.filter(t => t.status === "Active").length,
    draft: mockTenders.filter(t => t.status === "Draft").length,
    evaluation: mockTenders.filter(t => t.status === "Evaluation").length,
    closed: mockTenders.filter(t => t.status === "Closed").length,
    awarded: mockTenders.filter(t => t.status === "Awarded").length,
    totalValue: mockTenders.reduce((sum, t) => sum + parseInt(t.value.replace(/[$,]/g, "")), 0),
    avgBids: Math.round(mockTenders.reduce((sum, t) => sum + t.bids, 0) / mockTenders.length)
  };

  const renderTenderContent = (statusFilter: string) => {
    const statusTenders = statusFilter === "all" 
      ? filteredTenders 
      : filteredTenders.filter(tender => tender.status.toLowerCase() === statusFilter);

    if (statusTenders.length === 0) {
      return <EmptyTenderState status={statusFilter} />;
    }

    return viewMode === "grid" ? (
      <TenderGrid 
        tenders={statusTenders} 
        getStatusColor={getStatusColor} 
        getPriorityColor={getPriorityColor} 
      />
    ) : (
      <TenderTable 
        tenders={statusTenders} 
        getStatusColor={getStatusColor} 
      />
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar isOpen={sidebarOpen} onToggle={() => setSidebarOpen(!sidebarOpen)} />
      
      <div className={`transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold text-white">Tender Management</h1>
              <p className="text-white/70 mt-2">Create, manage, and track all your tenders</p>
            </div>
            <div className="flex gap-3">
              <Button asChild variant="outline" className="border-white/20 text-white hover:bg-white/10">
                <Link to="/tenders/templates">
                  <Building className="w-4 h-4 mr-2" />
                  Templates
                </Link>
              </Button>
              <Button asChild className="bg-blue-600 hover:bg-blue-700">
                <Link to="/tenders/create">
                  <Plus className="w-4 h-4 mr-2" />
                  Create Tender
                </Link>
              </Button>
            </div>
          </div>

          <TenderStats stats={stats} />
          <TenderFilters 
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            viewMode={viewMode}
            setViewMode={setViewMode}
          />

          <Tabs defaultValue="all" className="space-y-6" onValueChange={setSelectedCategory}>
            <TabsList className="bg-white/10 backdrop-blur-xl border-white/20">
              <TabsTrigger value="all" className="data-[state=active]:bg-white/20">All Tenders ({stats.total})</TabsTrigger>
              <TabsTrigger value="active" className="data-[state=active]:bg-white/20">Active ({stats.active})</TabsTrigger>
              <TabsTrigger value="evaluation" className="data-[state=active]:bg-white/20">Evaluation ({stats.evaluation})</TabsTrigger>
              <TabsTrigger value="draft" className="data-[state=active]:bg-white/20">Draft ({stats.draft})</TabsTrigger>
              <TabsTrigger value="closed" className="data-[state=active]:bg-white/20">Closed ({stats.closed})</TabsTrigger>
            </TabsList>

            <TabsContent value="all">
              {renderTenderContent("all")}
            </TabsContent>

            <TabsContent value="active">
              {renderTenderContent("active")}
            </TabsContent>

            <TabsContent value="evaluation">
              {renderTenderContent("evaluation")}
            </TabsContent>

            <TabsContent value="draft">
              {renderTenderContent("draft")}
            </TabsContent>

            <TabsContent value="closed">
              {renderTenderContent("closed")}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default TenderOverview;
