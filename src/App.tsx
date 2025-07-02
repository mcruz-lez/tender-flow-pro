import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";

// Public Pages
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import NotFound from "@/pages/NotFound";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfService from "@/pages/TermsOfService";

// Dashboard Pages
import Dashboard from "@/pages/Dashboard";
import PMDashboard from "@/pages/PMDashboard";
import ContractorDashboard from "@/pages/ContractorDashboard";
import VendorDashboard from "@/pages/VendorDashboard";
import FinanceDashboard from "@/pages/FinanceDashboard";
import AdminDashboard from "@/pages/AdminDashboard";

// Tender Management
import TenderOverview from "@/pages/tenders/TenderOverview";
import CreateTender from "@/pages/tenders/CreateTender";
import TenderCategories from "@/pages/tenders/TenderCategories";
import TenderTemplates from "@/pages/tenders/TenderTemplates";
import AICreateTender from "@/pages/tenders/AICreateTender";
import TenderDetails from "@/pages/tenders/TenderDetails";
import RiskAnalysis from "@/pages/tenders/RiskAnalysis";
import CostPredict from "@/pages/tenders/CostPredict";
import ComplianceCheck from "@/pages/tenders/ComplianceCheck";

// Bid Management
import BidOverview from "@/pages/bids/BidOverview";
import BidSubmission from "@/pages/bids/BidSubmission";
import BidTracking from "@/pages/bids/BidTracking";
import BidLibrary from "@/pages/bids/BidLibrary";
import AIBid from "@/pages/bids/AIBid";
import WinScore from "@/pages/bids/WinScore";
import OptimizeBid from "@/pages/bids/OptimizeBid";
import Competition from "@/pages/bids/Competition";

// Evaluation & Awards
import EvaluationDashboard from "@/pages/evaluation/EvaluationDashboard";
import EvaluationPanel from "@/pages/evaluation/EvaluationPanel";
import AwardManagement from "@/pages/evaluation/AwardManagement";
import Awards from "@/pages/evaluation/Awards";
import Workflows from "@/pages/evaluation/Workflows";
import AutoScore from "@/pages/evaluation/AutoScore";
import BiasCheck from "@/pages/evaluation/BiasCheck";
import RiskEval from "@/pages/evaluation/RiskEval";
import ComplianceVerify from "@/pages/evaluation/ComplianceVerify";
import ApprovalWorkflows from "@/pages/evaluation/ApprovalWorkflows";

// Contract Management
import ContractOverview from "@/pages/contracts/ContractOverview";
import CreateContract from "@/pages/contracts/CreateContract";
import ContractDetails from "@/pages/contracts/ContractDetails";
import PerformanceManagement from "@/pages/contracts/PerformanceManagement";
import RenewalManagement from "@/pages/contracts/RenewalManagement";
import ValueAnalysis from "@/pages/contracts/ValueAnalysis";
import RiskMonitor from "@/pages/contracts/RiskMonitor";
import SupplierPerformance from "@/pages/contracts/SupplierPerformance";
import Savings from "@/pages/contracts/Savings";

// Vendor Management
import VendorDirectory from "@/pages/vendors/VendorDirectory";
import VendorRegistration from "@/pages/vendors/VendorRegistration";
import VendorPrequalification from "@/pages/vendors/VendorPrequalification";
import VendorProfile from "@/pages/vendors/VendorProfile";
import VendorPortal from "@/pages/vendors/VendorPortal";
import VendorAnalytics from "@/pages/vendors/VendorAnalytics";
import Opportunities from "@/pages/vendors/Opportunities";
import SubmitBid from "@/pages/vendors/SubmitBid";
import Feedback from "@/pages/vendors/Feedback";

// Communication
import MessagingPage from "@/pages/communication/MessagingPage";
import QAManagement from "@/pages/communication/QAManagement";
import Announcements from "@/pages/communication/Announcements";
import Collaborate from "@/pages/communication/Collaborate";
import NotificationCenter from "@/pages/communication/NotificationCenter";
import MessageCenter from "@/pages/communication/MessageCenter";
import CollaborationSpaces from "@/pages/communication/CollaborationSpaces";
import Calendar from "@/pages/communication/Calendar";
import Integrations from "@/pages/communication/Integrations";
import EmailSync from "@/pages/communication/EmailSync";
import APIManage from "@/pages/communication/APIManage";

