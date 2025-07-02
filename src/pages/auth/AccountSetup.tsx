import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Building2, User, Phone, Building } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/useAuth";

const AccountSetup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    jobTitle: "",
    department: "",
    phone: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      toast.error("Please sign in first");
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      // Update profile with additional information
      const { error } = await supabase
        .from("profiles")
        .update({
          first_name: formData.firstName,
          last_name: formData.lastName,
          job_title: formData.jobTitle,
          department: formData.department,
          phone: formData.phone,
        })
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Account setup completed successfully!");
      navigate("/dashboard");
    } catch (error) {
      console.error("Error updating profile:", error);
      toast.error("Failed to complete account setup");
    }

    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50 flex items-center justify-center p-6">
      <div className="w-full max-w-2xl">
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
            <CardTitle className="text-2xl font-bold text-gray-900">
              Complete Your Profile
            </CardTitle>
            <CardDescription className="text-gray-600">
              Tell us a bit about yourself to personalize your TendProcure
              experience.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="firstName"
                    className="text-gray-700 font-medium"
                  >
                    First Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="firstName"
                      placeholder="Enter your first name"
                      value={formData.firstName}
                      onChange={(e) =>
                        setFormData({ ...formData, firstName: e.target.value })
                      }
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="lastName"
                    className="text-gray-700 font-medium"
                  >
                    Last Name
                  </Label>
                  <div className="relative">
                    <User className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="lastName"
                      placeholder="Enter your last name"
                      value={formData.lastName}
                      onChange={(e) =>
                        setFormData({ ...formData, lastName: e.target.value })
                      }
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label
                    htmlFor="jobTitle"
                    className="text-gray-700 font-medium"
                  >
                    Job Title
                  </Label>
                  <Select onValueChange={(value) => setFormData({ ...formData, jobTitle: value })}>
                    <SelectTrigger className="h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500">
                      <SelectValue placeholder="Select your job title" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="property_manager">Property Manager</SelectItem>
                      <SelectItem value="procurement_manager">Procurement Manager</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="vendor">Vendor</SelectItem>
                      <SelectItem value="finance_manager">Finance Manager</SelectItem>
                      <SelectItem value="evaluator">Evaluator</SelectItem>
                      <SelectItem value="admin">Administrator</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="department"
                    className="text-gray-700 font-medium"
                  >
                    Department
                  </Label>
                  <div className="relative">
                    <Building className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                    <Input
                      id="department"
                      placeholder="Enter your department"
                      value={formData.department}
                      onChange={(e) =>
                        setFormData({ ...formData, department: e.target.value })
                      }
                      className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone" className="text-gray-700 font-medium">
                  Phone Number
                </Label>
                <div className="relative">
                  <Phone className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="Enter your phone number"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="pl-10 h-12 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium"
                disabled={isLoading}
              >
                {isLoading ? "Setting up..." : "Complete Setup"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AccountSetup;
