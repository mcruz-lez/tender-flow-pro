
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building, Square, Users, Calendar, DollarSign } from "lucide-react";
import { Property } from "@/hooks/useProperties";

interface PropertyCardProps {
  property: Property;
  onViewDetails: (id: string) => void;
  onCreateTender?: (propertyId: string) => void;
}

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
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <CardTitle className="text-lg">{property.name}</CardTitle>
            <CardDescription className="mt-1">{property.property_type}</CardDescription>
          </div>
          <Badge className={getStatusColor(property.status)}>
            {property.status.charAt(0).toUpperCase() + property.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        <p className="text-sm text-gray-600">{property.address}</p>
        
        {property.description && (
          <p className="text-sm text-gray-600 line-clamp-2">{property.description}</p>
        )}
        
        <div className="grid grid-cols-2 gap-4">
          {property.size_sqft && (
            <div className="flex items-center text-sm text-gray-500">
              <Square className="w-4 h-4 mr-2" />
              {property.size_sqft.toLocaleString()} sq ft
            </div>
          )}
          
          {property.units_count && (
            <div className="flex items-center text-sm text-gray-500">
              <Users className="w-4 h-4 mr-2" />
              {property.units_count} units
            </div>
          )}
          
          {property.year_built && (
            <div className="flex items-center text-sm text-gray-500">
              <Calendar className="w-4 h-4 mr-2" />
              Built {property.year_built}
            </div>
          )}
          
          {property.budget_annual && (
            <div className="flex items-center text-sm text-gray-500">
              <DollarSign className="w-4 h-4 mr-2" />
              ${property.budget_annual.toLocaleString()}/year
            </div>
          )}
        </div>
        
        <div className="flex gap-2 pt-2">
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewDetails(property.id)}
            className="flex-1"
          >
            View Details
          </Button>
          {onCreateTender && (
            <Button 
              size="sm" 
              onClick={() => onCreateTender(property.id)}
              className="flex-1"
            >
              Create Tender
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};