// Document Management
import DocumentManagementPage from "@/pages/documents/DocumentManagementPage";
import DocumentLibrary from "@/pages/documents/DocumentLibrary";
import DocumentViewer from "@/pages/documents/DocumentViewer";
import VersionControl from "@/pages/documents/VersionControl";
import SecureSharing from "@/pages/documents/SecureSharing";
import Sharing from "@/pages/documents/Sharing";
import Extract from "@/pages/documents/Extract";
import Classify from "@/pages/documents/Classify";
import Analyze from "@/pages/documents/Analyze";
import Versions from "@/pages/documents/Versions";
import TenderDocs from "@/pages/documents/TenderDocs";
import ContractDocs from "@/pages/documents/ContractDocs";
import LegalDocs from "@/pages/documents/LegalDocs";
import FinancialDocs from "@/pages/documents/FinancialDocs";
import TechSpecs from "@/pages/documents/TechSpecs";
import ComplianceDocs from "@/pages/documents/ComplianceDocs";
import DocCompliance from "@/pages/documents/DocCompliance";

// Analytics & Reports
import AnalyticsDashboard from "@/pages/analytics/AnalyticsDashboard";
import TenderAnalytics from "@/pages/analytics/TenderAnalytics";
import VendorPerformanceAnalytics from "@/pages/analytics/VendorPerformanceAnalytics";
import FinancialReports from "@/pages/analytics/FinancialReports";
import CustomReports from "@/pages/analytics/CustomReports";
import ComplianceReports from "@/pages/analytics/ComplianceReports";
import MarketIntel from "@/pages/analytics/MarketIntel";
import Predictions from "@/pages/analytics/Predictions";
import BidAnalytics from "@/pages/analytics/BidAnalytics";
import RiskForecast from "@/pages/analytics/RiskForecast";
import OptimizeInsights from "@/pages/analytics/OptimizeInsights";

// Property Management
import PropertyPortfolio from "@/pages/properties/PropertyPortfolio";
import PropertyDetails from "@/pages/properties/PropertyDetails";
import ServiceCategories from "@/pages/properties/ServiceCategories";
import MaintenancePlanning from "@/pages/properties/MaintenancePlanning";
import ServicePerformance from "@/pages/properties/ServicePerformance";
import CostAnalysis from "@/pages/properties/CostAnalysis";
import PropertyROI from "@/pages/properties/PropertyROI";
import MaintenanceTrends from "@/pages/properties/MaintenanceTrends";

// Settings & Configuration
import SettingsPage from "@/pages/settings/SettingsPage";

// Admin Pages
import SystemAdministration from "@/pages/admin/SystemAdministration";
import UserManagement from "@/pages/admin/UserManagement";
import OrganizationManagement from "@/pages/admin/OrganizationManagement";
import SecurityCompliance from "@/pages/admin/SecurityCompliance";
import Config from "@/pages/admin/Config";
import SystemConfiguration from "@/pages/admin/SystemConfiguration";
import AuditLogs from "@/pages/admin/AuditLogs";
import DataManagement from "@/pages/admin/DataManagement";
import Maintenance from "@/pages/admin/Maintenance";
import Releases from "@/pages/admin/Releases";
import APIDocs from "@/pages/admin/APIDocs";
import Training from "@/pages/admin/Training";
import HelpDesk from "@/pages/admin/HelpDesk";

// Help & Support
import HelpCenter from "@/pages/help/HelpCenter";
import Support from "@/pages/help/Support";
import TechnicalSupport from "@/pages/help/TechnicalSupport";
import TrainingResources from "@/pages/help/TrainingResources";
import Forums from "@/pages/help/Forums";
import FeatureRequests from "@/pages/help/FeatureRequests";
import Documentation from "@/pages/help/Documentation";
import UserGroups from "@/pages/help/UserGroups";
import SuccessStories from "@/pages/help/SuccessStories";
import Ticket from "@/pages/help/Ticket";

// Auth Pages
import AccountSetup from "@/pages/auth/AccountSetup";
import EmailVerification from "@/pages/auth/EmailVerification";
import OrganizationOnboarding from "@/pages/auth/OrganizationOnboarding";
import PasswordReset from "@/pages/auth/PasswordReset";

// Audit Pages
import AuditLogsPage from "@/pages/audit/AuditLogsPage";

// Additional Pages
import ComingSoon from "@/pages/ComingSoon";

// Components
import FloatingAIAssistant from "./components/AIChatbot/FloatingAIAssistant";

