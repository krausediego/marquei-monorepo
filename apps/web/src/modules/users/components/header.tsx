import { Search, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";
import { useDisclosure } from "@/hooks/use-disclosure";
import { useUsersQueryStates } from "../hooks";
import { InviteUserDialog } from "./invite-user-dialog";

export function UsersHeader() {
  const { isOpen, toggle, close } = useDisclosure();
  const [{ search }, setQueryState] = useUsersQueryStates();

  return (
    <div className="flex flex-col md:flex-row items-center gap-4 justify-between">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Usuários</h1>
        <p className="text-sm text-muted-foreground">
          Gerencie os membros do estabelecimento e suas permissões
        </p>
      </div>

      <div className="flex w-full md:w-auto gap-4">
        <InputGroup>
          <InputGroupAddon>
            <Search />
          </InputGroupAddon>
          <InputGroupInput
            placeholder="Buscar usuários..."
            value={search ?? ""}
            onChange={(e) =>
              setQueryState({
                search: e.target.value.length ? e.target.value : null,
              })
            }
            className="md:w-auto min-w-xs"
          />
        </InputGroup>

        <Dialog open={isOpen} onOpenChange={toggle}>
          <DialogTrigger asChild>
            <Button className="flex-1 md:flex-0">
              <UserPlus className="fill-primary-foreground" />
              Convidar usuário
            </Button>
          </DialogTrigger>

          <InviteUserDialog onClose={close} />
        </Dialog>
      </div>
    </div>
  );
}
