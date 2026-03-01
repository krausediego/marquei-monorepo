import { makeLogging } from "@/infra";
import { type IListUsers, ListUsersService } from ".";

export const makeListUsersService = (): IListUsers => {
  return new ListUsersService(makeLogging());
};
