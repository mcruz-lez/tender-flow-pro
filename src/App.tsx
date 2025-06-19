
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import AccountSetup from "./pages/auth/AccountSetup";

// Admin routes
import UserManagement from "./pages/admin/UserManagement";
import OrganizationManagement from "./pages/admin/OrganizationManagement";
import SystemAdministration from "./pages/admin/SystemAdministration";
import SystemConfiguration from "./pages/admin/SystemConfiguration";
import SecurityCompliance from "./pages/admin/SecurityCompliance";
import DataManagement from "./pages/admin/DataManagement";
import HelpDesk from "./pages/admin/HelpDesk";
import Maintenance from "./pages/admin/Maintenance";
import Releases from "./pages/admin/Releases";
import Training from "./pages/admin/Training";
import APIDocs from "./pages/admin/APIDocs";

// Dashboard routes
import PMDashboard from "./pages/dashboard/PMDashboard";
import ContractorDashboard from "./pages/dashboard/ContractorDashboard";
import VendorDashboard from "./pages/dashboard/VendorDashboard";
import FinanceDashboard from "./pages/dashboard/FinanceDashboard";
import AdminDashboard from "./pages/dashboard/AdminDashboard";
import KPIs from "./pages/dashboard/KPIs";
import Widgets from "./pages/dashboard/Widgets";
import CustomReports from "./pages/dashboard/CustomReports";

// Tender routes
import TenderOverview from "./pages/tenders/TenderOverview";
import CreateTender from "./pages/tenders/CreateTender";
import TenderDetails from "./pages/tenders/TenderDetails";
import TenderCategories from "./pages/tenders/TenderCategories";
import TenderTemplates from "./pages/tenders/TenderTemplates";
import AICreateTender from "./pages/tenders/AICreateTender";
import RiskAnalysis from "./pages/tenders/RiskAnalysis";
import CostPredict from "./pages/tenders/CostPredict";
import ComplianceCheck from "./pages/tenders/ComplianceCheck";

// Bid routes
import BidOverview from "./pages/bids/BidOverview";
import BidSubmission from "./pages/bids/BidSubmission";
import BidTracking from "./pages/bids/BidTracking";
import BidLibrary from "./pages/bids/BidLibrary";
import AIBid from "./pages/bids/AIBid";
import WinScore from "./pages/bids/WinScore";
import OptimizeBid from "./pages/bids/OptimizeBid";
import Competition from "./pages/bids/Competition";

// Evaluation routes
import EvaluationDashboard from "./pages/evaluation/EvaluationDashboard";
import EvaluationPanel from "./pages/evaluation/EvaluationPanel";
import AwardManagement from "./pages/evaluation/AwardManagement";
import ApprovalWorkflows from "./pages/evaluation/ApprovalWorkflows";
import AutoScore from "./pages/evaluation/AutoScore";
import BiasCheck from "./pages/evaluation/BiasCheck";
import RiskEval from "./pages/evaluation/RiskEval";
import ComplianceVerify from "./pages/evaluation/ComplianceVerify";

// Contract routes
import ContractOverview from "./pages/contracts/ContractOverview";
import CreateContract from "./pages/contracts/CreateContract";
import ContractDetails from "./pages/contracts/ContractDetails";
import PerformanceManagement from "./pages/contracts/PerformanceManagement";
import RenewalManagement from "./pages/contracts/RenewalManagement";
import ValueAnalysis from "./pages/contracts/ValueAnalysis";
import SupplierPerformance from "./pages/contracts/SupplierPerformance";
import RiskMonitor from "./pages/contracts/RiskMonitor";
import Savings from "./pages/contracts/Savings";

// Vendor routes
import VendorDirectory from "./pages/vendors/VendorDirectory";
import VendorRegistration from "./pages/vendors/VendorRegistration";
import VendorProfile from "./pages/vendors/VendorProfile";
import VendorPrequalification from "./pages/vendors/VendorPrequalification";
import VendorAnalytics from "./pages/vendors/VendorAnalytics";
import VendorPortal from "./pages/vendors/VendorPortal";
import Opportunities from "./pages/vendors/Opportunities";
import SubmitBid from "./pages/vendors/SubmitBid";
import Feedback from "./pages/vendors/Feedback";

