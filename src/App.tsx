
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";

// Authentication & Onboarding
import PasswordReset from "./pages/auth/PasswordReset";
import EmailVerification from "./pages/auth/EmailVerification";
import AccountSetup from "./pages/auth/AccountSetup";
import OrganizationOnboarding from "./pages/auth/OrganizationOnboarding";

// Tender Management
import TenderOverview from "./pages/tenders/TenderOverview";
import CreateTender from "./pages/tenders/CreateTender";
import TenderDetails from "./pages/tenders/TenderDetails";
import TenderCategories from "./pages/tenders/TenderCategories";
import TenderTemplates from "./pages/tenders/TenderTemplates";

// Bid Management
import BidOverview from "./pages/bids/BidOverview";
import BidSubmission from "./pages/bids/BidSubmission";
import BidTracking from "./pages/bids/BidTracking";
import BidLibrary from "./pages/bids/BidLibrary";

// Evaluation & Awards
import EvaluationDashboard from "./pages/evaluation/EvaluationDashboard";
import EvaluationPanel from "./pages/evaluation/EvaluationPanel";
import AwardManagement from "./pages/evaluation/AwardManagement";
import ApprovalWorkflows from "./pages/evaluation/ApprovalWorkflows";

// Contract Management
import ContractOverview from "./pages/contracts/ContractOverview";
import ContractDetails from "./pages/contracts/ContractDetails";
import CreateContract from "./pages/contracts/CreateContract";
import PerformanceManagement from "./pages/contracts/PerformanceManagement";
import RenewalManagement from "./pages/contracts/RenewalManagement";

// Vendor & Contractor Hub
import VendorDirectory from "./pages/vendors/VendorDirectory";
import VendorRegistration from "./pages/vendors/VendorRegistration";
import VendorProfile from "./pages/vendors/VendorProfile";
import VendorPrequalification from "./pages/vendors/VendorPrequalification";
import VendorAnalytics from "./pages/vendors/VendorAnalytics";

// Communication & Collaboration
import MessageCenter from "./pages/communication/MessageCenter";
import QAManagement from "./pages/communication/QAManagement";
import Announcements from "./pages/communication/Announcements";
import CollaborationSpaces from "./pages/communication/CollaborationSpaces";
import NotificationCenter from "./pages/communication/NotificationCenter";

// Document Management
import DocumentLibrary from "./pages/documents/DocumentLibrary";
import DocumentViewer from "./pages/documents/DocumentViewer";
import VersionControl from "./pages/documents/VersionControl";
import SecureSharing from "./pages/documents/SecureSharing";

// Analytics & Reporting
import AnalyticsDashboard from "./pages/analytics/AnalyticsDashboard";
import TenderAnalytics from "./pages/analytics/TenderAnalytics";
import VendorPerformanceAnalytics from "./pages/analytics/VendorPerformanceAnalytics";
import FinancialReports from "./pages/analytics/FinancialReports";
import ComplianceReports from "./pages/analytics/ComplianceReports";
import CustomReports from "./pages/analytics/CustomReports";

// Administration
import SystemAdministration from "./pages/admin/SystemAdministration";
import UserManagement from "./pages/admin/UserManagement";
import OrganizationManagement from "./pages/admin/OrganizationManagement";
import SecurityCompliance from "./pages/admin/SecurityCompliance";
import SystemConfiguration from "./pages/admin/SystemConfiguration";
import DataManagement from "./pages/admin/DataManagement";

// Properties
import PropertyPortfolio from "./pages/properties/PropertyPortfolio";
import PropertyDetails from "./pages/properties/PropertyDetails";
import ServiceCategories from "./pages/properties/ServiceCategories";
import MaintenancePlanning from "./pages/properties/MaintenancePlanning";

