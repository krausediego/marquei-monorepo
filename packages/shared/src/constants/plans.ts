import type { PlanLimits, PlanName, SubscriptionPlan } from '../types';


export const PLAN_LIMITS: Record<PlanName, PlanLimits> = {
  standard: {
    professionals: 3,
  },
  premium: {
    professionals: 6,
  },
  pro: {
    professionals: 12,
  },
};

export const SUBSCRIPTION_PLANS: SubscriptionPlan[] = [
  {
    name: 'standard',
    priceId: 'price_1Su03uAU7tDzPSpagM66FXmC',
    limits: PLAN_LIMITS.standard,
    freeTrial: {
      days: 14,
    },
  },
  {
    name: 'premium',
    priceId: 'price_1Su04DAU7tDzPSpaa7MQFEjR',
    limits: PLAN_LIMITS.premium,
    freeTrial: {
      days: 14,
    },
  },
  {
    name: 'pro',
    priceId: 'price_1Su04UAU7tDzPSpaX8vbzC1U',
    limits: PLAN_LIMITS.pro,
    freeTrial: {
      days: 14,
    },
  },
];

export function getPlanLimits(planName: PlanName): PlanLimits {
  return PLAN_LIMITS[planName];
}

export function isValidPlan(planName: string): planName is PlanName {
  return planName in PLAN_LIMITS;
}

export const PLAN_FEATURES: Record<PlanName, string[]> = {
  standard: ['basic_reports', 'add_professional'],
  premium: ['basic_reports', 'add_professional', 'advanced_reports'],
  pro: ['basic_reports', 'add_professional', 'advanced_reports', 'api_access'],
};

export function canAccessFeature(
  planName: PlanName | null,
  feature: string
): boolean {
  if (!planName) return false;
  return PLAN_FEATURES[planName].includes(feature);
}
