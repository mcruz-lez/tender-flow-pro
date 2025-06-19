
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
  FileContract,
  MessageSquare,
  FolderOpen,
  BarChart3,
  Settings,
  HelpCircle,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Home,
  Briefcase,
  Shield,
  Clock,
  TrendingUp
} from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface DashboardSidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

const DashboardSidebar = ({ isOpen, onToggle }: DashboardSidebarProps) => {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<string[]>(['main']);

  const navigationItems = [
    {
      section: "main",
      title: "Main",
      items: [
        {
          icon: LayoutDashboard,
          label: "Dashboard",
          href: "/dashboard",
          badge: null
        },
        {
          icon: Home,
          label: "Properties",
          href: "/properties",
          badge: "24"
        }
      ]
    },
    {
      section: "procurement",
      title: "Procurement",
      items: [
        {
          icon: FileText,
          label: "Tenders",
          href: "/tenders",
          badge: "8"
        },
        {
          icon: Briefcase,
          label: "Bids",
          href: "/bids",
          badge: "12"
        },
        {
          icon: Award,
          label: "Evaluation",
          href: "/evaluation",
          badge: "3"
        },
        {
          icon: FileContract,
          label: "Contracts",
          href: "/contracts",
          badge: null
        }
      ]
    },
    {
      section: "management",
      title: "Management",
      items: [
        {
          icon: Users,
          label: "Vendors",
          href: "/vendors",
          badge: "156"
        },
        {
          icon: MessageSquare,
          label: "Communication",
          href: "/communication",
          badge: "5"
        },
        {
          icon: FolderOpen,
          label: "Documents",
          href: "/documents",
          badge: null
        }
      ]
    },
    {
      section: "insights",
      title: "Insights",
      items: [
        {
          icon: BarChart3,
          label: "Analytics",
          href: "/analytics",
          badge: null
        },
        {
          icon: TrendingUp,
          label: "Reports",
          href: "/reports",
          badge: null
        }
      ]
    },
    {
      section: "system",
      title: "System",
      items: [
        {
          icon: Settings,
          label: "Settings",
          href: "/settings",
          badge: null
        },
        {
          icon: HelpCircle,
          label: "Help & Support",
          href: "/help",
          badge: null
        }
      ]
    }
  ];

  const toggleSection = (section: string) => {
    setExpandedSections(prev => 
      prev.includes(section) 
        ? prev.filter(s => s !== section)
        : [...prev, section]
    );
  };

  const isActiveRoute = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className={`fixed left-0 top-0 h-full bg-white border-r border-gray-200 transition-all duration-300 z-40 ${
      isOpen ? 'w-64' : 'w-16'
    }`}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          {isOpen && (
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <Building2 className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-lg font-bold text-gray-900">TendProcure</h1>
                <p className="text-xs text-blue-600 font-medium">Property Tender Platform</p>
              </div>
            </Link>
          )}
          {!isOpen && (
            <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-lg flex items-center justify-center mx-auto">
              <Building2 className="w-5 h-5 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Toggle Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 rounded-full border border-gray-200 bg-white shadow-md hover:bg-gray-50 z-50"
      >
        {isOpen ? (
          <ChevronLeft className="w-3 h-3" />
        ) : (
          <ChevronRight className="w-3 h-3" />
        )}
      </Button>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-6">
        {navigationItems.map((section) => (
          <div key={section.section}>
            {isOpen && (
              <div className="px-2 mb-3">
                <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider">
                  {section.title}
                </h3>
              </div>
            )}
            
            <div className="space-y-1">
              {section.items.map((item) => (
                <Link
                  key={item.href}
                  to={item.href}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors relative group ${
                    isActiveRoute(item.href)
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                  }`}
                >
                  <item.icon className={`flex-shrink-0 ${isOpen ? 'w-5 h-5 mr-3' : 'w-5 h-5'}`} />
                  
                  {isOpen && (
                    <>
                      <span className="flex-1">{item.label}</span>
                      {item.badge && (
                        <Badge 
                          variant="secondary" 
                          className={`text-xs ${
                            isActiveRoute(item.href) 
                              ? 'bg-blue-100 text-blue-700' 
                              : 'bg-gray-100 text-gray-600'
                          }`}
                        >
                          {item.badge}
                        </Badge>
                      )}
                    </>
                  )}
                  
                  {/* Tooltip for collapsed state */}
                  {!isOpen && (
                    <div className="absolute left-16 px-2 py-1 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-50">
                      {item.label}
                      {item.badge && (
                        <span className="ml-2 px-1 py-0.5 bg-white text-gray-900 rounded text-xs">
                          {item.badge}
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              ))}
            </div>
            
            {section.section !== 'system' && <Separator className="my-4" />}
          </div>
        ))}
      </nav>

      {/* User Profile & Logout */}
      <div className="border-t border-gray-200 p-4">
        {isOpen ? (
          <div className="space-y-3">
            <div className="flex items-center space-x-3 px-2">
              <div className="w-8 h-8 bg-gradient-to-br from-gray-400 to-gray-500 rounded-full flex items-center justify-center">
                <span className="text-xs font-semibold text-white">JD</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900 truncate">John Doe</p>
                <p className="text-xs text-gray-500 truncate">Property Manager</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full justify-start text-gray-600 hover:text-red-600 hover:bg-red-50"
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
            <Button variant="ghost" size="sm" className="w-8 h-8 p-0 hover:bg-red-50 hover:text-red-600">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardSidebar;
