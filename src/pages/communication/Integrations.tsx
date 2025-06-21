import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialIntegrations = [
  { name: "Slack", connected: true },
  { name: "DocuSign", connected: false },
];

const Integrations = () => {
  const [integrations, setIntegrations] = useState(initialIntegrations);
  const [name, setName] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      setIntegrations([
        { name: name.trim(), connected: false },
        ...integrations,
      ]);
      setName("");
    }
  };

  const handleConnect = (idx: number) => {
    setIntegrations(
      integrations.map((i, n) => (n === idx ? { ...i, connected: true } : i)),
    );
  };

  return (
    <PageTemplate
      title="Third-party Integrations"
      description="Connect with external tools and services"
    >
      <form className="mb-6 flex gap-2" onSubmit={handleAdd}>
        <input
          className="flex-1 border rounded p-2"
          placeholder="Integration name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {integrations.map((i, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>{i.name}</span>
            {i.connected ? (
              <span className="text-green-600 font-medium">Connected</span>
            ) : (
              <Button size="sm" onClick={() => handleConnect(idx)}>
                Connect
              </Button>
            )}
          </li>
        ))}
      </ul>
    </PageTemplate>
  );
};

export default Integrations;
