import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const tenders = [
  { id: "T001", title: "HVAC Upgrade", status: "Awarded", score: 92 },
  { id: "T002", title: "Security Services", status: "Closed", score: 88 },
  { id: "T003", title: "Cleaning Contract", status: "Active", score: 95 }
];

const TenderAnalytics = () => {
  const [filter, setFilter] = useState("");
  const filtered = tenders.filter(t => t.title.toLowerCase().includes(filter.toLowerCase()));

  return (
    <PageTemplate
      title="Tender Analytics"
      description="Analyze tender performance and metrics"
    >
      <div className="mb-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Filter tenders..."
          value={filter}
          onChange={e => setFilter(e.target.value)}
        />
      </div>
      <ul className="space-y-2">
        {filtered.map((t, idx) => (
          <li key={idx} className="flex justify-between items-center border rounded p-2 bg-gray-50">
            <span>{t.title} <span className="text-xs text-gray-500">({t.status}, Score: {t.score})</span></span>
            <Button size="sm" variant="secondary">Details</Button>
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default TenderAnalytics;
