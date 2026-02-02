import { standardSchemaResolver } from "@hookform/resolvers/standard-schema";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import z from "zod";
import { auth } from "@/lib/auth";

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

type NewOrganizationProps = z.infer<typeof newOrganizationSchema>;

const onSubmit = async (values: NewOrganizationProps) => {
  await auth.organization.create(
    {
      ...values,
    },
    {
      onError(context) {
        if (context.error.message) {
          alert(context.error.message);
        } else {
          alert("Falha no processo de criação da organização");
        }
      },
    },
  );
};

export function useNewOrganization() {
  const form = useForm<NewOrganizationProps>({
    resolver: standardSchemaResolver(newOrganizationSchema),
  });

  const mutationNewOrganization = useMutation({
    mutationFn: onSubmit,
  });

  return {
    form,
    ...mutationNewOrganization,
  };
}
