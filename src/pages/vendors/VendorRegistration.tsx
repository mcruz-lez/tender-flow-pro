import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, X, Plus, Building2, User, FileText, Shield, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import PageTemplate from "@/components/PageTemplate";

interface FormData {
  // Company Information
  companyName: string;
  businessType: string;
  taxId: string;
  yearEstablished: string;
  employeeCount: string;
  website: string;
  description: string;
  
  // Contact Information
  contactName: string;
  contactTitle: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  
  // Services & Categories
  primaryCategory: string;
  services: string[];
  serviceAreas: string[];
  
  // Certifications & Insurance
  certifications: string[];
  insuranceTypes: string[];
  bondAmount: string;
  
  // Financial Information
  annualRevenue: string;
  bankingReference: string;
  
  // Documents
  documents: File[];
}

const VendorRegistration = () => {
  const { toast } = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: "",
    businessType: "",
    taxId: "",
    yearEstablished: "",
    employeeCount: "",
    website: "",
    description: "",
    contactName: "",
    contactTitle: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    primaryCategory: "",
    services: [],
    serviceAreas: [],
    certifications: [],
    insuranceTypes: [],
    bondAmount: "",
    annualRevenue: "",
    bankingReference: "",
    documents: []
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const categories = [
    "Construction", "Cleaning", "Security", "HVAC", "Plumbing", 
    "Electrical", "Landscaping", "IT Services", "Maintenance"
  ];

  const serviceOptions = {
    "Construction": ["General Construction", "Renovation", "New Build", "Commercial", "Residential"],
    "Cleaning": ["Janitorial", "Deep Cleaning", "Carpet Cleaning", "Window Cleaning", "Post-Construction"],
    "Security": ["24/7 Security", "Access Control", "Surveillance", "Event Security", "Patrol Services"],
    "HVAC": ["Installation", "Maintenance", "Repair", "Emergency Service", "Energy Audits"],
    "Plumbing": ["Installation", "Repair", "Emergency Service", "Pipe Replacement", "Water Heaters"],
    "Electrical": ["Installation", "Repair", "Emergency Service", "Lighting", "Panel Upgrades"]
  };

  const certificationOptions = [
    "ISO 9001", "OSHA Certified", "EPA Certified", "Green Building", 
    "LEED Certified", "Licensed Contractor", "Background Verified"
  ];

  const insuranceOptions = [
    "General Liability", "Professional Liability", "Workers Compensation", 
    "Commercial Auto", "Property Insurance", "Cyber Liability"
  ];

  const handleInputChange = <K extends keyof FormData>(field: K, value: FormData[K]) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleArrayChange = (field: keyof FormData, value: string, checked: boolean) => {
    setFormData(prev => ({
      ...prev,
      [field]: checked 
        ? [...(prev[field] as string[]), value]
        : (prev[field] as string[]).filter(item => item !== value)
    }));
  };

  const handleFileUpload = (files: FileList | null) => {
    if (files) {
      setFormData(prev => ({
        ...prev,
        documents: [...prev.documents, ...Array.from(files)]
      }));
    }
  };

  const removeDocument = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.filter((_, i) => i !== index)
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = () => {
    toast({
      title: "Registration Submitted",
      description: "Your vendor registration has been submitted for review. You'll receive an email within 2-3 business days.",
    });
  };

  const stepTitles = [
    "Company Information",
    "Contact Details", 
    "Services & Categories",
    "Certifications & Insurance",
    "Review & Submit"
  ];

  return (
    <PageTemplate
      title="Vendor Registration"
      description="Register your company as a certified vendor"
    >
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Progress */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Registration Progress</h3>
              <span className="text-sm text-gray-600">Step {currentStep} of {totalSteps}</span>
            </div>
            <Progress value={progress} className="mb-2" />
            <div className="grid grid-cols-5 gap-2 text-xs">
              {stepTitles.map((title, index) => (
                <div 
                  key={index}
                  className={`text-center p-2 rounded ${
                    index + 1 === currentStep ? 'bg-blue-50 text-blue-700 font-medium' :
                    index + 1 < currentStep ? 'text-green-600' : 'text-gray-500'
                  }`}
                >
                  {index + 1 < currentStep && <CheckCircle className="w-4 h-4 mx-auto mb-1" />}
                  {title}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Form Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              {currentStep === 1 && <Building2 className="w-5 h-5 mr-2" />}
              {currentStep === 2 && <User className="w-5 h-5 mr-2" />}
              {currentStep === 3 && <FileText className="w-5 h-5 mr-2" />}
              {currentStep === 4 && <Shield className="w-5 h-5 mr-2" />}
              {currentStep === 5 && <CheckCircle className="w-5 h-5 mr-2" />}
              {stepTitles[currentStep - 1]}
            </CardTitle>
            <CardDescription>
              {currentStep === 1 && "Tell us about your company"}
              {currentStep === 2 && "Primary contact information"}
              {currentStep === 3 && "Services you provide"}
              {currentStep === 4 && "Credentials and insurance"}
              {currentStep === 5 && "Review and submit your registration"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Step 1: Company Information */}
            {currentStep === 1 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="companyName">Company Name *</Label>
                  <Input
                    id="companyName"
                    value={formData.companyName}
                    onChange={(e) => handleInputChange("companyName", e.target.value)}
                    placeholder="Your Company Name"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="businessType">Business Type *</Label>
                  <Select value={formData.businessType} onValueChange={(value) => handleInputChange("businessType", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select business type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="corporation">Corporation</SelectItem>
                      <SelectItem value="llc">LLC</SelectItem>
                      <SelectItem value="partnership">Partnership</SelectItem>
                      <SelectItem value="sole-proprietorship">Sole Proprietorship</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="taxId">Tax ID/EIN *</Label>
                  <Input
                    id="taxId"
                    value={formData.taxId}
                    onChange={(e) => handleInputChange("taxId", e.target.value)}
                    placeholder="XX-XXXXXXX"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="yearEstablished">Year Established</Label>
                  <Input
                    id="yearEstablished"
                    value={formData.yearEstablished}
                    onChange={(e) => handleInputChange("yearEstablished", e.target.value)}
                    placeholder="YYYY"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="employeeCount">Number of Employees</Label>
                  <Select value={formData.employeeCount} onValueChange={(value) => handleInputChange("employeeCount", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-10">1-10</SelectItem>
                      <SelectItem value="11-50">11-50</SelectItem>
                      <SelectItem value="51-100">51-100</SelectItem>
                      <SelectItem value="100+">100+</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    value={formData.website}
                    onChange={(e) => handleInputChange("website", e.target.value)}
                    placeholder="https://yourcompany.com"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="description">Company Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="Brief description of your company and services..."
                    rows={3}
                  />
                </div>
              </div>
            )}

            {/* Step 2: Contact Information */}
            {currentStep === 2 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="contactName">Contact Name *</Label>
                  <Input
                    id="contactName"
                    value={formData.contactName}
                    onChange={(e) => handleInputChange("contactName", e.target.value)}
                    placeholder="Primary contact person"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="contactTitle">Title</Label>
                  <Input
                    id="contactTitle"
                    value={formData.contactTitle}
                    onChange={(e) => handleInputChange("contactTitle", e.target.value)}
                    placeholder="Job title"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address *</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="contact@company.com"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number *</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="(555) 123-4567"
                  />
                </div>
                <div className="md:col-span-2 space-y-2">
                  <Label htmlFor="address">Business Address *</Label>
                  <Input
                    id="address"
                    value={formData.address}
                    onChange={(e) => handleInputChange("address", e.target.value)}
                    placeholder="Street address"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city">City *</Label>
                  <Input
                    id="city"
                    value={formData.city}
                    onChange={(e) => handleInputChange("city", e.target.value)}
                    placeholder="City"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="state">State *</Label>
                  <Input
                    id="state"
                    value={formData.state}
                    onChange={(e) => handleInputChange("state", e.target.value)}
                    placeholder="State"
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code *</Label>
                  <Input
                    id="zipCode"
                    value={formData.zipCode}
                    onChange={(e) => handleInputChange("zipCode", e.target.value)}
                    placeholder="ZIP Code"
                  />
                </div>
              </div>
            )}

            {/* Step 3: Services & Categories */}
            {currentStep === 3 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Primary Category *</Label>
                  <Select value={formData.primaryCategory} onValueChange={(value) => handleInputChange("primaryCategory", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select primary category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category} value={category}>{category}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {formData.primaryCategory && serviceOptions[formData.primaryCategory as keyof typeof serviceOptions] && (
                  <div className="space-y-2">
                    <Label>Services Offered</Label>
                    <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                      {serviceOptions[formData.primaryCategory as keyof typeof serviceOptions].map(service => (
                        <div key={service} className="flex items-center space-x-2">
                          <Checkbox
                            id={service}
                            checked={formData.services.includes(service)}
                            onCheckedChange={(checked) => handleArrayChange("services", service, checked as boolean)}
                          />
                          <Label htmlFor={service} className="text-sm">{service}</Label>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="space-y-2">
                  <Label>Service Areas</Label>
                  <div className="flex flex-wrap gap-2">
                    {formData.serviceAreas.map((area, index) => (
                      <Badge key={index} variant="secondary" className="flex items-center gap-1">
                        {area}
                        <X 
                          className="w-3 h-3 cursor-pointer" 
                          onClick={() => handleArrayChange("serviceAreas", area, false)}
                        />
                      </Badge>
                    ))}
                  </div>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Add service area (e.g., New York, NY)"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          const value = e.currentTarget.value;
                          if (value && !formData.serviceAreas.includes(value)) {
                            handleArrayChange("serviceAreas", value, true);
                            e.currentTarget.value = '';
                          }
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      variant="outline" 
                      size="icon"
                      onClick={() => {
                        const input = document.querySelector('input[placeholder*="Add service area"]') as HTMLInputElement;
                        const value = input?.value;
                        if (value && !formData.serviceAreas.includes(value)) {
                          handleArrayChange("serviceAreas", value, true);
                          input.value = '';
                        }
                      }}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Certifications & Insurance */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label>Certifications</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {certificationOptions.map(cert => (
                      <div key={cert} className="flex items-center space-x-2">
                        <Checkbox
                          id={cert}
                          checked={formData.certifications.includes(cert)}
                          onCheckedChange={(checked) => handleArrayChange("certifications", cert, checked as boolean)}
                        />
                        <Label htmlFor={cert} className="text-sm">{cert}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Insurance Coverage</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    {insuranceOptions.map(insurance => (
                      <div key={insurance} className="flex items-center space-x-2">
                        <Checkbox
                          id={insurance}
                          checked={formData.insuranceTypes.includes(insurance)}
                          onCheckedChange={(checked) => handleArrayChange("insuranceTypes", insurance, checked as boolean)}
                        />
                        <Label htmlFor={insurance} className="text-sm">{insurance}</Label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="bondAmount">Bond Amount</Label>
                    <Input
                      id="bondAmount"
                      value={formData.bondAmount}
                      onChange={(e) => handleInputChange("bondAmount", e.target.value)}
                      placeholder="$100,000"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="annualRevenue">Annual Revenue Range</Label>
                    <Select value={formData.annualRevenue} onValueChange={(value) => handleInputChange("annualRevenue", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select range" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="<500k">Less than $500K</SelectItem>
                        <SelectItem value="500k-1m">$500K - $1M</SelectItem>
                        <SelectItem value="1m-5m">$1M - $5M</SelectItem>
                        <SelectItem value="5m+">$5M+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Upload Documents</Label>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-600 mb-2">
                      Upload certificates, insurance documents, licenses
                    </p>
                    <Input
                      type="file"
                      multiple
                      accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                      onChange={(e) => handleFileUpload(e.target.files)}
                      className="hidden"
                      id="file-upload"
                    />
                    <Label htmlFor="file-upload" className="cursor-pointer">
                      <Button type="button" variant="outline">Choose Files</Button>
                    </Label>
                  </div>
                  {formData.documents.length > 0 && (
                    <div className="space-y-2">
                      {formData.documents.map((file, index) => (
                        <div key={index} className="flex items-center justify-between p-2 border rounded">
                          <span className="text-sm">{file.name}</span>
                          <Button 
                            type="button" 
                            variant="ghost" 
                            size="sm"
                            onClick={() => removeDocument(index)}
                          >
                            <X className="w-4 h-4" />
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Step 5: Review & Submit */}
            {currentStep === 5 && (
              <div className="space-y-6">
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h3 className="font-medium text-blue-900 mb-2">Review Your Information</h3>
                  <p className="text-sm text-blue-700">
                    Please review all information before submitting. You can go back to make changes if needed.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Company Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div><strong>Name:</strong> {formData.companyName}</div>
                      <div><strong>Type:</strong> {formData.businessType}</div>
                      <div><strong>Tax ID:</strong> {formData.taxId}</div>
                      <div><strong>Established:</strong> {formData.yearEstablished}</div>
                      <div><strong>Employees:</strong> {formData.employeeCount}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Contact Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div><strong>Contact:</strong> {formData.contactName}</div>
                      <div><strong>Email:</strong> {formData.email}</div>
                      <div><strong>Phone:</strong> {formData.phone}</div>
                      <div><strong>Address:</strong> {formData.address}, {formData.city}, {formData.state} {formData.zipCode}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Services</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div><strong>Category:</strong> {formData.primaryCategory}</div>
                      <div><strong>Services:</strong> {formData.services.join(", ")}</div>
                      <div><strong>Areas:</strong> {formData.serviceAreas.join(", ")}</div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-lg">Credentials</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-2 text-sm">
                      <div><strong>Certifications:</strong> {formData.certifications.join(", ")}</div>
                      <div><strong>Insurance:</strong> {formData.insuranceTypes.join(", ")}</div>
                      <div><strong>Documents:</strong> {formData.documents.length} files uploaded</div>
                    </CardContent>
                  </Card>
                </div>
              </div>
            )}

            {/* Navigation */}
            <div className="flex justify-between pt-6 border-t">
              <Button 
                variant="outline" 
                onClick={prevStep}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              
              {currentStep < totalSteps ? (
                <Button onClick={nextStep}>
                  Next
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="bg-green-600 hover:bg-green-700">
                  Submit Registration
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default VendorRegistration;

// Next: Professionally enhance VendorRegistration.tsx with vibrant, animated, accessible, and consistent design system
// This includes animated gradients, glassmorphism, badge pulse, animated CTAs, responsive layouts, and accessibility improvements
// All enhancements will follow the same design system as Dashboard
