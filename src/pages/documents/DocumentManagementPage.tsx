import { useEffect, useState } from "react";
import { getDocuments, uploadDocument } from "@/integrations/supabase/api";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { canAccess } from "@/api/rbac";

const DocumentManagementPage = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<any[]>([]);
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      getDocuments(user.id).then(setDocuments);
    }
  }, [user]);

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !file) return;
    setLoading(true);
    // Simulate upload to Supabase Storage and get URL (replace with real upload logic)
    const url = URL.createObjectURL(file);
    await uploadDocument({ owner_id: user.id, name: file.name, url });
    setFile(null);
    getDocuments(user.id).then(setDocuments);
    setLoading(false);
  };

  if (!user)
    return (
      <div className="p-8 text-center">Please sign in to manage documents.</div>
    );
  if (
    !canAccess(
      { role: user.role || user.user_metadata?.role || "user" },
      "documents",
      "read",
    )
  )
    return <div className="p-8 text-center text-red-500">Access denied.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
        </CardHeader>
        <CardContent>
          <form className="flex gap-2 mb-6" onSubmit={handleUpload}>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="flex-1"
              disabled={loading}
            />
            <Button type="submit" disabled={loading || !file}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </form>
          <ul className="space-y-2">
            {documents.map((doc, idx) => (
              <li
                key={idx}
                className="flex items-center justify-between border rounded p-2 bg-gray-50"
              >
                <span>{doc.name}</span>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  View
                </a>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};

export default DocumentManagementPage;
