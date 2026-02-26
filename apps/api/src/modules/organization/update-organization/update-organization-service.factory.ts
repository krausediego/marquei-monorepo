import { makeLogging } from "@/infra";
import { makeStorage } from "@/modules/shared/storage";
import { type IUpdateOrganization, UpdateOrganizationService } from ".";

export const makeUpdateOrganizationService = (): IUpdateOrganization => {
  return new UpdateOrganizationService(makeLogging(), makeStorage());
};
