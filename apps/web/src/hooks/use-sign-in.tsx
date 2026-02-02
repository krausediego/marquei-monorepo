import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { auth } from "@/lib/auth";

const signInSchema = z.object({
  email: z.email({ error: "Insira um e-mail válido." }),
  password: z
    .string({ error: "A senha é obrigatória." })
    .min(8, { error: "A senha deve conter ao menos 8 caracteres." }),
});

type SignInProps = z.infer<typeof signInSchema>;

export function useSignIn() {
  const form = useForm<SignInProps>({
    resolver: standardSchemaResolver(signInSchema),
  });

  const onSubmit = async (values: SignInProps) => {
    await auth.signIn.email(
      {
        ...values,
        callbackURL: `${import.meta.env.VITE_FRONTEND_BASE_URL}/overview`,
      },
      {
        onError(context) {
          if (context.error.message) {
            alert(context.error.message);
          } else {
            alert("Falha no processo de login");
          }
        },
      },
    );
  };

  const mutationSignIn = useMutation({
    mutationFn: onSubmit,
  });

  const onSignInWithGoogle = async () => {
    await auth.signIn.social(
      {
        provider: "google",
        callbackURL: `${import.meta.env.VITE_FRONTEND_BASE_URL}/overview`,
      },
      {
        onError(context) {
          if (context.error.message) {
            alert(context.error.message);
          } else {
            alert("Falha no processo de login");
          }
        },
      },
    );
  };

  return {
    form,
    onSignInWithGoogle,
    ...mutationSignIn,
  };
}
