import { useMutation } from "@tanstack/react-query";
import { useNavigate, useSearch } from "@tanstack/react-router";
import { toast } from "sonner";
import { authClient } from "@/lib/better-auth";
import type { SignInSchemaProps } from "../../schemas";

export function useSignIn() {
  const navigate = useNavigate();
  const search = useSearch({ from: "/_auth/sign-in/" });

  return useMutation({
    mutationFn: async (values: SignInSchemaProps) => {
      const { data, error } = await authClient.signIn.email({ ...values });

      if (error) {
        throw new Error(error.message);
      }

      return data;
    },
    onSuccess: () => navigate({ to: search.redirect ?? "/dashboard" }),
    onError: () => {
      toast.error("Ocorreu um erro ao realizar o login.");
    },
  });
}