// Help & Support
import HelpCenter from "./pages/help/HelpCenter";
import TrainingResources from "./pages/help/TrainingResources";
import TechnicalSupport from "./pages/help/TechnicalSupport";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Landing Page */}
          <Route path="/" element={<Index />} />
          
          {/* Authentication & Onboarding */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password-reset" element={<PasswordReset />} />
          <Route path="/verify-email" element={<EmailVerification />} />
          <Route path="/setup" element={<AccountSetup />} />
          <Route path="/org-setup" element={<OrganizationOnboarding />} />
          
          {/* Dashboard Hub */}
          <Route path="/dashboard" element={<Dashboard />} />
          
          {/* Tender Management */}
          <Route path="/tenders" element={<TenderOverview />} />
          <Route path="/tenders/create" element={<CreateTender />} />
          <Route path="/tenders/tender/:id" element={<TenderDetails />} />
          <Route path="/tenders/categories" element={<TenderCategories />} />
          <Route path="/tenders/templates" element={<TenderTemplates />} />
          
          {/* Bid Management */}
          <Route path="/bids" element={<BidOverview />} />
          <Route path="/bids/submit/:tenderId" element={<BidSubmission />} />
          <Route path="/bids/tracking" element={<BidTracking />} />
          <Route path="/bids/library" element={<BidLibrary />} />
          
          {/* Evaluation & Awards */}
          <Route path="/evaluation" element={<EvaluationDashboard />} />
          <Route path="/evaluation/panel/:tenderId" element={<EvaluationPanel />} />
          <Route path="/evaluation/awards" element={<AwardManagement />} />
          <Route path="/evaluation/workflows" element={<ApprovalWorkflows />} />
          
          {/* Contract Management */}
          <Route path="/contracts" element={<ContractOverview />} />
          <Route path="/contracts/contract/:id" element={<ContractDetails />} />
          <Route path="/contracts/create" element={<CreateContract />} />
          <Route path="/contracts/performance" element={<PerformanceManagement />} />
          <Route path="/contracts/renewals" element={<RenewalManagement />} />
          
          {/* Vendor & Contractor Hub */}
          <Route path="/vendors" element={<VendorDirectory />} />
          <Route path="/vendors/register" element={<VendorRegistration />} />
          <Route path="/vendors/profile/:vendorId" element={<VendorProfile />} />
          <Route path="/vendors/prequalification" element={<VendorPrequalification />} />
          <Route path="/vendors/analytics" element={<VendorAnalytics />} />
          
          {/* Communication & Collaboration */}
          <Route path="/communication" element={<MessageCenter />} />
          <Route path="/communication/qa" element={<QAManagement />} />
          <Route path="/communication/announcements" element={<Announcements />} />
          <Route path="/communication/collaborate" element={<CollaborationSpaces />} />
          <Route path="/communication/notifications" element={<NotificationCenter />} />
          
          {/* Document Management */}
          <Route path="/documents" element={<DocumentLibrary />} />
          <Route path="/documents/viewer/:docId" element={<DocumentViewer />} />
          <Route path="/documents/versions" element={<VersionControl />} />
          <Route path="/documents/sharing" element={<SecureSharing />} />
          
          {/* Analytics & Reporting */}
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/analytics/tender-analytics" element={<TenderAnalytics />} />
          <Route path="/analytics/vendor-analytics" element={<VendorPerformanceAnalytics />} />
          <Route path="/analytics/financial" element={<FinancialReports />} />
          <Route path="/analytics/compliance" element={<ComplianceReports />} />
          <Route path="/analytics/custom" element={<CustomReports />} />
          
          {/* Administration */}
          <Route path="/admin" element={<SystemAdministration />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/organizations" element={<OrganizationManagement />} />
          <Route path="/admin/security" element={<SecurityCompliance />} />
          <Route path="/admin/config" element={<SystemConfiguration />} />
          <Route path="/admin/data" element={<DataManagement />} />
          
          {/* Properties */}
          <Route path="/properties" element={<PropertyPortfolio />} />
          <Route path="/properties/property/:id" element={<PropertyDetails />} />
          <Route path="/properties/services" element={<ServiceCategories />} />
          <Route path="/properties/maintenance" element={<MaintenancePlanning />} />
          
          {/* Help & Support */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/help/training" element={<TrainingResources />} />
          <Route path="/help/support" element={<TechnicalSupport />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
