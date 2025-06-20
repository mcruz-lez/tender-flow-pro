import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialMetrics = [
	{ metric: "On-time Delivery", score: 95 },
	{ metric: "Quality Compliance", score: 90 },
];

const PerformanceManagement = () => {
	const [metrics, setMetrics] = useState(initialMetrics);
	const [metric, setMetric] = useState("");
	const [score, setScore] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (metric && score) {
			setMetrics([{ metric, score: Number(score) }, ...metrics]);
			setMetric("");
			setScore("");
		}
	};

	return (
		<PageTemplate
			title="Performance Management"
			description="Track and manage contract performance"
		>
			<form className="mb-6 flex gap-2" onSubmit={handleAdd}>
				<input
					className="flex-1 border rounded p-2"
					placeholder="Metric name..."
					value={metric}
					onChange={(e) => setMetric(e.target.value)}
					required
				/>
				<input
					className="border rounded p-2 w-32"
					placeholder="Score"
					type="number"
					value={score}
					onChange={(e) => setScore(e.target.value)}
					required
				/>
				<Button type="submit">Add</Button>
			</form>
			<ul className="space-y-2">
				{metrics.map((m, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>{m.metric}</span>
						<span className="text-purple-700 font-medium">{m.score}</span>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

export default PerformanceManagement;
