import { ContentLayout } from "@/components/admin-panel/content-layout";
import { plansList } from "@/lib/plans-list";
import { createFileRoute } from "@tanstack/react-router";
import { PlanCard } from "./-components/plan-card";
import { useOrganizationSubscription } from "@/hooks/use_organization-subscription";

export const Route = createFileRoute("/_application/plans/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { data } = useOrganizationSubscription();

  return (
    <ContentLayout title="Gerenciar assinatura">
      <div className="flex flex-1 flex-col items-center justify-center gap-8 px-4">
        <div className="space-y-2 text-center">
          <h3 className="text-sm font-semibold tracking-widest uppercase">
            Planos e Preços
          </h3>
          <h1 className="text-3xl font-bold tracking-tight">
            Gestão profissional para seu negócio
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg">
            Escolha o plano que melhor se adapta ao momento da sua empresa.
            Transparência total, sem custos ocultos.
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-3">
          {plansList.map((plan) => (
            <PlanCard
              {...plan}
              isActive={
                !!(data && data.planId === plan.planName.toLocaleLowerCase())
              }
            />
          ))}
        </div>
      </div>
    </ContentLayout>
  );
}
