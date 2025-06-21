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

const MaintenanceTrends = () => {
  return (
    <PageTemplate
      title="Maintenance Trends"
      description="Analyze maintenance patterns and trends"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Maintenance Analytics */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-400" />
              Maintenance Analytics
            </CardTitle>
            <CardDescription className="text-blue-200">
              Key maintenance performance metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-400 mb-2">87%</div>
            <p className="text-purple-200 text-sm">On-Time Maintenance</p>
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
              Smart suggestions to improve maintenance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-purple-200">
              <li>• Track overdue tasks for risk mitigation</li>
              <li>• Analyze contractor performance</li>
              <li>• Use predictive analytics for scheduling</li>
              <li>• Optimize costs with preventive maintenance</li>
            </ul>
            <Button className="mt-4 glass-button" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export AI Report
            </Button>
          </CardContent>
        </Card>
        {/* Quick Deep Links */}
        <Card className="glass-card border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Activity className="w-5 h-5 mr-2 text-green-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-green-200">
              Jump to key property tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="glass-button">
                <Link to="/properties/PropertyPortfolio">Portfolio</Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/properties/ServicePerformance">
                  Service Performance
                </Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/properties/MaintenancePlanning">
                  Maintenance Planning
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs for Maintenance and Trends */}
      <Tabs defaultValue="maintenance" className="mb-8">
        <TabsList className="glass-card border-blue-500/20">
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="maintenance">
          <Card className="glass-card border-blue-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Recent Maintenance</CardTitle>
              <CardDescription className="text-blue-200">
                View and track recent maintenance activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-200">
                  [Recent Maintenance Placeholder]
                </div>
                <p className="mt-4 text-sm text-blue-200">
                  Coming soon: Interactive maintenance dashboard
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card className="glass-card border-green-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Maintenance Trends</CardTitle>
              <CardDescription className="text-green-200">
                Track maintenance trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-green-200">
                  [Maintenance Trends Chart Placeholder]
                </div>
                <p className="mt-4 text-sm text-green-200">
                  Coming soon: Interactive maintenance trends charts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default MaintenanceTrends;
