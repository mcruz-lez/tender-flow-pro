// Utility exports for sidebar
export { cva } from "class-variance-authority";
export { cn } from "@/lib/utils";

// Sidebar constants
export const SIDEBAR_COOKIE_NAME = "sidebar:state";
export const SIDEBAR_COOKIE_MAX_AGE = 60 * 60 * 24 * 7; // 1 week in seconds
export const SIDEBAR_WIDTH = "16rem";
export const SIDEBAR_WIDTH_MOBILE = "18rem";
export const SIDEBAR_WIDTH_ICON = "3rem";
export const SIDEBAR_KEYBOARD_SHORTCUT = {
  key: "b",
  ctrlOrMeta: true,
};

// Copy of useSidebar hook for fast-refresh compliance
import * as React from "react";

const SidebarContext = React.createContext(null);

export function useSidebar() {
  const context = React.useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider.");
  }
  return context;
}
