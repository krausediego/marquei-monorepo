import type { IController } from "@/modules/shared";
import {
  FindAllOrganizationsController,
  makeFindAllOrganizationsService,
} from ".";

export const makeFindAllOrganizationsController = (): IController => {
  return new FindAllOrganizationsController(makeFindAllOrganizationsService);
};
