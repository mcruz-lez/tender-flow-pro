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
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Lightbulb } from "lucide-react";
import { Button } from "@/components/ui/button";

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

  const notificationStats = [
    { label: "Unread", value: 7 },
    { label: "Total", value: 32 },
    { label: "Rules", value: 5 },
  ];

  const activityData = [
    { day: "Mon", notifications: 8 },
    { day: "Tue", notifications: 6 },
    { day: "Wed", notifications: 7 },
    { day: "Thu", notifications: 5 },
    { day: "Fri", notifications: 6 },
  ];

  const aiInsights = [
    "AI suggests enabling critical alerts for tenders.",
    "2 rules have not triggered in 30 days.",
    "Consider reviewing notification categories.",
  ];

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
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              {notificationStats.map((item, idx) => (
                <Card key={idx} className="text-center">
                  <CardHeader><CardTitle>{item.label}</CardTitle></CardHeader>
                  <CardContent className="text-2xl font-bold">{item.value}</CardContent>
                </Card>
              ))}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <Card>
                <CardHeader><CardTitle>Notification Activity Trend</CardTitle></CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={200}>
                    <BarChart data={activityData}>
                      <XAxis dataKey="day" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="notifications" fill="#3b82f6" name="Notifications" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
                <CardContent>
                  <ul className="list-disc list-inside space-y-2 text-gray-700">
                    {aiInsights.map((insight, idx) => <li key={idx}><Lightbulb className="inline w-4 h-4 mr-1 text-yellow-500" />{insight}</li>)}
                  </ul>
                </CardContent>
              </Card>
            </div>
            <Button asChild size="sm" variant="outline"><a href="/settings/notifications">Settings</a></Button>
            <Button asChild size="sm" variant="outline"><a href="/settings/rules">Rules</a></Button>
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
