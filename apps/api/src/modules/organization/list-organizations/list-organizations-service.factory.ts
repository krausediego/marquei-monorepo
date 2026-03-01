import { makeLogging } from "@/infra";
import { ListOrganizationsService, type IListOrganizations } from ".";

export const makeListOrganizationsService = (): IListOrganizations => {
  return new ListOrganizationsService(makeLogging());
};
