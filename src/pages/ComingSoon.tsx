import { useState } from "react";
import { Link } from "react-router-dom";
import DashboardSidebar from "@/components/DashboardSidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  Clock,
  Star,
  Users,
  Zap,
  Shield,
  TrendingUp,
  CheckCircle,
  Calendar,
  Bell,
} from "lucide-react";

const ComingSoon = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const upcomingFeatures = [
    {
      title: "Advanced AI Analytics",
      description: "Revolutionary AI-powered insights for procurement optimization",
      progress: 85,
      eta: "Q2 2024",
      priority: "high",
      icon: <Zap className="w-5 h-5" />,
    },
    {
      title: "Blockchain Verification",
      description: "Immutable contract verification and audit trails",
      progress: 65,
      eta: "Q3 2024",
      priority: "medium",
      icon: <Shield className="w-5 h-5" />,
    },
    {
      title: "Mobile App Suite",
      description: "Native iOS and Android applications for on-the-go management",
      progress: 40,
      eta: "Q4 2024",
      priority: "high",
      icon: <Users className="w-5 h-5" />,
    },
    {
      title: "Integration Marketplace",
      description: "Third-party integrations with major ERP and CRM systems",
      progress: 30,
      eta: "Q1 2025",
      priority: "medium",
      icon: <TrendingUp className="w-5 h-5" />,
    },
  ];

  const recentUpdates = [
    {
      title: "Enhanced Security Framework",
      description: "Implemented multi-factor authentication and advanced encryption",
      date: "2024-01-15",
      status: "completed",
    },
    {
      title: "Real-time Collaboration Tools",
      description: "Added live chat and collaborative document editing",
      date: "2024-01-10",
      status: "completed",
    },
    {
      title: "Advanced Reporting Suite",
      description: "New customizable dashboard and analytics capabilities",
      date: "2024-01-05",
      status: "completed",
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
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
                <BreadcrumbPage className="text-white">Coming Soon</BreadcrumbPage>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>

          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-5xl font-bold bg-gradient-to-r from-white via-purple-200 to-blue-200 bg-clip-text text-transparent mb-4">
              Exciting Features Coming Soon
            </h1>
            <p className="text-xl text-purple-200 max-w-3xl mx-auto mb-6">
              We're constantly innovating to bring you the most advanced procurement 
              management platform. Here's what's in development.
            </p>
            <Button size="lg" className="glass-button-primary">
              <Bell className="w-4 h-4 mr-2" />
              Notify Me When Ready
            </Button>
          </div>

          {/* Upcoming Features */}
          <Card className="glass-card border-purple-500/20 mb-8">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <Clock className="w-6 h-6 mr-3 text-purple-400" />
                In Development
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {upcomingFeatures.map((feature, index) => (
                  <Card
                    key={index}
                    className="glass-card border-purple-500/10 hover:border-purple-400/30 transition-all duration-300"
                  >
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center">
                          <div className="p-2 bg-purple-500/20 rounded-lg mr-3">
                            {feature.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold text-white">
                              {feature.title}
                            </h3>
                            <Badge
                              className={`mt-1 ${getPriorityColor(feature.priority)} border`}
                            >
                              {feature.priority} priority
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-purple-200 text-sm mb-4">
                        {feature.description}
                      </p>
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">Progress:</span>
                          <span className="text-white font-medium">
                            {feature.progress}%
                          </span>
                        </div>
                        <Progress value={feature.progress} className="h-2" />
                        <div className="flex justify-between text-sm">
                          <span className="text-purple-300">Expected ETA:</span>
                          <span className="text-blue-400 font-medium">
                            {feature.eta}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Updates */}
          <Card className="glass-card border-green-500/20">
            <CardHeader>
              <CardTitle className="text-white text-2xl flex items-center">
                <CheckCircle className="w-6 h-6 mr-3 text-green-400" />
                Recently Completed
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentUpdates.map((update, index) => (
                  <div
                    key={index}
                    className="flex items-start p-4 bg-green-500/10 rounded-lg border border-green-500/20"
                  >
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3 mt-0.5" />
                    <div className="flex-1">
                      <h4 className="font-semibold text-white mb-1">
                        {update.title}
                      </h4>
                      <p className="text-green-200 text-sm mb-2">
                        {update.description}
                      </p>
                      <div className="flex items-center text-xs text-green-300">
                        <Calendar className="w-3 h-3 mr-1" />
                        Completed on {update.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Newsletter Signup */}
          <div className="mt-8 text-center">
            <Card className="glass-card border-blue-500/20 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <Star className="w-12 h-12 text-yellow-400 mx-auto mb-4" />
                <h3 className="text-2xl font-bold text-white mb-2">
                  Stay in the Loop
                </h3>
                <p className="text-purple-200 mb-6">
                  Be the first to know when new features launch. Get exclusive 
                  early access and beta testing opportunities.
                </p>
                <div className="flex gap-4 max-w-md mx-auto">
                  <Button className="flex-1 glass-button-primary">
                    Subscribe to Updates
                  </Button>
                  <Button variant="outline" className="glass-button">
                    Join Beta Program
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;