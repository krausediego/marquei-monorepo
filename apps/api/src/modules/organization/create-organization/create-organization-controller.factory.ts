import type { IController } from "@/modules/shared";
import { CreateOrganizationController, makeCreateOrganizationService } from ".";

export const makeCreateOrganizationController = (): IController => {
  return new CreateOrganizationController(makeCreateOrganizationService);
};
