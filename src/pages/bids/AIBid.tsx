import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart2, Sparkles, Download, Activity, ArrowRight } from "lucide-react";
import PageTemplate from "@/components/PageTemplate";

const AIBid = () => {
  return (
    <PageTemplate
      title="AI Bid Assistant"
      description="Get AI-powered recommendations for your bid submissions"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* AI Insights */}
        <Card className="glass-card border-purple-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
              AI Insights
            </CardTitle>
            <CardDescription className="text-purple-200">
              Smart suggestions to improve your bid
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-purple-200">
              <li>• Highlight unique value propositions</li>
              <li>• Optimize pricing for competitiveness</li>
              <li>• Address all client requirements</li>
              <li>• Use clear, concise language</li>
            </ul>
            <Button className="mt-4 glass-button" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export AI Report
            </Button>
          </CardContent>
        </Card>
        {/* Recent AI Activity */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Activity className="w-5 h-5 mr-2 text-blue-400" />
              Recent AI Activity
            </CardTitle>
            <CardDescription className="text-blue-200">
              Track your latest AI-powered actions
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-blue-200 text-sm">
              <li>• Generated bid for HVAC Maintenance (2h ago)</li>
              <li>• Optimized pricing for Security Services (1d ago)</li>
              <li>• Analyzed win probability for Landscaping (3d ago)</li>
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
        <Card className="glass-card border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart2 className="w-5 h-5 mr-2 text-green-400" />
              Quick Actions
            </CardTitle>
            <CardDescription className="text-green-200">
              Jump to key bid tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="glass-button">
                <Link to="/bids/WinScore">Win Probability</Link>
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
      {/* Tabs for AI Suggestions and Analytics */}
      <Tabs defaultValue="suggestions" className="mb-8">
        <TabsList className="glass-card border-purple-500/20">
          <TabsTrigger value="suggestions">AI Suggestions</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="suggestions">
          <Card className="glass-card border-purple-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">AI Suggestions</CardTitle>
              <CardDescription className="text-purple-200">
                Personalized recommendations for your next bid
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-purple-200">
                <li>• Use recent win data to inform pricing</li>
                <li>• Emphasize certifications and experience</li>
                <li>• Submit early for higher win probability</li>
                <li>• Attach supporting documents for credibility</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="glass-card border-blue-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">AI Analytics</CardTitle>
              <CardDescription className="text-blue-200">
                Visualize your AI-driven bid performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-purple-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-blue-200">
                  [AI Analytics Chart Placeholder]
                </div>
                <p className="mt-4 text-sm text-blue-200">Coming soon: Interactive AI analytics charts</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default AIBid;
