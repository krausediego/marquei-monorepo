import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { auth } from "@/lib/auth";
import { toast } from "sonner";
import { client } from "@/lib/treaty";
import { useAuth } from "@/contexts/auth-context";

const newOrganizationSchema = z.object({
  name: z
    .string({ error: "O nome do estabelecimento é obrigatório" })
    .min(1, "O nome do estabelecimento é obrigatório"),
  description: z
    .string({ error: "A descrição é obrigatória" })
    .min(1, "A descrição é obrigatória"),
  phone: z
    .string({ error: "O telefone é obrigatório" })
    .min(1, "O telefone é obrigatório"),
  number: z.number({ error: "O número é obrigatório" }),
  postalCode: z
    .string({ error: "O CEP é obrigatório" })
    .min(1, "O CEP é obrigatório"),
  street: z
    .string({ error: "A rua é obrigatória" })
    .min(1, "A rua é obrigatória"),
  district: z
    .string({ error: "O bairro é obrigatório" })
    .min(1, "O bairro é obrigatório"),
  city: z
    .string({ error: "A cidade é obrigatória" })
    .min(1, "A cidade é obrigatória"),
  state: z
    .string({ error: "O estado é obrigatório" })
    .min(1, "O estado é obrigatório"),
});

export type NewOrganizationProps = z.infer<typeof newOrganizationSchema>;

const onSubmit = async (
  values: NewOrganizationProps & {
    slug: string;
    location: {
      x: number;
      y: number;
    };
  },
) => {
  return auth.organization.create(
    {
      ...values,
    },
    {
      onError: ({ error }) => {
        throw new Error(error.message);
      },
    },
  );
};

interface NewOrganizationHookProps {
  onOpen: (value: boolean) => void;
  file?: File;
}

export function useNewOrganization({ onOpen, file }: NewOrganizationHookProps) {
  const queryClient = useQueryClient();
  const form = useForm<NewOrganizationProps>({
    resolver: standardSchemaResolver(newOrganizationSchema),
  });

  const mutationNewOrganization = useMutation({
    mutationFn: onSubmit,
    onSuccess: async ({ data }) => {
      await auth.organization.setActive({ organizationId: data?.id });

      if (file) {
        await client["upload-logo"].post({ file });
      }

      queryClient.invalidateQueries();
      toast.success("Estabelecimento criado com sucesso!");
      onOpen(false);
    },
    onError: ({ message }) => {
      toast.error(
        message ?? "Ocorreu um erro ao tentar criar seu estabelecimento.",
      );
    },
  });

  return {
    form,
    ...mutationNewOrganization,
  };
}
