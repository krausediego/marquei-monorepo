import type { Session } from "better-auth";
import * as React from "react";
import { useSession } from "@/hooks/use-auth-query";

interface AuthContextValue {
  session: Session | null;
  organizationId: string | null;
  isLoading: boolean;
  isError: boolean;
}

const AuthContext = React.createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { data: session, isLoading, isError } = useSession();

  const value = {
    session: session?.session ?? null,
    organizationId: session?.session?.activeOrganizationId ?? null,
    isLoading,
    isError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth using inside with AuthProvider");
  }
  return context;
}
