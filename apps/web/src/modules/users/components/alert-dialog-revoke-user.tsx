import {
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

interface UsersAlertDialogRevokeUserProps {
  revokeActionFn: () => void;
  isLoading: boolean;
}

export function UsersAlertDialogRevokeUser({
  revokeActionFn,
  isLoading,
}: UsersAlertDialogRevokeUserProps) {
  return (
    <AlertDialogContent
      onEscapeKeyDown={(e) => {
        if (isLoading) {
          e.preventDefault();
        }
      }}
    >
      <AlertDialogHeader>
        <AlertDialogTitle>Voce tem certeza ?</AlertDialogTitle>
        <AlertDialogDescription>
          Ao revogar o acesso do usuário, este fica sem acesso ao seu
          estabelecimento.
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel disabled={isLoading}>Cancelar</AlertDialogCancel>
        <Button
          isLoading={isLoading}
          variant="destructive"
          onClick={revokeActionFn}
        >
          Confirmar
        </Button>
      </AlertDialogFooter>
    </AlertDialogContent>
  );
}
