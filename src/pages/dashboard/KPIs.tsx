import React from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  FileText, 
  Users, 
  Clock,
  Target,
  Award,
  AlertTriangle,
  CheckCircle
} from "lucide-react";

const KPIs = () => {
  const kpis = [
    {
      title: "Total Tender Value",
      value: "$2.4M",
      change: "+12.5%",
      trend: "up",
      icon: DollarSign,
      description: "Total value of active tenders",
      target: "$3M",
      progress: 80
    },
    {
      title: "Active Tenders",
      value: "47",
      change: "+8",
      trend: "up", 
      icon: FileText,
      description: "Currently open tenders",
      target: "60",
      progress: 78
    },
    {
      title: "Qualified Vendors",
      value: "156",
      change: "+23",
      trend: "up",
      icon: Users,
      description: "Pre-qualified vendor pool",
      target: "200",
      progress: 78
    },
    {
      title: "Avg. Processing Time",
      value: "12 days",
      change: "-2 days",
      trend: "up",
      icon: Clock,
      description: "Average tender processing time",
      target: "10 days",
      progress: 83
    },
    {
      title: "Compliance Rate",
      value: "94.2%",
      change: "+2.1%",
      trend: "up",
      icon: CheckCircle,
      description: "Tender compliance percentage",
      target: "95%",
      progress: 99
    },
    {
      title: "Cost Savings",
      value: "$340K",
      change: "+18.7%",
      trend: "up",
      icon: Award,
      description: "Annual cost savings achieved",
      target: "$400K",
      progress: 85
    },
    {
      title: "Risk Score",
      value: "Low",
      change: "Improved",
      trend: "up",
      icon: AlertTriangle,
      description: "Overall portfolio risk level",
      target: "Low",
      progress: 90
    },
    {
      title: "Vendor Satisfaction",
      value: "4.6/5",
      change: "+0.3",
      trend: "up",
      icon: Target,
      description: "Average vendor satisfaction rating",
      target: "4.8/5",
      progress: 96
    }
  ];

  const performanceMetrics = [
    {
      category: "Operational Efficiency",
      metrics: [
        { name: "Tender Cycle Time", value: "12 days", target: "10 days", status: "warning" },
        { name: "Bid Response Rate", value: "78%", target: "80%", status: "warning" },
        { name: "Award Success Rate", value: "92%", target: "90%", status: "success" }
      ]
    },
    {
      category: "Financial Performance", 
      metrics: [
        { name: "Budget Utilization", value: "87%", target: "85%", status: "success" },
        { name: "Cost Per Tender", value: "$2,340", target: "$2,500", status: "success" },
        { name: "ROI on Procurement", value: "23%", target: "20%", status: "success" }
      ]
    },
    {
      category: "Quality & Compliance",
      metrics: [
        { name: "Compliance Score", value: "94.2%", target: "95%", status: "warning" },
        { name: "Quality Rating", value: "4.3/5", target: "4.5/5", status: "warning" },
        { name: "Audit Pass Rate", value: "98%", target: "95%", status: "success" }
      ]
    }
  ];

  return (
    <PageTemplate
      title="KPI Dashboard"
      description="Key Performance Indicators and metrics for procurement performance"
    >
      <div className="space-y-8">
        {/* Main KPI Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => {
            const Icon = kpi.icon;
            const isPositive = kpi.trend === "up";
            
            return (
              <Card key={index} className="hover:shadow-lg transition-all duration-300">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {kpi.title}
                  </CardTitle>
                  <Icon className="h-5 w-5 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="text-2xl font-bold">{kpi.value}</div>
                      <div className={`flex items-center gap-1 text-sm ${
                        isPositive ? "text-green-600" : "text-red-600"
                      }`}>
                        {isPositive ? (
                          <TrendingUp className="h-4 w-4" />
                        ) : (
                          <TrendingDown className="h-4 w-4" />
                        )}
                        {kpi.change}
                      </div>
                    </div>
                    
                    <p className="text-xs text-muted-foreground">
                      {kpi.description}
                    </p>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs">
                        <span>Target: {kpi.target}</span>
                        <span>{kpi.progress}%</span>
                      </div>
                      <Progress value={kpi.progress} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Performance Metrics by Category */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {performanceMetrics.map((category, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="text-lg">{category.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {category.metrics.map((metric, metricIndex) => (
                  <div key={metricIndex} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{metric.name}</span>
                      <Badge variant={
                        metric.status === "success" ? "default" : 
                        metric.status === "warning" ? "secondary" : "destructive"
                      }>
                        {metric.value}
                      </Badge>
                    </div>
                    <div className="text-xs text-muted-foreground">
                      Target: {metric.target}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Action Items */}
        <Card>
          <CardHeader>
            <CardTitle>Action Items & Recommendations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-start gap-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                <AlertTriangle className="h-5 w-5 text-yellow-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-yellow-800">Reduce Tender Cycle Time</h4>
                  <p className="text-sm text-yellow-700 mt-1">
                    Current processing time is 2 days above target. Consider streamlining approval workflows.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    View Workflow Analysis
                  </Button>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                <Target className="h-5 w-5 text-blue-600 mt-0.5" />
                <div className="flex-1">
                  <h4 className="font-medium text-blue-800">Improve Compliance Rate</h4>
                  <p className="text-sm text-blue-700 mt-1">
                    Close to target but can optimize further. Review non-compliant submissions.
                  </p>
                  <Button size="sm" variant="outline" className="mt-2">
                    Review Compliance
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default KPIs;
