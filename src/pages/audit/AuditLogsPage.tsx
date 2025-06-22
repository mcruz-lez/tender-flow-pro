import React, { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function AuditLogsPage() {
  const [logs, setLogs] = useState<
    Array<{
      id: string;
      action: string;
      entity_type: string;
      created_at: string;
      user_id?: string;
      organization_id?: string;
      entity_id?: string;
      before?: unknown;
      after?: unknown;
    }>
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/audit-logs")
      .then((res) => res.json())
      .then((data) => {
        setLogs(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <Card>
        <CardHeader>
          <CardTitle>Audit Logs</CardTitle>
        </CardHeader>
        <CardContent>
          {loading ? (
            <Skeleton className="h-32 w-full" />
          ) : logs.length === 0 ? (
            <div className="text-muted-foreground">No audit logs found.</div>
          ) : (
            <ul className="space-y-4">
              {logs.map((log) => (
                <li key={log.id} className="flex flex-col gap-1 border-b pb-2">
                  <div className="flex items-center gap-2">
                    <Badge variant="secondary">{log.action}</Badge>
                    <span className="font-semibold">{log.entity_type}</span>
                    <span className="text-xs text-muted-foreground">
                      {new Date(log.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    User: {log.user_id} | Org: {log.organization_id} | Entity
                    ID: {log.entity_id}
                  </div>
                  {log.before && (
                    <pre className="bg-muted p-2 rounded text-xs mt-1">
                      Before: {JSON.stringify(log.before, null, 2)}
                    </pre>
                  )}
                  {log.after && (
                    <pre className="bg-muted p-2 rounded text-xs mt-1">
                      After: {JSON.stringify(log.after, null, 2)}
                    </pre>
                  )}
                </li>
              ))}
            </ul>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
