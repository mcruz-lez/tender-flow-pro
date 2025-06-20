import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialConnections = [
	{ name: "Vendor API", status: "Active" },
	{ name: "Document API", status: "Inactive" }
];

const APIManage = () => {
	const [connections, setConnections] = useState(initialConnections);
	const [name, setName] = useState("");
	const [status, setStatus] = useState("Active");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (name.trim()) {
			setConnections([{ name: name.trim(), status }, ...connections]);
			setName("");
			setStatus("Active");
		}
	};

	return (
		<PageTemplate
			title="API Management"
			description="Manage API connections and data integrations"
		>
			<form className="mb-6 flex gap-2" onSubmit={handleAdd}>
				<input
					className="flex-1 border rounded p-2"
					placeholder="API name..."
					value={name}
					onChange={e => setName(e.target.value)}
				/>
				<select
					className="border rounded p-2"
					value={status}
					onChange={e => setStatus(e.target.value)}
				>
					<option value="Active">Active</option>
					<option value="Inactive">Inactive</option>
				</select>
				<Button type="submit">Add</Button>
			</form>
			<ul className="space-y-2">
				{connections.map((c, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>{c.name}</span>
						<span
							className={
								c.status === "Active"
									? "text-green-600"
									: "text-gray-500"
							}
						>
							{c.status}
						</span>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

export default APIManage;
