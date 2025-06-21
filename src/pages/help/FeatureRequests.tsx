import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Lightbulb } from "lucide-react";

const initialRequests = [
  { title: "Add dark mode", votes: 12 },
  { title: "Bulk document upload", votes: 8 },
  { title: "Mobile app support", votes: 15 },
];

const requestStats = [
  { label: "Total Requests", value: 18 },
  { label: "Upvotes", value: 42 },
  { label: "Implemented", value: 7 },
];

const trendData = [
  { day: "Mon", requests: 2 },
  { day: "Tue", requests: 3 },
  { day: "Wed", requests: 1 },
  { day: "Thu", requests: 4 },
  { day: "Fri", requests: 2 },
];

const aiInsights = [
  "AI suggests prioritizing mobile app support.",
  "3 requests have 10+ upvotes.",
  "Consider adding a public roadmap.",
];

const FeatureRequests = () => {
  const [requests, setRequests] = useState(initialRequests);
  const [newRequest, setNewRequest] = useState("");

  const handleUpvote = (idx: number) => {
    setRequests(
      requests.map((req, i) =>
        i === idx ? { ...req, votes: req.votes + 1 } : req,
      ),
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newRequest) {
      setRequests([{ title: newRequest, votes: 1 }, ...requests]);
      setNewRequest("");
    }
  };

  return (
    <PageTemplate
      title="Feature Requests"
      description="Submit and vote on new feature requests"
    >
      <Card className="mb-8">
        <CardContent className="p-6">
          <CardTitle>Submit a New Feature Request</CardTitle>
          <form className="space-y-2 mt-4" onSubmit={handleSubmit}>
            <input
              className="w-full border rounded p-2"
              required
              placeholder="Describe your feature idea..."
              value={newRequest}
              onChange={(e) => setNewRequest(e.target.value)}
            />
            <Button type="submit">Submit Request</Button>
          </form>
        </CardContent>
      </Card>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {requestStats.map((item, idx) => (
          <Card key={idx} className="text-center">
            <CardHeader>
              <CardTitle>{item.label}</CardTitle>
            </CardHeader>
            <div className="text-2xl font-bold">{item.value}</div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader>
            <CardTitle>Request Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="requests" fill="#3b82f6" name="Requests" />
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
      <div className="flex justify-end gap-2 mb-8">
        <Button asChild size="sm" variant="outline">
          <a href="/help/roadmap">Roadmap</a>
        </Button>
        <Button asChild size="sm" variant="outline">
          <a href="/changelog">Changelog</a>
        </Button>
      </div>
      <div className="space-y-4">
        {requests.map((req, idx) => (
          <Card key={idx}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="font-medium">{req.title}</div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-semibold">
                  {req.votes} votes
                </span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleUpvote(idx)}
                >
                  Upvote
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTemplate>
  );
};

export default FeatureRequests;
