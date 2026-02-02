import { useQuery } from "@tanstack/react-query";

interface ViaCepResponse {
  cep: string;
  logradouro: string;
  complemento: string;
  bairro: string;
  localidade: string;
  uf: string;
  ibge: string;
  gia: string;
  ddd: string;
  siafi: string;
  erro?: boolean;
}

export function useFetchAddress(cep: string) {
  const cleanCep = cep?.replace(/\D/g, "");

  return useQuery({
    queryKey: ["address", cleanCep],
    queryFn: async () => {
      const response = await fetch(
        `https://viacep.com.br/ws/${cleanCep}/json/`,
      );

      if (!response.ok) {
        throw new Error("Erro ao buscar CEP");
      }

      const data: ViaCepResponse = await response.json();

      if (data.erro) {
        throw new Error("CEP não encontrado");
      }

      return data;
    },
    enabled: cleanCep?.length === 8,
    retry: false,
    staleTime: 1000 * 60 * 60,
  });
}
