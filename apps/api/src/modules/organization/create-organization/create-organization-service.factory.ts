import { makeLogging } from "@/infra";
import { CreateOrganizationService, ICreateOrganization } from ".";
import { makeStorage } from "@/modules/shared/storage";

export const makeCreateOrganizationService = (): ICreateOrganization => {
  return new CreateOrganizationService(makeLogging(), makeStorage());
};
