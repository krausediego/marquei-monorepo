import {
  BookmarkCheck,
  CalendarDays,
  LayoutGrid,
  type LucideIcon,
  ShieldUser,
  Users,
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

export function getMenuList(pathname: string): Group[] {
  return [
    {
      groupLabel: "Principal",
      menus: [
        {
          href: "/dashboard",
          label: "Dashboard",
          icon: LayoutGrid,
          submenus: [],
        },
        {
          href: "/schedule",
          label: "Agenda",
          icon: CalendarDays,
          submenus: [],
        },
        {
          href: "/bookings",
          label: "Agendamentos",
          icon: BookmarkCheck,
          submenus: [],
        },
        {
          href: "/clients",
          label: "Clientes",
          icon: Users,
          submenus: [],
        },
        {
          href: "/users",
          label: "Usuários",
          icon: ShieldUser,
          submenus: [],
        },
      ],
    },
  ];
}
