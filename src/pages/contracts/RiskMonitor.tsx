import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardHeader,
	CardTitle,
	CardDescription,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
	AlertTriangle,
	BarChart3,
	FileText,
	Users,
	ExternalLink,
} from "lucide-react";

const initialRisks = [
	{ risk: "Contract expiration approaching", resolved: false },
	{ risk: "Vendor insurance expired", resolved: false },
];

const RiskMonitor = () => {
	const [risks, setRisks] = useState(initialRisks);
	const [newRisk, setNewRisk] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (newRisk.trim()) {
			setRisks([{ risk: newRisk.trim(), resolved: false }, ...risks]);
			setNewRisk("");
		}
	};

	const handleResolve = (idx: number) => {
		setRisks(
			risks.map((r, i) => (i === idx ? { ...r, resolved: true } : r))
		);
	};

	const stats = {
		total: risks.length,
		unresolved: risks.filter((r) => !r.resolved).length,
		resolved: risks.filter((r) => r.resolved).length,
	};

	const relatedLinks = [
		{ label: "Contract Overview", to: "/contracts", icon: FileText },
		{
			label: "Performance Management",
			to: "/contracts/performance",
			icon: BarChart3,
		},
		{ label: "Vendors", to: "/vendors", icon: Users },
		{ label: "Analytics Dashboard", to: "/analytics", icon: ExternalLink },
	];

	return (
		<PageTemplate
			title="Contract Risk Monitoring"
			description="Monitor and mitigate contract-related risks"
			quickActions={[
				{ label: "Add Contract", href: "/contracts/create", icon: FileText },
				{
					label: "View Analytics",
					href: "/analytics",
					icon: BarChart3,
					variant: "outline",
				},
			]}
		>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
				{/* Stats Cards */}
				<Card>
					<CardHeader>
						<CardTitle>Total Risks</CardTitle>
						<CardDescription>All tracked contract risks</CardDescription>
					</CardHeader>
					<CardContent>
						<div className="flex items-center gap-2">
							<AlertTriangle className="text-yellow-600" />
							<span className="text-2xl font-bold">{stats.total}</span>
						</div>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Unresolved</CardTitle>
						<CardDescription>Risks needing attention</CardDescription>
					</CardHeader>
					<CardContent>
						<Progress
							value={(stats.unresolved / (stats.total || 1)) * 100}
							className="mb-2"
						/>
						<span className="text-2xl font-bold text-red-600">
							{stats.unresolved}
						</span>
					</CardContent>
				</Card>
				<Card>
					<CardHeader>
						<CardTitle>Resolved</CardTitle>
						<CardDescription>Mitigated risks</CardDescription>
					</CardHeader>
					<CardContent>
						<Progress
							value={(stats.resolved / (stats.total || 1)) * 100}
							className="mb-2"
						/>
						<span className="text-2xl font-bold text-green-600">
							{stats.resolved}
						</span>
					</CardContent>
				</Card>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
				<div>
					<form className="mb-6 flex gap-2" onSubmit={handleAdd}>
						<input
							className="flex-1 border rounded p-2"
							placeholder="Add new risk..."
							value={newRisk}
							onChange={(e) => setNewRisk(e.target.value)}
						/>
						<Button type="submit">Add</Button>
					</form>
					<ul className="space-y-2">
						{risks.length === 0 ? (
							<li className="text-gray-500">
								No risks tracked. Add a new risk to get started.
							</li>
						) : (
							risks.map((r, idx) => (
								<li
									key={idx}
									className="flex justify-between items-center border rounded p-2 bg-gray-50"
								>
									<span className={r.resolved ? "line-through text-gray-400" : ""}>
										{r.risk}
									</span>
									{r.resolved ? (
										<span className="text-green-600 font-medium">Resolved</span>
									) : (
										<Button size="sm" onClick={() => handleResolve(idx)}>
											Resolve
										</Button>
									)}
								</li>
							))
						)}
					</ul>
				</div>
				<div>
					<Card className="mb-6">
						<CardHeader>
							<CardTitle>Recent Activity</CardTitle>
							<CardDescription>Latest risk changes</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="text-sm space-y-2">
								{risks.slice(0, 5).map((r, idx) => (
									<li key={idx} className="flex items-center gap-2">
										<AlertTriangle className="w-4 h-4 text-yellow-500" />
										<span>{r.risk}</span>
										{r.resolved && (
											<span className="ml-2 text-green-500">(Resolved)</span>
										)}
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
					<Card>
						<CardHeader>
							<CardTitle>Related Links</CardTitle>
							<CardDescription>Jump to related modules</CardDescription>
						</CardHeader>
						<CardContent>
							<ul className="space-y-2">
								{relatedLinks.map((link) => (
									<li key={link.to}>
										<Link
											to={link.to}
											className="flex items-center gap-2 text-blue-700 hover:underline"
										>
											<link.icon className="w-4 h-4" />
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</CardContent>
					</Card>
				</div>
			</div>
		</PageTemplate>
	);
};

export default RiskMonitor;
