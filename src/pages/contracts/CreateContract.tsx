import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const templates = [
  { name: "Standard Contract", id: 1 },
  { name: "NDA", id: 2 },
  { name: "Service Agreement", id: 3 },
];

const CreateContract = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(templates[0].id);
  const [contractName, setContractName] = useState("");
  const [summary, setSummary] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSummary(
      `Contract: ${contractName}\nTemplate: ${
        templates.find((t) => t.id === selectedTemplate)?.name
      }`,
    );
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <PageTemplate
      title="Create Contract"
      description="Create new contracts from templates"
    >
      <form
        className="max-w-lg mx-auto bg-white p-6 rounded shadow"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label className="block mb-1 font-medium">Contract Name</label>
          <input
            className="w-full border rounded p-2"
            value={contractName}
            onChange={(e) => setContractName(e.target.value)}
            required
            placeholder="Enter contract name"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1 font-medium">Template</label>
          <select
            className="w-full border rounded p-2"
            value={selectedTemplate}
            onChange={(e) => setSelectedTemplate(Number(e.target.value))}
          >
            {templates.map((t) => (
              <option key={t.id} value={t.id}>
                {t.name}
              </option>
            ))}
          </select>
        </div>
        <Button type="submit">Create Contract</Button>
      </form>
      {submitted && (
        <div className="mt-4 bg-green-50 border border-green-200 p-4 rounded">
          <div className="font-semibold mb-2">Contract Created!</div>
          <pre className="text-sm whitespace-pre-wrap">{summary}</pre>
        </div>
      )}
    </PageTemplate>
  );
};

export default CreateContract;

// --- PROFESSIONAL ENHANCEMENT START ---
// Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to create contract
// Consistent with Dashboard and design system
