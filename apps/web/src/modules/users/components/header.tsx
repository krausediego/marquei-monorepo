import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useUsersQueryStates } from "../hooks/use-users-query-states";
import { Download, Plus } from "lucide-react";

export function UsersHeader() {
  const [{ search }, setQueryState] = useUsersQueryStates();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
      <Input
        placeholder="Busque pelo nome..."
        value={search ?? ""}
        onChange={(e) => setQueryState({ search: e.target.value })}
        className="md:w-auto min-w-xs"
      />

      <div className="flex w-full md:w-auto gap-4">
        <Button variant="outline" className="flex-1 md:flex-0 gap-2">
          <Download />
          Exportar CSV
        </Button>
        <Button className="flex-1 md:flex-0">
          <Plus />
          Convidar usuário
        </Button>
      </div>
    </div>
  );
}
