import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  BarChart2,
  Sparkles,
  Download,
  Activity,
  ArrowRight,
} from "lucide-react";
import PageTemplate from "@/components/PageTemplate";

const PropertyROI = () => {
  return (
    <PageTemplate
      title="Property ROI Analysis"
      description="Calculate return on investment for property services"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* ROI Analytics */}
        <Card className="glass-card border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart2 className="w-5 h-5 mr-2 text-green-400" />
              ROI Analytics
            </CardTitle>
            <CardDescription className="text-green-200">
              Analyze property ROI metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-400 mb-2">8.2%</div>
            <p className="text-purple-200 text-sm">Avg ROI This Year</p>
            <Button className="mt-4 glass-button" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Analytics
            </Button>
          </CardContent>
        </Card>
        {/* AI Insights */}
        <Card className="glass-card border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
              AI Insights
            </CardTitle>
            <CardDescription className="text-purple-200">
              Smart suggestions to improve ROI
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-purple-200">
              <li>• Optimize maintenance schedules for cost savings</li>
              <li>• Track high-performing properties</li>
              <li>• Analyze service provider impact</li>
              <li>• Use data-driven investment decisions</li>
            </ul>
            <Button className="mt-4 glass-button" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export AI Report
            </Button>
          </CardContent>
        </Card>
        {/* Quick Deep Links */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-blue-200">
              Jump to key property tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="glass-button">
                <Link to="/properties/PropertyPortfolio">Portfolio</Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/properties/CostAnalysis">Cost Analysis</Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/properties/MaintenanceTrends">
                  Maintenance Trends
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs for ROI and Trends */}
      <Tabs defaultValue="roi" className="mb-8">
        <TabsList className="glass-card border-green-500/20">
          <TabsTrigger value="roi">ROI</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="roi">
          <Card className="glass-card border-green-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Recent ROI</CardTitle>
              <CardDescription className="text-green-200">
                View and track recent ROI calculations
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-green-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-green-200">
                  [Recent ROI Placeholder]
                </div>
                <p className="mt-4 text-sm text-green-200">
                  Coming soon: Interactive ROI dashboard
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card className="glass-card border-blue-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">ROI Trends</CardTitle>
              <CardDescription className="text-blue-200">
                Track ROI trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center text-blue-200">
                  [ROI Trends Chart Placeholder]
                </div>
                <p className="mt-4 text-sm text-blue-200">
                  Coming soon: Interactive ROI trends charts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default PropertyROI;
