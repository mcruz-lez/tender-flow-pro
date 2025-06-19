
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, Mail, CheckCircle2, RefreshCw } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const EmailVerification = () => {
  const [isVerified, setIsVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleResendEmail = async () => {
    setIsLoading(true);
    
    // Simulate resend process
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success("Verification email sent!");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gray-900">TendProcure</h1>
              <p className="text-sm text-blue-600 font-medium">Property Tender Management</p>
            </div>
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              {isVerified ? (
                <CheckCircle2 className="w-8 h-8 text-green-600" />
              ) : (
                <Mail className="w-8 h-8 text-blue-600" />
              )}
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">
              {isVerified ? "Email Verified!" : "Verify Your Email"}
            </CardTitle>
            <CardDescription className="text-gray-600">
              {isVerified ? (
                "Your email has been successfully verified. You can now access your account."
              ) : (
                "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {isVerified ? (
              <Button 
                asChild
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
              >
                <Link to="/dashboard">Continue to Dashboard</Link>
              </Button>
            ) : (
              <div className="space-y-4">
                <Button 
                  onClick={handleResendEmail}
                  variant="outline"
                  className="w-full h-12 border-gray-200 hover:bg-gray-50"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                  ) : (
                    <Mail className="w-4 h-4 mr-2" />
                  )}
                  {isLoading ? "Sending..." : "Resend Verification Email"}
                </Button>
                
                <div className="text-center">
                  <Link 
                    to="/login" 
                    className="text-blue-600 hover:text-blue-700 font-medium"
                  >
                    Back to Sign In
                  </Link>
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;
