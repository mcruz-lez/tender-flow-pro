import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Building2,
  LayoutDashboard,
  FileText,
  Users,
  Award,
  FileCheck,
  MessageSquare,
  FolderOpen,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Home,
  Briefcase,
  Clock,
  TrendingUp,
  Brain,
  Bot,
  Search,
  Zap,
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

interface NavigationChild {
  label: string;
  href: string;
  icon?: React.ElementType;
}

interface NavigationItem {
  icon: React.ElementType;
  label: string;
  href: string;
  badge?: string | null;
  children?: NavigationChild[];
}

const DashboardSidebar = ({ isOpen, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(["main"]);

  const navigationItems: {
    section: string;
    title: string;
    items: NavigationItem[];
  }[] = [
    {
      section: "main",
      title: "Main",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/dashboard",
          badge: null,
          children: [
            { label: "Property Manager", href: "/pm-dashboard" },
            { label: "Contractor", href: "/contractor-dashboard" },
            { label: "Vendor", href: "/vendor-dashboard" },
            { label: "Finance", href: "/finance-dashboard" },
            { label: "Admin", href: "/admin-dashboard" },
          ],
        },
        {
          icon: Home,
          label: "Properties",
          href: "/properties",
          badge: "24",
          children: [
            { label: "Service Categories", href: "/properties/services" },
            { label: "Maintenance", href: "/properties/maintenance" },
            { label: "Cost Analysis", href: "/properties/cost-analysis" },
            { label: "Performance", href: "/properties/service-performance" },
          ],
        },
      ],
    },
    {
      section: "procurement",
      title: "Procurement",
      items: [
        {
          icon: FileText,
          label: "Tenders",
          href: "/tenders",
          badge: "8",
          children: [
            { label: "Create Tender", href: "/tenders/create" },
            { label: "Categories", href: "/tenders/categories" },
            { label: "Templates", href: "/tenders/templates" },
            { label: "AI Create", href: "/tenders/ai-create", icon: Brain },
            { label: "Risk Analysis", href: "/tenders/risk-analysis" },
          ],
        },
        {
          icon: Briefcase,
          label: "Bids",
          href: "/bids",
          badge: "12",
          children: [
            { label: "Bid Tracking", href: "/bids/tracking" },
            { label: "Bid Library", href: "/bids/library" },
            { label: "AI Assistant", href: "/bids/ai-bid", icon: Bot },
            { label: "Win Score", href: "/bids/win-score" },
            { label: "Optimize", href: "/bids/optimize" },
          ],
        },
        {
          icon: Award,
          label: "Evaluation",
          href: "/evaluation",
          badge: "3",
          children: [
            { label: "Awards", href: "/evaluation/awards" },
            { label: "Workflows", href: "/evaluation/workflows" },
            { label: "Auto Score", href: "/evaluation/auto-score", icon: Zap },
            { label: "Bias Check", href: "/evaluation/bias-check" },
          ],
        },
        {
          icon: FileCheck,
          label: "Contracts",
          href: "/contracts",
          badge: null,
          children: [
            { label: "Performance", href: "/contracts/performance" },
            { label: "Renewals", href: "/contracts/renewals" },
            { label: "Value Analysis", href: "/contracts/value-analysis" },
            { label: "Risk Monitor", href: "/contracts/risk-monitor" },
          ],
        },
      ],
    },
    {
      section: "management",
      title: "Management",
      items: [
        {
          icon: Users,
          label: "Vendors",
          href: "/vendors",
          badge: "156",
          children: [
            { label: "Registration", href: "/vendors/register" },
            { label: "Prequalification", href: "/vendors/prequalification" },
            { label: "Analytics", href: "/vendors/analytics" },
            { label: "Portal", href: "/vendor-portal" },
          ],
        },
        {
          icon: MessageSquare,
          label: "Communication",
          href: "/communication",
          badge: "5",
          children: [
            { label: "Q&A Management", href: "/communication/qa" },
            { label: "Announcements", href: "/communication/announcements" },
            { label: "Collaboration", href: "/communication/collaborate" },
            { label: "Notifications", href: "/communication/notifications" },
          ],
        },
        {
          icon: FolderOpen,
          label: "Documents",
          href: "/documents",
          badge: null,
          children: [
            { label: "Version Control", href: "/documents/versions" },
            { label: "Secure Sharing", href: "/documents/sharing" },
            { label: "AI Extract", href: "/documents/extract", icon: Brain },
            { label: "Classify", href: "/documents/classify" },
          ],
        },
      ],
    },
    {
      section: "insights",
      title: "Insights",
      items: [
        {
          icon: BarChart3,
          label: "Analytics",
          href: "/analytics",
          badge: null,
          children: [
            { label: "Tender Analytics", href: "/analytics/tender-analytics" },
            { label: "Vendor Analytics", href: "/analytics/vendor-analytics" },
            { label: "Financial Reports", href: "/analytics/financial" },
            {
              label: "Predictions",
              href: "/analytics/predictions",
              icon: Brain,
            },
          ],
        },
        {
          icon: TrendingUp,
          label: "Reports",
          href: "/custom-reports",
          badge: null,
          children: [
            { label: "Custom Reports", href: "/analytics/custom" },
            { label: "Compliance", href: "/analytics/compliance" },
            { label: "Market Intel", href: "/analytics/market-intel" },
          ],
        },
      ],
    },
    {
      section: "system",
      title: "System",
      items: [
        {
          icon: Settings,
          label: "Admin",
          href: "/admin",
          badge: null,
          children: [
            { label: "Users", href: "/admin/users" },
            { label: "Organizations", href: "/admin/organizations" },
            { label: "Security", href: "/admin/security" },
            { label: "Configuration", href: "/admin/config" },
            { label: "Audit Logs", href: "/admin/audit-logs" },
          ],
        },
        {
          icon: MessageSquare,
          label: "Messaging",
          href: "/communication/messaging",
          badge: null,
        },
        {
          icon: FolderOpen,
          label: "Document Management",
          href: "/documents/document-management",
          badge: null,
        },
        {
          icon: HelpCircle,
          label: "Help & Support",
          href: "/help",
          badge: null,
          children: [
            { label: "Training", href: "/help/training" },
            { label: "Support", href: "/help/support" },
            { label: "Forums", href: "/help/forums" },
            { label: "Feature Requests", href: "/help/feature-requests" },
          ],
        },
      ],
    },
  ];

  const toggleSection = (section: string) => {
    setExpandedSections((prev) =>
      prev.includes(section)
        ? prev.filter((s) => s !== section)
        : [...prev, section],
    );
  };

  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleItem = (itemLabel: string) => {
    if (!isOpen) return;
    setExpandedItems((prev) =>
      prev.includes(itemLabel)
        ? prev.filter((item) => item !== itemLabel)
        : [...prev, itemLabel],
    );
  };

  const isActiveRoute = (href: string) => {
    return (
      location.pathname === href || location.pathname.startsWith(href + "/")
    );
  };

  const hasActiveChild = (item: NavigationItem) => {
    return item.children?.some((child: NavigationChild) =>
      isActiveRoute(child.href),
    );
  };

  return (
    <div
      className={`fixed left-0 top-0 h-full transition-all duration-500 z-40 ${
        isOpen ? "w-64" : "w-16"
      } 
      bg-white/98 dark:bg-card/98 backdrop-blur-xl
      border-r border-border shadow-xl
      `}
    >
      {/* Header */}
      <div className="p-4 border-b border-border bg-background/95 backdrop-blur-sm">
        <div className="flex items-center justify-between">
          {isOpen && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-lg flex items-center justify-center shadow-premium animate-pulse-glow">
                <Building2 className="w-5 h-5 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-foreground">TendProcure</h1>
                <p className="text-xs text-primary font-medium">
                  Property Tender Platform
                </p>
              </div>
            </Link>
          )}
          {!isOpen && (
            <div className="w-8 h-8 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-lg flex items-center justify-center mx-auto shadow-premium animate-pulse-glow">
              <Building2 className="w-5 h-5 text-primary-foreground" />
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-border/50 dark:border-accent/30 glass-button interactive-glow hover-lift shadow-premium z-50"
      >
        {isOpen ? (
          <ChevronLeft className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
      </Button>

      {/* Quick Search - Only when expanded */}
      {isOpen && (
        <div className="p-4 border-b border-border bg-muted/50">
          <div className="relative">
            <Search className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Quick search..."
              className="w-full pl-9 pr-3 py-2 text-sm border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-all duration-300"
            />
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6 scroll-smooth scrollbar-thin scrollbar-track-transparent scrollbar-thumb-primary/30">
        {navigationItems.map((section, sectionIndex) => (
          <div key={section.section} className="animate-fade-in-up" style={{ animationDelay: `${sectionIndex * 100}ms` }}>
            {isOpen && (
              <div className="px-2 mb-3">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider relative">
                  <span className="text-muted-foreground">
                    {section.title}
                  </span>
                  <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-border to-transparent"></div>
                </h3>
              </div>
            )}

            <div className="space-y-1">
              {section.items.map((item, itemIndex) => (
                <div key={item.href} className="animate-scale-in" style={{ animationDelay: `${(sectionIndex * section.items.length + itemIndex) * 50}ms` }}>
                  <div
                    className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group cursor-pointer border ${
                      isActiveRoute(item.href) || hasActiveChild(item)
                        ? "bg-primary/10 text-primary border-primary/20 shadow-md"
                        : "text-foreground hover:bg-accent/50 hover:text-accent-foreground border-transparent hover:border-border"
                    }`}
                    onClick={() => item.children && toggleItem(item.label)}
                  >
                    {/* Active indicator */}
                    {(isActiveRoute(item.href) || hasActiveChild(item)) && (
                      <div className="absolute left-0 top-0 bottom-0 w-1 bg-primary rounded-r-full"></div>
                    )}
                    
                    <Link to={item.href} className="flex items-center flex-1 relative z-10">
                      <item.icon
                        className={`flex-shrink-0 transition-all duration-300 ${isOpen ? "w-5 h-5 mr-3" : "w-5 h-5"} ${
                          isActiveRoute(item.href) || hasActiveChild(item)
                            ? "text-primary"
                            : "text-muted-foreground group-hover:text-primary group-hover:scale-110"
                        }`}
                      />

                      {isOpen && (
                        <>
                          <span className="flex-1 transition-all duration-300 group-hover:translate-x-1">{item.label}</span>
                          {item.badge && (
                            <Badge
                              variant="secondary"
                              className={`text-xs ml-2 transition-all duration-300 ${
                                isActiveRoute(item.href) || hasActiveChild(item)
                                  ? "bg-primary/20 text-primary border border-primary/30"
                                  : "bg-muted text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
                              } group-hover:scale-110`}
                            >
                              {item.badge}
                            </Badge>
                          )}
                        </>
                      )}
                    </Link>

                    {isOpen && item.children && (
                      <div className="ml-2 transition-all duration-300 group-hover:scale-110">
                        {expandedItems.includes(item.label) ? (
                          <ChevronUp className="w-4 h-4 text-primary" />
                        ) : (
                          <ChevronDown className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                        )}
                      </div>
                    )}

                    {/* Enhanced tooltip for collapsed state */}
                    {!isOpen && (
                      <div className="absolute left-16 px-3 py-2 bg-popover backdrop-blur-md text-popover-foreground text-xs rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap z-50 shadow-lg border border-border transform group-hover:translate-x-1">
                        <div className="font-medium">{item.label}</div>
                        {item.badge && (
                          <span className="ml-2 px-2 py-0.5 bg-primary/20 text-primary rounded-full text-xs">
                            {item.badge}
                          </span>
                        )}
                        {/* Tooltip arrow */}
                        <div className="absolute left-0 top-1/2 -translate-x-1 -translate-y-1/2 w-2 h-2 bg-popover border-l border-b border-border rotate-45"></div>
                      </div>
                    )}
                  </div>

                  {/* Enhanced submenu */}
                  {isOpen &&
                    item.children &&
                    expandedItems.includes(item.label) && (
                      <div className="ml-8 mt-2 space-y-1 animate-slide-in-right">
                        <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent mb-2"></div>
                        {item.children.map((child, childIndex) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className={`flex items-center px-3 py-2 rounded-md text-sm transition-all duration-300 border ${
                              isActiveRoute(child.href)
                                ? "bg-primary/10 text-primary font-medium border-primary/20"
                                : "text-muted-foreground hover:bg-accent/50 hover:text-accent-foreground border-transparent hover:border-border"
                            } group relative`}
                            style={{ animationDelay: `${childIndex * 50}ms` }}
                          >
                            {/* Child item indicator */}
                            <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-px bg-border"></div>
                            
                            {child.icon && (
                              <child.icon className="w-4 h-4 mr-2 transition-all duration-300 group-hover:text-primary group-hover:scale-110" />
                            )}
                            <span className="transition-all duration-300 group-hover:translate-x-1">{child.label}</span>
                          </Link>
                        ))}
                      </div>
                    )}
                </div>
              ))}
            </div>

            {section.section !== "system" && <Separator className="my-6 bg-gradient-to-r from-transparent via-border to-transparent h-px border-0" />}
          </div>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-border p-4 bg-muted/50">
        {isOpen ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-foreground truncate">
                  John Doe
                </p>
                <p className="text-xs text-muted-foreground truncate">
                  Property Manager
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-full justify-start text-muted-foreground hover:text-destructive hover:bg-destructive/10"
            >
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        ) : (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
              <span className="text-xs font-semibold text-white">JD</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              className="w-8 h-8 p-0 hover:bg-destructive/10 hover:text-destructive"
            >
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
