import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

export default function AuditLogsNav() {
  return (
    <div className="flex justify-end mb-4">
      <Button asChild variant="outline">
        <Link to="/audit/logs">View Audit Logs</Link>
      </Button>
    </div>
  );
}
