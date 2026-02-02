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
import { Separator } from "@/components/ui/separator";
import { Spinner } from "@/components/ui/spinner";
import { useSignIn } from "@/hooks/use-sign-in";

export const Route = createFileRoute("/_auth/sign-in/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { form, onSignInWithGoogle, mutateAsync, isPending } = useSignIn();

  return (
    <>
      <div className="space-y-1">
        <h1 className="font-semibold text-3xl">Entrar</h1>
        <p className="text-muted-foreground text-sm">
          Entre com seu e-mail e senha, ou faça o login com sua conta google!
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
          Entrar
        </Button>
        <p className="text-center text-xs text-muted-foreground">
          Esqueceu a senha?
        </p>
        <p className="text-center text-xs text-muted-foreground">
          Ainda não possuí uma conta? <Link to="/sign-up">Cadastre-se</Link>
        </p>
      </Field>
    </>
  );
}
