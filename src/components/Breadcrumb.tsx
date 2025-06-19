
import { ChevronRight, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

interface BreadcrumbItem {
  label: string;
  href: string;
}

const Breadcrumb = () => {
  const location = useLocation();
  
  const getBreadcrumbs = (): BreadcrumbItem[] => {
    const pathSegments = location.pathname.split('/').filter(Boolean);
    const breadcrumbs: BreadcrumbItem[] = [
      { label: "Dashboard", href: "/dashboard" }
    ];

    // Map path segments to readable labels
    const pathMapping: { [key: string]: string } = {
      'tenders': 'Tenders',
      'create': 'Create',
      'tender': 'Tender Details',
      'categories': 'Categories',
      'templates': 'Templates',
      'ai-create': 'AI Create',
      'risk-analysis': 'Risk Analysis',
      'cost-predict': 'Cost Prediction',
      'compliance-check': 'Compliance Check',
      'bids': 'Bids',
      'submit': 'Submit Bid',
      'tracking': 'Tracking',
      'library': 'Library',
      'ai-bid': 'AI Assistant',
      'competition': 'Competition',
      'win-score': 'Win Score',
      'optimize': 'Optimize',
      'evaluation': 'Evaluation',
      'panel': 'Evaluation Panel',
      'awards': 'Awards',
      'workflows': 'Workflows',
      'auto-score': 'Auto Score',
      'bias-check': 'Bias Check',
      'risk-eval': 'Risk Evaluation',
      'compliance-verify': 'Compliance Verify',
      'contracts': 'Contracts',
      'contract': 'Contract Details',
      'performance': 'Performance',
      'renewals': 'Renewals',
      'value-analysis': 'Value Analysis',
      'supplier-performance': 'Supplier Performance',
      'savings': 'Savings',
      'risk-monitor': 'Risk Monitor',
      'vendors': 'Vendors',
      'register': 'Register',
      'profile': 'Profile',
      'prequalification': 'Prequalification',
      'analytics': 'Analytics',
      'vendor-portal': 'Vendor Portal',
      'opportunities': 'Opportunities',
      'feedback': 'Feedback',
      'communication': 'Communication',
      'qa': 'Q&A Management',
      'announcements': 'Announcements',
      'collaborate': 'Collaboration',
      'notifications': 'Notifications',
      'documents': 'Documents',
      'viewer': 'Document Viewer',
      'versions': 'Version Control',
      'sharing': 'Secure Sharing',
      'properties': 'Properties',
      'property': 'Property Details',
      'services': 'Service Categories',
      'maintenance': 'Maintenance',
      'admin': 'Administration',
      'users': 'User Management',
      'organizations': 'Organizations',
      'security': 'Security',
      'config': 'Configuration',
      'data': 'Data Management',
      'help': 'Help & Support',
      'training': 'Training',
      'support': 'Technical Support'
    };

    let currentPath = '';
    pathSegments.forEach((segment, index) => {
      currentPath += `/${segment}`;
      
      // Skip numeric IDs in breadcrumbs
      if (!/^\d+$/.test(segment)) {
        breadcrumbs.push({
          label: pathMapping[segment] || segment.charAt(0).toUpperCase() + segment.slice(1),
          href: currentPath
        });
      }
    });

    return breadcrumbs;
  };

  const breadcrumbs = getBreadcrumbs();

  if (breadcrumbs.length <= 1) return null;

  return (
    <nav className="flex items-center space-x-2 text-sm text-gray-600 mb-4">
      <Link to="/dashboard" className="flex items-center hover:text-blue-600 transition-colors">
        <Home className="w-4 h-4" />
      </Link>
      
      {breadcrumbs.slice(1).map((item, index) => (
        <div key={item.href} className="flex items-center space-x-2">
          <ChevronRight className="w-4 h-4 text-gray-400" />
          {index === breadcrumbs.length - 2 ? (
            <span className="font-medium text-gray-900">{item.label}</span>
          ) : (
            <Link 
              to={item.href} 
              className="hover:text-blue-600 transition-colors"
            >
              {item.label}
            </Link>
          )}
        </div>
      ))}
    </nav>
  );
};

export default Breadcrumb;
