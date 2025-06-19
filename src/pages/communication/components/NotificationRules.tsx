
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Bell } from "lucide-react";

const NotificationRules = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Notification Rules</CardTitle>
        <CardDescription>Create custom rules for automated notifications</CardDescription>
        <Button>
          <Bell className="w-4 h-4 mr-2" />
          Create New Rule
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">High Priority Bid Alert</h4>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Send immediate notification when a bid is submitted for tenders with budget greater than $100,000
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <Badge variant="outline">Email</Badge>
              <Badge variant="outline">Push</Badge>
              <Badge variant="outline">High Priority</Badge>
            </div>
          </div>
          <div className="border rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-medium">Deadline Warning</h4>
              <Switch defaultChecked />
            </div>
            <p className="text-sm text-gray-600 mb-2">
              Send reminder 24 hours before tender deadline
            </p>
            <div className="flex items-center space-x-2 text-xs">
              <Badge variant="outline">Email</Badge>
              <Badge variant="outline">Medium Priority</Badge>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NotificationRules;
