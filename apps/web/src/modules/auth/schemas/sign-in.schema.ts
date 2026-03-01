import { z } from "zod";

export const signInSchema = z.object({
  email: z.email({ error: "Digite um e-mail válido" }),
  password: z
    .string({ error: "A senha é obrigatória" })
    .min(8, { error: "A senha deve conter ao menos 8 caracteres." }),
  rememberMe: z.boolean().optional(),
});

export type SignInSchemaProps = z.infer<typeof signInSchema>;
