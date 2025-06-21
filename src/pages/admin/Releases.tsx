import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const notes = [
  {
    version: "1.3.0",
    date: "2025-06-20",
    details: "Added analytics dashboard and improved reporting.",
  },
  {
    version: "1.2.0",
    date: "2025-06-10",
    details: "Enhanced vendor management and notifications.",
  },
];

const Releases = () => {
  const [selected, setSelected] = useState<number | null>(null);

  return (
    <PageTemplate
      title="Release Notes"
      description="Track system updates and new feature releases"
    >
      <ul className="space-y-2 mb-6">
        {notes.map((n, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>
              v{n.version}{" "}
              <span className="text-xs text-gray-500">({n.date})</span>
            </span>
            <Button
              size="sm"
              variant="secondary"
              onClick={() => setSelected(idx)}
            >
              Details
            </Button>
          </li>
        ))}
      </ul>
      {selected !== null && (
        <div className="bg-blue-50 border border-blue-200 p-4 rounded">
          <div className="font-semibold mb-2">
            Release v{notes[selected].version}
          </div>
          <div>{notes[selected].details}</div>
          <Button className="mt-2" size="sm" onClick={() => setSelected(null)}>
            Close
          </Button>
        </div>
      )}
    </PageTemplate>
  );
};

export default Releases;
