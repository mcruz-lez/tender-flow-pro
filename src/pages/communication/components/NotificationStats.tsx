import { Card, CardContent } from "@/components/ui/card";
import { Bell, AlertTriangle, Info, CheckCircle } from "lucide-react";

interface NotificationStatsProps {
  stats: {
    unread: number;
    total: number;
    high: number;
    medium: number;
  };
}

const NotificationStats = ({ stats }: NotificationStatsProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      <Card>
        <CardContent className="p-4 text-center">
          <Bell className="w-8 h-8 text-blue-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.unread}</div>
          <div className="text-sm text-gray-600">Unread</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <AlertTriangle className="w-8 h-8 text-red-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.high}</div>
          <div className="text-sm text-gray-600">High Priority</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <Info className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.medium}</div>
          <div className="text-sm text-gray-600">Medium Priority</div>
        </CardContent>
      </Card>
      <Card>
        <CardContent className="p-4 text-center">
          <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
          <div className="text-2xl font-bold">{stats.total}</div>
          <div className="text-sm text-gray-600">Total</div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationStats;
