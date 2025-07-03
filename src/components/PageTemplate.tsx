import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
import Breadcrumb from "@/components/Breadcrumb";
import { Button } from "@/components/ui/button";
import { Construction, Plus, Search, Filter, ExternalLink } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface QuickAction {
  label: string;
  href: string;
  icon?: React.ComponentType<{ className?: string }>;
  variant?: "default" | "outline" | "secondary";
}

interface PageTemplateProps {
  title: string;
  description: string;
  children?: React.ReactNode;
  quickActions?: QuickAction[];
  relatedPages?: { label: string; href: string }[];
}

const PageTemplate = ({
  title,
  description,
  children,
  quickActions,
  relatedPages,
}: PageTemplateProps) => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const location = useLocation();

  // Auto-generate context-aware quick actions based on current page
  function getContextualActions(): QuickAction[] {
    const path = location.pathname;

    if (path.includes("/tenders")) {
      return [
        { label: "Create Tender", href: "/tenders/create", icon: Plus },
        { label: "AI Create", href: "/tenders/ai-create", icon: Construction },
        {
          label: "Browse Vendors",
          href: "/vendors",
          icon: ExternalLink,
          variant: "outline",
        },
      ];
    }

    if (path.includes("/bids")) {
      return [
        { label: "Submit Bid", href: "/bids/submit", icon: Plus },
        { label: "AI Assistant", href: "/bids/ai-bid", icon: Construction },
        {
          label: "View Tenders",
          href: "/tenders",
          icon: ExternalLink,
          variant: "outline",
        },
      ];
    }

    if (path.includes("/vendors")) {
      return [
        { label: "Register Vendor", href: "/vendors/register", icon: Plus },
        {
          label: "Prequalification",
          href: "/vendors/prequalification",
          icon: Filter,
        },
        {
          label: "View Opportunities",
          href: "/opportunities",
          icon: ExternalLink,
          variant: "outline",
        },
      ];
    }

    if (path.includes("/contracts")) {
      return [
        { label: "Create Contract", href: "/contracts/create", icon: Plus },
        {
          label: "Performance",
          href: "/contracts/performance",
          icon: Construction,
        },
        {
          label: "View Tenders",
          href: "/tenders",
          icon: ExternalLink,
          variant: "outline",
        },
      ];
    }

    if (path.includes("/properties")) {
      return [
        { label: "Add Property", href: "/properties/create", icon: Plus },
        {
          label: "Maintenance",
          href: "/properties/maintenance",
          icon: Construction,
        },
        {
          label: "Service Categories",
          href: "/properties/services",
          icon: ExternalLink,
          variant: "outline",
        },
      ];
    }

    return [];
  }

  // Auto-generate related pages based on current section
  function getRelatedPages() {
    const path = location.pathname;

    if (path.includes("/tenders")) {
      return [
        { label: "Bid Management", href: "/bids" },
        { label: "Evaluation Dashboard", href: "/evaluation" },
        { label: "Vendor Directory", href: "/vendors" },
        { label: "Document Library", href: "/documents" },
      ];
    }

    if (path.includes("/bids")) {
      return [
        { label: "Tender Overview", href: "/tenders" },
        { label: "Evaluation Panel", href: "/evaluation" },
        { label: "Document Library", href: "/documents" },
        { label: "Vendor Analytics", href: "/vendors/analytics" },
      ];
    }

    if (path.includes("/evaluation")) {
      return [
        { label: "Tender Management", href: "/tenders" },
        { label: "Bid Overview", href: "/bids" },
        { label: "Contract Management", href: "/contracts" },
        { label: "Analytics Dashboard", href: "/analytics" },
      ];
    }

    if (path.includes("/contracts")) {
      return [
        { label: "Tender Management", href: "/tenders" },
        { label: "Property Portfolio", href: "/properties" },
        { label: "Vendor Performance", href: "/vendors/analytics" },
        { label: "Financial Reports", href: "/analytics/financial" },
      ];
    }

    return [];
  }

  const contextualActions = quickActions || getContextualActions();
  const contextualRelatedPages = relatedPages || getRelatedPages();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"} min-h-screen`}
      >
        <div className="p-6">
          <Breadcrumb />

          <div className="flex justify-between items-start mb-6">
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{title}</h1>
              <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
            </div>

            {contextualActions.length > 0 && (
              <div className="flex items-center space-x-2 ml-6">
                {contextualActions.map((action, index) => (
                  <Button
                    key={index}
                    asChild
                    variant={action.variant || "default"}
                    className={
                      action.variant === "default"
                        ? "bg-blue-600 hover:bg-blue-700"
                        : ""
                    }
                  >
                    <Link to={action.href}>
                      {action.icon &&
                        (() => {
                          const Icon = action.icon;
                          return <Icon className="w-4 h-4 mr-2" />;
                        })()}
                      {action.label}
                    </Link>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Related Pages Quick Links */}
          {contextualRelatedPages.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="text-sm font-medium text-blue-900 mb-2">
                Related Sections
              </h3>
              <div className="flex flex-wrap gap-2">
                {contextualRelatedPages.map((page, index) => (
                  <Link
                    key={index}
                    to={page.href}
                    className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-white text-blue-700 border border-blue-200 hover:bg-blue-100 transition-colors"
                  >
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {page.label}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {children || (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <Construction className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">
                Coming Soon
              </h2>
              <p className="text-gray-600 mb-4">
                This section is being developed. Please check back later for
                updates.
              </p>
              <div className="flex justify-center space-x-2">
                <Button asChild variant="outline">
                  <Link to="/dashboard">Return to Dashboard</Link>
                </Button>
                {contextualActions.length > 0 && (
                  <Button asChild>
                    <Link to={contextualActions[0].href}>
                      {contextualActions[0].label}
                    </Link>
                  </Button>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTemplate;
