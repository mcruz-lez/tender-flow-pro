import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, FileText, Building } from "lucide-react";
import { Tender } from "@/hooks/useTenders";
import { Bid } from "@/hooks/useBids";
import { Contract } from "@/hooks/useContracts";

interface AlertsCardProps {
  tenders?: Tender[];
  bids?: Bid[];
  contracts?: Contract[];
}

export const AlertsCard = ({ tenders, bids, contracts }: AlertsCardProps) => {
  const tendersClosingSoon =
    tenders?.filter((t) => {
      if (!t.submission_deadline) return false;
      const deadline = new Date(t.submission_deadline);
      const now = new Date();
      const daysLeft = Math.ceil(
        (deadline.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      return daysLeft <= 7 && daysLeft > 0;
    }).length || 0;

  const pendingEvaluations =
    bids?.filter((b) => b.status === "submitted").length || 0;

  const contractRenewals =
    contracts?.filter((c) => {
      if (!c.end_date) return false;
      const endDate = new Date(c.end_date);
      const now = new Date();
      const daysLeft = Math.ceil(
        (endDate.getTime() - now.getTime()) / (1000 * 60 * 60 * 24),
      );
      return daysLeft <= 30 && daysLeft > 0;
    }).length || 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center">
          <AlertTriangle className="w-5 h-5 mr-2" />
          Alerts & Actions
        </CardTitle>
        <CardDescription>Items requiring attention</CardDescription>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between p-2 bg-orange-50 rounded-lg">
          <div className="flex items-center">
            <Clock className="w-4 h-4 text-orange-600 mr-2" />
            <span className="text-sm">Tenders Closing Soon</span>
          </div>
          <Badge variant="outline" className="text-orange-600">
            {tendersClosingSoon}
          </Badge>
        </div>

        <div className="flex items-center justify-between p-2 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <FileText className="w-4 h-4 text-blue-600 mr-2" />
            <span className="text-sm">Pending Evaluations</span>
          </div>
          <Badge variant="outline" className="text-blue-600">
            {pendingEvaluations}
          </Badge>
        </div>

        <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <Building className="w-4 h-4 text-green-600 mr-2" />
            <span className="text-sm">Contract Renewals</span>
          </div>
          <Badge variant="outline" className="text-green-600">
            {contractRenewals}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
