import {
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export function UsersAlertDialogRevokeUser() {
  return (
    <AlertDialogContent
      onEscapeKeyDown={(e) => {
        // if (isPending) {
        //   e.preventDefault();
        // }
      }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>Revogar acesso</AlertDialogTitle>
        <AlertDialogDescription>
          Tem certeza que deseja revogar o acesso de{" "}
          <strong>
            {/* <i className="text-destructive">{selectedName}</i> */}
          </strong>
          ? Ele não conseguirá mais acessar o estabelecimento.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Cancelar</AlertDialogCancel>
        <Button
          // isLoading={isPending}
          variant="destructive"
          // onClick={handleRevokeUser}
        >
          Revogar acesso
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
