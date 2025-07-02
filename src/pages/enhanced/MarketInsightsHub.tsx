import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  TrendingUp,
  TrendingDown,
  Globe,
  BarChart3,
  AlertTriangle,
  DollarSign,
  Activity,
  Target,
  Calendar,
  MapPin,
} from "lucide-react";

const MarketInsightsHub = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeTab, setActiveTab] = useState("overview");

  const marketTrends = [
    {
      sector: "Commercial Real Estate",
      trend: "up",
      percentage: 12.5,
      value: "$2.4B",
      description: "Strong demand for office spaces in urban areas",
      region: "North America",
      timeframe: "Q1 2024",
    },
    {
      sector: "Industrial Services",
      trend: "up",
      percentage: 8.3,
      value: "$1.8B",
      description: "Increased automation and maintenance contracts",
      region: "Europe",
      timeframe: "Q1 2024",
    },
    {
      sector: "Facility Management",
      trend: "down",
      percentage: -2.1,
      value: "$950M",
      description: "Cost optimization initiatives reducing service scope",
      region: "Asia Pacific",
      timeframe: "Q1 2024",
    },
    {
      sector: "Security Services",
      trend: "up",
      percentage: 15.2,
      value: "$3.1B",
      description: "Enhanced security requirements post-pandemic",
      region: "Global",
      timeframe: "Q1 2024",
    },
  ];

  const priceAlerts = [
    {
      service: "HVAC Maintenance",
      change: "up",
      percentage: 5.2,
      newPrice: "$124/hr",
      oldPrice: "$118/hr",
      reason: "Increased energy costs and skilled technician shortage",
      impact: "high",
    },
    {
      service: "Cleaning Services",
      change: "down",
      percentage: -3.8,
      newPrice: "$28/hr",
      oldPrice: "$29/hr",
      reason: "Market competition and automation adoption",
      impact: "medium",
    },
    {
      service: "Landscaping",
      change: "up",
      percentage: 7.1,
      newPrice: "$85/hr",
      oldPrice: "$79/hr",
      reason: "Seasonal demand and environmental regulations",
      impact: "medium",
    },
  ];

  const regionalData = [
    {
      region: "North America",
      totalValue: "$15.2B",
      growth: 8.5,
      topServices: ["Security", "HVAC", "Cleaning"],
      tenderCount: 1247,
      avgContractValue: "$125K",
    },
    {
      region: "Europe",
      totalValue: "$12.8B",
      growth: 6.2,
      topServices: ["Facility Management", "IT Services", "Landscaping"],
      tenderCount: 985,
      avgContractValue: "$98K",
    },
    {
      region: "Asia Pacific",
      totalValue: "$9.4B",
      growth: 12.3,
      topServices: ["Construction", "Security", "Maintenance"],
      tenderCount: 756,
      avgContractValue: "$156K",
    },
  ];

  const opportunities = [
    {
      title: "Green Energy Transition",
      description: "Major shift towards renewable energy and sustainability services",
      potential: "$2.3B",
      timeline: "18-24 months",
      confidence: 92,
      tags: ["Sustainability", "Energy", "Long-term"],
    },
    {
      title: "Smart Building Technology",
      description: "Integration of IoT and automation in facility management",
      potential: "$1.8B",
      timeline: "12-18 months",
      confidence: 87,
      tags: ["Technology", "IoT", "Innovation"],
    },
    {
      title: "Remote Work Infrastructure",
      description: "Hybrid workspace solutions and flexible facility services",
      potential: "$1.2B",
      timeline: "6-12 months",
      confidence: 78,
      tags: ["Remote Work", "Flexibility", "Workspace"],
    },
  ];

  const getTrendIcon = (trend: string) => {
    return trend === "up" ? (
      <TrendingUp className="w-4 h-4 text-green-500" />
    ) : (
      <TrendingDown className="w-4 h-4 text-red-500" />
    );
  };

  const getTrendColor = (trend: string) => {
    return trend === "up" ? "text-green-500" : "text-red-500";
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "high":
        return "bg-red-100 text-red-800 border-red-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      default:
        return "bg-blue-100 text-blue-800 border-blue-200";
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}
      >
        <div className="p-6">
          {/* Breadcrumb */}
          <Breadcrumb className="mb-6">
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink asChild>
                  <Link
                    to="/dashboard"
                    className="text-purple-300 hover:text-white"
                  >
                    Dashboard
                  </Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator className="text-purple-400" />
              <BreadcrumbItem>
                <BreadcrumbPage className="text-white">
                  Market Insights Hub
                </BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent mb-2">
                Market Insights Hub
              </h1>
              <p className="text-purple-200">
                Real-time market intelligence and procurement opportunities
              </p>
            </div>
            <Button className="glass-button-primary">
              <Globe className="w-4 h-4 mr-2" />
              Global Markets
            </Button>
          </div>

          {/* Market Overview Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <Card className="glass-card border-green-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-green-200 text-sm">Market Growth</p>
                    <p className="text-2xl font-bold text-green-400">+8.5%</p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-blue-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-blue-200 text-sm">Total Value</p>
                    <p className="text-2xl font-bold text-blue-400">$37.4B</p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-purple-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-purple-200 text-sm">Active Tenders</p>
                    <p className="text-2xl font-bold text-purple-400">2,988</p>
                  </div>
                  <Activity className="w-8 h-8 text-purple-400" />
                </div>
              </CardContent>
            </Card>

            <Card className="glass-card border-yellow-500/20">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-yellow-200 text-sm">Opportunities</p>
                    <p className="text-2xl font-bold text-yellow-400">247</p>
                  </div>
                  <Target className="w-8 h-8 text-yellow-400" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Tabs */}
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="space-y-6"
          >
            <TabsList className="glass-card border-purple-500/20">
              <TabsTrigger
                value="overview"
                className="data-[state=active]:bg-purple-600"
              >
                Market Overview
              </TabsTrigger>
              <TabsTrigger
                value="prices"
                className="data-[state=active]:bg-blue-600"
              >
                Price Alerts
              </TabsTrigger>
              <TabsTrigger
                value="regional"
                className="data-[state=active]:bg-green-600"
              >
                Regional Analysis
              </TabsTrigger>
              <TabsTrigger
                value="opportunities"
                className="data-[state=active]:bg-yellow-600"
              >
                Opportunities
              </TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {marketTrends.map((trend, index) => (
                  <Card
                    key={index}
                    className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-white text-lg">
                          {trend.sector}
                        </CardTitle>
                        <div className="flex items-center">
                          {getTrendIcon(trend.trend)}
                          <span
                            className={`ml-1 font-semibold ${getTrendColor(trend.trend)}`}
                          >
                            {trend.trend === "up" ? "+" : ""}
                            {trend.percentage}%
                          </span>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-3">
                        <div className="flex justify-between">
                          <span className="text-purple-300">Market Value:</span>
                          <span className="text-white font-medium">
                            {trend.value}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Region:</span>
                          <div className="flex items-center">
                            <MapPin className="w-3 h-3 mr-1 text-blue-400" />
                            <span className="text-blue-400">{trend.region}</span>
                          </div>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Period:</span>
                          <div className="flex items-center">
                            <Calendar className="w-3 h-3 mr-1 text-yellow-400" />
                            <span className="text-yellow-400">{trend.timeframe}</span>
                          </div>
                        </div>
                        <p className="text-purple-200 text-sm mt-3 p-3 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          {trend.description}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="prices">
              <div className="space-y-4">
                {priceAlerts.map((alert, index) => (
                  <Card
                    key={index}
                    className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                  >
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-semibold text-white mb-1">
                            {alert.service}
                          </h3>
                          <Badge
                            className={`${getImpactColor(alert.impact)} border`}
                          >
                            {alert.impact} impact
                          </Badge>
                        </div>
                        <div className="text-right">
                          <div className="flex items-center">
                            {getTrendIcon(alert.change)}
                            <span
                              className={`ml-1 font-semibold ${getTrendColor(alert.change)}`}
                            >
                              {alert.change === "up" ? "+" : ""}
                              {alert.percentage}%
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-purple-300 text-sm">Previous:</span>
                          <p className="text-white font-medium">{alert.oldPrice}</p>
                        </div>
                        <div>
                          <span className="text-purple-300 text-sm">Current:</span>
                          <p className="text-white font-medium">{alert.newPrice}</p>
                        </div>
                        <div>
                          <span className="text-purple-300 text-sm">Reason:</span>
                          <p className="text-purple-200 text-sm">{alert.reason}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="regional">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {regionalData.map((region, index) => (
                  <Card
                    key={index}
                    className="glass-card border-purple-500/20 hover:border-purple-400/40 transition-all duration-300"
                  >
                    <CardHeader>
                      <CardTitle className="text-white text-xl flex items-center">
                        <MapPin className="w-5 h-5 mr-2 text-blue-400" />
                        {region.region}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-4">
                        <div className="flex justify-between">
                          <span className="text-purple-300">Total Value:</span>
                          <span className="text-white font-semibold">
                            {region.totalValue}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Growth:</span>
                          <span className="text-green-400 font-semibold">
                            +{region.growth}%
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Active Tenders:</span>
                          <span className="text-white font-semibold">
                            {region.tenderCount}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-purple-300">Avg Contract:</span>
                          <span className="text-white font-semibold">
                            {region.avgContractValue}
                          </span>
                        </div>
                        <div>
                          <span className="text-purple-300 text-sm">Top Services:</span>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {region.topServices.map((service, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs bg-blue-500/10 border-blue-500/30 text-blue-200"
                              >
                                {service}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="opportunities">
              <div className="space-y-6">
                {opportunities.map((opportunity, index) => (
                  <Card
                    key={index}
                    className="glass-card border-yellow-500/20 hover:border-yellow-400/40 transition-all duration-300"
                  >
                    <CardHeader>
                      <div className="flex items-start justify-between">
                        <div>
                          <CardTitle className="text-white text-xl mb-2">
                            {opportunity.title}
                          </CardTitle>
                          <div className="flex flex-wrap gap-2">
                            {opportunity.tags.map((tag, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="text-xs bg-yellow-500/10 border-yellow-500/30 text-yellow-200"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <Badge className="bg-green-100 text-green-800 border-green-200">
                          {opportunity.confidence}% confidence
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-200 mb-4">
                        {opportunity.description}
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="text-purple-300 text-sm">Market Potential:</span>
                          <p className="text-white font-semibold text-lg">
                            {opportunity.potential}
                          </p>
                        </div>
                        <div>
                          <span className="text-purple-300 text-sm">Timeline:</span>
                          <p className="text-blue-400 font-medium">
                            {opportunity.timeline}
                          </p>
                        </div>
                        <div>
                          <Button className="w-full glass-button">
                            <BarChart3 className="w-4 h-4 mr-2" />
                            Analyze Opportunity
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default MarketInsightsHub;