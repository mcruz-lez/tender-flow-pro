import { Link } from "react-router-dom";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Eye, Edit, Users, Star, Building } from "lucide-react";

interface Tender {
  id: string;
  title: string;
  category: string;
  status: string;
  deadline: string;
  publishDate: string;
  value: string;
  bids: number;
  views: number;
  location: string;
  priority: string;
  evaluationScore: number | null;
}

interface TenderCardProps {
  tender: Tender;
  getStatusColor: (status: string) => string;
  getPriorityColor: (priority: string) => string;
}

const TenderCard = ({
  tender,
  getStatusColor,
  getPriorityColor,
}: TenderCardProps) => {
  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl hover:shadow-blue-500/20 transition-all duration-300 transform hover:-translate-y-1">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start mb-2">
          <Badge className={getStatusColor(tender.status)}>
            {tender.status}
          </Badge>
          <Badge className={getPriorityColor(tender.priority)}>
            {tender.priority}
          </Badge>
        </div>
        <CardTitle className="text-lg text-white">{tender.title}</CardTitle>
        <CardDescription className="text-white/70">
          {tender.category}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="text-white/60">Value:</span>
            <p className="font-medium text-white">{tender.value}</p>
          </div>
          <div>
            <span className="text-white/60">Deadline:</span>
            <p className="font-medium text-white">{tender.deadline}</p>
          </div>
          <div>
            <span className="text-white/60">Bids:</span>
            <p className="font-medium text-white">{tender.bids}</p>
          </div>
          <div>
            <span className="text-white/60">Views:</span>
            <p className="font-medium text-white">{tender.views}</p>
          </div>
        </div>

        <div className="flex items-center gap-2 text-sm text-white/60">
          <Building className="w-4 h-4" />
          <span>{tender.location}</span>
        </div>

        {tender.evaluationScore && (
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-sm text-white">
              Score: {tender.evaluationScore}/100
            </span>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button
            asChild
            size="sm"
            className="flex-1 bg-blue-600 hover:bg-blue-700"
          >
            <Link to={`/tenders/tender/${tender.id}`}>
              <Eye className="w-4 h-4 mr-2" />
              View Details
            </Link>
          </Button>
          {tender.status === "Draft" && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Link to={`/tenders/edit/${tender.id}`}>
                <Edit className="w-4 h-4" />
              </Link>
            </Button>
          )}
          {tender.status === "Active" && (
            <Button
              asChild
              size="sm"
              variant="outline"
              className="border-white/20 text-white hover:bg-white/10"
            >
              <Link to={`/bids/submit/${tender.id}`}>
                <Users className="w-4 h-4" />
              </Link>
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TenderCard;
