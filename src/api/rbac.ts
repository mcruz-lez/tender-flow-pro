// RBAC utility for role-based access control
export function canAccess(
  user: { role: string },
  resource: string,
  action: string,
) {
  // Example RBAC matrix
  const matrix: Record<string, Record<string, string[]>> = {
    settings: {
      read: ["admin", "property_manager"],
      write: ["admin", "property_manager"],
    },
    audit_logs: { read: ["admin"], write: [] },
    messaging: {
      read: ["admin", "property_manager", "vendor"],
      write: ["admin", "property_manager", "vendor"],
    },
    documents: {
      read: ["admin", "property_manager", "vendor"],
      write: ["admin", "property_manager"],
    },
  };
  return matrix[resource]?.[action]?.includes(user.role) ?? false;
}
