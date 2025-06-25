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
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center max-w-lg mx-auto p-8 rounded-xl shadow-lg bg-white">
        <h1 className="text-5xl font-extrabold text-red-600 mb-4">404</h1>
        <p className="text-2xl text-gray-700 mb-2 font-semibold">Page Not Found</p>
        <p className="text-lg text-gray-500 mb-6">
          Sorry, the page{" "}
          <span className="font-mono text-blue-700">{location.pathname}</span> does not exist or has been moved.
          <br />
          Please use the links below to navigate.
        </p>
        <div className="flex flex-col gap-3 items-center">
          <Link to="/" className="text-blue-600 hover:underline font-medium">
            Home
          </Link>
          <Link to="/dashboard" className="text-blue-600 hover:underline font-medium">
            Dashboard
          </Link>
          <Link to="/login" className="text-blue-600 hover:underline font-medium">
            Login
          </Link>
          <Link to="/register" className="text-blue-600 hover:underline font-medium">
            Register
          </Link>
          <Link to="/tenders" className="text-blue-600 hover:underline font-medium">
            Tenders
          </Link>
          <Link to="/vendors" className="text-blue-600 hover:underline font-medium">
            Vendors
          </Link>
          <Link to="/settings" className="text-blue-600 hover:underline font-medium">
            Settings
          </Link>
        </div>
        <div className="mt-8">
          <Button asChild variant="outline">
            <Link to="/">Go to Home</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
