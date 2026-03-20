import { Mail, ShieldUser, UsersRound } from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib";
import { useUsersOverview } from "../hooks";

const overviewCards = [
  {
    id: 1,
    key: "totalMembers",
    title: "Total de membros",
    icon: UsersRound,
  },
  {
    id: 2,
    key: "totalAdmins",
    title: "Administradores",
    icon: ShieldUser,
  },
  {
    id: 3,
    key: "pendingInvitations",
    title: "Convites pendentes",
    icon: Mail,
  },
];

export function UsersOverview() {
  const { data, isLoading } = useUsersOverview();

  return (
    <div className="flex items-center justify-between gap-12">
      {overviewCards.map(({ id, icon: Icon, key, title }) => {
        const value = data?.[key as keyof typeof data];

        return (
          <div
            key={id}
            className="w-full rounded-xl bg-card shadow-sm p-5 flex items-center gap-4"
          >
            <div
              className={cn(
                "p-2.5 rounded-lg",
                key === "totalMembers" && "bg-muted",
                key === "totalAdmins" && "bg-blue-100",
                key === "pendingInvitations" && "bg-orange-100"
              )}
            >
              <Icon
                className={cn(
                  "size-7",
                  key === "totalMembers" &&
                    "text-muted-foreground fill-muted-foreground",
                  key === "totalAdmins" && "text-blue-300",
                  key === "pendingInvitations" && "text-orange-400"
                )}
              />
            </div>

            <div>
              {isLoading ? (
                <Skeleton className="w-20 h-6" />
              ) : (
                <h1 className="text-2xl font-bold text-foreground">{value}</h1>
              )}
              <span className="text-sm text-muted-foreground font-medium">
                {title}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
