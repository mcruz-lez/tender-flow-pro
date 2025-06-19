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

// Dashboard Hub Extensions
import PMDashboard from "./pages/dashboard/PMDashboard";
import ContractorDashboard from "./pages/dashboard/ContractorDashboard";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import FinanceDashboard from "./pages/dashboard/FinanceDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import Widgets from "./pages/dashboard/Widgets";
import CustomReports from "./pages/dashboard/CustomReports";
import KPIs from "./pages/dashboard/KPIs";

// Tender Management
import TenderOverview from "./pages/tenders/TenderOverview";
import CreateTender from "./pages/tenders/CreateTender";
import TenderDetails from "./pages/tenders/TenderDetails";
import TenderCategories from "./pages/tenders/TenderCategories";
import TenderTemplates from "./pages/tenders/TenderTemplates";
import AICreateTender from "./pages/tenders/AICreateTender";
import RiskAnalysis from "./pages/tenders/RiskAnalysis";
import CostPredict from "./pages/tenders/CostPredict";
import ComplianceCheck from "./pages/tenders/ComplianceCheck";

// Bid Management
import BidOverview from "./pages/bids/BidOverview";
import BidSubmission from "./pages/bids/BidSubmission";
import BidTracking from "./pages/bids/BidTracking";
import BidLibrary from "./pages/bids/BidLibrary";
import AIBid from "./pages/bids/AIBid";
import Competition from "./pages/bids/Competition";
import WinScore from "./pages/bids/WinScore";
import OptimizeBid from "./pages/bids/OptimizeBid";

// Evaluation & Awards
import EvaluationDashboard from "./pages/evaluation/EvaluationDashboard";
import EvaluationPanel from "./pages/evaluation/EvaluationPanel";
import AwardManagement from "./pages/evaluation/AwardManagement";
import ApprovalWorkflows from "./pages/evaluation/ApprovalWorkflows";
import AutoScore from "./pages/evaluation/AutoScore";
import BiasCheck from "./pages/evaluation/BiasCheck";
import RiskEval from "./pages/evaluation/RiskEval";
import ComplianceVerify from "./pages/evaluation/ComplianceVerify";

// Contract Management
import ContractOverview from "./pages/contracts/ContractOverview";
import ContractDetails from "./pages/contracts/ContractDetails";
import CreateContract from "./pages/contracts/CreateContract";
import PerformanceManagement from "./pages/contracts/PerformanceManagement";
import RenewalManagement from "./pages/contracts/RenewalManagement";
import ValueAnalysis from "./pages/contracts/ValueAnalysis";
import SupplierPerformance from "./pages/contracts/SupplierPerformance";
import Savings from "./pages/contracts/Savings";
import RiskMonitor from "./pages/contracts/RiskMonitor";

// Vendor & Contractor Hub
import VendorDirectory from "./pages/vendors/VendorDirectory";
import VendorRegistration from "./pages/vendors/VendorRegistration";
import VendorProfile from "./pages/vendors/VendorProfile";
import VendorPrequalification from "./pages/vendors/VendorPrequalification";
import VendorAnalytics from "./pages/vendors/VendorAnalytics";
import VendorPortal from "./pages/vendors/VendorPortal";
import Opportunities from "./pages/vendors/Opportunities";
import SubmitBid from "./pages/vendors/SubmitBid";
import Feedback from "./pages/vendors/Feedback";

// Communication & Collaboration
import MessageCenter from "./pages/communication/MessageCenter";
import QAManagement from "./pages/communication/QAManagement";
import Announcements from "./pages/communication/Announcements";
import CollaborationSpaces from "./pages/communication/CollaborationSpaces";
import NotificationCenter from "./pages/communication/NotificationCenter";
import EmailSync from "./pages/communication/EmailSync";
import Calendar from "./pages/communication/Calendar";
import Integrations from "./pages/communication/Integrations";
import APIManage from "./pages/communication/APIManage";

// Document Management
import DocumentLibrary from "./pages/documents/DocumentLibrary";
import DocumentViewer from "./pages/documents/DocumentViewer";
import VersionControl from "./pages/documents/VersionControl";
import SecureSharing from "./pages/documents/SecureSharing";
import TenderDocs from "./pages/documents/TenderDocs";
import ContractDocs from "./pages/documents/ContractDocs";
import LegalDocs from "./pages/documents/LegalDocs";
import TechSpecs from "./pages/documents/TechSpecs";
import FinancialDocs from "./pages/documents/FinancialDocs";
import ComplianceDocs from "./pages/documents/ComplianceDocs";
import Extract from "./pages/documents/Extract";
import Analyze from "./pages/documents/Analyze";
import DocCompliance from "./pages/documents/DocCompliance";
import Classify from "./pages/documents/Classify";

// Analytics & Reporting
import AnalyticsDashboard from "./pages/analytics/AnalyticsDashboard";
import TenderAnalytics from "./pages/analytics/TenderAnalytics";
import VendorPerformanceAnalytics from "./pages/analytics/VendorPerformanceAnalytics";
import FinancialReports from "./pages/analytics/FinancialReports";
import ComplianceReports from "./pages/analytics/ComplianceReports";
import Predictions from "./pages/analytics/Predictions";
import MarketIntel from "./pages/analytics/MarketIntel";
import RiskForecast from "./pages/analytics/RiskForecast";
import OptimizeInsights from "./pages/analytics/OptimizeInsights";

