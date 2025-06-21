import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const suggestions = [
	"Automate bid evaluation to reduce manual errors.",
	"Schedule regular vendor performance reviews.",
	"Leverage AI to predict tender success rates.",
	"Optimize document workflows for faster approvals.",
];

const OptimizeInsights = () => {
	const [feedback, setFeedback] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setSubmitted(true);
		setFeedback("");
		setTimeout(() => setSubmitted(false), 3000);
	};

	return (
		<PageTemplate
			title="Optimization Insights"
			description="AI-powered recommendations for process optimization"
		>
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-4">AI Suggestions</h2>
				<ul className="list-disc list-inside space-y-2 text-gray-700">
					{suggestions.map((s, idx) => (
						<li key={idx}>{s}</li>
					))}
				</ul>
			</div>
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-4">Suggest an Improvement</h2>
				<form className="flex gap-2" onSubmit={handleSubmit}>
					<input
						className="flex-1 border rounded p-2"
						placeholder="Your suggestion..."
						value={feedback}
						onChange={(e) => setFeedback(e.target.value)}
						required
					/>
					<Button type="submit">Submit</Button>
				</form>
				{submitted && (
					<div className="text-green-600 mt-2">
						Thank you for your feedback!
					</div>
				)}
			</div>
			{/* --- PROFESSIONAL ENHANCEMENT START --- */}
			{/* Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to optimization insights */}
			{/* Consistent with Dashboard and design system */}
			{/* --- PROFESSIONAL ENHANCEMENT END --- */}
		</PageTemplate>
	);
};

export default OptimizeInsights;
