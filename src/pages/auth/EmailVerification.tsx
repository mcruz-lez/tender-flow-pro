import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Building2, CheckCircle, XCircle, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

const EmailVerification = () => {
  const [verificationStatus, setVerificationStatus] = useState<'loading' | 'success' | 'error' | 'pending'>('pending');
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const handleEmailVerification = async () => {
      const token = searchParams.get('token');
      const type = searchParams.get('type');

      if (token && type === 'signup') {
        setVerificationStatus('loading');
        try {
          const { error } = await supabase.auth.verifyOtp({
            token_hash: token,
            type: 'signup'
          });

          if (error) {
            console.error('Verification error:', error);
            setVerificationStatus('error');
            toast.error('Email verification failed. The link may be expired.');
          } else {
            setVerificationStatus('success');
            toast.success('Email verified successfully!');
            setTimeout(() => {
              navigate('/dashboard');
            }, 2000);
          }
        } catch (error) {
          console.error('Verification error:', error);
          setVerificationStatus('error');
        }
      }
    };

    handleEmailVerification();
  }, [searchParams, navigate]);

  const renderContent = () => {
    switch (verificationStatus) {
      case 'loading':
        return (
          <>
            <CardHeader className="space-y-2 text-center">
              <CardTitle className="text-2xl font-bold text-foreground">
                Verifying Email...
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Please wait while we verify your email address.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto"></div>
            </CardContent>
          </>
        );

      case 'success':
        return (
          <>
            <CardHeader className="space-y-2 text-center">
              <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-foreground">
                Email Verified!
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Your email has been successfully verified. You will be redirected to your dashboard shortly.
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                onClick={() => navigate('/dashboard')}
                className="gradient-primary text-white hover-lift"
              >
                Go to Dashboard
              </Button>
            </CardContent>
          </>
        );

      case 'error':
        return (
          <>
            <CardHeader className="space-y-2 text-center">
              <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-foreground">
                Verification Failed
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                The verification link is invalid or has expired. Please try signing up again or contact support.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <Button
                onClick={() => navigate('/register')}
                className="gradient-primary text-white hover-lift w-full"
              >
                Sign Up Again
              </Button>
              <Link
                to="/login"
                className="inline-block text-primary hover:text-primary-glow font-medium"
              >
                Try Signing In
              </Link>
            </CardContent>
          </>
        );

      default:
        return (
          <>
            <CardHeader className="space-y-2 text-center">
              <Mail className="w-16 h-16 text-primary mx-auto mb-4" />
              <CardTitle className="text-2xl font-bold text-foreground">
                Check Your Email
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                We've sent you a verification email. Click the link in the email to verify your account.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4 text-center">
              <p className="text-sm text-muted-foreground">
                Didn't receive the email? Check your spam folder or wait a few minutes.
              </p>
              <div className="space-y-2">
                <Button
                  onClick={() => navigate('/register')}
                  variant="outline"
                  className="w-full glass-button"
                >
                  Try Different Email
                </Button>
                <Link
                  to="/login"
                  className="inline-block text-primary hover:text-primary-glow font-medium"
                >
                  Already verified? Sign In
                </Link>
              </div>
            </CardContent>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen glass-ultra flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-flex items-center space-x-3 group">
            <div className="w-12 h-12 gradient-primary rounded-xl flex items-center justify-center group-hover:scale-105 transition-transform shadow-luxury">
              <Building2 className="w-7 h-7 text-white" />
            </div>
            <div className="text-left">
              <h1 className="text-2xl font-bold text-gradient-luxury">TendProcure</h1>
              <p className="text-sm text-primary font-medium">
                Property Tender Management
              </p>
            </div>
          </Link>
        </div>

        <Card className="glass-premium border-0 shadow-luxury">
          {renderContent()}
        </Card>
      </div>
    </div>
  );
};

export default EmailVerification;