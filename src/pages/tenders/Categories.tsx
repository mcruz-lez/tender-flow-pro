import React, { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Search, 
  Filter, 
  Wrench, 
  Building, 
  Zap, 
  Shield, 
  Droplets,
  Thermometer,
  Wifi,
  Car
} from "lucide-react";

const Categories = () => {
  const [searchTerm, setSearchTerm] = useState("");

  const categories = [
    {
      id: "maintenance",
      name: "Maintenance & Repairs",
      icon: Wrench,
      description: "General maintenance, repairs, and upkeep services",
      subcategories: ["HVAC", "Plumbing", "Electrical", "Roofing", "Painting"],
      activeContracts: 12,
      avgBudget: "$25,000"
    },
    {
      id: "construction",
      name: "Construction & Renovation", 
      icon: Building,
      description: "Major construction projects and renovations",
      subcategories: ["New Construction", "Renovations", "Structural Work"],
      activeContracts: 8,
      avgBudget: "$150,000"
    },
    {
      id: "electrical",
      name: "Electrical Services",
      icon: Zap,
      description: "Electrical installations, maintenance, and upgrades",
      subcategories: ["Installation", "Maintenance", "Upgrades", "Emergency"],
      activeContracts: 15,
      avgBudget: "$18,000"
    },
    {
      id: "security",
      name: "Security Services",
      icon: Shield,
      description: "Property security, monitoring, and access control",
      subcategories: ["Monitoring", "Access Control", "Patrol", "Installation"],
      activeContracts: 6,
      avgBudget: "$35,000"
    },
    {
      id: "plumbing",
      name: "Plumbing Services",
      icon: Droplets,
      description: "Plumbing installation, repair, and maintenance",
      subcategories: ["Repairs", "Installation", "Maintenance", "Emergency"],
      activeContracts: 18,
      avgBudget: "$12,000"
    },
    {
      id: "hvac",
      name: "HVAC Services",
      icon: Thermometer,
      description: "Heating, ventilation, and air conditioning services",
      subcategories: ["Installation", "Maintenance", "Repairs", "Upgrades"],
      activeContracts: 10,
      avgBudget: "$28,000"
    },
    {
      id: "technology",
      name: "Technology & IT",
      icon: Wifi,
      description: "IT services, networking, and technology solutions",
      subcategories: ["Network Setup", "Maintenance", "Support", "Upgrades"],
      activeContracts: 5,
      avgBudget: "$45,000"
    },
    {
      id: "parking",
      name: "Parking & Transportation",
      icon: Car,
      description: "Parking management and transportation services",
      subcategories: ["Parking Management", "Shuttle Services", "Maintenance"],
      activeContracts: 3,
      avgBudget: "$22,000"
    }
  ];

  const filteredCategories = categories.filter(category =>
    category.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    category.subcategories.some(sub => 
      sub.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  return (
    <PageTemplate
      title="Tender Categories"
      description="Browse and manage service categories for property tenders"
    >
      <div className="space-y-6">
        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search categories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="w-4 h-4" />
            Filters
          </Button>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredCategories.map((category) => {
            const Icon = category.icon;
            return (
              <Card key={category.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader className="pb-3">
                  <div className="flex items-center justify-between">
                    <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-primary" />
                    </div>
                    <Badge variant="secondary">{category.activeContracts}</Badge>
                  </div>
                  <CardTitle className="text-lg">{category.name}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                  
                  <div className="space-y-2">
                    <div className="text-xs font-medium text-muted-foreground">
                      SUBCATEGORIES
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {category.subcategories.slice(0, 3).map((sub) => (
                        <Badge key={sub} variant="outline" className="text-xs">
                          {sub}
                        </Badge>
                      ))}
                      {category.subcategories.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{category.subcategories.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Avg Budget:</span>
                    <span className="font-medium">{category.avgBudget}</span>
                  </div>

                  <Button className="w-full mt-4">
                    View Tenders
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {filteredCategories.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">
              No categories found matching your search.
            </p>
          </div>
        )}
      </div>
    </PageTemplate>
  );
};

export default Categories;
