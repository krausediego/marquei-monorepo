import { Separator } from "@radix-ui/react-separator";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { useSignUp } from "@/hooks/use-sign-up";

export const Route = createFileRoute("/_auth/sign-up/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, onSignInWithGoogle, mutateAsync, isPending } = useSignUp();

  return (
    <>
      <div className="space-y-1">
        <h1 className="font-semibold text-3xl">Cadastre-se</h1>
        <p className="text-muted-foreground text-sm">
          Insira suas informações e crie sua conta agora mesmo e agilize seu
          tempo!
        </p>
      </div>

      <Button
        onClick={onSignInWithGoogle}
        variant="outline"
        className="w-full "
      >
        <img src="/svgs/google.svg" alt="Google logo" className="h-5 w-5" />
        Entrar com google
      </Button>

      <Separator />

      <form
        id="sign-in-form"
        className="space-y-5"
        onSubmit={form.handleSubmit((values) => mutateAsync(values))}
      >
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.error}>
                <FieldLabel htmlFor="name">Nome completo</FieldLabel>
                <Input
                  {...field}
                  id="name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Insira seu nome completo"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.error}>
                <FieldLabel htmlFor="email">Endereço de e-mail</FieldLabel>
                <Input
                  {...field}
                  id="email"
                  type="email"
                  aria-invalid={fieldState.invalid}
                  placeholder="Insira seu e-mail"
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
              <Field data-invalid={fieldState.error}>
                <FieldLabel htmlFor="password">Senha</FieldLabel>
                <Input
                  {...field}
                  id="password"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Insira sua senha"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />

          <Controller
            name="confirmPassword"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.error}>
                <FieldLabel htmlFor="confirmPassword">
                  Confirmar Senha
                </FieldLabel>
                <Input
                  {...field}
                  id="confirmPassword"
                  type="password"
                  aria-invalid={fieldState.invalid}
                  placeholder="Insira a confirmação da senha"
                  autoComplete="off"
                />
                {fieldState.invalid && (
                  <FieldError errors={[fieldState.error]} />
                )}
              </Field>
            )}
          />
        </FieldGroup>
      </form>
      <Field>
        <Button
          disabled={isPending}
          type="submit"
          form="sign-in-form"
          className="w-full"
        >
          {isPending && <Spinner />}
          Cadastrar
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Já possui uma conta? <Link to="/sign-in">Entrar</Link>
        </p>
      </Field>
    </>
  );
}
