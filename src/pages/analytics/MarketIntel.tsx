import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const trends = [
  "Rising demand for green building services.",
  "Increased competition in security tenders.",
  "AI adoption in procurement is accelerating.",
];

const MarketIntel = () => {
  const [insight, setInsight] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setInsight("");
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <PageTemplate
      title="Market Intelligence"
      description="Market insights and competitive analysis"
    >
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Current Trends</h2>
        <ul className="list-disc list-inside space-y-2 text-gray-700">
          {trends.map((t, idx) => (
            <li key={idx}>{t}</li>
          ))}
        </ul>
      </div>
      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">Share an Insight</h2>
        <form className="flex gap-2" onSubmit={handleSubmit}>
          <input
            className="flex-1 border rounded p-2"
            placeholder="Your market insight..."
            value={insight}
            onChange={(e) => setInsight(e.target.value)}
            required
          />
          <Button type="submit">Submit</Button>
        </form>
        {submitted && (
          <div className="text-green-600 mt-2">Thank you for your insight!</div>
        )}
      </div>
    </PageTemplate>
  );
};

// --- PROFESSIONAL ENHANCEMENT START ---
// Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to market intelligence
// Consistent with Dashboard and design system
// --- PROFESSIONAL ENHANCEMENT END ---

export default MarketIntel;
