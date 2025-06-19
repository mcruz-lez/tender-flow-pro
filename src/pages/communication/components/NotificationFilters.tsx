
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

interface NotificationFiltersProps {
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  selectedFilter: string;
  setSelectedFilter: (value: string) => void;
  markAllAsRead: () => void;
}

const NotificationFilters = ({ 
  searchTerm, 
  setSearchTerm, 
  selectedFilter, 
  setSelectedFilter, 
  markAllAsRead 
}: NotificationFiltersProps) => {
  return (
    <div className="flex gap-2 flex-wrap">
      <Input
        placeholder="Search notifications..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="max-w-sm"
      />
      <Button 
        variant={selectedFilter === "all" ? "default" : "outline"} 
        size="sm"
        onClick={() => setSelectedFilter("all")}
      >
        All
      </Button>
      <Button 
        variant={selectedFilter === "unread" ? "default" : "outline"} 
        size="sm"
        onClick={() => setSelectedFilter("unread")}
      >
        Unread
      </Button>
      <Button 
        variant={selectedFilter === "high" ? "default" : "outline"} 
        size="sm"
        onClick={() => setSelectedFilter("high")}
      >
        High Priority
      </Button>
      <Button onClick={markAllAsRead} variant="outline" size="sm">
        <CheckCircle className="w-4 h-4 mr-2" />
        Mark All Read
      </Button>
    </div>
  );
};

export default NotificationFilters;
