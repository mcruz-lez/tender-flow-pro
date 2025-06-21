import PageTemplate from "@/components/PageTemplate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Brain, Zap, FileText, Users, Clock, DollarSign } from "lucide-react";
import { Link } from "react-router-dom";

const AICreateTender = () => {
  const quickActions = [
    {
      label: "Traditional Create",
      href: "/tenders/create",
      icon: FileText,
      variant: "outline" as const,
    },
    {
      label: "Browse Templates",
      href: "/tenders/templates",
      icon: FileText,
      variant: "outline" as const,
    },
    {
      label: "View Vendors",
      href: "/vendors",
      icon: Users,
      variant: "outline" as const,
    },
  ];

  const relatedPages = [
    { label: "Risk Analysis", href: "/tenders/risk-analysis" },
    { label: "Cost Prediction", href: "/tenders/cost-predict" },
    { label: "Compliance Check", href: "/tenders/compliance-check" },
  ];

  return (
    <PageTemplate
      title="AI-Powered Tender Creation"
      description="Let AI assist you in creating comprehensive tenders with smart recommendations and automated compliance checks"
      quickActions={quickActions}
      relatedPages={relatedPages}
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Brain className="w-5 h-5 text-blue-600" />
                <CardTitle>AI Tender Assistant</CardTitle>
              </div>
              <CardDescription>
                Describe your project requirements and let AI generate a
                comprehensive tender document
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="text-sm font-medium mb-2 block">
                  Project Description
                </label>
                <Textarea
                  placeholder="Describe your project needs, property type, service requirements, timeline, and budget expectations..."
                  className="min-h-[120px]"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Property Type
                  </label>
                  <Input placeholder="e.g., Office Building, Retail Complex" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Service Category
                  </label>
                  <Input placeholder="e.g., HVAC Maintenance, Security" />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Estimated Budget
                  </label>
                  <Input placeholder="$50,000 - $100,000" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Timeline
                  </label>
                  <Input placeholder="6 months" />
                </div>
              </div>

              <Button className="w-full bg-blue-600 hover:bg-blue-700">
                <Brain className="w-4 h-4 mr-2" />
                Generate AI Tender
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>AI Recommendations</CardTitle>
              <CardDescription>
                Smart suggestions based on your input
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Zap className="w-4 h-4 text-blue-600" />
                    <span className="font-medium text-blue-900">
                      Smart Vendor Matching
                    </span>
                  </div>
                  <p className="text-sm text-blue-700">
                    Found 12 qualified vendors in your area with HVAC expertise
                    and positive performance ratings.
                  </p>
                  <Button asChild size="sm" className="mt-2" variant="outline">
                    <Link to="/vendors?category=hvac">
                      View Matching Vendors
                    </Link>
                  </Button>
                </div>

                <div className="p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <DollarSign className="w-4 h-4 text-green-600" />
                    <span className="font-medium text-green-900">
                      Budget Optimization
                    </span>
                  </div>
                  <p className="text-sm text-green-700">
                    Similar projects averaged $75,000. Consider splitting into
                    preventive maintenance and emergency services for better
                    cost control.
                  </p>
                  <Button asChild size="sm" className="mt-2" variant="outline">
                    <Link to="/tenders/cost-predict">View Cost Analysis</Link>
                  </Button>
                </div>

                <div className="p-4 bg-orange-50 rounded-lg">
                  <div className="flex items-center space-x-2 mb-2">
                    <Clock className="w-4 h-4 text-orange-600" />
                    <span className="font-medium text-orange-900">
                      Timeline Suggestions
                    </span>
                  </div>
                  <p className="text-sm text-orange-700">
                    Consider 4-week bid submission period and 2-week evaluation
                    phase for optimal vendor participation.
                  </p>
                  <Button asChild size="sm" className="mt-2" variant="outline">
                    <Link to="/tenders/templates">Use Template</Link>
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Features</CardTitle>
              <CardDescription>Available AI-powered tools</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {[
                {
                  name: "Smart Requirements",
                  description: "Auto-generate technical specs",
                  available: true,
                },
                {
                  name: "Compliance Check",
                  description: "Verify regulatory requirements",
                  available: true,
                },
                {
                  name: "Risk Assessment",
                  description: "Identify potential project risks",
                  available: true,
                },
                {
                  name: "Vendor Matching",
                  description: "Find qualified service providers",
                  available: true,
                },
                {
                  name: "Cost Estimation",
                  description: "Predict market pricing",
                  available: true,
                },
                {
                  name: "Timeline Optimization",
                  description: "Suggest optimal schedules",
                  available: false,
                },
              ].map((feature, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 rounded border"
                >
                  <div>
                    <p className="font-medium text-sm">{feature.name}</p>
                    <p className="text-xs text-gray-500">
                      {feature.description}
                    </p>
                  </div>
                  <Badge variant={feature.available ? "default" : "secondary"}>
                    {feature.available ? "Available" : "Coming Soon"}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link to="/tenders/risk-analysis">
                  <Zap className="w-4 h-4 mr-2" />
                  Run Risk Analysis
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link to="/tenders/cost-predict">
                  <DollarSign className="w-4 h-4 mr-2" />
                  Predict Costs
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="w-full justify-start"
              >
                <Link to="/tenders/compliance-check">
                  <FileText className="w-4 h-4 mr-2" />
                  Check Compliance
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTemplate>
  );
};

export default AICreateTender;
