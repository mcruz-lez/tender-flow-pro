import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign } from "lucide-react";
import { Tender } from "@/hooks/useTenders";
import { cn } from "@/lib/utils";

interface TenderCardProps {
  tender: Tender;
  onViewDetails: (id: string) => void;
  onSubmitBid?: (id: string) => void;
}

const glassCard =
  "rounded-2xl border-0 shadow-2xl bg-white/60 dark:bg-[#23234a]/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-400/30";
const badgePulse =
  "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-pulse after:bg-current after:opacity-20";

export const TenderCard = ({ tender, onViewDetails, onSubmitBid }: TenderCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'draft': return 'bg-gray-100 text-gray-800';
      case 'closed': return 'bg-red-100 text-red-800';
      case 'awarded': return 'bg-blue-100 text-blue-800';
      case 'cancelled': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatBudget = (min?: number, max?: number) => {
    if (!min && !max) return 'Budget not specified';
    if (min && max) return `$${min.toLocaleString()} - $${max.toLocaleString()}`;
    if (min) return `From $${min.toLocaleString()}`;
    if (max) return `Up to $${max.toLocaleString()}`;
  };

  const isDeadlineNear = (deadline?: string) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const now = new Date();
    const daysUntilDeadline = Math.ceil((deadlineDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return daysUntilDeadline <= 7 && daysUntilDeadline > 0;
  };

  // Remove usage of 'any' for deadline
  const deadline: string = (tender as Tender & { deadline?: string }).deadline || tender.created_at;

  return (
    <Card className={cn(glassCard, "group focus-within:ring-2 focus-within:ring-indigo-400/60 motion-safe:animate-fadeInUp")}
      tabIndex={0} aria-label={tender.title}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-white drop-shadow-sm">
              {tender.title}
            </CardTitle>
            <CardDescription className="mt-1 text-indigo-700 dark:text-indigo-200 font-medium">
              {tender.category} ︲ {tender.tender_type}
            </CardDescription>
          </div>
          <Badge className={cn(getStatusColor(tender.status), badgePulse, "text-xs font-semibold px-3 py-1 shadow-md")}>{tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {tender.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-3 italic">{tender.description}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          {tender.budget_min || tender.budget_max ? (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
              {formatBudget(tender.budget_min, tender.budget_max)}
            </div>
          ) : null}
          {deadline && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-purple-400" />
              {deadline}
              {isDeadlineNear(deadline) && <span className="ml-2 text-xs text-red-500 animate-pulse">Closing Soon</span>}
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-md rounded-lg transition-all hover:scale-105 animate-fadeInUp" onClick={() => onViewDetails(tender.id)}>
            View Details
          </Button>
          {onSubmitBid && (
            <Button size="sm" variant="outline" className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 animate-fadeInUp" onClick={() => onSubmitBid(tender.id)}>
              Submit Bid
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
