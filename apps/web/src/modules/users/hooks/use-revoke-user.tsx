import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { revokeUser } from "../api";
import { userKeys } from "../users.keys";

interface RevokeUserProps {
  onClose: () => void;
}

export function useRevokeUser({ onClose }: RevokeUserProps) {
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

      onClose();
    },
  });
}
