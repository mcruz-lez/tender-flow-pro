import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

const bidData = [
	{ name: "Jan", bids: 12, wins: 4 },
	{ name: "Feb", bids: 15, wins: 6 },
	{ name: "Mar", bids: 10, wins: 3 },
	{ name: "Apr", bids: 18, wins: 7 },
	{ name: "May", bids: 14, wins: 5 },
];

const BidAnalytics = () => {
	return (
		<PageTemplate
			title="Bid Analytics"
			description="Visualize bid performance, win rates, and trends"
		>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<Card>
					<CardHeader>
						<CardTitle>Bids vs Wins</CardTitle>
					</CardHeader>
					<CardContent>
						<ResponsiveContainer width="100%" height={250}>
							<BarChart data={bidData}>
								<XAxis dataKey="name" />
								<YAxis />
								<Tooltip />
								<Bar dataKey="bids" fill="#3b82f6" name="Bids" />
								<Bar dataKey="wins" fill="#10b981" name="Wins" />
							</BarChart>
						</ResponsiveContainer>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Insights</CardTitle>
					</CardHeader>
					<CardContent>
						<ul className="list-disc list-inside space-y-2 text-gray-700">
							<li>Win rate is improving month over month.</li>
							<li>Highest number of bids submitted in April.</li>
							<li>Focus on quality to increase win ratio.</li>
						</ul>
					</CardContent>
				</Card>
			</div>
		</PageTemplate>
	);
};

// --- PROFESSIONAL ENHANCEMENT START ---
// Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to bid analytics
// Consistent with Dashboard and design system
// --- PROFESSIONAL ENHANCEMENT END ---

export default BidAnalytics;
