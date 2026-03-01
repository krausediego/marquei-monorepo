import type { IController } from "@/modules/shared";
import { ListOrganizationsController, makeListOrganizationsService } from ".";

export const makeListOrganizationsController = (): IController => {
  return new ListOrganizationsController(makeListOrganizationsService);
};
