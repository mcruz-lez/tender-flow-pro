
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FileText, Calendar, DollarSign, Building, AlertTriangle, CheckCircle } from "lucide-react";

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
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <FileText className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">24</div>
              <div className="text-sm text-gray-600">Active Contracts</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <DollarSign className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">€2.8M</div>
              <div className="text-sm text-gray-600">Total Value</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <AlertTriangle className="w-8 h-8 text-orange-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">5</div>
              <div className="text-sm text-gray-600">Expiring Soon</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">91%</div>
              <div className="text-sm text-gray-600">Avg Performance</div>
            </CardContent>
          </Card>
        </div>

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
      </div>
    </PageTemplate>
  );
};

export default ContractOverview;
