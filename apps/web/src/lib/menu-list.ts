import {
  Briefcase,
  CalendarCheck2,
  HandPlatter,
  Home,
  Hourglass,
  type LucideIcon,
  ShoppingCart,
  Star,
  UserLock,
  UserSearch,
} from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    {
      groupLabel: "Início",
      menus: [
        {
          href: "/overview",
          label: "Dashboard",
          icon: Home,
        },
        {
          href: "/schedule",
          label: "Agenda",
          icon: CalendarCheck2,
        },
        {
          href: "/clients",
          label: "Clientes",
          icon: UserSearch,
        },
      ],
    },
    {
      groupLabel: "Controle",
      menus: [
        {
          href: "/bookings",
          label: "Agendamentos",
          icon: Hourglass,
        },
        {
          href: "/users",
          label: "Usuários",
          icon: UserLock,
        },
        {
          href: "/professionals",
          label: "Profissionais",
          icon: Briefcase,
        },
      ],
    },
    {
      groupLabel: "Gerenciamento",
      menus: [
        {
          href: "/services",
          label: "Serviços",
          icon: HandPlatter,
        },
        {
          href: "/products",
          label: "Produtos",
          icon: ShoppingCart,
        },
        {
          href: "/reviews",
          label: "Avaliações",
          icon: Star,
        },
      ],
    },
  ];
}
