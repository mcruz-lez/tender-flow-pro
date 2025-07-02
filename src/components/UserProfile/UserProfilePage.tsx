import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  User, 
  Shield, 
  CreditCard, 
  Bell, 
  Settings, 
  Building,
  Camera,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { getUserRole, getRoleDisplayName, getAllowedFeatures } from "@/api/rbac";
import type { Tables } from "@/integrations/supabase/types";

type Profile = Tables<"profiles">;
type UserRole = Tables<"user_roles">;
type SubscriptionPreferences = Tables<"subscription_preferences">;
type PaymentMethod = Tables<"payment_methods">;

interface UserProfileData extends Profile {
  user_role?: UserRole;
  subscription_preferences?: SubscriptionPreferences;
  payment_methods?: PaymentMethod[];
}

export default function UserProfilePage() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [activeTab, setActiveTab] = useState("profile");

  // Form states
  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    job_title: "",
    department: "",
    timezone: "UTC",
    language_preference: "en",
  });

  const [notificationPrefs, setNotificationPrefs] = useState({
    email: true,
    sms: false,
    push: true,
  });

  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);

  useEffect(() => {
    if (user) {
      loadUserProfile();
    }
  }, [user]);

  const loadUserProfile = async () => {
    if (!user) return;

    try {
      setLoading(true);

      // Load profile data
      const { data: profileData, error: profileError } = await supabase
        .from("profiles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      if (profileError && profileError.code !== "PGRST116") {
        throw profileError;
      }

      // Load user role
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("*")
        .eq("user_id", user.id)
        .single();

      // Load subscription preferences
      const { data: subscriptionData } = await supabase
        .from("subscription_preferences")
        .select("*")
        .eq("user_id", user.id)
        .single();

      // Load payment methods
      const { data: paymentMethodsData } = await supabase
        .from("payment_methods")
        .select("*")
        .eq("user_id", user.id);

      const fullProfile: UserProfileData = {
        ...profileData,
        user_role: roleData || undefined,
        subscription_preferences: subscriptionData || undefined,
        payment_methods: paymentMethodsData || [],
      };

      setProfile(fullProfile);

      if (profileData) {
        setFormData({
          first_name: profileData.first_name || "",
          last_name: profileData.last_name || "",
          email: profileData.email || "",
          phone: profileData.phone || "",
          job_title: profileData.job_title || "",
          department: profileData.department || "",
          timezone: profileData.timezone || "UTC",
          language_preference: profileData.language_preference || "en",
        });

        if (profileData.notification_preferences) {
          setNotificationPrefs(profileData.notification_preferences as any);
        }

        setTwoFactorEnabled(profileData.two_factor_enabled || false);
      }
    } catch (error) {
      console.error("Error loading profile:", error);
      toast.error("Failed to load profile");
    } finally {
      setLoading(false);
    }
  };

  const saveProfile = async () => {
    if (!user) return;

    try {
      setSaving(true);

      const updateData = {
        ...formData,
        notification_preferences: notificationPrefs,
        two_factor_enabled: twoFactorEnabled,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("user_id", user.id);

      if (error) throw error;

      toast.success("Profile updated successfully");
      await loadUserProfile(); // Reload to get updated completion percentage
    } catch (error) {
      console.error("Error saving profile:", error);
      toast.error("Failed to save profile");
    } finally {
      setSaving(false);
    }
  };

  const handleCustomerPortal = async () => {
    try {
      const { data, error } = await supabase.functions.invoke("customer-portal");
      
      if (error) throw error;
      
      if (data?.url) {
        window.open(data.url, '_blank');
      }
    } catch (error) {
      console.error("Error opening customer portal:", error);
      toast.error("Failed to open customer portal");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p>Loading profile...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="text-center py-8">
        <p>Please log in to view your profile.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header */}
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center space-x-4">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url || ""} />
                <AvatarFallback>
                  {formData.first_name?.[0]}{formData.last_name?.[0]}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h1 className="text-2xl font-bold">
                  {formData.first_name} {formData.last_name}
                </h1>
                <p className="text-muted-foreground">{formData.email}</p>
                {profile?.user_role && (
                  <Badge variant="secondary" className="mt-1">
                    {getRoleDisplayName(profile.user_role.role)}
                  </Badge>
                )}
              </div>
              <div className="text-right">
                <div className="text-sm text-muted-foreground mb-1">
                  Profile Completion
                </div>
                <div className="flex items-center space-x-2">
                  <Progress 
                    value={profile?.profile_completion_percentage || 0} 
                    className="w-24" 
                  />
                  <span className="text-sm font-medium">
                    {profile?.profile_completion_percentage || 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Profile Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="h-4 w-4" />
              <span>Profile</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center space-x-2">
              <Shield className="h-4 w-4" />
              <span>Security</span>
            </TabsTrigger>
            <TabsTrigger value="billing" className="flex items-center space-x-2">
              <CreditCard className="h-4 w-4" />
              <span>Billing</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center space-x-2">
              <Bell className="h-4 w-4" />
              <span>Notifications</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="first_name">First Name</Label>
                    <Input
                      id="first_name"
                      value={formData.first_name}
                      onChange={(e) => setFormData({...formData, first_name: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="last_name">Last Name</Label>
                    <Input
                      id="last_name"
                      value={formData.last_name}
                      onChange={(e) => setFormData({...formData, last_name: e.target.value})}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div>
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({...formData, phone: e.target.value})}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="job_title">Job Title</Label>
                    <Input
                      id="job_title"
                      value={formData.job_title}
                      onChange={(e) => setFormData({...formData, job_title: e.target.value})}
                    />
                  </div>
                  <div>
                    <Label htmlFor="department">Department</Label>
                    <Input
                      id="department"
                      value={formData.department}
                      onChange={(e) => setFormData({...formData, department: e.target.value})}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="timezone">Timezone</Label>
                    <select
                      id="timezone"
                      value={formData.timezone}
                      onChange={(e) => setFormData({...formData, timezone: e.target.value})}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    >
                      <option value="UTC">UTC</option>
                      <option value="America/New_York">Eastern Time</option>
                      <option value="America/Chicago">Central Time</option>
                      <option value="America/Denver">Mountain Time</option>
                      <option value="America/Los_Angeles">Pacific Time</option>
                    </select>
                  </div>
                  <div>
                    <Label htmlFor="language">Language</Label>
                    <select
                      id="language"
                      value={formData.language_preference}
                      onChange={(e) => setFormData({...formData, language_preference: e.target.value})}
                      className="w-full px-3 py-2 border border-input rounded-md"
                    >
                      <option value="en">English</option>
                      <option value="es">Spanish</option>
                      <option value="fr">French</option>
                    </select>
                  </div>
                </div>

                <Button onClick={saveProfile} disabled={saving}>
                  {saving ? "Saving..." : "Save Changes"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Switch
                    checked={twoFactorEnabled}
                    onCheckedChange={setTwoFactorEnabled}
                  />
                </div>

                <div className="pt-4">
                  <Button variant="outline">
                    Change Password
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Subscription & Billing</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {profile?.subscription_preferences ? (
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="font-medium">Current Plan</h3>
                        <p className="text-sm text-muted-foreground">
                          {profile.subscription_preferences.plan_type.charAt(0).toUpperCase() + 
                           profile.subscription_preferences.plan_type.slice(1)} Plan
                        </p>
                      </div>
                      <Badge variant="default">Active</Badge>
                    </div>
                    
                    <Button onClick={handleCustomerPortal} variant="outline">
                      Manage Subscription
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-muted-foreground mb-4">
                      No active subscription found
                    </p>
                    <Button>Subscribe Now</Button>
                  </div>
                )}

                {profile?.payment_methods && profile.payment_methods.length > 0 && (
                  <div className="mt-6">
                    <h3 className="font-medium mb-3">Payment Methods</h3>
                    <div className="space-y-2">
                      {profile.payment_methods.map((method) => (
                        <div key={method.id} className="flex items-center justify-between p-3 border rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CreditCard className="h-4 w-4" />
                            <div>
                              <p className="font-medium">
                                **** **** **** {method.card_last_four}
                              </p>
                              <p className="text-sm text-muted-foreground">
                                {method.card_brand?.toUpperCase()}
                              </p>
                            </div>
                          </div>
                          {method.is_default && (
                            <Badge variant="secondary">Default</Badge>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label>Email Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch
                    checked={notificationPrefs.email}
                    onCheckedChange={(checked) => 
                      setNotificationPrefs({...notificationPrefs, email: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>SMS Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via SMS
                    </p>
                  </div>
                  <Switch
                    checked={notificationPrefs.sms}
                    onCheckedChange={(checked) => 
                      setNotificationPrefs({...notificationPrefs, sms: checked})
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <Label>Push Notifications</Label>
                    <p className="text-sm text-muted-foreground">
                      Receive push notifications in your browser
                    </p>
                  </div>
                  <Switch
                    checked={notificationPrefs.push}
                    onCheckedChange={(checked) => 
                      setNotificationPrefs({...notificationPrefs, push: checked})
                    }
                  />
                </div>

                <Button onClick={saveProfile} disabled={saving}>
                  {saving ? "Saving..." : "Save Preferences"}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Role-based Feature Access */}
        {profile?.user_role && (
          <Card>
            <CardHeader>
              <CardTitle>Your Access Level</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground">
                  As a {getRoleDisplayName(profile.user_role.role)}, you have access to:
                </p>
                <div className="grid grid-cols-2 gap-2">
                  {getAllowedFeatures(profile.user_role.role).map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle2 className="h-4 w-4 text-green-500" />
                      <span className="text-sm capitalize">
                        {feature.replace('_', ' ')}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}