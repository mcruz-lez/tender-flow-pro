import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Lightbulb } from "lucide-react";

const supportStats = [
  { label: "Tickets", value: 14 },
  { label: "Resolved", value: 12 },
  { label: "Avg. Response", value: "1.8h" },
];

const trendData = [
  { day: "Mon", tickets: 2 },
  { day: "Tue", tickets: 3 },
  { day: "Wed", tickets: 1 },
  { day: "Thu", tickets: 4 },
  { day: "Fri", tickets: 4 },
];

const aiInsights = [
  "AI suggests adding a live chat option.",
  "2 tickets have been escalated this week.",
  "Consider expanding support hours.",
];

const TechnicalSupport = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };
  return (
    <PageTemplate
      title="Technical Support"
      description="Get technical support and assistance"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
        <Card>
          <CardContent className="p-6">
            <CardTitle>Submit a Support Ticket</CardTitle>
            {submitted ? (
              <div className="text-green-600 font-medium mt-4">
                Your request has been submitted. Our team will contact you soon.
              </div>
            ) : (
              <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
                <input
                  className="w-full border rounded p-2"
                  required
                  placeholder="Your Email"
                  type="email"
                />
                <input
                  className="w-full border rounded p-2"
                  required
                  placeholder="Subject"
                />
                <textarea
                  className="w-full border rounded p-2"
                  required
                  placeholder="Describe your issue..."
                  rows={4}
                />
                <Button type="submit">Submit Ticket</Button>
              </form>
            )}
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <CardTitle>Contact Information</CardTitle>
            <div className="mb-4 text-gray-700">
              <div>
                Email:{" "}
                <a
                  href="mailto:support@tendprocure.com"
                  className="text-blue-600 underline"
                >
                  support@tendprocure.com
                </a>
              </div>
              <div>
                Phone:{" "}
                <a
                  href="tel:+1234567890"
                  className="text-blue-600 underline"
                >
                  +1 234 567 890
                </a>
              </div>
            </div>
            <div className="mb-2 font-medium">Troubleshooting Guides</div>
            <ul className="list-disc list-inside text-gray-600">
              <li>
                <a
                  href="/help/training"
                  className="underline"
                >
                  How to reset your password
                </a>
              </li>
              <li>
                <a
                  href="/help/training"
                  className="underline"
                >
                  Common login issues
                </a>
              </li>
              <li>
                <a
                  href="/help/training"
                  className="underline"
                >
                  System requirements
                </a>
              </li>
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {supportStats.map((item, idx) => (
          <Card key={idx} className="text-center">
            <CardHeader><CardTitle>{item.label}</CardTitle></CardHeader>
            <div className="text-2xl font-bold">{item.value}</div>
          </Card>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader><CardTitle>Ticket Trend</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={trendData}>
                <XAxis dataKey="day" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="tickets" fill="#3b82f6" name="Tickets" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        <Card>
          <CardHeader><CardTitle>AI Insights</CardTitle></CardHeader>
          <CardContent>
            <ul className="list-disc list-inside space-y-2 text-gray-700">
              {aiInsights.map((insight, idx) => <li key={idx}><Lightbulb className="inline w-4 h-4 mr-1 text-yellow-500" />{insight}</li>)}
            </ul>
          </CardContent>
        </Card>
      </div>
      <div className="flex justify-end gap-2 mb-8">
        <Button asChild size="sm" variant="outline"><a href="/docs">Docs</a></Button>
        <Button asChild size="sm" variant="outline"><a href="/help/forums">Forums</a></Button>
      </div>
    </PageTemplate>
  );
};

export default TechnicalSupport;
