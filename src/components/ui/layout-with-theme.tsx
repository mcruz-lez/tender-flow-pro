import { ReactNode } from "react";
import { ThemeToggle } from "./theme-toggle";

interface LayoutWithThemeProps {
  children: ReactNode;
}

export function LayoutWithTheme({ children }: LayoutWithThemeProps) {
  return (
    <div className="relative min-h-screen">
      {/* Global Theme Toggle */}
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
      {children}
    </div>
  );
}