// Administration
import SystemAdministration from "./pages/admin/SystemAdministration";
import UserManagement from "./pages/admin/UserManagement";
import OrganizationManagement from "./pages/admin/OrganizationManagement";
import SecurityCompliance from "./pages/admin/SecurityCompliance";
import SystemConfiguration from "./pages/admin/SystemConfiguration";
import DataManagement from "./pages/admin/DataManagement";
import HelpDesk from "./pages/admin/HelpDesk";
import Maintenance from "./pages/admin/Maintenance";
import Training from "./pages/admin/Training";
import APIDocs from "./pages/admin/APIDocs";
import Releases from "./pages/admin/Releases";

// Properties
import PropertyPortfolio from "./pages/properties/PropertyPortfolio";
import PropertyDetails from "./pages/properties/PropertyDetails";
import ServiceCategories from "./pages/properties/ServiceCategories";
import MaintenancePlanning from "./pages/properties/MaintenancePlanning";
import CostAnalysis from "./pages/properties/CostAnalysis";
import ServicePerformance from "./pages/properties/ServicePerformance";
import MaintenanceTrends from "./pages/properties/MaintenanceTrends";
import PropertyROI from "./pages/properties/PropertyROI";

// Help & Support
import HelpCenter from "./pages/help/HelpCenter";
import TrainingResources from "./pages/help/TrainingResources";
import TechnicalSupport from "./pages/help/TechnicalSupport";
import Forums from "./pages/help/Forums";
import FeatureRequests from "./pages/help/FeatureRequests";
import SuccessStories from "./pages/help/SuccessStories";
import UserGroups from "./pages/help/UserGroups";

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
          <Route path="/pm-dashboard" element={<PMDashboard />} />
          <Route path="/contractor-dashboard" element={<ContractorDashboard />} />
          <Route path="/vendor-dashboard" element={<VendorDashboard />} />
          <Route path="/finance-dashboard" element={<FinanceDashboard />} />
          <Route path="/admin-dashboard" element={<AdminDashboard />} />
          <Route path="/widgets" element={<Widgets />} />
          <Route path="/custom-reports" element={<CustomReports />} />
          <Route path="/kpis" element={<KPIs />} />
          
          {/* Tender Management */}
          <Route path="/tenders" element={<TenderOverview />} />
          <Route path="/tenders/create" element={<CreateTender />} />
          <Route path="/tenders/tender/:id" element={<TenderDetails />} />
          <Route path="/tenders/categories" element={<TenderCategories />} />
          <Route path="/tenders/templates" element={<TenderTemplates />} />
          <Route path="/tenders/ai-create" element={<AICreateTender />} />
          <Route path="/tenders/risk-analysis" element={<RiskAnalysis />} />
          <Route path="/tenders/cost-predict" element={<CostPredict />} />
          <Route path="/tenders/compliance-check" element={<ComplianceCheck />} />
          
          {/* Bid Management */}
          <Route path="/bids" element={<BidOverview />} />
          <Route path="/bids/submit/:tenderId" element={<BidSubmission />} />
          <Route path="/bids/tracking" element={<BidTracking />} />
          <Route path="/bids/library" element={<BidLibrary />} />
          <Route path="/bids/ai-bid" element={<AIBid />} />
          <Route path="/bids/competition" element={<Competition />} />
          <Route path="/bids/win-score" element={<WinScore />} />
          <Route path="/bids/optimize" element={<OptimizeBid />} />
          
          {/* Evaluation & Awards */}
          <Route path="/evaluation" element={<EvaluationDashboard />} />
          <Route path="/evaluation/panel/:tenderId" element={<EvaluationPanel />} />
          <Route path="/evaluation/awards" element={<AwardManagement />} />
          <Route path="/evaluation/workflows" element={<ApprovalWorkflows />} />
          <Route path="/evaluation/auto-score" element={<AutoScore />} />
          <Route path="/evaluation/bias-check" element={<BiasCheck />} />
          <Route path="/evaluation/risk-eval" element={<RiskEval />} />
          <Route path="/evaluation/compliance-verify" element={<ComplianceVerify />} />
          
          {/* Contract Management */}
          <Route path="/contracts" element={<ContractOverview />} />
          <Route path="/contracts/contract/:id" element={<ContractDetails />} />
          <Route path="/contracts/create" element={<CreateContract />} />
          <Route path="/contracts/performance" element={<PerformanceManagement />} />
          <Route path="/contracts/renewals" element={<RenewalManagement />} />
          <Route path="/contracts/value-analysis" element={<ValueAnalysis />} />
          <Route path="/contracts/supplier-performance" element={<SupplierPerformance />} />
          <Route path="/contracts/savings" element={<Savings />} />
          <Route path="/contracts/risk-monitor" element={<RiskMonitor />} />
          
          {/* Vendor & Contractor Hub */}
          <Route path="/vendors" element={<VendorDirectory />} />
          <Route path="/vendors/register" element={<VendorRegistration />} />
          <Route path="/vendors/profile/:vendorId" element={<VendorProfile />} />
          <Route path="/vendors/prequalification" element={<VendorPrequalification />} />
          <Route path="/vendors/analytics" element={<VendorAnalytics />} />
          <Route path="/vendor-portal" element={<VendorPortal />} />
          <Route path="/opportunities" element={<Opportunities />} />
          <Route path="/submit-bid" element={<SubmitBid />} />
          <Route path="/feedback" element={<Feedback />} />
          
          {/* Communication & Collaboration */}
          <Route path="/communication" element={<MessageCenter />} />
          <Route path="/communication/qa" element={<QAManagement />} />
          <Route path="/communication/announcements" element={<Announcements />} />
          <Route path="/communication/collaborate" element={<CollaborationSpaces />} />
          <Route path="/communication/notifications" element={<NotificationCenter />} />
          <Route path="/communication/email-sync" element={<EmailSync />} />
          <Route path="/communication/calendar" element={<Calendar />} />
          <Route path="/communication/integrations" element={<Integrations />} />
          <Route path="/communication/api-manage" element={<APIManage />} />
          
          {/* Document Management */}
          <Route path="/documents" element={<DocumentLibrary />} />
          <Route path="/documents/viewer/:docId" element={<DocumentViewer />} />
          <Route path="/documents/versions" element={<VersionControl />} />
          <Route path="/documents/sharing" element={<SecureSharing />} />
          <Route path="/documents/tender-docs" element={<TenderDocs />} />
          <Route path="/documents/contract-docs" element={<ContractDocs />} />
          <Route path="/documents/legal-docs" element={<LegalDocs />} />
          <Route path="/documents/tech-specs" element={<TechSpecs />} />
          <Route path="/documents/financial-docs" element={<FinancialDocs />} />
          <Route path="/documents/compliance-docs" element={<ComplianceDocs />} />
          <Route path="/documents/extract" element={<Extract />} />
          <Route path="/documents/analyze" element={<Analyze />} />
          <Route path="/documents/doc-compliance" element={<DocCompliance />} />
          <Route path="/documents/classify" element={<Classify />} />
          
          {/* Analytics & Reporting */}
          <Route path="/analytics" element={<AnalyticsDashboard />} />
          <Route path="/analytics/tender-analytics" element={<TenderAnalytics />} />
          <Route path="/analytics/vendor-analytics" element={<VendorPerformanceAnalytics />} />
          <Route path="/analytics/financial" element={<FinancialReports />} />
          <Route path="/analytics/compliance" element={<ComplianceReports />} />
          <Route path="/analytics/custom" element={<CustomReports />} />
          <Route path="/analytics/predictions" element={<Predictions />} />
          <Route path="/analytics/market-intel" element={<MarketIntel />} />
          <Route path="/analytics/risk-forecast" element={<RiskForecast />} />
          <Route path="/analytics/optimize-insights" element={<OptimizeInsights />} />
          
          {/* Administration */}
          <Route path="/admin" element={<SystemAdministration />} />
          <Route path="/admin/users" element={<UserManagement />} />
          <Route path="/admin/organizations" element={<OrganizationManagement />} />
          <Route path="/admin/security" element={<SecurityCompliance />} />
          <Route path="/admin/config" element={<SystemConfiguration />} />
          <Route path="/admin/data" element={<DataManagement />} />
          <Route path="/admin/helpdesk" element={<HelpDesk />} />
          <Route path="/admin/maintenance" element={<Maintenance />} />
          <Route path="/admin/training" element={<Training />} />
          <Route path="/admin/api-docs" element={<APIDocs />} />
          <Route path="/admin/releases" element={<Releases />} />
          
          {/* Properties */}
          <Route path="/properties" element={<PropertyPortfolio />} />
          <Route path="/properties/create" element={<PropertyPortfolio />} />
          <Route path="/properties/property/:id" element={<PropertyDetails />} />
          <Route path="/properties/services" element={<ServiceCategories />} />
          <Route path="/properties/maintenance" element={<MaintenancePlanning />} />
          <Route path="/properties/cost-analysis" element={<CostAnalysis />} />
          <Route path="/properties/service-performance" element={<ServicePerformance />} />
          <Route path="/properties/maintenance-trends" element={<MaintenanceTrends />} />
          <Route path="/properties/property-roi" element={<PropertyROI />} />
          
          {/* Help & Support */}
          <Route path="/help" element={<HelpCenter />} />
          <Route path="/help/training" element={<TrainingResources />} />
          <Route path="/help/support" element={<TechnicalSupport />} />
          <Route path="/help/forums" element={<Forums />} />
          <Route path="/help/feature-requests" element={<FeatureRequests />} />
          <Route path="/help/success-stories" element={<SuccessStories />} />
          <Route path="/help/user-groups" element={<UserGroups />} />
          
          {/* Catch-all route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
