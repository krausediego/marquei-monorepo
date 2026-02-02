import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { auth } from "@/lib/auth";

const signUpSchema = z
  .object({
    name: z
      .string({ error: "O Nome é obrigatório." })
      .min(4, { error: "O nome deve conter ao menos 4 caracteres." }),
    email: z.email({ error: "Insira um e-mail válido." }),
    password: z
      .string({ error: "A senha é obrigatória." })
      .min(8, { error: "A senha deve conter ao menos 8 caracteres." }),
    confirmPassword: z
      .string({ error: "A confirmação da senha é obrigatória." })
      .min(8, {
        error: "A confirmação da senha deve conter ao menos 8 caracteres.",
      }),
  })
  .superRefine(({ confirmPassword, password }, ctx) => {
    if (confirmPassword !== password) {
      ctx.addIssue({
        code: "custom",
        message: "As senhas não conferem",
        path: ["confirmPassword"],
      });
    }
  });

type SignUpProps = z.infer<typeof signUpSchema>;

export function useSignUp() {
  const form = useForm<SignUpProps>({
    resolver: standardSchemaResolver(signUpSchema),
  });

  const onSubmit = async (values: SignUpProps) => {
    await auth.signUp.email(
      {
        ...values,
        callbackURL: `${import.meta.env.VITE_FRONTEND_BASE_URL}/overview`,
      },
      {
        onError(context) {
          if (context.error.message) {
            alert(context.error.message);
          } else {
            alert("Falha no processo de cadastro");
          }
        },
      },
    );
  };

  const mutationSignUp = useMutation({
    mutationFn: onSubmit,
  });

  const onSignInWithGoogle = async () => {
    await auth.signIn.social(
      {
        provider: "google",
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
    ...mutationSignUp,
  };
}
