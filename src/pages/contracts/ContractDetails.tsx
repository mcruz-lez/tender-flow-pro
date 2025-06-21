import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { StripeCheckoutButton } from '@/components/StripeCheckoutButton';

// --- PROFESSIONAL ENHANCEMENT START ---
// Apply animated glassmorphism, vibrant gradients, 3D shadows, animated CTAs, badge systems, responsive layouts, and accessibility to contract details
// Consistent with Dashboard and design system
// --- PROFESSIONAL ENHANCEMENT END ---

const ContractDetails = () => {
  const [contract, setContract] = useState({
    name: "HVAC Upgrade",
    vendor: "TechClimate Solutions",
    value: 45000,
  });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(contract);

  const handleSave = () => {
    setContract(form);
    setEditing(false);
  };

  return (
    <PageTemplate
      title="Contract Details"
      description="View and manage contract information"
    >
      <div className="mb-4">
        <label className="block font-medium mb-1">Contract Name</label>
        {editing ? (
          <input
            className="border rounded p-2 w-full mb-2"
            value={form.name}
            onChange={(e) =>
              setForm({ ...form, name: e.target.value })
            }
          />
        ) : (
          <div className="mb-2">{contract.name}</div>
        )}
        <label className="block font-medium mb-1">Vendor</label>
        {editing ? (
          <input
            className="border rounded p-2 w-full mb-2"
            value={form.vendor}
            onChange={(e) =>
              setForm({ ...form, vendor: e.target.value })
            }
          />
        ) : (
          <div className="mb-2">{contract.vendor}</div>
        )}
        <label className="block font-medium mb-1">Value</label>
        {editing ? (
          <input
            className="border rounded p-2 w-full mb-2"
            type="number"
            value={form.value}
            onChange={(e) =>
              setForm({ ...form, value: Number(e.target.value) })
            }
          />
        ) : (
          <div className="mb-2">${contract.value.toLocaleString()}</div>
        )}
      </div>
      {/* Stripe Payment for Contract (EMD, Security Deposit, etc.) */}
      <div className="my-6">
        <StripeCheckoutButton
          amount={contract.value * 0.1}
          currency="usd"
          description="Contract Security Deposit (10%)"
          type="contract"
          onSuccess={() => alert('Contract payment successful!')}
        />
      </div>
      {editing ? (
        <Button onClick={handleSave}>Save</Button>
      ) : (
        <Button onClick={() => setEditing(true)}>Edit</Button>
      )}
    </PageTemplate>
  );
};

export default ContractDetails;
