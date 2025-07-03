import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-secondary/20 to-background dark:from-background dark:via-secondary/10 dark:to-background">
      <div className="text-center max-w-2xl mx-auto p-8 glass-ultra border border-border/20 dark:border-accent/30 hover-lift animate-scale-in">
        <h1 className="text-6xl font-extrabold text-primary dark:text-accent mb-6 animate-pulse-glow">404</h1>
        <p className="text-3xl text-foreground dark:text-foreground mb-4 font-bold">Page Not Found</p>
        <p className="text-lg text-muted-foreground dark:text-foreground/80 mb-8 leading-relaxed">
          Sorry, the page{" "}
          <span className="font-mono text-primary dark:text-accent font-semibold bg-primary/10 dark:bg-accent/20 px-2 py-1 rounded">{location.pathname}</span> does not exist or has been moved.
          <br />
          Please use the navigation below to find what you're looking for.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Link to="/" className="glass-button p-3 rounded-lg text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 font-medium transition-all duration-300 hover-lift">
            Home
          </Link>
          <Link to="/dashboard" className="glass-button p-3 rounded-lg text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 font-medium transition-all duration-300 hover-lift">
            Dashboard
          </Link>
          <Link to="/login" className="glass-button p-3 rounded-lg text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 font-medium transition-all duration-300 hover-lift">
            Login
          </Link>
          <Link to="/register" className="glass-button p-3 rounded-lg text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 font-medium transition-all duration-300 hover-lift">
            Register
          </Link>
          <Link to="/tenders" className="glass-button p-3 rounded-lg text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 font-medium transition-all duration-300 hover-lift">
            Tenders
          </Link>
          <Link to="/vendors" className="glass-button p-3 rounded-lg text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 font-medium transition-all duration-300 hover-lift">
            Vendors
          </Link>
          <Link to="/contracts" className="glass-button p-3 rounded-lg text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 font-medium transition-all duration-300 hover-lift">
            Contracts
          </Link>
          <Link to="/settings" className="glass-button p-3 rounded-lg text-primary dark:text-accent hover:bg-primary/10 dark:hover:bg-accent/20 font-medium transition-all duration-300 hover-lift">
            Settings
          </Link>
        </div>
        <div className="space-y-4">
          <Button asChild className="bg-primary hover:bg-primary-glow text-primary-foreground interactive-glow hover-lift">
            <Link to="/">Go to Home</Link>
          </Button>
          <p className="text-sm text-muted-foreground dark:text-foreground/60">
            If you believe this is an error, please contact support.
          </p>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
