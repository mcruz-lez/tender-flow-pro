import { useEffect, useState } from 'react';
import { getSetting, setSetting } from '@/api/settings';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';

export default function SettingsPage() {
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [language, setLanguage] = useState('en');
  const userId = 'CURRENT_USER_ID'; // Replace with actual user context

  useEffect(() => {
    getSetting({ userId, key: 'theme' }).then(val => val && setTheme(val));
    getSetting({ userId, key: 'notifications' }).then(val => setNotifications(val !== false));
    getSetting({ userId, key: 'language' }).then(val => val && setLanguage(val));
  }, [userId]);

  const save = async () => {
    await setSetting({ userId, key: 'theme', value: theme });
    await setSetting({ userId, key: 'notifications', value: notifications });
    await setSetting({ userId, key: 'language', value: language });
    alert('Settings saved!');
  };

  return (
    <Card className="max-w-xl mx-auto mt-10">
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <label className="block mb-1 font-medium">Theme</label>
          <select value={theme} onChange={e => setTheme(e.target.value)} className="w-full border rounded p-2">
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
          <Input value={language} onChange={e => setLanguage(e.target.value)} placeholder="en, fr, es..." />
        </div>
        <Button onClick={save} className="w-full mt-4">Save Settings</Button>
      </CardContent>
    </Card>
  );
}
