import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart2, Sparkles, Download, Award, ArrowRight } from "lucide-react";
import PageTemplate from "@/components/PageTemplate";

const WinScore = () => {
  return (
    <PageTemplate
      title="Win Probability Score"
      description="Calculate your chances of winning based on historical data and current market conditions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Win Probability Analytics */}
        <Card className="glass-card border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Award className="w-5 h-5 mr-2 text-green-400" />
              Win Probability
            </CardTitle>
            <CardDescription className="text-green-200">
              Analyze your chances of winning
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-green-400 mb-2">78%</div>
            <p className="text-purple-200 text-sm">Based on similar past bids and current market data</p>
            <Button className="mt-4 glass-button" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
        {/* Recent Win History */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-400" />
              Recent Win History
            </CardTitle>
            <CardDescription className="text-blue-200">
              Track your latest successful bids
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>• Landscaping Services (Won 2 weeks ago)</li>
              <li>• HVAC Maintenance (Won 1 month ago)</li>
              <li>• Security Services (Won 2 months ago)</li>
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
                <Link to="/bids/Competition">Competition Analysis</Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/bids/OptimizeBid">Optimize Bid</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs for Win Factors and Analytics */}
      <Tabs defaultValue="factors" className="mb-8">
        <TabsList className="glass-card border-green-500/20">
          <TabsTrigger value="factors">Win Factors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="factors">
          <Card className="glass-card border-green-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Key Win Factors</CardTitle>
              <CardDescription className="text-green-200">
                What drives your win probability
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-green-200">
                <li>• Competitive pricing</li>
                <li>• Strong technical proposal</li>
                <li>• Early submission</li>
                <li>• Relevant experience</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="glass-card border-blue-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Win Analytics</CardTitle>
              <CardDescription className="text-blue-200">
                Visualize your win trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-blue-200">
                  [Win Analytics Chart Placeholder]
                </div>
                <p className="mt-4 text-sm text-blue-200">Coming soon: Interactive win analytics charts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default WinScore;
