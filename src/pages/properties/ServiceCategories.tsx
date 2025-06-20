import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Users, DollarSign, Lightbulb } from "lucide-react";

const initialCategories = [
	"Cleaning",
	"Security",
	"Maintenance",
	"Landscaping",
];

const usageStats = [
	{ category: "Cleaning", usage: 12, cost: 18000 },
	{ category: "Security", usage: 8, cost: 22000 },
	{ category: "Maintenance", usage: 15, cost: 34000 },
	{ category: "Landscaping", usage: 6, cost: 9000 },
];

const aiSuggestions = [
	"Consider adding 'Energy Management' as a new category.",
	"AI recommends reviewing vendor contracts for 'Security'.",
	"Increase frequency of 'Maintenance' for older properties.",
];

const ServiceCategories = () => {
	const [categories, setCategories] = useState(initialCategories);
	const [newCategory, setNewCategory] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (newCategory.trim() && !categories.includes(newCategory.trim())) {
			setCategories([newCategory.trim(), ...categories]);
			setNewCategory("");
		}
	};

	const handleRemove = (cat: string) => {
		setCategories(categories.filter(c => c !== cat));
	};

	return (
		<PageTemplate
			title="Service Categories"
			description="Manage property service categories"
		>
			<form className="mb-6 flex gap-2" onSubmit={handleAdd}>
				<input
					className="flex-1 border rounded p-2"
					placeholder="Add new category..."
					value={newCategory}
					onChange={e => setNewCategory(e.target.value)}
				/>
				<Button type="submit">Add</Button>
			</form>
			<div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
				<Card>
					<CardHeader><CardTitle>Category Usage</CardTitle></CardHeader>
					<CardContent>
						<ul className="space-y-2">
							{usageStats.map((stat, idx) => (
								<li key={idx} className="flex justify-between items-center">
									<span>{stat.category}</span>
									<span><BarChart3 className="inline w-4 h-4 mr-1 text-blue-600" />{stat.usage} uses</span>
									<span><DollarSign className="inline w-4 h-4 mr-1 text-green-600" />${stat.cost.toLocaleString()}</span>
									<Button asChild size="sm" variant="outline"><a href={`/properties?service=${stat.category}`}>View Properties</a></Button>
									<Button asChild size="sm" variant="outline"><a href={`/vendors?service=${stat.category}`}>View Vendors</a></Button>
								</li>
							))}
						</ul>
					</CardContent>
				</Card>
				<Card>
					<CardHeader><CardTitle>AI Suggestions</CardTitle></CardHeader>
					<CardContent>
						<ul className="list-disc list-inside space-y-2 text-gray-700">
							{aiSuggestions.map((s, idx) => <li key={idx}><Lightbulb className="inline w-4 h-4 mr-1 text-yellow-500" />{s}</li>)}
						</ul>
					</CardContent>
				</Card>
			</div>
			<ul className="space-y-2">
				{categories.map((cat, idx) => (
					<li key={idx} className="flex justify-between items-center border rounded p-2 bg-gray-50">
						<span>{cat}</span>
						<Button size="sm" variant="destructive" onClick={() => handleRemove(cat)}>
							Remove
						</Button>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

export default ServiceCategories;
