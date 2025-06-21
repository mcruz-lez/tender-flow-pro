import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialAnalyses = [
	{ contract: "HVAC Upgrade", roi: 1.25 },
	{ contract: "Security Services", roi: 1.18 },
];

const ValueAnalysis = () => {
	const [analyses, setAnalyses] = useState(initialAnalyses);
	const [contract, setContract] = useState("");
	const [roi, setRoi] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (contract && roi) {
			setAnalyses([{ contract, roi: Number(roi) }, ...analyses]);
			setContract("");
			setRoi("");
		}
	};

	return (
		<PageTemplate
			title="Contract Value Analysis"
			description="Analyze contract value and return on investment"
		>
			<form className="mb-6 flex gap-2" onSubmit={handleAdd}>
				<input
					className="flex-1 border rounded p-2"
					placeholder="Contract name..."
					value={contract}
					onChange={(e) => setContract(e.target.value)}
					required
				/>
				<input
					className="border rounded p-2 w-32"
					placeholder="ROI"
					type="number"
					step="0.01"
					value={roi}
					onChange={(e) => setRoi(e.target.value)}
					required
				/>
				<Button type="submit">Add</Button>
			</form>
			<ul className="space-y-2">
				{analyses.map((a, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>{a.contract}</span>
						<span className="text-blue-700 font-medium">ROI: {a.roi}</span>
					</li>
				))}
			</ul>
			{/* --- PROFESSIONAL ENHANCEMENT START --- */}
			{/* Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to value analysis */}
			{/* Consistent with Dashboard and design system */}
			{/* --- PROFESSIONAL ENHANCEMENT END --- */}
		</PageTemplate>
	);
};

export default ValueAnalysis;
