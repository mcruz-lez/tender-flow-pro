import { useContext } from "react";
import { AuthContext as AuthContextOriginal } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContextOriginal);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export { AuthContextOriginal as AuthContext };
