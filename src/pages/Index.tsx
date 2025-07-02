import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Building2,
  FileText,
  Users,
  BarChart3,
  Shield,
  Zap,
  CheckCircle,
  ArrowRight,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/useAuth";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const Index = () => {
  const { user } = useAuth();

  const features = [
    {
      icon: FileText,
      title: "Smart Tender Management",
      description:
        "Create, publish, and manage tenders with AI-powered risk analysis and cost prediction.",
    },
    {
      icon: Users,
      title: "Vendor & Contractor Hub",
      description:
        "Comprehensive vendor directory with performance tracking and automated prequalification.",
    },
    {
      icon: BarChart3,
      title: "Advanced Analytics",
      description:
        "Real-time insights, compliance reports, and predictive analytics for better decision making.",
    },
    {
      icon: Shield,
      title: "Secure & Compliant",
      description:
        "Enterprise-grade security with full audit trails and compliance management.",
    },
  ];

  const benefits = [
    "Reduce procurement cycle time by 40%",
    "Improve vendor selection accuracy",
    "Ensure 100% compliance tracking",
    "Streamline collaboration workflows",
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 dark:from-background dark:via-secondary dark:to-background transition-colors duration-500">
      {/* Header */}
      <header className="border-b bg-white/60 dark:bg-card/80 backdrop-blur-lg sticky top-0 z-50 transition-all duration-300 dark:border-border/50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-lg flex items-center justify-center shadow-premium animate-pulse-glow">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground dark:text-gradient-luxury">TendProcure</h1>
              <p className="text-sm text-primary dark:text-accent font-medium">
                Property Tender Management
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <ThemeToggle />
            {user ? (
              <Link to="/dashboard">
                <Button className="bg-primary hover:bg-primary-glow text-primary-foreground interactive-glow hover-lift transition-all duration-300">
                  Go to Dashboard
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="outline" className="dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10">Sign In</Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-primary hover:bg-primary-glow text-primary-foreground interactive-glow hover-lift">
                    Get Started
                  </Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Badge className="mb-6 bg-primary/10 text-primary dark:bg-accent/20 dark:text-accent hover:bg-primary/20 dark:hover:bg-accent/30 border border-primary/20 dark:border-accent/30 backdrop-blur-sm">
          <Zap className="w-4 h-4 mr-2" />
          AI-Powered Procurement Platform
        </Badge>

        <h1 className="text-5xl font-bold text-foreground mb-6 leading-tight animate-fade-in-up">
          Streamline Your Property
          <span className="text-gradient-luxury dark:bg-gradient-to-r dark:from-primary dark:via-accent dark:to-primary-glow dark:bg-clip-text dark:text-transparent animate-gradient-shift"> Procurement Process</span>
        </h1>

        <p className="text-xl text-foreground/90 mb-8 max-w-3xl mx-auto leading-relaxed font-medium">
          TendProcure is the complete tender management platform for property
          managers, contractors, and vendors. Manage the entire procurement
          lifecycle with AI-powered insights and seamless collaboration.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          {!user && (
            <>
              <Link to="/register">
                <Button
                  size="lg"
                  className="bg-primary hover:bg-primary-glow text-primary-foreground text-lg px-8 py-3 interactive-glow hover-lift shadow-premium"
                >
                  Start Free Trial
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
              <Link to="/login">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-3 dark:border-accent/50 dark:text-accent dark:hover:bg-accent/10 hover-lift"
                >
                  Sign In
                </Button>
              </Link>
            </>
          )}
          {user && (
            <Link to="/dashboard">
              <Button
                size="lg"
                className="bg-primary hover:bg-primary-glow text-primary-foreground text-lg px-8 py-3 interactive-glow hover-lift shadow-premium"
              >
                Go to Dashboard
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
          )}
        </div>

        <div className="mt-12 flex items-center justify-center space-x-8 text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
            <span>Trusted by 500+ organizations</span>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="w-4 h-4 text-green-500" />
            <span>Enterprise Security</span>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-foreground mb-4">
            Everything You Need for Procurement Excellence
          </h2>
          <p className="text-xl text-foreground/80 max-w-2xl mx-auto font-medium">
            From tender creation to contract management, TendProcure covers
            every aspect of the procurement process.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg bg-white/60 dark:bg-card/60 backdrop-blur-lg hover:shadow-xl dark:hover:shadow-luxury transition-all duration-300 hover:-translate-y-1 hover-lift glass-card dark:border dark:border-border/20 animate-scale-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-premium pulse-glow">
                  <feature.icon className="w-8 h-8 text-primary-foreground" />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground leading-relaxed font-medium">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Benefits Section */}
      <section className="bg-white/40 dark:bg-secondary/20 backdrop-blur-lg py-20 dark:border-y dark:border-border/10">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Proven Results for Property Management
              </h2>
              <p className="text-xl text-muted-foreground font-medium">
                Join hundreds of organizations already transforming their
                procurement processes
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {benefits.map((benefit, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-4 p-6 bg-white/60 dark:bg-card/40 rounded-2xl shadow-lg dark:shadow-luxury backdrop-blur-sm hover-lift glass-card dark:border dark:border-border/20 animate-fade-in-right"
                  style={{ animationDelay: `${index * 150}ms` }}
                >
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <CheckCircle className="w-6 h-6 text-green-600" />
                  </div>
                  <span className="text-lg font-semibold text-foreground">
                    {benefit}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-20 text-center">
        <Card className="max-w-4xl mx-auto border-0 shadow-2xl bg-gradient-to-br from-primary via-primary-glow to-accent dark:from-primary dark:via-accent dark:to-secondary text-primary-foreground dark:text-foreground hover-lift animate-scale-in glass-ultra">
          <CardContent className="p-12">
            <h2 className="text-4xl font-bold mb-6">
              Ready to Transform Your Procurement Process?
            </h2>
            <p className="text-xl mb-8 text-primary-foreground/90 dark:text-foreground/80">
              Start your free trial today and experience the power of AI-driven
              tender management.
            </p>

            {!user && (
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/register">
                  <Button
                    size="lg"
                    className="bg-white text-primary hover:bg-gray-100 dark:bg-foreground dark:text-background dark:hover:bg-gray-200 text-lg px-8 py-3 hover-lift shadow-lg"
                  >
                    Start Free Trial
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </Button>
                </Link>
                <Link to="/login">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-primary dark:border-foreground dark:hover:bg-foreground dark:hover:text-background text-lg px-8 py-3 hover-lift"
                  >
                    Sign In
                  </Button>
                </Link>
              </div>
            )}

            {user && (
              <Link to="/dashboard">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-gray-100 dark:bg-foreground dark:text-background dark:hover:bg-gray-200 text-lg px-8 py-3 hover-lift shadow-lg"
                >
                  Go to Dashboard
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            )}
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-background/95 text-white dark:text-foreground py-12 backdrop-blur-lg dark:border-t dark:border-border/20">
        <div className="container mx-auto px-6 text-center">
          <div className="flex items-center justify-center space-x-3 mb-6">
            <div className="w-10 h-10 bg-gradient-to-br from-primary via-primary-glow to-accent rounded-lg flex items-center justify-center shadow-premium">
              <Building2 className="w-6 h-6 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold">TendProcure</h1>
              <p className="text-sm text-primary dark:text-accent">
                Property Tender Management
              </p>
            </div>
          </div>

          <p className="text-gray-400 mb-6">
            Streamlining property procurement processes with AI-powered tender
            management.
          </p>

          <div className="flex flex-wrap justify-center gap-8 text-sm text-gray-400">
            <a
              href="/PrivacyPolicy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="/TermsOfService"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="/help/support"
              className="hover:text-white transition-colors"
            >
              Contact Support
            </a>
            <a
              href="/help/Documentation"
              className="hover:text-white transition-colors"
            >
              Documentation
            </a>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-sm text-gray-500">
            © 2024 TendProcure. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
