import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, Mail, CheckCircle, AlertCircle } from "lucide-react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/useAuth";

const EmailVerification = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [verificationStatus, setVerificationStatus] = useState<"pending" | "success" | "error">("pending");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    // Check if user is already verified
    if (user?.email_confirmed_at) {
      setVerificationStatus("success");
      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    }

    // Handle email confirmation from URL params
    const token_hash = searchParams.get("token_hash");
    const type = searchParams.get("type");

    if (token_hash && type === "signup") {
      handleVerification(token_hash);
    }
  }, [user, searchParams, navigate]);

  const handleVerification = async (tokenHash: string) => {
    setIsLoading(true);
    try {
      const { error } = await supabase.auth.verifyOtp({
        token_hash: tokenHash,
        type: "signup",
      });

      if (error) {
        console.error("Verification error:", error);
        setVerificationStatus("error");
        toast.error("Email verification failed. Please try again.");
      } else {
        setVerificationStatus("success");
        toast.success("Email verified successfully!");
        setTimeout(() => {
          navigate("/auth/setup");
        }, 2000);
      }
    } catch (error) {
      console.error("Verification error:", error);
      setVerificationStatus("error");
      toast.error("Email verification failed. Please try again.");
    }
    setIsLoading(false);
  };

  const resendVerification = async () => {
    if (!user?.email) {
      toast.error("No email address found. Please sign up again.");
      navigate("/register");
      return;
    }

    setIsLoading(true);
    try {
      const { error } = await supabase.auth.resend({
        type: "signup",
        email: user.email,
      });

      if (error) {
        toast.error("Failed to resend verification email");
      } else {
        toast.success("Verification email sent! Please check your inbox.");
      }
    } catch (error) {
      toast.error("Failed to resend verification email");
    }
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
              <p className="text-sm text-blue-600 font-medium">
                Property Tender Management
              </p>
            </div>
          </Link>
        </div>

        <Card className="border-0 shadow-xl bg-white/60 backdrop-blur-sm">
          <CardHeader className="space-y-2 text-center">
            <div className="mx-auto mb-4">
              {verificationStatus === "success" ? (
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
                  <CheckCircle className="w-8 h-8 text-green-600" />
                </div>
              ) : verificationStatus === "error" ? (
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center">
                  <AlertCircle className="w-8 h-8 text-red-600" />
                </div>
              ) : (
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center">
                  <Mail className="w-8 h-8 text-blue-600" />
                </div>
              )}
            </div>
            
            <CardTitle className="text-2xl font-bold text-gray-900">
              {verificationStatus === "success" 
                ? "Email Verified!"
                : verificationStatus === "error"
                ? "Verification Failed"
                : "Verify Your Email"
              }
            </CardTitle>
            
            <CardDescription className="text-gray-600">
              {verificationStatus === "success" 
                ? "Your email has been successfully verified. Redirecting to setup..."
                : verificationStatus === "error"
                ? "We couldn't verify your email. Please try again or contact support."
                : "We've sent a verification link to your email address. Please check your inbox and click the link to verify your account."
              }
            </CardDescription>
          </CardHeader>
          
          <CardContent className="space-y-6">
            {verificationStatus === "pending" && (
              <>
                <div className="text-center space-y-4">
                  <p className="text-sm text-gray-600">
                    Didn't receive the email? Check your spam folder or:
                  </p>
                  
                  <Button
                    onClick={resendVerification}
                    variant="outline"
                    className="w-full h-12"
                    disabled={isLoading}
                  >
                    {isLoading ? "Sending..." : "Resend Verification Email"}
                  </Button>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <div className="text-center space-y-2">
                    <p className="text-sm text-gray-600">
                      Need to use a different email?
                    </p>
                    <Link
                      to="/register"
                      className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                    >
                      Sign up with different email
                    </Link>
                  </div>
                </div>
              </>
            )}

            {verificationStatus === "success" && (
              <div className="text-center">
                <Button
                  onClick={() => navigate("/auth/setup")}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Continue to Setup
                </Button>
              </div>
            )}

            {verificationStatus === "error" && (
              <div className="space-y-4">
                <Button
                  onClick={resendVerification}
                  className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Resend Verification Email"}
                </Button>
                
                <div className="text-center">
                  <Link
                    to="/register"
                    className="text-blue-600 hover:text-blue-700 font-medium text-sm"
                  >
                    Try signing up again
                  </Link>
                </div>
              </div>
            )}

            <div className="text-center">
              <p className="text-sm text-gray-500">
                Need help?{" "}
                <a
                  href="/help/support"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  Contact Support
                </a>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;
