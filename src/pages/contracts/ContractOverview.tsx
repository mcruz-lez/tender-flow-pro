import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Calendar, DollarSign, Building, AlertTriangle, CheckCircle, Sparkles, Download, BarChart2, Activity, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { StripeCheckoutButton } from '@/components/StripeCheckoutButton';

const ContractOverview = () => {
  const quickActions = [
    { label: "Create Contract", href: "/contracts/create", icon: FileText },
    { label: "Renewals", href: "/contracts/renewals", icon: Calendar, variant: "outline" as const },
    { label: "Performance", href: "/contracts/performance", icon: CheckCircle, variant: "outline" as const }
  ];

  const contracts = [
    { 
      id: "CON-001", 
      title: "HVAC Maintenance Services", 
      vendor: "TechClimate Solutions", 
      value: 45000, 
      status: "Active", 
      startDate: "2024-01-01", 
      endDate: "2024-12-31",
      performance: 92
    },
    { 
      id: "CON-002", 
      title: "Security Services", 
      vendor: "SecureGuard Solutions", 
      value: 72000, 
      status: "Active", 
      startDate: "2023-12-01", 
      endDate: "2024-11-30",
      performance: 95
    },
    { 
      id: "CON-003", 
      title: "Landscaping Services", 
      vendor: "GreenSpace Pro", 
      value: 28500, 
      status: "Expiring Soon", 
      startDate: "2023-03-01", 
      endDate: "2024-02-29",
      performance: 88
    },
    { 
      id: "CON-004", 
      title: "Cleaning Services", 
      vendor: "ProClean Services", 
      value: 36000, 
      status: "Under Review", 
      startDate: "2024-02-01", 
      endDate: "2025-01-31",
      performance: 90
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Active": return "bg-green-100 text-green-800";
      case "Expiring Soon": return "bg-orange-100 text-orange-800";
      case "Under Review": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <PageTemplate
      title="Contract Management"
      description="Manage all contracts and agreements"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Analytics & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-6">
          <Card className="glass-card border-blue-500/20">
            <CardContent className="p-4 text-center">
              <BarChart2 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-blue-400">Active Contracts</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-green-500/20">
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">€2.8M</div>
              <div className="text-sm text-green-400">Total Value</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-orange-500/20">
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-orange-400">Expiring Soon</div>
            </CardContent>
          </Card>
          <Card className="glass-card border-purple-500/20">
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">91%</div>
              <div className="text-sm text-purple-400">Avg Performance</div>
            </CardContent>
          </Card>
        </div>
        {/* AI Insights, Recent Activity, Deep Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card className="glass-card border-purple-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Sparkles className="w-5 h-5 mr-2 text-yellow-400" />
                AI Insights
              </CardTitle>
              <CardDescription className="text-purple-200">
                Smart suggestions to improve contract outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-purple-200">
                <li>• Monitor expiring contracts for timely renewals</li>
                <li>• Track vendor performance for risk mitigation</li>
                <li>• Analyze contract value trends for savings</li>
                <li>• Use templates for faster contract creation</li>
              </ul>
              <Button className="mt-4 glass-button" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export AI Report
              </Button>
            </CardContent>
          </Card>
          <Card className="glass-card border-blue-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <Activity className="w-5 h-5 mr-2 text-blue-400" />
                Recent Contract Activity
              </CardTitle>
              <CardDescription className="text-blue-200">
                Track your latest contract actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-200 text-sm">
                <li>• Renewed Security Services (2d ago)</li>
                <li>• Created NDA for new vendor (1w ago)</li>
                <li>• Updated value for Landscaping (3d ago)</li>
              </ul>
              <Button asChild className="mt-4 glass-button" size="sm">
                <Link to="/contracts/RenewalManagement">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Go to Renewals
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className="glass-card border-green-500/20">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <BarChart2 className="w-5 h-5 mr-2 text-green-400" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-green-200">
                Jump to key contract tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                <Button asChild variant="outline" className="glass-button">
                  <Link to="/contracts/CreateContract">Create Contract</Link>
                </Button>
                <Button asChild variant="outline" className="glass-button">
                  <Link to="/contracts/PerformanceManagement">Performance</Link>
                </Button>
                <Button asChild variant="outline" className="glass-button">
                  <Link to="/contracts/SupplierPerformance">Supplier Performance</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="active" className="mb-8">
          <TabsList className="glass-card border-blue-500/20">
            <TabsTrigger value="active">Active Contracts</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <Card>
              <CardHeader>
                <CardTitle>Active Contracts</CardTitle>
                <CardDescription>Overview of current contracts and their status</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>Value</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell>
                          <div>
                            <div className="font-medium">{contract.title}</div>
                            <div className="text-sm text-gray-500">{contract.id}</div>
                          </div>
                        </TableCell>
                        <TableCell>{contract.vendor}</TableCell>
                        <TableCell>€{contract.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell>{contract.endDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">{contract.performance}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full" 
                                style={{ width: `${contract.performance}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            View Details
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="expiring">
            <Card>
              <CardHeader>
                <CardTitle>Expiring Contracts</CardTitle>
                <CardDescription>Contracts nearing end date</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract</TableHead>
                      <TableHead>Vendor</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.filter(c => c.status === "Expiring Soon").map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>{contract.vendor}</TableCell>
                        <TableCell>{contract.endDate}</TableCell>
                        <TableCell>
                          <Badge className={getStatusColor(contract.status)}>
                            {contract.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm">
                            Renew
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
          <TabsContent value="performance">
            <Card>
              <CardHeader>
                <CardTitle>Performance Overview</CardTitle>
                <CardDescription>Contract performance metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Contract</TableHead>
                      <TableHead>Performance</TableHead>
                      <TableHead>Vendor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {contracts.map((contract) => (
                      <TableRow key={contract.id}>
                        <TableCell>{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-sm font-medium mr-2">{contract.performance}%</span>
                            <div className="w-16 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-purple-600 h-2 rounded-full" 
                                style={{ width: `${contract.performance}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{contract.vendor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Payment/Checkout Section */}
        <Card className="mb-6 bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <DollarSign className="w-5 h-5 text-green-400" />
              Contract Payment
            </CardTitle>
            <CardDescription className="text-white/70">
              Pay contract fees, EMD, or security deposits securely via Stripe.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <StripeCheckoutButton
              amount={500}
              currency="usd"
              description="Contract Fee or Security Deposit"
              type="contract"
              onSuccess={() => alert('Contract payment successful!')}
            />
          </CardContent>
        </Card>
      </div>
    </PageTemplate>
  );
};

export default ContractOverview;
