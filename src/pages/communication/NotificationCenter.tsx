
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CheckCircle, Settings, Bell } from "lucide-react";
import { toast } from "sonner";
import NotificationStats from "./components/NotificationStats";
import NotificationItem from "./components/NotificationItem";
import NotificationFilters from "./components/NotificationFilters";
import NotificationSettings from "./components/NotificationSettings";
import NotificationRules from "./components/NotificationRules";
import NotificationHistory from "./components/NotificationHistory";

const NotificationCenter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilter, setSelectedFilter] = useState("all");

  const quickActions = [
    { label: "Mark All Read", href: "#", icon: CheckCircle },
    { label: "Settings", href: "#", icon: Settings },
    { label: "Create Rule", href: "#", icon: Bell, variant: "outline" as const }
  ];

  const notifications = [
    {
      id: "1",
      title: "New bid submitted for HVAC Maintenance Contract",
      message: "Elite Construction Co. has submitted their bid for review",
      type: "bid",
      priority: "high",
      timestamp: "2 minutes ago",
      read: false,
      category: "Bid Management",
      source: "System",
      tender: "HVAC Maintenance Contract"
    },
    {
      id: "2",
      title: "Tender deadline approaching",
      message: "Security Services Contract deadline is in 24 hours",
      type: "deadline",
      priority: "medium",
      timestamp: "1 hour ago",
      read: false,
      category: "Tender Management",
      source: "System",
      tender: "Security Services Contract"
    },
    {
      id: "3",
      title: "Q&A response required",
      message: "ProClean Services has asked a question about environmental compliance",
      type: "qa",
      priority: "medium",
      timestamp: "3 hours ago",
      read: true,
      category: "Communication",
      source: "User",
      tender: "Cleaning Services Contract"
    },
    {
      id: "4",
      title: "Evaluation meeting scheduled",
      message: "Evaluation meeting for IT Support Contract scheduled for tomorrow at 2 PM",
      type: "meeting",
      priority: "low",
      timestamp: "1 day ago",
      read: true,
      category: "Evaluation",
      source: "Calendar",
      tender: "IT Support Contract"
    },
    {
      id: "5",
      title: "Document uploaded",
      message: "Updated insurance certificate uploaded by SecureGuard Solutions",
      type: "document",
      priority: "low",
      timestamp: "2 days ago",
      read: true,
      category: "Document Management",
      source: "User",
      tender: "Security Services Contract"
    }
  ];

  const notificationSettings = {
    email: true,
    push: true,
    sms: false,
    desktop: true,
    bidSubmissions: true,
    deadlineReminders: true,
    qaUpdates: true,
    evaluationAlerts: true,
    contractUpdates: true,
    systemMaintenance: false
  };

  const stats = {
    unread: notifications.filter(n => !n.read).length,
    total: notifications.length,
    high: notifications.filter(n => n.priority === "high").length,
    medium: notifications.filter(n => n.priority === "medium").length
  };

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "unread" && !notification.read) ||
                         (selectedFilter === "read" && notification.read) ||
                         notification.priority === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const markAllAsRead = () => {
    toast.success("All notifications marked as read");
  };

  return (
    <PageTemplate
      title="Notification Center"
      description="Manage notifications and alerts"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        <NotificationStats stats={stats} />

        <Tabs defaultValue="notifications" className="space-y-6">
          <TabsList>
            <TabsTrigger value="notifications">Notifications ({stats.unread})</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
            <TabsTrigger value="rules">Rules</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
          </TabsList>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>All Notifications</CardTitle>
                <CardDescription>Stay updated with real-time alerts</CardDescription>
                <NotificationFilters
                  searchTerm={searchTerm}
                  setSearchTerm={setSearchTerm}
                  selectedFilter={selectedFilter}
                  setSelectedFilter={setSelectedFilter}
                  markAllAsRead={markAllAsRead}
                />
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => (
                    <NotificationItem key={notification.id} notification={notification} />
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <NotificationSettings notificationSettings={notificationSettings} />
          </TabsContent>

          <TabsContent value="rules">
            <NotificationRules />
          </TabsContent>

          <TabsContent value="history">
            <NotificationHistory />
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default NotificationCenter;
