
import { useState } from "react";
import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Send, 
  Search, 
  Filter, 
  Paperclip, 
  MoreHorizontal,
  User,
  Building,
  Clock,
  CheckCircle,
  Star,
  Archive,
  Trash2,
  Reply
} from "lucide-react";
import { toast } from "sonner";

const MessageCenter = () => {
  const [selectedConversation, setSelectedConversation] = useState("1");
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const quickActions = [
    { label: "New Message", href: "#", icon: Send },
    { label: "Compose Email", href: "/communication/email-sync", icon: Send },
    { label: "Broadcast", href: "/communication/announcements", icon: Send, variant: "outline" as const }
  ];

  const conversations = [
    {
      id: "1",
      participant: "Elite Construction Co.",
      lastMessage: "Thank you for the clarification on the HVAC specifications...",
      timestamp: "2 min ago",
      unread: true,
      priority: "High",
      avatar: "EC",
      type: "vendor",
      tender: "HVAC Maintenance Contract"
    },
    {
      id: "2",
      participant: "John Smith (Project Manager)",
      lastMessage: "The evaluation meeting is scheduled for tomorrow at 2 PM",
      timestamp: "1 hour ago",
      unread: false,
      priority: "Medium",
      avatar: "JS",
      type: "internal",
      tender: "Security Services"
    },
    {
      id: "3",
      participant: "ProClean Services",
      lastMessage: "We have uploaded the updated insurance documents",
      timestamp: "3 hours ago",
      unread: true,
      priority: "Low",
      avatar: "PS",
      type: "vendor",
      tender: "Cleaning Services Contract"
    }
  ];

  const messages = [
    {
      id: "1",
      sender: "Elite Construction Co.",
      content: "Thank you for the clarification on the HVAC specifications. We have reviewed the technical requirements and have a few additional questions regarding the maintenance schedule.",
      timestamp: "2024-01-19 14:30",
      isOwn: false,
      attachments: ["HVAC_Questions.pdf"]
    },
    {
      id: "2", 
      sender: "You",
      content: "Thank you for your response. Please feel free to ask any questions you may have. We want to ensure all bidders have the same level of information.",
      timestamp: "2024-01-19 14:15",
      isOwn: true,
      attachments: []
    },
    {
      id: "3",
      sender: "Elite Construction Co.",
      content: "We need clarification on the emergency response time requirements mentioned in section 3.2 of the tender document.",
      timestamp: "2024-01-19 13:45", 
      isOwn: false,
      attachments: []
    }
  ];

  const stats = {
    unread: 12,
    total: 45,
    archived: 23,
    starred: 8
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "High": return "bg-red-100 text-red-800";
      case "Medium": return "bg-yellow-100 text-yellow-800";
      case "Low": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getTypeIcon = (type: string) => {
    return type === "vendor" ? Building : User;
  };

  const handleSendMessage = () => {
    if (!newMessage.trim()) return;
    toast.success("Message sent successfully");
    setNewMessage("");
  };

  const filteredConversations = conversations.filter(conv =>
    conv.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
    conv.tender.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <PageTemplate
      title="Message Center"
      description="Manage all communications and messages"
      quickActions={quickActions}
    >
      <div className="space-y-6">
        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-blue-600">{stats.unread}</div>
              <div className="text-sm text-gray-600">Unread Messages</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-green-600">{stats.total}</div>
              <div className="text-sm text-gray-600">Total Conversations</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-purple-600">{stats.starred}</div>
              <div className="text-sm text-gray-600">Starred</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-4 text-center">
              <div className="text-2xl font-bold text-gray-600">{stats.archived}</div>
              <div className="text-sm text-gray-600">Archived</div>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs defaultValue="inbox" className="space-y-6">
          <TabsList>
            <TabsTrigger value="inbox">Inbox ({stats.unread})</TabsTrigger>
            <TabsTrigger value="sent">Sent</TabsTrigger>
            <TabsTrigger value="starred">Starred ({stats.starred})</TabsTrigger>
            <TabsTrigger value="archived">Archived</TabsTrigger>
          </TabsList>

          <TabsContent value="inbox">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Conversations List */}
              <Card className="lg:col-span-1">
                <CardHeader>
                  <CardTitle>Conversations</CardTitle>
                  <div className="flex gap-2">
                    <Input
                      placeholder="Search conversations..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="flex-1"
                    />
                    <Button variant="outline" size="sm">
                      <Filter className="w-4 h-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent className="p-0">
                  <div className="space-y-0">
                    {filteredConversations.map((conversation) => {
                      const TypeIcon = getTypeIcon(conversation.type);
                      return (
                        <div
                          key={conversation.id}
                          className={`p-4 border-b cursor-pointer hover:bg-gray-50 transition-colors ${
                            selectedConversation === conversation.id ? 'bg-blue-50 border-l-4 border-l-blue-500' : ''
                          }`}
                          onClick={() => setSelectedConversation(conversation.id)}
                        >
                          <div className="flex items-start space-x-3">
                            <Avatar className="w-10 h-10">
                              <AvatarFallback>{conversation.avatar}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center justify-between mb-1">
                                <div className="flex items-center space-x-2">
                                  <TypeIcon className="w-4 h-4 text-gray-500" />
                                  <span className="font-medium truncate">{conversation.participant}</span>
                                </div>
                                {conversation.unread && (
                                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                              </div>
                              <div className="flex items-center space-x-2 mb-2">
                                <Badge className={getPriorityColor(conversation.priority)} variant="outline">
                                  {conversation.priority}
                                </Badge>
                                <span className="text-xs text-gray-500">{conversation.tender}</span>
                              </div>
                              <p className="text-sm text-gray-600 truncate">{conversation.lastMessage}</p>
                              <div className="flex items-center justify-between mt-2">
                                <span className="text-xs text-gray-500">{conversation.timestamp}</span>
                                <div className="flex items-center space-x-1">
                                  <Button variant="ghost" size="sm">
                                    <Star className="w-3 h-3" />
                                  </Button>
                                  <Button variant="ghost" size="sm">
                                    <Archive className="w-3 h-3" />
                                  </Button>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>

              {/* Message Thread */}
              <Card className="lg:col-span-2">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <CardTitle>Elite Construction Co.</CardTitle>
                      <CardDescription>HVAC Maintenance Contract Discussion</CardDescription>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button variant="outline" size="sm">
                        <Reply className="w-4 h-4 mr-2" />
                        Reply
                      </Button>
                      <Button variant="outline" size="sm">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
                    {messages.map((message) => (
                      <div key={message.id} className={`flex ${message.isOwn ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[70%] ${message.isOwn ? 'bg-blue-500 text-white' : 'bg-gray-100'} rounded-lg p-3`}>
                          <div className="flex items-center justify-between mb-2">
                            <span className="font-medium text-sm">{message.sender}</span>
                            <span className="text-xs opacity-70">{message.timestamp}</span>
                          </div>
                          <p className="text-sm">{message.content}</p>
                          {message.attachments.length > 0 && (
                            <div className="mt-2 space-y-1">
                              {message.attachments.map((attachment, index) => (
                                <div key={index} className="flex items-center space-x-2 text-xs">
                                  <Paperclip className="w-3 h-3" />
                                  <span>{attachment}</span>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>

                  <Separator className="my-4" />

                  {/* Message Composer */}
                  <div className="space-y-3">
                    <Textarea
                      placeholder="Type your message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      rows={3}
                    />
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Button variant="outline" size="sm">
                          <Paperclip className="w-4 h-4 mr-2" />
                          Attach
                        </Button>
                        <Button variant="outline" size="sm">
                          Template
                        </Button>
                      </div>
                      <Button onClick={handleSendMessage}>
                        <Send className="w-4 h-4 mr-2" />
                        Send Message
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="sent">
            <Card>
              <CardHeader>
                <CardTitle>Sent Messages</CardTitle>
                <CardDescription>Messages you have sent</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Send className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Your sent messages will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="starred">
            <Card>
              <CardHeader>
                <CardTitle>Starred Messages</CardTitle>
                <CardDescription>Important messages you've starred</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Star className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Starred messages will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="archived">
            <Card>
              <CardHeader>
                <CardTitle>Archived Messages</CardTitle>
                <CardDescription>Archived conversations and messages</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-gray-500">
                  <Archive className="w-12 h-12 mx-auto mb-4 opacity-50" />
                  <p>Archived messages will appear here</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </PageTemplate>
  );
};

export default MessageCenter;
