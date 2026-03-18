import { Mail } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group";

interface InviteUserDialogProps {
  onClose: () => void;
}

export function InviteUserDialog({ onClose }: InviteUserDialogProps) {
  const [email, setEmail] = useState<string>("");

  return (
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Convidar usuário</DialogTitle>
        <DialogDescription>
          Informe o e-mail do usuário que deseja convidar. Ele receberá um link
          de acesso no endereço informado.
        </DialogDescription>
      </DialogHeader>

      <InputGroup>
        <InputGroupAddon>
          <Mail />
        </InputGroupAddon>
        <InputGroupInput
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail"
          type="email"
        />
      </InputGroup>

      <DialogFooter>
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>
        <Button
        // isLoading={isPending}
        // onClick={async () => {
        //   await handleInviteUser(email);
        //   onClose();
        // }}
        >
          Enviar convite
        </Button>
      </DialogFooter>
    </DialogContent>
  );
}
