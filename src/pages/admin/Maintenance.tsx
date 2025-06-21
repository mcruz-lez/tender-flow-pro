import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialSchedule = [
  { task: "Database Backup", date: "2025-07-01" },
  { task: "System Update", date: "2025-07-10" },
];

const Maintenance = () => {
  const [schedule, setSchedule] = useState(initialSchedule);
  const [task, setTask] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (task && date) {
      setSchedule([{ task, date }, ...schedule]);
      setTask("");
      setDate("");
    }
  };

  return (
    <PageTemplate
      title="System Maintenance"
      description="Schedule and manage system maintenance activities"
    >
      <form className="mb-6 flex gap-2" onSubmit={handleAdd}>
        <input
          className="flex-1 border rounded p-2"
          placeholder="Maintenance task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
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
        {schedule.map((item, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>
              {item.task}{" "}
              <span className="text-xs text-gray-500">({item.date})</span>
            </span>
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default Maintenance;
