import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { auth } from "@/lib/auth";

export const authKeys = {
  session: ["auth", "session"] as const,
  organizations: ["auth", "organizations"] as const,
  organization: (id: string) => ["auth", "organization", id] as const,
};

export function useSession() {
  return useQuery({
    queryKey: authKeys.session,
    queryFn: async () => {
      const { data, error } = await auth.getSession();
      if (error) throw error;
      return data;
    },
  });
}

export function useOrganizations() {
  return useQuery({
    queryKey: authKeys.organizations,
    queryFn: async () => {
      const { data, error } = await auth.organization.list();
      if (error) throw error;
      return data;
    },
  });
}

export function useSwitchOrganization() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (organizationId: string) => {
      const { data, error } = await auth.organization.setActive({
        organizationId,
      });
      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session });
    },
    onMutate: async (organizationId) => {
      await queryClient.cancelQueries({ queryKey: authKeys.session });

      const previousSession = queryClient.getQueryData(authKeys.session);

      queryClient.setQueryData(authKeys.session, (old: any) => ({
        ...old,
        session: {
          ...old?.session,
          activeOrganizationId: organizationId,
        },
      }));

      return { previousSession };
    },
    onError: (_, __, context) => {
      if (context?.previousSession) {
        queryClient.setQueryData(authKeys.session, context.previousSession);
      }
    },
  });
}

export function useSignOut() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await auth.signOut();
    },
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["auth"] });
    },
  });
}
