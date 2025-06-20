import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Lightbulb } from "lucide-react";

const initialTopics = [
	{ title: "Welcome to the Forums!", author: "Admin", replies: 2 },
	{ title: "How do I submit a bid?", author: "VendorUser1", replies: 5 },
	{ title: "Feature request: Dark mode", author: "JaneDoe", replies: 3 },
];

const forumStats = [
	{ label: "Topics", value: 22 },
	{ label: "Replies", value: 78 },
	{ label: "Active Users", value: 14 },
];

const trendData = [
	{ day: "Mon", posts: 4 },
	{ day: "Tue", posts: 6 },
	{ day: "Wed", posts: 3 },
	{ day: "Thu", posts: 5 },
	{ day: "Fri", posts: 4 },
];

const aiInsights = [
	"AI suggests pinning popular topics.",
	"3 users have posted 5+ replies this week.",
	"Consider adding a Q&A section.",
];

const Forums = () => {
	const [topics, setTopics] = useState(initialTopics);
	const [newTopic, setNewTopic] = useState("");
	const [newAuthor, setNewAuthor] = useState("");

	const handleNewTopic = (e: React.FormEvent) => {
		e.preventDefault();
		if (newTopic && newAuthor) {
			setTopics([{ title: newTopic, author: newAuthor, replies: 0 }, ...topics]);
			setNewTopic("");
			setNewAuthor("");
		}
	};

	return (
		<PageTemplate
			title="User Forums"
			description="Community discussions and knowledge sharing"
		>
			<Card className="mb-8">
				<CardContent className="p-6">
					<CardTitle>Start a New Discussion</CardTitle>
					<form className="space-y-2 mt-4" onSubmit={handleNewTopic}>
						<input
							className="w-full border rounded p-2"
							required
							placeholder="Your Name"
							value={newAuthor}
							onChange={(e) => setNewAuthor(e.target.value)}
						/>
						<input
							className="w-full border rounded p-2"
							required
							placeholder="Discussion Topic"
							value={newTopic}
							onChange={(e) => setNewTopic(e.target.value)}
						/>
						<Button type="submit">Post Topic</Button>
					</form>
				</CardContent>
			</Card>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				{forumStats.map((item, idx) => (
					<Card key={idx} className="text-center">
						<CardHeader><CardTitle>{item.label}</CardTitle></CardHeader>
						<div className="text-2xl font-bold">{item.value}</div>
					</Card>
				))}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader><CardTitle>Forum Activity Trend</CardTitle></CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={200}>
							<BarChart data={trendData}>
								<XAxis dataKey="day" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="posts" fill="#3b82f6" name="Posts" />
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
				<Button asChild size="sm" variant="outline"><a href="/help/user-groups">User Groups</a></Button>
				<Button asChild size="sm" variant="outline"><a href="/help/help-center">Help Center</a></Button>
			</div>
			<div className="space-y-4">
				{topics.map((topic, idx) => (
					<Card key={idx}>
						<CardContent className="flex flex-col md:flex-row md:items-center md:justify-between p-4">
							<div>
								<div className="font-medium">{topic.title}</div>
								<div className="text-gray-500 text-sm">
									By {topic.author}
								</div>
							</div>
							<div className="text-blue-600 font-semibold">
								{topic.replies} replies
							</div>
						</CardContent>
					</Card>
				))}
			</div>
		</PageTemplate>
	);
};

export default Forums;
