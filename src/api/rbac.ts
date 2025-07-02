// RBAC utility for role-based access control
import { supabase } from "@/integrations/supabase/client";

export type UserRole = 'admin' | 'property_manager' | 'procurement_manager' | 'contractor' | 'vendor' | 'finance_manager' | 'evaluator';

export interface RBACUser {
  id: string;
  role: UserRole;
  organizationId?: string;
}

// Legacy interface for backward compatibility
export interface LegacyUser {
  role: string;
}

// Enhanced RBAC matrix with granular permissions
const PERMISSIONS_MATRIX: Record<string, Record<string, UserRole[]>> = {
  tenders: {
    create: ['admin', 'property_manager', 'procurement_manager'],
    view: ['admin', 'property_manager', 'procurement_manager', 'contractor', 'vendor', 'evaluator'],
    edit: ['admin', 'property_manager', 'procurement_manager'],
    delete: ['admin', 'property_manager'],
    publish: ['admin', 'property_manager', 'procurement_manager'],
  },
  bids: {
    create: ['vendor', 'contractor'],
    view: ['admin', 'property_manager', 'procurement_manager', 'contractor', 'vendor', 'evaluator'],
    edit: ['vendor', 'contractor'],
    evaluate: ['admin', 'property_manager', 'evaluator', 'procurement_manager'],
  },
  contracts: {
    create: ['admin', 'property_manager', 'procurement_manager'],
    view: ['admin', 'property_manager', 'procurement_manager', 'contractor', 'vendor', 'finance_manager'],
    edit: ['admin', 'property_manager', 'procurement_manager'],
    approve: ['admin', 'property_manager'],
  },
  payments: {
    process: ['admin', 'finance_manager'],
    view: ['admin', 'finance_manager', 'property_manager'],
    refund: ['admin', 'finance_manager'],
  },
  admin: {
    access: ['admin'],
    user_management: ['admin'],
    system_config: ['admin'],
    audit_logs: ['admin'],
  },
  settings: {
    read: ['admin', 'property_manager', 'procurement_manager', 'finance_manager'],
    write: ['admin', 'property_manager'],
  },
  documents: {
    upload: ['admin', 'property_manager', 'procurement_manager', 'vendor', 'contractor'],
    view: ['admin', 'property_manager', 'procurement_manager', 'vendor', 'contractor', 'evaluator'],
    download: ['admin', 'property_manager', 'procurement_manager', 'vendor', 'contractor'],
  },
};

// Check if user has specific permission
export function canAccess(user: RBACUser | LegacyUser, resource: string, action: string): boolean {
  const resourcePermissions = PERMISSIONS_MATRIX[resource];
  if (!resourcePermissions) return false;
  
  const actionRoles = resourcePermissions[action];
  if (!actionRoles) return false;
  
  return actionRoles.includes(user.role as UserRole);
}

// Get user role from Supabase
export async function getUserRole(userId: string): Promise<UserRole | null> {
  try {
    const { data, error } = await supabase
      .rpc('get_user_role', { _user_id: userId });
    
    if (error) {
      console.error('Error fetching user role:', error);
      return null;
    }
    
    return data as UserRole;
  } catch (error) {
    console.error('Error in getUserRole:', error);
    return null;
  }
}

// Check specific tender permissions
export async function canCreateTender(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('can_create_tender', { _user_id: userId });
    
    return !error && data === true;
  } catch (error) {
    console.error('Error checking tender creation permission:', error);
    return false;
  }
}

// Check specific bid permissions
export async function canBidOnTender(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('can_bid_on_tender', { _user_id: userId });
    
    return !error && data === true;
  } catch (error) {
    console.error('Error checking bid permission:', error);
    return false;
  }
}

// Check evaluation permissions
export async function canEvaluateBids(userId: string): Promise<boolean> {
  try {
    const { data, error } = await supabase
      .rpc('can_evaluate_bids', { _user_id: userId });
    
    return !error && data === true;
  } catch (error) {
    console.error('Error checking evaluation permission:', error);
    return false;
  }
}

// Role-based dashboard routes
export function getDashboardRoute(role: UserRole): string {
  switch (role) {
    case 'admin':
      return '/dashboard/admin';
    case 'property_manager':
      return '/dashboard/pm';
    case 'procurement_manager':
      return '/dashboard/pm';
    case 'contractor':
      return '/dashboard/contractor';
    case 'vendor':
      return '/dashboard/vendor';
    case 'finance_manager':
      return '/dashboard/finance';
    case 'evaluator':
      return '/dashboard';
    default:
      return '/dashboard';
  }
}

// Get role display name
export function getRoleDisplayName(role: UserRole): string {
  const roleNames: Record<UserRole, string> = {
    admin: 'Administrator',
    property_manager: 'Property Manager',
    procurement_manager: 'Procurement Manager',
    contractor: 'Contractor',
    vendor: 'Vendor',
    finance_manager: 'Finance Manager',
    evaluator: 'Evaluator',
  };
  
  return roleNames[role] || role;
}

// Get allowed features for role
export function getAllowedFeatures(role: UserRole): string[] {
  const features: Record<UserRole, string[]> = {
    admin: ['all'],
    property_manager: ['tenders', 'contracts', 'vendors', 'properties', 'analytics'],
    procurement_manager: ['tenders', 'bids', 'contracts', 'vendors', 'analytics'],
    contractor: ['tenders_view', 'bids', 'contracts_view'],
    vendor: ['tenders_view', 'bids', 'contracts_view'],
    finance_manager: ['payments', 'contracts', 'analytics'],
    evaluator: ['bids_evaluate', 'tenders_view'],
  };
  
  return features[role] || [];
}
