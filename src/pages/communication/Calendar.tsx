import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialEvents = [
	{ event: "Tender Deadline", date: "2025-07-01" },
	{ event: "Contract Renewal", date: "2025-07-10" },
];

const Calendar = () => {
	const [events, setEvents] = useState(initialEvents);
	const [event, setEvent] = useState("");
	const [date, setDate] = useState("");

	const handleAdd = (e: React.FormEvent) => {
		e.preventDefault();
		if (event && date) {
			setEvents([{ event, date }, ...events]);
			setEvent("");
			setDate("");
		}
	};

	return (
		<PageTemplate
			title="Calendar Integration"
			description="Manage tender deadlines and important dates"
		>
			<form className="mb-6 flex gap-2" onSubmit={handleAdd}>
				<input
					className="flex-1 border rounded p-2"
					placeholder="Event name..."
					value={event}
					onChange={(e) => setEvent(e.target.value)}
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
				{events.map((e, idx) => (
					<li
						key={idx}
						className="flex justify-between items-center border rounded p-2 bg-gray-50"
					>
						<span>{e.event}</span>
						<span className="text-blue-700 font-medium">{e.date}</span>
					</li>
				))}
			</ul>
		</PageTemplate>
	);
};

export default Calendar;
