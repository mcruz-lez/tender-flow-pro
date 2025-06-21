import { useState } from "react";
import DashboardSidebar from "@/components/DashboardSidebar";
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
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ArrowLeft, Save, Send } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";

const CreateTender = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    requirements: "",
    budget: "",
    deadline: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate tender creation
    await new Promise((resolve) => setTimeout(resolve, 2000));

    toast.success("Tender created successfully!");
    navigate("/tenders");
    setIsLoading(false);
  };

  const handleSaveDraft = async () => {
    setIsLoading(true);

    // Simulate saving draft
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast.success("Draft saved successfully!");
    setIsLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardSidebar
        isOpen={sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
      />

      <div
        className={`transition-all duration-300 ${sidebarOpen ? "ml-64" : "ml-16"}`}
      >
        <div className="p-6">
          <div className="flex items-center gap-4 mb-6">
            <Button variant="ghost" size="sm" asChild>
              <Link to="/tenders">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Tenders
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Create New Tender
              </h1>
              <p className="text-gray-600 mt-2">
                Fill in the details to create a new tender
              </p>
            </div>
          </div>

          <div className="max-w-4xl">
            <Card>
              <CardHeader>
                <CardTitle>Tender Information</CardTitle>
                <CardDescription>
                  Provide the basic details for your tender
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="title">Tender Title *</Label>
                    <Input
                      id="title"
                      placeholder="Enter tender title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category *</Label>
                      <Select
                        onValueChange={(value) =>
                          setFormData({ ...formData, category: value })
                        }
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="property-maintenance">
                            Property Maintenance
                          </SelectItem>
                          <SelectItem value="construction">
                            Construction & Renovation
                          </SelectItem>
                          <SelectItem value="security">
                            Security Services
                          </SelectItem>
                          <SelectItem value="cleaning">
                            Cleaning Services
                          </SelectItem>
                          <SelectItem value="landscaping">
                            Landscaping
                          </SelectItem>
                          <SelectItem value="technology">
                            Technology Services
                          </SelectItem>
                          <SelectItem value="professional">
                            Professional Services
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="budget">Estimated Budget</Label>
                      <Input
                        id="budget"
                        placeholder="e.g., $50,000"
                        value={formData.budget}
                        onChange={(e) =>
                          setFormData({ ...formData, budget: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="deadline">Submission Deadline *</Label>
                      <Input
                        id="deadline"
                        type="date"
                        value={formData.deadline}
                        onChange={(e) =>
                          setFormData({ ...formData, deadline: e.target.value })
                        }
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="location">Location</Label>
                      <Input
                        id="location"
                        placeholder="Enter project location"
                        value={formData.location}
                        onChange={(e) =>
                          setFormData({ ...formData, location: e.target.value })
                        }
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="description">Description *</Label>
                    <Textarea
                      id="description"
                      placeholder="Provide a detailed description of the tender"
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      rows={4}
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="requirements">
                      Requirements & Specifications
                    </Label>
                    <Textarea
                      id="requirements"
                      placeholder="List specific requirements, qualifications, and technical specifications"
                      value={formData.requirements}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          requirements: e.target.value,
                        })
                      }
                      rows={6}
                    />
                  </div>

                  <div className="flex gap-4 pt-6">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleSaveDraft}
                      disabled={isLoading}
                    >
                      <Save className="w-4 h-4 mr-2" />
                      Save Draft
                    </Button>
                    <Button
                      type="submit"
                      disabled={isLoading}
                      className="bg-blue-600 hover:bg-blue-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {isLoading ? "Publishing..." : "Publish Tender"}
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTender;
