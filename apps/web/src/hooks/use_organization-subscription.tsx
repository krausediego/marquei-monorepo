import { useAuth } from "@/contexts/auth-context";
import { auth } from "@/lib/auth";
import { useQuery } from "@tanstack/react-query";
import type {
  OrganizationSubscription,
  PlanLimits,
  PlanName,
  SubscriptionStatus,
} from "@repo/shared/types";

export function useOrganizationSubscription() {
  const { organizationId } = useAuth();

  return useQuery({
    queryKey: ["subscription", "organization", organizationId],
    queryFn: async () => {
      const response = await auth.subscription.list({
        query: { referenceId: organizationId! },
      });

      if (!response.data || response.data.length === 0) {
        return null;
      }

      const orgSubscription = response.data[0];

      return {
        id: orgSubscription.id,
        status: orgSubscription.status as SubscriptionStatus,
        planId: orgSubscription.plan as PlanName,
        currentPeriodStart:
          orgSubscription.periodStart && new Date(orgSubscription.periodStart),
        currentPeriodEnd:
          orgSubscription.periodEnd && new Date(orgSubscription.periodEnd),
        cancelAtPeriodEnd: orgSubscription.cancelAtPeriodEnd,
        trialEnd:
          orgSubscription.trialEnd && new Date(orgSubscription.trialEnd),
        organizationId: orgSubscription.referenceId,
        limits: orgSubscription.limits as PlanLimits,
      } as OrganizationSubscription;
    },
    enabled: !!organizationId,
    staleTime: 1000 * 60 * 5,
  });
}