export function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/terms-of-service" element={<TermsOfService />} />

      {/* Auth Routes */}
      <Route path="/auth/setup" element={<AccountSetup />} />
      <Route path="/auth/verify" element={<EmailVerification />} />
      <Route path="/auth/onboarding" element={<OrganizationOnboarding />} />
      <Route path="/auth/reset" element={<PasswordReset />} />

      {/* Protected Dashboard Routes */}
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/pm"
        element={
          <ProtectedRoute>
            <PMDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/contractor"
        element={
          <ProtectedRoute>
            <ContractorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/vendor"
        element={
          <ProtectedRoute>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/finance"
        element={
          <ProtectedRoute>
            <FinanceDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard/admin"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Alternative Dashboard Route Paths */}
      <Route
        path="/pm-dashboard"
        element={
          <ProtectedRoute>
            <PMDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contractor-dashboard"
        element={
          <ProtectedRoute>
            <ContractorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor-dashboard"
        element={
          <ProtectedRoute>
            <VendorDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/finance-dashboard"
        element={
          <ProtectedRoute>
            <FinanceDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin-dashboard"
        element={
          <ProtectedRoute>
            <AdminDashboard />
          </ProtectedRoute>
        }
      />

      {/* Password Reset Route */}
      <Route path="/password-reset" element={<PasswordReset />} />

      {/* Tender Management Routes */}
      <Route
        path="/tenders"
        element={
          <ProtectedRoute>
            <TenderOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenders/create"
        element={
          <ProtectedRoute>
            <CreateTender />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenders/categories"
        element={
          <ProtectedRoute>
            <TenderCategories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenders/templates"
        element={
          <ProtectedRoute>
            <TenderTemplates />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenders/ai-create"
        element={
          <ProtectedRoute>
            <AICreateTender />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenders/:id"
        element={
          <ProtectedRoute>
            <TenderDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenders/risk-analysis"
        element={
          <ProtectedRoute>
            <RiskAnalysis />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenders/cost-predict"
        element={
          <ProtectedRoute>
            <CostPredict />
          </ProtectedRoute>
        }
      />
      <Route
        path="/tenders/compliance-check"
        element={
          <ProtectedRoute>
            <ComplianceCheck />
          </ProtectedRoute>
        }
      />

      {/* Bid Management Routes */}
      <Route
        path="/bids"
        element={
          <ProtectedRoute>
            <BidOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bids/submit"
        element={
          <ProtectedRoute>
            <BidSubmission />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bids/tracking"
        element={
          <ProtectedRoute>
            <BidTracking />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bids/library"
        element={
          <ProtectedRoute>
            <BidLibrary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bids/ai-bid"
        element={
          <ProtectedRoute>
            <AIBid />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bids/win-score"
        element={
          <ProtectedRoute>
            <WinScore />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bids/optimize"
        element={
          <ProtectedRoute>
            <OptimizeBid />
          </ProtectedRoute>
        }
      />
      <Route
        path="/bids/competition"
        element={
          <ProtectedRoute>
            <Competition />
          </ProtectedRoute>
        }
      />

      {/* Evaluation & Awards Routes */}
      <Route
        path="/evaluation"
        element={
          <ProtectedRoute>
            <EvaluationDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/panel"
        element={
          <ProtectedRoute>
            <EvaluationPanel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/awards"
        element={
          <ProtectedRoute>
            <Awards />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/award-management"
        element={
          <ProtectedRoute>
            <AwardManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/workflows"
        element={
          <ProtectedRoute>
            <Workflows />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/auto-score"
        element={
          <ProtectedRoute>
            <AutoScore />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/bias-check"
        element={
          <ProtectedRoute>
            <BiasCheck />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/risk-eval"
        element={
          <ProtectedRoute>
            <RiskEval />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/compliance-verify"
        element={
          <ProtectedRoute>
            <ComplianceVerify />
          </ProtectedRoute>
        }
      />
      <Route
        path="/evaluation/approval-workflows"
        element={
          <ProtectedRoute>
            <ApprovalWorkflows />
          </ProtectedRoute>
        }
      />

      {/* Contract Management Routes */}
      <Route
        path="/contracts"
        element={
          <ProtectedRoute>
            <ContractOverview />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/create"
        element={
          <ProtectedRoute>
            <CreateContract />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/:id"
        element={
          <ProtectedRoute>
            <ContractDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/performance"
        element={
          <ProtectedRoute>
            <PerformanceManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/renewals"
        element={
          <ProtectedRoute>
            <RenewalManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/value-analysis"
        element={
          <ProtectedRoute>
            <ValueAnalysis />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/risk-monitor"
        element={
          <ProtectedRoute>
            <RiskMonitor />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/supplier-performance"
        element={
          <ProtectedRoute>
            <SupplierPerformance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/contracts/savings"
        element={
          <ProtectedRoute>
            <Savings />
          </ProtectedRoute>
        }
      />

      {/* Vendor Management Routes */}
      <Route
        path="/vendors"
        element={
          <ProtectedRoute>
            <VendorDirectory />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors/register"
        element={
          <ProtectedRoute>
            <VendorRegistration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors/prequalification"
        element={
          <ProtectedRoute>
            <VendorPrequalification />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors/:id"
        element={
          <ProtectedRoute>
            <VendorProfile />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendor-portal"
        element={
          <ProtectedRoute>
            <VendorPortal />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors/analytics"
        element={
          <ProtectedRoute>
            <VendorAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors/opportunities"
        element={
          <ProtectedRoute>
            <Opportunities />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors/submit-bid"
        element={
          <ProtectedRoute>
            <SubmitBid />
          </ProtectedRoute>
        }
      />
      <Route
        path="/vendors/feedback"
        element={
          <ProtectedRoute>
            <Feedback />
          </ProtectedRoute>
        }
      />

      {/* Communication Routes */}
      <Route
        path="/communication/messaging"
        element={
          <ProtectedRoute>
            <MessagingPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/qa"
        element={
          <ProtectedRoute>
            <QAManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/announcements"
        element={
          <ProtectedRoute>
            <Announcements />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/collaborate"
        element={
          <ProtectedRoute>
            <Collaborate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/notifications"
        element={
          <ProtectedRoute>
            <NotificationCenter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/message-center"
        element={
          <ProtectedRoute>
            <MessageCenter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/collaboration-spaces"
        element={
          <ProtectedRoute>
            <CollaborationSpaces />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/calendar"
        element={
          <ProtectedRoute>
            <Calendar />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/integrations"
        element={
          <ProtectedRoute>
            <Integrations />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/email-sync"
        element={
          <ProtectedRoute>
            <EmailSync />
          </ProtectedRoute>
        }
      />
      <Route
        path="/communication/api-manage"
        element={
          <ProtectedRoute>
            <APIManage />
          </ProtectedRoute>
        }
      />

      {/* Document Management Routes */}
      <Route
        path="/documents"
        element={
          <ProtectedRoute>
            <DocumentLibrary />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/document-management"
        element={
          <ProtectedRoute>
            <DocumentManagementPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/viewer"
        element={
          <ProtectedRoute>
            <DocumentViewer />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/versions"
        element={
          <ProtectedRoute>
            <VersionControl />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/sharing"
        element={
          <ProtectedRoute>
            <SecureSharing />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/extract"
        element={
          <ProtectedRoute>
            <Extract />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/classify"
        element={
          <ProtectedRoute>
            <Classify />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/analyze"
        element={
          <ProtectedRoute>
            <Analyze />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/tender-docs"
        element={
          <ProtectedRoute>
            <TenderDocs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/contract-docs"
        element={
          <ProtectedRoute>
            <ContractDocs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/legal-docs"
        element={
          <ProtectedRoute>
            <LegalDocs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/financial-docs"
        element={
          <ProtectedRoute>
            <FinancialDocs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/tech-specs"
        element={
          <ProtectedRoute>
            <TechSpecs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/documents/compliance-docs"
        element={
          <ProtectedRoute>
            <ComplianceDocs />
          </ProtectedRoute>
        }
      />

      {/* Analytics & Reports Routes */}
      <Route
        path="/analytics"
        element={
          <ProtectedRoute>
            <AnalyticsDashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/tender-analytics"
        element={
          <ProtectedRoute>
            <TenderAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/vendor-analytics"
        element={
          <ProtectedRoute>
            <VendorPerformanceAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/financial"
        element={
          <ProtectedRoute>
            <FinancialReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/custom"
        element={
          <ProtectedRoute>
            <CustomReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/compliance"
        element={
          <ProtectedRoute>
            <ComplianceReports />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/market-intel"
        element={
          <ProtectedRoute>
            <MarketIntel />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/predictions"
        element={
          <ProtectedRoute>
            <Predictions />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/bid-analytics"
        element={
          <ProtectedRoute>
            <BidAnalytics />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/risk-forecast"
        element={
          <ProtectedRoute>
            <RiskForecast />
          </ProtectedRoute>
        }
      />
      <Route
        path="/analytics/optimize-insights"
        element={
          <ProtectedRoute>
            <OptimizeInsights />
          </ProtectedRoute>
        }
      />

      {/* Property Management Routes */}
      <Route
        path="/properties"
        element={
          <ProtectedRoute>
            <PropertyPortfolio />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/:id"
        element={
          <ProtectedRoute>
            <PropertyDetails />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/services"
        element={
          <ProtectedRoute>
            <ServiceCategories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/maintenance"
        element={
          <ProtectedRoute>
            <MaintenancePlanning />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/service-performance"
        element={
          <ProtectedRoute>
            <ServicePerformance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/cost-analysis"
        element={
          <ProtectedRoute>
            <CostAnalysis />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/roi"
        element={
          <ProtectedRoute>
            <PropertyROI />
          </ProtectedRoute>
        }
      />
      <Route
        path="/properties/maintenance-trends"
        element={
          <ProtectedRoute>
            <MaintenanceTrends />
          </ProtectedRoute>
        }
      />

      {/* Settings Routes */}
      <Route
        path="/settings"
        element={
          <ProtectedRoute>
            <SettingsPage />
          </ProtectedRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute>
            <SystemAdministration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/users"
        element={
          <ProtectedRoute>
            <UserManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/organizations"
        element={
          <ProtectedRoute>
            <OrganizationManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/security"
        element={
          <ProtectedRoute>
            <SecurityCompliance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/config"
        element={
          <ProtectedRoute>
            <Config />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/system-config"
        element={
          <ProtectedRoute>
            <SystemConfiguration />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/audit-logs"
        element={
          <ProtectedRoute>
            <AuditLogs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/data-management"
        element={
          <ProtectedRoute>
            <DataManagement />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/maintenance"
        element={
          <ProtectedRoute>
            <Maintenance />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/releases"
        element={
          <ProtectedRoute>
            <Releases />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/api-docs"
        element={
          <ProtectedRoute>
            <APIDocs />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/training"
        element={
          <ProtectedRoute>
            <Training />
          </ProtectedRoute>
        }
      />
      <Route
        path="/admin/helpdesk"
        element={
          <ProtectedRoute>
            <HelpDesk />
          </ProtectedRoute>
        }
      />

      {/* Help & Support Routes */}
      <Route
        path="/help"
        element={
          <ProtectedRoute>
            <HelpCenter />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/support"
        element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/technical-support"
        element={
          <ProtectedRoute>
            <TechnicalSupport />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/training"
        element={
          <ProtectedRoute>
            <TrainingResources />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/forums"
        element={
          <ProtectedRoute>
            <Forums />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/feature-requests"
        element={
          <ProtectedRoute>
            <FeatureRequests />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/documentation"
        element={
          <ProtectedRoute>
            <Documentation />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/user-groups"
        element={
          <ProtectedRoute>
            <UserGroups />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/success-stories"
        element={
          <ProtectedRoute>
            <SuccessStories />
          </ProtectedRoute>
        }
      />
      <Route
        path="/help/ticket"
        element={
          <ProtectedRoute>
            <Ticket />
          </ProtectedRoute>
        }
      />

      {/* Audit Routes */}
      <Route
        path="/audit/logs"
        element={
          <ProtectedRoute>
            <AuditLogsPage />
          </ProtectedRoute>
        }
      />

      {/* Missing Dashboard Routes - Fix 404 errors */}
      <Route path="/contractor-dashboard" element={<ProtectedRoute><ContractorDashboard /></ProtectedRoute>} />
      <Route path="/finance-dashboard" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
      <Route path="/pm-dashboard" element={<ProtectedRoute><PMDashboard /></ProtectedRoute>} />
      <Route path="/vendor-dashboard" element={<ProtectedRoute><VendorDashboard /></ProtectedRoute>} />
      <Route path="/admin-dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
      
      {/* Additional helpful routes */}
      <Route path="/tenders/ai" element={<ProtectedRoute><AICreateTender /></ProtectedRoute>} />
      <Route path="/dashboard/custom-reports" element={<ProtectedRoute><CustomReports /></ProtectedRoute>} />
      <Route path="/dashboard/kpis" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      <Route path="/dashboard/widgets" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      {/* Missing Admin Routes - Fix broken links */}
      <Route path="/admin/user-management" element={<ProtectedRoute><UserManagement /></ProtectedRoute>} />
      <Route path="/admin/system-configuration" element={<ProtectedRoute><SystemConfiguration /></ProtectedRoute>} />
      <Route path="/admin/audit-logs" element={<ProtectedRoute><AuditLogs /></ProtectedRoute>} />
      
      {/* Missing Finance Routes */}
      <Route path="/finance/budgets" element={<ProtectedRoute><FinanceDashboard /></ProtectedRoute>} />
      
      {/* Coming Soon route */}
      <Route path="/coming-soon" element={<ProtectedRoute><ComingSoon /></ProtectedRoute>} />
      
      {/* 404 Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
        <FloatingAIAssistant />
      </div>
    </AuthProvider>
  );
}

export default App;