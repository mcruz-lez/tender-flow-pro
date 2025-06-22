import { useEffect, useState } from "react";
import { getDocuments, uploadDocument } from "@/integrations/supabase/api";
import { useAuth } from "@/contexts/useAuth";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { canAccess } from "@/api/rbac";

const DocumentManagementPage = () => {
  const { user } = useAuth();
  const [documents, setDocuments] = useState<
    Array<{ name: string; url: string }>
  >([]);
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
      { role: user?.role || user?.user_metadata?.role || "user" },
      "documents",
      "read",
    )
  )
    return <div className="p-8 text-center text-red-500">Access denied.</div>;

  return (
    <div className="max-w-4xl mx-auto py-10 grid grid-cols-1 md:grid-cols-3 gap-6">
      <Card className="md:col-span-1">
        <CardHeader>
          <CardTitle>Document Management</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleUpload} className="space-y-4">
            <input
              type="file"
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              disabled={loading}
              className="flex-1"
            />
            <Button type="submit" disabled={loading || !file}>
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </form>
          <ul className="space-y-2">
            {(documents || []).map((doc, idx) => (
              <li key={idx}>
                <a
                  href={doc.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline"
                >
                  {doc.name}
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
