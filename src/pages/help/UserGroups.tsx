import PageTemplate from "@/components/PageTemplate";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const initialGroups = [
  { name: "Procurement Professionals", members: 24 },
  { name: "Vendor Network", members: 15 },
  { name: "Compliance Experts", members: 8 },
];

const UserGroups = () => {
  const [groups, setGroups] = useState(initialGroups);
  const [newGroup, setNewGroup] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (newGroup) {
      setGroups([{ name: newGroup, members: 1 }, ...groups]);
      setNewGroup("");
    }
  };

  return (
    <PageTemplate
      title="User Groups"
      description="Connect with other users in your region or industry"
    >
      <Card className="mb-8">
        <CardContent className="p-6">
          <CardTitle>Create a New Group</CardTitle>
          <form className="space-y-2 mt-4" onSubmit={handleCreate}>
            <input
              className="w-full border rounded p-2"
              required
              placeholder="Group Name"
              value={newGroup}
              onChange={(e) => setNewGroup(e.target.value)}
            />
            <Button type="submit">Create Group</Button>
          </form>
        </CardContent>
      </Card>
      <div className="space-y-4">
        {groups.map((group, idx) => (
          <Card key={idx}>
            <CardContent className="flex items-center justify-between p-4">
              <div className="font-medium">{group.name}</div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600 font-semibold">
                  {group.members} members
                </span>
                <Button size="sm" variant="outline">
                  Join
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </PageTemplate>
  );
};

export default UserGroups;
