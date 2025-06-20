import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialReports = [
	{ name: "Q1 Compliance", date: "2025-03-31" },
	{ name: "Q2 Compliance", date: "2025-06-30" },
];

const ComplianceReports = () => {
	const [reports] = useState(initialReports);
	const [filter, setFilter] = useState("");
	const filtered = reports.filter((r) =>
		r.name.toLowerCase().includes(filter.toLowerCase())
	);

	return (
		<PageTemplate
			title="Compliance Reports"
			description="Monitor compliance and generate reports"
		>
			<div className="mb-4">
				<input
					className="w-full border rounded p-2"
					placeholder="Filter reports..."
					value={filter}
					onChange={(e) => setFilter(e.target.value)}
				/>
			</div>
			<ul className="space-y-2">
				{filtered.map((report, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>
							{report.name}{" "}
							<span className="text-xs text-gray-500">
								({report.date})
							</span>
						</span>
						<Button size="sm" variant="secondary">
							Download
						</Button>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

export default ComplianceReports;
