import { makeLogging } from "@/infra";
import { FindAllUsersService, type IFindAllUsers } from ".";

export const makeFindAllUsersService = (): IFindAllUsers => {
  return new FindAllUsersService(makeLogging());
};
