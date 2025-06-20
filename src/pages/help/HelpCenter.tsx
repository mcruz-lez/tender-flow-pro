import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Lightbulb } from "lucide-react";

const faqs = [
	{
		question: "How do I reset my password?",
		answer: "Go to Account Settings > Security and click 'Reset Password'.",
	},
	{
		question: "How can I contact support?",
		answer: "Use the Technical Support page or email support@tendprocure.com.",
	},
	{
		question: "Where can I find user guides?",
		answer: "See the Training Resources section for guides and tutorials.",
	},
];

const docs = [
	{ title: "Getting Started Guide", link: "/docs/getting-started" },
	{ title: "Bid Submission Tutorial", link: "/docs/bid-tutorial" },
	{ title: "Document Management Overview", link: "/docs/document-management" },
	{ title: "API Documentation", link: "/admin/api-docs" },
];

const popularTopics = [
	{ title: "How to invite team members", link: "/help/training" },
	{ title: "Understanding evaluation scoring", link: "/docs/evaluation-guide" },
	{ title: "Managing documents securely", link: "/docs/document-management" },
	{ title: "Vendor registration process", link: "/help/training" },
];

const faqStats = [
	{ label: "FAQs", value: 12 },
	{ label: "Guides", value: 8 },
	{ label: "Tickets", value: 5 },
];

const usageData = [
	{ day: "Mon", views: 10 },
	{ day: "Tue", views: 12 },
	{ day: "Wed", views: 8 },
	{ day: "Thu", views: 15 },
	{ day: "Fri", views: 14 },
];

const aiInsights = [
	"AI suggests updating the onboarding guide.",
	"2 FAQs have not been viewed in 30 days.",
	"Consider adding video tutorials for new features.",
];

