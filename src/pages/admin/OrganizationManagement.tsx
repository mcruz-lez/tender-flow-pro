import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const OrganizationManagement = () => {
  const [org, setOrg] = useState({ name: "Acme Corp", address: "123 Main St", contact: "admin@acme.com" });
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState(org);

  const handleSave = () => {
    setOrg(form);
    setEditing(false);
  };

  return (
    <PageTemplate
      title="Organization Management"
      description="Manage organization structure and settings"
    >
      <div className="mb-4">
        <label className="block font-medium mb-1">Organization Name</label>
        {editing ? (
          <input className="border rounded p-2 w-full mb-2" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        ) : (
          <div className="mb-2">{org.name}</div>
        )}
        <label className="block font-medium mb-1">Address</label>
        {editing ? (
          <input className="border rounded p-2 w-full mb-2" value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} />
        ) : (
          <div className="mb-2">{org.address}</div>
        )}
        <label className="block font-medium mb-1">Contact Email</label>
        {editing ? (
          <input className="border rounded p-2 w-full mb-2" value={form.contact} onChange={e => setForm({ ...form, contact: e.target.value })} />
        ) : (
          <div className="mb-2">{org.contact}</div>
        )}
      </div>
      {editing ? (
        <Button onClick={handleSave}>Save</Button>
      ) : (
        <Button onClick={() => setEditing(true)}>Edit</Button>
      )}
    </PageTemplate>
  );
};

export default OrganizationManagement;
