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

const MaintenancePlanning = () => {
  return (
    <PageTemplate
      title="Maintenance Planning"
      description="Plan and schedule property maintenance"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Planning Analytics */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-400" />
              Planning Analytics
            </CardTitle>
            <CardDescription className="text-blue-200">
              Analyze maintenance planning metrics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-400 mb-2">92%</div>
            <p className="text-purple-200 text-sm">Planned Maintenance Rate</p>
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
              Smart suggestions to improve planning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-purple-200">
              <li>• Schedule preventive maintenance for cost savings</li>
              <li>• Track overdue tasks for risk mitigation</li>
              <li>• Analyze contractor performance</li>
              <li>• Use data to optimize schedules</li>
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
                <Link to="/properties/MaintenanceTrends">
                  Maintenance Trends
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs for Planning and Trends */}
      <Tabs defaultValue="planning" className="mb-8">
        <TabsList className="glass-card border-blue-500/20">
          <TabsTrigger value="planning">Planning</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="planning">
          <Card className="glass-card border-blue-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Recent Planning</CardTitle>
              <CardDescription className="text-blue-200">
                View and track recent planning activity
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-200">
                  [Recent Planning Placeholder]
                </div>
                <p className="mt-4 text-sm text-blue-200">
                  Coming soon: Interactive planning dashboard
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card className="glass-card border-green-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Planning Trends</CardTitle>
              <CardDescription className="text-green-200">
                Track planning trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-green-200">
                  [Planning Trends Chart Placeholder]
                </div>
                <p className="mt-4 text-sm text-green-200">
                  Coming soon: Interactive planning trends charts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default MaintenancePlanning;
