import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Megaphone,
  Plus,
  Edit,
  Eye,
  Send,
  Calendar as CalendarIcon,
  Users,
  Building,
  AlertTriangle,
  Info,
  CheckCircle,
  Clock,
  Filter,
  Search,
} from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";

const Announcements = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedAudience, setSelectedAudience] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [publishDate, setPublishDate] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState(false);

  const quickActions = [
    { label: "New Announcement", href: "#", icon: Plus },
    { label: "Schedule Broadcast", href: "#", icon: CalendarIcon },
    { label: "Templates", href: "#", icon: Edit, variant: "outline" as const },
  ];

  const announcements = [
    {
      id: "ANN-001",
      title: "System Maintenance Scheduled",
      content:
        "TendProcure platform will undergo scheduled maintenance on January 25, 2024 from 2:00 AM to 4:00 AM EST. The system will be temporarily unavailable during this period.",
      priority: "High",
      audience: "All Users",
      status: "Published",
      publishDate: "2024-01-19",
      scheduledDate: "2024-01-25",
      author: "System Administrator",
      views: 245,
      engagement: 89,
      channels: ["In-app", "Email"],
    },
    {
      id: "ANN-002",
      title: "New Feature: AI-Powered Bid Analysis",
      content:
        "We're excited to announce the launch of our new AI-powered bid analysis feature. This tool will help you evaluate bids more efficiently and make data-driven decisions.",
      priority: "Medium",
      audience: "Property Managers",
      status: "Published",
      publishDate: "2024-01-18",
      scheduledDate: "",
      author: "Product Team",
      views: 156,
      engagement: 67,
      channels: ["In-app", "Email", "Push"],
    },
    {
      id: "ANN-003",
      title: "Tender Document Template Updates",
      content:
        "Updated tender document templates are now available with improved formatting and additional compliance sections. Please review and update your active tenders accordingly.",
      priority: "Medium",
      audience: "Vendors",
      status: "Draft",
      publishDate: "",
      scheduledDate: "2024-01-22",
      author: "Compliance Team",
      views: 0,
      engagement: 0,
      channels: ["In-app"],
    },
    {
      id: "ANN-004",
      title: "Holiday Schedule Notice",
      content:
        "Please note that our support team will have limited availability during the holiday period from December 23 to January 2. Emergency support will still be available.",
      priority: "Low",
      audience: "All Users",
      status: "Archived",
      publishDate: "2023-12-20",
      scheduledDate: "",
      author: "Support Team",
      views: 523,
      engagement: 145,
      channels: ["In-app", "Email"],
    },
  ];

  const stats = {
    total: announcements.length,
    published: announcements.filter((a) => a.status === "Published").length,
    draft: announcements.filter((a) => a.status === "Draft").length,
    scheduled: announcements.filter(
      (a) => a.scheduledDate && a.status === "Draft",
    ).length,
  };

  const audienceOptions = [
    "All Users",
    "Property Managers",
    "Vendors",
    "Contractors",
    "Internal Team",
  ];
  const priorityOptions = ["High", "Medium", "Low"];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Published":
        return "bg-green-100 text-green-800";
      case "Draft":
        return "bg-yellow-100 text-yellow-800";
      case "Scheduled":
        return "bg-blue-100 text-blue-800";
      case "Archived":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High":
        return "bg-red-100 text-red-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "Low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPriorityIcon = (priority: string) => {
    switch (priority) {
      case "High":
        return AlertTriangle;
      case "Medium":
        return Info;
      case "Low":
        return CheckCircle;
      default:
        return Info;
    }
  };

  const getAudienceIcon = (audience: string) => {
    return audience === "All Users" ? Users : Building;
  };

  const filteredAnnouncements = announcements.filter((announcement) => {
    const matchesSearch =
      announcement.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      announcement.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesAudience =
      selectedAudience === "all" || announcement.audience === selectedAudience;
    const matchesPriority =
      selectedPriority === "all" || announcement.priority === selectedPriority;
    return matchesSearch && matchesAudience && matchesPriority;
  });

  const handlePublish = (id: string) => {
    toast.success("Announcement published successfully");
  };

  const handleSchedule = (id: string) => {
    toast.success("Announcement scheduled successfully");
  };

  const handleDuplicate = (id: string) => {
    toast.success("Announcement duplicated");
  };

  return (
    <PageTemplate
      title="Announcements"
      description="View and manage system announcements"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <Megaphone className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Announcements</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.published}</div>
              <div className="text-sm text-gray-600">Published</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Edit className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.draft}</div>
              <div className="text-sm text-gray-600">Draft</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <Clock className="w-8 h-8 text-purple-600 mx-auto mb-2" />
              <div className="text-2xl font-bold">{stats.scheduled}</div>
              <div className="text-sm text-gray-600">Scheduled</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="manage" className="space-y-6">
          <TabsList>
            <TabsTrigger value="manage">Manage</TabsTrigger>
            <TabsTrigger value="create">Create New</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>

          <TabsContent value="manage">
            <Card>
              <CardHeader>
                <CardTitle>All Announcements</CardTitle>
                <CardDescription>
                  Manage and track all system announcements
                </CardDescription>
                <div className="flex gap-2 flex-wrap">
                  <Input
                    placeholder="Search announcements..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="max-w-sm"
                  />
                  <Select
                    value={selectedAudience}
                    onValueChange={setSelectedAudience}
                  >
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Audience" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Audiences</SelectItem>
                      {audienceOptions.map((audience) => (
                        <SelectItem key={audience} value={audience}>
                          {audience}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Select
                    value={selectedPriority}
                    onValueChange={setSelectedPriority}
                  >
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Priorities</SelectItem>
                      {priorityOptions.map((priority) => (
                        <SelectItem key={priority} value={priority}>
                          {priority}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {filteredAnnouncements.map((announcement) => {
                    const PriorityIcon = getPriorityIcon(announcement.priority);
                    const AudienceIcon = getAudienceIcon(announcement.audience);

                    return (
                      <div
                        key={announcement.id}
                        className="border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="font-semibold text-lg">
                                {announcement.title}
                              </h3>
                              <Badge
                                className={getStatusColor(announcement.status)}
                              >
                                {announcement.status}
                              </Badge>
                              <Badge
                                className={getPriorityColor(
                                  announcement.priority,
                                )}
                                variant="outline"
                              >
                                <PriorityIcon className="w-3 h-3 mr-1" />
                                {announcement.priority}
                              </Badge>
                            </div>
                            <p className="text-gray-600 mb-3 line-clamp-2">
                              {announcement.content}
                            </p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center space-x-1">
                                <AudienceIcon className="w-4 h-4" />
                                <span>{announcement.audience}</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <CalendarIcon className="w-4 h-4" />
                                <span>
                                  {announcement.publishDate
                                    ? `Published ${announcement.publishDate}`
                                    : announcement.scheduledDate
                                      ? `Scheduled ${announcement.scheduledDate}`
                                      : "Draft"}
                                </span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <Eye className="w-4 h-4" />
                                <span>{announcement.views} views</span>
                              </div>
                              <div className="flex items-center space-x-1">
                                <span>
                                  {announcement.engagement}% engagement
                                </span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center space-x-2">
                            <Button variant="outline" size="sm">
                              <Eye className="w-4 h-4 mr-2" />
                              View
                            </Button>
                            <Button variant="outline" size="sm">
                              <Edit className="w-4 h-4 mr-2" />
                              Edit
                            </Button>
                            {announcement.status === "Draft" && (
                              <Button
                                size="sm"
                                onClick={() => handlePublish(announcement.id)}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                Publish
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-gray-500">
                              By {announcement.author}
                            </span>
                            <div className="flex space-x-1">
                              {announcement.channels.map((channel) => (
                                <Badge
                                  key={channel}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  {channel}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDuplicate(announcement.id)}
                          >
                            Duplicate
                          </Button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="create">
            <Card>
              <CardHeader>
                <CardTitle>Create New Announcement</CardTitle>
                <CardDescription>
                  Create and schedule announcements for your organization
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Title</label>
                    <Input placeholder="Enter announcement title..." />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Priority</label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        {priorityOptions.map((priority) => (
                          <SelectItem key={priority} value={priority}>
                            {priority}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Target Audience
                    </label>
                    <Select>
                      <SelectTrigger>
                        <SelectValue placeholder="Select audience" />
                      </SelectTrigger>
                      <SelectContent>
                        {audienceOptions.map((audience) => (
                          <SelectItem key={audience} value={audience}>
                            {audience}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">
                      Publish Date (Optional)
                    </label>
                    <Popover open={showCalendar} onOpenChange={setShowCalendar}>
                      <PopoverTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full justify-start text-left font-normal"
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {publishDate
                            ? format(publishDate, "PPP")
                            : "Select date to schedule"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={publishDate}
                          onSelect={(date) => {
                            setPublishDate(date);
                            setShowCalendar(false);
                          }}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Content</label>
                  <Textarea
                    placeholder="Enter announcement content..."
                    rows={6}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">
                    Distribution Channels
                  </label>
                  <div className="flex gap-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">In-app Notification</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked />
                      <span className="text-sm">Email</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">Push Notification</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" />
                      <span className="text-sm">SMS</span>
                    </label>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-6 border-t">
                  <Button variant="outline">Save as Draft</Button>
                  <div className="flex space-x-2">
                    {publishDate ? (
                      <Button onClick={() => handleSchedule("new")}>
                        <CalendarIcon className="w-4 h-4 mr-2" />
                        Schedule for {format(publishDate, "MMM d")}
                      </Button>
                    ) : (
                      <Button onClick={() => handlePublish("new")}>
                        <Send className="w-4 h-4 mr-2" />
                        Publish Now
                      </Button>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Engagement Metrics</CardTitle>
                  <CardDescription>
                    Announcement performance overview
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Total Views</span>
                      <span className="text-2xl font-bold text-blue-600">
                        924
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Average Engagement</span>
                      <span className="text-2xl font-bold text-green-600">
                        73%
                      </span>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Click-through Rate</span>
                      <span className="text-2xl font-bold text-purple-600">
                        12.5%
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Audience Reach</CardTitle>
                  <CardDescription>
                    Distribution by user segments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {audienceOptions.map((audience, index) => {
                      const percentage = Math.floor(Math.random() * 40) + 10;
                      return (
                        <div key={audience} className="space-y-1">
                          <div className="flex justify-between text-sm">
                            <span>{audience}</span>
                            <span>{percentage}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className="bg-blue-600 h-2 rounded-full"
                              style={{ width: `${percentage}%` }}
                            ></div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="templates">
            <Card>
              <CardHeader>
                <CardTitle>Announcement Templates</CardTitle>
                <CardDescription>
                  Pre-built templates for common announcements
                </CardDescription>
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Template
                </Button>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-2">System Maintenance</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Template for scheduled maintenance announcements
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">High Priority</Badge>
                      <Button size="sm" variant="outline">
                        Use Template
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-2">Feature Release</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Template for new feature announcements
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Medium Priority</Badge>
                      <Button size="sm" variant="outline">
                        Use Template
                      </Button>
                    </div>
                  </div>
                  <div className="border rounded-lg p-4 hover:bg-gray-50 cursor-pointer">
                    <h4 className="font-medium mb-2">Policy Update</h4>
                    <p className="text-sm text-gray-600 mb-3">
                      Template for policy and compliance updates
                    </p>
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">Medium Priority</Badge>
                      <Button size="sm" variant="outline">
                        Use Template
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default Announcements;
