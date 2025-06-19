
import { Card, CardContent } from "@/components/ui/card";
import { Building } from "lucide-react";

interface EmptyTenderStateProps {
  status: string;
}

const EmptyTenderState = ({ status }: EmptyTenderStateProps) => {
  const getEmptyStateMessage = (status: string) => {
    switch (status) {
      case "draft":
        return "Create a new tender to get started";
      case "active":
        return "Publish draft tenders to see them here";
      case "evaluation":
        return "Active tenders with bids will appear here";
      case "closed":
        return "Completed tenders will be listed here";
      default:
        return "No tenders found";
    }
  };

  return (
    <Card className="bg-white/10 backdrop-blur-xl border-white/20 shadow-2xl">
      <CardContent className="text-center py-8">
        <Building className="w-12 h-12 text-white/40 mx-auto mb-4" />
        <p className="text-white/60">No {status} tenders found</p>
        <p className="text-white/40 text-sm mt-2">
          {getEmptyStateMessage(status)}
        </p>
      </CardContent>
    </Card>
  );
};

export default EmptyTenderState;
