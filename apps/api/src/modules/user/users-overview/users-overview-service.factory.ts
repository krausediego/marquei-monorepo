import { makeLogging } from "@/infra";
import { UsersOverviewService, type IUsersOverview } from ".";

export const makeUsersOverviewService = (): IUsersOverview => {
  return new UsersOverviewService(makeLogging());
};
