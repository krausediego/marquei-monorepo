import type { IController } from "@/modules/shared";
import { makeUpdateOrganizationService, UpdateOrganizationController } from ".";

export const makeUpdateOrganizationController = (): IController => {
  return new UpdateOrganizationController(makeUpdateOrganizationService);
};
