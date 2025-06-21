import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Calendar, DollarSign, Building, AlertTriangle, CheckCircle, Sparkles, Download, BarChart2, Activity, ArrowRight } from "lucide-react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import { StripeCheckoutButton } from '@/components/StripeCheckoutButton';

const animatedGradient =
  "bg-gradient-to-br from-blue-900/80 via-purple-800/80 to-indigo-900/80 shadow-2xl shadow-blue-900/30 border-0 backdrop-blur-xl";
const glassCard =
  "rounded-2xl border-0 shadow-2xl bg-white/10 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-blue-500/30";
const glassButton =
  "rounded-full px-5 py-2 font-semibold bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 text-white shadow-lg shadow-blue-900/20 hover:scale-105 hover:shadow-blue-400/40 transition-all duration-300 focus:ring-2 focus:ring-blue-400 focus:outline-none";
const badgePulse =
  "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-pulse after:bg-current after:opacity-20";

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
      <div className="space-y-8">
        {/* Analytics & AI Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <Card className={`${glassCard} border-blue-500/20 ${animatedGradient}`}>
            <CardContent className="p-6 text-center">
              <BarChart2 className="w-10 h-10 text-blue-300 mx-auto mb-3 drop-shadow-lg animate-bounce" />
              <div className="text-3xl font-extrabold text-white drop-shadow">24</div>
              <div className="text-base text-blue-200 font-medium">Active Contracts</div>
            </CardContent>
          </Card>
          <Card className={`${glassCard} border-green-500/20 bg-gradient-to-br from-green-900/80 via-emerald-800/80 to-blue-900/80`}>
            <CardContent className="p-6 text-center">
              <DollarSign className="w-10 h-10 text-green-300 mx-auto mb-3 drop-shadow-lg animate-pulse" />
              <div className="text-3xl font-extrabold text-white drop-shadow">€2.8M</div>
              <div className="text-base text-green-200 font-medium">Total Value</div>
            </CardContent>
          </Card>
          <Card className={`${glassCard} border-orange-500/20 bg-gradient-to-br from-orange-900/80 via-yellow-800/80 to-red-900/80`}>
            <CardContent className="p-6 text-center">
              <AlertTriangle className="w-10 h-10 text-orange-300 mx-auto mb-3 drop-shadow-lg animate-pulse" />
              <div className="text-3xl font-extrabold text-white drop-shadow">5</div>
              <div className="text-base text-orange-200 font-medium">Expiring Soon</div>
            </CardContent>
          </Card>
          <Card className={`${glassCard} border-purple-500/20 bg-gradient-to-br from-purple-900/80 via-indigo-800/80 to-blue-900/80`}>
            <CardContent className="p-6 text-center">
              <CheckCircle className="w-10 h-10 text-purple-300 mx-auto mb-3 drop-shadow-lg animate-bounce" />
              <div className="text-3xl font-extrabold text-white drop-shadow">91%</div>
              <div className="text-base text-purple-200 font-medium">Avg Performance</div>
            </CardContent>
          </Card>
        </div>
        {/* AI Insights, Recent Activity, Deep Links */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-10">
          <Card className={`${glassCard} border-purple-500/20 bg-gradient-to-br from-purple-900/80 via-indigo-800/80 to-blue-900/80`}>
            <CardHeader>
              <CardTitle className="flex items-center text-white text-lg">
                <Sparkles className="w-6 h-6 mr-2 text-yellow-300 animate-spin-slow" />
                AI Insights
              </CardTitle>
              <CardDescription className="text-purple-200">
                Smart suggestions to improve contract outcomes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-purple-100 text-base">
                <li>• Monitor expiring contracts for timely renewals</li>
                <li>• Track vendor performance for risk mitigation</li>
                <li>• Analyze contract value trends for savings</li>
                <li>• Use templates for faster contract creation</li>
              </ul>
              <Button className={`${glassButton} mt-6 w-full`} size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export AI Report
              </Button>
            </CardContent>
          </Card>
          <Card className={`${glassCard} border-blue-500/20 bg-gradient-to-br from-blue-900/80 via-cyan-800/80 to-indigo-900/80`}>
            <CardHeader>
              <CardTitle className="flex items-center text-white text-lg">
                <Activity className="w-6 h-6 mr-2 text-blue-300 animate-pulse" />
                Recent Contract Activity
              </CardTitle>
              <CardDescription className="text-blue-200">
                Track your latest contract actions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2 text-blue-100 text-base">
                <li>• Renewed Security Services (2d ago)</li>
                <li>• Created NDA for new vendor (1w ago)</li>
                <li>• Updated value for Landscaping (3d ago)</li>
              </ul>
              <Button asChild className={`${glassButton} mt-6 w-full`} size="sm">
                <Link to="/contracts/RenewalManagement">
                  <ArrowRight className="w-4 h-4 mr-2" />
                  Go to Renewals
                </Link>
              </Button>
            </CardContent>
          </Card>
          <Card className={`${glassCard} border-green-500/20 bg-gradient-to-br from-green-900/80 via-emerald-800/80 to-blue-900/80`}>
            <CardHeader>
              <CardTitle className="flex items-center text-white text-lg">
                <BarChart2 className="w-6 h-6 mr-2 text-green-300 animate-bounce" />
                Quick Actions
              </CardTitle>
              <CardDescription className="text-green-200">
                Jump to key contract tools
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-3">
                <Button asChild variant="outline" className={glassButton}>
                  <Link to="/contracts/CreateContract">Create Contract</Link>
                </Button>
                <Button asChild variant="outline" className={glassButton}>
                  <Link to="/contracts/PerformanceManagement">Performance</Link>
                </Button>
                <Button asChild variant="outline" className={glassButton}>
                  <Link to="/contracts/SupplierPerformance">Supplier Performance</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <Tabs defaultValue="active" className="mb-10">
          <TabsList className={`${glassCard} border-blue-500/20 bg-gradient-to-r from-blue-900/80 via-purple-800/80 to-indigo-900/80`}> 
            <TabsTrigger value="active">Active Contracts</TabsTrigger>
            <TabsTrigger value="expiring">Expiring Soon</TabsTrigger>
            <TabsTrigger value="performance">Performance</TabsTrigger>
          </TabsList>
          <TabsContent value="active">
            <Card className={`${glassCard} border-blue-500/20 bg-gradient-to-br from-blue-900/80 via-purple-800/80 to-indigo-900/80`}>
              <CardHeader>
                <CardTitle className="text-white">Active Contracts</CardTitle>
                <CardDescription className="text-blue-200">Overview of current contracts and their status</CardDescription>
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
                      <TableRow key={contract.id} className="hover:bg-blue-900/10 transition-all">
                        <TableCell>
                          <div>
                            <div className="font-semibold text-white">{contract.title}</div>
                            <div className="text-xs text-blue-200">{contract.id}</div>
                          </div>
                        </TableCell>
                        <TableCell className="text-blue-100">{contract.vendor}</TableCell>
                        <TableCell className="text-green-200 font-semibold">€{contract.value.toLocaleString()}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(contract.status)} ${badgePulse} px-3 py-1 text-xs font-bold rounded-full`}>{contract.status}</Badge>
                        </TableCell>
                        <TableCell className="text-blue-100">{contract.endDate}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-purple-200 mr-2">{contract.performance}%</span>
                            <div className="w-16 bg-blue-900/30 rounded-full h-2">
                              <div 
                                className="bg-blue-400 h-2 rounded-full animate-pulse" 
                                style={{ width: `${contract.performance}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className={glassButton}>
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
            <Card className={`${glassCard} border-orange-500/20 bg-gradient-to-br from-orange-900/80 via-yellow-800/80 to-red-900/80`}>
              <CardHeader>
                <CardTitle className="text-white">Expiring Contracts</CardTitle>
                <CardDescription className="text-orange-200">Contracts nearing end date</CardDescription>
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
                      <TableRow key={contract.id} className="hover:bg-orange-900/10 transition-all">
                        <TableCell className="text-white">{contract.title}</TableCell>
                        <TableCell className="text-orange-100">{contract.vendor}</TableCell>
                        <TableCell className="text-orange-100">{contract.endDate}</TableCell>
                        <TableCell>
                          <Badge className={`${getStatusColor(contract.status)} ${badgePulse} px-3 py-1 text-xs font-bold rounded-full`}>{contract.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="outline" size="sm" className={glassButton}>
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
            <Card className={`${glassCard} border-purple-500/20 bg-gradient-to-br from-purple-900/80 via-indigo-800/80 to-blue-900/80`}>
              <CardHeader>
                <CardTitle className="text-white">Performance Overview</CardTitle>
                <CardDescription className="text-purple-200">Contract performance metrics</CardDescription>
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
                      <TableRow key={contract.id} className="hover:bg-purple-900/10 transition-all">
                        <TableCell className="text-white">{contract.title}</TableCell>
                        <TableCell>
                          <div className="flex items-center">
                            <span className="text-sm font-bold text-purple-200 mr-2">{contract.performance}%</span>
                            <div className="w-16 bg-purple-900/30 rounded-full h-2">
                              <div 
                                className="bg-purple-400 h-2 rounded-full animate-pulse" 
                                style={{ width: `${contract.performance}%` }}
                              ></div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-purple-100">{contract.vendor}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
        {/* Payment/Checkout Section */}
        <Card className={`mb-10 ${glassCard} border-green-500/20 bg-gradient-to-br from-green-900/80 via-emerald-800/80 to-blue-900/80`}>
          <CardHeader>
            <CardTitle className="text-xl text-white flex items-center gap-2">
              <DollarSign className="w-6 h-6 text-green-300 animate-bounce" />
              Contract Payment
            </CardTitle>
            <CardDescription className="text-green-200">
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