// Communication routes
import MessageCenter from "./pages/communication/MessageCenter";
import QAManagement from "./pages/communication/QAManagement";
import Announcements from "./pages/communication/Announcements";
import CollaborationSpaces from "./pages/communication/CollaborationSpaces";
import NotificationCenter from "./pages/communication/NotificationCenter";
import Integrations from "./pages/communication/Integrations";
import EmailSync from "./pages/communication/EmailSync";
import Calendar from "./pages/communication/Calendar";
import APIManage from "./pages/communication/APIManage";

// Document routes
import DocumentLibrary from "./pages/documents/DocumentLibrary";
import DocumentViewer from "./pages/documents/DocumentViewer";
import TenderDocs from "./pages/documents/TenderDocs";
import ContractDocs from "./pages/documents/ContractDocs";
import LegalDocs from "./pages/documents/LegalDocs";
import TechSpecs from "./pages/documents/TechSpecs";
import FinancialDocs from "./pages/documents/FinancialDocs";
import ComplianceDocs from "./pages/documents/ComplianceDocs";
import SecureSharing from "./pages/documents/SecureSharing";
import VersionControl from "./pages/documents/VersionControl";
import Extract from "./pages/documents/Extract";
import Analyze from "./pages/documents/Analyze";
import Classify from "./pages/documents/Classify";
import DocCompliance from "./pages/documents/DocCompliance";

// Analytics routes
import AnalyticsDashboard from "./pages/analytics/AnalyticsDashboard";
import TenderAnalytics from "./pages/analytics/TenderAnalytics";
import VendorPerformanceAnalytics from "./pages/analytics/VendorPerformanceAnalytics";
import FinancialReports from "./pages/analytics/FinancialReports";
import ComplianceReports from "./pages/analytics/ComplianceReports";
import CustomReportsAnalytics from "./pages/analytics/CustomReports";
import Predictions from "./pages/analytics/Predictions";
import MarketIntel from "./pages/analytics/MarketIntel";
import OptimizeInsights from "./pages/analytics/OptimizeInsights";
import RiskForecast from "./pages/analytics/RiskForecast";

// Property routes
import PropertyPortfolio from "./pages/properties/PropertyPortfolio";
import PropertyDetails from "./pages/properties/PropertyDetails";
import ServiceCategories from "./pages/properties/ServiceCategories";
import MaintenancePlanning from "./pages/properties/MaintenancePlanning";
import CostAnalysis from "./pages/properties/CostAnalysis";
import PropertyROI from "./pages/properties/PropertyROI";
import ServicePerformance from "./pages/properties/ServicePerformance";
import MaintenanceTrends from "./pages/properties/MaintenanceTrends";

