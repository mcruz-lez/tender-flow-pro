import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialReports = [
	{ name: "Vendor Spend Analysis", created: "2025-06-01" },
	{ name: "Tender Win Rate", created: "2025-05-15" },
];

const CustomReports = () => {
	const [reports, setReports] = useState(initialReports);
	const [newReport, setNewReport] = useState("");
	const [submitted, setSubmitted] = useState(false);

	const handleCreate = (e: React.FormEvent) => {
		e.preventDefault();
		if (newReport.trim()) {
			setReports([
				{
					name: newReport.trim(),
					created: new Date().toISOString().slice(0, 10),
				},
				...reports,
			]);
			setNewReport("");
			setSubmitted(true);
			setTimeout(() => setSubmitted(false), 2000);
		}
	};

	return (
		<PageTemplate
			title="Custom Reports"
			description="Create and manage custom reports"
		>
			<form className="mb-6 flex gap-2" onSubmit={handleCreate}>
				<input
					className="flex-1 border rounded p-2"
					placeholder="New report name..."
					value={newReport}
					onChange={(e) => setNewReport(e.target.value)}
				/>
				<Button type="submit">Create</Button>
			</form>
			{submitted && (
				<div className="mb-4 text-green-600">Report created!</div>
			)}
			<ul className="space-y-2">
				{reports.map((r, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>
							{r.name}{" "}
							<span className="text-xs text-gray-500">({r.created})</span>
						</span>
						<Button size="sm" variant="secondary">
							View
						</Button>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

export default CustomReports;
