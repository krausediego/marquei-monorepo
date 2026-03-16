import { useMutation } from "@tanstack/react-query";
import { inviteUser } from "../api";
import { toast } from "sonner";

export function useInviteUser() {
  return useMutation({
    mutationFn: async (email: string) => {
      const { data, error } = await inviteUser(email);

      if (error) throw new Error(error.value.message);

      return data;
    },
    onSuccess: () => {
      toast.success("Convite enviado!");
    },
    onError: ({ message }) => {
      toast.error(message);
    },
  });
}
