import { useTenders } from "@/hooks/useTenders";
import { useVendors } from "@/hooks/useVendors";
import { useProperties } from "@/hooks/useProperties";
import { useBids } from "@/hooks/useBids";
import { useContracts } from "@/hooks/useContracts";
import { KPICards } from "./dashboard/KPICards";
import { PerformanceMetrics } from "./dashboard/PerformanceMetrics";
import { AlertsCard } from "./dashboard/AlertsCard";

const animatedGradient =
  "bg-gradient-to-br from-blue-100 via-purple-100 to-indigo-200 dark:from-[#23234a] dark:via-[#2a1e3f] dark:to-[#1e1e3f] shadow-2xl border-0 backdrop-blur-xl";

export const DashboardAnalytics = () => {
  const { data: tenders } = useTenders();
  const { data: vendors } = useVendors();
  const { data: properties } = useProperties();
  const { data: bids } = useBids();
  const { data: contracts } = useContracts();

  // Calculate KPIs with explicit number casting
  const totalTenders = Number(tenders?.length || 0);
  const activeTenders = Number(
    tenders?.filter((t) => t.status === "active").length || 0,
  );
  const totalVendors = Number(vendors?.length || 0);
  const approvedVendors = Number(
    vendors?.filter((v) => v.prequalification_status === "approved").length ||
      0,
  );
  const totalBids = Number(bids?.length || 0);
  const totalContracts = Number(contracts?.length || 0);
  const activeContracts = Number(
    contracts?.filter((c) => c.status === "active").length || 0,
  );

  // Calculate financial metrics with proper type checking
  const totalContractValue = Number(
    contracts?.reduce((sum, contract) => {
      const value =
        typeof contract.contract_value === "number"
          ? contract.contract_value
          : 0;
      return sum + value;
    }, 0) || 0,
  );

  const tendersWithBudgets =
    tenders?.filter((t) => t.budget_max && typeof t.budget_max === "number") ||
    [];
  const avgTenderBudget = Number(
    tendersWithBudgets.length > 0
      ? tendersWithBudgets.reduce((sum, t) => sum + (t.budget_max || 0), 0) /
          tendersWithBudgets.length
      : 0,
  );

  // Calculate performance metrics with explicit number operations
  const bidsPerTender =
    totalTenders > 0 ? (totalBids / totalTenders).toFixed(1) : "0";
  const vendorPrequalificationRate =
    totalVendors > 0 ? Math.round((approvedVendors / totalVendors) * 100) : 0;

  return (
    <div className="space-y-6">
      {/* KPI Cards */}
      <KPICards
        activeTenders={activeTenders}
        totalTenders={totalTenders}
        approvedVendors={approvedVendors}
        totalVendors={totalVendors}
        activeContracts={activeContracts}
        totalContracts={totalContracts}
        totalContractValue={totalContractValue}
      />

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <PerformanceMetrics
          bidsPerTender={bidsPerTender}
          avgTenderBudget={avgTenderBudget}
          vendorPrequalificationRate={vendorPrequalificationRate}
          totalVendors={totalVendors}
        />

        <AlertsCard tenders={tenders} bids={bids} contracts={contracts} />
      </div>
    </div>
  );
};
