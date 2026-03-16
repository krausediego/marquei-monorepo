import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { useUsersContext } from "../contexts";

export function UsersAlertDialogRevokeUser() {
  const { isPending, handleRevokeUser, selectedName } = useUsersContext();

  return (
    <AlertDialogContent
      onEscapeKeyDown={(e) => {
        if (isPending) {
          e.preventDefault();
        }
      }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>Revogar acesso</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja revogar o acesso de{" "}
          <strong>
            <i className="text-destructive">{selectedName}</i>
          </strong>
          ? Ele não conseguirá mais acessar o estabelecimento.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isPending}>Cancelar</AlertDialogCancel>
        <Button
          isLoading={isPending}
          variant="destructive"
          onClick={handleRevokeUser}
        >
          Revogar acesso
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
