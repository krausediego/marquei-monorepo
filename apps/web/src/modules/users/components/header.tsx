import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Plus } from "lucide-react";
import { useUsersContext } from "../contexts";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { InviteUserDialog } from "./invite-user-dialog";
import { useDisclosure } from "@/hooks/use-disclosure";

export function UsersHeader() {
  const { isOpen, toggle, close } = useDisclosure();
  const { queryStates } = useUsersContext();
  const [{ search }, setQueryState] = queryStates;

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
      <Input
        placeholder="Busque pelo nome..."
        value={search ?? ""}
        onChange={(e) =>
          setQueryState({
            search: e.target.value.length ? e.target.value : null,
          })
        }
        className="md:w-auto min-w-xs"
      />

      <div className="flex w-full md:w-auto gap-4">
        <Button variant="outline" className="flex-1 md:flex-0 gap-2">
          <Download />
          Exportar CSV
        </Button>
        <Dialog open={isOpen} onOpenChange={toggle}>
          <DialogTrigger asChild>
            <Button className="flex-1 md:flex-0">
              <Plus />
              Convidar usuário
            </Button>
          </DialogTrigger>

          <InviteUserDialog onClose={close} />
        </Dialog>
      </div>
    </div>
  );
}
