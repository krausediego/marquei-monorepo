import { useAuth } from "@/contexts/auth-context";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { PlanName } from "@repo/shared/types";
import { auth } from "@/lib/auth";

export function useCreateCheckout() {
  const { organizationId } = useAuth();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ planId }: { planId: PlanName }) => {
      if (!organizationId) {
        throw new Error("No active organization");
      }

      const response = await auth.subscription.upgrade({
        plan: planId,
        referenceId: organizationId,
        customerType: "organization",
        successUrl: `${window.location.origin}/plans`,
        cancelUrl: `${window.location.origin}/plans`,
      });

      if (response.error) {
        throw new Error(response.error.message);
      }

      if (response.data?.url) {
        window.location.href = response.data.url;
      }

      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["subscription"],
      });
    },
  });
}
