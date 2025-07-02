import React, { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Plus, 
  Settings, 
  Eye, 
  EyeOff,
  Move,
  Trash2,
  BarChart3,
  PieChart,
  LineChart,
  Calendar,
  Users,
  FileText,
  DollarSign,
  TrendingUp,
  Activity,
  Bell
} from "lucide-react";

const Widgets = () => {
  const [widgets, setWidgets] = useState([
    {
      id: "tender-overview",
      title: "Tender Overview",
      type: "chart",
      icon: BarChart3,
      visible: true,
      position: { x: 0, y: 0 },
      size: "medium",
      data: { activeTenders: 47, pendingReview: 12, awarded: 8 }
    },
    {
      id: "budget-tracker",
      title: "Budget Tracker", 
      type: "progress",
      icon: DollarSign,
      visible: true,
      position: { x: 1, y: 0 },
      size: "small",
      data: { used: 850000, total: 1200000 }
    },
    {
      id: "vendor-performance",
      title: "Vendor Performance",
      type: "pie",
      icon: PieChart,
      visible: true,
      position: { x: 0, y: 1 },
      size: "medium",
      data: { excellent: 45, good: 32, average: 18, poor: 5 }
    },
    {
      id: "upcoming-deadlines",
      title: "Upcoming Deadlines",
      type: "list",
      icon: Calendar,
      visible: true,
      position: { x: 1, y: 1 },
      size: "medium",
      data: [
        { title: "HVAC Maintenance Tender", deadline: "2024-07-05", status: "urgent" },
        { title: "Security Services RFP", deadline: "2024-07-08", status: "warning" },
        { title: "Cleaning Contract Renewal", deadline: "2024-07-12", status: "normal" }
      ]
    },
    {
      id: "activity-feed",
      title: "Recent Activity",
      type: "feed",
      icon: Activity,
      visible: false,
      position: { x: 0, y: 2 },
      size: "large",
      data: [
        { action: "New bid submitted", entity: "HVAC Tender #2024-001", time: "2 hours ago" },
        { action: "Tender awarded", entity: "Security Contract #2024-003", time: "4 hours ago" },
        { action: "Vendor qualified", entity: "ABC Maintenance Corp", time: "6 hours ago" }
      ]
    },
    {
      id: "notifications",
      title: "Notifications",
      type: "alerts",
      icon: Bell,
      visible: true,
      position: { x: 2, y: 0 },
      size: "small",
      data: { unread: 8, urgent: 2, warnings: 3 }
    }
  ]);

  const availableWidgets = [
    { id: "cost-analysis", title: "Cost Analysis", icon: TrendingUp, type: "chart" },
    { id: "compliance-tracker", title: "Compliance Tracker", icon: FileText, type: "progress" },
    { id: "vendor-directory", title: "Vendor Directory", icon: Users, type: "list" },
    { id: "performance-metrics", title: "Performance Metrics", icon: LineChart, type: "chart" }
  ];

  const toggleWidgetVisibility = (widgetId: string) => {
    setWidgets(prev => prev.map(widget => 
      widget.id === widgetId 
        ? { ...widget, visible: !widget.visible }
        : widget
    ));
  };

  const addWidget = (widgetType: any) => {
    const newWidget = {
      id: widgetType.id,
      title: widgetType.title,
      type: widgetType.type,
      icon: widgetType.icon,
      visible: true,
      position: { x: 0, y: widgets.length },
      size: "medium",
      data: widgetType.type === "alerts" ? { unread: 0, urgent: 0, warnings: 0 } : []
    };
    setWidgets(prev => [...prev, newWidget as any]);
  };

  const removeWidget = (widgetId: string) => {
    setWidgets(prev => prev.filter(widget => widget.id !== widgetId));
  };

  return (
    <PageTemplate
      title="Dashboard Widgets"
      description="Customize your dashboard with widgets and data visualizations"
    >
      <div className="space-y-8">
        {/* Widget Controls */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Settings className="h-5 w-5" />
              Widget Management
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Add New Widgets */}
            <div>
              <h4 className="font-medium mb-4">Add Widgets</h4>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {availableWidgets.map((widget) => {
                  const Icon = widget.icon;
                  const isAdded = widgets.some(w => w.id === widget.id);
                  
                  return (
                    <Card key={widget.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-4">
                        <div className="flex items-center gap-3 mb-3">
                          <Icon className="h-5 w-5 text-primary" />
                          <span className="font-medium text-sm">{widget.title}</span>
                        </div>
                        <Button 
                          size="sm" 
                          className="w-full"
                          disabled={isAdded}
                          onClick={() => addWidget(widget)}
                        >
                          {isAdded ? "Added" : "Add Widget"}
                        </Button>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Manage Existing Widgets */}
            <div>
              <h4 className="font-medium mb-4">Manage Widgets</h4>
              <div className="space-y-3">
                {widgets.map((widget) => {
                  const Icon = widget.icon;
                  
                  return (
                    <div key={widget.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center gap-3">
                        <Icon className="h-5 w-5 text-muted-foreground" />
                        <span className="font-medium">{widget.title}</span>
                        <Badge variant="outline" className="text-xs">
                          {widget.type}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <div className="flex items-center gap-2">
                          {widget.visible ? (
                            <Eye className="h-4 w-4 text-green-600" />
                          ) : (
                            <EyeOff className="h-4 w-4 text-muted-foreground" />
                          )}
                          <Switch
                            checked={widget.visible}
                            onCheckedChange={() => toggleWidgetVisibility(widget.id)}
                          />
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 w-8 p-0"
                        >
                          <Move className="h-4 w-4" />
                        </Button>
                        
                        <Button 
                          size="sm" 
                          variant="outline"
                          className="h-8 w-8 p-0"
                          onClick={() => removeWidget(widget.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Widget Preview */}
        <div>
          <h3 className="text-lg font-semibold mb-4">Widget Preview</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {widgets.filter(widget => widget.visible).map((widget) => {
              const Icon = widget.icon;
              
              return (
                <Card key={widget.id} className="hover:shadow-lg transition-all duration-300">
                  <CardHeader className="pb-3">
                    <CardTitle className="flex items-center gap-2 text-base">
                      <Icon className="h-4 w-4" />
                      {widget.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    {/* Sample Widget Content */}
                    {widget.type === "chart" && (
                      <div className="space-y-3">
                        <div className="h-32 bg-gradient-to-br from-primary/10 to-primary/5 rounded-lg flex items-center justify-center">
                          <BarChart3 className="h-8 w-8 text-primary/60" />
                        </div>
                        <div className="text-sm text-muted-foreground text-center">
                          Chart visualization
                        </div>
                      </div>
                    )}
                    
                    {widget.type === "progress" && widget.id === "budget-tracker" && (
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Used</span>
                          <span>$850K / $1.2M</span>
                        </div>
                        <Progress value={71} className="h-2" />
                        <div className="text-xs text-muted-foreground">
                          29% remaining
                        </div>
                      </div>
                    )}
                    
                    {widget.type === "list" && widget.id === "upcoming-deadlines" && Array.isArray(widget.data) && (
                      <div className="space-y-3">
                        {widget.data.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between items-center text-sm">
                            <span className="truncate">{item.title}</span>
                            <Badge variant={
                              item.status === "urgent" ? "destructive" :
                              item.status === "warning" ? "secondary" : "outline"
                            }>
                              {item.deadline}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    )}
                    
                    {widget.type === "alerts" && (
                      <div className="grid grid-cols-3 gap-2 text-center">
                        <div>
                          <div className="text-lg font-bold text-blue-600">8</div>
                          <div className="text-xs text-muted-foreground">Total</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-red-600">2</div>
                          <div className="text-xs text-muted-foreground">Urgent</div>
                        </div>
                        <div>
                          <div className="text-lg font-bold text-yellow-600">3</div>
                          <div className="text-xs text-muted-foreground">Warnings</div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </PageTemplate>
  );
};

export default Widgets;
