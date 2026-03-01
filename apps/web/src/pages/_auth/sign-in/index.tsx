import { createFileRoute } from "@tanstack/react-router";
import z from "zod";
import type { SignInSchemaProps } from "@/modules/auth/schemas";
import { SignInForm } from "@/modules/auth/sign-in/components";
import { useSignIn } from "@/modules/auth/sign-in/hooks";

const searchSchema = z.object({
  redirect: z.string().optional(),
});

export const Route = createFileRoute("/_auth/sign-in/")({
  validateSearch: searchSchema,
  component: RouteComponent,
});

function RouteComponent() {
  const { mutateAsync, isPending } = useSignIn();

  async function handleSubmit(values: SignInSchemaProps) {
    await mutateAsync(values);
  }

  return <SignInForm onSubmit={handleSubmit} isLoading={isPending} />;
}
