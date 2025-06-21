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
  Sparkles,
  Download,
  BarChart2,
  Activity,
  ArrowRight,
} from "lucide-react";
import PageTemplate from "@/components/PageTemplate";

const OptimizeBid = () => {
  return (
    <PageTemplate
      title="Bid Optimization"
      description="Optimize your bid for maximum competitiveness and win probability"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Optimization Analytics */}
        <Card className="glass-card border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart2 className="w-5 h-5 mr-2 text-green-400" />
              Optimization Analytics
            </CardTitle>
            <CardDescription className="text-green-200">
              Analyze your bid optimization factors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-400 mb-2">92%</div>
            <p className="text-purple-200 text-sm">
              Optimization score based on AI analysis
            </p>
            <Button className="mt-4 glass-button" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
        {/* Recent Optimization Activity */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              Recent Optimization Activity
            </CardTitle>
            <CardDescription className="text-blue-200">
              Track your latest optimization actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>• Adjusted pricing for HVAC Maintenance (1h ago)</li>
              <li>
                • Improved technical proposal for Security Services (2d ago)
              </li>
              <li>• Added certifications for Landscaping (4d ago)</li>
            </ul>
            <Button asChild className="mt-4 glass-button" size="sm">
              <Link to="/bids/BidLibrary">
                <ArrowRight className="w-4 h-4 mr-2" />
                Go to Bid Library
              </Link>
            </Button>
          </CardContent>
        </Card>
        {/* Quick Deep Links */}
        <Card className="glass-card border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Sparkles className="w-5 h-5 mr-2 text-purple-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-purple-200">
              Jump to key bid tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="glass-button">
                <Link to="/bids/AIBid">AI Bid Assistant</Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/bids/WinScore">Win Probability</Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/bids/Competition">Competition Analysis</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs for Optimization Suggestions and Analytics */}
      <Tabs defaultValue="suggestions" className="mb-8">
        <TabsList className="glass-card border-green-500/20">
          <TabsTrigger value="suggestions">
            Optimization Suggestions
          </TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="suggestions">
          <Card className="glass-card border-green-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">
                AI Optimization Suggestions
              </CardTitle>
              <CardDescription className="text-green-200">
                Personalized tips to optimize your bid
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Lower material costs for higher competitiveness</li>
                <li>• Highlight unique technical capabilities</li>
                <li>• Submit before deadline for bonus points</li>
                <li>• Attach all required documents</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="glass-card border-blue-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">
                Optimization Analytics
              </CardTitle>
              <CardDescription className="text-blue-200">
                Visualize your optimization trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-blue-200">
                  [Optimization Analytics Chart Placeholder]
                </div>
                <p className="mt-4 text-sm text-blue-200">
                  Coming soon: Interactive optimization analytics charts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default OptimizeBid;
