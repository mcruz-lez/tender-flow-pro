import { useEffect, useState } from "react";
import { getAuditLogs } from "@/integrations/supabase/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { canAccess } from "@/api/rbac";
import { useAuth } from "@/contexts/useAuth";

const AuditLogsPage = () => {
  const { user } = useAuth();
  const [logs, setLogs] = useState<
    {
      action: string;
      user_email?: string;
      user_id?: string;
      created_at: string;
      resource?: string;
    }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getAuditLogs(100)
      .then(setLogs)
      .finally(() => setLoading(false));
  }, []);

  if (!user)
    return (
      <div className="p-8 text-center">Please sign in to view audit logs.</div>
    );
  if (
    !canAccess(
      { role: user.role || user.user_metadata?.role || "user" },
      "audit_logs",
      "read",
    )
  )
    return <div className="p-8 text-center text-red-500">Access denied.</div>;

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <div className="text-center py-8">Loading...</div>
          ) : (Array.isArray(logs) ? logs : []).length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No audit logs found.
            </div>
          ) : (
            <ul className="divide-y divide-gray-200">
              {(Array.isArray(logs) ? logs : []).map((log, idx) => (
                <li
                  key={idx}
                  className="py-3 flex flex-col md:flex-row md:items-center md:justify-between gap-2"
                >
                  <div>
                    <span className="font-semibold text-blue-700">
                      {log.action}
                    </span>{" "}
                    by{" "}
                    <span className="font-medium">
                      {log.user_email || log.user_id}
                    </span>
                    <span className="ml-2 text-gray-500 text-xs">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                  <Badge variant="secondary">{log.resource || "N/A"}</Badge>
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AuditLogsPage;