const HelpCenter = () => {
	const [search, setSearch] = useState("");
	const [faqsList, setFaqsList] = useState(faqs);
	const [question, setQuestion] = useState("");
	const [submitted, setSubmitted] = useState(false);
	const filteredFaqs = faqsList.filter(
		(faq) =>
			faq.question.toLowerCase().includes(search.toLowerCase()) ||
			faq.answer.toLowerCase().includes(search.toLowerCase())
	);

	const handleQuestionSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		if (question.trim()) {
			setFaqsList([
				{ question: question.trim(), answer: "Thank you for your question! Our support team will respond soon." },
				...faqsList,
			]);
			setSubmitted(true);
			setQuestion("");
			setTimeout(() => setSubmitted(false), 4000);
		}
	};

	return (
		<PageTemplate
			title="Help Center"
			description="Find help and support resources"
		>
			<div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="font-medium text-blue-900">
					Need urgent help? Contact our support team at{" "}
					<a
						href="mailto:support@tendprocure.com"
						className="underline"
					>
						support@tendprocure.com
					</a>{" "}
					or{" "}
					<a href="/help/support" className="underline">
						submit a ticket
					</a>
					.
				</div>
				<Button asChild size="sm" variant="outline">
					<a href="/help/support">Contact Support</a>
				</Button>
			</div>
			<div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
				<div className="flex-1">
					<input
						className="w-full border rounded p-2"
						placeholder="Search FAQs..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
				<div className="flex flex-wrap gap-2 mt-2 md:mt-0">
					{docs.map((doc, idx) => (
						<Button asChild key={idx} size="sm" variant="secondary">
							<a
								href={doc.link}
								target="_blank"
								rel="noopener noreferrer"
							>
								{doc.title}
							</a>
						</Button>
					))}
				</div>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
				{faqStats.map((item, idx) => (
					<Card key={idx} className="text-center">
						<CardHeader><CardTitle>{item.label}</CardTitle></CardHeader>
						<CardContent className="text-2xl font-bold">{item.value}</CardContent>
					</Card>
				))}
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader><CardTitle>FAQ Usage Trend</CardTitle></CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={200}>
							<BarChart data={usageData}>
								<XAxis dataKey="day" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="views" fill="#3b82f6" name="Views" />
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
				<Button asChild size="sm" variant="outline"><a href="/help/training-resources">Training</a></Button>
				<Button asChild size="sm" variant="outline"><a href="/help/technical-support">Support</a></Button>
				<Button asChild size="sm" variant="outline"><a href="/docs">Docs</a></Button>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				<Card>
					<CardContent className="flex flex-col items-center p-6">
						<CardTitle>Technical Support</CardTitle>
						<p className="text-gray-600 mb-4 text-center">
							Get help with technical issues and troubleshooting.
						</p>
						<Button asChild>
							<a href="/help/support">Contact Support</a>
						</Button>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex flex-col items-center p-6">
						<CardTitle>Training Resources</CardTitle>
						<p className="text-gray-600 mb-4 text-center">
							Access tutorials, guides, and onboarding materials.
						</p>
						<Button asChild>
							<a href="/help/training">View Resources</a>
						</Button>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="flex flex-col items-center p-6">
						<CardTitle>User Forums</CardTitle>
						<p className="text-gray-600 mb-4 text-center">
							Join the community and ask questions.
						</p>
						<Button asChild>
							<a href="/help/forums">Go to Forums</a>
						</Button>
					</CardContent>
				</Card>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
				<Card>
					<CardContent className="p-6">
						<CardTitle>Contact Us</CardTitle>
						<div className="mb-2 text-gray-700">
							Our support team is here to help you with any questions or issues.
						</div>
						<div className="mb-2">
							<span className="font-medium">Email:</span>{" "}
							<a
								href="mailto:support@tendprocure.com"
								className="underline"
							>
								support@tendprocure.com
							</a>
						</div>
						<div className="mb-2">
							<span className="font-medium">Phone:</span>{" "}
							<a href="tel:+1234567890" className="underline">
								+1 234 567 890
							</a>
						</div>
						<Button asChild variant="outline" className="mt-2">
							<a href="/help/support">Submit a Support Ticket</a>
						</Button>
					</CardContent>
				</Card>
				<Card>
					<CardContent className="p-6">
						<CardTitle>Popular Topics</CardTitle>
						<ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
							{popularTopics.map((topic, idx) => (
								<li key={idx}>
									<a
										href={topic.link}
										className="underline text-blue-700 hover:text-blue-900"
									>
										{topic.title}
									</a>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
			</div>
			<div className="mb-8 flex flex-wrap gap-4 justify-center">
				<Button asChild variant="secondary">
					<a href="/help/feature-requests">Submit Feature Request</a>
				</Button>
				<Button asChild variant="secondary">
					<a href="/help/forums">Ask the Community</a>
				</Button>
				<Button asChild variant="secondary">
					<a href="/help/training">Browse Tutorials</a>
				</Button>
				<Button asChild variant="secondary">
					<a href="/admin/api-docs">API Docs</a>
				</Button>
			</div>
			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">
					Frequently Asked Questions
				</h2>
				<div className="space-y-4">
					{filteredFaqs.length === 0 ? (
						<div className="text-gray-500">No FAQs match your search.</div>
					) : (
						filteredFaqs.map((faq, idx) => (
							<div
								key={idx}
								className="border rounded-lg p-4 bg-gray-50"
							>
								<div className="font-medium mb-1">{faq.question}</div>
								<div className="text-gray-700">{faq.answer}</div>
							</div>
						))
					)}
				</div>
			</div>
			<div className="mb-8">
				<h2 className="text-2xl font-semibold mb-4">Submit a Question</h2>
				<form className="flex flex-col md:flex-row gap-4 items-start md:items-end mb-4" onSubmit={handleQuestionSubmit}>
					<input
						type="text"
						className="flex-1 border rounded p-2"
						placeholder="Type your question here..."
						value={question}
						onChange={e => setQuestion(e.target.value)}
						required
					/>
					<Button type="submit" size="sm">Submit</Button>
				</form>
				{submitted && <div className="text-green-600 mb-2">Your question has been submitted!</div>}
			</div>
			<div className="text-center">
				<Button asChild size="lg">
					<a href="/help/feature-requests">Suggest a Feature</a>
				</Button>
			</div>
		</PageTemplate>
	);
};

export default HelpCenter;
