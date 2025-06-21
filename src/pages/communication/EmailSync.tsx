import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialAccounts = [
  { email: "user@company.com", connected: true },
  { email: "admin@company.com", connected: false },
];

const EmailSync = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [email, setEmail] = useState("");

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setAccounts([{ email: email.trim(), connected: false }, ...accounts]);
      setEmail("");
    }
  };

  const handleConnect = (idx: number) => {
    setAccounts(
      accounts.map((a, i) => (i === idx ? { ...a, connected: true } : a)),
    );
  };

  return (
    <PageTemplate
      title="Email Integration"
      description="Sync and manage email communications within the platform"
    >
      <form className="mb-6 flex gap-2" onSubmit={handleAdd}>
        <input
          className="flex-1 border rounded p-2"
          placeholder="Add email account..."
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit">Add</Button>
      </form>
      <ul className="space-y-2">
        {accounts.map((a, idx) => (
          <li
            key={idx}
            className="flex justify-between items-center border rounded p-2 bg-gray-50"
          >
            <span>{a.email}</span>
            {a.connected ? (
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

export default EmailSync;
