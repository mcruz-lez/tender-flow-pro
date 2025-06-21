import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const VendorDashboard = () => {
  return (
    <PageTemplate
      title="Vendor Dashboard"
      description="Overview and management tools for vendors."
    >
      <Card className="mb-8 rounded-2xl shadow-xl border border-slate-200/40 bg-gradient-to-br from-blue-50 to-indigo-100 dark:from-[#23234a]/80 dark:to-[#2a1e3f]/80 transition-all">
        <CardHeader>
          <CardTitle className="text-xl font-semibold tracking-tight text-slate-800 dark:text-white">
            Quick Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc list-inside mb-4 text-slate-700 dark:text-slate-200 text-base space-y-1">
            <li>View open tenders and submit bids</li>
            <li>Track bid status and feedback</li>
            <li>Manage company profile</li>
            <li>Access analytics and insights</li>
          </ul>
          <Button asChild className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold shadow-md rounded-lg transition-all animate-pulse">
            <a href="/vendors">Go to Vendor Portal</a>
          </Button>
        </CardContent>
      </Card>
    </PageTemplate>
  );
};

export default VendorDashboard;