// Help routes
import HelpCenter from "./pages/help/HelpCenter";
import TrainingResources from "./pages/help/TrainingResources";
import TechnicalSupport from "./pages/help/TechnicalSupport";
import Forums from "./pages/help/Forums";
import FeatureRequests from "./pages/help/FeatureRequests";
import UserGroups from "./pages/help/UserGroups";
import SuccessStories from "./pages/help/SuccessStories";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <BrowserRouter>
          <Routes>
            {/* Public routes */}
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/account-setup" element={
              <ProtectedRoute>
                <AccountSetup />
              </ProtectedRoute>
            } />

            {/* Admin routes */}
            <Route path="/admin/users" element={
              <ProtectedRoute>
                <UserManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/organizations" element={
              <ProtectedRoute>
                <OrganizationManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/system" element={
              <ProtectedRoute>
                <SystemAdministration />
              </ProtectedRoute>
            } />
            <Route path="/admin/configuration" element={
              <ProtectedRoute>
                <SystemConfiguration />
              </ProtectedRoute>
            } />
            <Route path="/admin/security" element={
              <ProtectedRoute>
                <SecurityCompliance />
              </ProtectedRoute>
            } />
            <Route path="/admin/data" element={
              <ProtectedRoute>
                <DataManagement />
              </ProtectedRoute>
            } />
            <Route path="/admin/helpdesk" element={
              <ProtectedRoute>
                <HelpDesk />
              </ProtectedRoute>
            } />
            <Route path="/admin/maintenance" element={
              <ProtectedRoute>
                <Maintenance />
              </ProtectedRoute>
            } />
            <Route path="/admin/releases" element={
              <ProtectedRoute>
                <Releases />
              </ProtectedRoute>
            } />
            <Route path="/admin/training" element={
              <ProtectedRoute>
                <Training />
              </ProtectedRoute>
            } />
            <Route path="/admin/api-docs" element={
              <ProtectedRoute>
                <APIDocs />
              </ProtectedRoute>
            } />

            {/* Dashboard routes */}
            <Route path="/dashboard/pm" element={
              <ProtectedRoute>
                <PMDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/contractor" element={
              <ProtectedRoute>
                <ContractorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/vendor" element={
              <ProtectedRoute>
                <VendorDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/finance" element={
              <ProtectedRoute>
                <FinanceDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/admin" element={
              <ProtectedRoute>
                <AdminDashboard />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/kpis" element={
              <ProtectedRoute>
                <KPIs />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/widgets" element={
              <ProtectedRoute>
                <Widgets />
              </ProtectedRoute>
            } />
            <Route path="/dashboard/reports" element={
              <ProtectedRoute>
                <CustomReports />
              </ProtectedRoute>
            } />

            {/* Tender routes */}
            <Route path="/tenders" element={
              <ProtectedRoute>
                <TenderOverview />
              </ProtectedRoute>
            } />
            <Route path="/tenders/create" element={
              <ProtectedRoute>
                <CreateTender />
              </ProtectedRoute>
            } />
            <Route path="/tenders/:id" element={
              <ProtectedRoute>
                <TenderDetails />
              </ProtectedRoute>
            } />
            <Route path="/tenders/categories" element={
              <ProtectedRoute>
                <TenderCategories />
              </ProtectedRoute>
            } />
            <Route path="/tenders/templates" element={
              <ProtectedRoute>
                <TenderTemplates />
              </ProtectedRoute>
            } />
            <Route path="/tenders/ai-create" element={
              <ProtectedRoute>
                <AICreateTender />
              </ProtectedRoute>
            } />
            <Route path="/tenders/risk-analysis" element={
              <ProtectedRoute>
                <RiskAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/tenders/cost-predict" element={
              <ProtectedRoute>
                <CostPredict />
              </ProtectedRoute>
            } />
            <Route path="/tenders/compliance" element={
              <ProtectedRoute>
                <ComplianceCheck />
              </ProtectedRoute>
            } />

            {/* Bid routes */}
            <Route path="/bids" element={
              <ProtectedRoute>
                <BidOverview />
              </ProtectedRoute>
            } />
            <Route path="/bids/submit" element={
              <ProtectedRoute>
                <BidSubmission />
              </ProtectedRoute>
            } />
            <Route path="/bids/tracking" element={
              <ProtectedRoute>
                <BidTracking />
              </ProtectedRoute>
            } />
            <Route path="/bids/library" element={
              <ProtectedRoute>
                <BidLibrary />
              </ProtectedRoute>
            } />
            <Route path="/bids/ai-assistant" element={
              <ProtectedRoute>
                <AIBid />
              </ProtectedRoute>
            } />
            <Route path="/bids/win-score" element={
              <ProtectedRoute>
                <WinScore />
              </ProtectedRoute>
            } />
            <Route path="/bids/optimize" element={
              <ProtectedRoute>
                <OptimizeBid />
              </ProtectedRoute>
            } />
            <Route path="/bids/competition" element={
              <ProtectedRoute>
                <Competition />
              </ProtectedRoute>
            } />

            {/* Evaluation routes */}
            <Route path="/evaluation" element={
              <ProtectedRoute>
                <EvaluationDashboard />
              </ProtectedRoute>
            } />
            <Route path="/evaluation/panel" element={
              <ProtectedRoute>
                <EvaluationPanel />
              </ProtectedRoute>
            } />
            <Route path="/evaluation/awards" element={
              <ProtectedRoute>
                <AwardManagement />
              </ProtectedRoute>
            } />
            <Route path="/evaluation/workflows" element={
              <ProtectedRoute>
                <ApprovalWorkflows />
              </ProtectedRoute>
            } />
            <Route path="/evaluation/auto-score" element={
              <ProtectedRoute>
                <AutoScore />
              </ProtectedRoute>
            } />
            <Route path="/evaluation/bias-check" element={
              <ProtectedRoute>
                <BiasCheck />
              </ProtectedRoute>
            } />
            <Route path="/evaluation/risk" element={
              <ProtectedRoute>
                <RiskEval />
              </ProtectedRoute>
            } />
            <Route path="/evaluation/compliance" element={
              <ProtectedRoute>
                <ComplianceVerify />
              </ProtectedRoute>
            } />

            {/* Contract routes */}
            <Route path="/contracts" element={
              <ProtectedRoute>
                <ContractOverview />
              </ProtectedRoute>
            } />
            <Route path="/contracts/create" element={
              <ProtectedRoute>
                <CreateContract />
              </ProtectedRoute>
            } />
            <Route path="/contracts/:id" element={
              <ProtectedRoute>
                <ContractDetails />
              </ProtectedRoute>
            } />
            <Route path="/contracts/performance" element={
              <ProtectedRoute>
                <PerformanceManagement />
              </ProtectedRoute>
            } />
            <Route path="/contracts/renewals" element={
              <ProtectedRoute>
                <RenewalManagement />
              </ProtectedRoute>
            } />
            <Route path="/contracts/value-analysis" element={
              <ProtectedRoute>
                <ValueAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/contracts/supplier-performance" element={
              <ProtectedRoute>
                <SupplierPerformance />
              </ProtectedRoute>
            } />
            <Route path="/contracts/risk-monitor" element={
              <ProtectedRoute>
                <RiskMonitor />
              </ProtectedRoute>
            } />
            <Route path="/contracts/savings" element={
              <ProtectedRoute>
                <Savings />
              </ProtectedRoute>
            } />

            {/* Vendor routes */}
            <Route path="/vendors" element={
              <ProtectedRoute>
                <VendorDirectory />
              </ProtectedRoute>
            } />
            <Route path="/vendors/register" element={
              <ProtectedRoute>
                <VendorRegistration />
              </ProtectedRoute>
            } />
            <Route path="/vendors/:id" element={
              <ProtectedRoute>
                <VendorProfile />
              </ProtectedRoute>
            } />
            <Route path="/vendors/prequalification" element={
              <ProtectedRoute>
                <VendorPrequalification />
              </ProtectedRoute>
            } />
            <Route path="/vendors/analytics" element={
              <ProtectedRoute>
                <VendorAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/vendors/portal" element={
              <ProtectedRoute>
                <VendorPortal />
              </ProtectedRoute>
            } />
            <Route path="/vendors/opportunities" element={
              <ProtectedRoute>
                <Opportunities />
              </ProtectedRoute>
            } />
            <Route path="/vendors/submit-bid" element={
              <ProtectedRoute>
                <SubmitBid />
              </ProtectedRoute>
            } />
            <Route path="/vendors/feedback" element={
              <ProtectedRoute>
                <Feedback />
              </ProtectedRoute>
            } />

            {/* Communication routes */}
            <Route path="/communication/messages" element={
              <ProtectedRoute>
                <MessageCenter />
              </ProtectedRoute>
            } />
            <Route path="/communication/qa" element={
              <ProtectedRoute>
                <QAManagement />
              </ProtectedRoute>
            } />
            <Route path="/communication/announcements" element={
              <ProtectedRoute>
                <Announcements />
              </ProtectedRoute>
            } />
            <Route path="/communication/collaboration" element={
              <ProtectedRoute>
                <CollaborationSpaces />
              </ProtectedRoute>
            } />
            <Route path="/communication/notifications" element={
              <ProtectedRoute>
                <NotificationCenter />
              </ProtectedRoute>
            } />
            <Route path="/communication/integrations" element={
              <ProtectedRoute>
                <Integrations />
              </ProtectedRoute>
            } />
            <Route path="/communication/email" element={
              <ProtectedRoute>
                <EmailSync />
              </ProtectedRoute>
            } />
            <Route path="/communication/calendar" element={
              <ProtectedRoute>
                <Calendar />
              </ProtectedRoute>
            } />
            <Route path="/communication/api" element={
              <ProtectedRoute>
                <APIManage />
              </ProtectedRoute>
            } />

            {/* Document routes */}
            <Route path="/documents" element={
              <ProtectedRoute>
                <DocumentLibrary />
              </ProtectedRoute>
            } />
            <Route path="/documents/viewer" element={
              <ProtectedRoute>
                <DocumentViewer />
              </ProtectedRoute>
            } />
            <Route path="/documents/tender" element={
              <ProtectedRoute>
                <TenderDocs />
              </ProtectedRoute>
            } />
            <Route path="/documents/contract" element={
              <ProtectedRoute>
                <ContractDocs />
              </ProtectedRoute>
            } />
            <Route path="/documents/legal" element={
              <ProtectedRoute>
                <LegalDocs />
              </ProtectedRoute>
            } />
            <Route path="/documents/technical" element={
              <ProtectedRoute>
                <TechSpecs />
              </ProtectedRoute>
            } />
            <Route path="/documents/financial" element={
              <ProtectedRoute>
                <FinancialDocs />
              </ProtectedRoute>
            } />
            <Route path="/documents/compliance" element={
              <ProtectedRoute>
                <ComplianceDocs />
              </ProtectedRoute>
            } />
            <Route path="/documents/sharing" element={
              <ProtectedRoute>
                <SecureSharing />
              </ProtectedRoute>
            } />
            <Route path="/documents/versions" element={
              <ProtectedRoute>
                <VersionControl />
              </ProtectedRoute>
            } />
            <Route path="/documents/extract" element={
              <ProtectedRoute>
                <Extract />
              </ProtectedRoute>
            } />
            <Route path="/documents/analyze" element={
              <ProtectedRoute>
                <Analyze />
              </ProtectedRoute>
            } />
            <Route path="/documents/classify" element={
              <ProtectedRoute>
                <Classify />
              </ProtectedRoute>
            } />
            <Route path="/documents/doc-compliance" element={
              <ProtectedRoute>
                <DocCompliance />
              </ProtectedRoute>
            } />

            {/* Analytics routes */}
            <Route path="/analytics" element={
              <ProtectedRoute>
                <AnalyticsDashboard />
              </ProtectedRoute>
            } />
            <Route path="/analytics/tenders" element={
              <ProtectedRoute>
                <TenderAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/analytics/vendors" element={
              <ProtectedRoute>
                <VendorPerformanceAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/analytics/financial" element={
              <ProtectedRoute>
                <FinancialReports />
              </ProtectedRoute>
            } />
            <Route path="/analytics/compliance" element={
              <ProtectedRoute>
                <ComplianceReports />
              </ProtectedRoute>
            } />
            <Route path="/analytics/custom" element={
              <ProtectedRoute>
                <CustomReportsAnalytics />
              </ProtectedRoute>
            } />
            <Route path="/analytics/predictions" element={
              <ProtectedRoute>
                <Predictions />
              </ProtectedRoute>
            } />
            <Route path="/analytics/market" element={
              <ProtectedRoute>
                <MarketIntel />
              </ProtectedRoute>
            } />
            <Route path="/analytics/insights" element={
              <ProtectedRoute>
                <OptimizeInsights />
              </ProtectedRoute>
            } />
            <Route path="/analytics/risk" element={
              <ProtectedRoute>
                <RiskForecast />
              </ProtectedRoute>
            } />

            {/* Property routes */}
            <Route path="/properties" element={
              <ProtectedRoute>
                <PropertyPortfolio />
              </ProtectedRoute>
            } />
            <Route path="/properties/:id" element={
              <ProtectedRoute>
                <PropertyDetails />
              </ProtectedRoute>
            } />
            <Route path="/properties/services" element={
              <ProtectedRoute>
                <ServiceCategories />
              </ProtectedRoute>
            } />
            <Route path="/properties/maintenance" element={
              <ProtectedRoute>
                <MaintenancePlanning />
              </ProtectedRoute>
            } />
            <Route path="/properties/cost-analysis" element={
              <ProtectedRoute>
                <CostAnalysis />
              </ProtectedRoute>
            } />
            <Route path="/properties/roi" element={
              <ProtectedRoute>
                <PropertyROI />
              </ProtectedRoute>
            } />
            <Route path="/properties/performance" element={
              <ProtectedRoute>
                <ServicePerformance />
              </ProtectedRoute>
            } />
            <Route path="/properties/trends" element={
              <ProtectedRoute>
                <MaintenanceTrends />
              </ProtectedRoute>
            } />

            {/* Help routes */}
            <Route path="/help" element={
              <ProtectedRoute>
                <HelpCenter />
              </ProtectedRoute>
            } />
            <Route path="/help/training" element={
              <ProtectedRoute>
                <TrainingResources />
              </ProtectedRoute>
            } />
            <Route path="/help/support" element={
              <ProtectedRoute>
                <TechnicalSupport />
              </ProtectedRoute>
            } />
            <Route path="/help/forums" element={
              <ProtectedRoute>
                <Forums />
              </ProtectedRoute>
            } />
            <Route path="/help/features" element={
              <ProtectedRoute>
                <FeatureRequests />
              </ProtectedRoute>
            } />
            <Route path="/help/groups" element={
              <ProtectedRoute>
                <UserGroups />
              </ProtectedRoute>
            } />
            <Route path="/help/success" element={
              <ProtectedRoute>
                <SuccessStories />
              </ProtectedRoute>
            } />
            
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
