import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialPolicies = [
  "Data Encryption",
  "User Access Control",
  "Incident Response",
  "Audit Logging",
];

const SecurityCompliance = () => {
  const [policies, setPolicies] = useState(initialPolicies);
  const [newPolicy, setNewPolicy] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPolicy.trim() && !policies.includes(newPolicy.trim())) {
      setPolicies([newPolicy.trim(), ...policies]);
      setNewPolicy("");
    }
  };

  const handleRemove = (policy: string) => {
    setPolicies(policies.filter((p) => p !== policy));
  };

  return (
    <PageTemplate
      title="Security & Compliance"
      description="Manage security policies and compliance"
    >
      <form className="mb-6 flex gap-2" onSubmit={handleAdd}>
        <input
          className="flex-1 border rounded p-2"
          placeholder="Add new policy..."
          value={newPolicy}
          onChange={(e) => setNewPolicy(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {policies.map((policy, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>{policy}</span>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleRemove(policy)}
            >
              Remove
            </Button>
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default SecurityCompliance;
