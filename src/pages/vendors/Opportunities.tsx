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

const Opportunities = () => {
  return (
    <PageTemplate
      title="Tender Opportunities"
      description="Browse available tender opportunities matching your expertise"
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Opportunity Analytics */}
        <Card className="glass-card border-blue-500/20">
          <CardHeader>
            <CardTitle className="flex items-center text-white">
              <BarChart2 className="w-5 h-5 mr-2 text-blue-400" />
              Opportunity Analytics
            </CardTitle>
            <CardDescription className="text-blue-200">
              Analyze available opportunities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-4xl font-bold text-blue-400 mb-2">18</div>
            <p className="text-purple-200 text-sm">Open Opportunities</p>
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
              Smart suggestions to improve opportunity targeting
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="space-y-2 text-purple-200">
              <li>• Focus on high-match opportunities</li>
              <li>• Track deadlines for timely submissions</li>
              <li>• Analyze win rates by category</li>
              <li>• Use feedback to refine targeting</li>
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
              Jump to key vendor tools
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-2">
              <Button asChild variant="outline" className="glass-button">
                <Link to="/vendors/VendorDirectory">Vendor Directory</Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/vendors/VendorAnalytics">Analytics</Link>
              </Button>
              <Button asChild variant="outline" className="glass-button">
                <Link to="/vendors/SubmitBid">Submit Bid</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Tabs for Opportunities and Trends */}
      <Tabs defaultValue="opportunities" className="mb-8">
        <TabsList className="glass-card border-blue-500/20">
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="trends">Trends</TabsTrigger>
        </TabsList>
        <TabsContent value="opportunities">
          <Card className="glass-card border-blue-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Recent Opportunities</CardTitle>
              <CardDescription className="text-blue-200">
                View and track recent opportunities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-200">
                  [Recent Opportunities Placeholder]
                </div>
                <p className="mt-4 text-sm text-blue-200">
                  Coming soon: Interactive opportunities dashboard
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="trends">
          <Card className="glass-card border-green-500/20 mt-4">
            <CardHeader>
              <CardTitle className="text-white">Opportunity Trends</CardTitle>
              <CardDescription className="text-green-200">
                Track opportunity trends over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center">
                <div className="w-full h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-green-200">
                  [Opportunity Trends Chart Placeholder]
                </div>
                <p className="mt-4 text-sm text-green-200">
                  Coming soon: Interactive opportunity trends charts
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      {/* Next: Professionally enhance Opportunities.tsx with vibrant, animated, accessible, and consistent design system */}
      {/* This includes animated gradients, glassmorphism, badge pulse, animated CTAs, responsive layouts, and accessibility improvements */}
      {/* All enhancements will follow the same design system as Dashboard */}
    </PageTemplate>
  );
};

export default Opportunities;
