import { Crown, ShieldCheck, Zap, type LucideIcon } from "lucide-react";

interface PlanList {
  planName: string;
  planDescription: string;
  price: string;
  icon: LucideIcon;
  planDetails: string[];
  isRecommended?: boolean;
  isPro?: boolean;
}

export const plansList: PlanList[] = [
  {
    planName: "Standard",
    planDescription: "Ideal para quem está começando",
    price: "R$ 49,90",
    icon: ShieldCheck,
    planDetails: ["Agenda básica", "Até 3 profissionais", "Gestão de clientes"],
    isRecommended: false,
    isPro: false,
  },
  {
    planName: "Premium",
    planDescription: "Para negócios em expansão",
    price: "R$ 89,90",
    icon: Zap,
    planDetails: [
      "Agenda avançada",
      "Até 7 profissionais",
      "Lembretes e-mail",
      "Financeiro básico",
    ],
    isRecommended: true,
    isPro: false,
  },
  {
    planName: "PRO",
    planDescription: "Gestão completa e sem limites",
    price: "R$ 149,90",
    icon: Crown,
    planDetails: [
      "Ilimitado",
      "API de integração",
      "Relatórios avançados",
      "Suporte prioritário",
    ],
    isRecommended: false,
    isPro: true,
  },
];
