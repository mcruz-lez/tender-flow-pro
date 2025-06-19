
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  Calendar, 
  AlertTriangle,
  CheckCircle,
  Info,
  Settings,
  Filter,
  Search,
  MoreHorizontal,
  Clock,
  User,
  Building
} from "lucide-react";
import { toast } from "sonner";

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

  const filteredNotifications = notifications.filter(notification => {
    const matchesSearch = notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === "all" || 
                         (selectedFilter === "unread" && !notification.read) ||
                         (selectedFilter === "read" && notification.read) ||
                         notification.priority === selectedFilter;
    return matchesSearch && matchesFilter;
  });

  const markAsRead = (id: string) => {
    toast.success("Notification marked as read");
  };

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
        {/* Statistics Cards */}
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

        {/* Main Content */}
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
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredNotifications.map((notification) => {
                    const TypeIcon = getTypeIcon(notification.type);
                    return (
                      <div
                        key={notification.id}
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
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="settings">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Delivery Preferences</CardTitle>
                  <CardDescription>Choose how you want to receive notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Email Notifications</Label>
                      <div className="text-sm text-gray-500">Receive notifications via email</div>
                    </div>
                    <Switch checked={notificationSettings.email} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Push Notifications</Label>
                      <div className="text-sm text-gray-500">Browser push notifications</div>
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
                  <CardDescription>Select which events trigger notifications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Bid Submissions</Label>
                      <div className="text-sm text-gray-500">New bids and bid updates</div>
                    </div>
                    <Switch checked={notificationSettings.bidSubmissions} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Deadline Reminders</Label>
                      <div className="text-sm text-gray-500">Tender and task deadlines</div>
                    </div>
                    <Switch checked={notificationSettings.deadlineReminders} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Q&A Updates</Label>
                      <div className="text-sm text-gray-500">New questions and answers</div>
                    </div>
                    <Switch checked={notificationSettings.qaUpdates} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Evaluation Alerts</Label>
                      <div className="text-sm text-gray-500">Evaluation process updates</div>
                    </div>
                    <Switch checked={notificationSettings.evaluationAlerts} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>Contract Updates</Label>
                      <div className="text-sm text-gray-500">Contract changes and renewals</div>
                    </div>
                    <Switch checked={notificationSettings.contractUpdates} />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label>System Maintenance</Label>
                      <div className="text-sm text-gray-500">Platform updates and maintenance</div>
                    </div>
                    <Switch checked={notificationSettings.systemMaintenance} />
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="rules">
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
                      Send immediate notification when a bid is submitted for tenders with budget > $100,000
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
          </TabsContent>

          <TabsContent value="history">
            <Card>
              <CardHeader>
                <CardTitle>Notification History</CardTitle>
                <CardDescription>View all past notifications and delivery status</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Clock className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Notification history will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default NotificationCenter;
