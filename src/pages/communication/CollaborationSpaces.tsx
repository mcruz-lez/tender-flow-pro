import PageTemplate from "@/components/PageTemplate";
import { useState } from "react";
import { Button } from "@/components/ui/button";

const initialSpaces = [
  { name: "Project Alpha", members: 8 },
  { name: "Procurement Team", members: 5 },
];

const CollaborationSpaces = () => {
  const [spaces, setSpaces] = useState(initialSpaces);
  const [newSpace, setNewSpace] = useState("");
  const [joined, setJoined] = useState(false);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newSpace.trim()) {
      setSpaces([{ name: newSpace.trim(), members: 1 }, ...spaces]);
      setNewSpace("");
      setJoined(true);
      setTimeout(() => setJoined(false), 2000);
    }
  };

  return (
    <PageTemplate
      title="Collaboration Spaces"
      description="Team collaboration and project workspaces"
    >
      <form className="mb-6 flex gap-2" onSubmit={handleCreate}>
        <input
          className="flex-1 border rounded p-2"
          placeholder="Create new space..."
          value={newSpace}
          onChange={(e) => setNewSpace(e.target.value)}
        />
        <Button type="submit">Create</Button>
      </form>
      {joined && (
        <div className="mb-4 text-green-600">Space created and joined!</div>
      )}
      <div className="grid gap-4">
        {spaces.map((space, idx) => (
          <div
            key={idx}
            className="border rounded p-4 flex justify-between items-center bg-gray-50"
          >
            <div>
              <div className="font-medium">{space.name}</div>
              <div className="text-sm text-gray-600">
                Members: {space.members}
              </div>
            </div>
            <Button size="sm" variant="secondary">
              Join
            </Button>
          </div>
        ))}
      </div>
    </PageTemplate>
  );
};

export default CollaborationSpaces;
