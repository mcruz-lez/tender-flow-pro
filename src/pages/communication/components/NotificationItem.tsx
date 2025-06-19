
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Building,
  Clock,
  MessageSquare,
  Calendar,
  CheckCircle,
  Info,
  MoreHorizontal
} from "lucide-react";
import { toast } from "sonner";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: string;
  priority: string;
  timestamp: string;
  read: boolean;
  category: string;
  source: string;
  tender: string;
}

interface NotificationItemProps {
  notification: Notification;
}

const NotificationItem = ({ notification }: NotificationItemProps) => {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "bid": return Building;
      case "deadline": return Clock;
      case "qa": return MessageSquare;
      case "meeting": return Calendar;
      case "document": return CheckCircle;
      default: return Info;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "bid": return "bg-blue-100 text-blue-800";
      case "deadline": return "bg-red-100 text-red-800";
      case "qa": return "bg-yellow-100 text-yellow-800";
      case "meeting": return "bg-purple-100 text-purple-800";
      case "document": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "high": return "bg-red-500";
      case "medium": return "bg-yellow-500";
      case "low": return "bg-green-500";
      default: return "bg-gray-500";
    }
  };

  const markAsRead = (id: string) => {
    toast.success("Notification marked as read");
  };

  const TypeIcon = getTypeIcon(notification.type);

  return (
    <div
      className={`flex items-start space-x-4 p-4 rounded-lg border ${
        !notification.read ? 'bg-blue-50 border-blue-200' : 'bg-white border-gray-200'
      }`}
    >
      <div className="flex-shrink-0">
        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getTypeColor(notification.type)}`}>
          <TypeIcon className="w-5 h-5" />
        </div>
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-1">
              <h4 className={`text-sm font-medium ${!notification.read ? 'font-semibold' : ''}`}>
                {notification.title}
              </h4>
              <div className={`w-2 h-2 rounded-full ${getPriorityColor(notification.priority)}`}></div>
              {!notification.read && (
                <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
              )}
            </div>
            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>{notification.timestamp}</span>
              <Badge variant="outline" className="text-xs">
                {notification.category}
              </Badge>
              <span>{notification.tender}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!notification.read && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={() => markAsRead(notification.id)}
              >
                <CheckCircle className="w-4 h-4" />
              </Button>
            )}
            <Button variant="ghost" size="sm">
              <MoreHorizontal className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotificationItem;
