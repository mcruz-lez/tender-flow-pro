import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialReports = [
  { name: "Annual Financials 2024", date: "2025-01-10" },
  { name: "Q2 Financials", date: "2025-06-15" },
];

const FinancialReports = () => {
  const [reports] = useState(initialReports);
  const [filter, setFilter] = useState("");
  const filtered = reports.filter((r) =>
    r.name.toLowerCase().includes(filter.toLowerCase()),
  );

  return (
    <PageTemplate
      title="Financial Reports"
      description="Generate financial reports and analysis"
    >
      <div className="mb-4">
        <input
          className="w-full border rounded p-2"
          placeholder="Filter reports..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
        />
      </div>
      <ul className="space-y-2">
        {filtered.map((report, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>
              {report.name}{" "}
              <span className="text-xs text-gray-500">({report.date})</span>
            </span>
            <Button size="sm" variant="secondary">
              Download
            </Button>
          </li>
        ))}
      </ul>
      {/* --- PROFESSIONAL ENHANCEMENT START --- */}
      {/* Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to financial reports */}
      {/* Consistent with Dashboard and design system */}
      {/* --- PROFESSIONAL ENHANCEMENT END --- */}
    </PageTemplate>
  );
};

export default FinancialReports;
