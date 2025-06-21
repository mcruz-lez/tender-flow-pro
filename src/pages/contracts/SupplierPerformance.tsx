import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialSuppliers = [
  { name: "TechClimate Solutions", score: 92 },
  { name: "SecureGuard Solutions", score: 88 },
];

const SupplierPerformance = () => {
  const [suppliers, setSuppliers] = useState(initialSuppliers);
  const [name, setName] = useState("");
  const [score, setScore] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && score) {
      setSuppliers([{ name, score: Number(score) }, ...suppliers]);
      setName("");
      setScore("");
    }
  };

  return (
    <PageTemplate
      title="Supplier Performance"
      description="Track and analyze supplier performance metrics"
    >
      <form className="mb-6 flex gap-2" onSubmit={handleAdd}>
        <input
          className="flex-1 border rounded p-2"
          placeholder="Supplier name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          className="border rounded p-2 w-32"
          placeholder="Score"
          type="number"
          value={score}
          onChange={(e) => setScore(e.target.value)}
          required
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {suppliers.map((s, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>{s.name}</span>
            <span className="text-blue-700 font-medium">{s.score}</span>
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default SupplierPerformance;

// --- PROFESSIONAL ENHANCEMENT START ---
// Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to supplier performance
// Consistent with Dashboard and design system
