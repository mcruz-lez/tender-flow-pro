
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, DollarSign, MapPin, Clock } from "lucide-react";
import { Tender } from "@/hooks/useTenders";
import { format } from "date-fns";

interface TenderCardProps {
  tender: Tender;
  onViewDetails: (id: string) => void;
  onSubmitBid?: (id: string) => void;
}

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

  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{tender.title}</CardTitle>
            <CardDescription className="mt-1">{tender.category} • {tender.tender_type}</CardDescription>
          </div>
          <Badge className={getStatusColor(tender.status)}>
            {tender.status.charAt(0).toUpperCase() + tender.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {tender.description && (
          <p className="text-sm text-gray-600 line-clamp-3">{tender.description}</p>
        )}
        
        <div className="space-y-2">
          <div className="flex items-center text-sm text-gray-500">
            <DollarSign className="w-4 h-4 mr-2" />
            {formatBudget(tender.budget_min, tender.budget_max)}
          </div>
          
          {tender.submission_deadline && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              <span>Deadline: {format(new Date(tender.submission_deadline), 'MMM dd, yyyy')}</span>
              {isDeadlineNear(tender.submission_deadline) && (
                <Clock className="w-4 h-4 ml-2 text-orange-500" />
              )}
            </div>
          )}
          
          <div className="flex items-center text-sm text-gray-500">
            <MapPin className="w-4 h-4 mr-2" />
            Posted {format(new Date(tender.created_at), 'MMM dd, yyyy')}
          </div>
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(tender.id)}
            className="flex-1"
          >
            View Details
          </Button>
          {onSubmitBid && tender.status === 'active' && (
            <Button 
              size="sm" 
              onClick={() => onSubmitBid(tender.id)}
              className="flex-1"
            >
              Submit Bid
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
