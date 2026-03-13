import { useMutation, useQueryClient } from "@tanstack/react-query";
import { revokeUser } from "../api";
import { toast } from "sonner";
import { userKeys } from "../users.keys";

export function useRevokeUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string) => {
      const { data, error } = await revokeUser(id);

      if (error) throw error;

      return data;
    },
    onSuccess: ({ message }) => {
      queryClient.invalidateQueries({ queryKey: userKeys.all() });
      toast.success(message);
    },
  });
}
