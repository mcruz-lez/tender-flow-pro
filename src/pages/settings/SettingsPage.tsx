import { useAuth } from "@/contexts/AuthContext";
import { toast } from "sonner";
import {
  getUserSettings,
  updateUserSettings,
} from "@/integrations/supabase/api";
import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { canAccess } from "@/api/rbac";

export default function SettingsPage() {
  const { user } = useAuth();
  const [settings, setSettings] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState("light");
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState("en");

  useEffect(() => {
    if (user) {
      getUserSettings(user.id)
        .then((data) => {
          setSettings(data);
          setTheme(data?.theme || "light");
          setNotifications(data?.notifications ?? true);
          setLanguage(data?.language || "en");
        })
        .catch(() => toast.error("Failed to load settings"))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const save = async () => {
    if (!user) return;
    setLoading(true);
    try {
      await updateUserSettings(user.id, { theme, notifications, language });
      toast.success("Settings updated");
    } catch {
      toast.error("Failed to update settings");
    }
    setLoading(false);
  };

  if (!user)
    return (
      <div className="p-8 text-center">
        Please sign in to manage your settings.
      </div>
    );
  if (
    !canAccess(
      { role: user.role || user.user_metadata?.role || "user" },
      "settings",
      "read",
    )
  )
    return <div className="p-8 text-center text-red-500">Access denied.</div>;
  if (loading) return <div className="p-8 text-center">Loading...</div>;

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Theme</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="system">System</option>
          </select>
        </div>
        <div className="flex items-center gap-2">
          <label className="font-medium">Enable Notifications</label>
          <Switch checked={notifications} onCheckedChange={setNotifications} />
        </div>
        <div>
          <label className="block mb-1 font-medium">Language</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border rounded p-2"
          >
            <option value="en">English</option>
            <option value="fr">French</option>
            <option value="es">Spanish</option>
          </select>
        </div>
        <Button onClick={save} className="w-full mt-4" disabled={loading}>
          {loading ? "Saving..." : "Save Settings"}
        </Button>
      </CardContent>
    </Card>
  );
}
