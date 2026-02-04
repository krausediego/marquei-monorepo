import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";
import { useCreateCheckout } from "@/hooks/use-create-checkout";
import { cn } from "@/lib/utils";
import type { PlanName } from "@repo/shared/types";
import { Check, type LucideIcon } from "lucide-react";

export interface PlanCardProps {
  planName: string;
  planDescription: string;
  price: string;
  icon: LucideIcon;
  planDetails: string[];
  isActive: boolean;
  isRecommended?: boolean;
  isPro?: boolean;
}

export function PlanCard({
  planName,
  planDescription,
  price,
  icon: Icon,
  planDetails,
  isActive = false,
  isRecommended,
  isPro,
}: PlanCardProps) {
  const { mutate: createCheckout, isPending } = useCreateCheckout();

  return (
    <div
      className={cn(
        "relative flex flex-col rounded-2xl border p-8 transition-all duration-300 hover:shadow-md",
        isActive &&
          "ring-primary scale-[1.02] border-transparent shadow-lg ring-2",
      )}
    >
      {isRecommended && (
        <Badge
          variant="secondary"
          className="absolute -top-2.5 left-1/2 -translate-x-1/2"
        >
          RECOMENDADO
        </Badge>
      )}

      <div className="mb-4 flex items-center justify-between">
        <div
          className={cn(
            "bg-accent text-primary flex items-center justify-center rounded-md p-2",
            isActive && "bg-primary text-primary-foreground",
          )}
        >
          <Icon size={20} />
        </div>
        {isActive && (
          <Badge variant="success">
            <Check className="size-4" />
            ATIVO
          </Badge>
        )}
      </div>

      <div className="mb-6">
        <h3 className="text-lg font-bold">{planName}</h3>
        <h5 className="text-muted-foreground min-h-10 text-sm">
          {planDescription}
        </h5>
      </div>

      <div className="mb-8 flex items-baseline gap-1">
        <h1 className="text-primary text-3xl font-bold">{price}</h1>
        <p className="text-muted-foreground text-sm">/mês</p>
      </div>

      <div className="mb-8 flex-1">
        <h4 className="text-muted-foreground mb-4 text-xs font-semibold tracking-wider uppercase">
          INCLUSO NO PLANO
        </h4>
        <ul className="space-y-3">
          {planDetails.map((detail) => (
            <li
              key={detail}
              className="text-muted-foreground flex items-start gap-3 text-sm"
            >
              <Check
                size={16}
                className={cn(
                  "text-muted-foreground mt-0.5 shrink-0",
                  isActive && "text-primary",
                )}
              />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button
        variant={isPro ? "default" : "outline"}
        disabled={isActive || isPending}
        onClick={() =>
          createCheckout({ planId: planName.toLowerCase() as PlanName })
        }
        className="mt-auto"
      >
        {isPending && <Spinner />}
        {isActive ? "Plano Atual" : `Selecionar ${planName}`}
      </Button>
    </div>
  );
}
