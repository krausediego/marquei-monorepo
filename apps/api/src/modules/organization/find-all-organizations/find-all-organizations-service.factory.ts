import { makeLogging } from "@/infra";
import { FindAllOrganizationsService, type IFindAllOrganizations } from ".";

export const makeFindAllOrganizationsService = (): IFindAllOrganizations => {
  return new FindAllOrganizationsService(makeLogging());
};
