import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialSettings = {
  notifications: true,
  autoBackup: false,
  darkMode: false
};

const SystemConfiguration = () => {
  const [settings, setSettings] = useState(initialSettings);
  const [saved, setSaved] = useState(false);

  const handleToggle = (key: keyof typeof settings) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const handleSave = () => {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <PageTemplate
      title="System Configuration"
      description="Configure system settings and preferences"
    >
      <div className="space-y-4 mb-4">
        {Object.entries(settings).map(([key, value]) => (
          <div key={key} className="flex items-center gap-4">
            <span className="capitalize">{key}</span>
            <input type="checkbox" checked={value} onChange={() => handleToggle(key as keyof typeof settings)} />
          </div>
        ))}
      </div>
      <Button onClick={handleSave}>Save Settings</Button>
      {saved && <div className="text-green-600 mt-2">Settings saved!</div>}
    </PageTemplate>
  );
};

export default SystemConfiguration;
