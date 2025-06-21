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
import { Users, Sparkles, Download, BarChart2, ArrowRight } from "lucide-react";
import PageTemplate from "@/components/PageTemplate";

const Competition = () => {
  return (
    <PageTemplate
      title="Competitive Analysis"
      description="Analyze competition and market positioning for better bid strategies"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Competitor Analytics */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <Users className="w-5 h-5 mr-2 text-blue-400" />
              Competitor Analytics
            </CardTitle>
            <CardDescription className="text-blue-200">
              See how you compare to competitors
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-400 mb-2">#2</div>
            <p className="text-purple-200 text-sm">
              Your current market position
            </p>
            <Button className="mt-4 glass-button" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
          </CardContent>
        </Card>
        {/* Recent Competitor Activity */}
        <Card className="glass-card border-green-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart2 className="w-5 h-5 mr-2 text-green-400" />
              Recent Competitor Activity
            </CardTitle>
            <CardDescription className="text-green-200">
              Track your competitors' latest moves
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-green-200 text-sm">
              <li>• ABC Security submitted a bid (2d ago)</li>
              <li>• GreenScape won Landscaping (1w ago)</li>
              <li>• CleanCo updated pricing (3d ago)</li>
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
                <Link to="/bids/OptimizeBid">Optimize Bid</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs for Competitor Factors and Analytics */}
      <Tabs defaultValue="factors" className="mb-8">
        <TabsList className="glass-card border-blue-500/20">
          <TabsTrigger value="factors">Competitor Factors</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        <TabsContent value="factors">
          <Card className="glass-card border-blue-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">
                Key Competitor Factors
              </CardTitle>
              <CardDescription className="text-blue-200">
                What drives your competitors' success
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-200">
                <li>• Lower pricing strategies</li>
                <li>• Faster response times</li>
                <li>• Strong client relationships</li>
                <li>• Specialized certifications</li>
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card className="glass-card border-green-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Competitor Analytics</CardTitle>
              <CardDescription className="text-green-200">
                Visualize your competitor trends
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-lg flex items-center justify-center text-green-200">
                  [Competitor Analytics Chart Placeholder]
                </div>
                <p className="mt-4 text-sm text-green-200">
                  Coming soon: Interactive competitor analytics charts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </PageTemplate>
  );
};

export default Competition;
