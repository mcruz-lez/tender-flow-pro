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

const initialTickets = [
	{ subject: "Login Issue", status: "Open" },
	{ subject: "API Access", status: "Closed" },
];

const ticketStats = [
	{ label: "Open Tickets", value: 5 },
	{ label: "Closed Tickets", value: 12 },
	{ label: "Avg. Response Time", value: "2h" },
];

const responseData = [
	{ day: "Mon", responses: 3 },
	{ day: "Tue", responses: 4 },
	{ day: "Wed", responses: 2 },
	{ day: "Thu", responses: 5 },
	{ day: "Fri", responses: 6 },
];

const aiInsights = [
	"AI suggests automating ticket triage.",
	"2 tickets have been open for over 48 hours.",
	"Consider adding more support resources for vendors.",
];

const HelpDesk = () => {
	const [tickets, setTickets] = useState(initialTickets);
	const [subject, setSubject] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (subject.trim()) {
			setTickets([{ subject: subject.trim(), status: "Open" }, ...tickets]);
			setSubject("");
			setSubmitted(true);
			setTimeout(() => setSubmitted(false), 2000);
		}
	};

	return (
		<PageTemplate
			title="Help Desk"
			description="Internal support ticket management and resolution"
		>
			<form className="mb-6 flex gap-2" onSubmit={handleSubmit}>
				<input
					className="flex-1 border rounded p-2"
					placeholder="Ticket subject..."
					value={subject}
					onChange={(e) => setSubject(e.target.value)}
					required
				/>
				<Button type="submit">Submit</Button>
			</form>
			{submitted && (
				<div className="mb-4 text-green-600">Ticket submitted!</div>
			)}
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				{ticketStats.map((item, idx) => (
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
						<CardTitle>Response Trend</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={200}>
							<BarChart data={responseData}>
								<XAxis dataKey="day" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="responses" fill="#3b82f6" name="Responses" />
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
				{tickets.map((t, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>{t.subject}</span>
						<Button
							asChild
							size="sm"
							variant="outline"
							className="hidden md:inline"
						>
							<a href="/help/technical-support">Support Docs</a>
						</Button>
						<Button
							asChild
							size="sm"
							variant="outline"
							className="hidden md:inline"
						>
							<a href="/help/training-resources">Training</a>
						</Button>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

export default HelpDesk;
