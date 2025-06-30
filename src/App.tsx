import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "@/pages/Index";
import Login from "@/pages/Login";
import Register from "@/pages/Register";
import Dashboard from "@/pages/Dashboard";
import NotFound from "@/pages/NotFound";
import AIChatbotRoot from "./components/AIChatbot/AIChatbotRoot";
import { TenderWizard } from './components/Guides/TenderWizard';
import { ContractLifecycleGuide } from './components/Guides/ContractLifecycleGuide';
import FAQSection from './components/FAQ/FAQSection';
import BlogTemplate from './components/Blog/BlogTemplate';
import InfographicGallery from './components/Infographics/InfographicGallery';
import VideoGallery from './components/Video/VideoGallery';

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route
        path="/dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      {/* Add more feature routes here as needed */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <AppRoutes />
        <AIChatbotRoot />
        <TenderWizard />
        <ContractLifecycleGuide />
        <FAQSection />
        <BlogTemplate />
        <InfographicGallery />
        <VideoGallery />
      </div>
    </AuthProvider>
  );
}

export default App;
