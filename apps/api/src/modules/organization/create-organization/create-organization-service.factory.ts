import { makeLogging } from "@/infra";
import { makeStorage } from "@/modules/shared/storage";
import { CreateOrganizationService, type ICreateOrganization } from ".";

export const makeCreateOrganizationService = (): ICreateOrganization => {
  return new CreateOrganizationService(makeLogging(), makeStorage());
};
