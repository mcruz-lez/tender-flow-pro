import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Lightbulb } from "lucide-react";

const initialLogs = [
  { action: "User role updated", date: "2025-06-19" },
  { action: "System backup completed", date: "2025-06-18" },
];

const systemStats = [
  { label: "Backups", value: 6 },
  { label: "Role Changes", value: 4 },
  { label: "Logins Today", value: 18 },
];

const healthData = [
  { day: "Mon", uptime: 99.9 },
  { day: "Tue", uptime: 99.8 },
  { day: "Wed", uptime: 100 },
  { day: "Thu", uptime: 99.7 },
  { day: "Fri", uptime: 99.9 },
];

const aiInsights = [
  "AI recommends scheduling weekly system backups.",
  "No critical errors detected in the last 7 days.",
  "Consider reviewing admin access logs for anomalies.",
];

const SystemAdministration = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [action, setAction] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (action.trim()) {
      setLogs([
        { action: action.trim(), date: new Date().toISOString().slice(0, 10) },
        ...logs,
      ]);
      setAction("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <PageTemplate
      title="System Administration"
      description="Manage system settings and administration"
    >
      <form className="mb-6 flex gap-2" onSubmit={handleSubmit}>
        <input
          className="flex-1 border rounded p-2"
          placeholder="Admin action..."
          value={action}
          onChange={(e) => setAction(e.target.value)}
          required
        />
        <Button type="submit">Log Action</Button>
      </form>
      {submitted && <div className="mb-4 text-green-600">Action logged!</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {systemStats.map((item, idx) => (
          <Card key={idx} className="text-center">
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
            </CardHeader>
            <CardContent className="text-2xl font-bold">
              {item.value}
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>System Uptime</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={healthData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="uptime" fill="#3b82f6" name="Uptime (%)" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>AI Insights</CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {aiInsights.map((insight, idx) => (
                <li key={idx}>
                  <Lightbulb className="inline w-4 h-4 mr-1 text-yellow-500" />
                  {insight}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
      <ul className="space-y-2">
        {logs.map((log, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>
              {log.action}{" "}
              <span className="text-xs text-gray-500">({log.date})</span>
            </span>
            <Button asChild size="sm" variant="outline">
              <a href="/admin/system-configuration">Config</a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href="/admin/maintenance">Maintenance</a>
            </Button>
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default SystemAdministration;
