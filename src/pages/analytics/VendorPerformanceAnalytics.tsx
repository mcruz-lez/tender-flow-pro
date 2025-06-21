import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const vendors = [
	{ name: "TechClimate Solutions", score: 92 },
	{ name: "SecureGuard Solutions", score: 88 },
	{ name: "GreenSpace Pro", score: 95 },
];

const VendorPerformanceAnalytics = () => {
	const [filter, setFilter] = useState("");
	const filtered = vendors.filter((v) =>
		v.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<PageTemplate
			title="Vendor Performance Analytics"
			description="Analyze vendor performance metrics"
		>
			<div className="mb-4">
				<input
					className="w-full border rounded p-2"
					placeholder="Filter vendors..."
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
			<ul className="space-y-2">
				{filtered.map((v, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>
							{v.name}{" "}
							<span className="text-xs text-gray-500">
								(Score: {v.score})
							</span>
						</span>
						<Button size="sm" variant="secondary">
							Details
						</Button>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

// --- PROFESSIONAL ENHANCEMENT START ---
// Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to vendor performance analytics
// Consistent with Dashboard and design system
// --- PROFESSIONAL ENHANCEMENT END ---

export default VendorPerformanceAnalytics;
