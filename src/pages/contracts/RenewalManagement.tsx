import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialRenewals = [
	{ contract: "HVAC Upgrade", date: "2025-12-31" },
	{ contract: "Security Services", date: "2025-11-30" },
];

const RenewalManagement = () => {
	const [renewals, setRenewals] = useState(initialRenewals);
	const [contract, setContract] = useState("");
	const [date, setDate] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (contract && date) {
			setRenewals([{ contract, date }, ...renewals]);
			setContract("");
			setDate("");
		}
	};

	return (
		<PageTemplate
			title="Renewal Management"
			description="Manage contract renewals and extensions"
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
					type="date"
					className="border rounded p-2"
					value={date}
					onChange={(e) => setDate(e.target.value)}
					required
				/>
				<Button type="submit">Add</Button>
			</form>
			<ul className="space-y-2">
				{renewals.map((r, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>{r.contract}</span>
						<span className="text-purple-700 font-medium">{r.date}</span>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

export default RenewalManagement;
