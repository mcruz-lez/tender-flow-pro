import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Square, Users, Calendar, DollarSign } from "lucide-react";
import { Property } from "@/hooks/useProperties";
import { cn } from "@/lib/utils";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (id: string) => void;
  onCreateTender?: (propertyId: string) => void;
}

const glassCard =
  "rounded-2xl border-0 shadow-2xl bg-white/60 dark:bg-[#23234a]/80 backdrop-blur-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-indigo-400/30";
const badgePulse =
  "relative after:content-[''] after:absolute after:inset-0 after:rounded-full after:animate-pulse after:bg-current after:opacity-20";

export const PropertyCard = ({ property, onViewDetails, onCreateTender }: PropertyCardProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'inactive': return 'bg-gray-100 text-gray-800';
      case 'maintenance': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Card className={cn(glassCard, "group focus-within:ring-2 focus-within:ring-indigo-400/60 motion-safe:animate-fadeInUp")}
      tabIndex={0} aria-label={property.name}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg font-bold text-slate-900 dark:text-white drop-shadow-sm">
              {property.name}
            </CardTitle>
            <CardDescription className="mt-1 text-indigo-700 dark:text-indigo-200 font-medium">
              {property.property_type}
            </CardDescription>
          </div>
          <Badge className={cn(getStatusColor(property.status), badgePulse, "text-xs font-semibold px-3 py-1 shadow-md")}>{property.status.charAt(0).toUpperCase() + property.status.slice(1)}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-1">{property.address}</p>
        {property.description && (
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 italic">{property.description}</p>
        )}
        <div className="grid grid-cols-2 gap-4">
          {property.size_sqft && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <Square className="w-4 h-4 mr-2 text-indigo-400" />
              {property.size_sqft.toLocaleString()} sq ft
            </div>
          )}
          {property.units_count && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <Users className="w-4 h-4 mr-2 text-green-400" />
              {property.units_count} units
            </div>
          )}
          {property.year_built && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <Calendar className="w-4 h-4 mr-2 text-purple-400" />
              Built {property.year_built}
            </div>
          )}
          {property.budget_annual && (
            <div className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              <DollarSign className="w-4 h-4 mr-2 text-yellow-400" />
              €{property.budget_annual.toLocaleString()}
            </div>
          )}
        </div>
        <div className="flex gap-2 mt-2">
          <Button size="sm" className="bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold shadow-md rounded-lg transition-all hover:scale-105 animate-fadeInUp" onClick={() => onViewDetails(property.id)}>
            View Details
          </Button>
          {onCreateTender && (
            <Button size="sm" variant="outline" className="border-indigo-300 dark:border-indigo-700 text-indigo-700 dark:text-indigo-200 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 animate-fadeInUp" onClick={() => onCreateTender(property.id)}>
              Create Tender
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
