export type SubscriptionStatus =
  | 'active'
  | 'canceled'
  | 'incomplete'
  | 'incomplete_expired'
  | 'past_due'
  | 'trialing'
  | 'unpaid';

export type PlanName = 'standard' | 'premium' | 'pro';

export interface PlanLimits extends Record<string, unknown> {
  professionals: number;
}

export interface SubscriptionPlan {
  name: PlanName;
  priceId: string;
  limits: PlanLimits;
  freeTrial?: {
    days: number;
  };
}

export interface OrganizationSubscription {
  id: string;
  status: SubscriptionStatus;
  planId: PlanName;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean | null;
  trialEnd: Date | null;
  organizationId: string;
}

export interface SubscriptionFeatures {
  hasActiveSubscription: boolean;
  isTrialing: boolean;
  isPastDue: boolean;
  daysUntilExpiry: number;
  plan: PlanName | null;
  limits: PlanLimits;
  canAccessFeature: (feature: string) => boolean;
}
