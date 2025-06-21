import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

interface NotificationSettingsProps {
  notificationSettings: {
    email: boolean;
    push: boolean;
    sms: boolean;
    desktop: boolean;
    bidSubmissions: boolean;
    deadlineReminders: boolean;
    qaUpdates: boolean;
    evaluationAlerts: boolean;
    contractUpdates: boolean;
    systemMaintenance: boolean;
  };
}

const NotificationSettings = ({
  notificationSettings,
}: NotificationSettingsProps) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Delivery Preferences</CardTitle>
          <CardDescription>
            Choose how you want to receive notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Email Notifications</Label>
              <div className="text-sm text-gray-500">
                Receive notifications via email
              </div>
            </div>
            <Switch checked={notificationSettings.email} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Push Notifications</Label>
              <div className="text-sm text-gray-500">
                Browser push notifications
              </div>
            </div>
            <Switch checked={notificationSettings.push} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>SMS Notifications</Label>
              <div className="text-sm text-gray-500">Text message alerts</div>
            </div>
            <Switch checked={notificationSettings.sms} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Desktop Notifications</Label>
              <div className="text-sm text-gray-500">System desktop alerts</div>
            </div>
            <Switch checked={notificationSettings.desktop} />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Notification Types</CardTitle>
          <CardDescription>
            Select which events trigger notifications
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Bid Submissions</Label>
              <div className="text-sm text-gray-500">
                New bids and bid updates
              </div>
            </div>
            <Switch checked={notificationSettings.bidSubmissions} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Deadline Reminders</Label>
              <div className="text-sm text-gray-500">
                Tender and task deadlines
              </div>
            </div>
            <Switch checked={notificationSettings.deadlineReminders} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Q&A Updates</Label>
              <div className="text-sm text-gray-500">
                New questions and answers
              </div>
            </div>
            <Switch checked={notificationSettings.qaUpdates} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Evaluation Alerts</Label>
              <div className="text-sm text-gray-500">
                Evaluation process updates
              </div>
            </div>
            <Switch checked={notificationSettings.evaluationAlerts} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Contract Updates</Label>
              <div className="text-sm text-gray-500">
                Contract changes and renewals
              </div>
            </div>
            <Switch checked={notificationSettings.contractUpdates} />
          </div>
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>System Maintenance</Label>
              <div className="text-sm text-gray-500">
                Platform updates and maintenance
              </div>
            </div>
            <Switch checked={notificationSettings.systemMaintenance} />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NotificationSettings;
