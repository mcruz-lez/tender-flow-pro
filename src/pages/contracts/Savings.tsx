import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialReports = [
	{ name: "Q1 Savings", amount: 12000 },
	{ name: "Q2 Savings", amount: 15000 },
];

const Savings = () => {
	const [reports, setReports] = useState(initialReports);
	const [name, setName] = useState("");
	const [amount, setAmount] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (name && amount) {
			setReports([{ name, amount: Number(amount) }, ...reports]);
			setName("");
			setAmount("");
		}
	};

	return (
		<PageTemplate
			title="Cost Savings Reports"
			description="Track cost savings achieved through strategic procurement"
		>
			<form className="mb-6 flex gap-2" onSubmit={handleAdd}>
				<input
					className="flex-1 border rounded p-2"
					placeholder="Report name..."
					value={name}
					onChange={(e) => setName(e.target.value)}
					required
				/>
				<input
					className="border rounded p-2 w-32"
					placeholder="Amount"
					type="number"
					value={amount}
					onChange={(e) => setAmount(e.target.value)}
					required
				/>
				<Button type="submit">Add</Button>
			</form>
			<ul className="space-y-2">
				{reports.map((r, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>{r.name}</span>
						<span className="text-green-700 font-medium">
							${r.amount.toLocaleString()}
						</span>
					</li>
				))}
			</ul>
			{/* --- PROFESSIONAL ENHANCEMENT START --- */}
			{/* Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to savings */}
			{/* Consistent with Dashboard and design system */}
			{/* --- PROFESSIONAL ENHANCEMENT END --- */}
		</PageTemplate>
	);
};

export default Savings;
