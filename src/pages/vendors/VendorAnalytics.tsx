import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { BarChart2, Sparkles, Download, Activity, ArrowRight } from "lucide-react";
import PageTemplate from "@/components/PageTemplate";

// Animated glassmorphism and gradient helpers
const animatedGradient =
  "bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 dark:from-[#23234a] dark:via-[#2a1e3f] dark:to-[#1e1e3f] shadow-2xl border-0 backdrop-blur-xl";
const glassCard =
  "rounded-2xl border-0 shadow-2xl bg-white/60 dark:bg-[#23234a]/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-400/30";
const glassButton =
  "rounded-full px-5 py-2 font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-blue-900/20 hover:scale-105 hover:shadow-blue-400/40 transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none";
const badgePulse =
  "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-pulse after:bg-current after:opacity-20";

const VendorAnalytics = () => {
  return (
    <PageTemplate
      title="Vendor Analytics"
      description="Analyze vendor performance and metrics"
    >
      <div className={`min-h-screen ${animatedGradient} transition-colors p-6`}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          {/* Analytics */}
          <Card className={`${glassCard} border-blue-500/20 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-indigo-900/80`}>
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BarChart2 className="w-5 h-5 mr-2 text-blue-400 animate-bounce" />
                Performance Analytics
              </CardTitle>
              <CardDescription className="text-blue-200">
                Key vendor performance metrics
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-blue-400 mb-2">4.7</div>
              <p className="text-purple-200 text-sm">Avg Vendor Rating</p>
              <Button className={`${glassButton} mt-4 w-full`} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export Analytics
              </Button>
            </CardContent>
          </Card>
          {/* AI Insights */}
          <Card className={`${glassCard} border-purple-500/20 bg-gradient-to-br from-purple-900/80 via-indigo-800/80 to-blue-900/80`}>
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400 animate-spin-slow" />
                AI Insights
              </CardTitle>
              <CardDescription className="text-purple-200">
                Smart suggestions to improve vendor management
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-purple-200">
                <li>• Prioritize high-performing vendors for critical projects</li>
                <li>• Monitor response times for service improvement</li>
                <li>• Track certification expirations</li>
                <li>• Analyze feedback trends</li>
              </ul>
              <Button className={`${glassButton} mt-4 w-full`} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export AI Report
              </Button>
            </CardContent>
          </Card>
          {/* Quick Deep Links */}
          <Card className={`${glassCard} border-green-500/20 bg-gradient-to-br from-green-900/80 via-emerald-800/80 to-blue-900/80`}>
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Activity className="w-5 h-5 mr-2 text-green-400 animate-bounce" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-green-200">
                Jump to key vendor tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Button asChild variant="outline" className={glassButton}>
                  <Link to="/vendors/VendorDirectory">Vendor Directory</Link>
                </Button>
                <Button asChild variant="outline" className={glassButton}>
                  <Link to="/vendors/Feedback">Feedback</Link>
                </Button>
                <Button asChild variant="outline" className={glassButton}>
                  <Link to="/vendors/VendorPrequalification">Prequalification</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        {/* Tabs for Analytics and Trends */}
        <Tabs defaultValue="analytics" className="mb-10">
          <TabsList className={`${glassCard} border-blue-500/20 bg-gradient-to-r from-blue-900/80 via-purple-800/80 to-indigo-900/80`}>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="trends">Trends</TabsTrigger>
          </TabsList>
          <TabsContent value="analytics">
            <Card className={`${glassCard} border-blue-500/20 bg-gradient-to-br from-blue-900/80 via-blue-800/80 to-indigo-900/80 mt-4`}>
              <CardHeader>
                <CardTitle className="text-white">Vendor Analytics</CardTitle>
                <CardDescription className="text-blue-200">
                  Visualize vendor performance
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-full h-40 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg flex items-center justify-center text-blue-200">
                    [Vendor Analytics Chart Placeholder]
                  </div>
                  <p className="mt-4 text-sm text-blue-200">Coming soon: Interactive vendor analytics charts</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="trends">
            <Card className={`${glassCard} border-green-500/20 bg-gradient-to-br from-green-900/80 via-emerald-800/80 to-blue-900/80 mt-4`}>
              <CardHeader>
                <CardTitle className="text-white">Performance Trends</CardTitle>
                <CardDescription className="text-green-200">
                  Track vendor performance trends
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center">
                  <div className="w-full h-40 bg-gradient-to-r from-green-500/20 to-blue-500/20 rounded-lg flex items-center justify-center text-green-200">
                    [Performance Trends Chart Placeholder]
                  </div>
                  <p className="mt-4 text-sm text-green-200">Coming soon: Interactive performance trends charts</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default VendorAnalytics;
