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
import UserManagement from "./pages/admin/UserManagement";
import OrganizationManagement from "./pages/admin/OrganizationManagement";
import Communication from "./pages/communication/Communication";
import AccountSetup from "./pages/auth/AccountSetup";

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

            {/* Admin routes - example, needs proper role-based protection */}
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

            {/* Communication routes */}
            <Route path="/communication" element={
              <ProtectedRoute>
                <Communication />
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
