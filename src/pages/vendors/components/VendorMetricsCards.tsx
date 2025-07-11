import { Card, CardContent } from "@/components/ui/card";

interface VendorData {
  completedProjects: number;
  activeProjects: number;
  totalValue: number;
  averageValue: number;
  onTimeDelivery: number;
  clientSatisfaction: number;
}

interface VendorMetricsCardsProps {
  vendor: VendorData;
}

const VendorMetricsCards = ({ vendor }: VendorMetricsCardsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card className="glass-card hover-lift transition-all duration-300 border-border/20 dark:border-accent/30">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary dark:text-accent animate-scale-in">
            {vendor.completedProjects}
          </div>
          <div className="text-sm font-medium text-foreground dark:text-foreground/90 mt-2">Completed Projects</div>
          <div className="text-xs text-primary dark:text-accent mt-1 font-medium">
            +{vendor.activeProjects} active
          </div>
        </CardContent>
      </Card>
      <Card className="glass-card hover-lift transition-all duration-300 border-border/20 dark:border-accent/30">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary dark:text-accent animate-scale-in">
            ${(vendor.totalValue / 1000000).toFixed(1)}M
          </div>
          <div className="text-sm font-medium text-foreground dark:text-foreground/90 mt-2">Total Contract Value</div>
          <div className="text-xs text-muted-foreground dark:text-foreground/70 mt-1">
            Avg: ${vendor.averageValue.toLocaleString()}
          </div>
        </CardContent>
      </Card>
      <Card className="glass-card hover-lift transition-all duration-300 border-border/20 dark:border-accent/30">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary dark:text-accent animate-scale-in">
            {vendor.onTimeDelivery}%
          </div>
          <div className="text-sm font-medium text-foreground dark:text-foreground/90 mt-2">On-Time Delivery</div>
          <div className="text-xs text-primary dark:text-accent mt-1 font-medium">Above average</div>
        </CardContent>
      </Card>
      <Card className="glass-card hover-lift transition-all duration-300 border-border/20 dark:border-accent/30">
        <CardContent className="p-6 text-center">
          <div className="text-3xl font-bold text-primary dark:text-accent animate-scale-in">
            {vendor.clientSatisfaction}
          </div>
          <div className="text-sm font-medium text-foreground dark:text-foreground/90 mt-2">Client Satisfaction</div>
          <div className="text-xs text-primary dark:text-accent mt-1 font-medium">Excellent rating</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VendorMetricsCards;
