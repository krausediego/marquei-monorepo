import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { type SignInSchemaProps, signInSchema } from "@/modules/auth/schemas";

interface SignInFormProps {
  onSubmit: (values: SignInSchemaProps) => void;
  isLoading: boolean;
}

export function SignInForm({ onSubmit, isLoading }: SignInFormProps) {
  const form = useForm<SignInSchemaProps>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <div>
      <div className="text-center">
        <h2 className="text-3xl font-semibold">Entre agora</h2>
        <p className="text-muted-foreground">Insira seus dados abaixo</p>
      </div>

      <form
        onSubmit={form.handleSubmit((values) => onSubmit(values))}
        className="flex flex-col gap-5"
      >
        <FieldSet>
          <FieldGroup>
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>E-mail</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Digite seu e-mail"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor={field.name}>Senha</FieldLabel>
                  <Input
                    {...field}
                    id={field.name}
                    placeholder="Digite sua senha"
                    aria-invalid={fieldState.invalid}
                    autoComplete="off"
                  />
                  {fieldState.invalid && (
                    <FieldError errors={[fieldState.error]} />
                  )}
                </Field>
              )}
            />

            <Controller
              name="rememberMe"
              control={form.control}
              render={({ field }) => (
                <Field orientation="horizontal">
                  <Checkbox
                    id={field.name}
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                  <FieldLabel>Lembrar-me</FieldLabel>
                </Field>
              )}
            />
          </FieldGroup>
        </FieldSet>

        <Button
          isLoading={isLoading}
          type="submit"
          disabled={isLoading}
          className="w-full"
        >
          Entrar
        </Button>
      </form>
    </div>
  );
}
