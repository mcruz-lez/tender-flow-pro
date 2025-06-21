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
  { action: "Import", file: "vendors.csv", date: "2025-06-10" },
  { action: "Export", file: "tenders.xlsx", date: "2025-06-15" },
];

const dataStats = [
  { label: "Imports", value: 12 },
  { label: "Exports", value: 8 },
  { label: "Archives", value: 3 },
];

const activityData = [
  { month: "Jan", actions: 5 },
  { month: "Feb", actions: 7 },
  { month: "Mar", actions: 6 },
  { month: "Apr", actions: 8 },
  { month: "May", actions: 9 },
  { month: "Jun", actions: 10 },
];

const aiInsights = [
  "AI recommends regular data backups.",
  "Consider automating import validation.",
  "8 archived files are older than 1 year.",
];

const DataManagement = () => {
  const [logs, setLogs] = useState(initialLogs);
  const [file, setFile] = useState("");
  const [action, setAction] = useState("Import");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (file.trim()) {
      setLogs([
        {
          action,
          file: file.trim(),
          date: new Date().toISOString().slice(0, 10),
        },
        ...logs,
      ]);
      setFile("");
      setSubmitted(true);
      setTimeout(() => setSubmitted(false), 2000);
    }
  };

  return (
    <PageTemplate
      title="Data Management"
      description="Manage data import, export, and archiving"
    >
      <form className="mb-6 flex gap-2" onSubmit={handleSubmit}>
        <select
          className="border rounded p-2"
          value={action}
          onChange={(e) => setAction(e.target.value)}
        >
          <option value="Import">Import</option>
          <option value="Export">Export</option>
        </select>
        <input
          className="flex-1 border rounded p-2"
          placeholder="File name..."
          value={file}
          onChange={(e) => setFile(e.target.value)}
          required
        />
        <Button type="submit">Submit</Button>
      </form>
      {submitted && <div className="mb-4 text-green-600">Action logged!</div>}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {dataStats.map((item, idx) => (
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
            <CardTitle>Data Activity Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={activityData}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="actions" fill="#3b82f6" name="Actions" />
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
              <a href="/admin/logs">Logs</a>
            </Button>
            <Button asChild size="sm" variant="outline">
              <a href="/docs/data-management">Docs</a>
            </Button>
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default DataManagement;
