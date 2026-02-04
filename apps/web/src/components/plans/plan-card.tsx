import { useOrganizationSubscription } from "@/hooks/use_organization-subscription";
import { Button } from "../ui/button";
import { Crown, Lock, ShieldCheck, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "@tanstack/react-router";

const plans = {
  none: {
    name: "Sem plano",
    icon: Lock,
  },
  standard: {
    name: "Standard",
    icon: ShieldCheck,
  },
  premium: {
    name: "Premium",
    icon: Zap,
  },
  pro: {
    name: "PRO",
    icon: Crown,
  },
};

export function PlanCard() {
  const navigate = useNavigate();
  const { data } = useOrganizationSubscription();

  const planId = data?.planId || "none";
  const currentPlan = plans[planId] || plans.none;
  const Icon = currentPlan.icon;
  const noPlanActive = planId === "none";

  return (
    <div
      className={cn(
        "bg-accent w-full space-y-4 rounded-md border p-4",
        noPlanActive && "bg-destructive/5 border-destructive/10",
      )}
    >
      <div className="flex items-center gap-2">
        <div
          className={cn(
            "bg-card flex size-8 items-center justify-center rounded-sm shadow-xs",
            noPlanActive && "bg-destructive/10",
          )}
        >
          <Icon
            className={cn(
              "text-accent-foreground size-4",
              noPlanActive && "text-destructive",
            )}
          />
        </div>
        <div>
          <h3
            className={cn(
              "text-sm font-semibold",
              noPlanActive && "text-destructive saturate-50",
            )}
          >
            {currentPlan.name}
          </h3>
          <p
            className={cn(
              "text-muted-foreground text-xs",
              noPlanActive && "text-destructive saturate-25",
            )}
          >
            {noPlanActive ? "Nenhum Plano Ativo" : "Plano Ativo"}
          </p>
        </div>
      </div>

      <Button
        size="sm"
        variant={noPlanActive ? "destructive" : "outline"}
        onClick={() => navigate({ to: "/plans" })}
        className="w-full"
      >
        {noPlanActive ? "Assinar agora" : "Gerenciar Assinatura"}
      </Button>
    </div>
  );
}
