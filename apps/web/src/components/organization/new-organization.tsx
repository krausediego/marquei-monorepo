import { useEffect, useMemo, useRef, useState } from "react";
import { Controller } from "react-hook-form";
import { masks } from "@/helpers/masks";
import { useCoordinates } from "@/hooks/use-coodinates";
import { useFetchAddress } from "@/hooks/use-fetch-address";
import { useNewOrganization } from "@/hooks/use-new-organization";
import { Button } from "../ui/button";
import {
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Field, FieldError, FieldLabel } from "../ui/field";
import { Input } from "../ui/input";
import { Spinner } from "../ui/spinner";
import { Textarea } from "../ui/textarea";
import { AddressMap } from "./address-map";
import { LogoUpload } from "./components/logo-upload";
import { SectionSeparator } from "./components/section-separator";

type Step = "form" | "map";

export function NewOrganization() {
  const { form, mutateAsync } = useNewOrganization();
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [currentStep, setCurrentStep] = useState<Step>("form");
  const logoInputRef = useRef<HTMLInputElement>(null);
  const { coordinates, setCoordinates } = useCoordinates();

  const postalCode = form.watch("postalCode");
  const street = form.watch("street");
  const number = form.watch("number");
  const district = form.watch("district");
  const city = form.watch("city");
  const state = form.watch("state");

  const fullAddress = useMemo(() => {
    const parts = [street, number, district, city, state].filter(Boolean);
    return parts.length > 0 ? parts.join(", ") : "";
  }, [street, number, district, city, state]);

  const { data: addressData, isLoading: isLoadingAddress } =
    useFetchAddress(postalCode);

  useEffect(() => {
    if (addressData) {
      form.setValue("street", addressData.logradouro);
      form.setValue("district", addressData.bairro);
      form.setValue("city", addressData.localidade);
      form.setValue("state", addressData.uf);
    }
  }, [addressData, form]);

  const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleLogoRemove = () => {
    setLogoPreview(null);
    if (logoInputRef.current) {
      logoInputRef.current.value = "";
    }
  };

  const handleNextStep = async () => {
    // Validar campos obrigatórios antes de ir para o mapa
    const isValid = await form.trigger([
      "name",
      "description",
      "phone",
      "postalCode",
      "street",
      "number",
      "district",
      "city",
      "state",
    ]);

    if (isValid) {
      setCurrentStep("map");
    }
  };

  const handlePreviousStep = () => {
    setCurrentStep("form");
  };

  const handleSubmit = (values: any) => {
    const payload = {
      ...values,
      latitude: coordinates.lat,
      longitude: coordinates.lng,
    };
    mutateAsync(payload);
  };

  return (
    <DialogContent
      className="flex max-h-[90vh] max-w-4xl flex-col overflow-hidden p-0"
      onInteractOutside={(e) => {
        const target = e.target as HTMLElement;
        if (target.closest(".leaflet-container")) {
          e.preventDefault();
        }
      }}
    >
      <DialogHeader className="px-6 pt-6">
        <DialogTitle>
          {currentStep === "form"
            ? "Criar nova organização"
            : "Confirmar localização"}
        </DialogTitle>
        <DialogDescription>
          {currentStep === "form"
            ? "Preencha os dados da sua empresa. Você poderá editar isso depois."
            : "Ajuste o marcador no mapa para a localização exata do estabelecimento."}
        </DialogDescription>
      </DialogHeader>

      <div className="flex-1 overflow-y-auto px-6">
        {currentStep === "form" ? (
          <form
            className="space-y-4 pb-4"
            id="new-organization"
            onSubmit={form.handleSubmit(handleNextStep)}
          >
            {/* Informações Básicas */}
            <div className="grid grid-cols-3 gap-4">
              <LogoUpload
                logoPreview={logoPreview}
                onLogoChange={handleLogoChange}
                onLogoRemove={handleLogoRemove}
              />

              <div className="col-span-2 space-y-3">
                <Controller
                  control={form.control}
                  name="name"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.error}>
                      <FieldLabel htmlFor="name">
                        Nome do Estabelecimento
                      </FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        id="name"
                        placeholder="Insira o nome da organização"
                        type="text"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="description"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.error}>
                      <FieldLabel htmlFor="description">Descrição</FieldLabel>
                      <Textarea
                        {...field}
                        aria-invalid={fieldState.invalid}
                        autoComplete="off"
                        id="description"
                        placeholder="Insira a descrição"
                        rows={2}
                        className="resize-none"
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />

                <Controller
                  control={form.control}
                  name="phone"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.error}>
                      <FieldLabel htmlFor="phone">Telefone</FieldLabel>
                      <Input
                        {...field}
                        aria-invalid={fieldState.invalid}
                        autoComplete="tel"
                        id="phone"
                        maxLength={15}
                        placeholder="(00) 00000-0000"
                        type="tel"
                        value={field.value && masks.phone(field.value)}
                      />
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>
            </div>

            <SectionSeparator />

            {/* Endereço em 3 colunas */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-3">
                <Controller
                  control={form.control}
                  name="postalCode"
                  render={({ field, fieldState }) => (
                    <Field data-invalid={fieldState.error} className="w-3xs">
                      <FieldLabel htmlFor="postalCode">CEP</FieldLabel>
                      <div className="relative">
                        <Input
                          {...field}
                          aria-invalid={fieldState.invalid}
                          autoComplete="postal-code"
                          id="postalCode"
                          placeholder="00000-000"
                          maxLength={9}
                          type="text"
                          value={field.value && masks.postalCode(field.value)}
                          onChange={(e) => {
                            const maskedInput = masks.postalCode(
                              e.target.value,
                            );
                            field.onChange(maskedInput);
                          }}
                        />
                        {isLoadingAddress && <Spinner />}
                      </div>
                      {fieldState.invalid && (
                        <FieldError errors={[fieldState.error]} />
                      )}
                    </Field>
                  )}
                />
              </div>

              <Controller
                control={form.control}
                name="street"
                render={({ field, fieldState }) => (
                  <Field className="col-span-2" data-invalid={fieldState.error}>
                    <FieldLabel htmlFor="street">Rua</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="street-address"
                      id="street"
                      placeholder="Insira a rua"
                      type="text"
                      disabled={!!addressData}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="number"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel htmlFor="number">Número</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="number"
                      onChange={(e) => field.onChange(Number(e.target.value))}
                      placeholder="Nº"
                      min={0}
                      type="number"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="district"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel htmlFor="district">Bairro</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="off"
                      id="district"
                      placeholder="Insira o bairro"
                      type="text"
                      disabled={!!addressData}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="city"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel htmlFor="city">Cidade</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="address-level2"
                      id="city"
                      placeholder="Insira a cidade"
                      type="text"
                      disabled={!!addressData}
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />

              <Controller
                control={form.control}
                name="state"
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.error}>
                    <FieldLabel htmlFor="state">Estado</FieldLabel>
                    <Input
                      {...field}
                      aria-invalid={fieldState.invalid}
                      autoComplete="address-level1"
                      id="state"
                      placeholder="UF"
                      type="text"
                      disabled={!!addressData}
                      maxLength={2}
                      className="uppercase"
                    />
                    {fieldState.invalid && (
                      <FieldError errors={[fieldState.error]} />
                    )}
                  </Field>
                )}
              />
            </div>
          </form>
        ) : (
          <div className="pb-4">
            <div className="bg-muted/50 mb-4 rounded-lg border p-4">
              <h3 className="mb-2 font-semibold">Endereço cadastrado:</h3>
              <p className="text-muted-foreground text-sm">{fullAddress}</p>
            </div>

            <div className="overflow-hidden rounded-lg border">
              <AddressMap
                address={fullAddress}
                onPositionChange={setCoordinates}
              />
            </div>

            {coordinates.lat && coordinates.lng && (
              <div className="bg-muted/50 mt-4 rounded-lg border p-4">
                <p className="text-sm">
                  <strong>Coordenadas selecionadas:</strong>
                </p>
                <p className="text-muted-foreground font-mono text-sm">
                  Latitude: {coordinates.lat.toFixed(7)}
                  <br />
                  Longitude: {coordinates.lng.toFixed(7)}
                </p>
              </div>
            )}
          </div>
        )}
      </div>

      <DialogFooter className="border-t px-6 py-4">
        <DialogClose asChild>
          <Button variant="outline">Cancelar</Button>
        </DialogClose>

        {currentStep === "form" ? (
          <Button form="new-organization" type="submit">
            Avançar para o mapa
          </Button>
        ) : (
          <>
            <Button variant="outline" onClick={handlePreviousStep}>
              Voltar
            </Button>
            <Button
              onClick={form.handleSubmit(handleSubmit)}
              disabled={!coordinates.lat || !coordinates.lng}
            >
              Criar estabelecimento
            </Button>
          </>
        )}
      </DialogFooter>
    </DialogContent>
  );
}
